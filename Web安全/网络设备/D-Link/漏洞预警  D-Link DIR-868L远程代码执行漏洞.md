---
cve: "CVE-2025-63932"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  漏洞预警 | D-Link DIR-868L远程代码执行漏洞  
浅安
                    浅安  浅安安全   2026-01-26 00:00  
  
**0x00 漏洞编号**  
- # CVE-2025-63932  
  
**0x01 危险等级**  
- 高危  
  
**0x02 漏洞概述**  
  
友讯DIR-868L是友讯D-Link品牌旗下旗舰级双频千兆云路由器。  
  
![图片](https://mmbiz.qpic.cn/mmbiz_png/7stTqD182SV90bMc5WoLO2MWk19OYOxbsgnvt73eSeN4Ch58icIbibC5iaEIPb28epc1upxS5xHBkewm3TKDibLnvg/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0 "")  
  
**0x03 漏洞详情**  
###   
  
**CVE-2025-63932**  
  
**漏洞类型：**  
远程代码执行****  
  
**影响：**  
接管路由器  
  
**简述：**  
D-Link DIR-868L A1固件FW106KRb01.bin的cgibin二进制文件存在未授权远程代码执行漏洞，由于其cgibin提供的HNAP服务未对HTTP SOAPAction头部字段进行过滤，未授权的远程攻击者可通过该漏洞执行任意shell命令。  
  
**0x04 影响版本**  
- D-Link DIR-868L A1  
  
- D-Link dir-868l_firmware fw106krb01  
  
**0x05 POC状态**  
- 已公开  
  
****  
**0x06 修复建议**  
  
**目前官方已发布漏洞修复版本，建议用户升级到安全版本****：**  
  
https://www.dlink.com/  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
