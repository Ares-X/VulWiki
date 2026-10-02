---
source: "hatch 补库批 20260928"
title: "致远A8-m management/status.jsp固定管理口令声称"
product: "致远A8-m"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "A8-m无build范围"
prerequisites: "需要给出的固定口令，不是无认证"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_status: "unknown"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/OA%E5%8A%9E%E5%85%AC/%E8%87%B4%E8%BF%9COA/%E8%87%B4%E8%BF%9COA%20A8-m%20%E5%90%8E%E5%8F%B0%E4%B8%87%E8%83%BD%E5%AF%86%E7%A0%81.md"
id: "vw-c3f3626514f3078b7a142475"
entity_id: "ve-c3f3626514f3078b7a142475"
schema_version: "1"
---

# 致远A8-m management/status.jsp固定管理口令声称

## 条目说明

- 对象与具体问题：致远A8-m；management/status.jsp固定管理口令声称
- 版本、配置及部署条件：A8-m无build范围
- 认证与权限前提：需要给出的固定口令，不是无认证
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 仅口令和路径，无原文/成功响应/默认或硬编码机制
- 结尾输入logi明显截断，复现不完整
- 与未授权status页报告存在条件分歧，保留候选不直接合并

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

一、漏洞简介
------------

二、漏洞影响
------------

致远OA A8-m

三、复现过程
------------

密码：

    WLCCYBD@SEEYON

登陆地址：

    http://www.0-sec.org/seeyon/management/status.jsp

成功之后 输入 logi
