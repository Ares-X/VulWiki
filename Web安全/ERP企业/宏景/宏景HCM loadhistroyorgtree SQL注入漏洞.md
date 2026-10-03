---
source: "https://github.com/projectdiscovery/nuclei-templates/blob/8b9d065ccb0492d39f7680c908b3030a97ddfe1b/http/cves/2023/CVE-2023-6655.yaml"
title: "宏景eHR2020 loadhistroyorgtree parentid SQL 注入"
product: "宏景eHR2020"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "CVE-2023-6655"
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "CNA声称2020，其他未知"
prerequisites: "模板无Cookie，实际未验"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
identifier_role: "primary"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/ERP%E4%BC%81%E4%B8%9A/%E5%AE%8F%E6%99%AF/%E5%AE%8F%E6%99%AFHCM%20loadhistroyorgtree%20SQL%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
fofa: "app=\"HJSOFT-HCM\""
id: "vw-446ae85be84ee09455c24e5b"
entity_id: "ve-446ae85be84ee09455c24e5b"
schema_version: "1"
source_url: "https://github.com/projectdiscovery/nuclei-templates/blob/8b9d065ccb0492d39f7680c908b3030a97ddfe1b/http/cves/2023/CVE-2023-6655.yaml"
---

# 宏景eHR2020 loadhistroyorgtree parentid SQL 注入

## 条目说明

- 对象与具体问题：宏景eHR2020；loadhistroyorgtree parentid SQLi
- 版本、配置及部署条件：CNA声称2020，其他未知
- 认证与权限前提：模板无Cookie，实际未验
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 有CVE/固定官方模板和CNA来源，证据边界清楚
- 单6秒及产品指纹不能独立证注入，文已提醒
- CNA引用main非固定快照；缺修复build

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

### 漏洞描述

CVE-2023-6655 记录宏景 e-HR 2020 的 `loadhistroyorgtree` 接口 SQL 注入，输入位置为 `parentid`。公开 Nuclei 模板包含产品页面识别和延时请求两步。

### 影响版本与前提

CNA 记录确认 e-HR 2020；其他版本是否受影响、确切修复版本未知。公开模板针对无需提供登录 Cookie 的请求，但本次未核验实际部署。

### 网络测绘

```text
app="HJSOFT-HCM"
```

### 公开验证资料

以下请求摘自公开来源，主机名如有展示统一为 `example.invalid`；仅作为授权环境中的资料参考。

```http
GET /w_selfservice/oauthservlet/%2e./.%2e/general/inform/org/loadhistroyorgtree?isroot=child&parentid=1%27%3BWAITFOR+DELAY+%270%3A0%3A6%27--&kind=2&catalog_id=11&issuperuser=111&manageprive=111&action=111&target= HTTP/1.1
```

### 判定与证据边界

模板先要求首页为 HTTP 200 且包含 `/hcm/themes/`，再以注入请求的 `duration >= 6` 为检测线索。单次超过 6 秒不能独立确证 SQL 注入，应结合正常请求基线及重复对照排除网络和服务波动。

本篇仅静态核对公开资料，未对目标发包，未运行利用工具，也未完成本地复现。

### 修复建议

向厂商核对当前安装版本与可用补丁，在完成修复前限制相关接口的访问。修复对应查询的输入拼接，使用参数化查询，并限制数据库账户权限。

### 参考来源

- [公开检测模板](https://github.com/projectdiscovery/nuclei-templates/blob/8b9d065ccb0492d39f7680c908b3030a97ddfe1b/http/cves/2023/CVE-2023-6655.yaml)
- [公开CVE 记录](https://github.com/CVEProject/cvelistV5/blob/main/cves/2023/6xxx/CVE-2023-6655.json)
