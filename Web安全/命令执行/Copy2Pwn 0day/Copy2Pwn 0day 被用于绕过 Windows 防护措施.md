---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  Copy2Pwn 0day 被用于绕过 Windows 防护措施   
Eduard Kovacs  代码卫士   2024-08-19 17:26  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Az5ZsrEic9ot90z9etZLlU7OTaPOdibteeibJMMmbwc29aJlDOmUicibIRoLdcuEQjtHQ2qjVtZBt0M5eVbYoQzlHiaw/640?wx_fmt=gif "")  
  
   
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
**趋势科技ZDI详述了一个最近修复的且被网络犯罪分子用于绕过 Windows 防护措施的0day 漏洞 (CVE-2024-38213) 详情。**  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/oBANLWYScMR7fwO4wa9vkj7xic3kJvt1iaic86s5ibtY0cqZksksd3b1bs8m9tFVW3tsnOf6cOhgib5V1wricgOJN3gg/640?wx_fmt=gif&from=appmsg "")  
  
  
该漏洞被 ZDI 称为 “Copy2Own”，由微软在2024年6月修复，但ZDI在微软发布8月补丁星期二之后才披露。  
  
ZDI 威胁捕获团队在分析由名为 Water Hydra 和 DarkCasino 的一个威胁团伙发动的攻击活动 DarkGate 时发现了该漏洞。该威胁团伙此前曾利用该漏洞绕过旨在获得经济利益的 Windows 防护措施。微软指出，该漏洞可被用于绕过Defender SmartScreen，而它用于保护 Windows 用户免受钓鱼攻击、恶意软件和其它从互联网下载的潜在恶意文件影响。  
  
Copy2Own 漏洞与在复制粘贴操作过程中如何处理 WebDAV 分享的文件有关。WebDAV即“基于Web的分布式授权和版本控制”，延伸了 HTTP 功能，包括授权、分享和版本控制。用户可在 WebDAV 分享上托管文件。当Windows用户从 web 下载文件时，该文件被分配 MotW，在文件被打开时触发额外的安全检查，包括 Defender SmartScreen 和 Office 受保护视图。  
  
网络犯罪分子注意到，从 WebDAV 分享中复制和粘贴的文件并未获得 MotW。ZDI解释称，“这意味着用户从 WebDAV 分享将文件粘贴和复制到桌面，而之后这些文件可在不受Windows Defender SmartScreen 或微软 Office 受保护视图的保护下被打开。具体而言，这意味着可执行文件不会获得声誉或签名方面的检查。”  
  
  
代码卫士试用地址：  
https://codesafe.qianxin.com  
  
开源卫士试用地址：https://oss.qianxin.com  
  
  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[【利用场景更新】Windows TCP/IP IPv6远程拒绝服务/代码执行漏洞(CVE-2024-38063)安全风险通告](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247520507&idx=1&sn=e6e47b92dd8197ca7619e46204cd615d&chksm=ea94a191dde3288755f5a94855a167362c77297344a3a5d57101da16165db6ba956165bc24d8&scene=21#wechat_redirect)  
  
  
[【Black Hat】将已修复漏洞统统变0day！Windows更新缺陷可引发不可检测的降级攻击](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247520485&idx=1&sn=f53184c4342e8e2616d7fa33402732dd&chksm=ea94a18fdde328991c258a6a0ea366cac853ca1b16610ff865ac811e679324717a8d49adad8b&scene=21#wechat_redirect)  
  
  
[恶意软件攻击Windows、Linux 和 macOS 开发人员](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247520290&idx=2&sn=0dff9cae5a9ad1a39be2e6da027f70a9&chksm=ea94a148dde3285e6c15219e90179e8424cf1b202221d471b6c705e4dba7127f593b4fd64b80&scene=21#wechat_redirect)  
  
  
[CrowdStrike：测试软件中的bug导致Windows蓝屏死机](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247520213&idx=1&sn=315d12b373fb85e4b9c485117694c9ba&chksm=ea94bebfdde337a9f3363ba26a417ed880bf76dfe5272e2a144943353fd1efa9eb8002fe613a&scene=21#wechat_redirect)  
  
  
[我们仔细分析了使数百万Windows 蓝屏死机的CrowdStrike代码](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247520194&idx=1&sn=8b7005cae90d257d5bb3feff7e6a7434&chksm=ea94bea8dde337be4a06359bee3c3f03fbe5d237fc4b37d86075295fbe2ce7932397fb5fbae4&scene=21#wechat_redirect)  
  
  
  
  
**原文链接**  
  
  
  
https://www.securityweek.com/copy2pwn-zero-day-exploited-to-bypass-windows-protections/  
  
  
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
