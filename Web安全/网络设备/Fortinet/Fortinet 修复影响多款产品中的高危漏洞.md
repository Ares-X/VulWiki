---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  Fortinet 修复影响多款产品中的高危漏洞   
Ionut Arghire  代码卫士   2023-09-19 17:47  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Az5ZsrEic9ot90z9etZLlU7OTaPOdibteeibJMMmbwc29aJlDOmUicibIRoLdcuEQjtHQ2qjVtZBt0M5eVbYoQzlHiaw/640?wx_fmt=gif "")  
  
   
聚焦源代码安全，网罗国内外最新资讯！****  
  
**编译：代码卫士**  
  
**Fortinet公司修复了影响多个 FortiOS 和 FortiProxy 版本中的一个高危XSS 漏洞 (CVE-2023-29183)。**  
  
  
![](https://mmbiz.qpic.cn/mmbiz_png/oBANLWYScMTap9prq49883yN1Ee9PdaictnAyk7fD3owREA6a9WVlV3Yg3icyrQq2uDzrO8j4ztt5D4JfoBDmoBQ/640?wx_fmt=png "")  
  
  
该漏洞是“在网页生成过程中的处理不当”问题，CVSS 评分为7.3分，如遭成功利用，可导致认证攻击者使用构造的guest 管理设置触发恶意JavaScript 代码执行。  
  
该漏洞由Fortinet 的CSE 团队发现，影响 FortiProxy 版本 7.0.x和7.2.x以及 FortiOS 版本 6.2.x、6.4.x、7.0.x和7.2.x版本。Fortinet 公司已在 FortiProxy 版本7.0.11和7.2.5以及 FortiOS 版本6.2.15、6.4.13、7.0.12、7.2.5和7.4.0中修复。  
  
Fortinet 公司还发布补丁修复了位于 web 应用防火墙和API 防护解决方案 FortiWeb 中的一个高危漏洞（CVE-2023-34984，CVSS 评分7.1）。该漏洞可导致攻击者绕过已有的XSS和CSRF防护措施。Fortinet 公司指出，该漏洞影响 FortiWeb 版本6.3、6.4、7.0、x和7.2.x，并在FortiWeb版本7.0.7和7.2.2中修复。  
  
建议Fortinet 用户尽快更新其防火墙和交换机。虽然该并未提到这些漏洞是否遭利用，但Fortinet设备中的漏洞此前曾在野用于获得对企业网络的访问权限。  
  
CISA提醒称，利用这些漏洞可导致系统遭完全攻陷，并建议管理人员查看Fortinet 公司的安全公告并应用必要更新。CISA提到，“网络威胁行动者可利用其中一个漏洞控制受影响系统”。****  
  
  
代码卫士试用地址：  
https://codesafe.qianxin.com  
  
开源卫士试用地址：https://oss.qianxin.com  
  
  
  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[Fortinet：速修复 FortiOS、FortiProxy 设备中的严重RCE漏洞！](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247517034&idx=2&sn=0e6034be825eac879386635841578fa0&chksm=ea94b200dde33b16e5b00a74e6327aca06b3192a6c9501d14cc86edab7c248c3044a44ff1a9c&scene=21#wechat_redirect)  
  
  
[Fortinet 修复严重的 FortiNAC 远程命令执行漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247516818&idx=3&sn=7524bc2288375bbf06f9574e73e15a00&chksm=ea94b3f8dde33aeeeb1313ae4cb6608ffa6876baa1ba49cbdac2b97cf5307198a79fd41eed8b&scene=21#wechat_redirect)  
  
  
[Fortinet 修复 Fortigate SSL-VPN 设备中严重的 RCE 漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247516712&idx=1&sn=db056d3f152e8f52867cc5021679e6f1&chksm=ea94b342dde33a543f8d7daaae604ffb6f0a65f865bf3fd926dfee86ad48be7d6460b9107d7d&scene=21#wechat_redirect)  
  
  
[Fortinet 修复FortiADC 和 FortiOS 中的多个高危漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247516406&idx=3&sn=f6d52c7913cb9a7127079a424f287d22&chksm=ea94b19cdde3388a41d9382c14e8649d4db7f27382de8b638a8c2430d9fb7a6e3125a60ceed6&scene=21#wechat_redirect)  
  
  
  
  
**原文链接**  
  
https://www.securityweek.com/fortinet-patches-high-severity-vulnerabilities-in-fortios-fortiproxy-fortiweb-products/  
  
  
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
