---
cve: "CVE-2026-1862"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  漏洞预警 | Google Chrome类型混淆漏洞  
浅安
                    浅安  浅安安全   2026-02-10 00:00  
  
**0x00 漏洞编号**  
- # CVE-2026-1862  
  
**0x01 危险等级**  
- 高危  
  
**0x02 漏洞概述**  
  
Google Chrome是由Google开发的免费网页浏览器。Chrome代码是基于其他开放源代码软件所编写，包括Apple WebKit和Mozilla Firefox。  
  
![图片](https://mmbiz.qpic.cn/mmbiz_png/7stTqD182SXxjX8p8WklXuc23v1DKPW7yY83Sic75o0z0rlPgZHmmCPxBNvutPR92HthYPDsg7ia0ODDgsgQYjBQ/640?wx_fmt=other&wxfrom=5&wx_lazy=1&wx_co=1&randomid=gigpt6px&tp=webp#imgIndex=0 "")  
  
**0x03 漏洞详情**  
###   
  
**CVE-2026-1862**  
  
**漏洞类型：**  
类型混淆  
  
**影响：**  
执行  
任意代码  
  
**简述：**  
Google Chrome中V8引擎存在类型混淆漏洞，该漏洞允许攻击者通过精心构造的HTML页面，触发V8引擎中的堆内存损坏，可能导致应用崩溃或执行恶意代码。  
  
**0x04 影响版本**  
- Chrome < 144.0.7559.132  
  
**0x05****POC状态**  
- 未公开  
  
**0x06****修复建议**  
  
**目前官方已发布漏洞修复版本，建议用户升级到安全版本****：**  
  
chrome://settings/help  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
