---
source: "gelusus/wxvl 公众号漏洞文库"
id: "vw-5b5d16cfcc514540a25e08a5"
entity_id: "ve-5b5d16cfcc514540a25e08a5"
schema_version: "1"
title: "F5 BIG-IP 高危漏洞可导致拒绝服务和代码执行"
product: "F5 BIG-IP iControl SOAP"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "primary"
primary_identifiers: "CVE-2023-22374"
referenced_identifiers: ""
prerequisites: "需管理员；读内存需日志访问；RCE依赖环境信息；各分支范围已列"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/F5%20BIG-IP/F5%20BIG-IP%20%E9%AB%98%E5%8D%B1%E6%BC%8F%E6%B4%9E%E5%8F%AF%E5%AF%BC%E8%87%B4%E6%8B%92%E7%BB%9D%E6%9C%8D%E5%8A%A1%E5%92%8C%E4%BB%A3%E7%A0%81%E6%89%A7%E8%A1%8C.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_status: "unknown"
---

#  F5 BIG-IP 高危漏洞可导致拒绝服务和代码执行   

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：F5 BIG-IP iControl SOAP
- 本文讨论：CVE-2023-22374
- 版本、权限与配置前提：需管理员；读内存需日志访问；RCE依赖环境信息；各分支范围已列
- 资料类型：新闻通告；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- %n写入的是已输出字符数而非直接任意数据，叙述过简
- 无补丁但工程热修复应作为2023历史状态；缺一手F5/Rapid7链接
- 保留仅崩溃容易、RCE未证实的区分

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- 修复版本与格式字符串利用范围待核验
- 引用图片未查看，截图内容及有效性待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->

Ionut Arghire  代码卫士   2023-02-03 18:13  
  
![](../../.resource/remote/afc2fa5611a63e89ebec625ecc33d28c5dcdb706b6fbdabb79f7c1e8982068c0.gif "")  
  
   
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
**F5 提醒称，BIG-IP 中存在一个高危格式化字符串漏洞 (CVE-2023-22374)，可导致认证攻击者触发拒绝服务条件并可能执行任意代码。**  
  
  
  
该漏洞影响一个公开的API即 iControl SOAP，该API用于赋能系统间的通信。SOAP接口可通过BIG-IP管理端口和/或自己的IP地址从网络访问，且仅限于管理员账户。  
  
发现该漏洞的Rapid 7 公司研究员解释称，攻击者可将格式化字符串规范插入传递到系统日志函数的特定参数中，导致该服务读写栈中所引用的内存地址。不过研究人员解释称，只有对系统日志拥有访问权限，攻击者才能读取内存，“影响特定地址被读取和写入比较难，因此在实际中该漏洞很难被利用（除非服务崩溃）”。  
  
研究人员提到，攻击者可通过 “%s”规则使服务崩溃并使用 ‘%n’ 规则将任意数据写入栈中的任意指针中，从而可能导致远程代码执行后果。  
  
F5 公司在安全公告中指出，利用该漏洞实现代码执行后果的攻击者，首先需要收集运行该易受攻击组件的环境信息，而该漏洞仅暴露了控制面板而非数据面板。研究人员表示，“攻击成功造成的最可能的后果是导致服务器进程崩溃。技能较高的攻击者可能会开发远程代码执行exploit，以root用户身份在F5 BIG-IP设备上运行代码。”  
  
该漏洞影响BIG-IP 版本13.1.5、14.1.4.6到14.1.5、15.1.5.1到15.1.8、16.1.2.2到16.1.3和17.0.0版本。目前该漏洞尚无补丁，不过F5 公司表示已经给出工程热修复方案。  
  
由于该漏洞仅可遭认证用户利用，因此应仅允许受信任用户访问 iControl SOAP API。  
  
CVE-2023-22374对于标准部署模式下的BIG-IP 系统的CVSS评分为7.5，而对于应用模式下的BIG-IP 实例的CVSS评分为8.5。  
  
BIG-IP SPK、BIP-IQ、F5OS-C、NGINX和Traffix SDC不受该漏洞影响。  
  
  
****  
代码卫士试用地址：  
https://codesafe.qianxin.com  
  
开源卫士试用地址：  
https://oss.qianxin.com  
  
  
  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247511052&idx=3&sn=fb116392e405ae62e6c339117fffdb59&chksm=ea949d66dde31470758b6ee8f9dbecdb67ef6c0c8af277f26b83b60dbac95748d28db787a4b4&scene=21#wechat_redirect)  
[奇安信入选全球《软件成分分析全景图》代表厂商](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247515374&idx=1&sn=8b491039bc40f1e5d4e1b29d8c95f9e7&chksm=ea948d84dde30492f8a6c9953f69dbed1f483b6bc9b4480cab641fbc69459d46bab41cdc4859&scene=21#wechat_redirect)  
  
  
[F5 BIG-IP 中存在严重的RCE漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247511649&idx=1&sn=2d9be3c3a8cdaf6d29d8a13e49ef8ade&chksm=ea949f0bdde3161d6555a751e3ebbfcafc81bf7054808d430d94245936a2cff9d6591e182d51&scene=21#wechat_redirect)  
  
[F5 多款产品中存在多个RCE漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247514661&idx=1&sn=ed03e7c7fed936ce5c82e4583a0df074&chksm=ea948b4fdde302593a589756559c66f23db2dff4547b4b3a335485b1a65abafd877d7bc5310a&scene=21#wechat_redirect)  
  
  
[F5紧急修复严重的 BIG-IP 预认证 RCE 漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247502189&idx=3&sn=61decbf4d30e5620cdc2da9411057ff4&chksm=ea94f807dde371116d47ae9dcfbe607adfc79f03bb74b3f0af9cdb81963f832173d29c0031c1&scene=21#wechat_redirect)  
  
  
[F5 以6.7亿美金收购 NGINX](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247489404&idx=3&sn=ef5661e9f10525c4b74aeaaf826f89b8&chksm=ea972616dde0af0022d5638e629f41d252f5967779eab21ce079d74e2096a019c20d5dcb1a3a&scene=21#wechat_redirect)  
  
  
  
  
**原文链接**  
  
https://www.securityweek.com/f5-working-on-patch-for-big-ip-flaw-that-can-lead-to-dos-code-execution/  
  
  
题图：  
Pixabay License  
  
‍  
  
  
  
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
