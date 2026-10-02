---
source: "wy876 漏洞文库"
title: "天津环球磁卡公交IC卡收单管理 admin弱默认口令声称"
product: "天津环球磁卡公交IC卡收单管理"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "版本未知；仅默认口令未改实例"
prerequisites: "登录凭据示例"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/ng8rwq4zd0hos38v"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E5%A4%A9%E6%B4%A5%E7%8E%AF%E7%90%83%E7%A3%81%E5%8D%A1%E8%82%A1%E4%BB%BD%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8/%E5%85%AC%E4%BA%A4IC%E5%8D%A1%E6%94%B6%E5%8D%95%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9F%E5%AD%98%E5%9C%A8%E5%BC%B1%E5%8F%A3%E4%BB%A4%E6%BC%8F%E6%B4%9E.md"
fofa: "app=\"公交IC卡收单管理系统\""
id: "vw-34db0d1ff31b54bb54e8be01"
entity_id: "ve-34db0d1ff31b54bb54e8be01"
schema_version: "1"
---

# 天津环球磁卡公交IC卡收单管理 admin弱默认口令声称

## 条目说明

- 对象与具体问题：天津环球磁卡公交IC卡收单管理；admin弱默认口令声称
- 版本、配置及部署条件：版本未知；仅默认口令未改实例
- 认证与权限前提：登录凭据示例
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 只有admin/123456，无产品手册/默认配置来源或登录结果，无法区分测试账号与全产品默认
- 不是认证绕过，密码已更改实例不应标受影响；不可由产品指纹批量判弱口令
- 补首次登录强制修改/修复和版本，HTTP语言Java标记无意义

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

## 一、漏洞简介
公交IC卡收单管理系统是城市公共交通领域中不可或缺的一部分，它通过集成先进的集成电路技术（IC卡）实现了乘客便捷的支付方式，并有效提高了公共交通运营效率。系统集成了发卡、充值、消费、数据采集、查询和注销等多个功能模块，为公交公司和乘客提供了全面、高效、便捷的公共交通支付解决方案。该系统不仅提升了乘客的出行体验，还降低了公交公司的运营成本，提高了管理效率。公交IC卡收单管理系统存在弱口令漏洞

## 二、影响版本
+ 公交IC卡收单管理系统

## 三、资产测绘
+ fofa`app="公交IC卡收单管理系统"`
+ 特征


## 四、漏洞复现
```java
admin/123456
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/ng8rwq4zd0hos38v>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
