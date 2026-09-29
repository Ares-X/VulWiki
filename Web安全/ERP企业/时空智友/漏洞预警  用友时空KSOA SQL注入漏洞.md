---
cve: "CVE-2025-15435"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  漏洞预警 | 用友时空KSOA SQL注入漏洞  
浅安
                    浅安  浅安安全   2026-02-14 00:00  
  
**0x00 漏洞编号**  
- # CVE-2025-15435  
  
- # CVE-2025-15436  
  
**0x01 危险等级**  
- 高危  
  
**0x02 漏洞概述**  
  
用友时空KSOA是建立在SOA理念指导下研发的新一代产品，它可以让流通企业各个时期建立的IT系统之间彼此轻松对话，帮助流通企业保护原有的IT投资，简化IT管理。  
  
![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/7stTqD182SUXzkIS3UCiaMBXoe3QHiaR40QZ022CyNpkdUl51WGbHBBqnKAouicg7fO78vlrgDR9oib2mccXwwic0XA/640?wx_fmt=png&from=appmsg&wxfrom=5&wx_lazy=1&tp=webp#imgIndex=0 "")  
  
**0x03 漏洞详情**  
###   
  
**CVE-2025-15435**  
  
**漏洞类型：**  
SQL注入  
  
**影响：**  
获取敏感信息  
  
**简述：**  
用友时空KSOA的/worksheet/work_update.jsp接口处存在  
SQL  
注入漏洞，未经身份认证的攻击者可通过该漏洞获取数据库敏感信息。  
  
**CVE-2025-15436**  
  
**漏洞类型：**  
SQL注入  
  
**影响：**  
获取敏感信息  
  
**简述：**  
用友时空KSOA的/worksheet/work_edit.jsp接口处存在  
SQL  
注入漏洞，未经身份认证的攻击者可通过该漏洞获取数据库敏感信息。  
  
**0x04 影响版本**  
- 用友时空KSOA   
9.0  
  
**0x05****POC状态**  
- 已公开  
  
**0x06****修复建议**  
  
**目前官方已发布漏洞修复版本，建议用户升级到安全版本****：**  
  
https://www.yonyou.com/  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
