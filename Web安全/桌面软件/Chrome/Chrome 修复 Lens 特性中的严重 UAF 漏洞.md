---
source: "gelusus/wxvl 公众号漏洞文库"
cve: "CVE-2025-2476"
identifier_role: "primary"
primary_identifiers: "CVE-2025-2476"
referenced_identifiers: "CVE-2024-5274"
identifier_status: "unknown"
title: "Chrome 修复 Lens 特性中的严重 UAF 漏洞"
product: "Google Chrome Lens"
record_type: "advisory"
document_type: "漏洞修复新闻"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
prerequisites: "恶意内容触发Lens UAF；Windows/Mac/Linux，稳定与Extended Stable需分开"
side_effects: "原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E6%A1%8C%E9%9D%A2%E8%BD%AF%E4%BB%B6/Chrome/Chrome%20%E4%BF%AE%E5%A4%8D%20Lens%20%E7%89%B9%E6%80%A7%E4%B8%AD%E7%9A%84%E4%B8%A5%E9%87%8D%20UAF%20%E6%BC%8F%E6%B4%9E.md"
archive_commit: "41940cb0038d09ca5aaddbe5bffb923e423d210f"
source_status: "recorded"
source_note: "正文标注的原文链接；链接内容及权威性未在本次重新核验"
source_url: "https://securityonline.info/google-chrome-patches-critical-use-after-free-vulnerability-in-lens-cve-2025-2476/"
id: "vw-da695ffe66b18ed1469e0eea"
entity_id: "ve-da695ffe66b18ed1469e0eea"
schema_version: "1"
---

# Chrome 修复 Lens 特性中的严重 UAF 漏洞

<!-- vulwiki-editorial-rebuild:system-misc -->
## 条目范围与校订

- 本文对象：Google Chrome Lens
- 文献类型：漏洞修复新闻
- 版本、权限及部署边界：恶意内容触发Lens UAF；Windows/Mac/Linux，稳定与Extended Stable需分开
- 核验状态：仅重建文本校订；未执行文中代码、PoC 或扫描，未把截图或转载声明记为本站复现

### 具体结论与待核项

以下为原归档的逐项勘误与证据缺口；可由文本确定的问题已在下文订正，仍缺来源的事实保持待核。

1. 元数据缺2476；正文控制系统超过UAF本身已公开证据，应区分浏览器进程执行与完整系统接管
2. 稳定修复134.0.6998.117/.118却把Extended Stable134.0.6998.89也列本漏洞修复，需原公告确认分支映射，不能直接合一范围
3. 无具体触发/用户交互条件与在野利用证据，不应自行标0day
4. 有SecurityOnline转载源，缺Chrome官方公告，宣传与推荐清理

### 操作风险

原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响

技术请求、代码与实验方法按原文保留；其中的破坏性动作仅限授权、可恢复的隔离环境。缺失代码、参数或版本事实不猜补。

### 来源追溯

- 原文标注出处：<https://securityonline.info/google-chrome-patches-critical-use-after-free-vulnerability-in-lens-cve-2025-2476/>
- 原文参考链接（未重新核验）：<https://codesafe.qianxin.com>
- 原文参考链接（未重新核验）：<https://oss.qianxin.com>
- 原文参考链接（未重新核验）：<https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247521859&idx=2&sn=342840d67c1fbf01af15a41ea7621df8&scene=21#wechat_redirect>
- 原文参考链接（未重新核验）：<https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247521342&idx=1&sn=355a1e1a938422e3437d8a957f360c7e&scene=21#wechat_redirect>
- 原文参考链接（未重新核验）：<https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247520627&idx=1&sn=e98afd2bb604a7bc41cadce2c53f2ab3&scene=21#wechat_redirect>
- 原文参考链接（未重新核验）：<https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247519584&idx=2&sn=dab52360076996946ff35b2afa4a9f72&scene=21#wechat_redirect>

### 归档技术正文

do son  代码卫士   2025-03-20 17:42  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Az5ZsrEic9ot90z9etZLlU7OTaPOdibteeibJMMmbwc29aJlDOmUicibIRoLdcuEQjtHQ2qjVtZBt0M5eVbYoQzlHiaw/640?wx_fmt=gif "")  
  
   
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
**谷歌推出重大安全更新，修复了位于 Chrome 的 Lens 特性中的释放后使用 (UAF) 漏洞 CVE-2025-2476。该漏洞已在 Windows、Mac 和 Linux 的最新稳定版本中修复。**  
  
  
![](https://mmbiz.qpic.cn/mmbiz_png/oBANLWYScMREnmv2ykWoK0kxjAXa1ib0h71CR2Po1U5Aadb1mNt9LHNiayM632YKDnFicCxmnIYLYso3XzIbfCG2w/640?wx_fmt=png&from=appmsg "")  
  
  
该漏洞如遭成功利用，可导致攻击者执行任意代码或控制系统。谷歌并未发布漏洞详情，以便多数用户更新浏览器并防止漏洞遭利用。  
  
为缓解该风险，谷歌已更新 Chrome 的稳定和稳定扩展版本：  
  
稳定版本：  
  
- Windows 和 Mac：134.0.6998.117/.118  
  
- Linux：134.0.6998.117  
  
  
  
稳定扩展版本：  
  
- Windows 和 Mac：134.0.6998.89  
  
  
  
这些更新将在未来几天和几周内陆续推出。  
  
鉴于该漏洞的严重性，强烈建议用户更新 Chrome 浏览器，以防遭攻击。  
  
检查和应用更新步骤：  
  
1、打开 Chrome。  
  
2、点击右上角的三点图标。  
  
3、导航至“帮助＞关于 Google Chrome”。  
  
4、Chrome 将自动检查并应用最新更新。  
  
5、重启浏览器，完成更新流程。  
  
  
  
代码卫士试用地址：  
https://codesafe.qianxin.com  
  
开源卫士试用地址：https://oss.qianxin.com  
  
  
  
  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[Chrome 131 更新修复高危内存安全漏洞，其中1个获奖5.5万美元](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247521859&idx=2&sn=342840d67c1fbf01af15a41ea7621df8&scene=21#wechat_redirect)  
  
  
[谷歌修复由苹果报送的严重 Chrome 漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247521342&idx=1&sn=355a1e1a938422e3437d8a957f360c7e&scene=21#wechat_redirect)  
  
  
[谷歌单个Chrome漏洞的最高赏金超25万美元](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247520627&idx=1&sn=e98afd2bb604a7bc41cadce2c53f2ab3&scene=21#wechat_redirect)  
  
  
[【在野利用】Google Chrome V8 类型混淆漏洞(CVE-2024-5274)安全风险通告](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247519584&idx=2&sn=dab52360076996946ff35b2afa4a9f72&scene=21#wechat_redirect)  
  
  
  
  
  
**原文链接**  
  
https://securityonline.info/google-chrome-patches-critical-use-after-free-vulnerability-in-lens-cve-2025-2476/  
  
  
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
