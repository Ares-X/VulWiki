---
source: "gelusus/wxvl 公众号漏洞文库"
title: "ShareFile StorageZones Controller 2699认证绕过与2701文件写入执行"
product: "ShareFile StorageZones Controller"
record_type: "roundup"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "CVE-2026-2699;CVE-2026-2701"
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "文称5.x≤5.12.3；ASP.NET/Web目录执行配置"
prerequisites: "2699匿名；2701独立鉴权条件未列"
side_effects: "文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行"
review_date: "2026-10-02"
identifier_role: "primary"
source_status: "unknown"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/Progress%20ShareFile/%E6%BC%8F%E6%B4%9E%E9%A2%84%E8%AD%A6%20%20Progress%20ShareFile%E8%BA%AB%E4%BB%BD%E8%AE%A4%E8%AF%81%E7%BB%95%E8%BF%87%E5%92%8C%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0%E6%BC%8F%E6%B4%9E.md"
id: "vw-8c673b413b6ae30776e9efb8"
entity_id: "ve-8c673b413b6ae30776e9efb8"
schema_version: "1"
---

# ShareFile StorageZones Controller 2699认证绕过与2701文件写入执行

## 条目说明

- 对象与具体问题：ShareFile StorageZones Controller；2699认证绕过与2701文件写入执行
- 版本、配置及部署条件：文称5.x≤5.12.3；ASP.NET/Web目录执行配置
- 认证与权限前提：2699匿名；2701独立鉴权条件未列
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 两主CVE应共同进入元数据，不能只2699
- 软件全平台与自托管StorageZones Controller区别；不要泛化到所有云ShareFile
- Response.Redirect false未终止解释需源码出处，上传解压链只有概述
- POC已公开无链接，修复仅docs首页无安全版本/公告

## 操作风险

文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

浅安
                    浅安  浅安安全   2026-04-15 23:50  
  
**0x00 漏洞编号**  
- # CVE-2026-2699  
  
- # CVE-2026-2701  
  
**0x01 危险等级**  
- 高危  
  
**0x02 漏洞概述**  
  
Progress ShareFile是一款企业级安全文件传输与协作平台，支持文件共享、数据收集、电子签名及任务管理等功能。  
  
![](https://mmbiz.qpic.cn/mmbiz_png/NQlfTO30MhzhBLedKmL4fZ88W0rwxhw8EOQGPynNqIHhKr7uyUX6H3vIpohkxcsBa37WYzwIdic6RgnKaibQ2MPlI2ZLNPR2IyCR1X98iafAicg/640?wx_fmt=png&from=appmsg "")  
  
**0x03 漏洞详情**  
  
**CVE-2026-2699**  
  
**漏洞类型：**  
身份认证绕过  
  
**影响：**  
越权操作  
  
**简述：**  
Progress ShareFile  
存在身份认证绕过漏洞，由于ASP.NET应用错误使用Response.Redirect(..., false)，在重定向后未终止页面执行，导致未认证用户可绕过身份验证访问后台功能。  
  
**CVE-2026-2701**  
  
**漏洞类型：**  
文件上传  
  
**影响：**  
执行任意代码  
  
**简述：**  
Progress ShareFile存在远程代码执行漏洞，由于系统在存储路径配置及文件上传解压逻辑中缺乏有效安全限制，允许攻击者将文件写入Web目录并执行，从而控制服务器。  
  
**0x04 影响版本**  
- Storage Zone Controller 5.x <= 5.12.3  
  
**0x05****POC状态**  
- 已公开  
  
**0x06****修复建议**  
  
**目前官方已发布漏洞修复版本，建议用户升级到安全版本****：**  
  
https://docs.sharefile.com/  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
