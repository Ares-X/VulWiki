---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  Chrome 修复 Lens 特性中的严重 UAF 漏洞   
do son  代码卫士   2025-03-20 17:42  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Az5ZsrEic9ot90z9etZLlU7OTaPOdibteeibJMMmbwc29aJlDOmUicibIRoLdcuEQjtHQ2qjVtZBt0M5eVbYoQzlHiaw/640?wx_fmt=gif "")  
  
   
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
**谷歌推出重大安全更新，修复了位于 Chrome 的 Lens 特性中的释放后使用 (UAF) 漏洞 CVE-2025-2476。该漏洞已在 Windows、Mac 和 Linux 的最新稳定版本中修复。**  
  
  
![](https://mmbiz.qpic.cn/mmbiz_png/oBANLWYScMREnmv2ykWoK0kxjAXa1ib0h71CR2Po1U5Aadb1mNt9LHNiayM632YKDnFicCxmnIYLYso3XzIbfCG2w/640?wx_fmt=png&from=appmsg "")  
  
  
该漏洞如遭成功利用，可导致攻击者执行任意代码或控制系统。谷歌并未发布漏洞详情，以便多数用户更新浏览器并防止漏洞遭利用。  
  
为缓解该风险，谷歌已更新 Chrome 的稳定和稳定扩展版本：  
  
稳定版本：  
  
- Windows 和 Mac：134.0.6998.117/.118  
  
- Linux：134.0.6998.117  
  
  
  
稳定扩展版本：  
  
- Windows 和 Mac：134.0.6998.89  
  
  
  
这些更新将在未来几天和几周内陆续推出。  
  
鉴于该漏洞的严重性，强烈建议用户更新 Chrome 浏览器，以防遭攻击。  
  
检查和应用更新步骤：  
  
1、打开 Chrome。  
  
2、点击右上角的三点图标。  
  
3、导航至“帮助＞关于 Google Chrome”。  
  
4、Chrome 将自动检查并应用最新更新。  
  
5、重启浏览器，完成更新流程。  
  
  
  
代码卫士试用地址：  
https://codesafe.qianxin.com  
  
开源卫士试用地址：https://oss.qianxin.com  
  
  
  
  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[Chrome 131 更新修复高危内存安全漏洞，其中1个获奖5.5万美元](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247521859&idx=2&sn=342840d67c1fbf01af15a41ea7621df8&scene=21#wechat_redirect)  
  
  
[谷歌修复由苹果报送的严重 Chrome 漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247521342&idx=1&sn=355a1e1a938422e3437d8a957f360c7e&scene=21#wechat_redirect)  
  
  
[谷歌单个Chrome漏洞的最高赏金超25万美元](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247520627&idx=1&sn=e98afd2bb604a7bc41cadce2c53f2ab3&scene=21#wechat_redirect)  
  
  
[【在野利用】Google Chrome V8 类型混淆漏洞(CVE-2024-5274)安全风险通告](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247519584&idx=2&sn=dab52360076996946ff35b2afa4a9f72&scene=21#wechat_redirect)  
  
  
  
  
  
**原文链接**  
  
https://securityonline.info/google-chrome-patches-critical-use-after-free-vulnerability-in-lens-cve-2025-2476/  
  
  
题图：  
Pexels   
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
