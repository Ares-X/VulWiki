---
cve: "CVE-2024-10915"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  漏洞预警 | D-Link NAS设备远程代码执行漏洞   
浅安  浅安安全   2024-11-22 23:50  
  
**0x00 漏洞编号**  
- # CVE-2024-10915  
  
**0x01 危险等级**  
- 高危  
  
**0x02 漏洞概述**  
  
D-Link NAS设备是一类专门设计用于家庭和小型企业的网络存储设备。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/7stTqD182SVL22sXWZReVaj95PAsCUQ05d3XdU3CN5kXZhAwz2DjmftLBG3yia12APCtOg5gvdEtXrr0AvdKRRA/640?wx_fmt=png&from=appmsg "")  
  
**0x03 漏洞详情**  
###   
  
**CVE-2024-10915**  
  
**漏洞类型：**  
命令注入  
  
  
**影响：**  
  
执行任意代码  
  
**简述：**  
D-Link NAS设备的/cgi-bin/account_mgr.cgi接口处存在命令注入漏洞，未经身份验证的攻击者通过特制的HTTP请求可利用此漏洞执行任意系统命令，写入后门文件，获取服务器权限。  
  
**0x04 影响版本**  
- DNS-320 1.00  
  
- DNS-320LW 1.01.0914.2012  
  
- DNS-325 1.01  
  
- DNS-325 1.02  
  
- DNS-340L 1.08  
  
**0x05****POC状态**  
- 已公开  
  
**0x06****修复建议**  
  
**目前官方已发布漏洞修复版本，建议用户升级到安全版本****：**  
  
https://www.dlink.com.cn/  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
