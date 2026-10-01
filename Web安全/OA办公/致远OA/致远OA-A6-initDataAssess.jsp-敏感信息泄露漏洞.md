---
source: "https://github.com/Summer177/seeyon_exp/blob/4629a298eb60ca2cf07afe2c65dc67dc170cf3c3/poc/information.py"
version: "致远 OA A6；具体版本范围未披露"
fofa: "app=\"致远互联-OA\""
---

# 致远OA A6 initDataAssess.jsp 敏感信息泄露漏洞

## 漏洞描述

致远 OA A6 的 `/yyoa/assess/js/initDataAssess.jsp` 被公开 PoC 列为用户信息泄露入口。该接口响应中的 `personList` 若在未登录状态下包含实际用户记录，可能泄露组织内人员信息；字段名称出现本身并不等于已泄露敏感数据。

## 影响范围

致远 OA A6；具体版本范围未披露。本文按公开 PoC 所列产品记录，不据此扩展为全版本受影响。

## 公开验证方法

```http
GET /yyoa/assess/js/initDataAssess.jsp HTTP/1.1
Host: example.invalid
```

来源 `initDataAssess()` 只检查 200 状态码和 `personList`，属于初步检测。需要确认请求未携带已有登录会话，响应不是登录页，并核对 `personList` 中确有不应公开的用户记录后，才能记录为信息泄露。本文仅核对公开源码，未进行本地复现。

## 修复建议

向致远获取适用更新。对人员数据接口执行统一的服务端鉴权与权限检查，避免向未登录请求返回内部用户记录。

## 参考链接

- [Summer177/seeyon_exp 原始 PoC（固定提交）](https://github.com/Summer177/seeyon_exp/blob/4629a298eb60ca2cf07afe2c65dc67dc170cf3c3/poc/information.py)

## 网络测绘

```text
app="致远互联-OA"
```
