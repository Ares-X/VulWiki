---
cve: "CVE-2026-2699"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  漏洞预警 | Progress ShareFile身份认证绕过和文件上传漏洞  
浅安
                    浅安  浅安安全   2026-04-15 23:50  
  
**0x00 漏洞编号**  
- # CVE-2026-2699  
  
- # CVE-2026-2701  
  
**0x01 危险等级**  
- 高危  
  
**0x02 漏洞概述**  
  
Progress ShareFile是一款企业级安全文件传输与协作平台，支持文件共享、数据收集、电子签名及任务管理等功能。  
  
![](https://mmbiz.qpic.cn/mmbiz_png/NQlfTO30MhzhBLedKmL4fZ88W0rwxhw8EOQGPynNqIHhKr7uyUX6H3vIpohkxcsBa37WYzwIdic6RgnKaibQ2MPlI2ZLNPR2IyCR1X98iafAicg/640?wx_fmt=png&from=appmsg "")  
  
**0x03 漏洞详情**  
  
**CVE-2026-2699**  
  
**漏洞类型：**  
身份认证绕过  
  
**影响：**  
越权操作  
  
**简述：**  
Progress ShareFile  
存在身份认证绕过漏洞，由于ASP.NET应用错误使用Response.Redirect(..., false)，在重定向后未终止页面执行，导致未认证用户可绕过身份验证访问后台功能。  
  
**CVE-2026-2701**  
  
**漏洞类型：**  
文件上传  
  
**影响：**  
执行任意代码  
  
**简述：**  
Progress ShareFile存在远程代码执行漏洞，由于系统在存储路径配置及文件上传解压逻辑中缺乏有效安全限制，允许攻击者将文件写入Web目录并执行，从而控制服务器。  
  
**0x04 影响版本**  
- Storage Zone Controller 5.x <= 5.12.3  
  
**0x05****POC状态**  
- 已公开  
  
**0x06****修复建议**  
  
**目前官方已发布漏洞修复版本，建议用户升级到安全版本****：**  
  
https://docs.sharefile.com/  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
