---
cve: "CVE-2025-2306"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【漏洞预警】MongoDB Mongoose未授权 代码注入漏洞CVE-2025-2306   
cexlife  飓风网络安全   2025-01-21 05:40  
  
![](https://mmbiz.qpic.cn/mmbiz_png/ibhQpAia4xu01TMibJqkiaeAEcz1NibwZc0XemxgHicSAWMk0OQDSGoK5olaJAEoJEYxW2nGVj82pnqGb28djq7P8NbQ/640?wx_fmt=png&from=appmsg "")  
  
**漏洞描述:**  
Mongoose库被发现存在严重漏洞,该漏洞源于对嵌套的$where过滤器处理不当,可能被攻击者利用来暴露敏感数据和操纵搜索结果,全网有超过140万个使用Mongoose httpd 服务器的应用可能受到此漏洞影响,建议受影响用户及时采取防护措施。  
![](https://mmbiz.qpic.cn/mmbiz_png/ibhQpAia4xu01TMibJqkiaeAEcz1NibwZc0XeDWJ619WmAJbxmVsqzyv9dnx38yia9ahKKiakMTK1wYgfpInG9aL11A0w/640?wx_fmt=png&from=appmsg "")  
  
![](https://mmbiz.qpic.cn/mmbiz_png/ibhQpAia4xu01TMibJqkiaeAEcz1NibwZc0XeSVJEEtQhuhtNCzuFKcQrQv8AdeotXBHiaoY8R37xICPMRFibO1U95MHw/640?wx_fmt=png&from=appmsg "")  
  
**修复建议:**  
  
正式防护方案:  
针对此漏洞,官方已经发布了漏洞修复版本,请立即更新到安全版本:MongoDB社区 Mongoose >= 8.9.5可以通过运行以下命令来完成升级:npm install mongoose@latest安装前,请确保备份所有关键数据,并按照官方指南进行操作。安装后,进行全面测试以验证漏洞已被彻底修复,并确保系统其他功能正常运行。  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
