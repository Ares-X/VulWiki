---
source: "gelusus/wxvl 公众号漏洞文库"
id: "vw-a20a5367e61e98fa3d42a71d"
entity_id: "ve-a20a5367e61e98fa3d42a71d"
schema_version: "1"
title: "Fortinet 修复 FortiOS 中的代码执行漏洞"
product: "FortiOS、FortiProxy/PAM/SwitchManager、FortiClient等"
record_type: "roundup"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "primary"
primary_identifiers: "CVE-2024-23110"
referenced_identifiers: ""
prerequisites: "主为已认证CLI栈溢出；26010特定条件未展开；TunnelVision为不同客户端部署"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/Fortinet/Fortinet%20%E4%BF%AE%E5%A4%8D%20FortiOS%20%E4%B8%AD%E7%9A%84%E4%BB%A3%E7%A0%81%E6%89%A7%E8%A1%8C%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_status: "unknown"
---

#  Fortinet 修复 FortiOS 中的代码执行漏洞   

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：FortiOS、FortiProxy/PAM/SwitchManager、FortiClient等
- 本文讨论：CVE-2024-23110
- 版本、权限与配置前提：主为已认证CLI栈溢出；26010特定条件未展开；TunnelVision为不同客户端部署
- 资料类型：多产品修复汇总；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 主漏洞6.x/7.x范围过宽；副漏洞认证/条件/版本不足
- TunnelVision与CLI漏洞无因果关系，不可同实体去重
- 未来客户端修复是历史计划；无一手PSIRT链接

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- 26010条件、所有分支范围与客户端更新待核验
- 引用图片未查看，截图内容及有效性待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->

Ionut Arghire  代码卫士   2024-06-13 17:45  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Az5ZsrEic9ot90z9etZLlU7OTaPOdibteeibJMMmbwc29aJlDOmUicibIRoLdcuEQjtHQ2qjVtZBt0M5eVbYoQzlHiaw/640?wx_fmt=gif "")  
  
   
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
**本周二，Fortinet 修复了位于 FortiOS 和其它产品中的多个漏洞，包括多个可导致代码执行后果的漏洞。**  
  
其中最严重的是CVE-2024-23110（CVSS评分7.4），它会追踪平台命令行解析器中的多个基于栈的缓冲区溢出缺陷。Fortinet 公司指出，该漏洞如遭成功利用，“可导致认证攻击者通过特殊构造的命令行参数执行越权代码或命令”。  
  
该漏洞影响 FortiOS 6.x 和 7.x，已在 FortiOS 6.2.16、6.4.15、7.0.14、7.2.7和7.4.3版本中修复。  
  
另外一个中危的栈溢出漏洞是CVE-2024-26010，影响 FortiOS、FortiProxy、FortiPAM 和 FortiSwitchManager，可被远程攻击者在一定条件下执行任意代码或命令。  
  
本周二，Fortinet 还提醒注意多个位于FortiOS 中的中危栈缓冲区溢出漏洞（统称为CVE-2023-46720），它可被用于通过构造的CLI命令执行任意代码。FortiOS 7.2.8和7.4.4中已包含该漏洞的修复方案。使用之前版本的客户应升级至已修复版本。  
  
Fortinet 公司还修复了同时影响 FortiOS 和 FortiProxy 中的两个中危漏洞，它们可导致攻击者执行 JavaScript 代码或解密备份文件。  
  
Fortinet 公司在本周发布的安全更新还修复了两个SQL注入缺陷，其中一个位于 FortiPortal 中，可导致信息泄露；另外一个位于 FortiSOAR Eevent Auth API 中，可导致代码或命令执行后果。  
  
周二，Fortinet 还证实称，其中一些产品遭最近披露的 TunnelVision 攻击 (CVE-2024-3661) 的影响，可导致攻击者利用DHCP 中的内置特性绕过VPN防火措施并嗅探受害者的流量。  
  
Fortinet 公司在安全公告中提到，FortiClientWindows (SSL-VPN) 用户可通过使用启用了 “exclusive-routing” 的 “Full-Tunnel”缓解该攻击。该漏洞的修复方案将发布在 FortiClientWindows (IPsec VPN) 、FortiClientMac 和 FortiClientLinux的未来版本中。  
  
Fortinet 并未提到任何漏洞已遭利用，但威胁行动者一向会紧盯 Fortinet 产品中的缺陷，因此用户应尽快更新。  
  
  
代码卫士试用地址：  
https://codesafe.qianxin.com  
  
开源卫士试用地址：https://oss.qianxin.com  
  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[Fortinet：速修复 FortiOS、FortiProxy 设备中的严重RCE漏洞！](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247517034&idx=2&sn=0e6034be825eac879386635841578fa0&chksm=ea94b200dde33b16e5b00a74e6327aca06b3192a6c9501d14cc86edab7c248c3044a44ff1a9c&scene=21#wechat_redirect)  
  
  
[Fortinet 修复FortiADC 和 FortiOS 中的多个高危漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247516406&idx=3&sn=f6d52c7913cb9a7127079a424f287d22&chksm=ea94b19cdde3388a41d9382c14e8649d4db7f27382de8b638a8c2430d9fb7a6e3125a60ceed6&scene=21#wechat_redirect)  
  
  
[Fortinet FortiOS漏洞被用于攻击政府实体](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247515912&idx=1&sn=0d48724c08d4d63949a7142683b6fdd7&chksm=ea948e62dde30774b504e3a089bab575daf337854bba663d40f81014b5672260b74230a007a3&scene=21#wechat_redirect)  
  
  
[美国：APT 组织正在利用 Fortinet FortiOS 发动攻击](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247503245&idx=3&sn=856f262b27f3310cf14d0eaafade5f5c&chksm=ea94fce7dde375f100cb59392a9ae514a6174d710990f6583117019c4df9a7761da88d23d49c&scene=21#wechat_redirect)  
  
  
  
  
  
**原文链接**  
  
  
https://www.securityweek.com/fortinet-patches-code-execution-vulnerability-in-fortios/  
  
  
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
