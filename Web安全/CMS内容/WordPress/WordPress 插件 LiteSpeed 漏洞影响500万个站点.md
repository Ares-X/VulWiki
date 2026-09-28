---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  WordPress 插件 LiteSpeed 漏洞影响500万个站点   
THN  代码卫士   2024-02-28 18:01  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Az5ZsrEic9ot90z9etZLlU7OTaPOdibteeibJMMmbwc29aJlDOmUicibIRoLdcuEQjtHQ2qjVtZBt0M5eVbYoQzlHiaw/640?wx_fmt=gif "")  
  
   
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
****  
**WordPress 插件 LiteSpeed Cache 中存在一个漏洞，可导致未认证用户提升权限。该漏洞的编号是CVE-2023-40000，已在2023年10月的5.7.0.1版本中修复。**  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/oBANLWYScMQ4zIy76t10f0MIkt8mmz9TMloBuicjvRJIg1jIvBUP28hp9DFvf0j2s85ecuavtLSXwpnyhsxF58A/640?wx_fmt=gif&from=appmsg "")  
  
  
Patchstack 公司的研究员 Rafie Muhammad 表示，“该插件易受未认证的站点存储型XSS漏洞的影响，可导致未认证用户窃取敏感信息，在本案例中这样做的目的是通过执行单个 HTTP 请求提升在 WordPress 网站上的权限。”  
  
LiteSpeed Cache 用于改进站点性能，安装量已超过500万次。该插件的最新版本是6.1，于2024年2月5日发布。  
  
研究人员指出，该漏洞是因为缺少用户输入清理和逃逸输出造成的，根因在于名为 “update_cdn_status()” 的函数且可在默认安装程序中复现。Muhammad 表示，“由于XSS payload 被作为管理员通告，而该通告可在任何 wp-admin端点上展示，因此该漏洞也可由能够访问 wp-admin 区域的任何用户轻松触发。”  
  
四个月之前，Wordfence 披露了位于该插件中的另外一个XSS漏洞（CVE-2023-4372，CVSS评分6.4），已在5.7版本中修复。具有贡献者级别和更高权限的认证攻击者能够将任意 web 脚本注入页面中，每当用户访问被注入的页面时就会执行这些脚本。  
  
  
  
  
代码卫士试用地址：  
https://codesafe.qianxin.com  
  
开源卫士试用地址：https://oss.qianxin.com  
  
  
  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[备份插件存在严重RCE漏洞，可导致WordPress网站遭接管](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247518349&idx=2&sn=da5a15622c08723ed8cacf81f9a2dd55&chksm=ea94b9e7dde330f1ebb50e99491cbc925e6e932730363f189179878a4dc2b3a4ccb480badb86&scene=21#wechat_redirect)  
  
  
[黑客利用WordPress 插件中的提权0day攻陷网站](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247516908&idx=1&sn=3861a45ade1fc801daa3c767fef3f318&chksm=ea94b386dde33a90582ec8599b01780524bb88c9f1a2cd4cfd9874889611594313e5443e60b1&scene=21#wechat_redirect)  
  
  
[WordPress 紧急修复影响数百万网站 Jetpack 插件中的严重漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247516649&idx=5&sn=3a673400f9a00b2b334fadfda1b0a8a9&chksm=ea94b083dde33995e9079edc64941b6bda561e4fbb1c4406e76ffcfb5423d723243494cbb5af&scene=21#wechat_redirect)  
  
  
[WordPress 热门插件中存在漏洞，200多万网站受影响](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247516420&idx=2&sn=e419c137b012ee8e70e8514f7bf3a2e1&chksm=ea94b06edde339787fa928cc50927bb993d84cb037cf64c8f353c0b7afc9b6064576dddb5f44&scene=21#wechat_redirect)  
  
  
[PHP Everywhere 插件中存在严重RCE，影响数千个 WordPress 站点](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247510489&idx=3&sn=e7dbd1c73e937e2dbf783f1afa6342e0&chksm=ea9498b3dde311a55ff3cf2243b100fde04a60f7793ad2161b221fe028886010921f3971eb0c&scene=21#wechat_redirect)  
  
  
  
  
**原文链接**  
  
https://thehackernews.com/2024/02/wordpress-litespeed-plugin.html  
  
  
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
  
   
觉得不错，就点个 “  
在看  
” 或 "  
赞  
” 吧~  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
