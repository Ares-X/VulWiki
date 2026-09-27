---
cve: "CVE-2024-28255"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  漏洞预警 | OpenMetadata身份验证绕过和SpEL表达式注入漏洞   
浅安  浅安安全   2024-04-20 09:02  
  
**0x00 漏洞编号**  
- #   
  
CVE-2024-28255  
  
- CVE-2024-28253  
  
- CVE-2024-28847  
  
- CVE-2024-28254  
  
- CVE-2024-28848  
  
**0x01 危险等级**  
- 高危  
  
**0x02 漏洞概述**  
  
OpenMetadata是一个用于数据治理的一体化平台，可进行数据发现、数据沿袭、数据质量、可观察性、治理和团队协作等。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/7stTqD182SUyXyDV9WptCdlurQNfUVMET8SbGchEezialicDp2IJdkGa0uWHR04e0ibIUSrFEs1NSdGXAe3kJuEbg/640?wx_fmt=png&from=appmsg "")  
  
**0x03 漏洞详情**  
###   
###   
  
**CVE-2024-28255**  
  
**漏洞类型：**  
身份验证绕过  
  
**影响：**  
  
  
获取敏感信息  
  
  
**简述：**  
OpenMetadata中存在身份验证绕过漏洞，当请求的路径包含任何EXCLUDED_ENDPOINTS的端点时，过滤器将返回而不验证JWT，威胁者可构造恶意路径匹配排除的端点导致在没有JWT验证的情况下进行处理，从而导致绕过身份验证机制并访问任意端点。  
  
**CVE-2024-28253、CVE-2024-28847、CVE-2024-28254、CVE-2024-28848**  
  
**漏洞类型：**  
SpEL表达式注入  
  
**影响：**  
  
  
任意命令执行  
  
  
**简述：**  
OpenMetadata中存在多个SpEL表达式注入漏洞，威胁者可利用这些漏洞造成任意命令执行或远程代码执行。  
###   
  
**0x04 影响版本**  
  
CVE-2024-28847、CVE-2024-28848、CVE-2024-28254、CVE-2024-28255  
- OpenMetadata < 1.2.4  
  
CVE-2024-28253  
- OpenMetadata < 1.3.1  
  
**0x05****POC**  
  
  
https://securitylab.github.com/advisories/GHSL-2023-235_GHSL-2023-237_Open_Metadata/  
  
https://github.com/open-metadata/OpenMetadata/security/advisories/GHSA-6wx7-qw5p-wh84  
  
https://github.com/open-metadata/OpenMetadata/security/advisories/GHSA-7vf4-x5m2-r6gr  
  
**仅供安全研究与学习之用，若将工具做其他用途，由使用者承担全部法律及连带责任，作者及发布****者**  
**不承担任何法律及连带责任。**  
  
**0x06****修复建议**  
  
**目前官方已发布漏洞修复版本，建议用户升级到安全版本****：**  
  
https://github.com/open-metadata/OpenMetadata  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
