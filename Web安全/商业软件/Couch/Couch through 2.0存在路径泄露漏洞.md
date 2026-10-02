---
source: "Mr-xn/Penetration_Testing_POC"
title: "CouchCMS 直接PHP错误页路径泄露"
product: "CouchCMS"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "CVE-2018-7662"
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "through2.0意为截至2.0；错误显示/文件可达"
prerequisites: "未知"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
identifier_role: "primary"
source_status: "unknown"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/Couch/Couch%20through%202.0%E5%AD%98%E5%9C%A8%E8%B7%AF%E5%BE%84%E6%B3%84%E9%9C%B2%E6%BC%8F%E6%B4%9E.md"
id: "vw-af72548492712dd312202f68"
entity_id: "ve-187b0be719bc3b2c547a3a51"
schema_version: "1"
canonical: "Web安全/CMS内容/Couchcms/（CVE-2018-7662）Couchcms 2.0 存在路径泄露漏洞.md"
relation_type: "duplicate_of"
---

# CouchCMS 直接PHP错误页路径泄露

## 条目说明

- 对象与具体问题：CouchCMS；直接PHP错误页路径泄露
- 版本、配置及部署条件：through2.0意为截至2.0；错误显示/文件可达
- 认证与权限前提：未知
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- Couch through误被当产品名称，应CouchCMS，移CMS类
- 两相对文件无HTTP响应，不知错误配置条件；只路径泄露不任意读取
- 保留issue46，缺修复版本

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

#### 漏洞简介  

|漏洞名称|上报日期|漏洞发现者|产品首页|软件链接|版本|CVE编号|
--------|--------|---------|--------|-------|----|------|
|Couch through 2.0存在路径泄露漏洞|2018-03-04| zzw (zzw@5ecurity.cn)|[https://github.com/CouchCMS/CouchCMS/](https://github.com/CouchCMS/CouchCMS/) | [https://github.com/CouchCMS/CouchCMS/](https://github.com/CouchCMS/CouchCMS/) |2.0 | [CVE-2018-7662](http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2018-7662)|  


##### 漏洞概述  

> Couch through 2.0存在路径泄露漏洞，当访问特定url时系统返回的报错信息中暴露物理路径信息。Couch through是一个在github上开源的系统，漏洞发现者已经将漏洞信息通过[issues](https://github.com/CouchCMS/CouchCMS/issues/46)告知作者。  


#### POC实现代码如下：  

------

访问如下页面，报错信息中显示完整物理路径信息。

    Location:
    includes/mysql2i/mysql2i.func.php
    addons/phpmailer/phpmailer.php


---

> 来源：Mr-xn/Penetration_Testing_POC
