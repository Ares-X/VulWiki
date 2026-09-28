---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  谷歌紧急修复已遭活跃利用的新 0day   
Sergiu Gatlan  代码卫士   2023-09-28 13:25  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Az5ZsrEic9ot90z9etZLlU7OTaPOdibteeibJMMmbwc29aJlDOmUicibIRoLdcuEQjtHQ2qjVtZBt0M5eVbYoQzlHiaw/640?wx_fmt=gif "")  
  
   
聚焦源代码安全，网罗国内外最新资讯！****  
  
**编译：代码卫士**  
  
**谷歌今天紧急修复了2023年以来第五个已遭利用的新 0day (CVE-2023-5217)。**  
  
  
  
谷歌发布安全公告指出，“谷歌发现CVE-2023-5217的一个利用已在野出现。”该漏洞已在Google Chrome 117.0.5938.132中修复，并为全球 Stable Desktop 渠道中的Windows、Mac 和 Linux 用户推出。  
  
虽然安全公告指出，将花费数天或数周的时间才能将已打补丁版本推给所有用户，但实际上该更新已立即可用。Chrome 将在下一次启动时自动检查新更新是否存在并自动安装。  
  
  
**已被用于监控攻击中**  
  
  
  
  
这个高危0day 是由开源 libvpx 视频codec 库中的VP8 编码中的堆缓冲区溢出漏洞引发的，该漏洞可导致应用崩溃、任意代码执行等后果。  
  
该漏洞是由谷歌威胁分析团队 (TAG) 安全研究员 Clément Lecigne 在9月25日发现并报送的。TAG 团队素以发现受政府支持的威胁行动者和黑客组织利用0day 攻击记者和反对党派而为人所知。  
  
谷歌 TAG 团队的研究员 Maddie Stone 表示该漏洞用于安装监控软件。  
  
谷歌TAG 还与公民实验室在上周五发现了苹果产品中的三个0day 漏洞被用于安装 Cytrox 的 Predator 监控软件。  
  
尽管TAG 表示CVE-2023-5217 已遭在野利用，但并未披露更多详情，以便为用户争取更多修复时间，缓解威胁行动者创建自己的 exploit 并在真实场景中部署。  
  
两周前，谷歌还修复了另外一个已遭利用的0day (CVE-2023-4863)。Chrome 后来将该漏洞分配了另外一个编号CVE-2023-5129，且评级为满分漏洞，将其视作 libwebp 中的一个严重漏洞。  
  
  
  
代码卫士试用地址：  
https://codesafe.qianxin.com  
  
开源卫士试用地址：https://oss.qianxin.com  
  
  
  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[数千台未修复 Openfire XMPP 服务器仍易受高危漏洞影响](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247517466&idx=1&sn=56ec3d83af97ad62084124c205e2349b&chksm=ea94b470dde33d66e66beaa6ad53e44d25babf2e6c0517f8b86135be8ba15399ba13dcea6b78&scene=21#wechat_redirect)  
  
  
[索尼所有系统再遭勒索攻击](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247517746&idx=2&sn=e94509cd28703e663d3e8a24d26f2b1c&chksm=ea94b758dde33e4ec48eabdc2e3da5a379ae98d58dcd8f0b3f6f928c12e7e0f5b6bbd0ad25bd&scene=21#wechat_redirect)  
  
  
[严重漏洞可导致TeamCity CI/CD 服务器遭接管](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247517746&idx=1&sn=0075949af101ed923a30865094aa5b5f&chksm=ea94b758dde33e4eed497321fbcde1b5e775602f446cd3c4b5bbc8d0aba92f2bfb4067686bca&scene=21#wechat_redirect)  
  
  
[黑客利用 MinIO 存储系统漏洞攻陷服务器](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247517551&idx=2&sn=8ffd41e1e450dfc4af6a55aa0de56c8f&chksm=ea94b405dde33d1371b97b39c7238f48c9e1e675f37dbcae210f7f4f982b1f61f702d9f67ba4&scene=21#wechat_redirect)  
  
  
[开源的IT监控软件Icinga web 中存在两个漏洞，可被用于攻陷服务器](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247511800&idx=1&sn=0f335367280974447c6dea4d856bc39b&chksm=ea949f92dde31684607d46322cc43b6250fcfe1d328aee28eae6304ec2e5d82577b9209cd75e&scene=21#wechat_redirect)  
  
  
  
  
**原文链接**  
  
  
https://www.bleepingcomputer.com/news/security/hackers-actively-exploiting-openfire-flaw-to-encrypt-servers/  
  
  
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
