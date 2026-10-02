---
source: "gelusus/wxvl 公众号漏洞文库"
id: "vw-08b75cca03c6df6c8cb0fdb5"
entity_id: "ve-08b75cca03c6df6c8cb0fdb5"
schema_version: "1"
title: "Apple Vision Pro漏洞暴露虚拟键盘输入"
product: "Apple Vision Pro visionOS Presence/Persona"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "primary"
primary_identifiers: "CVE-2024-40865"
referenced_identifiers: ""
prerequisites: "共享虚拟Persona视频并使用注视键盘；修复visionOS1.3"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E6%99%BA%E8%83%BD%E8%AE%BE%E5%A4%87/Apple%20Vision%20Pro/Apple%20Vision%20Pro%E6%BC%8F%E6%B4%9E%E6%9A%B4%E9%9C%B2%E8%99%9A%E6%8B%9F%E9%94%AE%E7%9B%98%E8%BE%93%E5%85%A5.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_status: "unknown"
---

#  Apple Vision Pro漏洞暴露虚拟键盘输入   

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Apple Vision Pro visionOS Presence/Persona
- 本文讨论：CVE-2024-40865 GAZEploit
- 版本、权限与配置前提：共享虚拟Persona视频并使用注视键盘；修复visionOS1.3
- 资料类型：侧信道研究新闻；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 元数据未录CVE；重构准确率/实验限制缺失，密码提取应保持可能性而非确定性
- 只有THN二手来源，无Apple公告/学术论文直链；明显错字刀子

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- 1.3补丁机制、推断成功率与环境限制待原研核验
- 引用图片未查看，截图内容及有效性待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->

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
