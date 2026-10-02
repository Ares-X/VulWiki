---
source: "gelusus/wxvl 公众号漏洞文库"
id: "vw-e465e924c8290c4fe7d5ad8b"
entity_id: "ve-e465e924c8290c4fe7d5ad8b"
schema_version: "1"
title: "合勤：注意影响十几款路由器的严重RCE漏洞"
product: "Zyxel CPE/ONT/扩展器"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "primary"
primary_identifiers: "CVE-2025-13942"
referenced_identifiers: ""
prerequisites: "UPnP启用，远程WAN利用另需开放WAN；无型号固件矩阵"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/Zyxel/%E5%90%88%E5%8B%A4%EF%BC%9A%E5%BD%B1%E5%93%8D%E5%8D%81%E5%87%A0%E6%AC%BE%E8%B7%AF%E7%94%B1%E5%99%A8%E7%9A%84%E4%B8%A5%E9%87%8DRCE%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_status: "unknown"
---

#  合勤：注意影响十几款路由器的严重RCE漏洞  

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Zyxel CPE/ONT/扩展器
- 本文讨论：CVE-2025-13942；13943/2026-1459为同批漏洞，40891/0890为历史引用
- 版本、权限与配置前提：UPnP启用，远程WAN利用另需开放WAN；无型号固件矩阵
- 资料类型：UPnP及相关补丁新闻；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 历史默认凭据编号写CVE-2026-0890，与278及所述2025事件不符，年份疑误
- 列旧EOL型号是背景，不是本次13942影响表；公网设备总量非已验证漏洞数量
- 缺主CVE元数据、厂商直链和固定版本

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- 历史年份、WAN/LAN条件及每型号版本待核验
- 引用图片未查看，截图内容及有效性待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->

Sergiu Gatlan
                    Sergiu Gatlan  代码卫士   2026-02-26 11:57  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Az5ZsrEic9ot90z9etZLlU7OTaPOdibteeibJMMmbwc29aJlDOmUicibIRoLdcuEQjtHQ2qjVtZBt0M5eVbYoQzlHiaw/640?wx_fmt=gif "")  
    
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
**合勤发布安全更新，修复了影响十几款路由器机型的一个严重漏洞CVE-2025-13942，可导致未认证攻击者在未修复设备上获得远程命令执行权限。**  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
该漏洞是命令注入漏洞，位于合勤4G LTE/5G NR CPE、DSL/Ethernet CPE、Fiber ONTs和无线扩展器的 UPnP 函数中的命令注入漏洞。未经身份验证的远程攻击者可利用该漏洞，通过恶意构造的 UpnP SOAP 请求在受影响设备上执行操作系统命令。  
  
不过，该漏洞利用攻击可能要比其严重性评分所体现的影响有限，因为成功利用该漏洞要求攻击者启用 UpnP 和 WAN 访问权限，而WAN 访问权限默认为禁用状态。合勤公司表示，“需要注意的是，这些设备上的 WAN 访问权限默认禁用，而只有当同时启用 WAN 访问权限和易受攻击 UpnP 函数的情况下才能远程执行该攻击。强烈建议用户安装补丁，维持最优防护方案。”  
  
合勤公司还修复了两个高危的认证后命令注入漏洞CVE-2025-13943和CVE-2026-1459，它们可导致攻击者使用受陷凭据执行OS命令。Shadowserver 平台目前发现近12万台暴露在互联网的合勤设备，其中包括超过7.6万台路由器。由于合勤设备被全球很多互联网服务提供商默认为激活新互联网服务合同的开箱即用设备，因此常常遭攻击。  
  
美国网络安全和基础设施安全局 (CISA) 目前正在追踪影响合勤路由器、防火墙和NAS设备的已遭或仍遭在野活跃利用的12个漏洞。本月早些时候，合勤公司提醒称不打算修复正遭活跃利用、影响仍在线销售且已达生命周期的两个 0day 漏洞CVE-2024-40891和CVE-2026-0890，并表示“强烈”建议客户替换为固件已打补丁的新路由器。合勤公司表示，“VMG1312-B10A、VMG1312-B10B、VMG1312-B10E、VMG3312-B10A、VMG3313-B10A、VMG3926-B10B、VMG4325-B10A、VMG4380-B10A、VMG8324-B10A、VMG8924-B10A、SBG3300和SBG3500都是多年前已达生命周期的遗留产品。因此，我们强烈建议用户替换为新一代产品，获得最优防护措施。”  
  
合勤公司声称其网络产品的客户遍布150个国家的100多万家企业。  
  
  
 开源  
卫士试用地址：  
https://oss.qianxin.com/#/login  
  
  
 代码卫士试用地址：https://sast.qianxin.com/#/login  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[合勤不打算修复已达生命周期路由器中的已遭利用漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247522190&idx=1&sn=40eea5abf5bc17c52eb2a437e540b55f&scene=21#wechat_redirect)  
  
  
[合勤提醒注意路由器中的严重OS命令注入漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247520668&idx=2&sn=a47864fc0328391d921ce4629b3bac8b&scene=21#wechat_redirect)  
  
  
[合勤紧急修复NAS设备中的RCE漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247519665&idx=1&sn=16f68838d4899ea09b8df2f5f96357ab&scene=21#wechat_redirect)  
  
  
[合勤科技修复防火墙产品中的远程代码执行漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247518947&idx=2&sn=8758a5f5ef83a075fb61fbed63159da1&scene=21#wechat_redirect)  
  
  
[合勤提醒注意 NAS 设备中的多个严重漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247518251&idx=2&sn=e34aa255b21da7352d4cee7ee282c3a2&scene=21#wechat_redirect)  
  
  
  
  
  
**原文链接**  
  
https://www.bleepingcomputer.com/news/security/zyxel-warns-of-critical-rce-flaw-affecting-over-a-dozen-routers/  
  
  
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
