---
source: "wy876 漏洞文库"
title: "圣乔ERP Struts2集成 Struts2 远程代码执行未指明编号线索"
product: "圣乔ERP Struts2集成"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "组件与产品版本均未列"
prerequisites: "未说明"
side_effects: "命令/代码执行示例可能改变主机状态"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/ht9nkwf0kxowxnhw"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/ERP%E4%BC%81%E4%B8%9A/%E6%9D%AD%E5%B7%9E%E5%9C%A3%E4%B9%94%E7%A7%91%E6%8A%80%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8/%E5%9C%A3%E4%B9%94ERP%E7%B3%BB%E7%BB%9F%E5%AD%98%E5%9C%A8struts2%E8%BF%9C%E7%A8%8B%E5%91%BD%E4%BB%A4%E6%89%A7%E8%A1%8C%E6%BC%8F%E6%B4%9E.md"
fofa: "app=\"圣乔-ERP系统\""
hunter: "web.icon=\"d2c808114296ddd9e76e9c774d79bd43\""
id: "vw-e756dcf2f8bdfad681eff6f1"
entity_id: "ve-e756dcf2f8bdfad681eff6f1"
schema_version: "1"
previous_fofa_unverified: "web.icon="
---

# 圣乔ERP Struts2集成 Struts2 远程代码执行未指明编号线索

> 指纹字段校订（2026-10-04）：本文原归档明确标为 FOFA 的完整表达式已记入 `fofa`；原残缺 `fofa_unverified` 值逐字保存在 `previous_fofa_unverified`。后文关于该字段残缺的旧说明只描述校订前状态。查询用于产品检索，不证明资产受影响。

## 条目说明

- 对象与具体问题：圣乔ERP Struts2集成；Struts2 RCE未指明编号线索
- 版本、配置及部署条件：组件与产品版本均未列
- 认证与权限前提：未说明
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 两login.action路径不足证明任何Struts2漏洞，更无法知道S2/CVE
- 企业注册地址/法定代表人无助漏洞资料且冗余，移除
- Hunterweb.icon误fofa且残缺

## 操作风险

命令/代码执行示例可能改变主机状态。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

## 一、漏洞简介
杭州圣乔科技有限公司成立于2007年02月27日，注册地位于浙江省杭州市拱墅区和睦路555号201幢116室，法定代表人为张鹏。经营范围包括计算机软硬件、电子产品的技术开发、销售。圣乔ERP系统存在struts2远程命令执行漏洞

## 二、影响版本
+ 圣乔ERP系统

## 三、资产测绘
+ hunter`web.icon="d2c808114296ddd9e76e9c774d79bd43"`
+ fofa`app="圣乔-ERP系统"`
+ 特征


## 四、漏洞复现
```java
/shengfeng/login.action
```


```plain
/erp/login.action
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/ht9nkwf0kxowxnhw>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
