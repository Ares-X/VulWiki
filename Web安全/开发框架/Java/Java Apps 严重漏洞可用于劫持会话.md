---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  Java Apps 严重漏洞可用于劫持会话  
Ddos  代码卫士   2026-01-12 10:20  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Az5ZsrEic9ot90z9etZLlU7OTaPOdibteeibJMMmbwc29aJlDOmUicibIRoLdcuEQjtHQ2qjVtZBt0M5eVbYoQzlHiaw/640?wx_fmt=gif "")  
    
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
****  
**Java应用程序如 WildFly 和 JBoss EAP 等中广为使用的组件 Undertow HTTP 服务器内核中存在一个严重漏洞CVE-2025-12543（CVSS评分9.6），可导致攻击者劫持用户会话并攻陷内部系统。**  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
该漏洞存在于 Undertow 在进站请求中处理 HTTP Host 标头的方式中。该库未能正确验证这些标头，可导致恶意 Host 标头顺利通过。该弱点可带来多个攻击向量，如缓存投毒、内部网络扫描和会话劫持等。  
  
Red Hat 将该漏洞评级为“重要”级别，因为它可导致攻击者无需身份验证就远程利用，不过利用该漏洞仍然需要有限的用户交互。成功利用该漏洞可导致攻击者窃取用户凭据、劫持更多账户或者获得对内部系统的越权访问权限。  
  
该漏洞严重影响受影响系统的机密性和完整性，如Red Hat Jboss 企业应用平台8.1版本和多个程序包相关组件包括 eap8-undertow、eap8-wildfly和其它相关库等。Red Hat 已发布补丁修复该漏洞。组织机构应当立即应用2026年1月8日发布的更新，相关安全公告为 RHSA-2026:0386和RHSA-2026:0383。目前尚不存在满足 Red Hat 关于易用性和稳定性安全标准的缓解措施，因此用户应立即应用所推荐的补丁。  
  
  
 开源  
卫士试用地址：  
https://oss.qianxin.com/#/login  
  
  
 代码卫士试用地址：https://sast.qianxin.com/#/login  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[热门JavaScript 加密库 Forge 修复签名验证绕过漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247524529&idx=2&sn=f430edc811448de4be9a55cfb12448d5&scene=21#wechat_redirect)  
  
  
[JavaScript 热门库 expr-eval 易受 RCE 攻击](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247524359&idx=3&sn=dca660000a6936def1900d3d5cf13519&scene=21#wechat_redirect)  
  
  
[Apache Parquet Java 中存在CVSS满分漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247522648&idx=1&sn=8642efdcfe877619e821e6fa74e779b7&scene=21#wechat_redirect)  
  
  
[Apache Avro SDK 中存在严重漏洞，可导致在 Java 应用中实现RCE](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247520994&idx=1&sn=0feb249fd14e6b8b07d5d6531f3287c2&scene=21#wechat_redirect)  
  
  
  
  
  
**原文链接**  
  
https://securityonline.info/the-9-6-crack-in-javas-foundation-critical-undertow-flaw-cve-2025-12543/  
  
  
题图：Pixa  
bay Licens  
e  
  
  
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
