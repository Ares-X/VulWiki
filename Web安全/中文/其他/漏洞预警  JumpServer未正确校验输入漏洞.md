---
cve: "CVE-2023-48193"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  漏洞预警 | JumpServer未正确校验输入漏洞   
浅安  浅安安全   2023-12-02 08:00  
  
**0x00 漏洞编号**  
- # CVE-2023-48193  
  
**0x01 危险等级**  
- 高危  
  
**0x02 漏洞概述**  
  
Jumpserver是一款使用Python, Django开发的开源跳板机系统, 为互联网企业提供了认证，授权，审计，自动化运维等功能，基于ssh协议来管理，客户端无需安装agent。  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/7stTqD182SU8Hf5YibCK8obmSCq5lcwuicicV90ZnoN4iaM5UuGVX1SM0IoejjglOk9icZK6JQn3DI9qgiaqL3tClf5w/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1 "")  
  
**0x03 漏洞详情**  
###   
###   
  
**CVE-2023-48193**  
  
**漏洞类型：**  
未正确校验输入  
  
**影响：**  
  
执行任意命令  
  
**简述：**  
JumpServer在3.8.0及之前版本中存在未正确校验输入漏洞，JumpServer命令过滤功能用于阻止授权用户执行一些命令，但攻击者可以将执行的命令保存在.sh脚本中，然后执行该脚本，从而可以绕过命令过滤功能执行任意命令。  
###   
  
**0x04 影响版本**  
- JumpServer <= 3.8.0  
  
**0x05****修复建议**  
  
**目前官方已发布漏洞修复版本，建议用户升级到安全版本****：**  
  
https://www.jumpserver.org/  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
