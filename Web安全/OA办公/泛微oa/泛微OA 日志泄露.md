---
source: "hatch 补库批 20260928"
title: "泛微e-cology（待核） gethrmkq.jsp物理路径/日志泄漏"
product: "泛微e-cology（待核）"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "版本未知；反斜杠/Windows路径示例"
prerequisites: "未知"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_status: "unknown"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/OA%E5%8A%9E%E5%85%AC/%E6%B3%9B%E5%BE%AEoa/%E6%B3%9B%E5%BE%AEOA%20%E6%97%A5%E5%BF%97%E6%B3%84%E9%9C%B2.md"
id: "vw-125fd796cc14ea1c57288faa"
entity_id: "ve-125fd796cc14ea1c57288faa"
schema_version: "1"
---

# 泛微e-cology（待核） gethrmkq.jsp物理路径/日志泄漏

## 条目说明

- 对象与具体问题：泛微e-cology（待核）；gethrmkq.jsp物理路径/日志泄漏
- 版本、配置及部署条件：版本未知；反斜杠/Windows路径示例
- 认证与权限前提：未知
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 简介和影响空白，仅两条相对URL无响应、源码或来源
- filename=1是否报错路径泄露、1..\1..\1.txt是否实际日志读取未证明
- 应标极简待证条目，不能据此宣称任意文件读取

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

一、漏洞简介
------------

二、漏洞影响
------------

三、复现过程
------------

读取物理路径

    hrm/kq/gethrmkq.jsp?filename=1

日志下载     

    hrm/kq/gethrmkq.jsp?filename=1..\1..\1.txt
