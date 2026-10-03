---
source: "wy876 漏洞文库"
title: "竞优商业租赁管理系统 ASP.NET Trace.axd信息泄露"
product: "竞优商业租赁管理系统"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "版本未知，需启用跟踪且远程可访问"
prerequisites: "未说明"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/kf3819ge5d4qk9wk"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E7%AB%9E%E4%BC%98%EF%BC%88%E5%B9%BF%E5%B7%9E%EF%BC%89%E4%BF%A1%E6%81%AF%E6%8A%80%E6%9C%AF%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8/%E7%AB%9E%E4%BC%98%EF%BC%88%E5%B9%BF%E5%B7%9E%EF%BC%89%E4%BF%A1%E6%81%AF%E6%8A%80%E6%9C%AF%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8%E5%95%86%E4%B8%9A%E7%A7%9F%E8%B5%81%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9F%E5%AD%98%E5%9C%A8Trace%E4%BF%A1%E6%81%AF%E6%B3%84%E9%9C%B2.md"
fofa: "web.body=\"商业租赁管理系统\""
fofa_unverified: "web.body="
id: "vw-b53399adbcf7828e30e0a1b9"
entity_id: "ve-b53399adbcf7828e30e0a1b9"
schema_version: "1"
---

# 竞优商业租赁管理系统 ASP.NET Trace.axd信息泄露

## 条目说明

- 对象与具体问题：竞优商业租赁管理系统；ASP.NET Trace.axd信息泄露
- 版本、配置及部署条件：版本未知，需启用跟踪且远程可访问
- 认证与权限前提：未说明
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 仅/RMS/Trace.axd路径，不证明跟踪开启或敏感数据暴露
- 应作为配置相关信息暴露，区别491账户接口漏洞；无返回/修复，营销简介冗长

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

## 一、漏洞简介
作为地产及不动产数字化行业深耕者，三十多年来始终专注于企业管理软件的技术开发和咨询服务。我们多年对地产及不动产行业的专注投入、以及深刻理解能为企业提供专业的产品、高效的实施服务、强大的技术支持和优质的售后保障。竞优（广州）信息技术有限公司商业租赁管理系统存在Trace信息泄露

## 二、影响版本
+ 商业租赁管理系统

## 三、资产测绘
+ fofa：`web.body="商业租赁管理系统"`
+ 特征


## 四、漏洞复现
```java
/RMS/Trace.axd
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/kf3819ge5d4qk9wk>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
