---
source: "LittleBear4/OA-EXPTOOL"
---

# 泛微E-Cology ShowDocsImageServlet SQL注入漏洞

## 漏洞描述

泛微 E-Cology 的 `/weaver/weaver.docs.docs.ShowDocsImageServlet` 接口中 `docId` 参数存在SQL注入漏洞。攻击者无需登录，通过构造注入语句可执行任意 SQL 查询，获取数据库敏感信息。

## 漏洞影响

```
泛微 E-Cology
```

## 网络测绘

```
app="泛微-协同办公OA"
```

## 漏洞复现

```
GET /weaver/weaver.docs.docs.ShowDocsImageServlet?docId=1 HTTP/1.1
```

若响应头中返回 `image/jpeg; charset=UTF-8`，说明接口可正常访问。可进一步在 `docId` 参数中构造 SQL 注入语句（如 `docId=1' AND '1'='1`）读取数据库敏感信息。
