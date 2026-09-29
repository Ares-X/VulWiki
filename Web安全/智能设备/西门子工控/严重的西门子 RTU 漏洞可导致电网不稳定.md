---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  严重的西门子 RTU 漏洞可导致电网不稳定   
Eduard Kovacs  代码卫士   2023-05-08 17:48  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Az5ZsrEic9ot90z9etZLlU7OTaPOdibteeibJMMmbwc29aJlDOmUicibIRoLdcuEQjtHQ2qjVtZBt0M5eVbYoQzlHiaw/640?wx_fmt=gif "")  
  
   
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
**专为能源行业设计的西门子工控系统 (ICS) 中存在一个严重漏洞 (CVE-2023-28489)，可导致恶意黑客破坏电网的稳定性。**  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/oBANLWYScMSwbGPtlJbNlhhxNDQwWAQF8Rr9IzTshMvDYREFiafcDIoVPIOUCdiaiceZYVEHya0V2ib4EdM5xR48ibQ/640?wx_fmt=gif "")  
  
![](https://mmbiz.qpic.cn/mmbiz_png/oBANLWYScMSwbGPtlJbNlhhxNDQwWAQFgUkwoZPXNaEQTwqQlyzwibPqFB7HcPIvL64zbq23IKnrbFe4WufJiakQ/640?wx_fmt=png "")  
  
  
  
该漏洞影响 Sicam A8000 CP-8031和CP-8050 产品的 CPCI85固件，可被未认证攻击者用于执行远程代码。这些产品是专为能源供给行业尤其是变电站设计的远程控制和自动化的远程终端单元 (RTUs)。  
  
目前补丁已在固件版本 CPCI85 V05及后续版本中发布。另外西门子还提到可通过限制对使用防火墙的 TCP 端口80和443 上的 web 服务器访问而降低利用风险。  
  
西门子在4月11日发布安全公告时指出，网络安全咨询公司 SEC Consult 的安全研究团队将漏洞告知西门子。  
  
SEC Consult 漏洞实验室主任 Johannes Griel 表示，能够利用CVE-2023-28489的攻击者能够完全控制设备并导致电网不稳定，甚至通过更改关键的自动化参数而导致停电。攻击者还可利用该漏洞执行后门。然而，该专家提到，多数设备用于关键基础设施环境中，因此通常是受到防火墙的强大保护，无法直接从互联网访问。  
  
Greil 解释称，“尽管如此，无法排除通过第三方支持访问连接或潜在的配置不当问题访问某些设备的可能性。”对目标设备具有网络访问权限的攻击者可利用该漏洞，在无需任何认证的情况下获得完整的根访问权限。利用该漏洞涉及向目标 RTU 发送特殊构造的 HTTP 请求。  
  
美国网络安全和基础设施安全局 (CISA) 也在4月份发布安全公告，将该漏洞告知组织机构。Greil 指出，西门子 Sicam 产品是全球首批得到工业网络安全分类“成熟度级别4”认证的设备。该认证 IEC62443-4-1表明安全是整个设计和开发流程中的一个重要因素，且该产品已经过严格测试。  
  
SEC Consult公司目前尚未发布任何技术详情，以组织恶意黑客滥用。不过该公司指出，在西门子中发现了多个漏洞且正在修复中，补丁推出后将发布一些技术详情。  
  
  
  
****  
![](https://mmbiz.qpic.cn/mmbiz_png/oBANLWYScMQZeSribxs2yU1w56EMvgX9cDBCiabniazxdxtQ25cBCAd5vBJIM2sOv1khjzwwViaT0pS74U6piaiauiaGA/640?wx_fmt=png "")  
  
  
  
代码卫士试用地址：  
https://codesafe.qianxin.com  
  
开源卫士试用地址：https://oss.qianxin.com  
  
  
  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247511052&idx=3&sn=fb116392e405ae62e6c339117fffdb59&chksm=ea949d66dde31470758b6ee8f9dbecdb67ef6c0c8af277f26b83b60dbac95748d28db787a4b4&scene=21#wechat_redirect)  
[奇安信入选全球《软件成分分析全景图》代表厂商](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247515374&idx=1&sn=8b491039bc40f1e5d4e1b29d8c95f9e7&chksm=ea948d84dde30492f8a6c9953f69dbed1f483b6bc9b4480cab641fbc69459d46bab41cdc4859&scene=21#wechat_redirect)  
  
  
[西门子许可管理器中存在两个严重漏洞，可用于攻击ICS网络](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247515512&idx=1&sn=7d39a4d7d874a7b1c041b7d631be5e96&chksm=ea948c12dde30504fe8b09dd8462eaf319f93c0951f6f4c07be10cea26308fbe41ce6ffbe006&scene=21#wechat_redirect)  
  
  
[西门子电力自动化系统中出现两个漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247485730&idx=2&sn=2eb7e60485905a9f5a9d17ef678517e9&chksm=ea973848dde0b15e4682ada9d7dbf8006d23f2ea27edbed042efb7010f40f5faacf1f4b5cf24&scene=21#wechat_redirect)  
  
  
[由35国42家电力输送系统运营商组成的欧洲电力协会网络遭攻击](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247492490&idx=3&sn=88057cc44e0efb849b189519c25bd4c0&chksm=ea94d2e0dde35bf633263284bb5291885df6e4a2a270abdcae73d4d2cbd8da2d9c0ddc3f0f45&scene=21#wechat_redirect)  
  
  
[Trion 幕后黑手瞄准美国和亚太地区的电力设施](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247490202&idx=3&sn=2e30c0a60b10d7862a53a6fcb485059f&chksm=ea972bf0dde0a2e6009237ee74c58cd32c7b2722430559e42605c73b22438320a225143af2f2&scene=21#wechat_redirect)  
  
  
[电力网防护公司  SEL 修复多个严重的软件缺陷](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247487585&idx=3&sn=1fbaae2b20bb762f317d95481be9af89&chksm=ea97210bdde0a81d040d430035676951eef8378746af7f12029d279cebd6265639719b6b1f75&scene=21#wechat_redirect)  
  
  
  
  
**原文链接**  
  
https://www.securityweek.com/critical-siemens-rtu-vulnerability-could-allow-hackers-to-destabilize-power-grid/  
  
  
题图：Pexels License  
  
  
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
