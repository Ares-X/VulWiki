---
source: "https://github.com/Summer177/seeyon_exp/blob/4629a298eb60ca2cf07afe2c65dc67dc170cf3c3/poc/information.py"
title: "致远A6 initDataAssess.jsp用户信息泄漏"
product: "致远A6"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "A6具体范围未披露"
prerequisites: "明确确认未登录会话"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_status: "unknown"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/OA%E5%8A%9E%E5%85%AC/%E8%87%B4%E8%BF%9COA/%E8%87%B4%E8%BF%9COA-A6-initDataAssess.jsp-%E6%95%8F%E6%84%9F%E4%BF%A1%E6%81%AF%E6%B3%84%E9%9C%B2%E6%BC%8F%E6%B4%9E.md"
fofa: "app=\"致远互联-OA\""
id: "vw-c438a3738fdaf1ebbd799b2e"
entity_id: "ve-c438a3738fdaf1ebbd799b2e"
schema_version: "1"
---

# 致远A6 initDataAssess.jsp用户信息泄漏

## 条目说明

- 对象与具体问题：致远A6；initDataAssess.jsp用户信息泄漏
- 版本、配置及部署条件：A6具体范围未披露
- 认证与权限前提：明确确认未登录会话
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 固定commit出处、personList实际非公开记录确认而非字段/200误报
- 不夸大全版本，修复建议按服务端鉴权，已明示未本地复现
- 仍缺实际返回结构与厂商补丁，但不应视为无证据占位文章

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

### 漏洞描述

致远 OA A6 的 `/yyoa/assess/js/initDataAssess.jsp` 被公开 PoC 列为用户信息泄露入口。该接口响应中的 `personList` 若在未登录状态下包含实际用户记录，可能泄露组织内人员信息；字段名称出现本身并不等于已泄露敏感数据。

### 影响范围

致远 OA A6；具体版本范围未披露。本文按公开 PoC 所列产品记录，不据此扩展为全版本受影响。

### 公开验证方法

```http
GET /yyoa/assess/js/initDataAssess.jsp HTTP/1.1
Host: example.invalid
```

来源 `initDataAssess()` 只检查 200 状态码和 `personList`，属于初步检测。需要确认请求未携带已有登录会话，响应不是登录页，并核对 `personList` 中确有不应公开的用户记录后，才能记录为信息泄露。本文仅核对公开源码，未进行本地复现。

### 修复建议

向致远获取适用更新。对人员数据接口执行统一的服务端鉴权与权限检查，避免向未登录请求返回内部用户记录。

### 参考链接

- [Summer177/seeyon_exp 原始 PoC（固定提交）](https://github.com/Summer177/seeyon_exp/blob/4629a298eb60ca2cf07afe2c65dc67dc170cf3c3/poc/information.py)

### 网络测绘

```text
app="致远互联-OA"
```
