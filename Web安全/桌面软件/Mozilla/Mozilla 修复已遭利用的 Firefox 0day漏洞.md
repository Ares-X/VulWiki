---
source: "gelusus/wxvl 公众号漏洞文库"
cve: "CVE-2024-9680"
identifier_role: "primary"
primary_identifiers: "CVE-2024-9680"
referenced_identifiers: "CVE-2024-29943;CVE-2024-29944"
identifier_status: "unknown"
title: "Mozilla 修复已遭利用的 Firefox 0day漏洞"
product: "Firefox Animation timeline"
record_type: "advisory"
document_type: "Firefox在野漏洞修复新闻"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
prerequisites: "内容进程UAF代码执行；文称131.0.2/ESR115.16.1/128.3.1修复"
side_effects: "原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E6%A1%8C%E9%9D%A2%E8%BD%AF%E4%BB%B6/Mozilla/Mozilla%20%E4%BF%AE%E5%A4%8D%E5%B7%B2%E9%81%AD%E5%88%A9%E7%94%A8%E7%9A%84%20Firefox%200day%E6%BC%8F%E6%B4%9E.md"
archive_commit: "41940cb0038d09ca5aaddbe5bffb923e423d210f"
source_status: "recorded"
source_note: "正文标注的原文链接；链接内容及权威性未在本次重新核验"
source_url: "https://www.bleepingcomputer.com/news/security/mozilla-fixes-firefox-zero-day-actively-exploited-in-attacks/"
id: "vw-dd4149376ffd8dde5d9f5724"
entity_id: "ve-dd4149376ffd8dde5d9f5724"
schema_version: "1"
---

# Mozilla 修复已遭利用的 Firefox 0day漏洞

<!-- vulwiki-editorial-rebuild:system-misc -->
## 条目范围与校订

- 本文对象：Firefox Animation timeline
- 文献类型：Firefox在野漏洞修复新闻
- 版本、权限及部署边界：内容进程UAF代码执行；文称131.0.2/ESR115.16.1/128.3.1修复
- 核验状态：仅重建文本校订；未执行文中代码、PoC 或扫描，未把截图或转载声明记为本站复现

### 具体结论与待核项

以下为原归档的逐项勘误与证据缺口；可由文本确定的问题已在下文订正，仍缺来源的事实保持待核。

1. 元数据漏9680；前次Pwn2Own两CVE只背景，不能作为本次全部漏洞
2. 内容流程应译内容进程；保留渲染器执行并非已证明OS全权/沙箱逃逸
3. 在野利用属Mozilla收到报告，攻击者/受害者未明，不能补归因
4. 有Bleeping新闻来源但缺Mozilla/ESET直接公告；受影响下限/具体平台与修复通道需核对，营销清理

### 操作风险

原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响

技术请求、代码与实验方法按原文保留；其中的破坏性动作仅限授权、可恢复的隔离环境。缺失代码、参数或版本事实不猜补。

### 来源追溯

- 原文标注出处：<https://www.bleepingcomputer.com/news/security/mozilla-fixes-firefox-zero-day-actively-exploited-in-attacks/>
- 原文参考链接（未重新核验）：<https://codesafe.qianxin.com>
- 原文参考链接（未重新核验）：<https://oss.qianxin.com>
- 原文参考链接（未重新核验）：<http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247519154&idx=1&sn=3f4209efe9a510274abec479b51dcceb&chksm=ea94bad8dde333cec265a5c93f4ed89b687c3a2301fd4d5045252f76ea8505a6aa3b125f9070&scene=21#wechat_redirect>
- 原文参考链接（未重新核验）：<http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247518467&idx=2&sn=a4b556d25e18fde4859318143fe831f9&chksm=ea94b869dde3317f0c3e37352a2db057bc26f539dfef7de56f39049b1a8ae269888c76c12e48&scene=21#wechat_redirect>
- 原文参考链接（未重新核验）：<http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247515956&idx=2&sn=7870f9607adf1541eef5be5402a82ab4&chksm=ea948e5edde307489a6b2a77b80ba248729a3d0dbfd20a6b65ee00d181f4b422bc09fa95eb1c&scene=21#wechat_redirect>
- 原文参考链接（未重新核验）：<http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247510779&idx=2&sn=ebffc30f51572f1abd513f92b810858b&chksm=ea949b91dde31287dee367059f7db5e2dd338e600e25a7139b08463e0b1acc74d939bf9baf0c&scene=21#wechat_redirect>

### 归档技术正文

Bill Toulas  代码卫士   2024-10-10 18:16  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Az5ZsrEic9ot90z9etZLlU7OTaPOdibteeibJMMmbwc29aJlDOmUicibIRoLdcuEQjtHQ2qjVtZBt0M5eVbYoQzlHiaw/640?wx_fmt=gif "")  
  
   
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
**Mozilla 发布紧急安全更新，修复了 Firefox 浏览器中的一个严重的释放后使用漏洞 (CVE-2024-9680)，目前该漏洞已遭利用。**  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/oBANLWYScMSAsjnjia0h6rTzh5oDdsH9vf0WibkPfqYxJGHw5Tu0pG6PT1lBNysZPfVppZ8KFvaAeIZvTlGLoJ3A/640?wx_fmt=gif&from=appmsg "")  
  
  
该漏洞由 ESET 公司的研究员 Damien Schaeffer发现，是位于 Animation 时间线中的一个释放后使用 (UAF) 漏洞。当被释放的内存仍由程序所使用时就会发生这类漏洞，可导致恶意人员将恶意数据添加到内存区域，进行代码执行操作。Animation 时间线是 Firefox Web Animation API 的组成部分，用于控制和同步网页上的动画。  
  
安全公告提到，“攻击者能够通过利用 Animation 时间线中的UAF漏洞，在内容流程中实现代码执行。我们已收到关于该漏洞遭在野利用的报告。”该漏洞影响最新版 Firefox（标准发布）和扩展支持发布 (ESR)。  
  
如下版本已修复这些漏洞，建议用户立即升级：  
  
- Firefox 131.0.2  
  
- Firefox ESR 115.16.1  
  
- Firefox ESR 128.3.1  
  
  
  
鉴于CVE-2024-9680已遭活跃利用，且遭攻击的人员情况尚不明确，因此用户应立即升级至最新版本。用户可启动火狐浏览器，去往“设置->帮助->关于Firefox”，更新应会自动启动。需要重启程序才能应用这些变更。  
  
Mozilla 和ESET 公司尚未给出更多详情。  
  
3月22日，Mozilla 公司发布安全更新，修复CVE-2024-29943和CVE-2024-29944。它们均由Manfred Paul 在2024温哥华 Pwn2Own大赛上发现和演示。  
  
  
  
代码卫士试用地址：  
https://codesafe.qianxin.com  
  
开源卫士试用地址：https://oss.qianxin.com  
  
  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[Mozilla 修复Pwn2Own大赛发现的两个 Firefox 0day](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247519154&idx=1&sn=3f4209efe9a510274abec479b51dcceb&chksm=ea94bad8dde333cec265a5c93f4ed89b687c3a2301fd4d5045252f76ea8505a6aa3b125f9070&scene=21#wechat_redirect)  
  
  
[Mozilla 修复Firefox 漏洞，可导致RCE和沙箱逃逸](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247518467&idx=2&sn=a4b556d25e18fde4859318143fe831f9&chksm=ea94b869dde3317f0c3e37352a2db057bc26f539dfef7de56f39049b1a8ae269888c76c12e48&scene=21#wechat_redirect)  
  
  
[Mozilla 修复Firefox 浏览器的多个高危漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247515956&idx=2&sn=7870f9607adf1541eef5be5402a82ab4&chksm=ea948e5edde307489a6b2a77b80ba248729a3d0dbfd20a6b65ee00d181f4b422bc09fa95eb1c&scene=21#wechat_redirect)  
[Firefox 97.0.2 修复两个已遭利用的0day](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247510779&idx=2&sn=ebffc30f51572f1abd513f92b810858b&chksm=ea949b91dde31287dee367059f7db5e2dd338e600e25a7139b08463e0b1acc74d939bf9baf0c&scene=21#wechat_redirect)  
  
  
  
  
  
**原文链接**  
  
  
https://www.bleepingcomputer.com/news/security/mozilla-fixes-firefox-zero-day-actively-exploited-in-attacks/  
  
  
题图：  
Pexels  
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
