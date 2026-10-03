---
source: "wy876 漏洞文库"
title: "紫光电子档案管理系统 Login editPass comid报错SQL注入"
product: "紫光电子档案管理系统"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "版本未知，支持EXTRACTVALUE的数据库"
prerequisites: "未说明"
side_effects: "请求可能删除/覆盖数据、修改账号或持久改变业务状态"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/mqsvv42n8mikbt25"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E7%B4%AB%E5%85%89%E6%A1%A3%E6%A1%88%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9F/%E7%B4%AB%E5%85%89%E6%A1%A3%E6%A1%88%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9FeditPass%E5%AD%98%E5%9C%A8SQL%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
hunter: "app.name=\"紫光档案管理系统\""
id: "vw-cd819e38cec9b49c6745aad8"
entity_id: "ve-cd819e38cec9b49c6745aad8"
schema_version: "1"
previous_fofa_unverified: "app.name="
---

# 紫光电子档案管理系统 Login editPass comid报错SQL注入

> 指纹历史字段校订（2026-10-04）：现有完整平台查询保持原值；旧未核字段中的残片逐字迁入 `previous_*`。此迁移不代表已确定原文其他谓词的组合意图，未给出的 AND/OR 不猜补。后文残片字段的旧诊断描述校订前状态，查询仍不证明资产受影响。

## 条目说明

- 对象与具体问题：紫光电子档案管理系统；Login editPass comid报错SQL注入
- 版本、配置及部署条件：版本未知，支持EXTRACTVALUE的数据库
- 认证与权限前提：未说明
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 只有URL及常量md5报错载荷，无响应对照/根因/补丁
- 修改密码接口可能产生状态变化，需说明前提及安全探测边界
- 产品宣传占比高、Hunter误放fofa、空特征可删

## 操作风险

请求可能删除/覆盖数据、修改账号或持久改变业务状态。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

## 一、漏洞简介
紫光电子档案管理系统是一款专业的电子档案管理软件，旨在帮助企业实现高效、便捷的档案管理。系统具有强大的文件存储、检索和共享功能，能够提供全面的档案管理解决方案。同时，紫光电子档案管理系统还拥有智能化的分类和归档功能，可以自动识别文件类型和属性，实现快速分类和高效管理。用户只需简单操作，就能轻松实现对各类电子档案的整理、查询和备份，极大提升了工作效率和信息安全性。紫光档案管理系统editPass存在SQL注入漏洞，攻击者可通过该漏洞获取数据库敏感信息。

## 二、影响版本
+ 紫光档案管理系统

## 三、资产测绘
+ hunter`app.name="紫光档案管理系统"`
+ 特征


## 四、漏洞复现
```plain
/login/Login/editPass.html?comid=extractvalue(1,concat(char(126),md5(1)))
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/mqsvv42n8mikbt25>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
