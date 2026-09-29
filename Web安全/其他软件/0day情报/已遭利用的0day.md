---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  苹果紧急修复已遭利用的0day漏洞   
Ryan Naraine  代码卫士   2025-03-12 17:46  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Az5ZsrEic9ot90z9etZLlU7OTaPOdibteeibJMMmbwc29aJlDOmUicibIRoLdcuEQjtHQ2qjVtZBt0M5eVbYoQzlHiaw/640?wx_fmt=gif "")  
  
   
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
**苹果发布 iOS 18.3.2和iPad 18.3.2，紧急修复在该移动操作系统老旧版本上被利用的 WebKit 0day 漏洞CVE-2025-24201。**  
  
  
  
  
  
  
  
该漏洞可导致攻击者突破 Web Content 沙箱，而苹果公司表示，该漏洞“可能已被用于极其复杂的攻击中，针对的受害者是使用早于 iOS 17.2的iOS 版本的用户”。该公司在安全公告中提到，“这是针对 iOS 17.2中被拦截的攻击的补充修复方案。为保护客户安全，苹果不会在调查之前且补丁可用之前，霹雳、讨论或确认安全问题。”  
  
苹果表示CVE-2025-24201是一个界外写漏洞，已通过改进检查阻止未授权操作的方式修复。iOS 18.3.2是在苹果修复另外一个漏洞后发布的，该漏洞可导致对被锁iPhone 或 iPad 具有物理访问权限的攻击者禁用“USB 受限制模式”，而该模式是一个关键的防护机制。苹果当时提到该漏洞可导致“针对特定个体的极其复杂的攻击”。该漏洞由公民实验室的研究员 Bill Marczak 发现，这说明该利用用于国家级别的监控。  
  
USB 受限制模式是一个安全特性，当设备被锁的时间超过1小时候，可通过 iPhone 或 iPad 的Lightning/USB-C 端口拦截数据访问，目的是阻止通过USB连接的入侵工具以破解设备密码或提取数据。  
  
  
代码卫士试用地址：  
https://codesafe.qianxin.com  
  
开源卫士试用地址：https://oss.qianxin.com  
  
  
  
  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[苹果紧急修复被用于“极其复杂”攻击中的0day漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247522200&idx=2&sn=a8084137286ce6cbebda935ab8c0d5c2&scene=21#wechat_redirect)  
  
  
[苹果紧急修复已遭利用的两个0day](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247521533&idx=1&sn=1ab7c5da3e583e48ee67d6f50fd4d97e&scene=21#wechat_redirect)  
  
  
[苹果紧急修复已遭利用的两个新 iOS 0day漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247519003&idx=1&sn=87b2f80deede9f2cb8e1092e9732820f&scene=21#wechat_redirect)  
  
  
[苹果修复2024年遭利用的第1个0day漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247518729&idx=1&sn=022dec20b1d19ed71466fd78c5c9b7c1&scene=21#wechat_redirect)  
  
  
[苹果紧急修复两个 iOS 0day漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247518251&idx=1&sn=b501407684b48f59fb89d2d77570a27c&scene=21#wechat_redirect)  
  
  
  
  
  
**原文链接**  
  
https://www.securityweek.com/apple-ships-ios-18-3-2-to-fix-already-exploited-webkit-flaw/  
  
  
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
