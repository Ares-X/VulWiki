---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  Jenkins 中发布安全公告，修复多个安全漏洞   
 独眼情报   2024-10-04 09:58  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/KgxDGkACWnQ0UL7gborIjpet3fLGB2ibbt23xO93gP6FFcpN4KFUUPww2EYlgY102DEjePibYZCibMrjcU4Roq43Q/640?wx_fmt=other&from=appmsg "")  
  
Jenkins 项目发布了安全公告，敦促用户立即更新其安装，因为发现了多个漏洞。这些漏洞可能允许攻击者窃取敏感数据、绕过安全限制，甚至完全控制 Jenkins 服务器。  
  
最严重的漏洞包括：  
- CVE-2024-47803：  
此漏洞通过错误消息泄露多行机密信息，例如 API 密钥和密码。这些信息可通过系统日志访问，从而可能让攻击者获得敏感凭据。  
  
- CVE-2024-47804：  
攻击者可以利用此漏洞绕过项目创建限制，从而使他们能够创建临时项目，并在获得进一步的权限后保留这些项目以获得未经授权的访问。  
  
- CVE-2024-47805：  
此漏洞允许具有“扩展读取”权限的用户查看加密凭证值，从而可能暴露证书和秘密文件等敏感信息。  
  
- CVE-2024-47806 和 CVE-2024-47807：  
 OpenID Connect 身份验证插件中的这些漏洞未能验证 ID 令牌中的关键声明。此疏忽可能允许攻击者绕过身份验证，从而可能获得 Jenkins 服务器的管理员访问权限。  
  
Jenkins项目已发布更新以解决这些漏洞。强烈建议用户更新至以下版本：  
- 詹金斯周度：2.479  
  
- Jenkins LTS：2.462.3  
  
- 凭证插件：1381.v2c3a_12074da_b_  
  
- OpenID Connect 身份验证插件：4.355.v3a_fb_fca_b_96d4  
  
这些漏洞带来了严重的安全风险，包括未经授权的访问、敏感数据的泄露以及对 Jenkins 实例的潜在接管。需要立即采取行动，保护您的 Jenkins 环境免受这些威胁。  
  
有关更多详细信息，请参阅官方  
Jenkins 安全公告  
并相应地更新您的系统。  
> https://www.jenkins.io/security/advisory/2024-10-02/#jenkins-security-advisory-2024-10-02  
  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
