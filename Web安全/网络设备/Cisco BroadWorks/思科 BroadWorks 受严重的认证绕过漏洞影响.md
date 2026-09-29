---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  思科 BroadWorks 受严重的认证绕过漏洞影响   
Bill Toulas  代码卫士   2023-09-08 15:15  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Az5ZsrEic9ot90z9etZLlU7OTaPOdibteeibJMMmbwc29aJlDOmUicibIRoLdcuEQjtHQ2qjVtZBt0M5eVbYoQzlHiaw/640?wx_fmt=gif "")  
  
   
聚焦源代码安全，网罗国内外最新资讯！****  
  
**编译：代码卫士**  
  
**思科BroadWorks Application Delivery Plaftform 和BroadWorks Xtended Services Platform 受一个严重漏洞 （CVE-2023-20238）的影响，可导致远程攻击者伪造凭据并绕过认证。**  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
![](https://mmbiz.qpic.cn/mmbiz_png/oBANLWYScMT8XqYSWgGfB0E0gKI28A7K4ZMfr5GCVLeNqIww6FLFUiaazr0LlrFLga3cjEtBqmwonrKU731jsqw/640?wx_fmt=png "")  
  
  
思科 BroadWorks 是一款适用于企业和消费者的云通信服务平台，而上述提到的两个组件用于 app 管理和集成。该漏洞是由思科安全研究员发现的，CVSS评分为10分。  
  
攻击者可利用该漏洞自由执行命令、访问机密数据、修改用户设置以及提交话费欺诈信息。如以下其中一款应用在上述组件中激活，则这两款组件受影响：  
  
- AuthenticationService  
  
- BWCallCenter  
  
- BWReceptionist  
  
- CustomMediaFilesRetrieval  
  
- ModeratorClientApp  
  
- PublicECLQuery  
  
- PublicReporting  
  
- UCAPI  
  
- Xsi-Actions  
  
- Xsi-Events  
  
- Xsi-MMTel  
  
- Xsi-VTR  
  
  
  
该漏洞除了影响安全公告中提及的两个组件外，不影响其它 BroadWorks 组件，因此用户无需采取任何措施。思科在安全公告中指出，“该漏洞是因为用于验证单点登录令牌的方法导致的。攻击者可通过伪造的凭据在应用上认证，利用该漏洞。”  
  
攻击者利用后获得的能力取决于伪造账户的权限级别，而“管理员”账户是最糟糕的可能场景。然而，利用该漏洞的一个前提条件是拥有与目标思科 BroadWorks 系统相关联的合法用户ID。这一条件可能减少可利用该漏洞的潜在攻击者的数量，但并无法缓解该漏洞，因此风险仍然严峻。  
  
思科并未提供任何缓解措施，因此建议的解决方案是,23.0分支的用户更新至 AP.platform.23.0.1075.ap385341，而发布独立 (RI) 版本的用户更新至2023.06_1.333 或 2023.07_1.332。该漏洞还影响22.0分支用户，但思科将不会为该版本提供安全更新，因此建议老旧版本用户迁移到已修复版本。  
  
目前尚无证据表明该漏洞已遭在野利用，但系统管理员应当尽快应用可用的更新。  
  
  
代码卫士试用地址：  
https://codesafe.qianxin.com  
  
开源卫士试用地址：https://oss.qianxin.com  
  
  
  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[多个高危漏洞可导致思科交换机和防火墙遭 DoS 攻击](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247517453&idx=2&sn=251402ddfd4c8a150b8758f1c605b2af&chksm=ea94b467dde33d7195d23ecc995280d0ef6b19557e14a8330945c641004b75bea1871b2c82a6&scene=21#wechat_redirect)  
  
  
[严重的思科 SD-WAN 漏洞可导致信息泄露](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247517089&idx=2&sn=d00e1d0fe24db8bf16d2d2b13ca24261&chksm=ea94b2cbdde33bdd104cf70c1e39dc9aa9a50a4a440cfb4040c51ffb19d02aa65883822b0e90&scene=21#wechat_redirect)  
  
  
[高危无补丁0day影响思科数据中心交换机，可导致加密流量遭篡改](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247516974&idx=2&sn=179eead740cfb91b376bafa02e4fcb99&chksm=ea94b244dde33b524d84c5fad51227142548b6794645504ad026ef59442f37d9388673b96ff7&scene=21#wechat_redirect)  
  
  
[思科修复企业协作解决方案中的严重漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247516704&idx=1&sn=6a051f71c4415e8ad5f9be754927a9e7&chksm=ea94b34adde33a5c62b6fd4ed5257ace796ceae62afe7d61ca91d818c2973aaa40cfbe68ff91&scene=21#wechat_redirect)  
  
  
[思科提醒：多款交换机存在多个RCE漏洞且利用代码已公开](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247516520&idx=1&sn=b218e43205e7038adc4f452ffee4c6e2&chksm=ea94b002dde339147f0499b209d253c186277b9ecf0af4a44153ac18705dffd978ecbe379083&scene=21#wechat_redirect)  
  
  
  
  
**原文链接**  
  
https://www.bleepingcomputer.com/news/security/cisco-broadworks-impacted-by-critical-authentication-bypass-flaw/  
  
  
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
