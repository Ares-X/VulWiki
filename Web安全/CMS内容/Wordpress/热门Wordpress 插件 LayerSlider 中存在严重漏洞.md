---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  热门Wordpress 插件 LayerSlider 中存在严重漏洞   
THN  代码卫士   2024-04-03 16:51  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Az5ZsrEic9ot90z9etZLlU7OTaPOdibteeibJMMmbwc29aJlDOmUicibIRoLdcuEQjtHQ2qjVtZBt0M5eVbYoQzlHiaw/640?wx_fmt=gif "")  
  
   
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
  
**WordPress 插件 LayerSlider 中存在一个严重漏洞，可被滥用于提取数据库中的敏感信息如密码哈希。**  
  
  
该漏洞的编号是CVE-2024-2879，CVSS评分为9.8，为SQL注入漏洞，影响7.9.11至7.10.0版本。该漏洞已在3月27日发布的7.10.1中修复，维护人员提到，“更新包括重要的安全修复方案”。  
  
LaySlider 是一款可视化 web 内容编辑器、图形设计软件和数字化可视化软件，可允许用户为网站创建动画和富内容，该插件“全球拥有数百万名用户”。该漏洞是因为对用户提供参数的逃逸不充分以及缺少 wpdb::prepare()，可导致未认证攻击者附加额外的SQL查询并提取敏感信息。  
  
最初，研究员在 WP-Members Membership插件中发现了未认证的存储型XSS漏洞（CVE-2024-1852，CVSS 7.2），可用于执行任意 JavaScript代码，已在版本3.4.9.3中修复。  
  
该漏洞是因为输入清理和输出逃逸不充分导致的，“未认证攻击者可在页面中注入任意 web 脚本，不管用户何时访问被注入的页面，这些脚本都会执行”。如代码在管理员的浏览会话上下文中执行，则可用于创建恶意用户账户、将站点访客重定向到其它恶意站带你并执行其它攻击。  
  
过去几周来，其它 WordPress 插件中也发现了多个漏洞如 Tutor LMS（CVE-2024-1751，CVSS 8.8）以及Contact Form Entries（CVE-2024-2030，CVSS 6.4），它们分别可被用于泄露信息和注入任意 web 脚本。  
  
  
  
  
代码卫士试用地址：  
https://codesafe.qianxin.com  
  
开源卫士试用地址：https://oss.qianxin.com  
  
  
  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[热门 WordPress 插件 Ultimate Member 中存在严重漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247518957&idx=1&sn=8d096042c0c0ab672b2763c4be529085&chksm=ea94bb87dde332919301d11f7a8c23002f628ae325511713f594d8afae88da1d90d44818421f&scene=21#wechat_redirect)  
  
  
[WordPress 插件 LiteSpeed 漏洞影响500万个站点](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247518947&idx=3&sn=a79e0235f3e78c2f4980247b4e0a365d&chksm=ea94bb89dde3329f127d8c01ddbfd59e454133a12f03962b70d34129434f08d38529852aa820&scene=21#wechat_redirect)  
  
  
[备份插件存在严重RCE漏洞，可导致WordPress网站遭接管](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247518349&idx=2&sn=da5a15622c08723ed8cacf81f9a2dd55&chksm=ea94b9e7dde330f1ebb50e99491cbc925e6e932730363f189179878a4dc2b3a4ccb480badb86&scene=21#wechat_redirect)  
  
  
[黑客利用WordPress 插件中的提权0day攻陷网站](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247516908&idx=1&sn=3861a45ade1fc801daa3c767fef3f318&chksm=ea94b386dde33a90582ec8599b01780524bb88c9f1a2cd4cfd9874889611594313e5443e60b1&scene=21#wechat_redirect)  
  
  
[WordPress 紧急修复影响数百万网站 Jetpack 插件中的严重漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247516649&idx=5&sn=3a673400f9a00b2b334fadfda1b0a8a9&chksm=ea94b083dde33995e9079edc64941b6bda561e4fbb1c4406e76ffcfb5423d723243494cbb5af&scene=21#wechat_redirect)  
  
  
  
  
**原文链接**  
  
  
https://thehackernews.com/2024/04/critical-security-flaw-found-in-popular.html  
  
  
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
