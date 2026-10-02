---
source: "gelusus/wxvl 公众号漏洞文库"
id: "vw-8e29860d24d68eb0562c8fcb"
entity_id: "ve-8e29860d24d68eb0562c8fcb"
schema_version: "1"
title: "CISA提醒：严重的 Ruckus 漏洞被用于感染 WiFi 接入点"
product: "Ruckus Wireless管理面板/接入点"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "primary"
primary_identifiers: "CVE-2023-25717"
referenced_identifiers: ""
prerequisites: "匿名HTTP GET，2023年2月补丁；EOL型号无补丁，未列型号"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%AE%89%E5%85%A8%E8%AE%BE%E5%A4%87/CISA/CISA%E6%8F%90%E9%86%92%EF%BC%9A%E4%B8%A5%E9%87%8D%E7%9A%84%20Ruckus%20%E6%BC%8F%E6%B4%9E%E8%A2%AB%E7%94%A8%E4%BA%8E%E6%84%9F%E6%9F%93%20WiFi%20%E6%8E%A5%E5%85%A5%E7%82%B9.md"
review_date: "2026-10-02"
category_recommendation: "Web安全/网络设备/Ruckus"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_status: "unknown"
---

#  CISA提醒：严重的 Ruckus 漏洞被用于感染 WiFi 接入点   

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Ruckus Wireless管理面板/接入点
- 本文讨论：CVE-2023-25717；Windows29336为无关另一KEV
- 版本、权限与配置前提：匿名HTTP GET，2023年2月补丁；EOL型号无补丁，未列型号
- 资料类型：僵尸网络利用新闻；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- CISA不是受影响产品，应归Ruckus网络设备
- 具体固件/型号缺失，恶意软件支付方式与12种DDoS模式非漏洞复现证据
- 补丁/KEV只有二手BleepingComputer，推广冗余

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- 受影响/EOL型号与厂商修复、KEV日期待核
- 引用图片未查看，截图内容及有效性待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->

Sergiu Gatlan  代码卫士   2023-05-15 17:27  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Az5ZsrEic9ot90z9etZLlU7OTaPOdibteeibJMMmbwc29aJlDOmUicibIRoLdcuEQjtHQ2qjVtZBt0M5eVbYoQzlHiaw/640?wx_fmt=gif "")  
  
   
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
**美国网络安全和基础设施安全局 (CISA) 提醒称，Ruckus Wireless Admin 面板中存在一个严重的远程代码执行漏洞 (CVE-2023-25717)，已遭近期发现的某 DDoS 僵尸网络利用。**  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/oBANLWYScMRuQDkjrn90BU9uy6w6tibv8p43uRkfKCRI3S6WVjfDzt1m0ib0cLM3fH2VicBzfPJwn0lZR9BfNxAnw/640?wx_fmt=gif "")  
  
![](https://mmbiz.qpic.cn/mmbiz_png/oBANLWYScMRuQDkjrn90BU9uy6w6tibv8Taa3larbf2kynMcYHica91TpsACtkb56gDQyiayqgD5lg5eBs5DZe68A/640?wx_fmt=png "")  
  
  
虽然该漏洞已在2月初修复，但很多设备所有人可能尚未修复无线接入点。另外，目前尚未发布针对已达生命周期型号设备的补丁。  
  
攻击者正通过 AndoryuBot 恶意软件（首次现身于2023年2月），通过未认证的 HTTP GET 请求感染易受攻击的 WiFi 接入点。设备如遭攻陷，可被添加至僵尸网络，发动 DDoS 攻击。该恶意软件支持12种 DDoS 模式：tcp-raw、 tcp-socket、tcp-cnc、tcp-handshake、udp-plain、udp-game、udp-ovh、udp-raw、udp-vse、udp-dstat、udp-bypass 和 icmp-echo。意在发动 DDoS 攻击的网络犯罪分子可租赁 AndoryuBot 僵尸网络的武器库，后者正在销售其服务。这种服务可通过 CashApp 移动支付服务或通过多种加密密币如 XMR、BTC、ETH 和 USDT 等支付。  
  
  
**联邦机构必须在6月2日前修复**  
  
  
  
CISA 要求美国联邦政府民事行政部门最晚于6月2日修复该漏洞，已将该漏洞添加到“已遭利用漏洞”列表中。  
  
虽然该分类列表主要关注美国联邦机构，但鉴于攻击者对漏洞的活跃利用，强烈建议私营企业优先修复该列表中列出的漏洞，以免面临安全风险。另外，CISA 也要求联邦机构在5月30日前修复 Windows 0day (CVE-2023-29336)。该漏洞可导致用户在受陷的 Windows 系统上提升至系统用户权限。微软虽然证实称该 Win32k 内核驱动漏洞已遭利用但尚未详述利用方式。  
  
  
****  
  
****  
  
![](https://mmbiz.qpic.cn/mmbiz_png/oBANLWYScMQZeSribxs2yU1w56EMvgX9cDBCiabniazxdxtQ25cBCAd5vBJIM2sOv1khjzwwViaT0pS74U6piaiauiaGA/640?wx_fmt=png "")  
  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/oBANLWYScMTBzmfDJA6rWkgzD5KIKNibpR0szmPaeuu4BibnJiaQzxBpaRMwb8icKTeZVEuWREJwacZm3wElt7vOtQ/640?wx_fmt=jpeg "")  
  
****  
代码卫士试用地址：  
https://codesafe.qianxin.com  
  
开源卫士试用地址：https://oss.qianxin.com  
  
  
  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247511052&idx=3&sn=fb116392e405ae62e6c339117fffdb59&chksm=ea949d66dde31470758b6ee8f9dbecdb67ef6c0c8af277f26b83b60dbac95748d28db787a4b4&scene=21#wechat_redirect)  
[奇安信入选全球《软件成分分析全景图》代表厂商](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247515374&idx=1&sn=8b491039bc40f1e5d4e1b29d8c95f9e7&chksm=ea948d84dde30492f8a6c9953f69dbed1f483b6bc9b4480cab641fbc69459d46bab41cdc4859&scene=21#wechat_redirect)  
  
  
[1500万公开服务易受 CISA 已知已遭利用漏洞攻击](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247516131&idx=2&sn=e4062667fe1d4694a90a9ffa17a2fd40&chksm=ea948e89dde3079ffc2cbba3e2f13e7929117094754c9e3216a4c6cb5f303cf622ec99800e6b&scene=21#wechat_redirect)  
  
  
[CISA提醒修复这些严重的ICS漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247516017&idx=2&sn=09318646aeb89a81eeacb8a2b51f9939&chksm=ea948e1bdde3070d895e8c6cea2e67f1eb2a166309fb913b70ade0894f89d12b2f3aefb0b477&scene=21#wechat_redirect)  
  
  
[CISA紧急提醒：Adobe ColdFusion漏洞已遭在野利用](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247515947&idx=3&sn=76c36938bf1b7401950fc62730020638&chksm=ea948e41dde30757c6826cbbaeba673c04d191b437bd8a20532e2a13614e94562772ade4c057&scene=21#wechat_redirect)  
  
  
[CISA提醒注意与LastPass泄露事件有关的Plex漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247515912&idx=2&sn=9a2496bb8c17bcf9ed8e477367f18001&chksm=ea948e62dde307749ef7616c97efc1c91e680e87bd654e1a1766fae70831f36318fa216354cf&scene=21#wechat_redirect)  
  
  
[CISA必修列表未收录数十个已遭利用漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247515885&idx=2&sn=26d62bc99cdd37f8365bae8a9b94dba5&chksm=ea948f87dde30691fa7f9887c40e755916adb1ef81c320c67bd9cf032e3495edbc2c16f71288&scene=21#wechat_redirect)  
  
  
  
  
**原文链接**  
  
https://www.bleepingcomputer.com/news/security/cisa-warns-of-critical-ruckus-bug-used-to-infect-wi-fi-access-points/  
  
  
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
