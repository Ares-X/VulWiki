---
source: "hatch 补库批 20260928"
product: "Discuz X3.4"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "Discuz! X 3.4 admincp_misc.php SQL注入漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：Admin censor management; cross-database access additionally requires DB grants"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-8921eedd5fc5fb551980d083"
entity_id: "ve-8921eedd5fc5fb551980d083"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：Admin censor management; cross-database access additionally requires DB grants

- **证据待核（1）**：Only URL and bare screenshot filename; no injectable parameter, payload, query or response。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

- **结论使用边界（2）**：Cross-site database compromise is conditional inference rather than demonstrated result。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **证据待核（3）**：Original source absent。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# Discuz! X 3.4 admincp\_misc.php SQL注入漏洞

一、漏洞简介
------------

由于是update型注入，我们在后台已经可以利用数据库备份获得数据，对本网站意义不大，但是有同mysql的其他网站，如果权限不严，跨库查询，搞定同mysql的其他网站。

二、漏洞影响
------------

Discuz! X 3.4

三、复现过程
------------

    https://www.0-sec.org/admin.php?action=misc&operation=censor

192540\_0de6824f\_5044043.png
