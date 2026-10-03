---
source: "wy876 漏洞文库"
title: "孚盟云CRM AjaxMethod getEmpByname SQL 注入线索"
product: "孚盟云CRM"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "无版本"
prerequisites: "未说明"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/xubb5blcky307d56"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/ERP%E4%BC%81%E4%B8%9A/%E5%AD%9A%E7%9B%9F/%E5%AD%9A%E7%9B%9F%E4%BA%91AjaxMethod.ashxSQL%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
hunter: "app.name=\"孚盟云 CRM\""
id: "vw-7f2e8f5dee894ba02d490ada"
entity_id: "ve-7f2e8f5dee894ba02d490ada"
schema_version: "1"
previous_fofa_unverified: "app.name="
---

# 孚盟云CRM AjaxMethod getEmpByname SQL 注入线索

> 指纹历史字段校订（2026-10-04）：现有完整平台查询保持原值；旧未核字段中的残片逐字迁入 `previous_*`。此迁移不代表已确定原文其他谓词的组合意图，未给出的 AND/OR 不猜补。后文残片字段的旧诊断描述校订前状态，查询仍不证明资产受影响。

## 条目说明

- 对象与具体问题：孚盟云CRM；AjaxMethod getEmpByname SQLi线索
- 版本、配置及部署条件：无版本
- 认证与权限前提：未说明
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 只有普通Name=1 URL，无注入语句/响应/根因，不能称完整PoC
- CRM产品可归业务软件但需统一类别；Hunter误抽fofa且残缺
- 不因Ajax名近似与37合并

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

## 一、漏洞简介
孚盟与阿里强强联手将最受青睐的经典C系列产品打造成全新的孚盟云产品，让用户可以用云模式实现信息化管理，让用户的异地办公更加流畅，大大降低中小企业在信息化上成本，用最小的投入享受大型企业级别的信息化服务，使中小企业在网络硬件环境、内部贸易过程管理与快速通关形成一套完整解决方案。

## 二、影响版本
+ 孚盟云CRM

## 三、资产测绘
+ hunter`app.name="孚盟云 CRM"`
+ 登录页面


## 四、漏洞复现
```plain
/Ajax/AjaxMethod.ashx?action=getEmpByname&Name=1
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/xubb5blcky307d56>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
