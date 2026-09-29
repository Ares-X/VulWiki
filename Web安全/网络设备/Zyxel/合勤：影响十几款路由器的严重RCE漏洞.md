---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  合勤：注意影响十几款路由器的严重RCE漏洞  
Sergiu Gatlan
                    Sergiu Gatlan  代码卫士   2026-02-26 11:57  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Az5ZsrEic9ot90z9etZLlU7OTaPOdibteeibJMMmbwc29aJlDOmUicibIRoLdcuEQjtHQ2qjVtZBt0M5eVbYoQzlHiaw/640?wx_fmt=gif "")  
    
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
**合勤发布安全更新，修复了影响十几款路由器机型的一个严重漏洞CVE-2025-13942，可导致未认证攻击者在未修复设备上获得远程命令执行权限。**  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
该漏洞是命令注入漏洞，位于合勤4G LTE/5G NR CPE、DSL/Ethernet CPE、Fiber ONTs和无线扩展器的 UPnP 函数中的命令注入漏洞。未经身份验证的远程攻击者可利用该漏洞，通过恶意构造的 UpnP SOAP 请求在受影响设备上执行操作系统命令。  
  
不过，该漏洞利用攻击可能要比其严重性评分所体现的影响有限，因为成功利用该漏洞要求攻击者启用 UpnP 和 WAN 访问权限，而WAN 访问权限默认为禁用状态。合勤公司表示，“需要注意的是，这些设备上的 WAN 访问权限默认禁用，而只有当同时启用 WAN 访问权限和易受攻击 UpnP 函数的情况下才能远程执行该攻击。强烈建议用户安装补丁，维持最优防护方案。”  
  
合勤公司还修复了两个高危的认证后命令注入漏洞CVE-2025-13943和CVE-2026-1459，它们可导致攻击者使用受陷凭据执行OS命令。Shadowserver 平台目前发现近12万台暴露在互联网的合勤设备，其中包括超过7.6万台路由器。由于合勤设备被全球很多互联网服务提供商默认为激活新互联网服务合同的开箱即用设备，因此常常遭攻击。  
  
美国网络安全和基础设施安全局 (CISA) 目前正在追踪影响合勤路由器、防火墙和NAS设备的已遭或仍遭在野活跃利用的12个漏洞。本月早些时候，合勤公司提醒称不打算修复正遭活跃利用、影响仍在线销售且已达生命周期的两个 0day 漏洞CVE-2024-40891和CVE-2026-0890，并表示“强烈”建议客户替换为固件已打补丁的新路由器。合勤公司表示，“VMG1312-B10A、VMG1312-B10B、VMG1312-B10E、VMG3312-B10A、VMG3313-B10A、VMG3926-B10B、VMG4325-B10A、VMG4380-B10A、VMG8324-B10A、VMG8924-B10A、SBG3300和SBG3500都是多年前已达生命周期的遗留产品。因此，我们强烈建议用户替换为新一代产品，获得最优防护措施。”  
  
合勤公司声称其网络产品的客户遍布150个国家的100多万家企业。  
  
  
 开源  
卫士试用地址：  
https://oss.qianxin.com/#/login  
  
  
 代码卫士试用地址：https://sast.qianxin.com/#/login  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[合勤不打算修复已达生命周期路由器中的已遭利用漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247522190&idx=1&sn=40eea5abf5bc17c52eb2a437e540b55f&scene=21#wechat_redirect)  
  
  
[合勤提醒注意路由器中的严重OS命令注入漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247520668&idx=2&sn=a47864fc0328391d921ce4629b3bac8b&scene=21#wechat_redirect)  
  
  
[合勤紧急修复NAS设备中的RCE漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247519665&idx=1&sn=16f68838d4899ea09b8df2f5f96357ab&scene=21#wechat_redirect)  
  
  
[合勤科技修复防火墙产品中的远程代码执行漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247518947&idx=2&sn=8758a5f5ef83a075fb61fbed63159da1&scene=21#wechat_redirect)  
  
  
[合勤提醒注意 NAS 设备中的多个严重漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247518251&idx=2&sn=e34aa255b21da7352d4cee7ee282c3a2&scene=21#wechat_redirect)  
  
  
  
  
  
**原文链接**  
  
https://www.bleepingcomputer.com/news/security/zyxel-warns-of-critical-rce-flaw-affecting-over-a-dozen-routers/  
  
  
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
