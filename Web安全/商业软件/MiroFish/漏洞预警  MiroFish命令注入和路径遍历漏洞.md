---
cve: "CVE-2026-7058"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  漏洞预警 | MiroFish命令注入和路径遍历漏洞  
浅安
                    浅安  浅安安全   2026-05-19 23:50  
  
**0x00 漏洞编号**  
- # CVE-2026-7058  
  
- # CVE-2026-7059  
  
**0x01 危险等级**  
- 高危  
  
**0x02 漏洞概述**  
  
MiroFish是一款基于多智能体技术的新一代AI预测引擎。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/NQlfTO30MhwGiasvAF1rUUKiah5dS39zzGicDGuwxKSWoJjo39EJpPB4B2aRD6yyBBnlopY1Z04U0D1aGyib3s6dzOR3Nz1T19ZVg8Ap7yRGA2Q/640?wx_fmt=png&from=appmsg "")  
  
**0x03 漏洞详情**  
  
**CVE-2026-7058**  
  
**漏洞类型：**  
命令注入  
  
**影响：**  
执行任意代码  
  
**简述：**  
MiroFish存在命令注入漏洞，攻击者可通过该漏洞执行任意命令，进而控制服务器。  
  
**CVE-2026-7059**  
  
**漏洞类型：**  
路径遍历  
  
**影响：**  
获取敏感信息  
  
**简述：**  
MiroFish存在路径遍历漏洞，攻击者通过该漏洞可遍历及读取服务器文件内容，进而获取敏感信息。  
  
**0x04 影响版本**  
- MiroFish 0.1.2  
  
**0x05****POC状态**  
- 已公开  
  
**0x06****修复建议**  
  
**目前官方已发布漏洞修复版本，建议用户升级到安全版本****：**  
  
https://github.com/666ghj/MiroFish  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
