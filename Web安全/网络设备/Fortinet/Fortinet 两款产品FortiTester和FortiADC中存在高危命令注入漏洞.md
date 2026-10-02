---
source: "gelusus/wxvl 公众号漏洞文库"
id: "vw-d092a5ba60335675621f580b"
entity_id: "ve-d092a5ba60335675621f580b"
schema_version: "1"
title: "Fortinet 两款产品FortiTester和FortiADC中存在高危命令注入漏洞"
product: "FortiADC / FortiTester"
record_type: "roundup"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "primary"
primary_identifiers: "CVE-2022-39947; CVE-2022-35845"
referenced_identifiers: ""
prerequisites: "均需已认证；ADC Web GUI；各分支修复号已给"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/Fortinet/Fortinet%20%E4%B8%A4%E6%AC%BE%E4%BA%A7%E5%93%81FortiTester%E5%92%8CFortiADC%E4%B8%AD%E5%AD%98%E5%9C%A8%E9%AB%98%E5%8D%B1%E5%91%BD%E4%BB%A4%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_status: "unknown"
---

#  Fortinet 两款产品FortiTester和FortiADC中存在高危命令注入漏洞   

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：FortiADC / FortiTester
- 本文讨论：CVE-2022-39947；CVE-2022-35845
- 版本、权限与配置前提：均需已认证；ADC Web GUI；各分支修复号已给
- 资料类型：多漏洞新闻；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- FortiTester影响4.x全部与4.2.1修复等宽范围需分支边界细化
- 称已发布又说将在修复，时间状态不统一
- 只有二手SecurityWeek，无各产品PSIRT直链；副漏洞无编号

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- 权限级别、实际影响边界待核验
- 引用图片未查看，截图内容及有效性待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->

Ionut Arghire  代码卫士   2023-01-05 18:13  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Az5ZsrEic9ot90z9etZLlU7OTaPOdibteeibJMMmbwc29aJlDOmUicibIRoLdcuEQjtHQ2qjVtZBt0M5eVbYoQzlHiaw/640?wx_fmt=gif "")  
  
   
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
**本周，网络安全解决方案提供商Fortinet 发布了产品中多个漏洞的补丁，并将FortiADC中的高危命令注入漏洞告知客户。该漏洞的编号是CVE-2022-39947，位于FortiADC web接口中，可导致任意代码执行后果。**  
  
  
  
Fortinet 公司解释称，“FortiADC中操作系统命令漏洞中使用的特殊元素中和不当，可导致能够访问 web GUI的认证攻击者通过特殊构造的HTTP请求执行越权代码或命令。”  
  
Fortinet公司提到，该漏洞影响FortiADC 版本5.4.x、6.0.x、6.1.x、6.2.x和7.0.x，将在FortiADC 6.2.4和7.0.2中修复。  
  
Fortinet 公司还发布了FortiTester 中多个高危命令注入漏洞的补丁。这些漏洞被统称为 CVE-2022-35845（CVSS评分7.6），是对特殊元素的中和不当问题，可导致在底层shell中执行任意命令。利用该漏洞要求认证。Fortinet 公司指出，该问题影响FortiTester 版本2.x.x、3.x.x、4.x.x、7.x 和7.1.0，已在FortiTester 版本3.9.2、4.2.1、7.1.1和7.2.0中修复。  
  
本周，Fortinet 公司还修复了其它三个中危漏洞，它们是位于FortiManager 中的用户管理不正确问题，可导致FortiGate 中的无密码管理员后果；FortiPortal 中的输入中和不当漏洞，可导致XSS；以及FortiWeb中的CRLF序列中和不当导致任意标头注入欧国。  
  
Fortinet 公司并未提到这些漏洞已遭利用。  
  
  
****  
代码卫士试用地址：  
https://codesafe.qianxin.com  
  
开源卫士试用地址：  
https://oss.qianxin.com  
  
  
  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[Fortinet 紧急修复已遭利用的VPN漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247514989&idx=1&sn=d69be3f378da5be4993977d510a35a5b&chksm=ea948a07dde303111a95aab98531af127bcaa9ad279aa46a8fbf4f7e56f0053a9bc6ba7c4ac8&scene=21#wechat_redirect)  
  
  
[Fortinet 修复6个高危漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247514392&idx=2&sn=d3a167944c3d8a1d891c716450e26210&chksm=ea948872dde3016465bc0576d1de3d5f0be89e0a4cf7ef01370a82224cb557ef613a3252ccd8&scene=21#wechat_redirect)  
  
  
[Fortinet：立即修复这个严重的认证绕过漏洞！](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247514120&idx=2&sn=e9b6c1a8e128a9eee70880b0fc3cce94&chksm=ea948962dde300745ee1435a5b05de3016d29440d127c2f0dad65ea6b5b80bc83b6a301afaec&scene=21#wechat_redirect)  
  
  
[Fortinet 修复多个路径遍历漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247512788&idx=3&sn=894340534673ba25a49c72eec950b0d7&chksm=ea9483bedde30aa8e9c0b3355eeee1ce56ec6cb1f2d55b60888cea9487bd8397fff4294a955d&scene=21#wechat_redirect)  
  
  
[黑客利用老旧安全缺陷攻破数万未打补丁的 Fortinet VPN 设备](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247507850&idx=3&sn=2ef6c8e24754e7f6c84db9a5eebc9841&chksm=ea94eee0dde367f6cc369d9e7480161d5b32ed4fd175215145390fd16c0d196639a57d4f0bbe&scene=21#wechat_redirect)  
  
  
  
  
**原文链接**  
  
https://www.securityweek.com/high-severity-command-injection-flaws-found-fortinets-fortitester-fortiadc  
  
  
题图：  
Pexels License  
  
‍  
  
  
  
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
