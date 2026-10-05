---
cve: "CVE-2024-9463"
source: "gelusus/wxvl 公众号漏洞文库"
id: "vw-2fad11d0b30926283f0392df"
entity_id: "ve-2fad11d0b30926283f0392df"
schema_version: "1"
title: "漏洞预警 | Palo Alto Networks Expedition命令注入、SQL注入和明文存储漏洞"
product: "Palo Alto Expedition"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "primary"
primary_identifiers: "CVE-2024-9463"
referenced_identifiers: ""
prerequisites: "<1.2.96；9463/9465未认证，9464/9466已认证"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/Palo%20Alto/%E6%BC%8F%E6%B4%9E%E9%A2%84%E8%AD%A6%20%20Palo%20Alto%20Networks%20Expedition%E5%91%BD%E4%BB%A4%E6%B3%A8%E5%85%A5%E3%80%81SQL%E6%B3%A8%E5%85%A5%E5%92%8C%E6%98%8E%E6%96%87%E5%AD%98%E5%82%A8%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_status: "unknown"
---

#  漏洞预警 | Palo Alto Networks Expedition命令注入、SQL注入和明文存储漏洞   

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Palo Alto Expedition
- 本文讨论：CVE-2024-9463/9464/9465/9466
- 版本、权限与配置前提：&lt;1.2.96；9463/9465未认证，9464/9466已认证
- 资料类型：四漏洞咨询；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 9464漏洞类型写SQL注入但同段简介命令注入，明确矛盾
- frontmatter只录9463遗漏其他主实体
- 补丁仅厂商社区首页，无公告直链

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- 各实体执行身份和版本需官方核验
- 引用图片未查看，截图内容及有效性待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->

浅安  浅安安全   2024-11-22 23:50  
  
**0x00 漏洞编号**  
- # CVE-2024-9463  
  
- # CVE-2024-9464  
  
- # CVE-2024-9465  
  
- # CVE-2024-9466  
  
**0x01 危险等级**  
- 高危  
  
**0x02 漏洞概述**  
  
Palo Alto Networks Expedition是Palo Alto Networks提供的一款迁移工具，旨在帮助网络安全团队进行防火墙规则的迁移、优化和管理。  
  
![](../../.resource/remote/e320023d2700383b5f03e6ec1779c6242ada883f565a8716cd3787d6b31a5118.png "")  
  
**0x03 漏洞详情**  
###   
###   
  
**CVE-2024-9463**  
  
**漏洞类型：**  
命令注入  
  
**影响：**  
执行  
任意命令  
  
**简述：**  
Palo Alto Networks Expedition的/API/convertCSVtoParquet.php接口存在命令注入漏洞，未经身份验证的攻击者可利用该漏洞在Expedition中以root身份运行任意系统命令，从而导致PAN-OS防火墙的用户名、明文密码、设备配置和设备API密钥泄露。  
  
**CVE-2024-9464**  
  
**漏洞类型：**  
SQL注入  
  
**影响：**  
  
执行  
任意命令  
  
**简述：**  
Palo Alto Networks Expedition的/bin/CronJobs.php接口存在命令注入漏洞，经过身份验证的攻击者可利用该漏洞在Expedition中以root身份运行任意系统命令。  
  
**CVE-2024-9465**  
  
**漏洞类型：**  
SQL注入  
  
**影响：**  
获取  
敏感信息  
  
**简述：**  
Palo Alto Networks Expedition的/bin/configurations/parsers/Checkpoint/CHECKPOINT.php接口存在SQL注入漏洞，未经身份验证的攻击者可利用该漏洞获取Expedition 数据库内容，例如密码哈希、用户名、设备配置和设备API密钥等，并可在Expedition系统上创建和读取任意文件。  
  
**CVE-2024-9466**  
  
**漏洞类型：**  
明文存储  
  
**影响：**  
获取  
敏感信息  
  
**简述：**  
Palo Alto Networks Expedition存在明文存储敏感信息漏洞，允许经过身份验证的攻击者获取使用这些凭据生成的防火墙用户名、密码和API密钥。  
###   
  
**0x04 影响版本**  
- Palo Alto Networks Expedition < 1.2.96  
  
**0x05****POC状态**  
- 已公开  
  
**0x06****修复建议**  
  
******目前官方已发布漏洞修复版本，建议用户升级到安全版本****：******  
  
https://live.paloaltonetworks.com/  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
