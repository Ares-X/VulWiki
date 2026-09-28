---
cve: "CVE-2024-53907"
source: "gelusus/wxvl 公众号漏洞文库"
---

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
