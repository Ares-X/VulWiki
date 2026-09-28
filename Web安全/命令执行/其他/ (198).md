---
cve: "CVE-2024-0866"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【漏洞预警】checkemail Check & Log Email代码执行漏洞(CVE-2024-0866)   
cexlife  飓风网络安全   2024-03-26 21:37  
  
![](https://mmbiz.qpic.cn/mmbiz_png/ibhQpAia4xu00VWiacXGU707qGCWW6T2WaYWsictv8Pp3edn4nOBmg98nfxAPQwDUVjVor7L60Z3EZqkTm0AHWibKjw/640?wx_fmt=png&from=appmsg "")  
  
**漏洞描述:**  
WоrdPrеѕѕ的Chесk&Lоɡ电子邮件插件在所有版本（包括1.0.9）中都容易通过сhесk_nоnсе函数受到未经身份验证的挂钩注入,这使得未经身份验证的攻击者在某些情况下可以在WоrdPrеѕѕ中使用钩子执行操作,攻击者希望执行的操作需要进行随机数检查,并且攻击者需要知道随机数,此外,没有能力检查是一项要求。**影响产品:**  
*<=Check & Log Email<=1.0.9  
  
**厂商:**WordPress  
**CVSS3.0:**8.1 **检测方法:**通过版本进行检测 **产品:**Check & Log Email订阅CVSS2.0:8.1**解决方案:**目前官方已有可更新版本,建议受影响用户升级至最新版本**参考链接:**https://plugins.trac.wordpress.org/changeset?sfp_email=&sfph_mail=&reponame=&old=3050794%40check-email&new=3050794%40check-email&sfp_email=&sfph_mail=https://www.wordfence.com/threat-intel/vulnerabilities/id/9ae9307c-680c-43c7-8246-a3e6149c1fb6?source=cve  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
