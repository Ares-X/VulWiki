---
source: "https://github.com/zan8in/afrog-pocs/blob/253291be2d307a6c836d5997bbb838f1e846f9ba/vulnerability/yonyou-grp-u8-bx-historyDataChecks-sqli.yaml"
title: "用友GRP-U8 bx_historyDataCheck userName SQL 注入"
product: "用友GRP-U8"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "未知"
prerequisites: "未核"
side_effects: "命令/代码执行示例可能改变主机状态"
review_date: "2026-10-02"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/ERP%E4%BC%81%E4%B8%9A/%E7%94%A8%E5%8F%8BGRP-u8/%E7%94%A8%E5%8F%8B%20GRP-U8%20bx_historyDataCheck.jsp%20SQL%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
fofa: "app=\"用友-GRP-U8\""
id: "vw-cee134aa5e01362256d3b669"
entity_id: "ve-cee134aa5e01362256d3b669"
schema_version: "1"
source_url: "https://github.com/zan8in/afrog-pocs/blob/253291be2d307a6c836d5997bbb838f1e846f9ba/vulnerability/yonyou-grp-u8-bx-historyDataChecks-sqli.yaml"
---

# 用友GRP-U8 bx_historyDataCheck userName SQL 注入

## 条目说明

- 对象与具体问题：用友GRP-U8；bx_historyDataCheck userName SQLi
- 版本、配置及部署条件：未知
- 认证与权限前提：未核
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 模板时间窗窄受网络波动，文已补正常基线要求
- 缺组件build/认证/修复根因

## 操作风险

命令/代码执行示例可能改变主机状态。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

### 漏洞描述

用友 GRP-U8 的 `/u8qx/bx_historyDataCheck.jsp` 接口存在 SQL 注入风险。公开模板将 MSSQL 延时语句放入 `userName` 参数，以识别参数拼接到数据库查询后的行为；该证据不自动证明写入文件或执行系统命令。

### 影响范围

具体受影响版本范围未披露。本文按公开 PoC 所列产品记录，不据此扩展为全版本受影响。

### 公开验证方法

```http
POST /u8qx/bx_historyDataCheck.jsp HTTP/1.1
Host: example.invalid
Content-Type: application/x-www-form-urlencoded

userName=';WAITFOR DELAY '0:0:10'--&ysnd=&historyFlag=
```

公开模板依次测试 10、6、10、6 秒延时，要求 200 状态码，响应时长分别落入 10–11 秒、6–7 秒。公开模板中的延时条件属于检测线索。验证时需记录正常请求基线并重复对照，确认延时随注入值变化；单次慢响应、超时或 200 状态码均不足以确认 SQL 注入。本条目未进行本地复现。

### 修复建议

向用友获取适用于当前版本的安全更新。修复时在对应数据库查询处使用参数化语句，并以最小权限数据库账户运行；修复后复核同一参数的正常请求与异常输入。

### 参考链接

- [zan8in/afrog-pocs 原始 PoC（固定提交）](https://github.com/zan8in/afrog-pocs/blob/253291be2d307a6c836d5997bbb838f1e846f9ba/vulnerability/yonyou-grp-u8-bx-historyDataChecks-sqli.yaml)

### 网络测绘

```text
app="用友-GRP-U8"
```
