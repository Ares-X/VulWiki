---
source: "https://github.com/LittleBear4/OA-EXPTOOL/blob/e2beff80059570bf58292d052d97a497749d87ea/book/yonyou/oa%E7%94%A8%E5%8F%8B%20GRP-u8sql%E6%B3%A8%E5%85%A53.yaml"
title: "用友GRP-U8 listSelectDialogServlet slCdtn SQL 注入"
product: "用友GRP-U8"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "未知"
prerequisites: "多IP头前提，未知"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_status: "unknown"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/ERP%E4%BC%81%E4%B8%9A/%E7%94%A8%E5%8F%8BGRP-u8/%E7%94%A8%E5%8F%8B%20GRP-U8%20listSelectDialogServlet%20SQL%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
fofa: "app=\"用友-GRP-U8\""
id: "vw-d682e80ed80304682cba1fc3"
entity_id: "ve-d682e80ed80304682cba1fc3"
schema_version: "1"
---

# 用友GRP-U8 listSelectDialogServlet slCdtn SQL 注入

## 条目说明

- 对象与具体问题：用友GRP-U8；listSelectDialogServlet slCdtn SQLi
- 版本、配置及部署条件：未知
- 认证与权限前提：多IP头前提，未知
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 原模板延时payload却只200/[]判定已揭示重要误报点
- 正文只有入口指源，明确非完整复现请求可接受
- 需实际SQL证据及IP头是否影响鉴权，缺build

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

### 漏洞描述

用友 GRP-U8 的 `listSelectDialogServlet` 接口存在 SQL 注入风险。公开 PoC 在 `slCdtn` 查询条件中插入 MSSQL 延时表达式；影响取决于应用数据库账户权限，不能由该请求直接推断可执行系统命令。

### 影响范围

具体受影响版本范围未披露。本文按公开 PoC 所列产品记录，不据此扩展为全版本受影响。

### 公开验证方法

完整原始请求见文末固定提交的 YAML：`GET /listSelectDialogServlet`，参数为 `slType`、`slCdtn`。模板还设置了多个来源 IP 请求头，这些条件不应在转写时静默省略。

原始请求带 2 秒延时表达式，但模板最终仅检查 200 状态码与 `[]`，没有检查延时，因此自动命中不足以证明 SQL 注入。应在授权环境核对正常请求基线、延时相关性及实际查询行为后再作结论。本文只保存公开 PoC 入口和其局限，未进行本地复现。

### 修复建议

向用友获取适用于当前版本的安全更新。修复时在对应数据库查询处使用参数化语句，并以最小权限数据库账户运行；修复后复核同一参数的正常请求与异常输入。

### 参考链接

- [LittleBear4/OA-EXPTOOL 原始 PoC（固定提交）](https://github.com/LittleBear4/OA-EXPTOOL/blob/e2beff80059570bf58292d052d97a497749d87ea/book/yonyou/oa%E7%94%A8%E5%8F%8B%20GRP-u8sql%E6%B3%A8%E5%85%A53.yaml)

### 网络测绘

```text
app="用友-GRP-U8"
```
