---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  WordPress 热门插件中存在漏洞，200多万网站受影响   
Ravie Lakshmanan  代码卫士   2023-05-08 17:48  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Az5ZsrEic9ot90z9etZLlU7OTaPOdibteeibJMMmbwc29aJlDOmUicibIRoLdcuEQjtHQ2qjVtZBt0M5eVbYoQzlHiaw/640?wx_fmt=gif "")  
  
   
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
****  
**WordPress 热门插件 Advanced Custom Fields 中存在一个漏洞，用户需升级至版本 6.1.6。该漏洞的编号是CVE-2023-30777。**  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/oBANLWYScMSwbGPtlJbNlhhxNDQwWAQF8Rr9IzTshMvDYREFiafcDIoVPIOUCdiaiceZYVEHya0V2ib4EdM5xR48ibQ/640?wx_fmt=gif "")  
  
![](https://mmbiz.qpic.cn/mmbiz_png/oBANLWYScMSwbGPtlJbNlhhxNDQwWAQFgUkwoZPXNaEQTwqQlyzwibPqFB7HcPIvL64zbq23IKnrbFe4WufJiakQ/640?wx_fmt=png "")  
  
  
  
该漏洞是反射型XSS，可滥用于将任意可执行文件脚本注入非恶意网站。该插件同时拥有免费和专业版本，安装量超过200万次。2023年5月，插件维护人员收到漏洞通知。  
  
研究员 Rafie Muhammad 指出，“该漏洞可导致任何未认证用户窃取敏感信息，通过诱骗权限用户访问构造的 URL 路径实现提权。”反射型XSS一般是在受害者被诱骗访问恶意链接，从而导致恶意代码被发送给易受攻击的网站，将攻击反射回用户浏览器时发生的。  
  
其中的社工因素意味着 反射型 XSS 的触及范围和影响范围和存储型 XSS 不同，后者可导致攻击者将恶意链接分发给尽可能多的攻击者。  
  
Imperva 提到，“反射型 XSS 通常是因为进站请求未被充分清理而造成的，可导致 web 应用的函数遭操纵和恶意脚本提权。”值得注意的是，CVE-2023-30777 可被提升至默认安装或者该插件的配置中，尽管只有访问权限的登录用户才可能做到。  
  
Craft CMS 此前不久修复了两个中危 XSS 缺陷（CVE-2023-30177和CVE-2023-31144），它们可被用于提供恶意 payload。另外，cPanel 中前不久也被指存在一个 XSS 漏洞CVE-2023-29489，攻击者无需认证即可利用它们执行任意 JavaScript。  
  
Assetnote 公司的研究员 Shubham Shah 指出，“攻击者不仅能够攻击 cPanel 的管理端口，还能够攻击在端口80和443上运行的应用程序。一旦以 cPanel 认证用户的身份行事，通常就能够轻易上传 web shell 并获得命令执行权限。”****  
  
****  
  
![](https://mmbiz.qpic.cn/mmbiz_png/oBANLWYScMQZeSribxs2yU1w56EMvgX9cDBCiabniazxdxtQ25cBCAd5vBJIM2sOv1khjzwwViaT0pS74U6piaiauiaGA/640?wx_fmt=png "")  
  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/oBANLWYScMTBzmfDJA6rWkgzD5KIKNibpR0szmPaeuu4BibnJiaQzxBpaRMwb8icKTeZVEuWREJwacZm3wElt7vOtQ/640?wx_fmt=jpeg "")  
  
****  
代码卫士试用地址：  
https://codesafe.qianxin.com  
  
开源卫士试用地址：https://oss.qianxin.com  
  
  
  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247511052&idx=3&sn=fb116392e405ae62e6c339117fffdb59&chksm=ea949d66dde31470758b6ee8f9dbecdb67ef6c0c8af277f26b83b60dbac95748d28db787a4b4&scene=21#wechat_redirect)  
[奇安信入选全球《软件成分分析全景图》代表厂商](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247515374&idx=1&sn=8b491039bc40f1e5d4e1b29d8c95f9e7&chksm=ea948d84dde30492f8a6c9953f69dbed1f483b6bc9b4480cab641fbc69459d46bab41cdc4859&scene=21#wechat_redirect)  
  
  
[PHP Everywhere 插件中存在严重RCE，影响数千个 WordPress 站点](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247510489&idx=3&sn=e7dbd1c73e937e2dbf783f1afa6342e0&chksm=ea9498b3dde311a55ff3cf2243b100fde04a60f7793ad2161b221fe028886010921f3971eb0c&scene=21#wechat_redirect)  
  
  
[黑客在数十个 WordPress 插件和主题中插入秘密后门，可发动供应链攻击](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247510263&idx=1&sn=de29839373754b8dbcb3ea4b4bc99067&chksm=ea94999ddde3108b0692e93d7baf65159c5fbebd6a40fe02d124421d7a662caced29c664ccdd&scene=21#wechat_redirect)  
  
  
[30万美元：Zerodium 出3倍价格求 WordPress RCE exploit](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247503350&idx=1&sn=d1db0488f14493a5d2ec0c1914d9cfa0&chksm=ea94fc9cdde3758a74b08333695a4847963a758cbd44718390965663eaf96f3d6ff85b0c2d28&scene=21#wechat_redirect)  
  
  
  
  
**原文链接**  
  
https://thehackernews.com/2023/05/new-vulnerability-in-popular-wordpress.html  
  
  
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
