---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  GitHub Enterprise Server 中存在严重的认证漏洞   
Ryan Naraine  代码卫士   2024-08-22 17:58  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Az5ZsrEic9ot90z9etZLlU7OTaPOdibteeibJMMmbwc29aJlDOmUicibIRoLdcuEQjtHQ2qjVtZBt0M5eVbYoQzlHiaw/640?wx_fmt=gif "")  
  
   
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
**GitHub 紧急修复了位于 GitHub Enterprise Server 产品中的三个安全缺陷，并提醒称黑客可利用其中一个漏洞获得站点管理员权限。**  
  
其中最严重的是CVE-2024-6800，可导致攻击者操纵 SAML SSO 来提供和/或获得对拥有站点管理员权限的用户账户的访问权限。该漏洞的CVSS评分为9.5，是位于 GitHub Enterprise Server (GHES) 中的一个XML封装漏洞，在使用具有特定身份提供商的SAML认证时触发。  
  
GitHub 在安全公告中提到，”该漏洞可导致对 GitHub Enterprise Server 拥有直接网络访问权限的攻击者伪造 SAML 响应来提供和/或获得对具有站点管理员权限的用户访问权限。利用该漏洞可导致对该实例获得越权访问权限，而无需提前认证。”  
  
GitHub 提到该漏洞通过漏洞奖励计划报送，影响 GitHub Enterprise Server 3.14之前的所有版本，已在3.13.3、3.12.8、3.11.4和3.10.16版本中修复。GitHub 还提到了两个中危漏洞可导致攻击者更新任何公开仓库中任何issue的抬头、受让人和标签；以及仅通过 contents: read 和 pull requests: write权限使用 GitHub App 从私密仓库发布contents。  
  
GitHub Enterprise Server 是 GitHub Enterprise 的自托管版本，在本地或私有云上安装，提供基于云的 GitHub 版本特性，包括拉取请求、代码审计和项目管理工具等。  
  
  
  
代码卫士试用地址：  
https://codesafe.qianxin.com  
  
开源卫士试用地址：https://oss.qianxin.com  
  
  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[Netgear 提醒用户修复认证绕过和XSS漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247520065&idx=1&sn=f3f7fcc056f11a3fe8e615681e0bd033&chksm=ea94be2bdde3373dda4a969cc8e526e43e261ee0d0c1e8748a5bdd70ef70d355bcb2252ea69d&scene=21#wechat_redirect)  
  
  
[Juniper 紧急修复严重的认证绕过漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247519930&idx=1&sn=fb9fb97863d38cac47e2e8c94fdfc267&chksm=ea94bfd0dde336c6cc905b39fdfcd6192b649ef99de88faa7d5c707a3eedf44f88820ce1fbee&scene=21#wechat_redirect)  
  
  
[MOVEit Transfer 软件中存在高危的认证不当漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247519884&idx=1&sn=6407cbe53c48d873acacc653dceafd9b&chksm=ea94bfe6dde336f08a96c5768226e9e70afb02e7a0fdafe7042e062a6cd911476df4b34ebdfb&scene=21#wechat_redirect)  
  
  
[存疑 CVE 漏洞带来无谓压力 热门开源项目开发者归档 GitHub 仓库](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247519930&idx=2&sn=acd4b1226ac3021b5aa91433e3f657f5&chksm=ea94bfd0dde336c6a6ba483f21d5d9572e139fb0e5cd5ac1a9ccde95f91e2330823dfbc71c20&scene=21#wechat_redirect)  
  
  
[GitHub 评论被滥用于推送恶意软件](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247519338&idx=3&sn=ce709d5220bb6c2f682b40e739ddb45a&chksm=ea94bd00dde3341689317ffd9ae079e27052fd9394be372945e3ac51a63d809ddd7ba6f7ee53&scene=21#wechat_redirect)  
  
  
[供应链攻击滥用 GitHub 特性传播恶意软件](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247519269&idx=2&sn=d6c911a2eb50fa5c85016bfc6439be5a&chksm=ea94bd4fdde3345906eee3ee7e47e08bfd5fa5e98365e6741efdc8cffeef3e77b4f697c09d28&scene=21#wechat_redirect)  
  
  
  
  
  
**原文链接**  
  
  
https://www.securityweek.com/critical-authentication-flaw-haunts-github-enterprise-server/  
  
  
题图：  
Pixabay  
 License  
  
****  
**本文由奇安信编译，不代表奇安信观点。转载请注明“转自奇安信代码卫士 https://codesafe.qianxin.com”。**  
  
  
  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/oBANLWYScMSf7nNLWrJL6dkJp7RB8Kl4zxU9ibnQjuvo4VoZ5ic9Q91K3WshWzqEybcroVEOQpgYfx1uYgwJhlFQ/640?wx_fmt=jpeg "")  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/oBANLWYScMSN5sfviaCuvYQccJZlrr64sRlvcbdWjDic9mPQ8mBBFDCKP6VibiaNE1kDVuoIOiaIVRoTjSsSftGC8gw/640?wx_fmt=jpeg "")  
  
**奇安信代码卫士 (codesafe)**  
  
国内首个专注于软件开发安全的产品线。  
  
   ![](https://mmbiz.qpic.cn/mmbiz_gif/oBANLWYScMQ5iciaeKS21icDIWSVd0M9zEhicFK0rbCJOrgpc09iaH6nvqvsIdckDfxH2K4tu9CvPJgSf7XhGHJwVyQ/640?wx_fmt=gif "")  
  
   
觉得不错，就点个 “  
在看  
” 或 "  
赞  
” 吧~  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
