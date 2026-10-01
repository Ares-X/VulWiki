---
cve: ""
fofa: "app=\"泛微-协同办公OA\""
version: "未知"
source: "https://github.com/LittleBear4/OA-EXPTOOL/blob/e2beff80059570bf58292d052d97a497749d87ea/book/weaver/ecology_datas%E4%BF%A1%E6%81%AF%E6%B3%84%E9%9C%B2.yaml"
---

# 泛微E-Cology datas接口敏感信息泄漏漏洞

## 漏洞描述

泛微 E-Cology 的 `/api/ec/dev/search/datas` 是公开资料记录的数据查询泄漏入口。请求通过 `sqlParams` 指定查询字段、表、排序和条件，并用 `columns` 指定返回列；若这些输入在缺少适当权限约束时被执行，可能暴露 OA 用户记录。

## 影响范围与前提

产品：泛微 E-Cology；具体受影响版本、数据库及修复范围未知。公开模板未携带登录凭证；实际是否存在未授权数据访问需结合会话状态和返回记录确认。

## 公开验证资料

原公开模板使用 `application/x-www-form-urlencoded`，不是原稿中的 JSON 请求。`sqlParams` 内的 `tFields`、`tFrom`、`tOrder` 使用 Base64 表示字段、表名和排序字段；公开资料中的查询目标为 `HrmResource`。

完整请求体见下方固定版本模板；本文仅列出协议入口，避免把不含真实查询的 JSON 当作可复现 PoC：

```http
POST /api/ec/dev/search/datas HTTP/1.1
Host: oa.example.com
Content-Type: application/x-www-form-urlencoded
```

这是请求头片段，不是完整请求。确认条件是无相应权限的会话得到非公开、真实且与查询相符的记录。`datas`、`password`、`passwordspan` 等字段名、空列表或 HTTP 200 均不足以确认数据泄漏。公开模板请求体外还有多余引号，其可执行性需在隔离环境先核对，不应直接等同于已验证扫描器。

## 修复建议

向厂商核对当前版本和对应安全更新；在修复前限制该接口的访问，并检查相关访问日志。

## 参考来源

- [公开资料 1](https://github.com/LittleBear4/OA-EXPTOOL/blob/e2beff80059570bf58292d052d97a497749d87ea/book/weaver/ecology_datas%E4%BF%A1%E6%81%AF%E6%B3%84%E9%9C%B2.yaml)

来源已于 2026-10-02 静态核对；本文未在目标环境执行请求，公开 PoC 不代表本地复现通过。
