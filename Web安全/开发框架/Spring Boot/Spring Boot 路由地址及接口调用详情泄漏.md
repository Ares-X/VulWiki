---
source: "hatch 补库批 20260928"
product: "Spring应用/API文档与Actuator"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "Spring Boot 路由地址及接口调用详情泄漏"
prerequisites: "来源所述条件，未列明部分仍待核：无版本，Swagger各实现及管理端点配置决定是否存在"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-5f4df2526babec0c4c707f63"
entity_id: "ve-5f4df2526babec0c4c707f63"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：无版本，Swagger各实现及管理端点配置决定是否存在

代码与实验材料：十余候选路径，无响应/权限验证；只是发现清单

来源证据范围：导入批无原出处

- **适用与权限边界（1）**：根因和影响推断过于单一；依据：公开API文档可能是设计意图，不必都是忘切生产配置；需核数据敏感性和业务权限。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **事实待核（2）**：术语和版本可补；依据：列Swagger UI/API docs与Actuator混合，端点响应结构按版本不同。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# Spring Boot 路由地址及接口调用详情泄漏

一、漏洞简介
------------

开发环境切换为线上生产环境时，相关人员没有更改配置文件或忘记切换配置环境，导致此漏洞

二、漏洞影响
------------

三、复现过程
------------

直接访问以下几个路由，验证漏洞是否存在：

    /api-docs
    /v2/api-docs
    /swagger-ui.html

一些可能会遇到的接口路由变形：

    /api.html
    /sw/swagger-ui.html
    /api/swagger-ui.html
    /template/swagger-ui.html
    /spring-security-rest/api/swagger-ui.html
    /spring-security-oauth-resource/swagger-ui.html

除此之外，下面的路由有时也会包含(或推测出)一些接口地址信息，但是无法获得参数相关信息：

    /mappings
    /actuator/mappings
    /metrics
    /actuator/metrics
    /beans
    /actuator/beans
    /configprops
    /actuator/configprops

**一般来讲，知道 spring boot 应用的相关接口和传参信息并不能算是漏洞**；

但是可以检查暴露的接口是否存在未授权访问、越权或者其他业务型漏洞。
