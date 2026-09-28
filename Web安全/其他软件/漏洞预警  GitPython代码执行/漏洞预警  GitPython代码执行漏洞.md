---
cve: "CVE-2023-40590"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  漏洞预警 | GitPython代码执行漏洞   
浅安  浅安安全   2024-01-13 08:00  
  
**0x00 漏洞编号**  
- # CVE-2023-40590  
  
**0x01 危险等级**  
- 高危  
  
**0x02 漏洞概述**  
  
GitPython是一个与Git库交互的Python库，包括底层命令与高层命令，它可以实现绝大部分的Git读写操作，避免了频繁与Shell交互的畸形代码。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/7stTqD182SUnic7IH0FOic1Hr7L5YByMl1lfVia5Q0UZicfKrSFUOAGoUTGFsHdBiaYHXeUkbCsRTBO1WH72ib1zWX6Q/640?wx_fmt=png&from=appmsg "")  
  
**0x03 漏洞详情**  
  
**CVE-2023-40590**  
  
**漏洞类型：**  
代码执行  
  
**影响：**  
执行任意代码  
  
**简述：**  
GitPython中存在代码执行漏洞，在Windows上，如果GitPython使用shell来运行git，以及当它运行bash.exe来解释hooks时，它会使用不受信任的搜索路径并可能执行在不受信任的搜索路径中找到的程序。如果在Windows上使用这些功能中的任何一个，则可能导致从不受信任的存储库中运行恶意git.exe或bash.exe，从而导致任意代码执行。  
###   
  
**0x04 影响版本**  
- GitPython < 3.1.4  
  
**0x05****POC**  
  
https://github.com/gitpython-developers/GitPython/security/advisories/GHSA-2mqj-m65w-jghx  
  
https://github.com/gitpython-developers/GitPython/security/advisories/GHSA-wfm5-v35h-vwf4  
  
**仅供安全研究与学习之用，若将工具做其他用途，由使用者承担全部法律及连带责任，作者及发布****者**  
**不承担任何法律及连带责任。**  
  
**0x06****修复建议**  
  
**目前官方已发布漏洞修复版本，建议用户升级到安全版本****：**  
  
https://github.com/gitpython-developers/GitPython  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
