---
cve: "CVE-2024-42509"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  漏洞预警 | HPE Aruba Networking Access Points命令注入漏洞   
浅安  浅安安全   2024-11-16 00:01  
  
**0x00 漏洞编号**  
- # CVE-2024-42509  
  
**0x01 危险等级**  
- 高危  
  
**0x02 漏洞概述**  
  
HPE Aruba Networking Access Points是HPE旗下的Aruba Networking推出的一系列高性能无线接入点产品，旨在为企业提供稳定、高效、安全的无线网络连接，被广泛应用于企业、教育、商业等各种场景。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/7stTqD182SWpsmBToJ1PmvpWYLUqE5SKz2VpYvZKCBWZTYuxqkuZY3766tMibict8WacvbYoOCibO8QYTUvhMQgpw/640?wx_fmt=png&from=appmsg "")  
  
**0x03 漏洞详情**  
###   
###   
  
**CVE-2024-42509**  
  
**漏洞类型：**  
命令注入  
  
**影响：**  
执行任意命令  
  
**简述：**  
由于HPE Aruba Networking Access Points底层CLI服务中存在命令注入漏洞，可能导致未经身份验证的威胁者通过向PAPI UDP端口发送特制数据包导致远程命令执行，成功利用该漏洞可能导致在底层操作系统上以特权用户身份执行任意命令或代码。  
###   
  
**0x04 影响版本**  
- AOS-10.4.x.x <= 10.4.1.4  
  
- Instant AOS-8.12.x.x <= 8.12.0.2  
  
- Instant AOS-8.10.x.x <= 8.10.0.13  
  
**0x05****POC状态**  
- 未公开  
  
**0x06****修复建议**  
  
**目前官方已发布漏洞修复版本，建议用户升级到安全版本****：**  
  
https://www.hpe.com/  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
