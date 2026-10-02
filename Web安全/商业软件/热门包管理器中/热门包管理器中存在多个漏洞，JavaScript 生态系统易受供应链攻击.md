---
source: "gelusus/wxvl 公众号漏洞文库"
title: "npm/pnpm/vlt/Bun PackageGate 四包管理器六类防护绕过新闻"
product: "npm/pnpm/vlt/Bun PackageGate"
record_type: "roundup"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "CVE-2025-69263;CVE-2025-69264"
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "未列任何受影响/修复版本，Git/tarball依赖安装前提"
prerequisites: "需受害构建安装攻击者控制依赖，不是裸网络服务RCE"
side_effects: "请求可能删除/覆盖数据、修改账号或持久改变业务状态"
review_date: "2026-10-02"
identifier_role: "primary"
source_status: "unknown"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E7%83%AD%E9%97%A8%E5%8C%85%E7%AE%A1%E7%90%86%E5%99%A8%E4%B8%AD/%E7%83%AD%E9%97%A8%E5%8C%85%E7%AE%A1%E7%90%86%E5%99%A8%E4%B8%AD%E5%AD%98%E5%9C%A8%E5%A4%9A%E4%B8%AA%E6%BC%8F%E6%B4%9E%EF%BC%8CJavaScript%20%E7%94%9F%E6%80%81%E7%B3%BB%E7%BB%9F%E6%98%93%E5%8F%97%E4%BE%9B%E5%BA%94%E9%93%BE%E6%94%BB%E5%87%BB.md"
id: "vw-6fb5d6ce5343fdc2bef54d52"
entity_id: "ve-6fb5d6ce5343fdc2bef54d52"
schema_version: "1"
---

# npm/pnpm/vlt/Bun PackageGate 四包管理器六类防护绕过新闻

## 条目说明

- 对象与具体问题：npm/pnpm/vlt/Bun PackageGate；四包管理器六类防护绕过新闻
- 版本、配置及部署条件：未列任何受影响/修复版本，Git/tarball依赖安装前提
- 认证与权限前提：需受害构建安装攻击者控制依赖，不是裸网络服务RCE
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 开头NLT后文VLT不一致应核vlt正式名，目录取标题错误，迁供应链/开发工具
- 两主CVE69263/69264是pnpm，不能分配给全部六漏洞；其他无编号问题应独立实体
- 六项按工具分为脚本执行、路径遍历、完整性缺失不同根因，避免同PackageGate全部合并一漏洞
- npm设计预期与GitHub称正在修问题的表述需原始来源澄清，保留双方意见及历史日期
- 只有SecurityWeek链接无Koi/官方GHSA/补丁，删除长重复推荐/产品推广

## 操作风险

请求可能删除/覆盖数据、修改账号或持久改变业务状态。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

Ionut Arghire
                    Ionut Arghire  代码卫士   2026-01-28 10:25  
  
   
![](https://mmbiz.qpic.cn/mmbiz_gif/Az5ZsrEic9ot90z9etZLlU7OTaPOdibteeibJMMmbwc29aJlDOmUicibIRoLdcuEQjtHQ2qjVtZBt0M5eVbYoQzlHiaw/640?wx_fmt=gif "")  
   
聚焦源代码安全，网罗国内外最新资讯！  
   
  
编译：代码卫士  
  
![](https://mmbiz.qpic.cn/mmbiz_png/oBANLWYScMRSylJK2k7H6mNqiaS2G6WRaeeK34cLHE6pe9VeOIHYiboAnKB0TMoayZCxFpHMLljzTnz9DnNuFiaqQ/640?wx_fmt=png "")  
  
  
  
专栏·供应链安全  
  
  
数字化时代，软件无处不在。软件如同社会中的“虚拟人”，已经成为支撑社会正常运转的最基本元素之一，软件的安全性问题也正在成为当今社会的根本性、基础性问题。  
  
  
随着软件产业的快速发展，软件供应链也越发复杂多元，复杂的软件供应链会引入一系列的安全问题，导致信息系统的整体安全防护难度越来越大。近年来，针对软件供应链的安全攻击事件一直呈快速增长态势，造成的危害也越来越严重。  
  
  
为此，我们推出“供应链安全”栏目。本栏目汇聚供应链安全资讯，分析供应链安全风险，提供缓解建议，为供应链安全保驾护航。  
  
  
注：以往发布的部分供应链安全相关内容，请见文末“推荐阅读”部分。  
  
  
**安全公司 Koi 指出，JavaScript 生态系统的领先包管理器 NPM、PNPM、NLT和Bun中存在六个漏洞，可用于绕过供应链攻击防护措施。**  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
这些漏洞被统称为 “PackageGate”，可导致隐藏在受攻击者控制的依赖中的恶意代码被执行。自影响巨大的 NPM 供应链攻击如 Shai-Hulud 和 PhantomRaven 发生后，组织机构和开发人员等都广泛采取两种防御机制：阻止包安装时自动执行代码以及确保软件包的完整性。  
  
Koi 公司解释称，第一个防护机制是通过设置一个配置项，来禁止在安装程序包时运行预安装、安装和安装后脚本。第二种机制会记录每个包在依赖树中的版本、完整性哈希值以及在后续安装时根据这些哈希值检查所有软件包。  
  
Koi 公司提到，影响这四个包管理器的六个漏洞可绕过这些防护措施，导致完全的远程代码执行后果。然而，对于每个管理器而言，攻击技术各不相同。在NPM中，含有恶意 .npmrc 文件的 Git 依赖可用于RCE。在PNPM中，默认禁用脚本的防护措施仅适用于构建阶段，不适用于 Git 依赖处理过程。在VLT中，tarball 提取操作中的路径遍历可导致在系统上进行任意文件写，而位于 Bun 中的脚本执行白名单仅适用于包名称，而不适用于来源，导致攻击者可伪造包实现RCE。另外，研究人员发现 PNPM 和 VLT 仅存储 tarball 依赖项的URL，而未记录完整的哈希值。因此，在初始安装过程中通过安全检查的 tarball 可被修改，从而在后续安装过程中投送恶意代码。研究人员提到，“将包插入依赖树（即使嵌套多层）可根据时间、IP地址或他们所想要的任何其它信号来推送目标 payload。”  
  
研究人员已将这些漏洞报送给所有的这四家包管理器。PNPM、VLT和Bun 在几周内予以修复，其中PNPM为这些漏洞分配的编号是CVE-2025-69263和CVE-2025-69264。  
  
研究人员表示，NPM 将报告标记为“仅提供参考信息”，称相关功能按设计预期运行。研究人员提到，与该安全问题相关的风险真实存在，威胁人员已开始讨论滥用恶意 .npmrc 文件编写 PoC 代码。NPM的母公司 GitHub 提到，通过 Git 为所安装包安装依赖是预期设计，用户在安装 Git 依赖时即意味着信任该仓库的全部内容。GitHub 表示，“我们正在积极着手修复所报送的这个新问题，因为NPM正在积极扫描该注册表中的恶意软件。NPM生态系统的安全性需要共同努力，我们强烈鼓励各项目采用可信的发布和精细化访问令牌，并执行双因素认证机制来巩固软件供应链的安全。GitHub 将继续加大对增强 NPM 安全性的投入，近期已实施认证和令牌管理的多项改进措施。”  
  
  
  
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
  
https://www.securityweek.com/packagegate-flaws-open-javascript-ecosystem-to-supply-chain-attacks/  
  
  
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
