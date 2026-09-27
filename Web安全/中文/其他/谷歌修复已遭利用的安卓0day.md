---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  谷歌修复已遭利用的安卓0day   
Sergiu Gatlan  代码卫士   2025-03-06 18:36  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Az5ZsrEic9ot90z9etZLlU7OTaPOdibteeibJMMmbwc29aJlDOmUicibIRoLdcuEQjtHQ2qjVtZBt0M5eVbYoQzlHiaw/640?wx_fmt=gif "")  
  
   
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
**谷歌发布安卓3月安全更新，修复了43个漏洞，包括已遭利用的两个0day。**  
  
  
  
  
  
  
  
塞尔维亚当局利用位于Human Interface Devices Linux 内核驱动中的一个高危信息泄露漏洞 (CVE-2024-50302) 解锁被没收的设备。该漏洞是由以色列数字化取证公司 Cellebrite 开发的安卓0day 利用链中的一部分，该利用链的目的是解锁被没收的设备。  
  
该利用链包括USB Video Class 中的一个0day 漏洞CVE-2024-53104 以及ALSA USB声音驱动0day 漏洞，是由Amnesty International 公司的安全实验室在2024年年中通过分析由塞尔维亚当局解锁的一台设备上的日志时发现的。  
  
谷歌表示，已在今年1月份与原始设备制造商合作伙伴共享了修复方案。谷歌的一名发言人提到，“我们在这些报告发布前了解到这些漏洞及其利用风险，并及时开发了修复方案，并在1月18日在合作伙伴安全公告中与原始设备制造厂商共享。”  
  
第二个0day漏洞CVE-2024-43093是安卓Framework 提权漏洞。无需其它执行权限或用户交互，本地攻击者即可利用因unicode 规范化不正确造成的一个文件路径过滤绕过漏洞，从而访问敏感目录。  
  
本次安卓安全更新还修复了11个漏洞，可导致攻击者在易受攻击设备上执行远程代码。谷歌还为闭源第三方和内核子组件发布了补丁。  
  
谷歌 Pixel 设备立即收到了这些更新，而其它厂商通常需要更久的时间才能测试并优化用于硬件配置的安全补丁。去年11月，谷歌曾修复了另外一个安卓0day漏洞 (CVE-2024-43047)。谷歌Project Zero 团队在2024年10月率先修复该漏洞，而该漏洞也被塞尔维亚政府用于 NoviSpy 间谍攻击中，攻击活动家、记者和抗议人员的安卓设备。  
  
  
代码卫士试用地址：  
https://codesafe.qianxin.com  
  
开源卫士试用地址：https://oss.qianxin.com  
  
  
  
  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[谷歌修复已遭利用的两个安卓 0day 漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247521406&idx=1&sn=af981c3476e81115ffa11866a0bb7b7d&scene=21#wechat_redirect)  
  
  
[谷歌：三星0day漏洞已遭活跃利用](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247521255&idx=3&sn=a3d253a523be442f0e1f72789ba75fb2&scene=21#wechat_redirect)  
  
  
[谷歌：2023年70%的已遭利用漏洞是0day](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247521136&idx=1&sn=8dae0f9e90eb71b97f2e0b1158775cb8&scene=21#wechat_redirect)  
  
  
[谷歌修复今年第10个已遭利用0day](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247520605&idx=1&sn=943de838e9f963febbf06e2dc05dfbba&scene=21#wechat_redirect)  
  
  
[安卓间谍软件 NoviSpy 利用高通6个0day感染设备](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247521826&idx=2&sn=2e115cf641ac90636ca05cde8df5fa09&scene=21#wechat_redirect)  
  
  
  
  
  
**原文链接**  
  
https://www.bleepingcomputer.com/news/security/google-fixes-android-zero-days-exploited-in-targeted-attacks/  
  
  
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
