---
source: "https://github.com/LittleBear4/OA-EXPTOOL/blob/e2beff80059570bf58292d052d97a497749d87ea/book/weaver/ecology_datas%E4%BF%A1%E6%81%AF%E6%B3%84%E9%9C%B2.yaml"
title: "泛微e-cology datas动态数据查询敏感信息泄露"
product: "泛微e-cology"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "版本数据库补丁未知；sqlParams编码查询"
prerequisites: "公开模板无凭证但实际权限需核"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/OA%E5%8A%9E%E5%85%AC/%E6%B3%9B%E5%BE%AEoa/%E6%B3%9B%E5%BE%AEE-Cology%20datas%E6%8E%A5%E5%8F%A3%E6%95%8F%E6%84%9F%E4%BF%A1%E6%81%AF%E6%B3%84%E6%BC%8F%E6%BC%8F%E6%B4%9E.md"
fofa: "app=\"泛微-协同办公OA\""
id: "vw-38e1accf551b0eceee65f8ca"
entity_id: "ve-38e1accf551b0eceee65f8ca"
schema_version: "1"
source_url: "https://github.com/LittleBear4/OA-EXPTOOL/blob/e2beff80059570bf58292d052d97a497749d87ea/book/weaver/ecology_datas%E4%BF%A1%E6%81%AF%E6%B3%84%E9%9C%B2.yaml"
---

# 泛微e-cology datas动态数据查询敏感信息泄露

## 条目说明

- 对象与具体问题：泛微e-cology；datas动态数据查询敏感信息泄露
- 版本、配置及部署条件：版本数据库补丁未知；sqlParams编码查询
- 认证与权限前提：公开模板无凭证但实际权限需核
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 正文诚实标明仅请求头片段，非完整POC；指出上游多余引号及空列表误报边界
- 正确区分字段名存在和真实越权数据泄漏；固定commit来源良好
- 标准化时可标evidence=external-template而非完整复现；无需为了统一格式虚构正文

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

### 漏洞描述

泛微 E-Cology 的 `/api/ec/dev/search/datas` 是公开资料记录的数据查询泄漏入口。请求通过 `sqlParams` 指定查询字段、表、排序和条件，并用 `columns` 指定返回列；若这些输入在缺少适当权限约束时被执行，可能暴露 OA 用户记录。

### 影响范围与前提

产品：泛微 E-Cology；具体受影响版本、数据库及修复范围未知。公开模板未携带登录凭证；实际是否存在未授权数据访问需结合会话状态和返回记录确认。

### 公开验证资料

原公开模板使用 `application/x-www-form-urlencoded`，不是原稿中的 JSON 请求。`sqlParams` 内的 `tFields`、`tFrom`、`tOrder` 使用 Base64 表示字段、表名和排序字段；公开资料中的查询目标为 `HrmResource`。

完整请求体见下方固定版本模板；本文仅列出协议入口，避免把不含真实查询的 JSON 当作可复现 PoC：

```http
POST /api/ec/dev/search/datas HTTP/1.1
Host: oa.example.com
Content-Type: application/x-www-form-urlencoded
```

这是请求头片段，不是完整请求。确认条件是无相应权限的会话得到非公开、真实且与查询相符的记录。`datas`、`password`、`passwordspan` 等字段名、空列表或 HTTP 200 均不足以确认数据泄漏。公开模板请求体外还有多余引号，其可执行性需在隔离环境先核对，不应直接等同于已验证扫描器。

### 修复建议

向厂商核对当前版本和对应安全更新；在修复前限制该接口的访问，并检查相关访问日志。

### 参考来源

- [公开资料 1](https://github.com/LittleBear4/OA-EXPTOOL/blob/e2beff80059570bf58292d052d97a497749d87ea/book/weaver/ecology_datas%E4%BF%A1%E6%81%AF%E6%B3%84%E9%9C%B2.yaml)

来源已于 2026-10-02 静态核对；本文未在目标环境执行请求，公开 PoC 不代表本地复现通过。
