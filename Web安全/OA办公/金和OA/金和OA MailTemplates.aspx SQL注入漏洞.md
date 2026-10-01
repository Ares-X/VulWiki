---
source: "R4gd0ll/I-Wanna-Get-All"
---

# 金和OA MailTemplates.aspx SQL注入漏洞

## 漏洞描述

金和OA C6 `/C6/JHSoft.Web.Mail/MailTemplates.aspx/` 接口 `tempID` 参数存在 SQL 注入漏洞，支持 UNION 联合查询直接回显数据。

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
GET /C6/JHSoft.Web.Mail/MailTemplates.aspx/?tempID=1%20UNION%20ALL%20SELECT%20... HTTP/1.1
```

通过 UNION 构造可将查询结果回显在页面中，直接读取数据库表数据。

> 仅限授权测试。PoC 逻辑提取自 I-Wanna-Get-All 集成利用工具对应模块。
