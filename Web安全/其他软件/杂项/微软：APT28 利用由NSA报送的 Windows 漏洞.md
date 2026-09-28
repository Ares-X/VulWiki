---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  微软：APT28 利用由NSA报送的 Windows 漏洞   
Sergiu Gatlan  代码卫士   2024-04-24 17:33  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Az5ZsrEic9ot90z9etZLlU7OTaPOdibteeibJMMmbwc29aJlDOmUicibIRoLdcuEQjtHQ2qjVtZBt0M5eVbYoQzlHiaw/640?wx_fmt=gif "")  
  
   
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
**微软提醒称，俄罗斯 APT28 威胁组织利用 Windows Print Spooler 漏洞 (CVE-2022-38028)，通过此前未知的黑客工具 GooseEgg提升权限，窃取凭据和数据。**  
  
  
  
APT 28 黑客组织被指“至少从2020年6月，甚至早在2019年4月就开始”利用CVE-2022-38028。该漏洞由美国国家安全局 (NSA) 报送，微软在2022年10月补丁星期二中修复了该漏洞并将其标记为已遭活跃利用状态。  
  
APT 28黑客组织被认为是俄罗斯格鲁乌26165部队的一部分，它利用 GooseEgg 发动并部署额外的恶意 payload 并以系统级别权限运行多种命令。微软发现该组织将这款攻陷后工具以Windows批量脚本的方式释放，该脚本名为 “execute.bat” 或 “doit.bat”，它启动 GooseEgg 可执行文件并通过添加启动第二个写入磁盘的批量脚本 “servtask.bat” 的调度任务的方式，在受陷系统上获得可持久性。他们还使用 GooseEgg 工具，以系统权限在 PrintSpooler 服务上下文中释放嵌入式恶意 DLL 文件（在某些情况下被称为 “wayzgoose23.dll）。该DLL实际上是一款app启动器，可以系统权限执行其它 payload，并使攻击者部署后门，在受害者网络中横向移动并在受陷系统上运行远程代码。  
  
微软解释称，“微软发现 Forest Blizzard 将 GooseEgg 作为攻陷后活动的一部分，攻击乌克兰、西欧和北美政府、非政府、教育和交通行业的组织机构。虽然 GooseEgg 是一款简单的启动器应用，但它能够通过提升后的权限扩展到其它应用，从而使攻击者能够支持其它目标如远程代码执行、安装后门并在受陷网络中横向移动。”  
  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/oBANLWYScMSianADFLZU5tJKhtIQ6c2dqHLuxNUKhXJzzXwTBE4W1V3AGCY6KhFUdtAygiaz0RrftWF3ibRUqdBicA/640?wx_fmt=gif&from=appmsg "")  
  
  
**高级别网络攻击的历史**  
  
  
APT28是一个引人注目的俄罗斯黑客组织，出现于2000年代中期，负责执行很多高级别网络攻击活动。  
  
例如，一年前，英美情报服务提醒称APT28利用思科路由器0day漏洞部署 Jaguar Tooth 恶意软件，从位于美国和欧洲的目标中窃取敏感信息。今年2月，FBI、NSA和国际合作伙伴发布联合公告提到，APT28入侵Ubiquiti EdgeRouters 躲避检测。该组织还被指攻击德国联邦议会，并在2016年美国总统大选仟攻击DCCC和DNC。此事件发生两年后，美国起诉APT28成员参与DNC和DCCC攻击，而欧盟议会也在2020年10月就APT28入侵德国联邦议会而对其实施制裁。****  
  
  
代码卫士试用地址：  
https://codesafe.qianxin.com  
  
开源卫士试用地址：https://oss.qianxin.com  
  
  
  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[思科修复NSA报告的Nexus 交换机DoS漏洞及其它](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247510695&idx=1&sn=da7795df8f962875e609dd7e50c9a252&chksm=ea949bcddde312db301ce4da914f0a7e952a3c9d4c28c36fc633b62e29af6ee0dcadb66de899&scene=21#wechat_redirect)  
  
  
[速修复！NSA 报告四个严重和高危 Exchange Server RCE 漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247503429&idx=3&sn=258d4ea2ebb328ce34861023e6dca512&chksm=ea94ff2fdde37639d050f3632496fd90b57a181ef2fed50c23016a779308ed24e17794ef887b&scene=21#wechat_redirect)  
  
  
[NSA公开了91%的0day漏洞 剩下的自己留着](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247485852&idx=5&sn=7dba8bcd581b03c4fe017ff614cc3866&chksm=ea9738f6dde0b1e05296e60e7766c44a9b39c50e4634145e51772faf115932b89ccfd0d964c2&scene=21#wechat_redirect)  
  
  
[俄罗斯黑客组织APT 28和 TA505 最新动态](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247492564&idx=3&sn=c1c7a48735752002b01d719610cb0d25&chksm=ea94d2bedde35ba86805cd5ba84b0927e4bcdd077aa5afdf5aabcbefc798a09c1612ada6cfcd&scene=21#wechat_redirect)  
  
  
[微软4月补丁星期二值得关注的漏洞：4个0day及更多](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247519261&idx=1&sn=1f669e17acccbb5f3a974c466686d164&chksm=ea94bd77dde334619c916fa753497a102ad012bb069cba0cc174d147abf2488f2e649f7953f7&scene=21#wechat_redirect)  
  
  
  
  
  
**原文链接**  
  
  
https://www.bleepingcomputer.com/news/security/microsoft-russian-apt28-hackers-exploit-windows-flaw-reported-by-nsa-using-gooseegg-tool/  
  
  
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
