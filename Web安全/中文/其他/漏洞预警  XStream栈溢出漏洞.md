---
cve: "CVE-2024-47072"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  漏洞预警 | XStream栈溢出漏洞   
浅安  浅安安全   2024-11-16 00:01  
  
**0x00 漏洞编号**  
- CVE-2024-47072  
  
**0x01 危险等级**  
- 高危  
  
**0x02 漏洞概述**  
  
XStream是一个用于在Java对象和XML之间相互转换的工具，它能够将Java对象序列化为XML或JSON格式，也可以将XML或JSON格式的数据反序列化为Java对象，从而简化了数据的存储、传输和恢复。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/7stTqD182SWpsmBToJ1PmvpWYLUqE5SKR3Ce50wCJImsymoz7GSVlS2psLAvUzlIiaG7QS43dNib3ccr7RUyicfpQ/640?wx_fmt=png&from=appmsg "")  
  
**0x03 漏洞详情**  
###   
###   
  
**CVE-2024-47072**  
  
**漏洞类型：**  
栈溢出  
  
**影响：**  
服务中断  
  
**简述：**  
XStream 1.4.21之前版本中，当XStream配置为使用BinaryStreamDriver时，由于在反序列化某些特定输入时处理不当，攻击者可以通过构造特定的二进制数据流作为输入，导致在反序列化时进入无限递归，从而触发栈溢出，使应用程序崩溃并导致服务中断，造成拒绝服务。  
  
**0x04 影响版本**  
- XStream < 1.4.21  
  
**0x05****POC状态**  
- 未公开  
  
**0x06****修复建议**  
  
******目前官方已发布漏洞修复版本，建议用户升级到安全版本****：******  
  
https://x-stream.github.io/  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
