---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  惠普将在90天内修复这个严重的 LaserJet 打印机漏洞   
Bill Toulas  代码卫士   2023-04-07 17:20  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Az5ZsrEic9ot90z9etZLlU7OTaPOdibteeibJMMmbwc29aJlDOmUicibIRoLdcuEQjtHQ2qjVtZBt0M5eVbYoQzlHiaw/640?wx_fmt=gif "")  
  
   
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
****  
**本周，惠普发布安全公告称，将在90天内修复影响某些企业级打印机固件的一个严重漏洞 (CVE-2023-1707)。该漏洞影响约50款 HP Enterprise LaserJet 和 HP LaserJet Managed Printers 机型。**  
  
  
  
惠普表示该漏洞的CVSS v3评分为9.1，如遭利用可导致信息泄露后果。尽管评分很高，但由于易受攻击的设备需要运行 FutureSmart 固件版本 5.6 且需要启用 IPsec，因此存在限制性利用上下文。IPsec（互联网协议安全）是一种用于企业网络的IP网络安全协议套件，用于保护远程或内部通信安全并阻止对包括打印机在内的资产的越权访问。  
  
FurtureSmart 可使用户从打印机可用的控制台工作和配置打印机，或者通过 web 浏览器远程访问。在本案例中，该信息泄露漏洞可导致攻击者访问易受攻击的惠普打印机和网络上其它设备之间传输的敏感信息。  
  
如下打印机机型受CVE-2023-1707的影响：  
  
- HP Color LaserJet Enterprise M455  
  
- HP Color LaserJet Enterprise MFP M480  
  
- HP Color LaserJet Managed E45028  
  
- HP Color LaserJet Managed MFP E47528  
  
- HP Color LaserJet Managed MFP E785dn、HP Color LaserJet Managed MFP E78523、E78528  
  
- HP Color LaserJet Managed MFP E786、HP Color LaserJet Managed Flow MFP E786、HP Color LaserJet Managed MFP E78625/30/35、HP Color LaserJet Managed Flow MFP E78625/30/35  
  
- HP Color LaserJet Managed MFP E877、E87740/50/60/70、HP Color LaserJet Managed Flow E87740/50/60/70  
  
- HP LaserJet Enterprise M406  
  
- HP LaserJet Enterprise M407  
  
- HP LaserJet Enterprise MFP M430  
  
- HP LaserJet Enterprise MFP M431  
  
- HP LaserJet Managed E40040  
  
- HP LaserJet Managed MFP E42540  
  
- HP LaserJet Managed MFP E730、HP LaserJet Managed MFP E73025、 E73030  
  
- HP LaserJet Managed MFP E731、HP LaserJet Managed Flow MFP M731、 HP LaserJet Managed MFP E73130/35/40、HP LaserJet Managed Flow MFP E73130/35/40  
  
- HP LaserJet Managed MFP E826dn、HP LaserJet Managed Flow MFP E826z、HP LaserJet Managed E82650/60/70、HP LaserJet Managed E82650/60/70  
  
  
  
惠普公司表示，将在90天内发布固件更新，修复该问题，因此目前无修复方案。  
  
运行 FutureSmart 5.6 的客户可将固件版本降级至 FS 5.5.0.3，缓解该漏洞。惠普指出，“惠普建议客户立即退回该固件的之前版本 (FutureSmart 版本5.5.0.3)。我们将在90天内更新固件，解决该问题。”建议用户从惠普官方下载中心下载该固件包。  
  
惠普公司发布评论指出，“该潜在漏洞的暴露期非常短（2023年2月中旬到2023年3月底），且仅存在于该固件的特定版本 (FutureSmart 5) 中。客户已无法再次下载包含该潜在漏洞的固件版本。在这一短时间内，如果客户使用 IPsec，则从打印机发送的扫描任务数据可能已遭泄漏。只有当用户扫描任务并将其发送到远程位置时，数据才有可能遭暴露。如果客户未部署 TLS 或者其它底层加密机制，则凭据可能遭暴露。该问题是惠普内部测试发现的并立即采取行动。惠普并未发现遭活跃利用的情况。”  
  
  
  
****  
![](https://mmbiz.qpic.cn/mmbiz_png/oBANLWYScMQZeSribxs2yU1w56EMvgX9cDBCiabniazxdxtQ25cBCAd5vBJIM2sOv1khjzwwViaT0pS74U6piaiauiaGA/640?wx_fmt=png "")  
  
  
  
代码卫士试用地址：  
https://codesafe.qianxin.com  
  
开源卫士试用地址：https://oss.qianxin.com  
  
  
  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247511052&idx=3&sn=fb116392e405ae62e6c339117fffdb59&chksm=ea949d66dde31470758b6ee8f9dbecdb67ef6c0c8af277f26b83b60dbac95748d28db787a4b4&scene=21#wechat_redirect)  
[奇安信入选全球《软件成分分析全景图》代表厂商](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247515374&idx=1&sn=8b491039bc40f1e5d4e1b29d8c95f9e7&chksm=ea948d84dde30492f8a6c9953f69dbed1f483b6bc9b4480cab641fbc69459d46bab41cdc4859&scene=21#wechat_redirect)  
  
  
[120款利盟打印机受严重漏洞影响](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247515387&idx=2&sn=697ec4d2a0b8fa46daa2a3eb6bd30160&chksm=ea948d91dde3048721406d04c9eaf30ff9bb26d285995296c38970051f5431bfa3fc3dcd8a2c&scene=21#wechat_redirect)  
  
  
[数百款惠普打印机易受严重RCE漏洞影响](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247511052&idx=3&sn=fb116392e405ae62e6c339117fffdb59&chksm=ea949d66dde31470758b6ee8f9dbecdb67ef6c0c8af277f26b83b60dbac95748d28db787a4b4&scene=21#wechat_redirect)  
  
  
[施乐悄悄修复影响某些打印机中的严重缺陷](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247510378&idx=1&sn=1ea2de99c39b235a858d7b5ab46a7d70&chksm=ea949800dde3111670d6846af601a29d01f1588dda8ad2fb3bb0d22686cebc31cbb79c7dcd87&scene=21#wechat_redirect)  
  
  
[惠普修复已存在8年的可蠕虫漏洞，影响150多款多功能打印机](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247509506&idx=2&sn=4ccb7c2097be1ba0ee2a5ef33745f199&chksm=ea949768dde31e7e86777acd2863f87f08c0c0fb14ffbbff0206b5c0fbf28d00c6d2b208f8ee&scene=21#wechat_redirect)  
  
  
[严重漏洞已存在16年，数亿台打印机受影响](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247506490&idx=1&sn=387238c823268e7d25c5e2ce35791a71&chksm=ea94eb50dde36246a9c23dc06b98b2335f60574d35bdca8c971a8289aa321a2a341d9f4cc3ea&scene=21#wechat_redirect)  
  
  
  
  
**原文链接**  
  
https://www.bleepingcomputer.com/news/security/hp-to-patch-critical-bug-in-laserjet-printers-within-90-days/  
  
  
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
