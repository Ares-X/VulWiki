---
source: "gelusus/wxvl 公众号漏洞文库"
id: "vw-b4e932cce10523bbb81edd88"
entity_id: "ve-b4e932cce10523bbb81edd88"
schema_version: "1"
title: "思科提醒注意 ISE 中的满分 RCE 漏洞"
product: "Cisco ISE/ISE-PIC"
record_type: "roundup"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "primary"
primary_identifiers: "CVE-2025-20281; CVE-2025-20282"
referenced_identifiers: ""
prerequisites: "20281 3.3/3.4；20282仅3.4；未认证API；20264需有效SSO账户"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/Cisco/%E6%80%9D%E7%A7%91%E6%8F%90%E9%86%92%20ISE%20%E4%B8%AD%E7%9A%84%E6%BB%A1%E5%88%86%20RCE%20%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_status: "unknown"
---

#  思科提醒注意 ISE 中的满分 RCE 漏洞  

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Cisco ISE/ISE-PIC
- 本文讨论：CVE-2025-20281；CVE-2025-20282
- 版本、权限与配置前提：20281 3.3/3.4；20282仅3.4；未认证API；20264需有效SSO账户
- 资料类型：多漏洞新闻；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 修复叙述把3.3 Patch6与patch4命名临时补丁、3.4 Patch2与patch1临时补丁放在括号等同，易混淆安装基线
- 主/副漏洞不同版本和权限须独立索引
- 未来2025-11补丁计划与未见利用状态属于历史快照；缺官方直链

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- 热补丁安装要求、实际修复版本和后续更新待核验
- 引用图片未查看，截图内容及有效性待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->

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
