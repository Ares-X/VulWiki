---
cve: "CVE-2023-47890"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  漏洞预警 | pyLoad远程代码执行漏洞   
浅安  浅安安全   2024-01-13 08:00  
  
**0x00 漏洞编号**  
- # CVE-2023-47890  
  
**0x01 危险等级**  
- 高危  
  
**0x02 漏洞概述**  
  
pyLoad是一个用纯Python编写的免费开源下载管理器。它是一个轻量级的工具，旨在简化和优化下载文件的过程。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/7stTqD182SUu97AuuP1dfkDicwM95VIiaZRaobLsKlxJMjkfucplUI2DBCAgRjSN2Wy1bqjroicHrpwevfwiaibSIeg/640?wx_fmt=png&from=appmsg "")  
  
**0x03 漏洞详情**  
###   
###   
  
**CVE-2023-47890**  
  
**漏洞类型：**  
远程代码执行****  
  
**影响：**  
  
执行任意代码  
  
****  
  
**简述：**  
pyLoad 0.5.0中存在远程代码执行漏洞，容易受到无限制文件上传的攻击，攻击者通过远程执行脚本能够在操作系统上执行任意命令。  
###   
  
**0x04 影响版本**  
- pyLoad 0.5.0  
  
**0x05****POC**  
  
https://github.com/pyload/pyload/security/advisories/GHSA-h73m-pcfw-25h2  
  
**仅供安全研究与学习之用，若将工具做其他用途，由使用者承担全部法律及连带责任，作者及发布****者**  
**不承担任何法律及连带责任。**  
  
**0x06****修复建议**  
  
**目前官方已发布漏洞修复版本，建议用户升级到安全版本****：**  
  
https://pyload.net/  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
