---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  苹果紧急修复两个0day   
Lawrence Abrams  代码卫士   2022-08-18 19:01  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Az5ZsrEic9ot90z9etZLlU7OTaPOdibteeibJMMmbwc29aJlDOmUicibIRoLdcuEQjtHQ2qjVtZBt0M5eVbYoQzlHiaw/640?wx_fmt=gif "")  
  
   
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
****  
苹果修复了其旗舰平台macOS 和 iOS 上的两个已遭利用0day（CVE-2022-32983和CVE-2022-32984）。  
  
  
CVE-2022-32894可导致应用程序或能够以内核权限执行任意代码。CVE-2022-32893位于WebKit中，处理恶意构造的web内容可能导致任意代码执行。苹果通过改进边界检查的方式解决了这两个界外写问题。苹果表示这两个漏洞已遭利用。  
  
补丁已推送到苹果的自动更新机制中（macOS Monterey 12.5.1、iOS 15.6.1和iPadOS 15.6.1）。  
  
苹果并未发布任何利用详情或妥协指标。  
  
同一天，Chrome 也修复了今年以来的第5个0day。  
  
截至目前，0day追踪器已经记录了针对部署广泛的桌面和移动软件产品的在野攻击活动。这些攻击主要攻击苹果、谷歌和微软的有缺陷代码。  
  
  
****  
  
代码卫士试用地址：  
https://codesafe.qianxin.com  
  
开源卫士试用地址：  
https://oss.qianxin.com  
  
  
  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[苹果紧急修复影响 Mac 和 Apple Watch 的 0day](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247511813&idx=1&sn=dc16d2c1c8707eaed97dde4a0dfa7750&chksm=ea949e6fdde31779bfd96864b6be586636189da2c4799ddda06ccf2bb25c009aece718ee55d6&scene=21#wechat_redirect)  
  
  
[苹果决定不修复 Big Sur 和 Catalina 中的这两个0day](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247511275&idx=1&sn=40812772c559716b5642f052b612a1de&chksm=ea949d81dde3149755f8c0700ced40d6b6c2600381fac3950c71030e9e13d1baa743d46bb3cb&scene=21#wechat_redirect)  
  
  
[苹果紧急修复已遭利用的两个0day](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247511203&idx=1&sn=e6aed5ef7c32a23d2e16047e287f674d&chksm=ea949dc9dde314df062345ec8421edfe4b8cc41ff5964893ed929037c452e686aae6f2f0e692&scene=21#wechat_redirect)  
  
  
[苹果修复已遭利用0day，影响 iPhone、iPad 和 Mac](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247510489&idx=2&sn=b35cf29a6914ebcbd7f645599643ff88&chksm=ea9498b3dde311a56a7eb7c75c01e5aaa3e8cf81cd4a4f9348c0c107545f6770b601288f92c4&scene=21#wechat_redirect)  
  
  
[苹果发布 iOS 和 macOS 更新，修复已遭利用0day](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247510367&idx=2&sn=833702c927bb42d4795d804538793963&chksm=ea949835dde31123f9b6b9d3abf958b53881cbeaae9ef82e12d295b7f57ba76309475e8ddd4d&scene=21#wechat_redirect)  
  
  
  
  
**原文链接**  
  
https://www.securityweek.com/apple-patches-new-macos-ios-zero-days  
  
  
题图：  
Pixabay License  
‍  
  
  
  
**本文由奇安信编译，不代表奇安信观点。转载请注明“转自奇安信代码卫士 https://codesafe.qianxin.com”。**  
  
  
  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/oBANLWYScMSf7nNLWrJL6dkJp7RB8Kl4zxU9ibnQjuvo4VoZ5ic9Q91K3WshWzqEybcroVEOQpgYfx1uYgwJhlFQ/640?wx_fmt=jpeg "")  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/oBANLWYScMSN5sfviaCuvYQccJZlrr64sRlvcbdWjDic9mPQ8mBBFDCKP6VibiaNE1kDVuoIOiaIVRoTjSsSftGC8gw/640?wx_fmt=jpeg "")  
  
**奇安信代码卫士 (codesafe)**  
  
国内首个专注于软件开发安全的产品线。  
  
   ![](https://mmbiz.qpic.cn/mmbiz_gif/oBANLWYScMQ5iciaeKS21icDIWSVd0M9zEhicFK0rbCJOrgpc09iaH6nvqvsIdckDfxH2K4tu9CvPJgSf7XhGHJwVyQ/640?wx_fmt=gif "")  
  
   
觉得不错，就点个 “  
在看  
” 或 "  
赞  
” 吧~  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
