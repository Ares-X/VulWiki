---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  QNAP正在紧急修复两个0day，影响全球超8万设备   
Becky Bracken  代码卫士   2023-04-06 17:10  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Az5ZsrEic9ot90z9etZLlU7OTaPOdibteeibJMMmbwc29aJlDOmUicibIRoLdcuEQjtHQ2qjVtZBt0M5eVbYoQzlHiaw/640?wx_fmt=gif "")  
  
   
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
****  
**适用于NAS 设备的多款 QNAP 操作系统中存在两个0day漏洞（CVE-2022-27597和CVE-2022-27598），影响全球8万多台设备。在受影响的4款操作系统中，仍有两款未修复。**  
  
  
  
这些操作系统漏洞由 Sternum 公司的研究员发现，属于内存访问不当漏洞，可导致代码不稳定并导致认证的犯罪分子执行任意代码。CVE-2022-27597和CVE-2022-27598 影响 QTS、QuTS hero、QuTScloud 和 QVP OS，且已在 QTS 版本5.0.1.2346 build 20230322及后续版本以及 QuTS hero 版本 h5.0.1.2348 build 20230324 及后续版本中修复。QuTScloud 和 QVP OS 仍未修复，不过QNAP 公司表示正在“紧急修复”这些漏洞。  
  
研究人员解释称，该内存访问不当漏洞影响 QNAP 设备的性能以及安全性。Sternum 公司的研究安全总监 Amit Serper 指出，“从性能角度来看，它们可导致稳定性问题和不可预测的代码行为。从安全角度来看，恶意人员可执行任意代码。”  
  
QNAP 公司在安全公告中指出，“如遭利用，该漏洞可导致远程认证用户获得机密值。”  
  
虽然这些漏洞被评级为“低危”级别，且目前研究人员未发现遭在野利用的迹象，但快速打补丁很重要，因为 QNAP 用户仍然是网络犯罪分子眼中的香饽饽。  
  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/oBANLWYScMQKjGAntH92EUgeNoMVYKoyPkgsQxcvNdmvibNXvVqS1GYPQolibXicD2zUrzhR5lGjKC7rg0iaqXbn3g/640?wx_fmt=gif "")  
  
**QNAP 为何是攻击者的宠儿？**  
  
  
  
DeadBolt 勒索团伙单在2022年五月、六月和九月就利用大量0day 攻击 QNAP 用户。Vulcan Cyber 公司的高级技术工程师 Mark Parkin表示，该勒索团伙显然在不断寻找并利用 QNAP 0day，尤其是严重的0day。  
  
Parkin 解释称，“据称，有时在某个目标中发现一个漏洞就会引出更多漏洞。问题就是他们寻找的次数越多，找到的漏洞就越多。这几乎会让你思考攻击者是不是拥有对源代码的访问权限或者能够通过其它方式获得内部跟踪权限。”  
  
组织机构需要确保这些被高度针对的 QNAP 系统更新至最新状态，尤其是在新漏洞频繁出现的情况下更应如此。除了 Sternum 公司的最新研究成果外，QNAP QTS OS 用户还收到告警成，注意一个 CVSS 评分为9.8的严重的SQL注入漏洞，这一消息进一步加剧了攻击面。  
  
对于新近出现的漏洞而言，系统无补丁的用户应当应用强大的端点检测和响应解决方案并查找妥协指标。由于网络攻击者需要进行验证，因此审计能够访问受影响系统的人员并提供额外的验证防护措施也有助于缓解攻击。  
  
一名研究人员告警称，即使补丁已提供，但想要真正锁定设备，一些公司可能需要转变思维方式。Viakoo 公司的首席执行官 Bud Broomhead 指出，“QNAP 设备之所以非常受网络犯罪分子欢迎，是因为后者的策略是花小钱获得大量受害者。由于 QNAP 和很多其它物联网设备基本不在 IT 范围内管理，因此通常会被配置不当、不受防火墙保护以及不被修复。”  
  
他还提到，“这些设备通常对于企业IT和安全部门是不可见的，当它们不合规（如过期和不安全的固件）时不会得到审计或被察觉。”  
  
  
  
![](https://mmbiz.qpic.cn/mmbiz_png/oBANLWYScMQZeSribxs2yU1w56EMvgX9cDBCiabniazxdxtQ25cBCAd5vBJIM2sOv1khjzwwViaT0pS74U6piaiauiaGA/640?wx_fmt=png "")  
  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/oBANLWYScMTBzmfDJA6rWkgzD5KIKNibpR0szmPaeuu4BibnJiaQzxBpaRMwb8icKTeZVEuWREJwacZm3wElt7vOtQ/640?wx_fmt=jpeg "")  
  
****  
代码卫士试用地址：  
https://codesafe.qianxin.com  
  
开源卫士试用地址：https://oss.qianxin.com  
  
  
  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247511052&idx=3&sn=fb116392e405ae62e6c339117fffdb59&chksm=ea949d66dde31470758b6ee8f9dbecdb67ef6c0c8af277f26b83b60dbac95748d28db787a4b4&scene=21#wechat_redirect)  
[奇安信入选全球《软件成分分析全景图》代表厂商](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247515374&idx=1&sn=8b491039bc40f1e5d4e1b29d8c95f9e7&chksm=ea948d84dde30492f8a6c9953f69dbed1f483b6bc9b4480cab641fbc69459d46bab41cdc4859&scene=21#wechat_redirect)  
  
  
[QNAP 提醒用户修复 NAS 设备中的高危 Linux Sudo 漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247516096&idx=3&sn=82f067c61adcd0aa4a98ca6165d9c9d3&chksm=ea948eaadde307bc40d0015e6feadf0f1264ab387fd2b2500439ce984d5722ddf2e79da15ca4&scene=21#wechat_redirect)  
  
  
[QNAP推出新的漏洞奖励计划，覆盖应用、云服务和OS，最高赏金2万美元](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247515762&idx=1&sn=3de5cd1e8a38ecfddac1ebab20ee6b48&chksm=ea948f18dde3060eb71f9ad5b5a212e250c11191c75766067819d29b3ced5103a9e86c9dd415&scene=21#wechat_redirect)  
  
  
[QNAP严重漏洞可导致恶意代码注入](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247515416&idx=1&sn=e9005edba45daabb40b20c3823c4f297&chksm=ea948c72dde305642e1d413fc58cee4673b2e8288bae850521ae7c67a4270f868028addf531f&scene=21#wechat_redirect)  
  
  
[QNAP紧急修复已遭勒索团伙利用的0day](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247513786&idx=1&sn=6db5fbb61270cf614d6605adb52ca99c&chksm=ea9487d0dde30ec6b7e1631c93975e24741275c2ba254fe0dac3f5f494c3000a8cedb03ff890&scene=21#wechat_redirect)  
  
  
[严重的PHP缺陷可导致QNAP NAS 设备遭RCE攻击](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247512551&idx=2&sn=62ca391c055ea2839fe4178afcd48f4b&chksm=ea94808ddde3099be6ec5044d096c7921e4abb430485bfbd3eb207e3fa39af16c7a0ca6a766b&scene=21#wechat_redirect)  
  
  
  
  
**原文链接**  
  
https://www.darkreading.com/vulnerabilities-threats/qnap-zero-days-80k-devices-vulnerable-cyberattack  
  
  
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
