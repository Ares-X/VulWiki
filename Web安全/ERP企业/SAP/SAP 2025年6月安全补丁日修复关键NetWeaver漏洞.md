---
source: "gelusus/wxvl 公众号漏洞文库"
title: "SAP NetWeaver AS ABAP及多组件 RFC授权缺失和月度补丁集合"
product: "SAP NetWeaver AS ABAP及多组件"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "CVE-2025-42989;CVE-2025-42982;CVE-2025-42983;CVE-2025-23192;CVE-2025-42977;CVE-2025-42994"
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "2025-06；具体组件/版本缺，Note3600840"
prerequisites: "主漏洞需认证及tRFC/qRFC条件"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
identifier_role: "primary"
source_status: "unknown"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/ERP%E4%BC%81%E4%B8%9A/SAP/SAP%202025%E5%B9%B46%E6%9C%88%E5%AE%89%E5%85%A8%E8%A1%A5%E4%B8%81%E6%97%A5%E4%BF%AE%E5%A4%8D%E5%85%B3%E9%94%AENetWeaver%E6%BC%8F%E6%B4%9E.md"
id: "vw-7e157400623a87ca55bf15a6"
entity_id: "ve-7e157400623a87ca55bf15a6"
schema_version: "1"
---

# SAP NetWeaver AS ABAP及多组件 RFC授权缺失和月度补丁集合

## 条目说明

- 对象与具体问题：SAP NetWeaver AS ABAP及多组件；RFC授权缺失和月度补丁集合
- 版本、配置及部署条件：2025-06；具体组件/版本缺，Note3600840
- 认证与权限前提：主漏洞需认证及tRFC/qRFC条件
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 主42989与五个其他CVE不能全标同产品同前提
- 声称修五高危另六中两低需对公告计数，暂无链接
- 无在野声明明确保留，不把高CVSS当已利用
- 应按Note和组件矩阵整理，重复序号格式修复

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

鹏鹏同学  黑猫安全   2025-06-12 01:20  
  
![](../../.resource/remote/fdf9f1c38c11cba81c0929fa687253de9bd0f6ae730e89537cc909ee37e16035.png "")  
  
SAP 2025年6月安全补丁修复了关键NetWeaver漏洞（编号CVE-2025-42989，CVSS评分9.6），该漏洞可能导致攻击者绕过授权检查并提升权限。  
  
根据安全公告显示："RFC入站处理未对认证用户执行必要的授权检查，导致权限提升。成功利用此漏洞将严重影响应用程序的完整性和可用性。"该漏洞存在于SAP远程函数调用(RFC)框架中，允许经过认证的攻击者绕过关键检查机制，威胁系统完整性与可用性。  
  
安全公司Onapsis发布报告指出："SAP安全补丁#3600840（CVSS评分9.6）修复了SAP NetWeaver应用服务器AS ABAP中RFC框架的关键授权缺失漏洞。特定条件下，认证攻击者在使用事务型RFC(tRFC)或队列型RFC(qRFC)时可绕过S_RFC授权对象检查，实现权限提升，从而严重影响应用程序完整性和可用性。"  
  
2025年6月安全补丁日共修复了5个高危漏洞：  
1. CVE-2025-42982（CVSS 8.8）- SAP GRC（AC插件）信息泄露  
  
1. CVE-2025-42983（CVSS 8.5）- SAP商务仓库及插件基础模块授权缺失  
  
1. CVE-2025-23192（CVSS 8.2）- SAP商务对象BI工作区跨站脚本(XSS)漏洞  
  
1. CVE-2025-42977（CVSS 7.6）- SAP NetWeaver Visual Composer目录遍历漏洞  
  
1. CVE-2025-42994（CVSS 7.5）- SAP MDM服务器多重漏洞  
  
此外，这家软件巨头还修复了6个中危漏洞和2个低危漏洞。SAP发布的公告中未提及上述漏洞已被利用的情况。  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
