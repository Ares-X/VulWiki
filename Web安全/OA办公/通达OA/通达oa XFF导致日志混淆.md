---
source: "hatch 补库批 20260928"
title: "通达OA XFF审计日志来源IP伪造"
product: "通达OA"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "2013/2015"
prerequisites: "代理信任/登录前提未知"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_status: "unknown"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/OA%E5%8A%9E%E5%85%AC/%E9%80%9A%E8%BE%BEOA/%E9%80%9A%E8%BE%BEoa%20XFF%E5%AF%BC%E8%87%B4%E6%97%A5%E5%BF%97%E6%B7%B7%E6%B7%86.md"
category_recommendation: "OA / 通达"
id: "vw-5eb6c5a99509a71c5aaaa116"
entity_id: "ve-5eb6c5a99509a71c5aaaa116"
schema_version: "1"
---

# 通达OA XFF审计日志来源IP伪造

## 条目说明

- 对象与具体问题：通达OA；XFF审计日志来源IP伪造
- 版本、配置及部署条件：2013/2015
- 认证与权限前提：代理信任/登录前提未知
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 明确此处无XSS，不能标XSS
- 只描述无端点请求，尾image占位，缺日志字段和反代信任边界

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

一、漏洞简介
------------

二、漏洞影响
------------

2013、2015版本

三、复现过程
------------

使用header中的X-Forwarded-For想伪装⾃己的IP地址，你的IP地址会直接进⼊安全审计日志⾥面。很多地方你也可以配置这个来进行XSS盲打，但是此处不存在XSS。

image
