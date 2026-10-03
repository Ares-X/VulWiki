---
source: "wy876 漏洞文库"
title: "任我行管家婆分销ERP viewaccountBase.asp SQL注入声称"
product: "任我行管家婆分销ERP"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "版本未知"
prerequisites: "未知"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/sazxvh1vu8fxg8rn"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E4%BB%BB%E6%88%91%E8%A1%8C/%E4%BB%BB%E6%88%91%E8%A1%8C%E7%AE%A1%E5%AE%B6%E5%A9%86%E5%88%86%E9%94%80ERP%E7%B3%BB%E7%BB%9F%E5%AD%98%E5%9C%A8sql%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
hunter: "app.name=\"任我行管家婆分销 ERP\""
id: "vw-022ea455fd670dff1fea6485"
entity_id: "ve-022ea455fd670dff1fea6485"
schema_version: "1"
previous_fofa_unverified: "app.name="
---

# 任我行管家婆分销ERP viewaccountBase.asp SQL注入声称

> 指纹字段校订（2026-10-04）：本文原归档明确标为 Hunter 的完整表达式已记入 `hunter`；原残缺 `fofa_unverified` 值逐字保存在 `previous_fofa_unverified`。后文关于该字段残缺的旧说明只描述校订前状态。查询用于产品检索，不证明资产受影响。

## 条目说明

- 对象与具体问题：任我行管家婆分销ERP；viewaccountBase.asp SQL注入声称
- 版本、配置及部署条件：版本未知
- 认证与权限前提：未知
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 只有普通URL和访问报错，无明确注入参数/载荷/响应，sqlmap小节空白
- 错误页不证明SQL注入；需输入差异与数据库语句证据
- 与ERP同产品文章需跨分类归并，补精确版本/修复

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

## 一、漏洞简介
成都任我行软件股份有限公司管家婆分销ERP系统存在sql注入漏洞

## 二、影响版本
+ 管家婆分销ERP系统

## 三、资产测绘
+ hunter`app.name="任我行管家婆分销 ERP"`
+ 特征


## 四、漏洞复现
访问以下路径报错

```plain
/common/viewaccountBase.asp?TimeCheckPoint=80616.91&billnumberid=-1&billtype=
```


sqlmap


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/sazxvh1vu8fxg8rn>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
