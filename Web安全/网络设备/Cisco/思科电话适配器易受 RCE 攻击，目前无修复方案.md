---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  思科电话适配器易受 RCE 攻击，目前无修复方案   
Bill Toulas  代码卫士   2023-05-05 17:32  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Az5ZsrEic9ot90z9etZLlU7OTaPOdibteeibJMMmbwc29aJlDOmUicibIRoLdcuEQjtHQ2qjVtZBt0M5eVbYoQzlHiaw/640?wx_fmt=gif "")  
  
   
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
**思科披露了 SPA112 2-Port 电话适配器 web 管理接口中的一个漏洞 (CVE-2023-20126)，它可导致未认证远程攻击者在设备上执行任意代码。**  
  
![](https://mmbiz.qpic.cn/mmbiz_png/oBANLWYScMQiaeicwYwMniaooQ9Ya2AGniapicIGZzn0tibjSbD0eXaybxZj8FTj6WcF6L14dnAVkIQmPmFBILO5HkCw/640?wx_fmt=png "")  
  
  
该漏洞是严重级别的漏洞，CVSS评分为9.8，是由固件升级功能中缺少认证流程导致的。思科在安全通告中提到，“攻击者可将受影响设备升级至构造固件版本，利用该漏洞。成功利用该漏洞可导致攻击者以完全权限在受影响设备上执行任意代码。”  
  
这些电话适配器非常受欢迎，无需升级即将模拟电话机集成到 VoIP 网络中。虽然这些适配器可能用于很多组织机构中，但可能不会暴露到互联网，导致这些漏洞基本可从本地网络遭利用。然而，获得对这些设备的访问权限有助于攻击者在无需检测的情况下在网络中横向移动，因为安全软件一般不会监控这类设备。  
  
鉴于思科 SPA112 已达生命周期，因此已经不再受支持且不会收到安全更新。同时思科并未提供相关缓解措施。  
  
思科安全通告旨在提醒用户替换受影响的电话适配器或者执行额外安全层，以免受攻击。推荐的替换型号是思科 ATA 190系列模拟电话适配器，它将于2024年3月31日到期。  
  
思科并未发现该漏洞遭在野利用的实例，不过情况可能随时变化，因此建议管理员尽快采取适当的预防措施。热门设备上的严重漏洞是攻击者的潜在候选目标，可能导致大规模的安全事件发生。  
  
  
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
  
  
[思科多款IP电话存在严重的Web UI RCE漏洞，有一个将不修复](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247515804&idx=1&sn=3584a336f62d0ca3a0fde7fe3f9bd5dd&chksm=ea948ff6dde306e0cd113b8566d71e3afaca9efd2a9a141cc0a9126b8e84380d067a6405ab9f&scene=21#wechat_redirect)  
  
  
[思科开源杀软ClamAV中存在严重的RCE漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247515647&idx=2&sn=704411c89c34c85e52e2ad18ff0fb77c&chksm=ea948c95dde305838410d09bd123fd529f7be43231802fc228e4300929816f4adb5d4f72007e&scene=21#wechat_redirect)  
  
  
[思科不打算修复VPN路由器 RCE 0day](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247512438&idx=1&sn=563e5fbc7e61730cf40397cd09414e2b&chksm=ea94801cdde3090ad98fcb1524ccb001df9942040fddf238640160b7dab3a84c77eeef57ee7e&scene=21#wechat_redirect)  
  
  
[VPN路由器存在 RCE 0day，思科不打算修复](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247507288&idx=1&sn=35ea226a198d2e8b498fc0594f0c9e4c&chksm=ea94ec32dde365247ce79386abc905a55fa29ff709ced9085f116a97b44f37d5af3b6c853711&scene=21#wechat_redirect)  
  
  
  
  
**原文链接**  
  
https://www.bleepingcomputer.com/news/security/cisco-phone-adapters-vulnerable-to-rce-attacks-no-fix-available/  
  
  
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
