---
cve: "CVE-2025-21613"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  漏洞预警 | go-git参数注入漏洞   
浅安  浅安安全   2025-01-15 00:00  
  
**0x00 漏洞编号**  
- # CVE-2025-21613  
  
**0x01 危险等级**  
- 高危  
  
**0x02 漏洞概述**  
  
go-git是一个用Go语言编写的高度可扩展的git实现库。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/7stTqD182SVkFdQtD1w6hW1aqBKDvPKCVFib9lVbgkxhgIJrvcIx6PfTzIDFmy1ZzM2nic7cX1iaqXOqIAq8abn3w/640?wx_fmt=png&from=appmsg "")  
  
**0x03 漏洞详情**  
###   
  
**CVE-2025-21613**  
  
**漏洞类型：**  
参数注入  
  
**影响：**  
执行任意命令  
  
****  
  
**简述：**  
go-git中存在参数注入漏洞，该漏洞源于go-git库在使用文件传输协议时，未能正确处理或验证通过URL字段传入的输入，导致攻击者可能注入恶意参数到本地调用的git二进制文件中。攻击者可利用该漏洞修改git-upload-pack命令的标志，从而控制命令行为。成功利用该漏洞的攻击者可以设置任意的git-upload-pack标志值，进而导致未授权访问、信息泄露或执行其他恶意操作。  
  
**0x04 影响版本**  
- 4.0.0 <= go-git < 5.13.0  
  
**0x05****POC状态**  
- 未公开  
  
**0x06****修复建议**  
  
**目前官方已发布漏洞修复版本，建议用户升级到安全版本****：**  
  
https://github.com/go-git/go-git/  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
