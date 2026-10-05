---
source: "gelusus/wxvl 公众号漏洞文库"
cve: "CVE-2023-35674"
identifier_role: "primary"
primary_identifiers: "CVE-2023-35674"
referenced_identifiers: ""
identifier_status: "unknown"
title: "谷歌修复已遭利用的安卓 0day漏洞"
product: "Android Framework"
record_type: "advisory"
document_type: "Android补丁新闻"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
prerequisites: "本地权限提升；版本与安全补丁级别未给；严重性评分情境与实际攻击条件分开"
side_effects: "原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E6%A1%8C%E9%9D%A2%E8%BD%AF%E4%BB%B6/Android/%E8%B0%B7%E6%AD%8C%E4%BF%AE%E5%A4%8D%E5%B7%B2%E9%81%AD%E5%88%A9%E7%94%A8%E7%9A%84%E5%AE%89%E5%8D%93%200day%E6%BC%8F%E6%B4%9E.md"
archive_commit: "41940cb0038d09ca5aaddbe5bffb923e423d210f"
source_status: "recorded"
source_note: "正文标注的原文链接；链接内容及权威性未在本次重新核验"
source_url: "https://thehackernews.com/2023/09/zero-day-alert-latest-android-patch.html"
id: "vw-a0e39e9862223f8e0d5a09fa"
entity_id: "ve-a0e39e9862223f8e0d5a09fa"
schema_version: "1"
---

# 谷歌修复已遭利用的安卓 0day漏洞

<!-- vulwiki-editorial-rebuild:system-misc -->
## 条目范围与校订

- 本文对象：Android Framework
- 文献类型：Android补丁新闻
- 版本、权限及部署边界：本地权限提升；版本与安全补丁级别未给；严重性评分情境与实际攻击条件分开
- 核验状态：仅重建文本校订；未执行文中代码、PoC 或扫描，未把截图或转载声明记为本站复现

### 具体结论与待核项

以下为原归档的逐项勘误与证据缺口；可由文本确定的问题已在下文订正，仍缺来源的事实保持待核。

1. 标题已遭活跃利用比正文谷歌可能有限定向利用表述更强，应保留证据置信度
2. 另述未具名System无交互RCE及其他系统更新，不能归入35674或擅自补CVE
3. 评分以防护禁用/绕过为假设不等于要求受害者主动禁用安全功能
4. 缺Android范围、补丁级别和谷歌公告，只有THN新闻来源；品牌推荐长尾应去除

### 操作风险

原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响

技术请求、代码与实验方法按原文保留；其中的破坏性动作仅限授权、可恢复的隔离环境。缺失代码、参数或版本事实不猜补。

### 来源追溯

- 原文标注出处：<https://thehackernews.com/2023/09/zero-day-alert-latest-android-patch.html>
- 原文参考链接（未重新核验）：<https://codesafe.qianxin.com>
- 原文参考链接（未重新核验）：<https://oss.qianxin.com>
- 原文参考链接（未重新核验）：<http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247517276&idx=1&sn=4af5856a408590c04f66b8cf7944909b&chksm=ea94b536dde33c20a349d0ce168088e20f1710c32321c5af387665d68fc566998f5763f5cf27&scene=21#wechat_redirect>
- 原文参考链接（未重新核验）：<http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247517155&idx=1&sn=9af2d4f8742d395b46b7d44e219d9b05&chksm=ea94b289dde33b9f559073d1207e8437f82e8b6acf046825ee7f690fcbe59f72977119ba7dae&scene=21#wechat_redirect>
- 原文参考链接（未重新核验）：<http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247517117&idx=2&sn=9648af1e020ddfe5352233463d1fb931&chksm=ea94b2d7dde33bc1487cfce641344cff8e95ae23edb203565f40f28f00d6daaefc02dd8d89b6&scene=21#wechat_redirect>
- 原文参考链接（未重新核验）：<http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247516769&idx=2&sn=4714ae37829a0d86ecc67fac45cde3fa&chksm=ea94b30bdde33a1dfa036205c64ef8ce7aa81a5958ce4c9fce8ec8a15cba40097e098fd45644&scene=21#wechat_redirect>

### 归档技术正文

THN  代码卫士   2023-09-07 17:46  
  
![](../../.resource/remote/afc2fa5611a63e89ebec625ecc33d28c5dcdb706b6fbdabb79f7c1e8982068c0.gif "")  
  
   
聚焦源代码安全，网罗国内外最新资讯！****  
  
**编译：代码卫士**  
  
**谷歌在本月安卓安全更新中修复了多个漏洞，其中一个已遭活跃利用。该漏洞的编号是CVE-2023-35674，是影响Android Framework的权限提升漏洞。**  
  
![](../../.resource/remote/938f5b0ea48ff1cddd8b64ac95b9a847d60e4d7a5964259c0fa841c577d3bdea.gif "")  
  
  
谷歌在安卓安全通告中提到，“有线索表明 CVE-2023-35674可能已遭有限的、针对性利用。”该更新还修复了位于 Framework 中的其它三个提权漏洞，其中一个最重要的漏洞“在无需其它额外执行权限的情况下，实现本地提权”。  
  
谷歌表示还修复了位于 System 组件中的一个严重漏洞，无需任何受害者交互，即可实现远程代码执行后果。该公司指出，“严重性评估基于漏洞利用对受影响设备造成的可能影响，并假设平台和服务缓解措施已关闭以利于开发或者已遭成功绕过。”  
  
谷歌本次修复了 System 组件中的14个漏洞，以及MediaProvider 组件中的两个漏洞，后者将在 Google Play 系统更新时推出。  
  
  
代码卫士试用地址：  
https://codesafe.qianxin.com  
  
开源卫士试用地址：https://oss.qianxin.com  
  
  
  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[谷歌发布2022年在野利用0day年度回顾报告](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247517276&idx=1&sn=4af5856a408590c04f66b8cf7944909b&chksm=ea94b536dde33c20a349d0ce168088e20f1710c32321c5af387665d68fc566998f5763f5cf27&scene=21#wechat_redirect)  
  
  
[苹果员工在CTF大赛发现谷歌0day秘而不报 $10000赏金由他人获得](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247517155&idx=1&sn=9af2d4f8742d395b46b7d44e219d9b05&chksm=ea94b289dde33b9f559073d1207e8437f82e8b6acf046825ee7f690fcbe59f72977119ba7dae&scene=21#wechat_redirect)  
  
  
[谷歌推出新的安全试点计划，禁止员工访问互联网](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247517117&idx=2&sn=9648af1e020ddfe5352233463d1fb931&chksm=ea94b2d7dde33bc1487cfce641344cff8e95ae23edb203565f40f28f00d6daaefc02dd8d89b6&scene=21#wechat_redirect)  
  
  
[谷歌警示自家员工：别使用Bard 生成的代码](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247516769&idx=2&sn=4714ae37829a0d86ecc67fac45cde3fa&chksm=ea94b30bdde33a1dfa036205c64ef8ce7aa81a5958ce4c9fce8ec8a15cba40097e098fd45644&scene=21#wechat_redirect)  
  
  
[谷歌为 Chrome 沙箱逃逸利用链提供三倍赏金](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247516649&idx=1&sn=4e785a24db31c0a5ba6444f993a7c15e&chksm=ea94b083dde339956da54b6ff9b4036c037a976bad07e12c44d2db445eef51db0ed4c00ef820&scene=21#wechat_redirect)  
  
  
  
  
**原文链接**  
  
https://thehackernews.com/2023/09/zero-day-alert-latest-android-patch.html  
  
  
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
