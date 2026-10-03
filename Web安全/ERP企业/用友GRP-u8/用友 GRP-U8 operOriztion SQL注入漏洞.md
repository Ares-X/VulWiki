---
source: "https://github.com/R4gd0ll/I-Wanna-Get-All/blob/d8b866af4baed03a338ce8485c25b53875461776/src/main/java/exp/oa/yongyou/grp/yongyou_grpu8_operOriztion_sqli.java"
title: "用友GRP-U8 operOriztion SOAP kjnd SQL 注入"
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
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/ERP%E4%BC%81%E4%B8%9A/%E7%94%A8%E5%8F%8BGRP-u8/%E7%94%A8%E5%8F%8B%20GRP-U8%20operOriztion%20SQL%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
fofa: "app=\"用友-GRP-U8\""
id: "vw-faba6f2963477b59a6e100c3"
entity_id: "ve-faba6f2963477b59a6e100c3"
schema_version: "1"
source_url: "https://github.com/R4gd0ll/I-Wanna-Get-All/blob/d8b866af4baed03a338ce8485c25b53875461776/src/main/java/exp/oa/yongyou/grp/yongyou_grpu8_operOriztion_sqli.java"
---

# 用友GRP-U8 operOriztion SOAP kjnd SQL 注入

## 条目说明

- 对象与具体问题：用友GRP-U8；operOriztion SOAP kjnd SQLi
- 版本、配置及部署条件：未知
- 认证与权限前提：未知
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 正确区分att检测SelectDMJE不能证明SOAP接口
- 命名空间与XML表单+空格错误已指出，保留纠错
- 根因/鉴权/版本仍待核，不因预检测共用合并端点

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

### 漏洞描述

用友 GRP-U8 的 `/services/operOriztion` SOAP 接口存在 SQL 注入风险。公开源码中的 `operOriztion` 方法将查询表达式放入 `getGsbmfaByKjnd` 的 `kjnd` 字段，并读取 `getGsbmfaByKjndReturn`。可影响数据库查询结果；来源不证明系统命令执行。

### 影响范围

具体受影响版本范围未披露。本文按公开 PoC 所列产品记录，不据此扩展为全版本受影响。

### 公开验证方法

完整 SOAP 请求及返回值处理见文末固定提交中 `operOriztion(String url, String sql)` 方法。该请求声明 `xsi`、`xsd`、`soapenv` 与 `wsdd` 命名空间，`wsdd` URI 为 `http://xml.apache.org/axis/wsdd/`。

原始文件的 `att()` 预检查实际访问另一条 `SelectDMJE.jsp` 路径，不能用它的延时结果证明 SOAP 接口存在漏洞。应以 `operOriztion()` 的 SOAP 请求和对应 `getGsbmfaByKjndReturn` 查询结果建立证据。本文删除了原文自行拼接、命名空间不完整且把表单 `+` 当 XML 空格的请求，未进行本地复现。

### 修复建议

向用友获取适用于当前版本的安全更新。修复时在对应数据库查询处使用参数化语句，并以最小权限数据库账户运行；修复后复核同一参数的正常请求与异常输入。

### 参考链接

- [R4gd0ll/I-Wanna-Get-All 原始 PoC（固定提交）](https://github.com/R4gd0ll/I-Wanna-Get-All/blob/d8b866af4baed03a338ce8485c25b53875461776/src/main/java/exp/oa/yongyou/grp/yongyou_grpu8_operOriztion_sqli.java)

### 网络测绘

```text
app="用友-GRP-U8"
```
