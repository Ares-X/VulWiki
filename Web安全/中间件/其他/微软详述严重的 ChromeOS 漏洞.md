---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  微软详述严重的 ChromeOS 漏洞   
综合编译  代码卫士   2022-08-23 17:45  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Az5ZsrEic9ot90z9etZLlU7OTaPOdibteeibJMMmbwc29aJlDOmUicibIRoLdcuEQjtHQ2qjVtZBt0M5eVbYoQzlHiaw/640?wx_fmt=gif "")  
  
   
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
****  
上周五，微软详述了ChromeOS 中严重漏洞 (CVE-2022-2587) 的详情。该漏洞可用于执行拒绝服务 (DoS) 攻击，并在一些情况下可导致远程代码执行后果。  
  
  
CVE-2022-2587是一个界外写漏洞，CVSS评分为9.8，由微软 365 Defender团队的研究员 Jonathan Bar Or 发现并报告，已在6月份修复。漏洞出在 CRAS (ChromiumOS Audio Server) 组件D-Bus中，可通过使用与歌曲相关联的恶意元数据触发。  
  
CRAS位于操作系统和 ALSA（高级声音体系）之间，用于将音频路由到支持音频的新的外围设备如USB扬声器和蓝牙耳机中。  
  
微软的研究员发现，该服务器中包含一个并不检查用户所提供的的“identigy”参数的函数，导致基于堆的缓冲区溢出后果，这种漏洞通常用于实现远程代码执行。D-Bus服务被称为 org.chromium.cras，其中包括一个名为SetPlayerIdentity的函数，接受名为identity的字符串参数作为输入。该函数的C代码调用标准库中的危险函数 strcpy。由于该函数并不会执行任何边界检查，因此是不安全的，可引发多种内存损坏漏洞。  
  
微软解释称，该易受攻击的组件中包含一种方法，它从代表歌曲题目的元数据中提取“identity”。攻击者可修改该音频元数据，从而触发该漏洞。  
  
微软指出，攻击者可从浏览器或通过蓝牙利用该漏洞。在这两种情况下，当元数据发生改变时，就会调用该易受攻击的函数，如当在浏览器中或通过配对的蓝牙设备播放新歌曲时。  
  
微软指出，“基于堆的缓冲区溢出漏洞可导致拒绝服务或远程代码执行后果。尽管可通过媒体元数据操控来分配和释放代码块，但在这种情况下要执行精确的堆风水 (grooming) 并不容易，它要求攻击者结合利用其它漏洞来执行任意代码。”  
  
研究员在4月份将该漏洞告知谷歌，后者在两个月后修复并颁发2.5万美元的奖励金。微软并未发现该漏洞已遭利用的指标。  
  
  
  
  
代码卫士试用地址：  
https://codesafe.qianxin.com  
  
开源卫士试用地址：  
https://oss.qianxin.com  
  
  
  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[谷歌修复今年第五个Chrome 0day](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247513606&idx=2&sn=eb7c5b8b8637ed62d0be305f14e2ba9e&chksm=ea94876cdde30e7ac31840c96b22a9c1872036aff023b5d8f88d53f211f15811f84aede4f150&scene=21#wechat_redirect)  
  
  
[间谍软件 Candiru 利用 Chrome 0day 攻击记者](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247513028&idx=3&sn=79c8d781d604e70522630b58315bf010&chksm=ea9482aedde30bb8b7d8d21ea1ae630e8716995afec64599d4e6d5bff0cf26c5c6cdbfd6fd6a&scene=21#wechat_redirect)  
  
  
[Chrome 103紧急修复已遭利用的0day](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247512717&idx=1&sn=90d9ee1cbcb33e3442cfd9d4d4c1d958&chksm=ea9483e7dde30af103b74637ffdefd0a6d62164388d12598a2a74b18e802f659d18f3e11a70f&scene=21#wechat_redirect)  
  
  
[谷歌修复7个 Chrome 浏览器漏洞，CISA建议尽快更新](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247512301&idx=2&sn=8692c38f4cf01bc6ae31e903937819f7&chksm=ea948187dde30891f434d90835b849b48564c5b0c642973efc1eb86324af13f3c4f1bfaefbe9&scene=21#wechat_redirect)  
  
  
[谷歌修复Chrome Dev 频道中严重的 RCE 漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247512014&idx=2&sn=c8e692934d4e7fac9cd328d7b583e823&chksm=ea949ea4dde317b260b99b4ce42b5a0a550c1b8ae36721bca277f704497201609f2315a73afa&scene=21#wechat_redirect)  
  
  
  
  
**原文链接**  
  
https://www.securityweek.com/microsoft-shares-details-critical-chromeos-vulnerability  
  
https://www.theregister.com/2022/08/23/microsoft_chromeos_bug/  
  
  
题图：  
Pixabay License  
‍  
  
  
  
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
