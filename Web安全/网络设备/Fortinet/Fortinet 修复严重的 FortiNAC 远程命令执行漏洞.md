---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  Fortinet 修复严重的 FortiNAC 远程命令执行漏洞   
Bill Toulas  代码卫士   2023-06-25 17:51  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Az5ZsrEic9ot90z9etZLlU7OTaPOdibteeibJMMmbwc29aJlDOmUicibIRoLdcuEQjtHQ2qjVtZBt0M5eVbYoQzlHiaw/640?wx_fmt=gif "")  
  
   
聚焦源代码安全，网罗国内外最新资讯！****  
  
**编译：代码卫士**  
  
**Fortinet 公司更新零信任访问解决方案 FortiNAC，修复可被用于执行代码和命令的严重漏洞CVE-2023-33299。**  
  
  
![](https://mmbiz.qpic.cn/mmbiz_png/oBANLWYScMRhKmAekLpadfATw9IOQlnwiabZmyr8o4VibLCoT9KKafiaAaiaic9Ov84R8zsHVGCK2AtfjDoqHl41XaA/640?wx_fmt=png "")  
  
  
FortiNAC 可使组织机构管理网络访问策略、获得对设备和用户的可见性并保护网络免受越权访问和威胁。该漏洞的严重性评分是9.6，是一个不可信数据反序列化漏洞，可导致无需认证下的远程代码执行后果。  
  
受该漏洞影响的产品包括：  
  
- FortiNAC 9.4.0至9.4.2  
  
- FortiNAC 9.2.0至9.2.7  
  
- FortiNAC 9.1.0至9.1.9  
  
- FortiNAC 7.2.0至7.2.1  
  
- FortiNAC 8.8，所有版本  
  
- FortiNAC 8.7，所有版本  
  
- FortiNAC 8.6，所有版本  
  
- FortiNAC 8.5，所有版本  
  
- FortiNAC 8.3，所有版本  
  
  
  
推荐更新到如下版本：  
  
- FortiNAC 9.4.3 或更高版本  
  
- FortiNAC 9.2.8 或更高版本  
  
- FortiNAC 9.1.10 或更高版本  
  
- FortiNAC 7.2.2 或更高版本  
  
  
  
Fortinet 并未提供任何缓解措施，因此建议应用可用的安全更新。该漏洞是由 Code White 公司的研究员 Florian Hauser 发现的。  
  
除了该严重的RCE漏洞外，Fortinet 还修复了一个中危漏洞CVE-2023-33300，它是一个访问控制不当漏洞，影响 FortiNAC 9.4.0至9.4.3以及 FortiNAC 7.2.0至 7.2.1版本。该漏洞评分更低的原因在于，具有足够高权限的攻击者可本地利用该漏洞访问复制的数据。  
  
  
![](https://mmbiz.qpic.cn/mmbiz_png/oBANLWYScMRhKmAekLpadfATw9IOQlnwiabZmyr8o4VibLCoT9KKafiaAaiaic9Ov84R8zsHVGCK2AtfjDoqHl41XaA/640?wx_fmt=png "")  
  
**马上更新**  
  
  
  
  
  
鉴于网络上的访问和控制级别，Fortinet 产品一直备受黑客追捧。在过去的几年中，Fortinet 设备成为多个威胁行动者的目标，他们通过 0day 利用和攻击未修复设备而攻陷组织机构。  
  
例如，影响 FortiNAC 的严重RCE漏洞CVE-2022-39952在2月中旬收到修复方案，但黑客在PoC 代码发布的几天后就开始实施利用。1月份，Fortinet 公司提醒称，威胁行动者利用 FortiOS SSL-VPN 中的一个漏洞（CVE-2022-42475）在修复方案发布前攻击政府组织机构。去年10月份，该公司督促客户修复设备中的一个严重认证绕过漏洞，该漏洞编号为CVE-2022-40684，位于 FortiOS、FortiProxy和FortiSwitchManager 中，当时攻击者已开始利用该漏洞。  
  
  
  
****  
代码卫士试用地址：  
https://codesafe.qianxin.com  
  
开源卫士试用地址：https://oss.qianxin.com  
  
  
  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[奇安信入选全球《静态应用安全测试全景图》代表厂商](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247516678&idx=1&sn=5b9e480c386161b1e105f9818b2a5a3d&chksm=ea94b36cdde33a7a05cafa9918733669252a02611c222b02bc6e66cbb508ee3fbf748453ee7a&scene=21#wechat_redirect)  
  
  
[奇安信入选全球《软件成分分析全景图》代表厂商](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247515374&idx=1&sn=8b491039bc40f1e5d4e1b29d8c95f9e7&chksm=ea948d84dde30492f8a6c9953f69dbed1f483b6bc9b4480cab641fbc69459d46bab41cdc4859&scene=21#wechat_redirect)  
  
  
[Fortinet 修复 Fortigate SSL-VPN 设备中严重的 RCE 漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247516712&idx=1&sn=db056d3f152e8f52867cc5021679e6f1&chksm=ea94b342dde33a543f8d7daaae604ffb6f0a65f865bf3fd926dfee86ad48be7d6460b9107d7d&scene=21#wechat_redirect)  
  
  
[Fortinet 修复FortiADC 和 FortiOS 中的多个高危漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247516406&idx=3&sn=f6d52c7913cb9a7127079a424f287d22&chksm=ea94b19cdde3388a41d9382c14e8649d4db7f27382de8b638a8c2430d9fb7a6e3125a60ceed6&scene=21#wechat_redirect)  
  
  
[Fortinet 修复数据分析解决方案中的严重漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247516234&idx=2&sn=8b8cbd3bbef796e7781c52396c37618f&chksm=ea94b120dde33836274567a92fa01a00f6e40b1b29565d989648c9eeada3ac326405a7a9e7d9&scene=21#wechat_redirect)  
  
  
[Fortinet FortiOS漏洞被用于攻击政府实体](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247515912&idx=1&sn=0d48724c08d4d63949a7142683b6fdd7&chksm=ea948e62dde30774b504e3a089bab575daf337854bba663d40f81014b5672260b74230a007a3&scene=21#wechat_redirect)  
  
  
[Fortinet：注意这个严重的未认证RCE漏洞！](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247515862&idx=1&sn=d2ef6b5ab51eba3e97af531d1a8b212b&chksm=ea948fbcdde306aa2d71b31b492175fc0c01a69233601e35fc9fee73fbfbae62668f3aaaffb2&scene=21#wechat_redirect)  
  
  
  
  
**原文链接**  
  
  
https://www.bleepingcomputer.com/news/security/fortinet-fixes-critical-fortinac-remote-command-execution-flaw/  
  
  
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
