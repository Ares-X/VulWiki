---
source: "gelusus/wxvl 公众号漏洞文库"
cve: "CVE-2023-23529;CVE-2023-23514"
identifier_role: "primary"
primary_identifiers: "CVE-2023-23529;CVE-2023-23514"
referenced_identifiers: ""
identifier_status: "unknown"
title: "已遭利用的 WebKit 0day"
product: "Apple WebKit及系统内核"
record_type: "advisory"
document_type: "安全更新新闻"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
prerequisites: "恶意网页触发23529；文中iOS/iPadOS16.3.1、Ventura13.2.1更新，23514另需恶意应用等条件核验"
side_effects: "浏览器代码执行不自动意味着OS崩溃或内核执行；23514不应借23529在野状态关联推断已遭利用"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E6%A1%8C%E9%9D%A2%E8%BD%AF%E4%BB%B6/Webkit/%E5%B7%B2%E9%81%AD%E5%88%A9%E7%94%A8%E7%9A%84%20WebKit%200day.md"
archive_commit: "41940cb0038d09ca5aaddbe5bffb923e423d210f"
source_status: "recorded"
source_note: "正文标注的原文链接；链接内容及权威性未在本次重新核验"
source_url: "https://www.bleepingcomputer.com/news/security/apple-fixes-new-webkit-zero-day-exploited-to-hack-iphones-macs/"
id: "vw-fa1575f3062860af074a0189"
entity_id: "ve-fa1575f3062860af074a0189"
schema_version: "1"
---

# 已遭利用的 WebKit 0day

<!-- vulwiki-editorial-rebuild:system-misc -->
## 条目范围与校订

- 本文对象：Apple WebKit及系统内核
- 文献类型：安全更新新闻
- 版本、权限及部署边界：恶意网页触发23529；文中iOS/iPadOS16.3.1、Ventura13.2.1更新，23514另需恶意应用等条件核验
- 核验状态：仅重建文本校订；未执行文中代码、PoC 或扫描，未把截图或转载声明记为本站复现

### 具体结论与待核项

以下为原归档的逐项勘误与证据缺口；可由文本确定的问题已在下文订正，仍缺来源的事实保持待核。

1. 无CVE元数据但正文含WebKit与内核两个漏洞，不能统一归为WebKit
2. 正文称Safari16.3.1受影响同时叙述安全更新，需核对是否误将修复版本写为受影响
3. 浏览器代码执行不自动意味着OS崩溃或内核执行；23514不应借23529在野状态关联推断已遭利用
4. 设备清单是可更新设备与受影响范围混合，需逐分支核对；仅转载媒体链接，补Apple原始公告
5. 清理大量相关阅读、空链接和广告，保留2023日期

### 操作风险

浏览器代码执行不自动意味着OS崩溃或内核执行；23514不应借23529在野状态关联推断已遭利用

技术请求、代码与实验方法按原文保留；其中的破坏性动作仅限授权、可恢复的隔离环境。缺失代码、参数或版本事实不猜补。

### 来源追溯

- 原文标注出处：<https://www.bleepingcomputer.com/news/security/apple-fixes-new-webkit-zero-day-exploited-to-hack-iphones-macs/>
- 原文参考链接（未重新核验）：<https://codesafe.qianxin.com>
- 原文参考链接（未重新核验）：<https://oss.qianxin.com>
- 原文参考链接（未重新核验）：<http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247511052&idx=3&sn=fb116392e405ae62e6c339117fffdb59&chksm=ea949d66dde31470758b6ee8f9dbecdb67ef6c0c8af277f26b83b60dbac95748d28db787a4b4&scene=21#wechat_redirect>
- 原文参考链接（未重新核验）：<http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247515374&idx=1&sn=8b491039bc40f1e5d4e1b29d8c95f9e7&chksm=ea948d84dde30492f8a6c9953f69dbed1f483b6bc9b4480cab641fbc69459d46bab41cdc4859&scene=21#wechat_redirect>
- 原文参考链接（未重新核验）：<http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247515027&idx=1&sn=93ebe9404e1ead6aa5f784abf7fab31a&chksm=ea948af9dde303ef597a5e12dd8faab95e3127a6e8214fe9cdfba93dbcd4e59095001090e30f&scene=21#wechat_redirect>
- 原文参考链接（未重新核验）：<http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247514319&idx=1&sn=10f6c5afa8be65b7ccac62c9ab73645c&chksm=ea9489a5dde300b312a93ec52a321f835baed001465326883dd6cdbbe70fecd5b94b1b8000c7&scene=21#wechat_redirect>

### 归档技术正文

Sergiu Gatlan  代码卫士   2023-02-14 16:52  
  
![](../../.resource/remote/afc2fa5611a63e89ebec625ecc33d28c5dcdb706b6fbdabb79f7c1e8982068c0.gif "")  
  
   
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
**苹果公司发布紧急安全更新，修复了被用于攻击iPhone、iPad和Mac等设备的新0day。**  
  
该0day的编号为CVE-2023-23529，是一个WebKit混淆漏洞，可用于在受陷设备上触发OS崩溃并获得代码执行权限。当用户打开恶意网页时，攻击者可利用该漏洞在运行易受攻击 iOS、iPadOS和macOS版本的设备上执行任意代码。该漏洞还影响macOS Big Sur 和 Monterey 上的Safari 16.3.1。  
  
苹果公司对该0day的说明是“处理恶意构造的web内容可导致任意代码执行。苹果已发现该漏洞遭活跃利用的报告。”  
  
苹果公司已推出iOS 16.3.1、iPadOS 16.3.1和macOS Ventura 13.2.1版本，修复了上述漏洞。受影响设备数量很多，因为该漏洞同时影响老旧版本和新版本，包括：  
  
- iPhone 8和后续版本  
  
- iPad Pro（所有机型）、iPad Air第三代及后续版本、iPad第五代及后续版本以及iPad mini第五代及后续版本。  
  
- 运行macOS Ventura 的Mac设备  
  
  
  
另外，苹果还修复了一个释放后使用漏洞 (CVE-2023-23514)，攻击者可通过在Mac和iPhone 上的内核权限执行任意代码。  
  
  
**苹果今年修复的第一个0day**  
  
  
  
  
  
尽管苹果公司披露称已发现该漏洞遭在野利用的报告，但尚未发布关于这些攻击的信息。  
  
  
****  
****  
****  
代码卫士试用地址：  
https://codesafe.qianxin.com  
  
开源卫士试用地址：  
https://oss.qianxin.com  
  
  
  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247511052&idx=3&sn=fb116392e405ae62e6c339117fffdb59&chksm=ea949d66dde31470758b6ee8f9dbecdb67ef6c0c8af277f26b83b60dbac95748d28db787a4b4&scene=21#wechat_redirect)  
[奇安信入选全球《软件成分分析全景图》代表厂商](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247515374&idx=1&sn=8b491039bc40f1e5d4e1b29d8c95f9e7&chksm=ea948d84dde30492f8a6c9953f69dbed1f483b6bc9b4480cab641fbc69459d46bab41cdc4859&scene=21#wechat_redirect)  
  
  
[苹果修复已遭利用的第10个0day](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247515027&idx=1&sn=93ebe9404e1ead6aa5f784abf7fab31a&chksm=ea948af9dde303ef597a5e12dd8faab95e3127a6e8214fe9cdfba93dbcd4e59095001090e30f&scene=21#wechat_redirect)  
  
  
[苹果修复已遭利用的第9枚0day](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247514319&idx=1&sn=10f6c5afa8be65b7ccac62c9ab73645c&chksm=ea9489a5dde300b312a93ec52a321f835baed001465326883dd6cdbbe70fecd5b94b1b8000c7&scene=21#wechat_redirect)  
  
  
[苹果修复今年以来影响iPhone 和 Mac设备的第8枚0day](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247513963&idx=1&sn=3a8ab8ac432bb3abbc5bd61a3ab0a8e0&chksm=ea948601dde30f1754006cf1ea040292e836f87e7c0b1ca21a7b07e8a3e2884ff932a45a1d2a&scene=21#wechat_redirect)  
  
  
[苹果紧急修复两个0day](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247513606&idx=1&sn=7ef2bbe710ecd61f87d32d3a53d28db7&chksm=ea94876cdde30e7a698417a1e60f215d5f74440aeb15e6238bef618870a8d31d953006005405&scene=21#wechat_redirect)  
  
  
[苹果紧急修复影响 Mac 和 Apple Watch 的 0day](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247511813&idx=1&sn=dc16d2c1c8707eaed97dde4a0dfa7750&chksm=ea949e6fdde31779bfd96864b6be586636189da2c4799ddda06ccf2bb25c009aece718ee55d6&scene=21#wechat_redirect)  
  
  
  
  
**原文链接**  
  
  
https://www.bleepingcomputer.com/news/security/apple-fixes-new-webkit-zero-day-exploited-to-hack-iphones-macs/  
  
  
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
