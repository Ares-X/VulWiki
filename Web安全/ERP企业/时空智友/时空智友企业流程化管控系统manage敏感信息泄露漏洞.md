---
source: "wy876 漏洞文库"
title: "时空智友 manage/index.jsp信息暴露线索"
product: "时空智友"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "无版本"
prerequisites: "未说明"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/kypwe3tltt5kt5ud"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/ERP%E4%BC%81%E4%B8%9A/%E6%97%B6%E7%A9%BA%E6%99%BA%E5%8F%8B/%E6%97%B6%E7%A9%BA%E6%99%BA%E5%8F%8B%E4%BC%81%E4%B8%9A%E6%B5%81%E7%A8%8B%E5%8C%96%E7%AE%A1%E6%8E%A7%E7%B3%BB%E7%BB%9Fmanage%E6%95%8F%E6%84%9F%E4%BF%A1%E6%81%AF%E6%B3%84%E9%9C%B2%E6%BC%8F%E6%B4%9E.md"
fofa_unverified: "web.icon=="
hunter: "web.icon==\"2464cbce5dd2681dd4fb62d055520d78\""
id: "vw-458d77bd876c100ba6a69fc6"
entity_id: "ve-458d77bd876c100ba6a69fc6"
schema_version: "1"
---

# 时空智友 manage/index.jsp信息暴露线索

## 条目说明

- 对象与具体问题：时空智友；manage/index.jsp信息暴露线索
- 版本、配置及部署条件：无版本
- 认证与权限前提：未说明
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 只有路径无敏感字段、请求、响应和权限边界，不能认定具体漏洞
- Hunter误fofa残缺，标题影响泛化

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

## 一、漏洞简介
时空智友企业流程化管控系统是一个用于企业流程管理和控制的软件系统。它旨在帮助企业实现流程的规范化、自动化和优化，从而提高工作效率、降低成本并提升管理水平。时空智友企业流程化管控系统敏感信息泄露,攻击者可通过此漏洞获取敏感信息。

## 二、影响版本
+ 时空智友企业流程化管控系统

## 三、资产测绘
+ hunter`web.icon=="2464cbce5dd2681dd4fb62d055520d78"`
+ 登录页面


## 四、漏洞复现
```plain
/manage/index.jsp
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/kypwe3tltt5kt5ud>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
