---
cve: "CVE-2024-3116"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【漏洞预警】pgAdmin远程代码执行漏洞（CVE-2024-3116）   
cexlife  飓风网络安全   2024-04-08 23:14  
  
![](https://mmbiz.qpic.cn/mmbiz_png/ibhQpAia4xu00wmaJhKJMBRBCEzCOUKnqV9FGbqSBI7xFicvDASsUKCEGwjx1OAQ2yCia6tp5sUYmicF5XoRvF1OcOg/640?wx_fmt=png&from=appmsg "")  
  
**漏洞描述:**pgAdmin是PostgreSQL的官方图形界面管理工具,以便于管理和维护PostgreSQL数据库,近日监测到pgAdmin中修复了一个远程代码执行漏洞CVE-2024-3116,其CVSS评分为7.4,目前该漏洞的细节及PoC已公开,pgAdmin版本<=8.4中,当运行在Windows平台上时,由于对文件路径验证不充分,经过身份验证的威胁者可利用validate_binary_path接口构造恶意请求导致远程代码执行,成功利用该漏洞可能导致远程执行命令并控制目标系统。  
  
![](https://mmbiz.qpic.cn/mmbiz_png/ibhQpAia4xu00wmaJhKJMBRBCEzCOUKnqVBratqbvAEZd0Gq7b9cfpI7AAEjAosq37ibbnJjkPxCwicJIFgaIUHoPw/640?wx_fmt=png&from=appmsg "")  
  
![](https://mmbiz.qpic.cn/mmbiz_png/ibhQpAia4xu00wmaJhKJMBRBCEzCOUKnqVm704XdSHBf9fEFmnPwK0dvT4AFhjOsYR5YibhsZmp8dgqetm8cEznMw/640?wx_fmt=png&from=appmsg "")  
  
![](https://mmbiz.qpic.cn/mmbiz_png/ibhQpAia4xu00wmaJhKJMBRBCEzCOUKnqVjbCOlkKoKrKStnqicSqQ4UIW4MSa8nYOKYiaGYqp9eUwhsLaC3uSZbdw/640?wx_fmt=png&from=appmsg "")  
  
**影响范围:**  
  
pgAdmin<= 8.4**安全措施:**升级版本目前该漏洞已经修复,受影响用户可升级到pgAdmin8.5或更高版本下载链接:https://www.pgadmin.org/download/**临时措施:**暂无  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
