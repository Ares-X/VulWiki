---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  谷歌悄悄紧急修复已遭利用的 Chrome 0day   
Ionut Arghire  代码卫士   2025-06-04 10:41  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Az5ZsrEic9ot90z9etZLlU7OTaPOdibteeibJMMmbwc29aJlDOmUicibIRoLdcuEQjtHQ2qjVtZBt0M5eVbYoQzlHiaw/640?wx_fmt=gif "")  
   
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
**本周一，谷歌发布 Chrome 137 更新，修复了三个漏洞，其中一个是已遭在野利用的高危 0day 漏洞，CVE-2025-5419。**  
  
该漏洞是位于 V8 JavaScript 引擎中的一个界外读和写问题。谷歌在安全公告中提到，“谷歌发现在野存在CVE-2025-5419的利用。”但谷歌并未提供关于该安全缺陷或利用的更多详情。该漏洞由谷歌威胁分析团队 (TAG) 成员 Clement Lecigne 和 Benoît Sevens 报送。  
  
TAG 研究人员此前曾报送遭商用监控软件厂商利用的多个漏洞，包括位于 Chrome 中的此类漏洞。谷歌浏览器中的漏洞经常遭监控厂商利用，而CVE-2025-5419可能也并不例外。  
  
NIST 发布一份安全报告提到，该已遭利用的0day漏洞“可使远程攻击者通过构造的 HTML 页面利用堆损坏”。值得注意的是，界外漏洞遭利用通常会导致任意代码执行后果。  
  
这份最新的浏览器更新还修复了一个位于 Blink 中的中危 UAF 漏洞CVE-2025-5068，研究人员为此获得1000美元的赏金。而CVE-2025-5419的报送研究员不会获得任何赏金。Chrome 的最新版本是 137.0.7151.68/.69 （Windows 和 macOS）以及 137.0.7151.68（Linux）。  
  
CVE-2025-5419的补丁是在3月份据称遭俄罗斯国家黑客组织利用 Chrome 沙箱逃逸 (CVE-2025-2783) 漏洞被捕获和修复后发布的。火狐浏览器也修复了一个类似漏洞。5月中旬，谷歌发布一份 Chrome 136更新，并提醒称该漏洞的利用已在野出现。该补丁是在研究员在社交媒体平台X上发布相关信息后推出的。  
  
  
  
代码卫士试用地址：  
https://codesafe.qianxin.com  
  
开源卫士试用地址：https://oss.qianxin.com  
  
  
  
  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[Chrome修复已遭活跃利用的0day](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247523031&idx=1&sn=40bc8fad7dc229f984420d3f6109a0b9&scene=21#wechat_redirect)  
  
  
[Firefox 存在严重漏洞，类似于 Chrome 已遭利用0day](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247522612&idx=2&sn=50c7ad88e87b485a09c7ae916f9d9677&scene=21#wechat_redirect)  
  
  
[谷歌修复今年第五个 Chrome 0day漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247519462&idx=1&sn=1f7824cfd17d3489bc4ba1b37c5d974c&scene=21#wechat_redirect)  
  
  
[谷歌修复 Pwn2Own 2024大赛发现的两个 Chrome 0day](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247519170&idx=1&sn=31612ff9461ff59184a818b76f04c198&scene=21#wechat_redirect)  
  
  
[谷歌修复2024年首个已遭利用的 Chrome 0day 漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247518705&idx=2&sn=1f6ee90c31f7b70d13390d0a735fe85f&scene=21#wechat_redirect)  
  
  
  
  
  
**原文链接**  
  
https://www.securityweek.com/google-researchers-find-new-chrome-zero-day/  
  
  
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
