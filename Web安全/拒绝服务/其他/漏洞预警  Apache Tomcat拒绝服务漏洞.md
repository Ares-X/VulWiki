---
cve: "CVE-2024-38286"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  漏洞预警 | Apache Tomcat拒绝服务漏洞   
浅安  浅安安全   2024-09-28 08:00  
  
**0x00 漏洞编号**  
- CVE-2024-38286  
  
**0x01 危险等级**  
- 高危  
  
**0x02 漏洞概述**  
  
Apache Tomcat是一个流行的开源Web服务器和Java Servlet容器。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/7stTqD182SVK4xQb2ufvg2EXDtgjwmkJU7jSlCgMq3waOxibXOUBuTBQKo3OiacLU2cKQZvxLz8Jff2p4bgibaYwA/640?wx_fmt=png&from=appmsg "")  
  
**0x03 漏洞详情**  
###   
###   
  
**CVE-2024-38286**  
  
**漏洞类型：**  
拒绝服务  
  
**影响：**  
资源消耗  
  
**简述：**  
Apache Tomcat在某些配置下处理TLS握手过程的方式中存在拒绝服务漏洞，可能导致威胁者通过滥用TLS握手过程导致内存过度消耗，从而引发OutOfMemoryError并可能导致拒绝服务。  
  
**0x04 影响版本**  
- 11.0.0-M1 <= Apache Tomcat <= 11.0.0-M20  
  
- 10.1.0-M1 <= Apache Tomcat <= 10.1.24  
  
- 9.0.13 <= Apache Tomcat <= 9.0.89  
  
**0x05****POC状态**  
- 未公开  
  
**0x06****修复建议**  
  
******目前官方已发布漏洞修复版本，建议用户升级到安全版本****：******  
  
https://tomcat.apache.org/  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
