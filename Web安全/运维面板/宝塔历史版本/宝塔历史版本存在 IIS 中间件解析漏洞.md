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

**![](https://mmbiz.qpic.cn/mmbiz_png/ORwL8p4cVxRNGJLVK7DFg6MGr6diahKOkJbH7OvXcj5aG3mibfyicthqUIxtCP8zz52rjcRv1fVj9gymtVAESLJRw/640?wx_fmt=png)**

**1. 环境搭建**
===========

**Windows Server 2012 R2 X64**
------------------------------

**范围：宝塔 Windows <= 6.5    或 liunx 只要有 IIS8.5 这个中间件的版本**
-------------------------------------------------------

**宝塔选择：MySQL + PHP-5.4+ IIS 8.5**
---------------------------------

**![](https://mmbiz.qpic.cn/mmbiz_png/ORwL8p4cVxRNGJLVK7DFg6MGr6diahKOkJdia19VibNO9XyXjU53s7RtHUUfnpH3BicORXPH3aOF5Xaf0VX4Nr9Ldw/640?wx_fmt=png)**

**源码使用公开的 PHP 上传源码:**
=====================

**https://www.runoob.com/wp-content/uploads/2013/08/runoob-file-uplaod-demo.zip**
---------------------------------------------------------------------------------

**已做白名单限制，仅允许上传 .gif、.jpeg、.jpg、.png 文件，文件大小必须小于 200 kB**
---------------------------------------------------------

**![](https://mmbiz.qpic.cn/mmbiz_png/ORwL8p4cVxRNGJLVK7DFg6MGr6diahKOkHlS1cJbsxfTpZelJDaT4EBBLBBaeAiaVlE8Zysn08ibFlUyA312U1ApA/640?wx_fmt=png)  
![](https://mmbiz.qpic.cn/mmbiz_png/ORwL8p4cVxRNGJLVK7DFg6MGr6diahKOkz8X5jOicuaaLUguRnAaGpo64ib9qpicOemQQmwD4P7G0kaAicjXKWYic4Lg/640?wx_fmt=png)**

**2. 漏洞复现**
===========

**配置好网站以后：**
------------

**![](https://mmbiz.qpic.cn/mmbiz_png/ORwL8p4cVxRNGJLVK7DFg6MGr6diahKOk9qb7iasKZMaq0o4pCPuATicNiaiaaPib59tvB4RfEicWrnP9DMxXIaXMkjrA/640?wx_fmt=png)**

**本地写一个**
---------

**<?php  
phpinfo();**

**![](https://mmbiz.qpic.cn/mmbiz_png/ORwL8p4cVxRNGJLVK7DFg6MGr6diahKOkIBLjFD9WzWTbdic1rrVRATOUEcQ2fGyN38AvibA6lFuR5Lk8IDlLal0A/640?wx_fmt=png)**

**另存为. jpg 格式**
---------------

**![](https://mmbiz.qpic.cn/mmbiz_png/ORwL8p4cVxRNGJLVK7DFg6MGr6diahKOkXGCWia1ibWlpexfQp4ico6Bn0NfJqLLEaInsA2gxHmHa0SvnHtic4x79TQ/640?wx_fmt=png)  
![](https://mmbiz.qpic.cn/mmbiz_png/ORwL8p4cVxRNGJLVK7DFg6MGr6diahKOkt7JToPtnfOqlRkucBx9VmHzdeZPVRuS1D6SBjlt6OfgwU2ZZ1I5H3A/640?wx_fmt=png)**

**直接上传文件，不需要做任何修改：**
--------------------

**![](https://mmbiz.qpic.cn/mmbiz_png/ORwL8p4cVxRNGJLVK7DFg6MGr6diahKOkFp3WSMqmu0mS8cJ2qeBPWHmkzaZUvrXdW11Wgj2iaF9QDTP2otXa8tQ/640?wx_fmt=png)  
![](https://mmbiz.qpic.cn/mmbiz_png/ORwL8p4cVxRNGJLVK7DFg6MGr6diahKOkRO1gicQWp7xT8cGRibF296EUEbibpxQD1IrIYfDN1X32niaVEEuehZckQA/640?wx_fmt=png)**

**访问上传文件地址：**
-------------

**![](https://mmbiz.qpic.cn/mmbiz_png/ORwL8p4cVxRNGJLVK7DFg6MGr6diahKOkJSz26EsNibrWH1yNjS1OicGsmth34QCO2KXbib7IouNEEA82QjLO1TzrA/640?wx_fmt=png)**

**在 upload/1.jpg 后面加 /.php**
----------------------------

**![](https://mmbiz.qpic.cn/mmbiz_png/ORwL8p4cVxRNGJLVK7DFg6MGr6diahKOkRKnjRXh0soVnONNdsYqGN2FZwHoa5eBuXhqmp0ajhvAx4hKsWnBfibg/640?wx_fmt=png)**

**成功验证存在任意文件上传漏洞！**
-------------------

**（特此声明，本篇文章为原创文章！如要转载请标明来源！）**

![](https://mmbiz.qpic.cn/mmbiz_jpg/ORwL8p4cVxSlLTvUjLjuQUR6y6W6pLDulwBQClNzPtc9iayZO0lVTJHM8flTL0SKTbx3mLaTbzjUWMc8EFFsLFA/640?wx_fmt=jpeg)

  

  

扫码关注不迷路

简历请投递 admin@360bug.net

开普勒安全团队欢迎你

‍

---

> 来源：MrWQ/vulnerability-paper（https://github.com/MrWQ/vulnerability-paper）
