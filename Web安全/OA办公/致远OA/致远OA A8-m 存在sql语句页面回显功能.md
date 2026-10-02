---
source: "hatch 补库批 20260928"
title: "致远A8-m（待核） test.jsp SQL执行入口片段"
product: "致远A8-m（待核）"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "A8-m声称但/yyoa路径同A6报告，待确认"
prerequisites: "未知"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_status: "unknown"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/OA%E5%8A%9E%E5%85%AC/%E8%87%B4%E8%BF%9COA/%E8%87%B4%E8%BF%9COA%20A8-m%20%E5%AD%98%E5%9C%A8sql%E8%AF%AD%E5%8F%A5%E9%A1%B5%E9%9D%A2%E5%9B%9E%E6%98%BE%E5%8A%9F%E8%83%BD.md"
id: "vw-aa75b123d483e031c2611d01"
entity_id: "ve-aa75b123d483e031c2611d01"
schema_version: "1"
---

# 致远A8-m（待核） test.jsp SQL执行入口片段

## 条目说明

- 对象与具体问题：致远A8-m（待核）；test.jsp SQL执行入口片段
- 版本、配置及部署条件：A8-m声称但/yyoa路径同A6报告，待确认
- 认证与权限前提：未知
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 仅URL且@@datadi明显截断，应待恢复不能自动修猜
- 产品A8-m与同端点A6归属冲突，需版本证据
- 简介空白，无结果/原文/补丁

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

一、漏洞简介
------------

二、漏洞影响
------------

致远OA A8-m

三、复现过程
------------

    http://wwww.0-sec.org/yyoa/common/js/menu/test.jsp?doType=101&S1=select%20@@datadi
