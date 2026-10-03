---
source: "https://github.com/R4gd0ll/I-Wanna-Get-All/blob/d8b866af4baed03a338ce8485c25b53875461776/src/main/java/exp/oa/yongyou/grp/yongyou_grpu8_dialogmoreUsercheck_sqli.java"
title: "用友GRP-U8 dialog_moreUser_check mlid SQL 注入"
product: "用友GRP-U8"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "未知"
prerequisites: "未知"
side_effects: "命令/代码执行示例可能改变主机状态"
review_date: "2026-10-02"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/ERP%E4%BC%81%E4%B8%9A/%E7%94%A8%E5%8F%8BGRP-u8/%E7%94%A8%E5%8F%8B%20GRP-U8%20dialog_moreUser_check.jsp%20SQL%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
fofa: "app=\"用友-GRP-U8\""
id: "vw-c4c69c48533866e600989558"
entity_id: "ve-c4c69c48533866e600989558"
schema_version: "1"
source_url: "https://github.com/R4gd0ll/I-Wanna-Get-All/blob/d8b866af4baed03a338ce8485c25b53875461776/src/main/java/exp/oa/yongyou/grp/yongyou_grpu8_dialogmoreUsercheck_sqli.java"
---

# 用友GRP-U8 dialog_moreUser_check mlid SQL 注入

## 条目说明

- 对象与具体问题：用友GRP-U8；dialog_moreUser_check mlid SQLi
- 版本、配置及部署条件：未知
- 认证与权限前提：未知
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 固定Java来源和单3秒判据缺陷披露清楚，不支持命令执行结论
- 仍需认证/正常基线/根因/修复build；保留独立参数mlid

## 操作风险

命令/代码执行示例可能改变主机状态。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

### 漏洞描述

用友 GRP-U8 的 `/u8qx/dialog_moreUser_check.jsp` 接口存在 SQL 注入风险。公开 Java PoC 在 `mlid` 参数中使用 MSSQL 延时表达式。成功注入可能影响数据库数据；来源没有提供系统命令执行证据。

### 影响范围

具体受影响版本范围未披露。本文按公开 PoC 所列产品记录，不据此扩展为全版本受影响。

### 公开验证方法

```http
GET /u8qx/dialog_moreUser_check.jsp?mlid=1';WAITFOR+DELAY+'0:0:3'-- HTTP/1.1
Host: example.invalid
```

原始代码使用大于 3000 毫秒的响应时长作为判定，未做基线或重复对照。公开模板中的延时条件属于检测线索。验证时需记录正常请求基线并重复对照，确认延时随注入值变化；单次慢响应、超时或 200 状态码均不足以确认 SQL 注入。本条目未进行本地复现。

### 修复建议

向用友获取适用于当前版本的安全更新。修复时在对应数据库查询处使用参数化语句，并以最小权限数据库账户运行；修复后复核同一参数的正常请求与异常输入。

### 参考链接

- [R4gd0ll/I-Wanna-Get-All 原始 PoC（固定提交）](https://github.com/R4gd0ll/I-Wanna-Get-All/blob/d8b866af4baed03a338ce8485c25b53875461776/src/main/java/exp/oa/yongyou/grp/yongyou_grpu8_dialogmoreUsercheck_sqli.java)

### 网络测绘

```text
app="用友-GRP-U8"
```
