---
cve: "CVE-2024-54330"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  漏洞预警 | WordPress Plugin Hurrakify SSRF漏洞   
浅安  浅安安全   2025-01-15 00:00  
  
**0x00 漏洞编号**  
- # CVE-2024-54330  
  
**0x01 危险等级**  
- 高危  
  
**0x02 漏洞概述**  
  
Hurrakify是一个专为WordPress平台设计的插件，旨在增强网站的社交分享功能和用户交互体验。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/7stTqD182SUfYu4SOjJQtKmGjOf2fbbqNVeuXxfbT8FHEKibcyM7hz0hMwJ9VfCUQtsPztmeibohe085gPEPUT5A/640?wx_fmt=png&from=appmsg "")  
  
**0x03 漏洞详情**  
###   
  
**CVE-2024-54330**  
  
**漏洞类型：**  
SSRF****  
  
**影响：**  
  
获取敏感信息  
  
  
****  
  
**简述：**  
Hurrakify的/wp-admin/admin-ajax.php?action=hurraki_tooltip_proxy接口存在服务器端请求伪造漏洞，未经身份验证攻击者可通过该漏洞读取系统重要文件，导致网站处于极度不安全状态。  
  
**0x04 影响版本**  
- Hurrakify <= 2.4  
  
**0x05****POC状态**  
- 已公开  
  
**0x06****修复建议**  
  
**目前官方已发布漏洞修复版本，建议用户升级到安全版本****：**  
  
https://cn.wordpress.org/plugins/hurrakify/  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
