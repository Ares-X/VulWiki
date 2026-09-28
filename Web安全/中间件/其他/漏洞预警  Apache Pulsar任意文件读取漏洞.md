---
cve: "CVE-2024-27894"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  漏洞预警 | Apache Pulsar任意文件读取漏洞   
浅安  浅安安全   2024-03-16 08:00  
  
**0x00 漏洞编号**  
- # CVE-2024-27894  
  
**0x01 危险等级**  
- 高危  
  
**0x02 漏洞概述**  
  
Apache Pulsar是一个多租户、高性能的服务间消息传输解决方案，数据持久化依赖Apache BookKeeper实现，支持多租户、低延时、读写分离、跨地域复制、快速扩容、灵活容错等特性。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/7stTqD182SUO3SpCmTBT2fkibqHkeH2N1wcEPAX006UJzfGEbdG0kwq03vP5kicbOiapWKwcnrz2lWePJMDmsVtuQ/640?wx_fmt=png&from=appmsg "")  
  
**0x03 漏洞详情**  
###   
###   
  
**CVE-2024-27894**  
  
**漏洞类型：**  
任意文件读取  
  
**影响：**  
获取  
敏感信息  
  
**简述：**  
Apache Pulsar Functions Worker中存在一个任意文件读取漏洞，由于未对参数进行过滤导致允许经过身份验证的用户进行任意文件读取漏洞，访问服务器敏感信息。  
###   
  
**0x04 影响版本**  
- 2.4.0 <= Apache Pulsar <= 2.10.5  
  
- 2.11.0 <= Apache Pulsar <= 2.11.3  
  
- 3.0.0 <= Apache Pulsar <= 3.0.2  
  
- 3.1.0 <= Apache Pulsar <= 3.1.2  
  
- Apache Pulsar = 3.2.0  
  
**0x05****修复建议**  
  
******目前官方已发布漏洞修复版本，建议用户升级到安全版本****：******  
  
https://pulsar.apache.org/  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
