---
source: "hatch 补库批 20260928"
title: "通达OA get_userinfo/ipanel/info部门信息暴露"
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
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_status: "unknown"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/OA%E5%8A%9E%E5%85%AC/%E9%80%9A%E8%BE%BEOA/%E9%80%9A%E8%BE%BEoa%20%E2%BB%9A%E9%9D%A2%E6%95%8F%E6%84%9F%E4%BF%A1%E6%81%AF%E6%B3%84%EF%A4%B8.md"
category_recommendation: "OA / 通达"
id: "vw-d4ef688e6c77056b0d243ff6"
entity_id: "ve-d4ef688e6c77056b0d243ff6"
schema_version: "1"
---

# 通达OA get_userinfo/ipanel/info部门信息暴露

## 条目说明

- 对象与具体问题：通达OA；get_userinfo/ipanel/info部门信息暴露
- 版本、配置及部署条件：2013/2015
- 认证与权限前提：未说明
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 3条URL无请求/响应/权限对照，不能确认是公开数据还是越权
- 空简介，来源无原链接，需分实体

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

一、漏洞简介
------------

二、漏洞影响
------------

2013、2015版本

三、复现过程
------------

POC:

    http://0-sec.org/general/get_userinfo.php
    http://0-sec.org/general/ipanel/user/query.php
    http://0-sec.org/general/info/dept
