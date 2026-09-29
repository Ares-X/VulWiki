---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  CISA：Wing FTP 已遭利用漏洞可泄露服务器路径  
Ravie Lakshmanan
                    Ravie Lakshmanan  代码卫士   2026-03-17 09:22  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Az5ZsrEic9ot90z9etZLlU7OTaPOdibteeibJMMmbwc29aJlDOmUicibIRoLdcuEQjtHQ2qjVtZBt0M5eVbYoQzlHiaw/640?wx_fmt=gif "")  
    
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
**本周一，美国网络安全和基础设施安全局 (CISA) 将影响 Wing FTP 的中危漏洞CVE-2025-47813纳入已遭利用漏洞 (KEV) 分类表中，并表示该漏洞已遭利用。**  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
该漏洞的CVSS评分为4.3，是一个信息泄露漏洞，在某些条件下可泄露应用的安装路径。CISA 表示，“Wing FTP服务器存在一个漏洞，当在UID cookie中使用长数值时，系统会生成包含敏感信息的错误消息。”该漏洞影响 Wing FTP 服务器7.4.3版本及之前的所有版本。RCE Security研究员Julien Ahrens遵循负责任的披露原则报告此问题后，5月发布的7.4.4版本中已修复该漏洞。  
  
值得注意的是，7.4.4版本还修复了同一产品中的一个严重 RCE漏洞CVE-2025-47812（CVSS：10.0）。截至2025年7月，该漏洞已遭在野利用。根据Huntress公司当时披露的细节，攻击者已利用该漏洞下载并执行恶意Lua文件、进行侦察活动，并安装远程监控管理软件。  
  
研究员Ahrens在GitHub发布的概念验证（PoC）利用代码中指出，"/loginok.html"端点未能正确验证"UID"会话cookie的值。当提供的值超过底层操作系统最大路径长度时，会触发错误消息并泄露完整的本地服务器路径。该研究员补充道："成功利用该漏洞可使经过身份验证的攻击者获取应用程序的本地服务器路径，从而有助于利用CVE-2025-47812等漏洞进行攻击。"  
  
目前尚无关于该漏洞如何遭在野利用的具体细节，也不确定是否与CVE-2025-47812漏洞结合使用。鉴于最新事态发展，CISA建议联邦民事行政部门（FCEB）机构在2026年3月30日前完成必要补丁的部署。  
  
  
 开源  
卫士试用地址：  
https://oss.qianxin.com/#/login  
  
  
 代码卫士试用地址：https://sast.qianxin.com/#/login  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[CrushFTP 新0day被用于劫持服务器](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247523615&idx=2&sn=cac2857656da7d1c204446add8dfee9a&scene=21#wechat_redirect)  
  
  
[Wing FTP严重漏洞已遭在野利用](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247523565&idx=2&sn=3cc3fd02d7bb4c8d993138dce7afa3f6&scene=21#wechat_redirect)  
  
  
[CrushFTP 提醒用户立即修复已遭利用的 0day 漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247519338&idx=1&sn=ec0b92257a640cd98dd5d59c00746548&scene=21#wechat_redirect)  
  
  
[CompleteFTP 路径遍历缺陷可导致服务器文件遭删除](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247513283&idx=2&sn=1191567d5c667a5413e00d453ef8b5da&scene=21#wechat_redirect)  
  
  
  
  
  
**原文链接**  
  
https://thehackernews.com/2026/03/cisa-flags-actively-exploited-wing-ftp.html  
  
  
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
