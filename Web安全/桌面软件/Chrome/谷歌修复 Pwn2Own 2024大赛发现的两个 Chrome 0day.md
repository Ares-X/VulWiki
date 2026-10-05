---
source: "gelusus/wxvl 公众号漏洞文库"
cve: "CVE-2024-2887;CVE-2024-2886"
identifier_role: "primary"
primary_identifiers: "CVE-2024-2887;CVE-2024-2886"
referenced_identifiers: "CVE-2024-0519"
identifier_status: "unknown"
title: "谷歌修复 Pwn2Own 2024大赛发现的两个 Chrome 0day"
product: "Chrome WebAssembly/WebCodecs"
record_type: "advisory"
document_type: "竞赛漏洞修复新闻"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
prerequisites: "恶意HTML；Pwn2Own竞赛；Chrome123.0.6312.86/.87；Edge另需厂商版本"
side_effects: "原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E6%A1%8C%E9%9D%A2%E8%BD%AF%E4%BB%B6/Chrome/%E8%B0%B7%E6%AD%8C%E4%BF%AE%E5%A4%8D%20Pwn2Own%202024%E5%A4%A7%E8%B5%9B%E5%8F%91%E7%8E%B0%E7%9A%84%E4%B8%A4%E4%B8%AA%20Chrome%200day.md"
archive_commit: "41940cb0038d09ca5aaddbe5bffb923e423d210f"
source_status: "recorded"
source_note: "正文标注的原文链接；链接内容及权威性未在本次重新核验"
source_url: "https://www.bleepingcomputer.com/news/security/google-fixes-chrome-zero-days-exploited-at-pwn2own-2024/"
id: "vw-0c28abed576424a4419700a0"
entity_id: "ve-0c28abed576424a4419700a0"
schema_version: "1"
---

# 谷歌修复 Pwn2Own 2024大赛发现的两个 Chrome 0day

<!-- vulwiki-editorial-rebuild:system-misc -->
## 条目范围与校订

- 本文对象：Chrome WebAssembly/WebCodecs
- 文献类型：竞赛漏洞修复新闻
- 版本、权限及部署边界：恶意HTML；Pwn2Own竞赛；Chrome123.0.6312.86/.87；Edge另需厂商版本
- 核验状态：仅重建文本校订；未执行文中代码、PoC 或扫描，未把截图或转载声明记为本站复现

### 具体结论与待核项

以下为原归档的逐项勘误与证据缺口；可由文本确定的问题已在下文订正，仍缺来源的事实保持待核。

1. 主两CVE元数据空；竞赛0day不等确认在野攻击，0519是历史背景
2. 漏洞位于Chrome WebAssembly实现，不应归开放标准自身；双击RCE可能是双目标/双漏洞措辞误译，须对照原文确认
3. Firefox修复它们指其竞赛漏洞，不能暗示Firefox也修了同一Chrome两个CVE
4. 有BleepingComputer原新闻，缺Chrome/ZDI/Edge公告；保留渲染器执行与完整系统控制区分，去推广

### 操作风险

原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响

技术请求、代码与实验方法按原文保留；其中的破坏性动作仅限授权、可恢复的隔离环境。缺失代码、参数或版本事实不猜补。

### 来源追溯

- 原文标注出处：<https://www.bleepingcomputer.com/news/security/google-fixes-chrome-zero-days-exploited-at-pwn2own-2024/>
- 原文参考链接（未重新核验）：<https://codesafe.qianxin.com>
- 原文参考链接（未重新核验）：<https://oss.qianxin.com>
- 原文参考链接（未重新核验）：<http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247519154&idx=1&sn=3f4209efe9a510274abec479b51dcceb&chksm=ea94bad8dde333cec265a5c93f4ed89b687c3a2301fd4d5045252f76ea8505a6aa3b125f9070&scene=21#wechat_redirect>
- 原文参考链接（未重新核验）：<http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247519143&idx=1&sn=aa2842286dc5aa1063e21f010ec15ad1&chksm=ea94bacddde333db812ea8c9e259e4db299453970f32514ee6a500f954af29886650c4989674&scene=21#wechat_redirect>
- 原文参考链接（未重新核验）：<http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247518760&idx=1&sn=6cd42f69e9c80855853ab33b6174315c&chksm=ea94bb42dde33254903f662caac710b4135af49d3a67e8d4b13022bca1218dbb61096abe171a&scene=21#wechat_redirect>
- 原文参考链接（未重新核验）：<http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247518705&idx=1&sn=e649874fdf57424ba03ada25dffb2bfe&chksm=ea94b89bdde3318dd2b64edb99c68dcc49c35026d1c9ae2d594ec1601dfb265af9708d1d7fca&scene=21#wechat_redirect>

### 归档技术正文

Sergiu Gatlan  代码卫士   2024-03-28 17:29  
  
![](../../.resource/remote/afc2fa5611a63e89ebec625ecc33d28c5dcdb706b6fbdabb79f7c1e8982068c0.gif "")  
  
   
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
**本周二，谷歌修复了 Chrome web浏览器中的7个漏洞，其中两个是在 Pwn2Own 2024温哥华大赛中发现。**  
  
  
第一个0day是 CVE-2024-2887，是位于开放标准 WebAssembly 中的一个高危类型混淆漏洞。Manfred Paul 在大赛第一天演示了这个漏洞，通过构造的HTML页面即可用作双击远程代码执行 (RCE) 利用的一部分，攻击 Chrome 和 Edge浏览器。  
  
第二个0day漏洞是CVE-2024-2886，由 KAIST Hacking Lab的研究员Seunghyun Lee 在 CanSecWest Pwn2Own 大赛第二天利用。它是位于 WebCodecs API 中的一个UAF漏洞，该API 可供 web 应用编码和解码音视频内容，使远程攻击者通过多个构造的 HTML 页面执行任意读/写。Lee 还利用CVE-2024-2886，通过针对Chrome 和 Edge 的单一利用获得远程代码执行权限。  
  
谷歌在 Chrome 稳定渠道版本123.0.6312.86/.87（Windows 和 Mac版本）和123.0.6312.86（Linux 版本）中修复了这两个漏洞。这些新版本将在未来几天内向全球发布。Firefox 也在大赛报送两个0day的同一天修复了它们。****  
  
虽然Mozilla 仅用了一天而谷歌仅用了五天来修复这些漏洞，但厂商通常会在ZDI规定的90天期限内完成修复。1月份，谷歌还修复了Chrome中的一个已遭活跃利用的漏洞 (CVE-2024-0519)，它可导致攻击者访问敏感信息或者导致未修复浏览器崩溃，原因是 Chrome V8 JavaScript 引擎中存在界外内存访问弱点。  
  
Pwn2Own 温哥华大赛在3月22日落下帷幕。大赛共发现29个唯一0day，颁发1132500美元的赏金。Manfred Paul 以202500美元的赏金摘得桂冠，成功攻破苹果Safari、谷歌Chrome 和微软 Edge浏览器。  
  
  
代码卫士试用地址：  
https://codesafe.qianxin.com  
  
开源卫士试用地址：https://oss.qianxin.com  
  
  
  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[Mozilla 修复Pwn2Own大赛发现的两个 Firefox 0day](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247519154&idx=1&sn=3f4209efe9a510274abec479b51dcceb&chksm=ea94bad8dde333cec265a5c93f4ed89b687c3a2301fd4d5045252f76ea8505a6aa3b125f9070&scene=21#wechat_redirect)  
  
  
[Pwn2Own 2024温哥华大赛落幕  Master of Pwn 诞生](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247519143&idx=1&sn=aa2842286dc5aa1063e21f010ec15ad1&chksm=ea94bacddde333db812ea8c9e259e4db299453970f32514ee6a500f954af29886650c4989674&scene=21#wechat_redirect)  
  
  
[首届Pwn2Own 汽车大赛落幕，Master of Pwn 诞生](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247518760&idx=1&sn=6cd42f69e9c80855853ab33b6174315c&chksm=ea94bb42dde33254903f662caac710b4135af49d3a67e8d4b13022bca1218dbb61096abe171a&scene=21#wechat_redirect)  
  
  
[Pwn2Own 2024温哥华大赛目标和奖金公布](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247518705&idx=1&sn=e649874fdf57424ba03ada25dffb2bfe&chksm=ea94b89bdde3318dd2b64edb99c68dcc49c35026d1c9ae2d594ec1601dfb265af9708d1d7fca&scene=21#wechat_redirect)  
  
  
[Pwn2Own 2023多伦多大赛落幕  Master of Pwn诞生](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247518011&idx=1&sn=1a8f0bcb00a1f4a13e7e2432c4bfce08&chksm=ea94b651dde33f47b62dd209a071f424b3df8251f502b70d7dd9e1fb356c3eb5e12da8152737&scene=21#wechat_redirect)  
  
  
  
  
**原文链接**  
  
  
https://www.bleepingcomputer.com/news/security/google-fixes-chrome-zero-days-exploited-at-pwn2own-2024/  
  
  
题图：  
Pexels  
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
