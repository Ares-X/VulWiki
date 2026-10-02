---
cve: "CVE-2024-53907"
source: "gelusus/wxvl 公众号漏洞文库"
product: "Django strip_tags DoS and Oracle HasKey SQLi"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "CVE-2024-53907; CVE-2024-53908"
referenced_identifiers: ""
identifier_role: "primary"
identifier_status: "unknown"
title: "漏洞预警  Django拒绝服务和SQL注入漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：5.1<5.1.4/5.0<5.0.10/4.2<4.2.17; malformed HTML versus Oracle untrusted lhs separate"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-3fb10dfe9329032379e17501"
entity_id: "ve-3fb10dfe9329032379e17501"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：5.1&lt;5.1.4/5.0&lt;5.0.10/4.2&lt;4.2.17; malformed HTML versus Oracle untrusted lhs separate

代码与实验材料：No PoC; publication-time unavailable claim; memory/stack-overflow mechanism unsupported

来源证据范围：Django homepage only

- **适用与权限边界（1）**：Two primary vulnerabilities collapsed; exact DoS mechanism and source require confirmation。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

#  漏洞预警 | Django拒绝服务和SQL注入漏洞   
浅安  浅安安全   2024-12-13 00:02  
  
**0x00 漏洞编号**  
- # CVE-2024-53907  
  
- # CVE-2024-53908  
  
**0x01 危险等级**  
- 高危  
  
**0x02 漏洞概述**  
  
Django是Python编写的开源Web应用框架。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/7stTqD182SUlxtwpd4P0rFf3icGicd7SNwE4CWbV4iaVERiayibWSH5SHVwV784JOGmUhXFDqibMBTXVaTcDibWepNqsA/640?wx_fmt=png&from=appmsg "")  
  
**0x03 漏洞详情**  
###   
  
**CVE-2024-53907**  
  
**漏洞类型：**  
拒绝服务  
  
**影响：**  
程序崩溃  
  
**简述：**  
Django存在拒绝服务漏洞，由于django.utils.html.strip_tags()方法和striptags模板过滤器未充分处理包含大量嵌套不完整HTML实体的输入，可能导致过度的内存消耗或栈溢出，从而使应用程序挂起或崩溃，攻击者可以通过提供恶意构造的输入触发该漏洞并导致拒绝服务。  
### CVE-2024-53908  
  
**漏洞类型：**  
SQL注入  
  
**影响：**  
获取敏感信息  
  
**简述：**  
Django中存在SQL注入漏洞，在使用Oracle数据库作为后端时，当Django应用中的django.db.models.fields.json.HasKey查找功能被直接用于Oracle数据库，并且其左侧参数（lhs）包含不受信任的数据时，可能会导致SQL注入攻击，攻击者可通过注入恶意SQL代码来攻击数据库，从而可能导致敏感数据泄露、数据篡改或数据库被恶意控制。  
  
**0x04 影响版本**  
- Django 5.1 < 5.1.4  
  
- Django 5.0 < 5.0.10  
  
- Django 4.2 < 4.2.17  
  
**0x05 POC状态**  
- 未公开  
  
**0x06****修复建议**  
  
**目前官方已发布漏洞修复版本，建议用户升级到安全版本****：**  
  
https://www.djangoproject.com/  
  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
