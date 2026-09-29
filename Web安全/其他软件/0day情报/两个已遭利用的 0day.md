---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  苹果紧急修复两个已遭利用的 0day   
Sergiu Gatlan  代码卫士   2023-09-08 15:15  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Az5ZsrEic9ot90z9etZLlU7OTaPOdibteeibJMMmbwc29aJlDOmUicibIRoLdcuEQjtHQ2qjVtZBt0M5eVbYoQzlHiaw/640?wx_fmt=gif "")  
  
   
聚焦源代码安全，网罗国内外最新资讯！****  
  
**编译：代码卫士**  
  
**苹果紧急修复两个已遭利用的攻击 iPhone 和 Mac 用户的 0day（CVE-2023-41064和CVE-2023-41061），使苹果自今年以来修复的13个0day漏洞数量上升至13个。**  
  
![](https://mmbiz.qpic.cn/mmbiz_png/oBANLWYScMT8XqYSWgGfB0E0gKI28A7KVVkIrxmrWeMBgmRTK34icOp1yGQlKZfrjJ46H3uHic8daLPLtR5O5DRg/640?wx_fmt=png "")  
  
  
苹果在安全公告中指出，“苹果发现该问题可能已遭利用。”这些漏洞位于 Image I/O 和 Wallet 框架中。其中CVE-2023-41064由公民实验室发现，而CVE-2023-41061由苹果公司发现。  
  
公民实验室发现这两个漏洞是零点击 iMessage 利用链 BLASTPASS 的一部分，该利用链用于将 NSO 集团的 Pegasus 商用间谍软件通过包括恶意镜像的 PassKit 附件安装到完全修复的 iPhone 设备（运行 iOS 16.6）。  
  
CVE-2023-41064是一个缓冲溢出漏洞，在处理恶意构造的镜像时会被触发，可导致在未修复设备上执行任意代码。CVE-2023-41061是一个验证漏洞，也可被通过恶意附件利用，获得在目标设备上执行任意代码的权限。  
  
苹果公司已在 macOS Ventura 13.5.2、iOS 16.6.1、iPad 16.6.1和 watchOS 9.6.2 通过改进逻辑和内存处理方式修复了这两个 0day。受影响设备非常多，老旧和新设备均受影响，包括：  
  
- iPhone 8及后续版本  
  
- iPad Pro   
（所有机型）、iPad Air第3代及后续版本、 iPad 第5代及后续版本以及 iPad mini第5代及后续版本  
  
  
  
- 运行macOS Ventura的Mac机器  
  
- Apple Watch Series 4 及后续版本  
  
  
  
  
![](https://mmbiz.qpic.cn/mmbiz_png/oBANLWYScMT8XqYSWgGfB0E0gKI28A7KNcE9X9s9TXiaFcqmxyNa4icpX1ibRSy7lU0SNLqHYqKPgb0eYV3ZVCibMQ/640?wx_fmt=png "")  
  
**今年修复13个已遭利用的0day**  
  
  
  
自今年年初开始，苹果已经修复了针对运行 iOS、macOS、iPadOS 和 watchOS 的已遭利用的13个0day漏洞。  
  
两个月之前即7月份，苹果推出带外快速安全响应 (RSR) 更新，修复了影响已打补丁的 iPhone、Mac 和 iPad 的漏洞CVE-2023-37450。之后苹果证实称，RSR 更新破坏了已修复设备上的 web 浏览并在两天后发布了新的已修复版本。  
  
苹果此前修复的已遭利用0day 包括：  
  
- 7月份修复两个0day（CVE-2023-37450 和CVE-2023-38606）  
  
- 6月份修复3个0day（CVE-2023-32434、CVE-2023-32435和 CVE-2023-32439）  
  
- 5月份修复3个0day（CVE-2023-32409、CVE-2023-28204和 CVE-2023-32373）  
  
- 4月份修复2个0day（CVE-2023-28206 和 CVE-2023-28205）  
  
- 2月份修复1个 WebKit 0day (CVE-2023-23529)  
  
  
  
  
代码卫士试用地址：  
https://codesafe.qianxin.com  
  
开源卫士试用地址：https://oss.qianxin.com  
  
  
  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[新Windows?! 苹果再修复已遭利用的新0day](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247517225&idx=2&sn=cfa4e9c7c012a88ff6a1ca8ada75564c&chksm=ea94b543dde33c556be2fcb984ebb556ca8d5f6654c7938d9996636b045518ace000eb82f2b6&scene=21#wechat_redirect)  
  
  
[苹果员工在CTF大赛发现谷歌0day秘而不报 $10000赏金由他人获得](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247517155&idx=1&sn=9af2d4f8742d395b46b7d44e219d9b05&chksm=ea94b289dde33b9f559073d1207e8437f82e8b6acf046825ee7f690fcbe59f72977119ba7dae&scene=21#wechat_redirect)  
  
  
[苹果紧急修复已遭利用的 0day](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247516996&idx=1&sn=99077b8f872c126bf4abbae8c76123fc&chksm=ea94b22edde33b3872fa9d5e8336be03c61f1dbca04bd5821d460d5e0fcd1915fb4c2e9163a3&scene=21#wechat_redirect)  
  
  
[苹果紧急修复两个已遭利用的 0day，影响 iPhone 和 Mac设备](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247516192&idx=2&sn=5c3e3733fceb0ec8d172ac2df805b47d&chksm=ea94b14adde3385c3f37236533daf5e7d38ba6c37d81d396c80446e2d37a13b2fd254a3b2904&scene=21#wechat_redirect)  
  
  
  
  
**原文链接**  
  
https://www.bleepingcomputer.com/news/apple/apple-discloses-2-new-zero-days-exploited-to-attack-iphones-macs/  
  
  
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
