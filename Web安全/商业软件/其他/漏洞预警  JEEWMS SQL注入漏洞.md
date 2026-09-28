---
cve: "CVE-2025-5384"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  漏洞预警 | JEEWMS SQL注入漏洞   
浅安  浅安安全   2025-06-04 00:00  
  
**0x00 漏洞编号**  
- # CVE-2025-5384  
  
- # CVE-2025-5386  
  
- # CVE-2025-5388  
  
**0x01 危险等级**  
- 高危  
  
**0x02 漏洞概述**  
  
JEEWMS基于JAVA的仓库管理系统，包含PDA端和WEB端，功能涵盖WMS、OMS、BMS、TMS。  
  
![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/7stTqD182SV5c5fjMPRA8L7bFrkibpMUW5zfvTx0EzgSfXq1p3JdQsULDGic38X1VvEEenMmdEscsTfP1p4HXujA/640?wx_fmt=png&from=appmsg&wxfrom=5&wx_lazy=1&wx_co=1&tp=webp "")  
  
**0x03 漏洞详情**  
  
**CVE-2025-5384**  
  
**漏洞类型：**  
SQL注入  
  
**影响：**  
获取敏感信息  
  
**简述：**  
JEEWMS的/cgAutoListController.do?datagrid接口存在SQL注入漏洞，经身份验证的攻击者可以通过该漏洞获取数据库敏感信息。  
  
CVE-2025-5386  
  
**漏洞类型：**  
SQL注入  
  
**影响：**  
获取敏感信息  
  
**简述：**  
JEEWMS的/cgformTransController.do?transEditor接口存在SQL注入漏洞，经身份验证的攻击者可以通过该漏洞获取数据库敏感信息。  
  
CVE-2025-5388  
  
**漏洞类型：**  
SQL注入  
  
**影响：**  
获取敏感信息  
  
**简述：**  
JEEWMS的/generateController.do?dogenerate接口存在SQL注入漏洞，经身份验证的攻击者可以通过该漏洞获取数据库敏感信息。  
  
**0x04 影响版本**  
- JEEWMS  
  
**0x05****POC状态**  
- 已公开  
  
**0x06****修复建议**  
  
**目前官方已发布漏洞修复版本，建议用户升级到安全版本****：**  
  
http://www.huayi-tec.com/  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
