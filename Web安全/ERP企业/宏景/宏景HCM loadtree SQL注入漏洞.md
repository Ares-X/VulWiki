---
source: "https://github.com/Co5mos/nuclei-tps/blob/5bc8b820acf9c992602cc7566e205e6cf1c463dd/http/vulnerabilities/hjsoft/hjsoft-hcm-loadtree-sqli.yaml"
title: "宏景HCM/eHR common/org/loadtree parentid SQL 注入"
product: "宏景HCM/eHR"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "未知"
prerequisites: "oauthservlet路径变体"
side_effects: "命令/代码执行示例可能改变主机状态"
review_date: "2026-10-02"
source_status: "unknown"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/ERP%E4%BC%81%E4%B8%9A/%E5%AE%8F%E6%99%AF/%E5%AE%8F%E6%99%AFHCM%20loadtree%20SQL%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
fofa: "app=\"HJSOFT-HCM\""
id: "vw-055de6afab749bf63fa45611"
entity_id: "ve-055de6afab749bf63fa45611"
schema_version: "1"
---

# 宏景HCM/eHR common/org/loadtree parentid SQL 注入

## 条目说明

- 对象与具体问题：宏景HCM/eHR；common/org/loadtree parentid SQLi
- 版本、配置及部署条件：未知
- 认证与权限前提：oauthservlet路径变体
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 单5秒判据局限已清楚，无盲目数据导出/RCE泛化
- 与46不同路由不能只同parentid合并；需根因判断同处理代码
- 缺build/鉴权/路径绕过解释

## 操作风险

命令/代码执行示例可能改变主机状态。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

### 漏洞描述

宏景 HCM 的 `/common/org/loadtree` 存在公开 SQL 注入检测模板，注入位置为 `parentid`。

### 影响版本与前提

宏景 HCM/e-HR；确切受影响版本、修复版本及不同部署的鉴权条件未知。来源模板的请求未提供业务登录凭据；这不等于所有部署均可未授权利用。

### 网络测绘

```text
app="HJSOFT-HCM"
```

### 公开验证资料

以下请求摘自公开来源，主机名如有展示统一为 `example.invalid`；仅作为授权环境中的资料参考。

```http
GET /w_selfservice/oauthservlet/%2e./.%2e/common/org/loadtree?params=child&treetype=1&parentid=1%27%3BWAITFOR+DELAY+%270%3A0%3A5%27--&kind=2&issuperuser=1&manageprive=1&action=1&target=1&backdate=1&jump=1 HTTP/1.1
```

### 判定与证据边界

上游以 `duration >= 5` 匹配延时。单次慢响应不足以确认注入，必须与正常请求耗时、重复请求结果对照；本文不扩展为数据提取或命令执行结论。

本篇仅静态核对公开资料，未对目标发包，未运行利用工具，也未完成本地复现。

### 修复建议

向厂商核对当前安装版本与可用补丁，在完成修复前限制相关接口的访问。修复对应查询的输入拼接，使用参数化查询，并限制数据库账户权限。

### 参考来源

- [公开检测模板](https://github.com/Co5mos/nuclei-tps/blob/5bc8b820acf9c992602cc7566e205e6cf1c463dd/http/vulnerabilities/hjsoft/hjsoft-hcm-loadtree-sqli.yaml)
