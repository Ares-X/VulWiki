---
source: "wy876 漏洞文库"
title: "锦铭泰F22服装管理软件 index_login.asp连接信息泄露声称"
product: "锦铭泰F22服装管理软件"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "版本未知"
prerequisites: "未说明"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/ols3csnzkgnc69fn"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E9%94%A6%E9%93%AD%E6%B3%B0/%E5%B9%BF%E5%B7%9E%E9%94%A6%E9%93%AD%E6%B3%B0%E8%BD%AF%E4%BB%B6%E7%A7%91%E6%8A%80%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8F22%E6%9C%8D%E8%A3%85%E7%AE%A1%E7%90%86%E8%BD%AF%E4%BB%B6%E7%B3%BB%E7%BB%9Findex_login.asp%E5%AD%98%E5%9C%A8%E4%BF%A1%E6%81%AF%E6%B3%84%E6%BC%8F%E6%BC%8F%E6%B4%9E.md"
fofa_unverified: "+ 特征"
id: "vw-b161f99846464274e5b08ad2"
entity_id: "ve-b161f99846464274e5b08ad2"
schema_version: "1"
---

# 锦铭泰F22服装管理软件 index_login.asp连接信息泄露声称

## 条目说明

- 对象与具体问题：锦铭泰F22服装管理软件；index_login.asp连接信息泄露声称
- 版本、配置及部署条件：版本未知
- 认证与权限前提：未说明
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 只有正常登录页面请求，无泄露片段/触发条件，无法分辨调试错误或正常页面
- 资产测绘完全为空，fofa抽成+特征属于元数据污染
- 缺版本、数据库连接字段与修复；宜ERP同产品归档

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

## 一、漏洞简介
广州锦铭泰软件科技有限公司，是一家专业为品牌服饰鞋包企业提供信息化解决方案的高科技企业，该公司开发的F22服装管理软件系统存在信息泄漏漏洞，攻击者最终可利用该漏洞获取数据库账号密码等连接信息。

## 二、影响版本
+ F22服装管理软件系统

## 三、资产测绘
+ hunter
+ 特征


## 四、漏洞复现
```http
GET /pos/index_login.asp HTTP/1.1
Host: xx.xx.xx.xx
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36
Accept: */*
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/ols3csnzkgnc69fn>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
