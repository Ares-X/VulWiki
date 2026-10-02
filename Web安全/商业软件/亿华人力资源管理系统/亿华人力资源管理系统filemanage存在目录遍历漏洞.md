---
source: "wy876 漏洞文库"
title: "亿华人力资源管理系统 filemanage目录遍历浏览"
product: "亿华人力资源管理系统"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "版本未知；文件管理页面可访问条件"
prerequisites: "未知"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/gnluyfnyo0do37cq"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E4%BA%BF%E5%8D%8E%E4%BA%BA%E5%8A%9B%E8%B5%84%E6%BA%90%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9F/%E4%BA%BF%E5%8D%8E%E4%BA%BA%E5%8A%9B%E8%B5%84%E6%BA%90%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9Ffilemanage%E5%AD%98%E5%9C%A8%E7%9B%AE%E5%BD%95%E9%81%8D%E5%8E%86%E6%BC%8F%E6%B4%9E.md"
fofa_unverified: "web.body="
hunter: "web.body=\"亿华人力资源管理系统\""
id: "vw-10d2bcb17e2969320ba3c81f"
entity_id: "ve-10d2bcb17e2969320ba3c81f"
schema_version: "1"
---

# 亿华人力资源管理系统 filemanage目录遍历浏览

## 条目说明

- 对象与具体问题：亿华人力资源管理系统；filemanage目录遍历浏览
- 版本、配置及部署条件：版本未知；文件管理页面可访问条件
- 认证与权限前提：未知
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 只有页面路径及UI输入../，缺具体POST字段/ViewState/会话和返回文本
- 列目录、读取源文件和读取配置需分别证明，不能由跳目录直接推全能力
- 缺版本修复

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

## 一、漏洞简介
亿华人力资源管理系统是一款全面的人力资源管理软件，旨在帮助企业实现员工档案管理规范化、薪资管理自动化、招聘管理流程化等目标。该系统涵盖了人力资源管理的各个方面，包括员工档案管理、薪资管理、招聘管理、培训管理、福利管理等。亿华人力资源管理系统filemanage存在目录遍历漏洞，可通过该漏洞查看网站源码及配置文件等敏感信息。

## 二、影响版本
+ 亿华人力资源管理系统

## 三、资产测绘
+ hunter`web.body="亿华人力资源管理系统"`
+ 特征


## 四、漏洞复现
```plain
/filemanage/file/default.aspx
```


在转到目录除输入`../`即可跳转到网站目录查看网站源码及各类配置文件


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/gnluyfnyo0do37cq>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
