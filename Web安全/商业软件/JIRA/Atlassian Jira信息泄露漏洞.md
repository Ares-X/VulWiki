---
source: "白阁文库 BaizeSec/bylibrary"
title: "Jira 14181用户名枚举通告"
product: "Jira"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "CVE-2020-14181"
referenced_identifiers: "CVE-2019-8446;CVE-2019-3403"
identifier_status: "unknown"
affected_scope: "<7.13.6/8.0–8.5.7/8.6–8.12声明"
prerequisites: "未认证"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
identifier_role: "primary"
source_status: "unknown"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/JIRA/Atlassian%20Jira%E4%BF%A1%E6%81%AF%E6%B3%84%E9%9C%B2%E6%BC%8F%E6%B4%9E.md"
id: "vw-8ee53229a8342308dfe2117c"
entity_id: "ve-8ee53229a8342308dfe2117c"
schema_version: "1"
---

# Jira 14181用户名枚举通告

## 条目说明

- 对象与具体问题：Jira；14181用户名枚举通告
- 版本、配置及部署条件：<7.13.6/8.0–8.5.7/8.6–8.12声明
- 认证与权限前提：未认证
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 复现仅存在/不存在标题，实际请求与图片均缺，不能恢复结果
- 8446/3403仅不同接口比较，别当同漏洞；精确修复版需核

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

##### **漏洞概要**

    

**漏洞名称：**Atlassian Jira信息泄露漏洞CVE-2020-14181

**威胁等级：**中危

**影响范围：**

Jira < 7.13.6

Jira 8.0.0 - 8.5.7

Jira 8.6.0 - 8.12.0

**漏洞类型：**信息泄露

**利用难度：**简单

##### **漏洞分析**

    

###### **2.1 Jira组件介绍**


Jira是一个缺陷跟踪管理系统，为针对缺陷管理、任务追踪和项目管理的商业性应用软件，开发者是澳大利亚的Atlassian。Jira 用 Java 语言编写，使用 Pico 容器，Apache OFBiz，以及 WebWork 1 technology stack。Jira  支持 SOAP，XML-RPC 以及 REST。其拥有灵活的插件架构，可以调用 JIRA 开发者社区和第三方开发的插件，配合Atlassian  IDE Connector可以与 IDE 集成，比如 Eclipse和 IntelliJ IDEA。Jira API允许开发者向 Jira  中继承第三方开发的应用程序。

###### **2.2 漏洞描述**


Jira存在一个未授权访问漏洞，未授权的用户可以通过一个api接口直接查询到某用户名的存在情况，该接口不同于CVE-2019-8446和CVE-2019-3403的接口，是一个新的接口。如果Jira暴露在公网中，未授权用户就可以直接访问该接口爆破出潜在的用户名。

###### **2.3 漏洞复现**


搭建Jira 7.13.0环境，成功复现漏洞如下：

用户不存在情况下：


用户名存在情况下：


##### **影响范围**

目前受影响的jira版本：

- Jira < 7.13.6

- Jira 8.0.0 - 8.5.7

- Jira 8.6.0 - 8.12.0

  

##### **解决方案**

    

###### **4.1 修复建议**


目前厂商已发布升级补丁修复漏洞，请受影响用户尽快进行升级加固。补丁获取链接：https://www.atlassian.com/zh/software/jira/download


###### **时间轴**


2020/09/16

Jira官网公布该漏洞issue


2020/10/22

深信服千里目安全实验室分析复现漏洞并发布漏洞安全通告

**参考链接**

    


- https://www.atlassian.com/zh/software/jira/download

- https://jira.atlassian.com/browse/JRASERVER-71560?error=login_required&error_description=Login+required&state=8c84139f-b8f3-4d2c-a1c1-906c66ab2c90


---

> 来源：白阁文库 BaizeSec/bylibrary
