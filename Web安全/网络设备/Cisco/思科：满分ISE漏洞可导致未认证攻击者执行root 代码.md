---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  思科：满分ISE漏洞可导致未认证攻击者执行root 代码  
Ravie Lakshmanan  代码卫士   2025-07-17 10:57  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Az5ZsrEic9ot90z9etZLlU7OTaPOdibteeibJMMmbwc29aJlDOmUicibIRoLdcuEQjtHQ2qjVtZBt0M5eVbYoQzlHiaw/640?wx_fmt=gif "")  
    
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
**思科披露了影响ISE和ISE-PIC的一个新的CVSS满分漏洞 CVE-2025-20337，可导致攻击者以提升后的权限在底层操作系统上执行任意代码，类似于思科在上个月修复的CVE-2025-20281。**  
  
![](https://mmbiz.qpic.cn/mmbiz_png/oBANLWYScMScOXNsaicK2wtahXibianJ73Hic5e2O9GFb20xPuFFD8tMvFiad0DZ3zx2kNunziaZ8Miclhic5z7ZvcSafw/640?wx_fmt=png&from=appmsg "")  
  
  
思科在安全公告中提到，“思科 ISE 和 ISE-PIC 的一个API中存在多个漏洞，可导致未认证远程攻击者以 root 权限在底层操作系统上执行任意代码。攻击者无需任何有效凭据即可利用这些漏洞。这些漏洞是因为对用户提供的输入验证不充分导致的。攻击者可提交一个构造的API请求，利用这些漏洞。成功利用可导致攻击者获得受影响设备上的 root 权限。”  
  
GMO Cybersecurity 公司的研究员 Kentaro Kawane 发现并报送了该漏洞。Kawane 此前曾发现了其它两个严重的思科ISE漏洞（CVE-2025-2028和CVE-2025-20282）以及Fortinet FortiWeb 中的另外一个严重漏洞CVE-2025-25257。  
  
CVE-2025-20337影响所有配置类型的 Cisco ISE 和 ISE-PIC 3.3和3.4版本，并不影响3.2或更早版本。该漏洞已分别在3.3 Patch 7 和 3.4 Patch 2中修复。  
  
目前尚未有证据表明该漏洞已遭恶意利用。不过应确保系统是最新版本以免遭潜在威胁。此前不久，Shadowserver Foundation 报道称威胁人员自2025年7月11日起可能正在利用与 CVE-2025-25257有关的利用在可疑的Fortinet FortiWeb 实例上释放 web shell。截止到7月15日，预测有77个受感染实例，低于前一天的85个。多数攻陷事件位于北美（44）、亚洲（14）和欧洲（13）地区。  
  
Censys 数据表明，在线的 Fortinet FortiWeb 设备有20098个（不含蜜罐），但目前尚不清楚这些设备是否易受CVE-2025-25257利用攻击。该平台表示，“该漏洞可导致未认证攻击者通过构造的HTTP请求执行任意SQL命令，从而导致RCE。”  
  
  
开源  
卫士试用地址：  
https://oss.qianxin.com/#/login  
  
  
代码卫士试用地址：https://sast.qianxin.com/#/login  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[思科提醒注意 ISE 中的满分 RCE 漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247523394&idx=1&sn=6155e41bcc07bb70bcdcdd88cc88d8de&scene=21#wechat_redirect)  
  
  
[思科提醒注意严重的 ISE 和 CCP 漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247523184&idx=1&sn=f205e1639e39bac5e3d3496845db4087&scene=21#wechat_redirect)  
  
  
[思科ISE严重漏洞导致攻击者以root权限运行命令](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247522190&idx=2&sn=9702cf83b7bdb3ee94d30829bea9f51b&scene=21#wechat_redirect)  
  
  
[思科 Unified CM 中存在满分漏洞，可用于获得root权限](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247523440&idx=1&sn=82defa4f95ee18fec7fd809f7f565f7a&scene=21#wechat_redirect)  
  
  
  
  
  
**原文链接**  
  
https://thehackernews.com/2025/07/cisco-warns-of-critical-ise-flaw.html  
  
  
题图：  
Pixabay Licen  
se  
  
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
