---
cve: "CVE-2024-9693"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  漏洞预警 | GitLab未授权访问漏洞   
浅安  浅安安全   2024-11-21 00:01  
  
**0x00 漏洞编号**  
- CVE-2024-9693  
  
**0x01 危险等级**  
- 高危  
  
**0x02 漏洞概述**  
  
GitLab是一个用于仓库管理系统的开源项目，其使用Git作为代码管理工具，可通过Web界面访问公开或私人项目。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/7stTqD182SVGBiaficDylnXhWUEY2CkYiavDjgRSHG0ao3eXBzYqlMf7sTtGRGDCeVDTaNKSEibCnSCGvMvU88ZlVA/640?wx_fmt=other&from=appmsg&wxfrom=5&wx_lazy=1&wx_co=1&tp=webp "")  
  
**0x03 漏洞详情**  
###   
###   
  
**CVE-2024-9693**  
  
**漏洞类型：**  
未授权访问  
  
**影响：**  
泄露敏感信息  
  
**简述：**  
GitLab中存在未授权访问漏洞，在特定配置下，低权限用户通过该漏洞可未授权访问Kubernetes集群代理，进而导致数据泄露、篡改或服务中断等。  
  
**0x04 影响版本**  
- 16.0 <= GitLab CE/EE < 17.3.7  
  
- 17.4 <= GitLab CE/EE < 17.4.4  
  
- 17.5 <= GitLab CE/EE < 17.5.2  
  
**0x05****POC状态**  
- 未公开  
  
**0x06****修复建议**  
  
******目前官方已发布漏洞修复版本，建议用户升级到安全版本****：******  
  
https://about.gitlab.com/  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
