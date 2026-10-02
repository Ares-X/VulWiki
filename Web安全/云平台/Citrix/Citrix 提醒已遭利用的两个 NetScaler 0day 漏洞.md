---
source: "gelusus/wxvl 公众号漏洞文库"
title: "Citrix 提醒注意已遭利用的两个 NetScaler 0day 漏洞"
product: "Citrix NetScaler ADC/Gateway"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
source_status: "unknown"
prerequisites: "原文未完整说明身份权限、部署配置和可达性；不能假定匿名、默认开启或所有版本适用。"
side_effects: "原文未完整记录副作用、清理步骤或运行验证；阅读样例不等于获准在真实系统执行。"
id: "vw-a19d16c3ace446d0d7fce46e"
entity_id: "ve-a19d16c3ace446d0d7fce46e"
schema_version: "1"
---

# Citrix 提醒注意已遭利用的两个 NetScaler 0day 漏洞

<!-- vulwiki-editorial:start -->
## 校订与适用边界


### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- 6548认证低权限管理面RCE与6549特定网关/AAA配置DoS分别建条件
- 缺结构化CVE与厂商原始公告
- 客户自管设备与托管服务不受影响应保留
- 4966为历史背景不提为主编号
- 清广告和推荐阅读

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

Sergiu Gatlan  代码卫士   2024-01-17 17:33  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Az5ZsrEic9ot90z9etZLlU7OTaPOdibteeibJMMmbwc29aJlDOmUicibIRoLdcuEQjtHQ2qjVtZBt0M5eVbYoQzlHiaw/640?wx_fmt=gif "")  
  
   
聚焦源代码安全，网罗国内外最新资讯！****  
  
**编译：代码卫士**  
  
**本周二，Citrix 督促客户立即修复影响 NetScaler ADC 和 Gateway 设备的两个已遭利用 0day 漏洞（CVE-2023-6548和CVE-2023-6549）。**  
  
  
这两个漏洞CVE-2023-6548和CVE-2023-6549分别可导致 NetScaler 管理接口和未修复的NetScaler 实例易遭RCE和DoS 攻击。然而，攻击者必须登录目标实例的低权限账户并通过管理接口权限访问 NSIP、CLIP或SNIP才能实现代码执行。另外，这些设备必须配置为网关（VPN虚拟服务器、ICA Proxy、CVPN、RDP Proxy）或AAA虚拟服务器才能遭DoS 攻击。  
  
Citrix 公司指出，只有客户管理的 NetScaler 设备易受这两个0day攻击，而由 Citrix 管理的云服务或 Adaptive Authentication 不受影响。  
  
受这两个 0day 漏洞影响的 NetScaler 产品版本如下：  
  
- NetScaler ADC 和 NetScaler Gateway：14.1-12.35之前的14.1版本  
  
- NetScaler ADC 和 NetScaler Gateway：13.1-51.15之前的13.1版本  
  
- NetScaler ADC 和 NetScaler Gateway：13.0-92.21之前的13.0版本  
  
- NetScaler ADC 13.1-FIPS：13.1-37.176之前的版本  
  
- NetScaler ADC 12.1-FIPS：12.1-55.302之前的版本  
  
- NetScaler ADC 12.1-NDcPP：12.1-55.302之前的版本  
  
  
  
Citrix 在所发布的安全公告汇总，督促所有管理员立即修复 Netscaler 设备，“已发现在未缓解设备上利用这些CVE漏洞的情况。Cloud Software Group 强烈督促受影响的 NetScaler ADC 和 NetScaler Gateway 用户尽快更新相关更新版本。”另外，建议仍然使用已达生命周期的12.1版本的用户更新至受支持版本。  
  
无法立即部署所发布安全更新的管理员应当拦截受影响实例的网络流量，确保这些实例未暴露在网络，“强烈建议设备管理接口的网络流量与正常的网络流量隔离，或者物理隔离或者逻辑隔离。另外，我们强烈建议按照安全部署指南中提到的，不要将管理接口暴露在互联网。消除在互联网中的暴露能大大降低漏洞遭利用的风险”。  
  
Citrix 在去年10月修复了另外一个严重漏洞CVE-2023-4966（之后被称为“Citrix Bleed”）。8月份，该漏洞被多个威胁组织作为0day漏洞利用，攻陷了全球多个政府组织机构和高级别科技公司的网络，如波音。  
  
HHS的安全团队HC3也发布行业警报，督促健康组织机构加固 NetScaler ADC和NetScaler Gateway实例的安全性。****  
  
  
****  
代码卫士试用地址：  
https://codesafe.qianxin.com  
  
开源卫士试用地址：https://oss.qianxin.com  
  
  
  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[Citrix NetScaler 严重漏洞可泄露“敏感”数据](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247517841&idx=2&sn=de64058a934247781132d8fdd5886240&chksm=ea94b7fbdde33eed8920dc403119072a08ff3f018fc6122497a8acfadfbdcf1fca8ab3aa986b&scene=21#wechat_redirect)  
  
  
[Citrix 修复 Ubuntu 版本安全访问客户端中的严重漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247517034&idx=4&sn=6e2b7be2533c1e454539a3b4905483c7&chksm=ea94b200dde33b16f46f5c52b43bc116d9a9ed99bf381bbe9dbd8d1b3902ca57cb785c81a283&scene=21#wechat_redirect)  
  
  
[Citrix 修复Workspace等多款产品中的多个严重漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247515606&idx=2&sn=18cf93cc69f16acc4087555f4f6efc3b&chksm=ea948cbcdde305aa6e54f5a260a008d69843d1fa2765f9b2c2fa70422bc8acb78ee6cbd09553&scene=21#wechat_redirect)  
  
  
[Citrix修复位于Gateway 和 ADC 中的严重漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247514449&idx=1&sn=922716384658e8c52f01a153b1ac8251&chksm=ea94883bdde3012d2ef7c94a1e49690e115082526d0b6bbe2573cce3c6e36bac47b0042b499f&scene=21#wechat_redirect)  
  
  
[攻击者滥用 Citrix NetScaler 设备 0day，发动DDoS放大攻击](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247499753&idx=3&sn=b3738632743f3cb88b1e3207dd79945a&chksm=ea94ce83dde34795a6a6e68ee1c28bec29c9d9667d6fb4e9496513b3043fa3de2bb0ad5b8d11&scene=21#wechat_redirect)  
  
  
  
  
**原文链接**  
  
https://www.bleepingcomputer.com/news/security/citrix-warns-of-new-netscaler-zero-days-exploited-in-attacks/  
  
  
题图：Pixabay License  
  
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
