---
cve: "CVE-2025-41230"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【高危漏洞预警】VMware Cloud Foundation 信息泄露漏洞(CVE-2025-41230)  
cexlife  飓风网络安全   2025-06-09 09:11  
  
![](https://mmbiz.qpic.cn/mmbiz_png/ibhQpAia4xu01ankDV6LgibE61cyJpOWOSYbaYB24f6pgDgUIAfCqCwgw8O8W0AfJgsmp2ySwLu4MADbGBsJUQS8w/640?wx_fmt=png&from=appmsg "")  
  
漏洞描述:  
  
VMware Cloud Foundation是美国威睿（VMware）公司的一套一体化混合云平台,该平台包括运维自动化、基础架构自动配置和集成式生命周期管理等功能,攻击者可以通过网络访问VMԝаrе Clоud Fоundаtiоn上的443端口来利用此问题,获取敏感信息。  
  
检测方法:  
  
检查VMware Cloud Foundation的网络访问控制,特别是针对443端口的访问   
  
受影响产品或系统:  
  
5.x VMware Cloud Foundation=5.2.1.2  
  
修复方案:  
  
目前厂商已发布升级程序修复该安全问题,详情见厂商官网:  
  
https://support.broadcom.com/web/ecx/support-content-notification/-/external/content/SecurityAdvisories/0/25733  
  
补丁信息:  
  
补丁链接:https://techdocs.broadcom.com/us/en/vmware-cis/vcf/vcf-5-2-and-earlier/5-2/vcf-release-notes/vmware-cloud-foundation-521-release-notes.html#GUID-bea9c4f4-f376-4a63-9787-114a8b767ed2-en_id-bbdf8909-3085-4c41-b287-0461e71b2e07  
  
缓解方案:  
  
隔离443端口,限制未授权访问   
  
加强输入验证和网络访问控制  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
