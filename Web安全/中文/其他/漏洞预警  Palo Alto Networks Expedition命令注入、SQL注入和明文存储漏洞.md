---
cve: "CVE-2024-9463"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  漏洞预警 | Palo Alto Networks Expedition命令注入、SQL注入和明文存储漏洞   
浅安  浅安安全   2024-11-22 23:50  
  
**0x00 漏洞编号**  
- # CVE-2024-9463  
  
- # CVE-2024-9464  
  
- # CVE-2024-9465  
  
- # CVE-2024-9466  
  
**0x01 危险等级**  
- 高危  
  
**0x02 漏洞概述**  
  
Palo Alto Networks Expedition是Palo Alto Networks提供的一款迁移工具，旨在帮助网络安全团队进行防火墙规则的迁移、优化和管理。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/7stTqD182SVbXfJt6LWcEicwqvnut0jr8XVD0wCugFtw6lXdGKibsSscyqIhLDBnhNibWsz1YjeLGqGGHb3pyKN0Q/640?wx_fmt=png&from=appmsg "")  
  
**0x03 漏洞详情**  
###   
###   
  
**CVE-2024-9463**  
  
**漏洞类型：**  
命令注入  
  
**影响：**  
执行  
任意命令  
  
**简述：**  
Palo Alto Networks Expedition的/API/convertCSVtoParquet.php接口存在命令注入漏洞，未经身份验证的攻击者可利用该漏洞在Expedition中以root身份运行任意系统命令，从而导致PAN-OS防火墙的用户名、明文密码、设备配置和设备API密钥泄露。  
  
**CVE-2024-9464**  
  
**漏洞类型：**  
SQL注入  
  
**影响：**  
  
执行  
任意命令  
  
**简述：**  
Palo Alto Networks Expedition的/bin/CronJobs.php接口存在命令注入漏洞，经过身份验证的攻击者可利用该漏洞在Expedition中以root身份运行任意系统命令。  
  
**CVE-2024-9465**  
  
**漏洞类型：**  
SQL注入  
  
**影响：**  
获取  
敏感信息  
  
**简述：**  
Palo Alto Networks Expedition的/bin/configurations/parsers/Checkpoint/CHECKPOINT.php接口存在SQL注入漏洞，未经身份验证的攻击者可利用该漏洞获取Expedition 数据库内容，例如密码哈希、用户名、设备配置和设备API密钥等，并可在Expedition系统上创建和读取任意文件。  
  
**CVE-2024-9466**  
  
**漏洞类型：**  
明文存储  
  
**影响：**  
获取  
敏感信息  
  
**简述：**  
Palo Alto Networks Expedition存在明文存储敏感信息漏洞，允许经过身份验证的攻击者获取使用这些凭据生成的防火墙用户名、密码和API密钥。  
###   
  
**0x04 影响版本**  
- Palo Alto Networks Expedition < 1.2.96  
  
**0x05****POC状态**  
- 已公开  
  
**0x06****修复建议**  
  
******目前官方已发布漏洞修复版本，建议用户升级到安全版本****：******  
  
https://live.paloaltonetworks.com/  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
