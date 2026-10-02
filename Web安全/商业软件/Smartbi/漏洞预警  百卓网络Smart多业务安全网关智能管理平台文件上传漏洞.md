---
source: "gelusus/wxvl 公众号漏洞文库"
title: "百卓Smart多业务安全网关 0300认证后文件上传"
product: "百卓Smart多业务安全网关"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "CVE-2024-0300"
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "型号/固件未知"
prerequisites: "明确已认证"
side_effects: "文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行"
review_date: "2026-10-02"
identifier_role: "primary"
source_status: "unknown"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/Smartbi/%E6%BC%8F%E6%B4%9E%E9%A2%84%E8%AD%A6%20%20%E7%99%BE%E5%8D%93%E7%BD%91%E7%BB%9CSmart%E5%A4%9A%E4%B8%9A%E5%8A%A1%E5%AE%89%E5%85%A8%E7%BD%91%E5%85%B3%E6%99%BA%E8%83%BD%E7%AE%A1%E7%90%86%E5%B9%B3%E5%8F%B0%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0%E6%BC%8F%E6%B4%9E.md"
id: "vw-c62c45cb5d6273815ce9b6fd"
entity_id: "ve-c62c45cb5d6273815ce9b6fd"
schema_version: "1"
---

# 百卓Smart多业务安全网关 0300认证后文件上传

## 条目说明

- 对象与具体问题：百卓Smart多业务安全网关；0300认证后文件上传
- 版本、配置及部署条件：型号/固件未知
- 认证与权限前提：明确已认证
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 只摘要与外链PoC，无HTTP/代码、上传路径、服务端执行前提
- 未发布修复仅2024-01-13文章时点，不能当当前状态
- 与0939可能同产品但不同编号/入口未核，不直接合并

## 操作风险

文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

浅安  浅安安全   2024-01-13 08:00  
  
**0x00 漏洞编号**  
- # CVE-2024-0300  
  
**0x01 危险等级**  
- 高危  
  
**0x02 漏洞概述**  
  
Smart多业务安全网关智能管理平台是一种网络设备，它可以帮助企业规范员工上网行为、提升网络带宽利用率、避免企业信息泄露、增强网络稳定性和安全性。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/7stTqD182SW3eNBxibiblSHibkReZNZXTktjsEDvxa0OYw8D8aMcI3MXTzhnayIZ38WFic9H9JmktXN6Ymz8kWaQmQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1 "")  
  
**0x03 漏洞详情**  
  
**CVE-2024-0300**  
  
**漏洞类型：**  
文件上传  
  
**影响：**  
  
控制服务器  
  
**简述：**  
Smart多业务安全网关智能管理平台存在文件上传漏洞，经过身份认证的攻击者可以构造特制请求包上传恶意Webshell文件，导致远程代码执行，控制服务器。  
####   
  
**0x04 影响版本**  
- Smart多业务安全网关智能管理平台  
  
**0x05****POC**  
  
https://github.com/tolkent/cve/blob/main/upload.md  
  
**仅供安全研究与学习之用，若将工具做其他用途，由使用者承担全部法律及连带责任，作者及发布****者**  
**不承担任何法律及连带责任。**  
  
**0x06****修复建议**  
  
**目前官方暂未发布漏洞修复版本，建议用户关注官网动态****：**  
  
https://byzoro.com/  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
