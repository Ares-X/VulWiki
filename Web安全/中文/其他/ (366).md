---
cve: "CVE-2025-25068"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【漏洞预警】Mattermost MFA绕过漏洞 (CVE-2025-25068)   
cexlife  飓风网络安全   2025-03-21 21:12  
  
![](https://mmbiz.qpic.cn/mmbiz_png/ibhQpAia4xu02Ovtc1OCLPH9Idc83rtSa1u5BKVQ9NSRJ06LE0vwPpvibPKsmTHoZvibiaHQ1NviaRNicP8kicYN6Y0hhw/640?wx_fmt=png&from=appmsg "")  
  
漏洞描述  
  
Mаttеrmоѕt版本10.4.х<=10.4.2,10.3.х<=10.3.3,9.11.х<= 9.11.8,10.5.х<=10.5.0未能在插件端点上强制执行多因素认证（MFA）,这允许经过身份验证的攻击者通过向插件特定路由的API请求绕过MFA保护。  
  
攻击场景:  
  
攻击者可能通过向插件特定路由的 API请求绕过MFA保护  
  
影响产品:  
  
10.4.0<=Mattermost<=10.4.2  
  
9.11.0<=Mattermost<=9.11.8  
  
Mattermost==10.6.0  
  
Mattermost==10.4.3  
  
Mattermost==10.5.0  
  
10.3.0<=Mattermost<=10.3.3  
  
Mattermost==10.5.1  
  
Mattermost==9.11.9  
  
Mattermost==10.3.4   
  
修复建议:  
  
更新Mаttеrmоѕt到10.6.0、10.4.3、10.3.4、9.11.9、10.5.1或更高版本。  
  
建议用户尽快更新到最新版本以防止潜在的攻击,并在此期间加强对API请求的监控。  
  
参考链接:  
  
https://mattermost.com/security-updates   
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
