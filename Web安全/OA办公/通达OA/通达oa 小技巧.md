---
source: "hatch 补库批 20260928"
title: "通达OA 版本/用户名/邮箱/主机名路径提示"
product: "通达OA"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "未列"
prerequisites: "未说明"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_status: "unknown"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/OA%E5%8A%9E%E5%85%AC/%E9%80%9A%E8%BE%BEOA/%E9%80%9A%E8%BE%BEoa%20%E5%B0%8F%E6%8A%80%E5%B7%A7.md"
category_recommendation: "OA / 通达"
id: "vw-89d6008caa3c9c668bf98ff4"
entity_id: "ve-89d6008caa3c9c668bf98ff4"
schema_version: "1"
---

# 通达OA 版本/用户名/邮箱/主机名路径提示

## 条目说明

- 对象与具体问题：通达OA；版本/用户名/邮箱/主机名路径提示
- 版本、配置及部署条件：未列
- 认证与权限前提：未说明
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 这是侦察索引而非单漏洞；路径连写且反斜线混用

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

判断通达版本

`inc/expired.php``inc/reg_trial.php``inc\reg_trial_submit.php`

`ispirit/retrieve_pwd.php`

**GET** 参数`username`、`email` 可爆用户、邮箱

`resque/worker.php` 计算机名
