---
source: "hatch 补库批 20260928"
product: "Spring Boot/Cloud及Jolokia管理面"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "Spring Boot 配置不当而暴露的路由"
prerequisites: "来源所述条件，未列明部分仍待核：Boot1/2默认路径仅历史概述，Cloud/HYSTRIX/Jolokia并非默认全部注册或公开"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-5175c2fc740fbdc1238f21e5"
entity_id: "ve-5175c2fc740fbdc1238f21e5"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：Boot1/2默认路径仅历史概述，Cloud/HYSTRIX/Jolokia并非默认全部注册或公开

代码与实验材料：完整路由字典及env/trace用途，无验证数据；提POSTenv为有条件较谨慎

来源证据范围：导入批无来源

- **适用与权限边界（1）**：默认内置端点与额外依赖混合；依据：hystrix.stream、jolokia、CloudFoundry等有组件/平台条件；同一路径存在不代表敏感访问。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **适用与权限边界（2）**：敏感字段脱敏判断需要版本配置；依据：pwd/psasword是否泄露依sanitizer规则，不能仅字段名推断。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# Spring Boot 配置不当而暴露的路由

一、漏洞简介
------------

主要是因为程序员开发时没有意识到暴露路由可能会造成安全风险，或者没有按照标准流程开发，忘记上线时需要修改/切换生产环境的配置

二、漏洞影响
------------

三、复现过程
------------

### 路由知识

-   Spring Boot 1.x 版本默认内置路由的根路径以 `/` 开始，2.x 则统一以
    `/actuator` 开始
-   有些程序员会自定义 `/manage`、`/management` 或 **项目相关名称**
    为根路径
-   默认内置路由名字，如 `/env` 有时候也会被程序员修改，如修改成
    `/appenv`

<!-- -->

    trace
    health
    loggers
    metrics
    autoconfig
    heapdump
    threaddump
    env
    info
    dump
    configprops
    mappings
    auditevents
    beans
    jolokia
    cloudfoundryapplication
    hystrix.stream
    actuator
    actuator/auditevents
    actuator/beans
    actuator/health
    actuator/conditions
    actuator/configprops
    actuator/env
    actuator/info
    actuator/loggers
    actuator/heapdump
    actuator/threaddump
    actuator/metrics
    actuator/scheduledtasks
    actuator/httptrace
    actuator/mappings
    actuator/jolokia
    actuator/hystrix.stream

其中对寻找漏洞比较重要接口的有：

-   `/env`、`/actuator/env`

<!-- -->

-   GET 请求 `/env`
    会泄露环境变量信息，或者配置中的一些用户名，当程序员的属性名命名不规范
    (例如 password 写成 psasword、pwd) 时，会泄露密码明文；

    同时有一定概率可以通过 POST 请求 `/env` 接口设置一些属性，触发相关
    RCE 漏洞。

<!-- -->

-   `/jolokia`

<!-- -->

-   通过 `/jolokia/list` 接口寻找可以利用的 MBean，触发相关 RCE 漏洞；

<!-- -->

-   `/trace`

<!-- -->

-   一些 http 请求包访问跟踪信息，有可能发现有效的 cookie 信息
