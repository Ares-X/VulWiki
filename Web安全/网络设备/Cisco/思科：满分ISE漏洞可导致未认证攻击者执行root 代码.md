---
source: "gelusus/wxvl 公众号漏洞文库"
id: "vw-d8c8ac84352b1173bbae8aea"
entity_id: "ve-d8c8ac84352b1173bbae8aea"
schema_version: "1"
title: "思科：满分ISE漏洞可导致未认证攻击者执行root 代码"
product: "Cisco ISE/ISE-PIC（主）；Fortinet FortiWeb（副）"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "primary"
primary_identifiers: "CVE-2025-20337"
referenced_identifiers: "CVE-2025-20281; CVE-2025-20282; CVE-2025-25257"
prerequisites: "ISE3.3/3.4未认证API；3.3 Patch7/3.4 Patch2修复；≤3.2不受影响"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/Cisco/%E6%80%9D%E7%A7%91%EF%BC%9A%E6%BB%A1%E5%88%86ISE%E6%BC%8F%E6%B4%9E%E5%8F%AF%E5%AF%BC%E8%87%B4%E6%9C%AA%E8%AE%A4%E8%AF%81%E6%94%BB%E5%87%BB%E8%80%85%E6%89%A7%E8%A1%8Croot%20%E4%BB%A3%E7%A0%81.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_status: "unknown"
---

#  思科：满分ISE漏洞可导致未认证攻击者执行root 代码  

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Cisco ISE/ISE-PIC（主）；Fortinet FortiWeb（副）
- 本文讨论：CVE-2025-20337
- 版本、权限与配置前提：ISE3.3/3.4未认证API；3.3 Patch7/3.4 Patch2修复；≤3.2不受影响
- 资料类型：新闻通告附关联事件；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 研究员历史漏洞写CVE-2025-2028，明显相对前文20281缺一位，需回源确认
- FortiWeb感染统计属于副主题不能绑ISE；在线资产数明确不是漏洞数
- 缺Cisco/Shadowserver原始链接

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- CVE错号及各版本修复范围待官方核验
- 引用图片未查看，截图内容及有效性待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->

Ravie Lakshmanan  代码卫士   2025-07-17 10:57  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Az5ZsrEic9ot90z9etZLlU7OTaPOdibteeibJMMmbwc29aJlDOmUicibIRoLdcuEQjtHQ2qjVtZBt0M5eVbYoQzlHiaw/640?wx_fmt=gif "")  
    
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
**思科披露了影响ISE和ISE-PIC的一个新的CVSS满分漏洞 CVE-2025-20337，可导致攻击者以提升后的权限在底层操作系统上执行任意代码，类似于思科在上个月修复的CVE-2025-20281。**  
  
![](https://mmbiz.qpic.cn/mmbiz_png/oBANLWYScMScOXNsaicK2wtahXibianJ73Hic5e2O9GFb20xPuFFD8tMvFiad0DZ3zx2kNunziaZ8Miclhic5z7ZvcSafw/640?wx_fmt=png&from=appmsg "")  
  
  
思科在安全公告中提到，“思科 ISE 和 ISE-PIC 的一个API中存在多个漏洞，可导致未认证远程攻击者以 root 权限在底层操作系统上执行任意代码。攻击者无需任何有效凭据即可利用这些漏洞。这些漏洞是因为对用户提供的输入验证不充分导致的。攻击者可提交一个构造的API请求，利用这些漏洞。成功利用可导致攻击者获得受影响设备上的 root 权限。”  
  
GMO Cybersecurity 公司的研究员 Kentaro Kawane 发现并报送了该漏洞。Kawane 此前曾发现了其它两个严重的思科ISE漏洞（CVE-2025-2028和CVE-2025-20282）以及Fortinet FortiWeb 中的另外一个严重漏洞CVE-2025-25257。  
  
CVE-2025-20337影响所有配置类型的 Cisco ISE 和 ISE-PIC 3.3和3.4版本，并不影响3.2或更早版本。该漏洞已分别在3.3 Patch 7 和 3.4 Patch 2中修复。  
  
目前尚未有证据表明该漏洞已遭恶意利用。不过应确保系统是最新版本以免遭潜在威胁。此前不久，Shadowserver Foundation 报道称威胁人员自2025年7月11日起可能正在利用与 CVE-2025-25257有关的利用在可疑的Fortinet FortiWeb 实例上释放 web shell。截止到7月15日，预测有77个受感染实例，低于前一天的85个。多数攻陷事件位于北美（44）、亚洲（14）和欧洲（13）地区。  
  
Censys 数据表明，在线的 Fortinet FortiWeb 设备有20098个（不含蜜罐），但目前尚不清楚这些设备是否易受CVE-2025-25257利用攻击。该平台表示，“该漏洞可导致未认证攻击者通过构造的HTTP请求执行任意SQL命令，从而导致RCE。”  
  
  
开源  
卫士试用地址：  
https://oss.qianxin.com/#/login  
  
  
代码卫士试用地址：https://sast.qianxin.com/#/login  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[思科提醒注意 ISE 中的满分 RCE 漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247523394&idx=1&sn=6155e41bcc07bb70bcdcdd88cc88d8de&scene=21#wechat_redirect)  
  
  
[思科提醒注意严重的 ISE 和 CCP 漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247523184&idx=1&sn=f205e1639e39bac5e3d3496845db4087&scene=21#wechat_redirect)  
  
  
[思科ISE严重漏洞导致攻击者以root权限运行命令](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247522190&idx=2&sn=9702cf83b7bdb3ee94d30829bea9f51b&scene=21#wechat_redirect)  
  
  
[思科 Unified CM 中存在满分漏洞，可用于获得root权限](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247523440&idx=1&sn=82defa4f95ee18fec7fd809f7f565f7a&scene=21#wechat_redirect)  
  
  
  
  
  
**原文链接**  
  
https://thehackernews.com/2025/07/cisco-warns-of-critical-ise-flaw.html  
  
  
题图：  
Pixabay Licen  
se  
  
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
