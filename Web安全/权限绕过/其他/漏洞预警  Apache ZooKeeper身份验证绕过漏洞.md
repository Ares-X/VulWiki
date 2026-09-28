---
cve: "CVE-2024-51504"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  漏洞预警 | Apache ZooKeeper身份验证绕过漏洞   
浅安  浅安安全   2024-11-16 00:01  
  
**0x00 漏洞编号**  
- # CVE-2024-51504  
  
**0x01 危险等级**  
- 高危  
  
**0x02 漏洞概述**  
  
Apache ZooKeeper是由集群使用的一种服务，用于在自身之间协调，并通过稳健的同步技术维护共享数据。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/7stTqD182SWJkBhlicYtEdFMCXic0K33Fvia5DAYx9VtxSA42pkdl6wu4QQCvF1p0uSlCP6v7LL9tvkYfjZh5BoRA/640?wx_fmt=other&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1 "")  
  
**0x03 漏洞详情**  
###   
###   
  
**CVE-2024-51504**  
  
**漏洞类型：**  
身份验证绕过  
  
**影响：**  
获取  
敏感信息  
  
**简述：**  
Apache ZooKeeper存在身份验证绕过漏洞，当ZooKeeper Admin Server使用基于IP的身份验证时，由于默认配置下使用了可被轻易伪造的HTTP请求头来检测客户端IP地址，攻击者可通过伪造请求头中的IP地址来绕过身份验证，进而实现未授权访问管理服务器功能并任意执行管理服务器命令，从而可能导致信息泄露或服务可用性问题。  
###   
  
**0x04 影响版本**  
- 3.9.0 <= Apache ZooKeeper < 3.9.3  
  
**0x05****POC状态**  
- 未公开  
  
**0x06****修复建议**  
  
******目前官方已发布漏洞修复版本，建议用户升级到安全版本****：******  
  
https://zookeeper.apache.org/  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
