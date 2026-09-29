---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  CISA 将Adobe ColdFusion中的这个严重漏洞列入必修清单   
THN  代码卫士   2023-08-23 18:56  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Az5ZsrEic9ot90z9etZLlU7OTaPOdibteeibJMMmbwc29aJlDOmUicibIRoLdcuEQjtHQ2qjVtZBt0M5eVbYoQzlHiaw/640?wx_fmt=gif "")  
  
   
聚焦源代码安全，网罗国内外最新资讯！****  
  
**编译：代码卫士**  
  
**美国网络安全和基础设施安全局 (CISA) 将Adobe ColdFusion 中的一个严重漏洞 (CVE-2023-26359) 列入“已知利用漏洞”分类中。**  
  
  
![](https://mmbiz.qpic.cn/mmbiz_png/oBANLWYScMTBuxyicQbZX3tSS9tjia3WY9QLfrhwqYKwkL4x3s9APkaXKXibvg4jcI4fKEianV3zwCEgt4pSPGM4BQ/640?wx_fmt=png "")  
  
  
该漏洞的CVSS 评分为9.8，与Adobe ColdFusion 2018（Update 15及更早版本）和 ColdFusion 2021（Update 5及更早版本）中的一个反序列化漏洞有关，无需任何交互，攻击者就可在当前用户上下文中执行任意代码。  
  
反序列化即从字节流中重建数据结构或对象的过程。但如果是在未验证来源或清理内容的情况下执行，则可导致异常后果如代码执行或拒绝服务。Adobe 公司已在2023年3月修复。截止目前尚不清楚该漏洞如何遭在野利用。  
  
话虽如此，五个月前，CISA 曾将影响该产品的另外一个漏洞 (CVE-2023-26360)加入必修清单。Adobe 公司表示已注意到该漏洞被用于针对 ColdFusion 的“非常有限的攻击”中。  
  
鉴于遭活跃利用，CISA要求联邦民事行政部门 (FCEB) 机构在2023年9月11日前应用必要补丁，保护网络免受潜在威胁。  
  
  
  
代码卫士试用地址：  
https://codesafe.qianxin.com  
  
开源卫士试用地址：https://oss.qianxin.com  
  
  
  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[严重的 ColdFusion 缺陷被用于释放 webshell](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247517089&idx=1&sn=dc6bce66dfc343de897d81dfb68108b8&chksm=ea94b2cbdde33bdd2eedd6497d1fe31d5bded9a4271eb7a287978f59c76fa633d7277a547b3c&scene=21#wechat_redirect)  
  
  
[CISA紧急提醒：Adobe ColdFusion漏洞已遭在野利用](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247515947&idx=3&sn=76c36938bf1b7401950fc62730020638&chksm=ea948e41dde30757c6826cbbaeba673c04d191b437bd8a20532e2a13614e94562772ade4c057&scene=21#wechat_redirect)  
  
  
[十多年前的 Adobe ColdFusion 漏洞被用于勒索攻击](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247507998&idx=2&sn=fd44dbdbf72b7df83e081524bebf4667&chksm=ea949174dde318623fad2d710dd6603f2144e71e5ab47ff56088e63eb917ccc2beabfea3ef2c&scene=21#wechat_redirect)  
  
  
[马上更新！严重的 ColdFusion 0day 漏洞已遭在野利用](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247489336&idx=3&sn=c3ea6cc56bb965afc7ced3a581f3f733&chksm=ea972652dde0af44760ed912f78d3a2667634cb227baa1c7e4b892205eb3d5434c9c42e01d7b&scene=21#wechat_redirect)  
  
  
[Adobe ColdFusion 漏洞已遭利用](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247488479&idx=4&sn=6e6c63ccafbaebd78b756034c84fc8fc&chksm=ea9722b5dde0aba3ba1b52272228a6aa4aa44dc6ec09bb372341a744956067ec60db010e30b5&scene=21#wechat_redirect)  
  
  
  
  
**原文链接**  
  
https://thehackernews.com/2023/08/critical-adobe-coldfusion-flaw-added-to.html  
  
  
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
