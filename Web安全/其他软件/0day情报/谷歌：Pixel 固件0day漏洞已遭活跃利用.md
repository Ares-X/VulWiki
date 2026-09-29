---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  谷歌：Pixel 固件0day漏洞已遭活跃利用   
SERGIU GATLAN  代码卫士   2024-06-13 17:45  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Az5ZsrEic9ot90z9etZLlU7OTaPOdibteeibJMMmbwc29aJlDOmUicibIRoLdcuEQjtHQ2qjVtZBt0M5eVbYoQzlHiaw/640?wx_fmt=gif "")  
  
   
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
**谷歌修复了 Pixel 设备中的50个漏洞并提醒称，其中一个漏洞在0day 状态时已遭利用，编号是CVE-2024-32896。**  
  
该漏洞是位于 Pixel 固件中的提权漏洞，属于高危级别。谷歌在本周二提到，“有迹象表明CVE-2024-32896可能已遭有限的针对性利用。所有受支持的谷歌设备将在2024年6月5日补丁级别收到更新。我们建议所有客户在设备中接受这些更新。”  
  
谷歌还在本月的 Pixel 更新公告中标记了其它44个漏洞，其中7个是高危的提权漏洞，影响多种子组件。虽然 Pixel 设备也运行安卓系统，但由于它们具有独特特性和能力且唯一的硬件平台直接由谷歌控制，因此从向所有安卓OEM分发的标准每月补丁收到了安全和漏洞修复更新。更多信息可从2024年6月的 Pixel 安全通告获取。Pixel 用户应通过设置＞安全和隐私＞系统和更新＞安全更新，点击“安装”并重启设备来完成更新流程。  
  
本月早些时候，Arm 提醒称 Bifrost 和 Valhall GPU 内核驱动中的内存相关漏洞 (CVE-2024-4610) 已遭在野利用。这类释放后使用漏洞影响 r34p0至r40p0的Bifrost和Valhall 驱动的所有版本，可导致信息泄露和任意代码执行后果。  
  
4月份，谷歌修复了另外两个由取证公司利用的 Pixel 0day漏洞，他们的目的是解锁手机且无需PIN和访问数据。CVE-2024-29745被标记为高危的位于 Pixel 引导程序的信息泄露漏洞，而CVE-2024-29748是位于 Pixel 固件中的高危提权漏洞。  
  
  
****  
代码卫士试用地址：  
https://codesafe.qianxin.com  
  
开源卫士试用地址：https://oss.qianxin.com  
  
  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[谷歌修复遭取证公司利用的两个 Pixel 0day漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247519231&idx=1&sn=5f9f5009dffb1ec140664df249e99fae&chksm=ea94ba95dde33383baddf488f4094e6fa0cd272867dd83693a008407c6112765694a7f8ef1d6&scene=21#wechat_redirect)  
  
  
[谷歌Pixel手机漏洞可导致打码信息被复原](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247515986&idx=2&sn=1c561af50d4d74f92b929c576d1b61c0&chksm=ea948e38dde3072e6ac1c0f86b5c40dae78e7e6ffb50ef855789ba8a438c415a8d85657b29d3&scene=21#wechat_redirect)  
  
  
[偶然发现谷歌Pixel手机锁屏漏洞，获奖7万美元](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247514622&idx=1&sn=adeff55ba5f030bba5d64dfbfe92cedb&chksm=ea948894dde301828cf7daf463d970cd90420b83b206fceb6da265d31e6aaefa24cc2aeb7022&scene=21#wechat_redirect)  
  
  
[谷歌宣布 Pixel Titan M 芯片漏洞奖励计划，最高150万美元](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247491643&idx=1&sn=028925ddf4bb4e119556007c77470945&chksm=ea94d151dde358475949686106ffda48f20b2277be8244ea9fb4fbf20202a0081402fb378520&scene=21#wechat_redirect)  
  
  
  
  
**原文链接**  
  
  
https://www.bleepingcom  
puter.com/news/security/google-warns-of-actively-exploited-pixel-firmware-zero-day/  
  
  
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
