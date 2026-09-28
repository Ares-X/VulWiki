---
cve: "CVE-2024-0199"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【漏洞预警】GitLab 身份验证绕过漏洞CVE-2024-0199   
cexlife  飓风网络安全   2024-03-07 21:49  
  
![](https://mmbiz.qpic.cn/mmbiz_png/ibhQpAia4xu02wHQmQJojYOOdvLPMHmdTI7v4jh9ABJwz4X3DDhwLb0Fk8fFcYmVicG5OlicVoTyT2lTj06TP4axwQ/640?wx_fmt=png&from=appmsg "")  
  
**漏洞描述:**GitLab是一个开源的代码托管平台,用于代码管理和协作,CODEOWNERS是GitLab中的一个功能,允许项目维护者指定可以批准代码更改的人员,该功能旨在提高代码审核的安全性，并确保只有经过授权的人员才能合并代码更改,GitLab中存在一个身份认证绕过漏洞,该漏洞允许攻击者绕过 CODEOWNERS验证，在旧功能分支中利用精心构造的有效负载执行恶意操作，成功的利用此漏洞可以实现对代码和数据进行访问和修改。**影响版本:**11.3<=GitLab CE<16.7.716.7.6<=GitLab CE<16.8.416.8.3<=GitLab CE<16.9.211.3<=GitLab EE<16.7.716.7.6<=GitLab EE<16.8.416.8.3<=GitLab EE<16.9.2**修复建议:****正式防护方案:**GitLab 已发布安全更新修复了此漏洞,建议所有受影响的用户尽快升级到最新版本：  
  
GitLab 16.9.2  
  
GitLab 16.8.4  
  
GitLab 16.7.7**下载链接:**https://about.gitlab.com/releases/2024/03/06/security-release-gitlab-16-9-2-released/  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
