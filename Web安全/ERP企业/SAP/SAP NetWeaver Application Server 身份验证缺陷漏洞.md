---
source: "gelusus/wxvl 公众号漏洞文库"
title: "SAP NetWeaver AS ABAP/ABAP Platform 身份验证缺陷权限提升"
product: "SAP NetWeaver AS ABAP/ABAP Platform"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "CVE-2025-0070"
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "具体范围需Note3537476登录核验"
prerequisites: "已经认证的攻击者"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
identifier_role: "primary"
source_status: "unknown"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/ERP%E4%BC%81%E4%B8%9A/SAP/SAP%20NetWeaver%20Application%20Server%20%E8%BA%AB%E4%BB%BD%E9%AA%8C%E8%AF%81%E7%BC%BA%E9%99%B7%E6%BC%8F%E6%B4%9E.md"
id: "vw-a8938cdfb7e1db6be4d9449b"
entity_id: "ve-a8938cdfb7e1db6be4d9449b"
schema_version: "1"
---

# SAP NetWeaver AS ABAP/ABAP Platform 身份验证缺陷权限提升

## 条目说明

- 对象与具体问题：SAP NetWeaver AS ABAP/ABAP Platform；身份验证缺陷权限提升
- 版本、配置及部署条件：具体范围需Note3537476登录核验
- 认证与权限前提：已经认证的攻击者
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 产品表大小写同名重复4次，无版本
- 官方Note链接可追溯且已说明需登录，正文不是复现
- 不要错写未认证绕过，低权限前提需明确

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

 上汽集团网络安全应急响应中心   2025-02-15 15:56  
  
**漏洞情报**  
  
  
  
  
  
**SAP NetWeaver Application Server 身份验证缺陷漏洞**  
  
  
**【 漏洞编号 】**  
  
CVE-2025-0070  
  
  
**【 情报等级 】**  
  
**高危**  
  
  
**【 漏洞描述 】**  
  
360漏洞云监测到SAP发布安全公告，修复了影响核心 SAP 系统（如 NetWeaver、BusinessObjects 和 SAP GUI 平台）的多个关键和高严重性漏洞，其中包括一个SAP NetWeaver 的 ABAP 和 ABAP 平台应用服务器身份认证缺陷漏洞，该漏洞允许经过身份验证的攻击者利用不当的身份验证检查非法访问系统，进而导致权限提升。SAP官方已经修复此漏洞，建议受影响用户及时升级到安全版本。  
  
  
**【 影响产品 】**  
  
<table><tbody><tr><td colspan="1" rowspan="1" style="border-color: rgb(255, 255, 255);background-color: rgb(231, 231, 231);padding: 6px;" width="99.0000%"><section style="text-align: center;font-size: 14px;"><p>sap netweaver (abap) and abap platform,SAP NetWeaver Application Server,SAP Netweaver (Abap) And Abap Platform,Sap Netweaver (Abap) And Abap Platform</p></section></td></tr></tbody></table>  
  
**【 解决方案与修复建议 】**  
  
针对此漏洞，官方已经发布了漏洞修复版本，请登录SAP官网以获取产品受影响版本及修复信息。  
  
SAP官方争对此漏洞的详细说明（需登录）：https://me.sap.com/notes/3537476  
  
安装前，请确保备份所有关键数据，并按照官方指南进行操作。安装后，进行全面测试以验证漏洞已被彻底修复，并确保系统其他功能正常运行。  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
