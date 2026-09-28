---
cve: "CVE-2024-38827"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【漏洞预警】Spring Security大小写敏感校验鉴权绕过风险CVE-2024-38827   
cexlife  飓风网络安全   2024-11-22 13:51  
  
![](https://mmbiz.qpic.cn/mmbiz_png/ibhQpAia4xu03bACNNiclDY4VBkXUueIrdialEWGPic9UPotpcPPiaJ0sfQh7hJnEwibueOA5prbFZFIibiaiaPecpyuv22g/640?wx_fmt=png&from=appmsg "")  
  
**漏洞描述:**  
  
SpringSecurity是开源的身份验证和访问控制框架,由于java语言中String.toLowerCase()、String.toUpperCase()方法与语言地区(Locale)相关,在Spring Security受影响版本中调用该方法进行鉴权判断时未指定Locale参数,导致在特定地区的系统环境中（如土耳其语）,Spring Security中的大小写字母转换将出现不一致，可能导致鉴权规则被绕过,在新版本中Spring Security通过指定转换时的locale参数避免不一致问题。  
  
![](https://mmbiz.qpic.cn/mmbiz_png/ibhQpAia4xu03bACNNiclDY4VBkXUueIrdiaSVibbqf2En0yKz0MGOeopQF1eicIU5xgXmdztOdRloRvGgmmrAHsia7Cg/640?wx_fmt=png&from=appmsg "")  
  
![](https://mmbiz.qpic.cn/mmbiz_png/ibhQpAia4xu03bACNNiclDY4VBkXUueIrdiacJl5bPsor0GC88MP9sdUF5cx6tsu1cvqAhzxjAkNzLZnVrkX3498TA/640?wx_fmt=png&from=appmsg "")  
  
![](https://mmbiz.qpic.cn/mmbiz_png/ibhQpAia4xu03bACNNiclDY4VBkXUueIrdiaDibztRnRPVEDMOKRyeVKOl150JqmBy8SlgUAgOfpZBicicphIhhdPEZfw/640?wx_fmt=png&from=appmsg "")  
  
  
**影响范围:**  
  
![](https://mmbiz.qpic.cn/mmbiz_png/ibhQpAia4xu03bACNNiclDY4VBkXUueIrdiaUnDzUXnDplyfCZu8WFXC9Hfb4k5jAJgbzT3IjIFV7PiagOiaQUVgzrYQ/640?wx_fmt=png&from=appmsg "")  
  
**参考链接:**https://spring.io/security/cve-2024-38827  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
