---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  Orval 中存在严重的代码注入漏洞，存在供应链安全风险  
Ravie Lakshmanan
                    Ravie Lakshmanan  代码卫士   2026-01-22 10:34  
  
   
![](https://mmbiz.qpic.cn/mmbiz_gif/Az5ZsrEic9ot90z9etZLlU7OTaPOdibteeibJMMmbwc29aJlDOmUicibIRoLdcuEQjtHQ2qjVtZBt0M5eVbYoQzlHiaw/640?wx_fmt=gif "")  
   
聚焦源代码安全，网罗国内外最新资讯！  
   
  
编译：代码卫士  
  
![](https://mmbiz.qpic.cn/mmbiz_png/oBANLWYScMRSylJK2k7H6mNqiaS2G6WRaeeK34cLHE6pe9VeOIHYiboAnKB0TMoayZCxFpHMLljzTnz9DnNuFiaqQ/640?wx_fmt=png "")  
  
  
  
专栏·供应链安全  
  
  
数字化时代，软件无处不在。软件如同社会中的“虚拟人”，已经成为支撑社会正常运转的最基本元素之一，软件的安全性问题也正在成为当今社会的根本性、基础性问题。  
  
  
随着软件产业的快速发展，软件供应链也越发复杂多元，复杂的软件供应链会引入一系列的安全问题，导致信息系统的整体安全防护难度越来越大。近年来，针对软件供应链的安全攻击事件一直呈快速增长态势，造成的危害也越来越严重。  
  
  
为此，我们推出“供应链安全”栏目。本栏目汇聚供应链安全资讯，分析供应链安全风险，提供缓解建议，为供应链安全保驾护航。  
  
  
注：以往发布的部分供应链安全相关内容，请见文末“推荐阅读”部分。  
  
  
**JavaScript****的重要 npm 包 Orval 中存在一个严重的代码注入漏洞CVE-2026-23947（CVSS评分9.3），威胁数百万项目的软件供应链安全。依赖Orval从OpenAPI规范生成类型安全客户端的开发者应立即更新。**  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
Orval的每月下载量超过200万次，是团队自动化创建TypeScript客户端的必备工具。该漏洞存在于Orval处理OpenAPI规范中特定字段的方式。攻击者可利用不受信任的规范，将恶意代码直接注入生成的客户端文件中。  
  
安全公告提到，该漏洞的根源在于“x-enum-descriptions”字段，“该漏洞可导致不受信任的OpenAPI规范通过 x-enum-descriptions 字段将任意TypeScript/JavaScript代码注入生成的客户端中，而该字段在getEnumImplementation() 函数中未经适当转义就被嵌入。”  
  
本质上，如果开发者从一个恶意或被篡改的API规范生成客户端，那么生成的代码中可能包含一个隐藏的有效负载。安全公告确认，“注入发生在常量枚举生成期间，导致生成的模式文件中包含可执行代码。”  
  
值得注意的是，这并非该特定模式首次引发问题。报告指出，“该问题本质上与最近修补的MCP漏洞（CVE-2026-22785）类似，但影响了 @orval/core中一个不同的代码路径，而该路径未在上次修复中得到处理。”  
  
该漏洞的可造成严重后果。成功利用该漏洞会导致"在消费生成客户端的环境中执行任意代码"。这意味着恶意代码并非在托管API的服务器上执行，而是在集成该生成客户端的开发者或用户的应用内部执行。  
  
维护者已发布补丁修复该漏洞。开发者用户应立即升级至Orval 8.0.2版本，以确保所生成客户端的安全。  
  
  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/oBANLWYScMTBzmfDJA6rWkgzD5KIKNibpR0szmPaeuu4BibnJiaQzxBpaRMwb8icKTeZVEuWREJwacZm3wElt7vOtQ/640?wx_fmt=jpeg "")  
  
  
  
  
开源  
卫士试用地址：  
https://sast.qianxin.com/#/login  
  
代码卫士试用地址：  
https://codesafe.qianxin.com  
  
  
  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[开源自托管平台 Coolify 修复11个严重漏洞，可导致服务器遭完全攻陷](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247524828&idx=2&sn=21af241f60f1452013815133745e9a72&scene=21#wechat_redirect)  
  
  
[得不到就毁掉：第二轮Sha1-Hulud供应链攻击已发起，影响2.5万+仓库](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247524487&idx=1&sn=f170d3131122071dec6e419c6cff562c&scene=21#wechat_redirect)  
  
  
[vLLM 高危漏洞可导致RCE](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247524481&idx=3&sn=6d0b161f8add2f6c1ee65e60ef6955d8&scene=21#wechat_redirect)  
  
  
[开源AI框架 Ray 的0day已用于攻陷服务器和劫持资源](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247519162&idx=1&sn=3872fcc82018e2c561d9e4e7574f0c8e&scene=21#wechat_redirect)  
  
  
[热门 React Native NPM 包中存在严重漏洞，开发人员易受攻击](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247524330&idx=2&sn=bc54e02a8f815ed78b67d3135a9f9607&scene=21#wechat_redirect)  
  
  
[10个npm包被指窃取 Windows、macOS 和 Linux 系统上的开发者凭据](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247524314&idx=2&sn=81cae6998a39f2153ed18d7cc065303b&scene=21#wechat_redirect)  
  
  
[热门 React Native NPM 包中存在严重漏洞，开发人员易受攻击](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247524330&idx=2&sn=bc54e02a8f815ed78b67d3135a9f9607&scene=21#wechat_redirect)  
  
  
[热门NPM库 “coa” 和“rc” 接连遭劫持，影响全球的 React 管道](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247508946&idx=1&sn=273c58d08a4225306a567cf6a150f40c&scene=21#wechat_redirect)  
  
  
[开发人员注意：VSCode 应用市场易被滥用于托管恶意扩展](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247515219&idx=1&sn=faa32338df1d68e7cd738a80222f3a44&scene=21#wechat_redirect)  
  
  
[GitHub Copilot 严重漏洞可导致私有仓库源代码被盗](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247524163&idx=1&sn=d70a7c55e27a3e179522330a9ce62b0b&scene=21#wechat_redirect)  
  
  
[受 Salesforce 供应链攻击影响，全球汽车巨头 Stellantis 数据遭泄露](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247524053&idx=1&sn=2b843932ebd4eeeb17b6935b08be82f8&scene=21#wechat_redirect)  
  
  
[捷豹路虎数据遭泄露生产仍未恢复，幕后黑手或与 Salesforce-Salesloft 供应链攻击有关](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247523990&idx=1&sn=ad9957a5c3d054d4a0bf32250bceb556&scene=21#wechat_redirect)  
  
  
[十几家安全大厂信息遭泄露，谁是 Salesforce-Salesloft 供应链攻击的下一个受害者？](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247523972&idx=1&sn=7b06c31940ea7576d0236d9310886b39&scene=21#wechat_redirect)  
  
  
[第三方集成应用 Drift OAuth 令牌被用于攻陷 Salesforce 实例，全球700+家企业受影响](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247523952&idx=1&sn=2bc84253019e6c2525bcf928eaed696c&scene=21#wechat_redirect)  
  
  
[黑客发动史上规模最大的 NPM 供应链攻击，影响全球10%的云环境](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247523990&idx=2&sn=6e38e1ee8cd69f1375a5be218c02ff97&scene=21#wechat_redirect)  
  
  
[十几家安全大厂信息遭泄露，谁是 Salesforce-Salesloft 供应链攻击的下一个受害者？](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247523972&idx=1&sn=7b06c31940ea7576d0236d9310886b39&scene=21#wechat_redirect)  
  
  
[第三方集成应用 Drift OAuth 令牌被用于攻陷 Salesforce 实例，全球700+家企业受影响](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247523952&idx=1&sn=2bc84253019e6c2525bcf928eaed696c&scene=21#wechat_redirect)  
  
  
[AI供应链易遭“模型命名空间复用”攻击](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247523962&idx=1&sn=2d9b8ca044c242a6ae1f72df93d7acb0&scene=21#wechat_redirect)  
  
  
[Frostbyte10：威胁全球供应链的10个严重漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247523957&idx=2&sn=288b0d14a657b13c7f1a6b14705a44e8&scene=21#wechat_redirect)  
  
  
[PyPI拦截1800个过期域名邮件，防御供应链攻击](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247523850&idx=2&sn=72dc01d9984a720959b312dd0e7cf05e&scene=21#wechat_redirect)  
  
  
[PyPI恶意包利用依赖引入恶意行为，发动软件供应链攻击](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247523844&idx=2&sn=08c8962eead61fe76467a9196b3da3e5&scene=21#wechat_redirect)  
  
  
[黑客利用虚假 PyPI 站点钓鱼攻击Python 开发人员](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247523700&idx=2&sn=463d300bdfd3de129cd5d258ceb67cf4&scene=21#wechat_redirect)  
  
  
[700多个恶意误植域名库盯上RubyGems 仓库](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247492823&idx=2&sn=9c226ff328303e78331451ac5219df07&scene=21#wechat_redirect)  
  
  
[NPM “意外” 删除 Stylus 合法包 全球流水线和构建被迫中断](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247523648&idx=1&sn=d9237c45bf78637d1cdd3bedd1d873e6&scene=21#wechat_redirect)  
  
  
[固件开发和更新缺陷导致漏洞多年难修，供应链安全深受其害](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247523615&idx=1&sn=1df256011200be03dc2afc80016c587e&scene=21#wechat_redirect)  
  
  
[NPM仓库被植入67个恶意包传播恶意软件](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247523592&idx=2&sn=5087c0aa841caf3f0def9a1ca6c5ad27&scene=21#wechat_redirect)  
  
  
[在线阅读版：《2025中国软件供应链安全分析报告》全文](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247523516&idx=1&sn=0b6fc53ba92e7b5135395b67fff6a822&scene=21#wechat_redirect)  
  
  
[NPM软件供应链攻击传播恶意软件](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247523234&idx=2&sn=ac4e0656fd04218349d356761af176dd&scene=21#wechat_redirect)  
  
  
[隐秘的 npm 供应链攻击：误植域名导致RCE和数据破坏](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247523167&idx=2&sn=4249c8e9e0dace01810c665eda52c421&scene=21#wechat_redirect)  
  
  
[NPM恶意包利用Unicode 隐写术躲避检测](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247523031&idx=2&sn=5071cdb63bdd6339b1a3ff7ef3581cd5&scene=21#wechat_redirect)  
  
  
[Aikido在npm热门包 rand-user-agent 中发现恶意代码](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247522945&idx=1&sn=c767722383afc7e6b505aef2f50ba4cd&scene=21#wechat_redirect)  
  
  
[密币Ripple 的NPM 包 xrpl.js 被安装后门窃取私钥，触发供应链攻击](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247522841&idx=2&sn=024b6c290bf4ebecc241f11bc944be1c&scene=21#wechat_redirect)  
  
  
  
  
**原文链接**  
  
https://securityonline.info/supply-chain-alert-critical-code-injection-flaw-cvss-9-3-in-orval/  
  
  
**本文由奇安信编译，不代表****奇安信观点。转载请注明“转自奇安信代码卫士 https://codesafe.qianxin.com”。**  
  
  
  
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
