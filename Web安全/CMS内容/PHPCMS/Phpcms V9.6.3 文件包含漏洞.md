---
source: "hatch 补库批 20260928"
product: "PHPCMS9.6.3 search"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "Phpcms V9.6.3 文件包含漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：search public_get_suggest_keyword接受q路径的真实行为未给"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-e69b8c2fec2b7d8fb38b969a"
entity_id: "ve-e69b8c2fec2b7d8fb38b969a"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：search public_get_suggest_keyword接受q路径的真实行为未给

- **证据待核（1）**：URL域后直接/m=search缺index.php?，按原样是路径非查询参数。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

- **适用与权限边界（2）**：只有穿越URL，无include/read源码/响应/认证/出处，任意文件包含类型未证。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# Phpcms V9.6.3 文件包含漏洞

一、漏洞简介
------------

二、漏洞影响
------------

Phpcms V9.6.3

三、复现过程
------------

`http://www.0-sec.org/m=search&a=public_get_suggest_keyword&q=../../phpsso_server/caches/configs/database.php `
