---
source: "gelusus/wxvl 公众号漏洞文库"
title: "用友时空KSOA work_update/work_edit SQL 注入公告"
product: "用友时空KSOA"
record_type: "roundup"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "CVE-2025-15435;CVE-2025-15436"
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "9.0声明"
prerequisites: "声称未认证"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
identifier_role: "primary"
source_status: "unknown"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/ERP%E4%BC%81%E4%B8%9A/%E6%97%B6%E7%A9%BA%E6%99%BA%E5%8F%8B/%E6%BC%8F%E6%B4%9E%E9%A2%84%E8%AD%A6%20%20%E7%94%A8%E5%8F%8B%E6%97%B6%E7%A9%BAKSOA%20SQL%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
category_recommendation: "ERP / 用友 KSOA"
id: "vw-d90472cde57078abac20f6ef"
entity_id: "ve-d90472cde57078abac20f6ef"
schema_version: "1"
---

# 用友时空KSOA work_update/work_edit SQL 注入公告

## 条目说明

- 对象与具体问题：用友时空KSOA；work_update/work_edit SQLi公告
- 版本、配置及部署条件：9.0声明
- 认证与权限前提：声称未认证
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- POC已公开但正文无payload链接；官方修复仅主页无build

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

浅安
                    浅安  浅安安全   2026-02-14 00:00  
  
**0x00 漏洞编号**  
- # CVE-2025-15435  
  
- # CVE-2025-15436  
  
**0x01 危险等级**  
- 高危  
  
**0x02 漏洞概述**  
  
用友时空KSOA是建立在SOA理念指导下研发的新一代产品，它可以让流通企业各个时期建立的IT系统之间彼此轻松对话，帮助流通企业保护原有的IT投资，简化IT管理。  
  
![图片](../../.resource/remote/03d2f12776f505810003187a7a9e5638543b34f0256b7b36c4b8ac63e15f6dc9.webp "")  
  
**0x03 漏洞详情**  
####   
  
**CVE-2025-15435**  
  
**漏洞类型：**  
SQL注入  
  
**影响：**  
获取敏感信息  
  
**简述：**  
用友时空KSOA的/worksheet/work_update.jsp接口处存在  
SQL  
注入漏洞，未经身份认证的攻击者可通过该漏洞获取数据库敏感信息。  
  
**CVE-2025-15436**  
  
**漏洞类型：**  
SQL注入  
  
**影响：**  
获取敏感信息  
  
**简述：**  
用友时空KSOA的/worksheet/work_edit.jsp接口处存在  
SQL  
注入漏洞，未经身份认证的攻击者可通过该漏洞获取数据库敏感信息。  
  
**0x04 影响版本**  
- 用友时空KSOA   
9.0  
  
**0x05****POC状态**  
- 已公开  
  
**0x06****修复建议**  
  
**目前官方已发布漏洞修复版本，建议用户升级到安全版本****：**  
  
https://www.yonyou.com/  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
