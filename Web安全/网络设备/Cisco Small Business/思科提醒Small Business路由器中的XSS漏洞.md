---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  思科提醒注意Small Business路由器中的XSS漏洞   
 代码卫士   2024-04-07 17:38  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Az5ZsrEic9ot90z9etZLlU7OTaPOdibteeibJMMmbwc29aJlDOmUicibIRoLdcuEQjtHQ2qjVtZBt0M5eVbYoQzlHiaw/640?wx_fmt=gif "")  
  
   
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
**思科提醒注意 Small Business RV016、RV042、RV042G、RV082和RV325路由器中的一个XSS漏洞。**  
  
  
  
该中危漏洞编号是CVE-2024-20362，位于思科 Small Business RV016、RV042、RV042G、RV082和RV325路由器的 web 管理接口中。未认证的远程攻击者可对接口用户实施XSS攻击。  
  
思科表示受影响设别已达生命周期，将不会发布软件更新，也不存在应变措施。  
  
思科在安全公告中提到，“该漏洞是因为web管理接口的输入验证不当造成的。攻击者可说服用户访问包含恶意 payload的特定网页，利用该漏洞。成功利用该漏洞可导致攻击者在受影响接口的上下文中执行任意脚本代码或访问敏感的基于浏览器的信息。”  
  
该漏洞影响所有如下软件发布：  
  
- RV016 Multi-WAN VPN Routers  
  
- RV042 Dual WAN VPN Routers  
  
- RV042G Dual Gigabit WAN VPN Routers  
  
- RV082 Dual WAN VPN Routers  
  
- RV320 Dual Gigabit WAN VPN Routers  
  
- RV325 Dual Gigabit WAN VPN Routers  
  
  
  
思科建议禁用远程管理功能，拦截对443和60443端口的访问，缓解该漏洞。之后，用户仍可通过LAN接口访问设备。思科并未发现该漏洞已遭利用的迹象。思科建议用户尽快更新至最新版本。如下版本不受影响：  
  
- RV160 VPN Routers  
  
- RV160W Wireless-AC VPN Routers  
  
- RV260 VPN Routers  
  
- RV260P VPN Routers with PoE  
  
- RV260W Wireless-AC VPN Routers  
  
- RV340 Dual WAN Gigabit VPN Routers  
  
- RV340W Dual WAN Gigabit Wireless-AC VPN Routers  
  
- RV345 Dual WAN Gigabit VPN Routers  
  
- RV345P Dual WAN Gigabit PoE VPN Routers  
  
  
  
  
  
代码卫士试用地址：  
https://codesafe.qianxin.com  
  
开源卫士试用地址：https://oss.qianxin.com  
  
  
  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[思科服务器管理工具中存在 XSS 0day](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247516356&idx=1&sn=3a870e38244c8f43090fe23f54c81fa7&chksm=ea94b1aedde338b8242499091a2cb37dec7924bffa0bde2f1dc62c5d42e10242fb0125850d86&scene=21#wechat_redirect)  
  
  
[思科IOS 漏洞可导致未认证的远程DoS 攻击](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247519204&idx=2&sn=6fc646b9575f6837ef0f55d569c11709&chksm=ea94ba8edde33398e567236352d40e34414aa12c9e4bd4d838bff320754289021c2fafcc02b8&scene=21#wechat_redirect)  
  
  
[思科提醒注意通信软件中的严重 RCE 漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247518760&idx=2&sn=d82d599134c7b2a410f4ccfe05d73d96&chksm=ea94bb42dde33254d6f854bc5b194c69fc4038bdbac099637195d80d4e0b19bd6ede6758ace6&scene=21#wechat_redirect)  
  
  
[思科称严重的 Unity Connection 漏洞可导致攻击者获得root权限](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247518649&idx=1&sn=21ff8ab835664822aef75af18b5178a8&chksm=ea94b8d3dde331c5c49a02303ecda17deb3b8897d8bee8be24590ef862f6d2be63c6f37b66cd&scene=21#wechat_redirect)  
  
  
[罗克韦尔自动化称 Stratix 交换机受思科0day影响](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247517980&idx=1&sn=ffc848776d7e9915b3d800a23587fda9&chksm=ea94b676dde33f6029a679ed808213cb1d41ffd5a8ca6b04cf84a414175c08db3c21817c5f49&scene=21#wechat_redirect)  
  
  
  
  
**原文链接**  
  
  
https://securityaffairs.com/161540/security/cisco-eof-routers-xss.html  
  
  
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
