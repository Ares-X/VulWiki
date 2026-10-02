---
source: "https://github.com/LittleBear4/OA-EXPTOOL/blob/e2beff80059570bf58292d052d97a497749d87ea/book/weaver/oa%E6%B3%9B%E5%BE%AE0day%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E8%AF%BB%E5%8F%96.yaml"
title: "泛微e-cology portalTsLogin配置路径越界读取"
product: "泛微e-cology"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "版本披露补丁未知；仅验证weaver.properties"
prerequisites: "来源请求无凭证，实际需核"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_status: "unknown"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/OA%E5%8A%9E%E5%85%AC/%E6%B3%9B%E5%BE%AEoa/%E6%B3%9B%E5%BE%AEOA%20portalTsLogin%20%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6%E8%AF%BB%E5%8F%96%E6%BC%8F%E6%B4%9E.md"
fofa: "app=\"泛微-协同办公OA\""
id: "vw-f284debadfab5b9bc37be6b9"
entity_id: "ve-f284debadfab5b9bc37be6b9"
schema_version: "1"
---

# 泛微e-cology portalTsLogin配置路径越界读取

## 条目说明

- 对象与具体问题：泛微e-cology；portalTsLogin配置路径越界读取
- 版本、配置及部署条件：版本披露补丁未知；仅验证weaver.properties
- 认证与权限前提：来源请求无凭证，实际需核
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 主动移除无时效依据0day称呼，未把已示配置读取扩为任意路径
- 完整编码路径与实际键值判断；固定commit可追溯
- 需补厂商配置边界，避免把空配置键当凭证泄露

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

### 漏洞描述

公开模板记录泛微 E-Cology 的 `getE9DevelopAllNameValue2` 接口可通过 `fileName` 中的相对路径读取产品配置。示例路径解码后包含 `portaldev_/../weaver.properties`，可能暴露数据库连接配置。

### 影响范围与前提

产品：泛微 E-Cology；受影响版本、披露日期与厂商修复状态未知。没有足够时效性证据将其称为“0day”。公开请求未携带凭证，但具体部署认证状态仍需核对。

### 公开验证资料

```http
GET /api/portalTsLogin/utils/getE9DevelopAllNameValue2?fileName=portaldev_%2f%2e%2e%2fweaver%2eproperties HTTP/1.1
Host: oa.example.com
```

应核对返回数据是否来自目标配置文件，是否存在具有实际值的 `ecology.password`、`ecology.charset`、`ecology.maxidletime` 等相关键。仅键名、空值、错误提示或 HTTP 200 不足以确认敏感配置泄露。该资料没有验证 `WEB-INF/web.xml` 或其他任意路径，本文不扩展读取范围。

### 修复建议

向厂商核对当前版本和对应安全更新；在修复前限制该接口的访问，并检查相关访问日志。

### 参考来源

- [公开资料 1](https://github.com/LittleBear4/OA-EXPTOOL/blob/e2beff80059570bf58292d052d97a497749d87ea/book/weaver/oa%E6%B3%9B%E5%BE%AE0day%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E8%AF%BB%E5%8F%96.yaml)

来源已于 2026-10-02 静态核对；本文未在目标环境执行请求，公开 PoC 不代表本地复现通过。
