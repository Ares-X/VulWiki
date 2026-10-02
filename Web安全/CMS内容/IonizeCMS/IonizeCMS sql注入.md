---
source: "hatch 补库批 20260928"
product: "IonizeCMS"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "IonizeCMS sql注入"
prerequisites: "来源所述条件，未列明部分仍待核：用户控制X-Forwarded-Host；受影响版本和路由未给"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-835179e826521a222032e4c6"
entity_id: "ve-835179e826521a222032e4c6"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：用户控制X-Forwarded-Host；受影响版本和路由未给

- **代码与转录边界（1）**：正文在from informa截断，SQL括号未闭合，无请求URL/方法/响应。相应原代码作为存在此问题的历史样本保留，不能直接当作可运行、成功复现的 PoC；缺失内容需回原稿核对，不据此补造可执行攻击链。

- **事实待核（2）**：简介版本为空且无来源；不能作为完整PoC。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# IonizeCMS sql注入

一、漏洞简介
------------

二、漏洞影响
------------

三、复现过程
------------

伪造HTTP头注入 在抓包哇：

    X-Forwarded-Host: 'and(select 1 from(select count(*),concat((select concat(0x5e5e5e,version(),0x5e5e5e) from informa
