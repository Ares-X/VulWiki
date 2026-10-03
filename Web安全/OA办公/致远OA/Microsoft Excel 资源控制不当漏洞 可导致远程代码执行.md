---
source: "gelusus/wxvl 公众号漏洞文库"
title: "Microsoft Excel / Office 资源控制问题远程代码执行通告"
product: "Microsoft Excel / Office"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "CVE-2025-21381"
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "产品/版本列表拼接失去对应关系，需按MSRC重建各平台范围"
prerequisites: "受害者下载打开特制文件交互"
side_effects: "命令/代码执行示例可能改变主机状态"
review_date: "2026-10-02"
identifier_role: "primary"
source_status: "unknown"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/OA%E5%8A%9E%E5%85%AC/%E8%87%B4%E8%BF%9COA/Microsoft%20Excel%20%E8%B5%84%E6%BA%90%E6%8E%A7%E5%88%B6%E4%B8%8D%E5%BD%93%E6%BC%8F%E6%B4%9E%20%E5%8F%AF%E5%AF%BC%E8%87%B4%E8%BF%9C%E7%A8%8B%E4%BB%A3%E7%A0%81%E6%89%A7%E8%A1%8C.md"
id: "vw-3e72e0ce0d59ed899cc321bb"
entity_id: "ve-3e72e0ce0d59ed899cc321bb"
schema_version: "1"
---

# Microsoft Excel / Office 资源控制问题远程代码执行通告

## 条目说明

- 对象与具体问题：Microsoft Excel / Office；资源控制问题RCE通告
- 版本、配置及部署条件：产品/版本列表拼接失去对应关系，需按MSRC重建各平台范围
- 认证与权限前提：受害者下载打开特制文件交互
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 影响表重复大小写产品且3个版本阈值无对应关系，不能转成统一范围
- 正文由本地用户文档攻击跳成服务器失陷，应区分Office Online Server与客户端
- MSRC主来源链接明确，无PoC不算缺陷，应标情报通告

## 操作风险

命令/代码执行示例可能改变主机状态。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

 上汽集团网络安全应急响应中心   2025-02-14 15:55  
  
**漏洞情报**  
  
  
  
  
  
**Microsoft Excel 资源控制不当漏洞 可导致远程代码执行**  
  
  
**【 漏洞编号 】**  
  
CVE-2025-21381  
  
  
**【 情报等级 】**  
  
**高危**  
  
  
**【 漏洞描述 】**  
  
360漏洞云监测到微软发布2月安全公告，修复了多个安全漏洞，其中包含一个Microsoft Excel 资源控制不当漏洞，攻击者可以通过社会工程学说服受害者从网站下载并打开特制文件，从而导致其计算机受到本地攻击，造成服务器失陷。  
  
  
**【 影响产品 】**  
  
<table><tbody><tr><td colspan="1" rowspan="1" style="border-color: rgb(255, 255, 255);background-color: rgb(231, 231, 231);padding: 6px;" width="99.0000%"><section style="text-align: center;font-size: 14px;"><p>Microsoft Office Ltsc For Mac 2021,microsoft office ltsc for mac 2021,Office Online Server,microsoft excel 2016,Microsoft Office Online Server,Microsoft Excel 2016,microsoft office online server&lt;16.0.5487.1000,&lt;16.0.10416.20058,&lt;16.94.25020927</p></section></td></tr></tbody></table>  
  
**【 解决方案与修复建议 】**  
  
手动安装补丁  
  
Microsoft官方下载相应补丁进行更新。  
  
**安全更新下载链接：**  
  
https://msrc.microsoft.com/update-guide/en-US/vulnerability/CVE-2025-21381  
  
1.打开上述下载链接，点击漏洞列表中要修复的CVE链接。  
  
2.在微软公告页面底部左侧【产品】选择相应的系统类型，点击右侧【下载】处打开补丁下载链接。  
  
3.点击【安全更新】，打开补丁下载页面，下载相应补丁并进行安装。  
  
4.安装完成后重启计算机。  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
