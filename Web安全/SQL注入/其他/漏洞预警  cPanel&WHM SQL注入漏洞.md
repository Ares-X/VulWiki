---
cve: "CVE-2026-67401"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  漏洞预警 | cPanel&WHM SQL注入漏洞  
浅安
                    浅安  浅安安全   2026-09-17 00:00  
  
**0x00 漏洞编号**  
- # CVE-2026-67401  
  
**0x01 危险等级**  
- 高危  
  
**0x02 漏洞概述**  
  
cPanel&WHM是全球主流的LinuxWeb托管控制面板。  
  
![图片](https://mmbiz.qpic.cn/mmbiz_png/NQlfTO30Mhx3aWGVZlxWQRQNGo3znKeicA9sPNT7EVqT7G7sH1Xr8YSgZGJ3qe94pEeiacJzaSBtGtNicyEzN6JZ2tDuKMUrGKTbsicKdGibGBzU/640?wx_fmt=png&from=appmsg&wxfrom=5&wx_lazy=1&tp=webp#imgIndex=0 "")  
  
**0x03 漏洞详情**  
  
**CVE-2026-67401**  
  
**漏洞类型：**  
SQL注入  
  
**影响：**  
获取敏感信息  
  
**简述：**  
cPanel&WHM存在SQL注入漏洞，持有邮件相关权限的已认证cPanel账户可注入恶意SQL语句，在服务器上创建任意文件，该任意文件创建能力可进一步导致以root身份执行代码，攻击者最终获得服务器完全控制权。  
  
**0x04 影响版本**  
- cPanel&WHM < v11.110.0.143  
  
- cPanel&WHM < v11.134.0.55  
  
- cPanel&WHM < v11.136.0.39  
  
- cPanel&WHM < v11.138.0.4  
  
- cPanel&WHM < WP2: v11.138.1.9  
  
**0x05****POC状态**  
- 已公开  
  
**0x06****修复建议**  
  
**目前官方已发布漏洞修复版本，建议用户升级到安全版本****：**  
  
https://www.cpanel.net/  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
