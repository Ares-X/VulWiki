---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  Ivanti Endpoint 管理器漏洞可导致远程攻击者泄露任意数据  
 代码卫士   2026-02-12 10:13  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Az5ZsrEic9ot90z9etZLlU7OTaPOdibteeibJMMmbwc29aJlDOmUicibIRoLdcuEQjtHQ2qjVtZBt0M5eVbYoQzlHiaw/640?wx_fmt=gif "")  
    
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
**Ivanti****公司发布 EPM 平台安全更新，修复了可导致未授权访问敏感数据库信息和攻陷用户凭据的两个新漏洞CVE-2026-1603和CVE-2026-1602。**  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
这些安全更新在2024 SU5版本中发布，同时修复了此前在2025年10月披露的11个中危漏洞。CVE-2026-1603的CVSS评分为8.6（高危），是一个认证绕过漏洞，可导致远程未认证攻击者泄露特定的存储凭据数据。无需用户交互，可在未经身份验证的情况下通过网络利用该漏洞。  
  
第二个漏洞CVE-2026-1602的CVSS评分为6.5（中危），和SQL注入缺陷有关。远程认证攻击者可利用该漏洞从数据库读取任意数据，暴露敏感的组织机构信息。该漏洞虽然影响数据的机密性到哪并不影响系统完整性或可用性。  
  
运行 Ivanti Endpoint Manager 2024 SU4 SR1和更早版本的组织机构易受影响。这些漏洞影响核心的身份验证和数据库查询机制，对于管理多个端点的企业环境而言尤为令人担心。  
  
Ivanti 公司已通过 Ivanti 许可系统 (ILS) 发布已修复版本 EPM 2024 SU5。强烈建议管理员立即应用该更新，缓解潜在风险。Ivanti 公司证实称公开披露这些漏洞前并未发现在野利用迹象，这两个漏洞都是通过 Ivanti 公司的负责任披露计划披露的。它们均由与趋势科技的ZDI计划合作披露。Ivanti 公司公开致谢研究员并强调一直与安全社区共同维护产品的完整性。  
  
这些漏洞说明了企业软件安全所面临的挑战，尤其是在处理特权访问和敏感组织机构数据的端点管理解决方案方面更是如此。其中认证绕过漏洞无需提前获得身份验证，可导致攻击者获得对凭据存储的初始访问权限，因此更令人担忧。目前尚不存在与这些漏洞相关的妥协指标。Ivanti 表示并未发现在野利用迹象。不过由于这两个漏洞的技术详情已发布，因此组织机构应尽快部署可用补丁。用户应优先更新至版本2024 SU5 并开展安全审计，确保在打补丁前没有发生未授权访问的情况。  
  
  
 开源  
卫士试用地址：  
https://oss.qianxin.com/#/login  
  
  
 代码卫士试用地址：https://sast.qianxin.com/#/login  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[Ivanti 提醒注意已遭利用的两个 EPMM 漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247525028&idx=2&sn=762ebd580b93c85ca6f361c47033a215&scene=21#wechat_redirect)  
  
  
[Ivanti提醒注意 EPM 中严重的代码执行漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247524630&idx=1&sn=f3a9316989486371722d9656c43f333e&scene=21#wechat_redirect)  
  
  
[Ivanti Workspace Control硬编码密钥漏洞暴露 SQL 凭据](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247523260&idx=2&sn=ea145b27a636bc95e9cf0045e0f89d03&scene=21#wechat_redirect)  
  
  
[Ivanti 修复已用于代码执行攻击中的两个 EPMM 0day 漏洞，与开源库有关](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247523008&idx=1&sn=12a019a9d94970b49208b306f026f931&scene=21#wechat_redirect)  
  
  
[Ivanti 修复 Connect Secure & Policy Secure 中的三个严重漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247522224&idx=1&sn=671c73813c868c4819c48a9b54ab1b8c&scene=21#wechat_redirect)  
  
  
  
  
  
**原文链接**  
  
https://cybersecuritynews.com/multiple-ivanti-endpoint-manager-vulnerability/  
  
  
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
