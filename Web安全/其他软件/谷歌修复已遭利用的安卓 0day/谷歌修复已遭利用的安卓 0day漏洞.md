---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  谷歌修复已遭利用的安卓 0day漏洞   
THN  代码卫士   2023-09-07 17:46  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Az5ZsrEic9ot90z9etZLlU7OTaPOdibteeibJMMmbwc29aJlDOmUicibIRoLdcuEQjtHQ2qjVtZBt0M5eVbYoQzlHiaw/640?wx_fmt=gif "")  
  
   
聚焦源代码安全，网罗国内外最新资讯！****  
  
**编译：代码卫士**  
  
**谷歌在本月安卓安全更新中修复了多个漏洞，其中一个已遭活跃利用。该漏洞的编号是CVE-2023-35674，是影响Android Framework的权限提升漏洞。**  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/oBANLWYScMQvSibuTaiaLnW6OUdHYEmuiaoUk6vJJbicmfLSKUaeXdlxQuYn1fJO6hO9UcmNia7ZFMbWqMVJbtHPDtw/640?wx_fmt=gif "")  
  
  
谷歌在安卓安全通告中提到，“有线索表明 CVE-2023-35674可能已遭有限的、针对性利用。”该更新还修复了位于 Framework 中的其它三个提权漏洞，其中一个最重要的漏洞“在无需其它额外执行权限的情况下，实现本地提权”。  
  
谷歌表示还修复了位于 System 组件中的一个严重漏洞，无需任何受害者交互，即可实现远程代码执行后果。该公司指出，“严重性评估基于漏洞利用对受影响设备造成的可能影响，并假设平台和服务缓解措施已关闭以利于开发或者已遭成功绕过。”  
  
谷歌本次修复了 System 组件中的14个漏洞，以及MediaProvider 组件中的两个漏洞，后者将在 Google Play 系统更新时推出。  
  
  
代码卫士试用地址：  
https://codesafe.qianxin.com  
  
开源卫士试用地址：https://oss.qianxin.com  
  
  
  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[谷歌发布2022年在野利用0day年度回顾报告](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247517276&idx=1&sn=4af5856a408590c04f66b8cf7944909b&chksm=ea94b536dde33c20a349d0ce168088e20f1710c32321c5af387665d68fc566998f5763f5cf27&scene=21#wechat_redirect)  
  
  
[苹果员工在CTF大赛发现谷歌0day秘而不报 $10000赏金由他人获得](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247517155&idx=1&sn=9af2d4f8742d395b46b7d44e219d9b05&chksm=ea94b289dde33b9f559073d1207e8437f82e8b6acf046825ee7f690fcbe59f72977119ba7dae&scene=21#wechat_redirect)  
  
  
[谷歌推出新的安全试点计划，禁止员工访问互联网](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247517117&idx=2&sn=9648af1e020ddfe5352233463d1fb931&chksm=ea94b2d7dde33bc1487cfce641344cff8e95ae23edb203565f40f28f00d6daaefc02dd8d89b6&scene=21#wechat_redirect)  
  
  
[谷歌警示自家员工：别使用Bard 生成的代码](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247516769&idx=2&sn=4714ae37829a0d86ecc67fac45cde3fa&chksm=ea94b30bdde33a1dfa036205c64ef8ce7aa81a5958ce4c9fce8ec8a15cba40097e098fd45644&scene=21#wechat_redirect)  
  
  
[谷歌为 Chrome 沙箱逃逸利用链提供三倍赏金](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247516649&idx=1&sn=4e785a24db31c0a5ba6444f993a7c15e&chksm=ea94b083dde339956da54b6ff9b4036c037a976bad07e12c44d2db445eef51db0ed4c00ef820&scene=21#wechat_redirect)  
  
  
  
  
**原文链接**  
  
https://thehackernews.com/2023/09/zero-day-alert-latest-android-patch.html  
  
  
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
  
   
觉得不错，就点个 “  
在看  
” 或 "  
赞  
” 吧~  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
