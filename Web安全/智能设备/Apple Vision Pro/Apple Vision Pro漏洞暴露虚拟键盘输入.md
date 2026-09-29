---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  Apple Vision Pro漏洞暴露虚拟键盘输入   
THN  代码卫士   2024-09-14 17:52  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Az5ZsrEic9ot90z9etZLlU7OTaPOdibteeibJMMmbwc29aJlDOmUicibIRoLdcuEQjtHQ2qjVtZBt0M5eVbYoQzlHiaw/640?wx_fmt=gif "")  
  
   
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
**苹果修复 Vision Pro 中的一个严重漏洞 (CVE-2024-40865)，它本可刀子攻击者暴露在设备虚拟键盘上输入的的数据。**  
  
  
![](https://mmbiz.qpic.cn/mmbiz_png/oBANLWYScMSvsO3lmQ4hWJTYLztiaYT64dd6iaJmfWVFcU4icSlE3DhSdOpm5J2qIC6dbRN7xn0t0iaL5GGibcicmAMw/640?wx_fmt=png&from=appmsg "")  
  
  
该攻击名为“GAZEploit”，是“一种新型攻击，可从头像中提取与眼睛相关的生物特征，重构通过受注视控制的输写而输入的文本。GAZEploit 攻击利用的是用户共享虚拟头像时，受注视控制文本输入中的内在漏洞。”  
  
苹果收到报告后，已在2024年7月29日发布的 visionOS 1.3中修复了该漏洞，并指出该漏洞影响一个名为“Presence”的组件。苹果在一份安全公告中提到，“虚拟键盘的输入可从 Persona 中提取”，并指出“虚拟键盘是活跃状态时会暂停 Persona”以修复该问题。  
  
简言之，研究人员发现，可通过分析虚拟头像的眼球运动（“注视”）来判断用户在虚拟键盘上输入的内容，从而入侵其隐私。因此，从理论上来讲，恶意人员可分析通过视频通话、在线会议应用或实时流平台共享的虚拟头像，并远程执行击键推断，之后可用于提取敏感信息如密码。该攻击通过对Persona 记录、眼球纵横比 (EAR) 和眼球注视估测训练受控学习模型，区分输入会话和其它VR相关的活动（如看电影或打游戏）。在后续步骤中，对虚拟键盘的注视估测方向被映射到特定键，判断潜在击键，从而将虚拟空间中的键盘位置考虑进去。  
  
研究人员提到，“通过远程捕获和分析虚拟头像视频，攻击者能够重构所输入的的键。值得注意的是，GAZEploit 是该领域内首个利用已泄露注视信息来远程执行击键推断的已知攻击。”  
  
  
  
代码卫士试用地址：  
https://codesafe.qianxin.com  
  
开源卫士试用地址：https://oss.qianxin.com  
  
  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[苹果紧急修复影响 Mac 和 Apple Watch 的 0day](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247511813&idx=1&sn=dc16d2c1c8707eaed97dde4a0dfa7750&chksm=ea949e6fdde31779bfd96864b6be586636189da2c4799ddda06ccf2bb25c009aece718ee55d6&scene=21#wechat_redirect)  
  
  
[详细分析Apple macOS 6LowPAN 漏洞（CVE-2020-9967）](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247499556&idx=2&sn=a2e62e5803325596b12d738897b9413e&chksm=ea94ce4edde347586c6eb775168857df679e0454807b39689bdc8a55c98b22632e0750613a02&scene=21#wechat_redirect)  
  
  
[经合法Apple ID签名的新型MacOS恶意软件监控HTTPS流量](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247485538&idx=3&sn=f3ddc39b162b7ecaec0163fbc8cf58b2&chksm=ea973908dde0b01e68cabdebaa1330b4741d1d89f8a0f4747640f7a4836c06351e985ed2c3c9&scene=21#wechat_redirect)  
  
  
[Apple发布28个安全修复方案](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247485808&idx=1&sn=641a68e1717c7fd544267b85c1a0f6fa&chksm=ea97381adde0b10c5de974fdf83ea0c87762c945e2e9f2ffd75150797a49ced802d39eb3f6dd&scene=21#wechat_redirect)  
  
  
  
  
  
**原文链接**  
  
  
https://thehackernews.com/2024/09/apple-vision-pro-vulnerability-exposed.html  
  
  
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
