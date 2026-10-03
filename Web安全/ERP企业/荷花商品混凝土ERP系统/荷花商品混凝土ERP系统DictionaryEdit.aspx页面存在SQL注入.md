---
source: "wy876 漏洞文库"
title: "荷花商品混凝土ERP DictionaryEdit dict_key SQL 注入线索"
product: "荷花商品混凝土ERP"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "未知"
prerequisites: "未知"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/zf12hiwuxxr5b0hp"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/ERP%E4%BC%81%E4%B8%9A/%E8%8D%B7%E8%8A%B1%E5%95%86%E5%93%81%E6%B7%B7%E5%87%9D%E5%9C%9FERP%E7%B3%BB%E7%BB%9F/%E8%8D%B7%E8%8A%B1%E5%95%86%E5%93%81%E6%B7%B7%E5%87%9D%E5%9C%9FERP%E7%B3%BB%E7%BB%9FDictionaryEdit.aspx%E9%A1%B5%E9%9D%A2%E5%AD%98%E5%9C%A8SQL%E6%B3%A8%E5%85%A5.md"
hunter: "app.name==\"荷花商品混凝土ERP系统\""
id: "vw-6f0418d9105230dbef12f4d5"
entity_id: "ve-6f0418d9105230dbef12f4d5"
schema_version: "1"
previous_fofa_unverified: "app.name=="
---

# 荷花商品混凝土ERP DictionaryEdit dict_key SQL 注入线索

> 指纹历史字段校订（2026-10-04）：现有完整平台查询保持原值；旧未核字段中的残片逐字迁入 `previous_*`。此迁移不代表已确定原文其他谓词的组合意图，未给出的 AND/OR 不猜补。后文残片字段的旧诊断描述校订前状态，查询仍不证明资产受影响。

## 条目说明

- 对象与具体问题：荷花商品混凝土ERP；DictionaryEdit dict_key SQLi线索
- 版本、配置及部署条件：未知
- 认证与权限前提：未知
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 只有正常dict_key=1和sqlmap字样，所称如下页面实际无图，无注入/响应
- Hunter app.name==误放FOFA且截断
- 版本/鉴权/根因/修复均缺，不能称已验证

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

## 一、漏洞简介
杭州荷花软件有限公司开发的商混ERP系统。这套系统主要是处理建筑公司或者各项工程的搅拌站管理，内部含有销售模块、生产管理模块、实验室模块、人员管理等，该公司的商品混凝土ERP系统/Sys/DictionaryEdit.aspx处dict_key参数存在SQL报错注入漏洞，攻击者可通过该漏洞获取数据库权限。

## 二、影响版本
+ 荷花商品混凝土ERP系统

## 三、资产测绘
+ hunter`app.name=="荷花商品混凝土ERP系统"`
+ 特征


## 四、漏洞复现
```plain
/Sys/DictionaryEdit.aspx?dict_key=1
```

出现如下页面大概率存在该漏洞


sqlmap


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/zf12hiwuxxr5b0hp>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
