---
cve: "CVE-2025-57516"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  漏洞预警 | PublicCMS命令注入漏洞  
浅安  浅安安全   2026-01-08 00:00  
  
**0x00 漏洞编号**  
- # CVE-2025-57516  
  
**0x01 危险等级**  
- 高危  
  
**0x02 漏洞概述**  
  
PublicCMS是天津黑核科技有限公司开发的开源JAVACMS系统。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/7stTqD182SVfRgZ6ibfom9PVU6ppu085FgGTDfI4jqMlQgkza90h44m8Y0Mm54RLibRicN4vgGEFJ0UbjazX1kcrg/640?wx_fmt=png&from=appmsg "")  
  
**0x03 漏洞详情**  
  
**CVE-2025-57516**  
  
**漏洞类型：**  
命令注入  
  
**影响：**  
任意代码执行  
  
**简述：**  
PublicCMS的/admin/sysSite/execScript?navTabId=sysSite/script接口存在命令注入漏洞，攻击者可利用此漏洞通过向backupDB.bat文件发送经过精心设计的DATABASE、USERNAME或PASSWORD变量来执行任意命令。  
  
**0x04 影响版本**  
- PublicCMS V5.202506.a  
  
- PublicCMS V5.202506.b  
  
**0x05****POC状态**  
- 已公开  
  
**0x06****修复建议**  
  
**目前官方已发布漏洞修复版本，建议用户升级到安全版本****：**  
  
https://www.publiccms.com/  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
