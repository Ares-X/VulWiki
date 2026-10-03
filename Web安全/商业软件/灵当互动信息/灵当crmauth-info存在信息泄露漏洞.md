---
source: "wy876 漏洞文库"
title: "灵当CRM dataCache/weixin auth_info.txt泄露声称"
product: "灵当CRM"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "版本未知，静态缓存文件存在/访问条件"
prerequisites: "请求无Cookie"
side_effects: "文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/iayn7tuulf8b68rg"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E7%81%B5%E5%BD%93%E4%BA%92%E5%8A%A8%E4%BF%A1%E6%81%AF/%E7%81%B5%E5%BD%93crmauth-info%E5%AD%98%E5%9C%A8%E4%BF%A1%E6%81%AF%E6%B3%84%E9%9C%B2%E6%BC%8F%E6%B4%9E.md"
fofa_unverified: "body="
id: "vw-2059009cfa0b7b46d5ecc297"
entity_id: "ve-2059009cfa0b7b46d5ecc297"
schema_version: "1"
---

# 灵当CRM dataCache/weixin auth_info.txt泄露声称

## 条目说明

- 对象与具体问题：灵当CRM；dataCache/weixin auth_info.txt泄露声称
- 版本、配置及部署条件：版本未知，静态缓存文件存在/访问条件
- 认证与权限前提：请求无Cookie
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- POST静态txt却带multipart和Content-Length779无正文，明显沿用上传头，样例请求不完整
- 没有返回内容，无法确定token/secret是否存在及有效，文件名本身不证明敏感泄露
- FOFA含Markdown URL和font HTML双重污染，目录灵当互动信息应与CRM统一
- 缺修复和版本

## 操作风险

文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

## 一、漏洞简介
灵当CRM（Customer Relationship Management，客户关系管理）是一款面向中小企业的客户关系管理软件，旨在帮助企业更好地管理客户信息、销售流程、市场营销和服务支持等方面的工作。灵当CRM提供了一系列工具和功能，帮助企业在销售、市场和服务部门之间实现高效协作，提高客户满意度和业务效率。灵当CRM客户管理系统auth-info 存在信息泄露漏洞。

## 二、影响版本
+ 灵当crm

## 三、资产测绘
+ fofa`body="[http://localhost:8088/crm/index.php"](http://localhost:8088/crm/index.php") && body="ldcrm.base.js"` `body="crmcommon/js/jquery/jquery-1.10.1.min.js"`
+ 特征


## 四、漏洞复现
```http
POST /crm/dataCache/weixin/auth_info.txt HTTP/1.1
Host: 
Content-Length: 779
Content-Type: multipart/form-data; boundary=----WebKitFormBoundary0Mh3BfgWszxRFokh
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/iayn7tuulf8b68rg>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
