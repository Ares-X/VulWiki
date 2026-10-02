---
source: "gelusus/wxvl 公众号漏洞文库"
id: "vw-181e5c71a7f0102591a25605"
entity_id: "ve-181e5c71a7f0102591a25605"
schema_version: "1"
title: "Sophos 修复位于 Sophos Web Appliance 设备中的三个漏洞"
product: "Sophos Web Appliance"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "primary"
primary_identifiers: "CVE-2023-1671"
referenced_identifiers: ""
prerequisites: "1671预认证warn-proceed <4.3.10.4；4934管理权限；XSS需已登录受害者交互"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%AE%89%E5%85%A8%E8%AE%BE%E5%A4%87/Sophos/Sophos%20%E4%BF%AE%E5%A4%8D%E4%BD%8D%E4%BA%8E%20Sophos%20Web%20Appliance%20%E8%AE%BE%E5%A4%87%E4%B8%AD%E7%9A%84%E4%B8%89%E4%B8%AA%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_status: "unknown"
---

#  Sophos 修复位于 Sophos Web Appliance 设备中的三个漏洞   

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Sophos Web Appliance
- 本文讨论：CVE-2023-1671主；2022-4934、2020-36692关联
- 版本、权限与配置前提：1671预认证warn-proceed &lt;4.3.10.4；4934管理权限；XSS需已登录受害者交互
- 资料类型：Web Appliance三漏洞修复新闻；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 各CVE修复范围未分别列，不能全部套4.3.10.4
- XSS诱导提交方向译述含混；厂商公告只有二手SecurityAffairs来源
- EOL2023-07-20应保留历史时点

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- 官方各漏洞版本与XSS触发流程待核
- 引用图片未查看，截图内容及有效性待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->

 代码卫士   2023-04-11 17:22  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Az5ZsrEic9ot90z9etZLlU7OTaPOdibteeibJMMmbwc29aJlDOmUicibIRoLdcuEQjtHQ2qjVtZBt0M5eVbYoQzlHiaw/640?wx_fmt=gif "")  
  
   
聚焦源代码安全，网罗国内外最新资讯！  
  
**作者：Pierluigi Paganini**  
  
**编译：代码卫士**  
  
**Sophos 修复了位于 Sophos Web Appliance 中的三个漏洞，其中一个是可导致代码执行的严重漏洞 CVE-2023-1671（CVSS 评分9.8）。**  
  
CVE-2023-1671 是一个预认证命令注入漏洞，位于 warn-proceed 句柄中，影响早于 4.3.10.4 的版本。  
  
Sophos 公司还修复了一个高危代码执行漏洞CVE-2022-4934，他是位于异常工具中的认证后命令注入漏洞，可导致管理员执行任意代码。第三个漏洞是中危的XSS 漏洞CVE-2020-36692，可用于在受害者浏览器中执行 JavaScript 代码。该攻击者可诱骗受害者在登录 Sophos Web Appliance的同时，向受攻击者控制的网站上提交恶意表单，从而触发漏洞。  
  
这些漏洞是由外部安全研究员发现并通过 Sophos 漏洞奖励计划提交的。Sophos Web Appliance 将在2023年7月20日到达生命周期。该公司建议客户通过 Sophos Firewall 替换设备。  
  
  
  
****  
![](https://mmbiz.qpic.cn/mmbiz_png/oBANLWYScMQZeSribxs2yU1w56EMvgX9cDBCiabniazxdxtQ25cBCAd5vBJIM2sOv1khjzwwViaT0pS74U6piaiauiaGA/640?wx_fmt=png "")  
  
  
  
代码卫士试用地址：  
https://codesafe.qianxin.com  
  
开源卫士试用地址：https://oss.qianxin.com  
  
  
  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247511052&idx=3&sn=fb116392e405ae62e6c339117fffdb59&chksm=ea949d66dde31470758b6ee8f9dbecdb67ef6c0c8af277f26b83b60dbac95748d28db787a4b4&scene=21#wechat_redirect)  
[奇安信入选全球《软件成分分析全景图》代表厂商](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247515374&idx=1&sn=8b491039bc40f1e5d4e1b29d8c95f9e7&chksm=ea948d84dde30492f8a6c9953f69dbed1f483b6bc9b4480cab641fbc69459d46bab41cdc4859&scene=21#wechat_redirect)  
  
  
[速修复！Sophos 防火墙中的RCE 0day已遭利用](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247514074&idx=1&sn=849d683aa4c7d4ef90f9f8b7e1c2da9c&chksm=ea9486b0dde30fa63d6a04185ca12a12f4d497590f1bfaca5758906648d912976659d1b9d701&scene=21#wechat_redirect)  
  
  
[Sophos 修复严重的防火墙 RCE 漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247511119&idx=3&sn=45f5b07eaf6a54d9147bacab7075348d&chksm=ea949d25dde31433b119ca473e465e2888ca7459948e44ac36afa0be5b56ee16122f0c5db485&scene=21#wechat_redirect)  
  
  
[Sophos 和 ReversingLabs 公开含2000万个 PE 文件的数据集](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247499163&idx=3&sn=77cc6cb13a2c66ca6758b2d18c02f3c8&chksm=ea94ccf1dde345e791b3f53169cc0ef45735cc423ba7cea3d2a0ce64cc3d008e75a7848dc72b&scene=21#wechat_redirect)  
  
  
[Sophos 修复 Cyberoam OS 中的 SQL 注入漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247498802&idx=2&sn=f481361fa7963f4f1b2b9a57c5c54312&chksm=ea94cd58dde3444e44870fd2833121c992e9af3d635031e84e710f039940f1f713a62f5022cd&scene=21#wechat_redirect)  
  
  
[Sophos 紧急修复已遭利用的防火墙 0day](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247492885&idx=1&sn=13bb59b895bde6d9c94f3fe19b43db53&chksm=ea94d47fdde35d69d00f5743b85f2912e619b649b38eb64af9cb048d97a37e96b0d1d9839578&scene=21#wechat_redirect)  
  
  
  
  
**原文链接**  
  
https://securityaffairs.com/144623/security/sophos-web-appliance-flaws.html  
  
  
题图：Pixabay License  
  
  
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
