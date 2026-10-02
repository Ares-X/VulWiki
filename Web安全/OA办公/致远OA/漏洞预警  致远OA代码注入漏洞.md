---
source: "gelusus/wxvl 公众号漏洞文库"
title: "致远OA / EHR Beetl组件 EhrSalaryPayrollServiceImpl postData代码注入"
product: "致远OA / EHR Beetl组件"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "CVE-2025-4531"
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "8.1 SP2；payrollId进入Beetl，具体组件配置待核"
prerequisites: "未说明所需权限"
side_effects: "在线解密或外部服务可能收到凭据及敏感内容"
review_date: "2026-10-02"
identifier_role: "primary"
source_status: "unknown"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/OA%E5%8A%9E%E5%85%AC/%E8%87%B4%E8%BF%9COA/%E6%BC%8F%E6%B4%9E%E9%A2%84%E8%AD%A6%20%20%E8%87%B4%E8%BF%9COA%E4%BB%A3%E7%A0%81%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
id: "vw-f7cb3ec1d3ab10d2421293d6"
entity_id: "ve-f7cb3ec1d3ab10d2421293d6"
schema_version: "1"
---

# 致远OA / EHR Beetl组件 EhrSalaryPayrollServiceImpl postData代码注入

## 条目说明

- 对象与具体问题：致远OA / EHR Beetl组件；EhrSalaryPayrollServiceImpl postData代码注入
- 版本、配置及部署条件：8.1 SP2；payrollId进入Beetl，具体组件配置待核
- 认证与权限前提：未说明所需权限
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 代码注入类别/类名/参数明确，POC明示未公开，属于通告
- 厂商归属与第三方EHR命名com.ours需核查宿主和组件，不能凭类名推断其他产品
- 声称修复版本已发布但只给首页，无固定版本；CVE需原始记录核验

## 操作风险

在线解密或外部服务可能收到凭据及敏感内容。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

浅安  浅安安全   2025-05-14 00:00  
  
**0x00 漏洞编号**  
- # CVE-2025-4531  
  
**0x01 危险等级**  
- 高危  
  
**0x02 漏洞概述**  
  
致远OA是一款由用友成员企业致远软件开发的办公自动化软件，采用J2EE技术开发，功能完善，流程管理、文档管理等功能较为成熟，在产品化领域优势较为明显。  
  
![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/7stTqD182SW3tDwuiciavQsB1E3fBkyjAQBfSxu6P8NGTHfmqHt4K75zjdrS6zj0hpG3vV8a870D0icEcRh7uNedQ/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1 "")  
  
**0x03 漏洞详情**  
####   
  
CVE-2025-4531  
  
漏洞类型：  
代码注入  
  
**影响：**  
执行任意代码  
  
**简述：**  
致远OA的Beetl模板处理组件中的文件ROOT\WEB-INF\classes\com\ours\www\ehr\salary\service\data\EhrSalaryPayrollServiceImpl.class内postData功能的payrollId参数被恶意操控可导致代码注入攻击。攻击者可通过远程方式执行任意代码。  
  
**0x04 影响版本**  
- 致远OA   
8.1   
SP2  
  
**0x05 POC状态**  
- **未公开**  
  
**0x06****修复建议**  
  
**目前官方已发布漏洞修复版本，建议用户升级到安全版本****：**  
  
https://www.seeyon.com/  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
