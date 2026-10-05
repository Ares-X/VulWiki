---
source: "gelusus/wxvl 公众号漏洞文库"
title: "VMware 修复严重的Carbon Black App Control漏洞"
product: "VMware Carbon Black App Control"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
source_status: "unknown"
prerequisites: "原文未完整说明身份权限、部署配置和可达性；不能假定匿名、默认开启或所有版本适用。"
side_effects: "原文未完整记录副作用、清理步骤或运行验证；阅读样例不等于获准在真实系统执行。"
id: "vw-d9721139b0f7e7d981c8fbf3"
entity_id: "ve-d9721139b0f7e7d981c8fbf3"
schema_version: "1"
---

# VMware 修复严重的Carbon Black App Control漏洞

<!-- vulwiki-editorial:start -->
## 校订与适用边界


### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- CVE-2023-20858未入元数据
- 明确需要管理控制台权限
- 只列8.7/8.8/8.9而无修复构建
- 原始来源链接实际指向Apple文章
- vRealize Orchestrator背景漏洞另行关联
- 应归安全软件

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

Ryan Naraine  代码卫士   2023-02-22 17:19  
  
![](../../.resource/remote/afc2fa5611a63e89ebec625ecc33d28c5dcdb706b6fbdabb79f7c1e8982068c0.gif "")  
  
   
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
**虚拟化技术巨头VMware 周二推出重要安全修复方案，修复了其面向企业的Carbon Black App Control 产品中的一个严重漏洞 (CVE-2023-20858)。**  
  
  
  
VMware 公司提醒称，攻击者可利用注入exploit，获得对底层服务器操作系统的访问权限，“对App Control 管理员控制台具有特权权限的恶意人员，可能能够利用特殊构造的输入，访问底层服务器操作系统。”  
  
CVE-2023-20858的CVSS 评分为9.1分，影响在微软Windows 操作系统上运行的App Control 版本8.7.x、8.8.x 和8.9.x。据悉，该漏洞由研究员Jari Jääskelä 通过HackerOne 漏洞奖励平台报送。  
  
VMware Carbon Black App Control 是一款由企业防御人员使用的安全产品，目的是确保只有受信任和获得批准的软件才能在关键系统和端点上执行。  
  
VMware 公司还发布了关于重要级别漏洞的安全公告，说明位于vRealize Orchestrator 产品中的一个提权漏洞和信息泄露漏洞。公告指出，“恶意人员如拥有对vRealize Orchestrator 的非管理员访问权限，则能够使用特殊构造的输入绕过XML解析限制，访问敏感信息或可能提升权限。”  
  
****  
代码卫士试用地址：  
https://codesafe.qianxin.com  
  
开源卫士试用地址：https://oss.qianxin.com  
  
  
  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247511052&idx=3&sn=fb116392e405ae62e6c339117fffdb59&chksm=ea949d66dde31470758b6ee8f9dbecdb67ef6c0c8af277f26b83b60dbac95748d28db787a4b4&scene=21#wechat_redirect)  
[奇安信入选全球《软件成分分析全景图》代表厂商](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247515374&idx=1&sn=8b491039bc40f1e5d4e1b29d8c95f9e7&chksm=ea948d84dde30492f8a6c9953f69dbed1f483b6bc9b4480cab641fbc69459d46bab41cdc4859&scene=21#wechat_redirect)  
  
  
[VMware Workstation中存在高危的提权漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247515478&idx=3&sn=6fb6defbf6e53fa69b775f37bed7bbfd&chksm=ea948c3cdde3052a630422bf457d44f24d36236b6ca666929b3ab6ce6cf3774fc646a1dde7ca&scene=21#wechat_redirect)  
  
  
[VMware 修复严重的ESXi和vRealize 漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247515027&idx=2&sn=d86995b203eb6824e5179dc7d57b8bce&chksm=ea948af9dde303ef8f28410ce0027472253b95bbd9447f1a2c538a07bda78c61567e5252f1e7&scene=21#wechat_redirect)  
  
  
[VMware：速修复这三个严重的 Workspace ONE Assist 软件漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247514441&idx=2&sn=a6a4722590de8e046966eacff21ccc02&chksm=ea948823dde301350f7cab83e012dd91120da7da9ed74b0e8ad2b487f5358c0361971fe016a4&scene=21#wechat_redirect)  
  
  
[VMware修复 Cloud Foundation 中严重的RCE漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247514329&idx=2&sn=320754664bbfb1ae127935003f156e17&chksm=ea9489b3dde300a537dc099256a73b6bcdaef1042e63e800592971b520edea0440b6fe35db22&scene=21#wechat_redirect)  
  
  
[这个VMware vCenter Server漏洞去年就已发现，至今仍未修复](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247514181&idx=2&sn=50c62919f4f010b5579d19ba752c7ba5&chksm=ea94892fdde30039043be2fb51e549c347507a0846cf9ad231e6e720f7794502b4dc46dd319c&scene=21#wechat_redirect)  
  
  
  
  
**原文链接**  
  
  
https://www.securityweek.com/apple-updates-advisories-as-security-firm-discloses-new-class-of-vulnerabilities/  
  
  
题图：网络  
  
  
  
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
