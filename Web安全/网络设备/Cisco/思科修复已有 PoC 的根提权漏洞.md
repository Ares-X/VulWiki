---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  思科修复已有 PoC 的根提权漏洞   
Sergiu Gatlan  代码卫士   2024-09-05 17:24  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Az5ZsrEic9ot90z9etZLlU7OTaPOdibteeibJMMmbwc29aJlDOmUicibIRoLdcuEQjtHQ2qjVtZBt0M5eVbYoQzlHiaw/640?wx_fmt=gif "")  
  
   
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
**思科已修复 PoC 已公开的一个命令注入漏洞 (CVE-2024-20469)，它可导致攻击者在易受攻击系统上的权限提升至根。**  
  
  
该漏洞位于思科的身份服务引擎 (ISE) 解决方案中。ISE 是基于身份的网络访问控制和策略执行软件，供用户在企业环境中进行网络设备管理和端点访问控制。  
  
该OS命令注入漏洞是由对用户提供输入的验证不充分导致的。本地攻击者可通过在复杂度低的无需用户交互的攻击中提交恶意构造CLI命令的方式利用该漏洞。然而，正如思科解释的那样，威胁行动者只有在未修复系统上已经拥有管理员权限的前提下才能成功利用该漏洞。  
  
思科在本周三发布的安全公告中提到，“思科ISE的特定CLI命令中存在一个漏洞，可导致认证的本地攻击者在底层操作系统上执行命令注入攻击并将权限提升至根。思科产品安全应急响应团队发现已存在针对公告中所提漏洞的 PoC 利用代码。”  
<table><thead><tr><td valign="top" style="border-color: rgb(29, 54, 82);background: rgb(238, 238, 238);" width="225"><p style="text-align:center;margin-bottom: 15px;margin-left: 5px;margin-right: 5px;text-indent: 0em;"><span style="font-size: 15px;letter-spacing: 1px;"><strong><span style="color: rgb(51, 51, 51);font-family: Arial, sans-serif;">Cisco ISE </span></strong><strong><span style="color: rgb(51, 51, 51);font-family: 宋体;">发布</span></strong></span></p></td><td valign="top" style="border-top-color: rgb(29, 54, 82);border-right-color: rgb(29, 54, 82);border-bottom-color: rgb(29, 54, 82);border-left: none;background: rgb(238, 238, 238);" width="201"><p style="text-align:center;margin-bottom: 15px;margin-left: 5px;margin-right: 5px;text-indent: 0em;"><span style="font-size: 15px;letter-spacing: 1px;"><strong><span style="color: rgb(51, 51, 51);font-family: 宋体;">首次修复的发布</span></strong></span></p></td></tr></thead><tbody><tr><td valign="top" style="border-right-color: rgb(29, 54, 82);border-bottom-color: rgb(29, 54, 82);border-left-color: rgb(29, 54, 82);border-top: none;" width="225"><p style="text-align:left;margin-bottom: 15px;margin-left: 5px;margin-right: 5px;text-indent: 0em;"><span style="font-size: 15px;letter-spacing: 1px;"><span style="color: rgb(51, 51, 51);font-family: Arial, sans-serif;">3.1 </span><span style="color: rgb(51, 51, 51);font-family: 宋体;">及更早版本</span></span></p></td><td valign="top" style="border-top: none;border-left: none;border-bottom-color: rgb(29, 54, 82);border-right-color: rgb(29, 54, 82);" width="201"><p style="text-align:left;margin-bottom: 15px;margin-left: 5px;margin-right: 5px;text-indent: 0em;"><span style="color: rgb(51, 51, 51);font-size: 15px;letter-spacing: 1px;font-family:宋体;">不受影响</span></p></td></tr><tr><td valign="top" style="border-right-color: rgb(29, 54, 82);border-bottom-color: rgb(29, 54, 82);border-left-color: rgb(29, 54, 82);border-top: none;" width="225"><p style="text-align:left;margin-bottom: 15px;margin-left: 5px;margin-right: 5px;text-indent: 0em;"><span style="color: rgb(51, 51, 51);font-size: 15px;letter-spacing: 1px;font-family:Arial, sans-serif;">3.2</span></p></td><td valign="top" style="border-top: none;border-left: none;border-bottom-color: rgb(29, 54, 82);border-right-color: rgb(29, 54, 82);" width="201"><p style="text-align:left;margin-bottom: 15px;margin-left: 5px;margin-right: 5px;text-indent: 0em;"><span style="font-size: 15px;letter-spacing: 1px;"><span style="color: rgb(51, 51, 51);font-family: Arial, sans-serif;">3.2P7</span><span style="color: rgb(51, 51, 51);font-family: 宋体;">（</span><span style="color: rgb(51, 51, 51);font-family: Arial, sans-serif;">2024</span><span style="color: rgb(51, 51, 51);font-family: 宋体;">年</span><span style="color: rgb(51, 51, 51);font-family: Arial, sans-serif;">9</span><span style="color: rgb(51, 51, 51);font-family: 宋体;">月）</span></span></p></td></tr><tr><td valign="top" style="border-right-color: rgb(29, 54, 82);border-bottom-color: rgb(29, 54, 82);border-left-color: rgb(29, 54, 82);border-top: none;" width="225"><p style="text-align:left;margin-bottom: 15px;margin-left: 5px;margin-right: 5px;text-indent: 0em;"><span style="color: rgb(51, 51, 51);font-size: 15px;letter-spacing: 1px;font-family:Arial, sans-serif;">3.3</span></p></td><td valign="top" style="border-top: none;border-left: none;border-bottom-color: rgb(29, 54, 82);border-right-color: rgb(29, 54, 82);" width="201"><p style="text-align:left;margin-bottom: 15px;margin-left: 5px;margin-right: 5px;text-indent: 0em;"><span style="font-size: 15px;letter-spacing: 1px;"><span style="color: rgb(51, 51, 51);font-family: Arial, sans-serif;">3.3P4</span><span style="color: rgb(51, 51, 51);font-family: 宋体;">（</span><span style="color: rgb(51, 51, 51);font-family: Arial, sans-serif;">2024</span><span style="color: rgb(51, 51, 51);font-family: 宋体;">年</span><span style="color: rgb(51, 51, 51);font-family: Arial, sans-serif;">10</span><span style="color: rgb(51, 51, 51);font-family: 宋体;">月）</span></span></p></td></tr><tr><td valign="top" style="border-right-color: rgb(29, 54, 82);border-bottom-color: rgb(29, 54, 82);border-left-color: rgb(29, 54, 82);border-top: none;" width="225"><p style="text-align:left;margin-bottom: 15px;margin-left: 5px;margin-right: 5px;text-indent: 0em;"><span style="color: rgb(51, 51, 51);font-size: 15px;letter-spacing: 1px;font-family:Arial, sans-serif;">3.4</span></p></td><td valign="top" style="border-top: none;border-left: none;border-bottom-color: rgb(29, 54, 82);border-right-color: rgb(29, 54, 82);" width="201"><p style="text-align:left;margin-bottom: 15px;margin-left: 5px;margin-right: 5px;text-indent: 0em;"><span style="color: rgb(51, 51, 51);font-size: 15px;letter-spacing: 1px;font-family:宋体;">不受影响</span></p></td></tr></tbody></table>  
  
截止到目前，思科并未发现该漏洞在野利用的证据。  
  
思科在今天提醒客户称已删除Smart Licensing Utility （智能许可工具）Windows 软件中的一个后门账户，可被攻击者用于以管理员权限登录未修复系统。  
  
4月份，思科发布 Integrated Management Controller（IMC，集成管理控制器）漏洞CVE-2024-20295的安全补丁。该漏洞的 PoC 已存在，可导致本地攻击者将权限提升至根。另外一个严重漏洞 (CVE-2024-20401) 可导致威胁行动者们添加恶意根用户并通过恶意邮件使安全邮件网关 (SEG) 设备崩溃，已在上个月修复。就在同一周，思科提醒用户注意，易受攻击的Cisco Smart Software Manager On-Prem（Cisco SSM On-Prem，思科本地智能软件管理器）许可服务器中存在一个满分漏洞，可导致攻击者修改任何用户密码，包括管理员密码在内。  
  
  
代码卫士试用地址：  
https://codesafe.qianxin.com  
  
开源卫士试用地址：https://oss.qianxin.com  
  
  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[思科修复由NSA报送的两个高危漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247520566&idx=1&sn=74a7817b3955a25dccb8da1009e1b185&chksm=ea94a05cdde3294ad5842ade4355f86f5346f7c319e2260c6999b9fc84577eeff1b3f257c0f3&scene=21#wechat_redirect)  
  
  
[思科：注意这些已达生命周期IP电话中的RCE 0day](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247520401&idx=2&sn=bad61fd4a7dd0064d773564100fa0d93&chksm=ea94a1fbdde328ed9792a7787f0942bd8375dfb3d8e89c5d0413c4d48ad449acff958b59a1b2&scene=21#wechat_redirect)  
  
  
[思科严重漏洞可导致黑客在SEG设备上添加 root 用户](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247520104&idx=2&sn=7a044b182ec50064eba8b67fb588a968&chksm=ea94be02dde33714a87ec047348cf4004a40a24f05ca079479dd287aec723a3790919198933e&scene=21#wechat_redirect)  
  
  
[思科 SSM 本地漏洞可用于修改任意用户的密码](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247520092&idx=1&sn=2c708cd0c74c042942553df613872635&chksm=ea94be36dde33720d8a6f9c9e9a9916bd1d19d05920d0f2d2081b29cbced7d6cf15ffee76430&scene=21#wechat_redirect)  
  
  
[德国政府会议信息遭泄露，思科修复 Webex 漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247519685&idx=3&sn=5ff2515ea003efe342365bfb3e9d8af7&chksm=ea94bcafdde335b9fed2634f43fe71bf14953a3fbc06a298ce9ac436a576ce39e6b2dfa25269&scene=21#wechat_redirect)  
  
  
  
  
  
**原文链接**  
  
  
https://www.bleepingcomputer.com/news/security/cisco-fixes-root-escalation-vulnerability-with-public-exploit-code/  
  
  
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
