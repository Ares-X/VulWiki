---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  Oracle 修复已遭利用的 Agile PLM 0day   
Ionut Arghire  代码卫士   2024-11-21 09:35  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Az5ZsrEic9ot90z9etZLlU7OTaPOdibteeibJMMmbwc29aJlDOmUicibIRoLdcuEQjtHQ2qjVtZBt0M5eVbYoQzlHiaw/640?wx_fmt=gif "")  
  
   
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
**本周，Oracle 修复了位于 Agile 产品生命周期管理 (PLM) 中的、已遭利用的高危信息泄露漏洞CVE-2024-21287（CVSS评分7.5）。**  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/oBANLWYScMTccTGabC2JicXk7sicdS39K3GhgFrIY5gly7zSwRMXpeZw8135NjhrgO9CeWPmLiboLHAmBCbiboickPw/640?wx_fmt=gif&from=appmsg "")  
  
  
该漏洞影响 Agile PLM 9.3.6版本，可在未认证的情况下遭远程利用。Oracle 在安全公告中致谢报送该漏洞的CrowdStrike公司研究员 Snape 和 Lutz Wolf，而 Oracle 安全保证副总裁 Eric Maurice 披露称发现该漏洞已遭在野利用。  
  
Maurice 表示，“如遭成功利用，未认证的攻击者可从目标系统下载PLM应用权限可访问的文件。”  
  
Oracle 公司表示，具有对 HTTP 协议网络访问权限的远程未认证攻击者，可轻松利用 CVE-2024-21287访问关键数据或者对 Agile PLM Framework 所有可访问数据获得完整的访问权限。该公司在安全公告中提到，“Oracle 强烈建议客户尽快应用该安全告警中提供的更新。”  
  
Oracle 或 CrowdStrike 公司均未分享该漏洞的技术详情以及在野观察到的利用信息。目前为止，这两家公司均未回复相关问询。  
  
Agile PLM大约在20年前推出，为组织机构团队提供产品数据和流程管理协作能力。2024年4月，Oracle 公司表示将弃用该产品，在2027年12月31日结束对该产品的付费支持服务。  
  
  
代码卫士试用地址：  
https://codesafe.qianxin.com  
  
开源卫士试用地址：https://oss.qianxin.com  
  
  
  
  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[Oracle Fusion 中间件漏洞已遭在野利用](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247514824&idx=1&sn=3fd1913ac46de09f233cf839e57a61d1&chksm=ea948ba2dde302b4e0977f923e129a7f7380d2b6b1419732de8244e5542322e17d41a6242396&scene=21#wechat_redirect)  
  
  
[Pwn2Own 大赛赐我灵感，让我发现仨Oracle VirtualBox 漏洞，其中俩提权](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247509396&idx=1&sn=09b11f725ded56f10eeadd369fc07c50&chksm=ea9494fedde31de8931022db99114fb8daa81e316236072167a1c183754fbf4da77c1d671e44&scene=21#wechat_redirect)  
  
  
[Oracle 警告：Weblogic 服务器中含有多个可遭远程利用的严重漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247506536&idx=2&sn=68965a70130088ebfe03c8e0bf0a6557&chksm=ea94eb02dde36214b398993f4522a730741a4d7de798294e42de3ed6944a7b8f901e066b3047&scene=21#wechat_redirect)  
  
  
[朝鲜黑客被指从黑市购买Oracle Solaris 0day，入侵企业网络](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247496657&idx=2&sn=27658cff17f89a0c1f5e185c4bd67a56&chksm=ea94c2bbdde34badf6d540a96b351fcb3be1fa6e2ee4b3d009ab07196ec71ab4a302c1448f3b&scene=21#wechat_redirect)  
  
  
[奇安信代码卫士帮助微软和 Oracle 修复多个高危漏洞，获官方致谢](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247494066&idx=1&sn=b5425e8a3cdf93914c19274f0a915ab6&chksm=ea94d8d8dde351ceecd5b097ba4104962025df723ffa5a7f6a314d083e63c92a2f3bac5ae892&scene=21#wechat_redirect)  
  
  
  
  
  
**原文链接**  
  
  
https://www.securityweek.com/oracle-patches-exploited-agile-plm-zero-day/  
  
  
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
