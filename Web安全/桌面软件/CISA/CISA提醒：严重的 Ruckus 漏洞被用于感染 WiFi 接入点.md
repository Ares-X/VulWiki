---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  CISA提醒：严重的 Ruckus 漏洞被用于感染 WiFi 接入点   
Sergiu Gatlan  代码卫士   2023-05-15 17:27  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Az5ZsrEic9ot90z9etZLlU7OTaPOdibteeibJMMmbwc29aJlDOmUicibIRoLdcuEQjtHQ2qjVtZBt0M5eVbYoQzlHiaw/640?wx_fmt=gif "")  
  
   
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
**美国网络安全和基础设施安全局 (CISA) 提醒称，Ruckus Wireless Admin 面板中存在一个严重的远程代码执行漏洞 (CVE-2023-25717)，已遭近期发现的某 DDoS 僵尸网络利用。**  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/oBANLWYScMRuQDkjrn90BU9uy6w6tibv8p43uRkfKCRI3S6WVjfDzt1m0ib0cLM3fH2VicBzfPJwn0lZR9BfNxAnw/640?wx_fmt=gif "")  
  
![](https://mmbiz.qpic.cn/mmbiz_png/oBANLWYScMRuQDkjrn90BU9uy6w6tibv8Taa3larbf2kynMcYHica91TpsACtkb56gDQyiayqgD5lg5eBs5DZe68A/640?wx_fmt=png "")  
  
  
虽然该漏洞已在2月初修复，但很多设备所有人可能尚未修复无线接入点。另外，目前尚未发布针对已达生命周期型号设备的补丁。  
  
攻击者正通过 AndoryuBot 恶意软件（首次现身于2023年2月），通过未认证的 HTTP GET 请求感染易受攻击的 WiFi 接入点。设备如遭攻陷，可被添加至僵尸网络，发动 DDoS 攻击。该恶意软件支持12种 DDoS 模式：tcp-raw、 tcp-socket、tcp-cnc、tcp-handshake、udp-plain、udp-game、udp-ovh、udp-raw、udp-vse、udp-dstat、udp-bypass 和 icmp-echo。意在发动 DDoS 攻击的网络犯罪分子可租赁 AndoryuBot 僵尸网络的武器库，后者正在销售其服务。这种服务可通过 CashApp 移动支付服务或通过多种加密密币如 XMR、BTC、ETH 和 USDT 等支付。  
  
  
**联邦机构必须在6月2日前修复**  
  
  
  
CISA 要求美国联邦政府民事行政部门最晚于6月2日修复该漏洞，已将该漏洞添加到“已遭利用漏洞”列表中。  
  
虽然该分类列表主要关注美国联邦机构，但鉴于攻击者对漏洞的活跃利用，强烈建议私营企业优先修复该列表中列出的漏洞，以免面临安全风险。另外，CISA 也要求联邦机构在5月30日前修复 Windows 0day (CVE-2023-29336)。该漏洞可导致用户在受陷的 Windows 系统上提升至系统用户权限。微软虽然证实称该 Win32k 内核驱动漏洞已遭利用但尚未详述利用方式。  
  
  
****  
  
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
  
  
[1500万公开服务易受 CISA 已知已遭利用漏洞攻击](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247516131&idx=2&sn=e4062667fe1d4694a90a9ffa17a2fd40&chksm=ea948e89dde3079ffc2cbba3e2f13e7929117094754c9e3216a4c6cb5f303cf622ec99800e6b&scene=21#wechat_redirect)  
  
  
[CISA提醒修复这些严重的ICS漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247516017&idx=2&sn=09318646aeb89a81eeacb8a2b51f9939&chksm=ea948e1bdde3070d895e8c6cea2e67f1eb2a166309fb913b70ade0894f89d12b2f3aefb0b477&scene=21#wechat_redirect)  
  
  
[CISA紧急提醒：Adobe ColdFusion漏洞已遭在野利用](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247515947&idx=3&sn=76c36938bf1b7401950fc62730020638&chksm=ea948e41dde30757c6826cbbaeba673c04d191b437bd8a20532e2a13614e94562772ade4c057&scene=21#wechat_redirect)  
  
  
[CISA提醒注意与LastPass泄露事件有关的Plex漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247515912&idx=2&sn=9a2496bb8c17bcf9ed8e477367f18001&chksm=ea948e62dde307749ef7616c97efc1c91e680e87bd654e1a1766fae70831f36318fa216354cf&scene=21#wechat_redirect)  
  
  
[CISA必修列表未收录数十个已遭利用漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247515885&idx=2&sn=26d62bc99cdd37f8365bae8a9b94dba5&chksm=ea948f87dde30691fa7f9887c40e755916adb1ef81c320c67bd9cf032e3495edbc2c16f71288&scene=21#wechat_redirect)  
  
  
  
  
**原文链接**  
  
https://www.bleepingcomputer.com/news/security/cisa-warns-of-critical-ruckus-bug-used-to-infect-wi-fi-access-points/  
  
  
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
