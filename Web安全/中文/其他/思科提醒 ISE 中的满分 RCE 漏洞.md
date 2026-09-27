---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  思科提醒注意 ISE 中的满分 RCE 漏洞  
Bill Toulas  代码卫士   2025-06-27 10:29  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Az5ZsrEic9ot90z9etZLlU7OTaPOdibteeibJMMmbwc29aJlDOmUicibIRoLdcuEQjtHQ2qjVtZBt0M5eVbYoQzlHiaw/640?wx_fmt=gif "")  
    
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
**思科发布安全通告，提醒用户注意影响 ISE 和 ISE-PIC 的两个严重的未认证远程代码执行 (RCE) 漏洞CVE-2025-20281和CVE-2025-20282。**  
  
![](https://mmbiz.qpic.cn/mmbiz_png/oBANLWYScMTA3rktn5u4X8ibnvVwA9VFKvd0pSS5CHeyqB6Alk1ibnwyJNhzoiabFZJRSlISXMm4nuceGMTSb9ibfw/640?wx_fmt=png&from=appmsg "")  
  
  
这两个漏洞的CVSS 评分都是满分10分，CVE-2025-20281影响 ISE 和 ISE-PIC 3.4和3.3版本，CVE-2025-20282仅影响3.4版本。第一个漏洞的根因是在特定已暴露 API 中的用户提供输入验证不充分，它可导致未认证的远程攻击者发送特殊构造的API请求，以 root 用户身份执行任意操作系统命令。  
  
CVE-2025-20282是由内部API中的文件验证不当造成的，可导致文件被写入权限目录中。该漏洞可导致未认证的远程攻击者将任意文件上传到目标系统并以 root 权限执行。  
  
思科ISE是一款网络安全策略管理和访问控制平台，供组织机构管理网络连接连接，当做网络访问控制、身份管理和策略执行工具。该产品一般用于大型企业、政府组织机构、大学和服务提供商，是企业网络的核心。  
  
无需任何认证或用户交互，这两个漏洞即可被攻击者用于完全攻陷和完全远程接管目标设备。思科在安全通告中提到，并未发现这两个漏洞遭活跃利用的迹象，但应优先安装新的更新。建议用户升级至 3.3 Patch 6 (ise-apply-CSCwo99449_3.3.0.430_patch4) 和 3.4 Patch 2 (ise-apply-CSCwo99449_3.4.0.608_patch1) 或后续版本。这两个漏洞没有缓解措施，因此推荐应用这些安全更新。  
  
思科还发布了另外一份安全通告，修复了影响 ISE 的一个中危认证绕过漏洞CVE-2025-20264。该漏洞是因为对通过与外部身份提供商集成的 SAML SSO 创建用户的授权执行不当造成的。具有有效的经过SSO认证凭据的攻击者可发送具体的命令序列来修改系统设置或执行系统重启。  
  
CVE-2025-20264影响 ISE 3.4分支及之前所有版本。修复方案已在 3.4 Patch 2和3.3 Patch 5中推出。思科承诺将在2025年11月发布 3.2 Patch 8 修复3.2 版本中的漏洞。  
  
ISE 3.1 及更早版本也受影响但已不再受支持，建议用户迁移至更新的版本。  
  
****  
代码卫士试用地址：  
https://codesafe.qianxin.com  
  
开源卫士试用地址：https://oss.qianxin.com  
  
  
  
  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[思杰修复 NetScaler ADC 和 Gateway 中的严重漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247523373&idx=1&sn=046fdf8814e8311d4a31bd092804a2c2&scene=21#wechat_redirect)  
  
  
[Citrix悄悄修复相似度极高但严重性不及CitrixBleed的高危漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247519419&idx=1&sn=3bb85759ff76414bd555bb55aa1b3c16&scene=21#wechat_redirect)  
  
  
[思杰ADM高危漏洞可导致管理员密码重置](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247512458&idx=3&sn=b55867df7184e1bc35226d1d943cabe3&scene=21#wechat_redirect)  
  
  
[Citrix 分享Netscaler 密码喷射攻击的缓解措施](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247521806&idx=1&sn=0678a9877c98e19004381988c56fc6c5&scene=21#wechat_redirect)  
  
  
[Citrix 督促 Mac 用户修复 Workspace App 中的提权漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247519614&idx=1&sn=9e0519627dc928e416d3ba3de0a1941c&scene=21#wechat_redirect)  
  
  
[Citrix 提醒管理员手动缓解 PuTTY SSH 客户端漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247519453&idx=1&sn=b108366a369534bc2bc55f5a5089d587&scene=21#wechat_redirect)  
  
  
  
  
  
**原文链接**  
  
https://www.bleepingcomputer.com/news/security/cisco-warns-of-max-severity-rce-flaws-in-identity-services-engine/  
  
  
  
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
