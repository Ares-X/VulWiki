---
cve: "CVE-2026-23525"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  漏洞预警 | 1Panel跨站脚本漏洞  
浅安
                    浅安  浅安安全   2026-03-16 00:02  
  
**0x00 漏洞编号**  
- # CVE-2026-23525  
  
**0x01 危险等级**  
- 中危  
  
**0x02 漏洞概述**  
  
1Panel是一个开源的Linux服务器运维管理面板。  
  
![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/7stTqD182SWsN6KIoRxfjrjYVaNKXichqNRia479jyefJq6qBKoduTMIaSjkIK7CoGEt5Auko2jibaEEn4iaxLicbbA/640?wx_fmt=png&from=appmsg&wxfrom=5&wx_lazy=1&wx_co=1&randomid=qrma8hlx&tp=webp#imgIndex=0 "")  
  
**0x03 漏洞详情**  
###   
  
**CVE-2026-23525**  
  
**漏洞类型：**  
跨站脚本  
  
**影响：**  
执行任意命令  
  
**简述：**  
1Panel存在跨站脚本漏洞，由于该服务器MdEditor组件在启用previewOnly属性时对内容清理不足，攻击者可利用该漏洞实现远程代码执行。  
  
**0x04 影响版本**  
- 1Panel 1Panel <= v2.0.16  
  
- 1Panel 1Panel <= v1.10.33-lts  
  
**0x05 POC状态**  
- 未公开  
  
****  
**0x06****修复建议**  
  
**目前官方已发布漏洞修复版本，建议用户升级到安全版本****：**  
  
https://1panel.cn/  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
