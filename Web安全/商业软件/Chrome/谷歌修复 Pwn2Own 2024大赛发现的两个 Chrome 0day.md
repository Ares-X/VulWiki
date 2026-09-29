---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  谷歌修复 Pwn2Own 2024大赛发现的两个 Chrome 0day   
Sergiu Gatlan  代码卫士   2024-03-28 17:29  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Az5ZsrEic9ot90z9etZLlU7OTaPOdibteeibJMMmbwc29aJlDOmUicibIRoLdcuEQjtHQ2qjVtZBt0M5eVbYoQzlHiaw/640?wx_fmt=gif "")  
  
   
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
**本周二，谷歌修复了 Chrome web浏览器中的7个漏洞，其中两个是在 Pwn2Own 2024温哥华大赛中发现。**  
  
  
第一个0day是 CVE-2024-2887，是位于开放标准 WebAssembly 中的一个高危类型混淆漏洞。Manfred Paul 在大赛第一天演示了这个漏洞，通过构造的HTML页面即可用作双击远程代码执行 (RCE) 利用的一部分，攻击 Chrome 和 Edge浏览器。  
  
第二个0day漏洞是CVE-2024-2886，由 KAIST Hacking Lab的研究员Seunghyun Lee 在 CanSecWest Pwn2Own 大赛第二天利用。它是位于 WebCodecs API 中的一个UAF漏洞，该API 可供 web 应用编码和解码音视频内容，使远程攻击者通过多个构造的 HTML 页面执行任意读/写。Lee 还利用CVE-2024-2886，通过针对Chrome 和 Edge 的单一利用获得远程代码执行权限。  
  
谷歌在 Chrome 稳定渠道版本123.0.6312.86/.87（Windows 和 Mac版本）和123.0.6312.86（Linux 版本）中修复了这两个漏洞。这些新版本将在未来几天内向全球发布。Firefox 也在大赛报送两个0day的同一天修复了它们。****  
  
虽然Mozilla 仅用了一天而谷歌仅用了五天来修复这些漏洞，但厂商通常会在ZDI规定的90天期限内完成修复。1月份，谷歌还修复了Chrome中的一个已遭活跃利用的漏洞 (CVE-2024-0519)，它可导致攻击者访问敏感信息或者导致未修复浏览器崩溃，原因是 Chrome V8 JavaScript 引擎中存在界外内存访问弱点。  
  
Pwn2Own 温哥华大赛在3月22日落下帷幕。大赛共发现29个唯一0day，颁发1132500美元的赏金。Manfred Paul 以202500美元的赏金摘得桂冠，成功攻破苹果Safari、谷歌Chrome 和微软 Edge浏览器。  
  
  
代码卫士试用地址：  
https://codesafe.qianxin.com  
  
开源卫士试用地址：https://oss.qianxin.com  
  
  
  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[Mozilla 修复Pwn2Own大赛发现的两个 Firefox 0day](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247519154&idx=1&sn=3f4209efe9a510274abec479b51dcceb&chksm=ea94bad8dde333cec265a5c93f4ed89b687c3a2301fd4d5045252f76ea8505a6aa3b125f9070&scene=21#wechat_redirect)  
  
  
[Pwn2Own 2024温哥华大赛落幕  Master of Pwn 诞生](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247519143&idx=1&sn=aa2842286dc5aa1063e21f010ec15ad1&chksm=ea94bacddde333db812ea8c9e259e4db299453970f32514ee6a500f954af29886650c4989674&scene=21#wechat_redirect)  
  
  
[首届Pwn2Own 汽车大赛落幕，Master of Pwn 诞生](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247518760&idx=1&sn=6cd42f69e9c80855853ab33b6174315c&chksm=ea94bb42dde33254903f662caac710b4135af49d3a67e8d4b13022bca1218dbb61096abe171a&scene=21#wechat_redirect)  
  
  
[Pwn2Own 2024温哥华大赛目标和奖金公布](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247518705&idx=1&sn=e649874fdf57424ba03ada25dffb2bfe&chksm=ea94b89bdde3318dd2b64edb99c68dcc49c35026d1c9ae2d594ec1601dfb265af9708d1d7fca&scene=21#wechat_redirect)  
  
  
[Pwn2Own 2023多伦多大赛落幕  Master of Pwn诞生](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247518011&idx=1&sn=1a8f0bcb00a1f4a13e7e2432c4bfce08&chksm=ea94b651dde33f47b62dd209a071f424b3df8251f502b70d7dd9e1fb356c3eb5e12da8152737&scene=21#wechat_redirect)  
  
  
  
  
**原文链接**  
  
  
https://www.bleepingcomputer.com/news/security/google-fixes-chrome-zero-days-exploited-at-pwn2own-2024/  
  
  
题图：  
Pexels  
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
