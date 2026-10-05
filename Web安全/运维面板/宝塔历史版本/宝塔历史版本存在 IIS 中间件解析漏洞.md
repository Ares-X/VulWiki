---
source: "MrWQ/vulnerability-paper"
title: "宝塔历史版本存在 IIS 中间件解析漏洞"
product: "宝塔 Windows panel with IIS8.5/PHP5.4"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
prerequisites: "WindowsServer2012R2;panel<=6.5 claimed;IIS8.5/PHP5.4;uploaddemo permits imageextension"
source_url: "https://mp.weixin.qq.com/s/25ncF8PuXh4Aob49TPFfbw"
source_status: "recorded"
side_effects: "原文未完整记录副作用、清理步骤或运行验证；阅读样例不等于获准在真实系统执行。"
id: "vw-515922ecd31f82b6cf6282a1"
entity_id: "ve-515922ecd31f82b6cf6282a1"
schema_version: "1"
---

# 宝塔历史版本存在 IIS 中间件解析漏洞

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 适用前提：WindowsServer2012R2;panel<=6.5 claimed;IIS8.5/PHP5.4;uploaddemo permits imageextension
- 证据范围：Upload disguised PHP then /.php suffix;needs handler/path-info settings to attribute rootcause

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- P0 platform claim 'Linux as long as IIS8.5' is inconsistent with named WindowsIIS environment
- Conclusion says arbitraryfileupload but demonstrated gap is uploaded image parsed asPHP;separate primitives
- No exact vulnerable handlerconfig or fixedpanelversion
- Every line promoted to heading/bold;rawPHP not fenced
- Screenshots alone show output; no textual HTTP evidence

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

<meta name="referrer" content="no-referrer"/>

> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [mp.weixin.qq.com](https://mp.weixin.qq.com/s/25ncF8PuXh4Aob49TPFfbw)

**https://www.secquan.org/BugWarning/1071470**

**![](../../.resource/remote/cfda77f46f58bae90d6608eaee0b2ad92b37b5545fbef944c48446bebcaa0aeb.png)**

**1. 环境搭建**
===========

**Windows Server 2012 R2 X64**
------------------------------

**范围：宝塔 Windows <= 6.5    或 liunx 只要有 IIS8.5 这个中间件的版本**
-------------------------------------------------------

**宝塔选择：MySQL + PHP-5.4+ IIS 8.5**
---------------------------------

**![](../../.resource/remote/4fdf66c77f9183f2be99766625be0ef6d9f51df95329ee579b886f7b8e593b26.png)**

**源码使用公开的 PHP 上传源码:**
=====================

**https://www.runoob.com/wp-content/uploads/2013/08/runoob-file-uplaod-demo.zip**
---------------------------------------------------------------------------------

**已做白名单限制，仅允许上传 .gif、.jpeg、.jpg、.png 文件，文件大小必须小于 200 kB**
---------------------------------------------------------

**![](../../.resource/remote/efdd15fdfa2c3b7d21cd2bd0e006bc2b6cc0773b70aabb7fd369f54829c442f5.png)  
![](../../.resource/remote/86a8f3fac816288af46d8ceacba17c6d22550e089ad0de8d9dc23b90dd6b8da5.png)**

**2. 漏洞复现**
===========

**配置好网站以后：**
------------

**![](../../.resource/remote/a8b23656a8b7afcc96ce9571af39e730cabe63e55eae5aa5bb7c6602f5ad3f0c.png)**

**本地写一个**
---------

**<?php  
phpinfo();**

**![](../../.resource/remote/9be88e5b39bf081ae1a48840b39112e0591432db813ec11dad880d1f24f11ec6.png)**

**另存为. jpg 格式**
---------------

**![](../../.resource/remote/90a549330f55b8f1d0d13299259c7c94d482b9e0366d8aac25a5a7ace132a29f.png)  
![](../../.resource/remote/a15a76417eb49df7c3eae77bfc34b8f62aa7c7f0957ab8c95dcd7611f8eda5b5.png)**

**直接上传文件，不需要做任何修改：**
--------------------

**![](../../.resource/remote/d0102641ee16612dd32dbee0988fb6b7f7f77e044dc8140f78992b03f061080b.png)  
![](../../.resource/remote/4cfb3c97fe2e8dc8d99a75683b75e030d47c3e6df90d17d69b23571306eb5f36.png)**

**访问上传文件地址：**
-------------

**![](../../.resource/remote/5c5dedccf7aff4915cbdba27dd4665a4ee471244aa423f634636847f26d1a472.png)**

**在 upload/1.jpg 后面加 /.php**
----------------------------

**![](../../.resource/remote/3e88a1fb147956a0232f73c1429cc9354b238a05728942594a087f83a304935f.png)**

**成功验证存在任意文件上传漏洞！**
-------------------

**（特此声明，本篇文章为原创文章！如要转载请标明来源！）**

![](../../.resource/remote/df3e6301d2fea4dc71a963db90c1f69a12d33fcf30fe3c6cdfd6d64d772c15c0.jpg)

  

  

扫码关注不迷路

简历请投递 admin@360bug.net

开普勒安全团队欢迎你

‍

---

> 来源：MrWQ/vulnerability-paper（https://github.com/MrWQ/vulnerability-paper）
