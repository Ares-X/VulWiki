---
source: "gelusus/wxvl 公众号漏洞文库"
id: "vw-5d3b4fa1b3c3e8d07880d731"
entity_id: "ve-5d3b4fa1b3c3e8d07880d731"
schema_version: "1"
title: "CISA称微软 SharePoint RCE 漏洞已遭在野利用"
product: "Microsoft SharePoint Server"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "primary"
primary_identifiers: "CVE-2023-24955"
referenced_identifiers: ""
prerequisites: "24955需Site Owner；结合29357可预认证，版本未列"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%AE%89%E5%85%A8%E8%AE%BE%E5%A4%87/CISA/CISA%E7%A7%B0%E5%BE%AE%E8%BD%AF%20SharePoint%20RCE%20%E6%BC%8F%E6%B4%9E%E5%B7%B2%E9%81%AD%E5%9C%A8%E9%87%8E%E5%88%A9%E7%94%A8.md"
review_date: "2026-10-02"
category_recommendation: "Web安全/服务器应用/SharePoint"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_status: "unknown"
---

#  CISA称微软 SharePoint RCE 漏洞已遭在野利用   

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Microsoft SharePoint Server
- 本文讨论：CVE-2023-24955主，29357认证绕过链
- 版本、权限与配置前提：24955需Site Owner；结合29357可预认证，版本未列
- 资料类型：SharePoint链KEV新闻；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- CISA为报告机构，分类应SharePoint服务端
- 9月PoC后一个月却跳到1月31修复截止，时间叙述不自洽；需各事件绝对日期
- KEV未确认勒索利用不等于证明未用于勒索；只有二手新闻来源

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- 微软补丁KB、KEV两项日期和事件归因待核
- 引用图片未查看，截图内容及有效性待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->

Sergiu Gatlan  代码卫士   2024-03-28 17:29  
  
![](../../.resource/remote/afc2fa5611a63e89ebec625ecc33d28c5dcdb706b6fbdabb79f7c1e8982068c0.gif "")  
  
   
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
**CISA 提醒称攻击者正在利用微软 SharePoint 代码注入漏洞发动攻击。而组合一个严重的提权漏洞，即可执行预认证RCE攻击。第一个漏洞的编号是CVE-2023-24955，可导致具有Site Owner权限的认证攻击者在易受攻击服务器上远程执行代码。第二个漏洞CVE-2023-29357可导致远程攻击者通过受欺骗的 JWT 认证令牌绕过认证，获得易受攻击 SharePoint 服务器上的管理员权限。**  
  
  
STAR Labs 研究员 Janggggg 在2023年Pwn2Own 温哥华大赛上演示表明，未认证攻击者可组合利用这两个漏洞在未修复服务器上获得RCE权限。就在该研究员发布技术详情说明利用过程后的第二天即9月25日，GitHub 上就出现了CVE-2023-29357的PoC利用。  
  
尽管该 PoC 利用无法使攻击者获得目标系统的RCE权限，但威胁人员仍然可进行修改，通过CVE-2023-24955利用能力完成利用链，发动 RCE 攻击。之后，针对该利用链的多个 PoC 利用出现在网络，使得技能较低的攻击者也可使用。一个月之后，CISA 将 CVE-2023-29357增加到必修清单并要求美国联邦机构在1月31日前修复。  
  
本周二，CISA将CVE-2023-24955代码注入漏洞也纳入已遭利用漏洞清单。根据要求，联邦机构必须在4月16日前保护SharePoint服务器的安全。虽然CISA并未说明组合利用这两个Sharepoint漏洞的共计详情，但表示并未用于勒索攻击中。  
  
CISA 提到，“这类漏洞常常是恶意网络人员的攻击向量，并对联邦企业带来重大风险。”虽然CISA的必修清单主要关注的是联邦机构尽快修复漏洞，但建议私营组织机构也优先修复该利用链。  
  
  
  
代码卫士试用地址：  
https://codesafe.qianxin.com  
  
开源卫士试用地址：https://oss.qianxin.com  
  
  
  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[新瓶装旧酒：微软修复3个月后，SharePoint RCE 漏洞重现](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247511813&idx=2&sn=88dc3853240665eb7fc5ad56a21a50ea&chksm=ea949e6fdde317799af44ba2161215a6021d98607b5a9de999db326342e3b7c84125d847801f&scene=21#wechat_redirect)  
  
  
[微软将本地版Exchange、SharePoint和Skype 纳入漏洞奖励计划](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247511275&idx=4&sn=efe2927c135f8cf5c5c2663330e1a4f3&chksm=ea949d81dde31497c5ade51ddb1de4709626af7f0d773fe10c928c1eb7a230fd5b290868d5ff&scene=21#wechat_redirect)  
  
  
[比 Windows DNS 蠕虫漏洞更严重！SharePoint 反序列化RCE漏洞详情已发布，速修复](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247494226&idx=1&sn=53966f7edd1a0b5bdec134da241a8ff9&chksm=ea94db38dde3522e0d1cb2eae0ecad083af835002e18ce768903161a44d76995eda6387e65c9&scene=21#wechat_redirect)  
  
  
[多个黑客组织正在攻击微软 SharePoint 服务器](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247489933&idx=2&sn=ba11edbd165005c6383a671b30670e8d&chksm=ea9728e7dde0a1f11f5ac3d441fdc41b8f67589a5c0f4dfede8f58f548e665f2babc357da100&scene=21#wechat_redirect)  
  
  
[微软修复SharePoint 2013中的XSS漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247485881&idx=3&sn=75aece8bc928931b58e5c27ace701fcd&chksm=ea9738d3dde0b1c5964f135eb636af076c88ad9ce2c2511d44b1898b43f70c251680f2f7122f&scene=21#wechat_redirect)  
  
  
  
  
**原文链接**  
  
  
https://www.bleepingcomputer.com/news/security/cisa-tags-microsoft-sharepoint-rce-bug-as-actively-exploited/  
  
  
题图：  
Pixabay  
 License  
  
****  
**本文由奇安信编译，不代表奇安信观点。转载请注明“转自奇安信代码卫士 https://codesafe.qianxin.com”。**  
  
  
  
  
![](../../.resource/remote/2c03ce3cc6bb81bca85bd412ed60e93c4bc0a295a1fc9d3739d8aca43497fbb4.jpg "")  
  
![](../../.resource/remote/b33054170f5acbf0023711f517b5bee9799a2f57b155a774d3945e6d78184e63.jpg "")  
  
**奇安信代码卫士 (codesafe)**  
  
国内首个专注于软件开发安全的产品线。  
  
   ![](../../.resource/remote/8a5c84b98d9b52b1d4f4306180ec26c9aa65342b326b5b98ad2f097b488152f4.gif "")  
  
   
觉得不错，就点个 “  
在看  
” 或 "  
赞  
” 吧~  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
