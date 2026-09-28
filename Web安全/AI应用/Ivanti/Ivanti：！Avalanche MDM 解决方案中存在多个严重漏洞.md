---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  Ivanti：注意！Avalanche MDM 解决方案中存在多个严重漏洞   
Sergiu Gatlan  代码卫士   2024-04-17 16:09  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Az5ZsrEic9ot90z9etZLlU7OTaPOdibteeibJMMmbwc29aJlDOmUicibIRoLdcuEQjtHQ2qjVtZBt0M5eVbYoQzlHiaw/640?wx_fmt=gif "")  
  
   
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
**Ivanti 公司发布安全更新，修复了位于 Avalanche 移动设备管理 (MDM) 解决方案中的27个漏洞，其中两个是严重的堆溢出漏洞，可用于远程命令执行。**  
  
  
  
Avalanche 供企业管理员远程管理和部署软件并从一个中心地址调度超过10万台移动设备的更新。Ivanti 公司在本周三解释称，这两个严重的漏洞（CVE-2024-24996和CVE-2024-29204）位于 Avalanche 的 WLInfoRailService 和 WLAvalancheService 组件中。  
  
这两个漏洞均由基于堆的缓冲溢出漏洞引发，可导致未认证的远程攻击者在无需用户交互的复杂度较低的攻击中，在易受攻击系统上执行任意命令。今天，Ivanti 公司还修复了25个中危和高危漏洞，它们可被远程攻击者用于触发拒绝服务攻击，以系统权限执行任意命令，从内存中读取敏感信息以及发动远程代码执行攻击。  
  
Ivanti 在本周二发布的安全公告中提到，“在公开披露前，我们并未发现客户遭这些漏洞利用攻击的整局。这些漏洞是通过我们负责任的披露计划公开的。为了修复如下所列漏洞，强烈建议用户下载 Avalanche 安装程序并更新至最新的 Avalanche 6.4.3版本。”  
  
Ivanti 曾在去年12月修复了位于 Avalanche MDM 解决方案中的13个更为严重的RCE漏洞，而在去年8月，它修复了两个严重的被统称为 CVE-2023-32560的Avalanche 缓冲溢出漏洞。  
  
一年前，国家黑客组织利用位于 Ivanti 公司EPMM 中的两个0day漏洞（CVE-2023-35078和CVE-2023-35081）攻陷多家挪威政府组织机构。几个月后，攻击者组合利用MobileIron Core 0day 漏洞CVE-2023-35081和CVE-2023-35078黑入挪威十二个部门的IT系统。CISA 在去年八月份提醒称，“移动设备管理 (MDM) 系统是引人注意的目标，因为它们提供了访问数千台移动设备的提升权限，而APT行动者利用了此前的一个 MobileIron 漏洞。为此，CISA和NCSC-NO 担心可能会被大规模用于攻击政府和私营行业网络。”  
  
  
****  
****  
代码卫士试用地址：  
https://codesafe.qianxin.com  
  
开源卫士试用地址：https://oss.qianxin.com  
  
  
  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[产品中又现4个漏洞，Ivanti 宣布安全大检修](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247519242&idx=1&sn=6c9094b038e67aea0f2968fffbb125e0&chksm=ea94bd60dde334764a9154d61f5809e1fd0a977ba3617a96d698def9b968b04b3039d7ecc3b2&scene=21#wechat_redirect)  
  
  
[Ivanti 修复由北约报送的严重漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247519117&idx=1&sn=cde689326429491acd44848ceeacab57&chksm=ea94bae7dde333f1f0011d550d4f6a0c206cfdb62dda27f77ba6e432c6883a80c8ff30be2a51&scene=21#wechat_redirect)  
  
  
[Ivanti 披露两个新0day，其中一个已遭利用](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247518800&idx=2&sn=81cdaabe53353075dd5badd918a3e0cd&chksm=ea94bb3adde3322ca6046c2aa9cb37dedf686efcdd6be90bd63248f23ad20dcc4015a3007149&scene=21#wechat_redirect)  
  
  
[第三个 Ivanti 漏洞已遭利用](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247518721&idx=2&sn=0fecc3da2d3d00906eb9f4f79279a328&chksm=ea94bb6bdde3327dc06586f79bb98cb915165183da490c1b063cf84fb4571cce6ae8e8396b99&scene=21#wechat_redirect)  
  
  
[严重的Ivanti EPM 漏洞可导致黑客劫持已注册设备](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247518594&idx=1&sn=42344cd84f041e0bd0049ef5c7bbdf84&chksm=ea94b8e8dde331fe2a1df497c6a9068b0b510c2924d9229f7c28997fee0d5b1c8a1d81cd78aa&scene=21#wechat_redirect)  
  
  
  
  
**原文链接**  
  
  
https://www.bleepingcomputer.com/news/security/ivanti-warns-of-critical-flaws-in-its-avalanche-mdm-solution/  
  
  
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
