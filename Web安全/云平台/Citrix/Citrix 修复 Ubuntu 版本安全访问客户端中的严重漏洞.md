---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  Citrix 修复 Ubuntu 版本安全访问客户端中的严重漏洞   
Ionut Arghire  代码卫士   2023-07-13 18:22  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Az5ZsrEic9ot90z9etZLlU7OTaPOdibteeibJMMmbwc29aJlDOmUicibIRoLdcuEQjtHQ2qjVtZBt0M5eVbYoQzlHiaw/640?wx_fmt=gif "")  
  
   
聚焦源代码安全，网罗国内外最新资讯！****  
  
**编译：代码卫士**  
  
**本周二，Citrix 修复了Utuntu 版本 Secure Access 客户端中的一个严重漏洞，可被用于实现远程代码执行。不过，按照 Citrix 在安全公告中的说法，该漏洞（CVE-2023-24492，CVSS评分9.6）需要用户交互才能被利用。**  
  
NIST 发布安全公告指出，“Citrix Secure Acess for Ubuntu 中存在一个漏洞，如遭利用，则只需受害者用户打开由攻击者构造的链接并接受进一步的提示，就可远程利用代码。”  
  
虽然 Citrix 公司并未提供任何技术详情，但表示适用于 Ubuntu 版本的 Secure Access 客户端版本23.5.2中已修复该漏洞。  
  
本周二，Citrix 还修复了位于Windows 版本 Secure Access 客户端中的一个高危提权漏洞CVE-2023-24491（CVSS评分7.8）。攻击者如能以标准用户账户访问端点以及拥有一个易受攻击客户端，则可提权至 NT Authority\System。  
  
该漏洞已在Windows 版本23.5.1.3中修复。  
  
这两个漏洞都是由 F2TC Cyber Security 公司的研究员 Rilke Petrosky 发现并报告的。  
  
建议客户尽快升级版本，如通过 ADC 或 Gateway 的SSL VPN 更新控制性能更新进行发行，则 Citrix ADC 或 Gateway 上的易受攻击客户端。然而，Citrix 还发布独立的 Secure Access 客户端，客户可直接在用户设备上安装或更新已修复版本。  
  
Citrix 并未提到这些漏洞是否遭利用，但未修复 Citrix 产品遭恶意攻击并不少见。Citrix 还在安全通告页面上发布了更多详情。  
  
  
  
代码卫士试用地址：  
https://codesafe.qianxin.com  
  
开源卫士试用地址：https://oss.qianxin.com  
  
  
  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[奇安信入选全球《静态应用安全测试全景图》代表厂商](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247516678&idx=1&sn=5b9e480c386161b1e105f9818b2a5a3d&chksm=ea94b36cdde33a7a05cafa9918733669252a02611c222b02bc6e66cbb508ee3fbf748453ee7a&scene=21#wechat_redirect)  
  
  
[奇安信入选全球《软件成分分析全景图》代表厂商](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247515374&idx=1&sn=8b491039bc40f1e5d4e1b29d8c95f9e7&chksm=ea948d84dde30492f8a6c9953f69dbed1f483b6bc9b4480cab641fbc69459d46bab41cdc4859&scene=21#wechat_redirect)  
  
  
[Citrix 修复Workspace等多款产品中的多个严重漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247515606&idx=2&sn=18cf93cc69f16acc4087555f4f6efc3b&chksm=ea948cbcdde305aa6e54f5a260a008d69843d1fa2765f9b2c2fa70422bc8acb78ee6cbd09553&scene=21#wechat_redirect)  
  
  
[Citrix修复位于Gateway 和 ADC 中的严重漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247514449&idx=1&sn=922716384658e8c52f01a153b1ac8251&chksm=ea94883bdde3012d2ef7c94a1e49690e115082526d0b6bbe2573cce3c6e36bac47b0042b499f&scene=21#wechat_redirect)  
  
  
[攻击者滥用 Citrix NetScaler 设备 0day，发动DDoS放大攻击](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247499753&idx=3&sn=b3738632743f3cb88b1e3207dd79945a&chksm=ea94ce83dde34795a6a6e68ee1c28bec29c9d9667d6fb4e9496513b3043fa3de2bb0ad5b8d11&scene=21#wechat_redirect)  
  
  
[Citrix SD-WAN 被曝远程代码执行漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247497384&idx=2&sn=d6ffb4f56b975bcbe114c00805f7f50a&chksm=ea94c7c2dde34ed412f2ac59c4c28c9e2eec416852e31f888d7df9b3b1004a5f9da7f2bf7043&scene=21#wechat_redirect)  
  
  
  
  
**原文链接**  
  
https://www.securityweek.com/citrix-patches-critical-vulnerability-in-secure-access-client-for-ubuntu/  
  
  
题图：Pixabay License  
  
  
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
