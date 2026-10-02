---
source: "hatch 补库批 20260928"
title: "通达OA ugo OA_USER账户切换"
product: "通达OA"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "2013/2015"
prerequisites: "已有普通用户登录"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_status: "unknown"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/OA%E5%8A%9E%E5%85%AC/%E9%80%9A%E8%BE%BEOA/%E9%80%9A%E8%BE%BEoa%20%E4%BB%BB%E6%84%8F%E8%B4%A6%E5%8F%B7%E8%B7%B3%E8%BD%AC.md"
category_recommendation: "OA / 通达"
id: "vw-05a82ff6457a7380736d5e99"
entity_id: "ve-05a82ff6457a7380736d5e99"
schema_version: "1"
---

# 通达OA ugo OA_USER账户切换

## 条目说明

- 对象与具体问题：通达OA；ugo OA_USER账户切换
- 版本、配置及部署条件：2013/2015
- 认证与权限前提：已有普通用户登录
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 正文截断，无管理员态成功证据/根因/修复
- 不能归未授权登录；需确认水平还是垂直越权

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

一、漏洞简介
------------

需要登录

二、漏洞影响
------------

2013、2015版本

三、复现过程
------------

POC:

    http://0-sec.org/interface/ugo.php?OA_USER=admin

通过控制OA\_USER参数进行任意⽤户的跳转，⽐如说你现在是个普通权限的⽤户，使用这个⻚面即可跳转到
