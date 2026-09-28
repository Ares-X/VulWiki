---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  Palo Alto Networks修复了多个权限提升漏洞  
鹏鹏同学  黑猫安全   2025-06-16 01:48  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/8dBEfDPEceicbhicIuO4lYKvBV5H8vEOHwWBRmuiceCQia5YMzRqUbmCJMeTvhaUE9ZXwpT6NwU1N09PjY8gWZAAvA/640?wx_fmt=png&from=appmsg "")  
  
Palo Alto Networks修复了七项权限提升漏洞，并将最新Chrome安全补丁集成至产品中。  
  
该厂商应用了11项Chrome修复方案，修补了影响Prisma Access浏览器的缓存漏洞CVE-2025-4233。其中最严重的漏洞被标记为CVE-2025-4232（CVSS评分7.1），是通过macOS通配符实现的认证代码注入问题。  
  
"由于Palo Alto Networks GlobalProtect™应用在macOS平台的日志收集功能中存在通配符处理不当漏洞，非管理员用户可将其权限提升至root级别。"安全公告指出。  
  
公司还修复了管理Web界面中的PAN-OS认证管理员命令注入漏洞（CVE-2025-4231，CVSS评分6.1）。该漏洞允许拥有Web界面访问权限的认证管理员以root权限执行操作，但Cloud NGFW和Prisma Access不受影响。  
  
另一项已修复的漏洞是PAN-OS通过CLI的认证管理员命令注入漏洞（CVE-2025-4230，CVSS评分5.7）。"当管理员拥有PAN-OS命令行访问权限时，可利用该漏洞绕过系统限制以root用户执行任意命令。若严格限制CLI访问权限，可显著降低此漏洞的安全风险。"公告强调，"Cloud NGFW和Prisma Access不受此漏洞影响。"  
  
此外，公司还修复了会导致SD-WAN数据未加密暴露的PAN-OS漏洞（CVE-2025-4228，CVSS评分1.0），以及攻击者可借此将权限提升至root的Cortex XDR Broker VM缺陷。  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
