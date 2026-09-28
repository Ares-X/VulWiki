---
cve: "CVE-2024-54385"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  漏洞预警 | WordPress Plugin Radio Player SSRF漏洞   
浅安  浅安安全   2025-01-18 00:01  
  
**0x00 漏洞编号**  
- # CVE-2024-54385  
  
**0x01 危险等级**  
- 高危  
  
**0x02 漏洞概述**  
  
WordPress插件Radio Player是一种简单而有效的解决方案，用于将实时流媒体音频添加到您的WordPress网站。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/7stTqD182SWialcP9Ix17EIaWIoaRFb6kWCfvicDlBDxW1CgNlqXWiaPMG8Mr6N29MRCibBEu89jwcqiaPzibxmKKkrA/640?wx_fmt=png&from=appmsg "")  
  
**0x03 漏洞详情**  
###   
  
**CVE-2024-54385**  
  
**漏洞类型：**  
SSRF****  
  
**影响：**  
  
获取敏感信息  
  
  
****  
  
**简述：**  
Radio Player的/wp-admin/admin-ajax.php接口存在服务器端请求伪造漏洞，未经身份验证攻击者可通过该漏洞读取系统重要文件，导致网站处于极度不安全状态。  
  
**0x04 影响版本**  
- Radio Player <= 2.0.82  
  
**0x05****POC状态**  
- 已公开  
  
**0x06****修复建议**  
  
**目前官方已发布漏洞修复版本，建议用户升级到安全版本****：**  
  
https://cn.wordpress.org/plugins/radio-player/  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
