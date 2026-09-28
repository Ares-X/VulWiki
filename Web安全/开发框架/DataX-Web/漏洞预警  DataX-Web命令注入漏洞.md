---
cve: "CVE-2023-7116"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  漏洞预警 | DataX-Web命令注入漏洞   
浅安  浅安安全   2024-01-06 08:04  
  
**0x00 漏洞编号**  
- # CVE-2023-7116  
  
**0x01 危险等级**  
- 高危  
  
**0x02 漏洞概述**  
  
DataX Web是在DataX之上开发的分布式数据同步工具，提供简单易用的 操作界面，降低用户使用DataX的学习成本，缩短任务配置时间，避免配置过程中出错。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/7stTqD182SWFYbCV6ahalqIbmBpqPtSenLibKvdjkzULLddByVvPDIcGAnibk4MWcnxa5a1cJR3rQos2jU4FaQLg/640?wx_fmt=png&from=appmsg "")  
  
**0x03 漏洞详情**  
###   
###   
  
**CVE-2023-7116**  
  
**漏洞类型：**  
命令注入****  
  
**影响：**  
  
接管服务器  
  
****  
  
**简述：**  
DataX Web在2.1.2版本中存在命令注入漏洞，经过身份认证的攻击者可以通过访问/api/log/killJob路由构造恶意的请求包，利用命令拼接的方式进行执行任意命令，控制服务器的权限。  
###   
  
**0x04 影响版本**  
- DataX Web 2.1.2  
  
**0x05****POC**  
- 已公开  
  
****  
**0x06****修复建议**  
  
**目前官方暂未发布漏洞修复版本，建议用户关注官网动态****：**  
  
https://github.com/WeiYe-Jing/datax-web  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
