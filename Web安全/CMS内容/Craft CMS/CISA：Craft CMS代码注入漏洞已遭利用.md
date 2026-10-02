---
source: "gelusus/wxvl 公众号漏洞文库"
product: "Craft CMS; secondary PAN-OS"
record_type: "roundup"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "CVE-2025-23209"
referenced_identifiers: "CVE-2025-0111; CVE-2025-0108; CVE-2025-9474"
identifier_role: "primary"
identifier_status: "unknown"
title: "CISA：Craft CMS代码注入漏洞已遭利用"
prerequisites: "来源所述条件，未列明部分仍待核：Craft4/5; prior compromised security key; fixed4.13.8/5.5.8 stated"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-b1f46a6d0e00330461423cc9"
entity_id: "ve-b1f46a6d0e00330461423cc9"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：Craft4/5; prior compromised security key; fixed4.13.8/5.5.8 stated

- **事实待核（1）**：Frontmatter lacks primary CVE despite body explicit。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **事实待核（2）**：PAN-OS third chain CVE-2025-9474 suspicious year; verify authoritative bulletin rather than auto-map to Craft。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **结论使用边界（3）**：Good warning key rotation loses access to encrypted data; historical CISA deadline should remain dated。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **结论使用边界（4）**：Ads/recommended articles substantial; precise secondary original link, no vendor/CISA URL。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

#  CISA：Craft CMS代码注入漏洞已遭利用   
Bill Toulas  代码卫士   2025-02-25 10:53  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Az5ZsrEic9ot90z9etZLlU7OTaPOdibteeibJMMmbwc29aJlDOmUicibIRoLdcuEQjtHQ2qjVtZBt0M5eVbYoQzlHiaw/640?wx_fmt=gif "")  
  
   
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
**美国网络安全和基础设施网络安全局 (CISA) 提醒称，Craft CMS 中的一个远程代码执行漏洞 (CVE-2025-23209) 已遭利用。**  
  
  
  
CVE-2025-23209的CVSS评分8.0，是代码注入（RCE）漏洞，影响 Craft CMS 版本4和5。Craft CMS 是用于构建网站和自定义数字化体验的内容管理系统（CMS）。  
  
虽然关于该漏洞的技术详情尚未发布，但利用该漏洞并不容易，因为要求攻陷Craft CMS的安全密钥。该安全密钥用于保护用户认证令牌、会话cookie、数据库值和敏感应用数据的安全性。只有当攻击者已获得该密钥的前提下，并借此解密敏感数据、生成认证令牌或远程注入并执行恶意代码时，该漏洞才成立。  
  
CISA已将该漏洞加入必修清单，并未分享关于该漏洞范围、攻击来源及攻击目标的信息。联邦机构需要在2025年3月13日前修复该漏洞。该漏洞已在Craft 5.5.8和4.13.8中修复，因此建议用户尽快升级至这些版本或后续版本。  
  
如用户怀疑自己被攻陷，则建议删除包含在 “.env” 文件中的老旧密钥并通过 php craft setup/security-key 命令生成新的密钥。需要注意的是，密钥变更会导致任何通过之前密钥加密的数据变得不可访问。  
  
另外，CISA还将位于Palo Alto Networks 防火墙中的漏洞（CVE-2025-0111）纳入必修清单，联邦机构同样需要在3月13日前修复该漏洞。该漏洞是影响PAN-OS防火墙的文件读漏洞，已被用于由CVE-2025-0108和CVE-2025-9474构成的利用链中。用户也可访问该公司的安全通告获取更多信息。  
  
  
  
代码卫士试用地址：  
https://codesafe.qianxin.com  
  
开源卫士试用地址：https://oss.qianxin.com  
  
  
  
  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[PHPFusion 开源 CMS 中存在严重漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247517570&idx=2&sn=7f19eccf19674dfcdf5f6515082f6989&scene=21#wechat_redirect)  
  
  
[开源CMS TYPO3中存在XSS漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247513988&idx=2&sn=d8e2aa2199ecfa383521908c1073c29b&scene=21#wechat_redirect)  
  
  
[开源的dotCMS 内容管理软件中存在严重的RCE漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247511649&idx=2&sn=b8446991d9e5831092d721d0b28041e9&scene=21#wechat_redirect)  
  
  
[热门开源CMS平台 Umbraco 中存在多个安全漏洞，可使账户遭接管](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247510233&idx=3&sn=a3b6ac9c3a90291e1ce56a9111954282&scene=21#wechat_redirect)  
  
  
[开源 CMS Drupal 修复 XSS 和开放重定向漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247493187&idx=2&sn=8ac5c62090bbee44166832232e092223&scene=21#wechat_redirect)  
  
  
  
  
  
**原文链接**  
  
  
https://www.bleepingcomputer.com/news/security/cisa-flags-craft-cms-code-injection-flaw-as-exploited-in-attacks/  
  
  
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
