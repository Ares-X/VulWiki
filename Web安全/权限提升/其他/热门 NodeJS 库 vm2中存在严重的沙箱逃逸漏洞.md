---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  热门 NodeJS 库 vm2中存在严重的沙箱逃逸漏洞  
Bill Toulas
                    Bill Toulas  代码卫士   2026-01-28 10:25  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Az5ZsrEic9ot90z9etZLlU7OTaPOdibteeibJMMmbwc29aJlDOmUicibIRoLdcuEQjtHQ2qjVtZBt0M5eVbYoQzlHiaw/640?wx_fmt=gif "")  
    
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
**Node.js****沙箱库vm2中存在一个严重漏洞CVE-2026-22709可导致攻击者逃逸沙箱限制，在底层主机系统上执行任意代码。**  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/oBANLWYScMQx0S45vPZK90d0XNJZ5yjIq2qrNB5B40WpOib6lYg2JMwSwv7k9TMk0HFeJ0e81M5ssO6xvSSBicVw/640?wx_fmt=gif&from=appmsg "")  
  
  
vm2作为一个开源库，旨在为用户执行无法访问文件系统的不可信JavaScript代码创建一个安全的执行环境。该库曾广泛应用于支持用户脚本执行的SaaS平台、在线代码运行器、聊天机器人及开源项目中，在GitHub上被超过20万个项目所使用。然而，由于反复出现沙箱逃逸漏洞，该项目已于2023年停止维护，官方认定其不再适合用于运行不可信代码。  
  
去年十月，项目维护者 Patrik Šimek 决定重启vm2项目，并发布了修复了当时已知所有漏洞的3.10.0版本，且"仍可向下兼容至Node 6版本"。该库在npm平台上依然广受欢迎，过去一年每周下载量持续保持在约一百万次左右。  
  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/oBANLWYScMQx0S45vPZK90d0XNJZ5yjI2IWOMDxJNRntMY3QYLeJCKMib0bnvc20qHqg2fKMp3vT4L3icjerIYbg/640?wx_fmt=gif&from=appmsg "")  
  
**净化机制缺陷**  
  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/oBANLWYScMQx0S45vPZK90d0XNJZ5yjI2IWOMDxJNRntMY3QYLeJCKMib0bnvc20qHqg2fKMp3vT4L3icjerIYbg/640?wx_fmt=gif&from=appmsg "")  
  
  
  
最新漏洞源于vm2未能正确沙箱化处理"Promise"组件——该组件负责处理异步操作以确保代码执行被限制在隔离环境内。虽然vm2对其内部Promise实现所附加的回调函数进行了净化处理，但异步函数返回的是全局Promise对象，其.then()和.catch()回调函数未能得到妥善净化。  
  
项目维护者指出：“在3.10.0版本的vm2中，攻击者可绕过Promise.prototype.then与Promise.prototype.catch回调函数的净化机制。”并补充提到，"这使得攻击者能够突破沙箱限制并执行任意代码。"  
  
据开发者表示，CVE-2026-22709沙箱逃逸漏洞在vm2的3.10.1版本中已得到部分修复，而在随后的3.10.2更新中，开发者进一步强化了修复方案以防止潜在的绕过利用。开发者还公开了演示代码，展示攻击者如何在vm2沙箱中触发CVE-2026-22709漏洞实现沙箱逃逸，进而在主机系统上执行命令。鉴于该漏洞在受影响的vm2版本中极易被利用，建议用户尽快升级至最新版本。  
  
此前在vm2中已报告过多个严重的沙箱逃逸漏洞，包括由Oxeye公司研究人员披露的CVE-2022-36067。利用该漏洞可使攻击者突破隔离环境，在主机系统上运行命令。2023年4月，另一个同类漏洞CVE-2023-29017也被发现，相关漏洞利用代码随之公开。同月下旬，研究员SeungHyun Lee发布了影响vm2的另一个严重沙箱逃逸漏洞CVE-2023-30547的利用代码。  
  
项目维护者Šimek表示，目前最新的3.10.3版本“已妥善修复所有已披露的漏洞”。  
  
****  
 开源  
卫士试用地址：  
https://oss.qianxin.com/#/login  
  
  
 代码卫士试用地址：https://sast.qianxin.com/#/login  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[下载量达数百万次的NodeJS 模块被曝代码注入漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247494438&idx=1&sn=b539f92e55d24b452d4987c909554887&scene=21#wechat_redirect)  
  
  
[开源的Judge0 中存在多个沙箱逃逸漏洞，可导致系统遭完全接管](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247519400&idx=2&sn=e79b7a5da52b70449d7f2d6c99c8cab2&scene=21#wechat_redirect)  
  
  
[VMware修复多个严重的ESXi 沙箱逃逸漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247519003&idx=2&sn=c494f1df6adfe5a6b91c813d2d236c8c&scene=21#wechat_redirect)  
  
  
[Mozilla 修复Firefox 漏洞，可导致RCE和沙箱逃逸](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247518467&idx=2&sn=a4b556d25e18fde4859318143fe831f9&scene=21#wechat_redirect)  
  
  
[P2PInfect 蠕虫利用 Lua 沙箱逃逸满分漏洞攻击 Redis 服务器](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247517155&idx=3&sn=99559d56c27bee18a974051b96af05ae&scene=21#wechat_redirect)  
  
  
  
  
  
**原文链接**  
  
https://www.bleepingcomputer.com/news/security/critical-sandbox-escape-flaw-discovered-in-popular-vm2-nodejs-library/  
  
  
题图：Pixa  
bay Licens  
e  
  
  
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
