---
source: "gelusus/wxvl 公众号漏洞文库"
cve: "CVE-2022-2587"
identifier_role: "primary"
primary_identifiers: "CVE-2022-2587"
referenced_identifiers: ""
identifier_status: "unknown"
title: "微软详述严重的 ChromeOS 漏洞"
product: "ChromeOS CRAS音频服务"
record_type: "advisory"
document_type: "漏洞技术新闻"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
prerequisites: "恶意媒体identity元数据；浏览器播放或已配对蓝牙设备路径；RCE需额外利用能力"
side_effects: "原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E6%A1%8C%E9%9D%A2%E8%BD%AF%E4%BB%B6/ChromeOS/%E5%BE%AE%E8%BD%AF%E8%AF%A6%E8%BF%B0%E4%B8%A5%E9%87%8D%E7%9A%84%20ChromeOS%20%E6%BC%8F%E6%B4%9E.md"
archive_commit: "41940cb0038d09ca5aaddbe5bffb923e423d210f"
source_status: "recorded"
source_note: "正文标注的原文链接；链接内容及权威性未在本次重新核验"
source_url: "https://www.securityweek.com/microsoft-shares-details-critical-chromeos-vulnerability"
id: "vw-03beeebe22b6e6a43449b12c"
entity_id: "ve-03beeebe22b6e6a43449b12c"
schema_version: "1"
---

# 微软详述严重的 ChromeOS 漏洞

<!-- vulwiki-editorial-rebuild:system-misc -->
## 条目范围与校订

- 本文对象：ChromeOS CRAS音频服务
- 文献类型：漏洞技术新闻
- 版本、权限及部署边界：恶意媒体identity元数据；浏览器播放或已配对蓝牙设备路径；RCE需额外利用能力
- 核验状态：仅重建文本校订；未执行文中代码、PoC 或扫描，未把截图或转载声明记为本站复现

### 具体结论与待核项

以下为原归档的逐项勘误与证据缺口；可由文本确定的问题已在下文订正，仍缺来源的事实保持待核。

1. 元数据漏2587；实际ChromeOS系统CRAS，不是Chrome桌面浏览器或微软产品漏洞
2. 正文明确堆布局困难且RCE需结合其他漏洞，应保留不能按CVSS9.8写成无条件单洞接管
3. D-Bus是服务通信接口，不宜说漏洞存在于通用D-Bus；identity误拼identigy
4. 只写6月修复无系统版本/构建和受影响范围；有两家新闻源无微软原研究/Chromium补丁
5. 微软未见利用限于报道日期；大段营销/推荐清理

### 操作风险

原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响

技术请求、代码与实验方法按原文保留；其中的破坏性动作仅限授权、可恢复的隔离环境。缺失代码、参数或版本事实不猜补。

### 来源追溯

- 原文标注出处：<https://www.securityweek.com/microsoft-shares-details-critical-chromeos-vulnerability>
- 原文参考链接（未重新核验）：<https://codesafe.qianxin.com>
- 原文参考链接（未重新核验）：<https://oss.qianxin.com>
- 原文参考链接（未重新核验）：<http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247513606&idx=2&sn=eb7c5b8b8637ed62d0be305f14e2ba9e&chksm=ea94876cdde30e7ac31840c96b22a9c1872036aff023b5d8f88d53f211f15811f84aede4f150&scene=21#wechat_redirect>
- 原文参考链接（未重新核验）：<http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247513028&idx=3&sn=79c8d781d604e70522630b58315bf010&chksm=ea9482aedde30bb8b7d8d21ea1ae630e8716995afec64599d4e6d5bff0cf26c5c6cdbfd6fd6a&scene=21#wechat_redirect>
- 原文参考链接（未重新核验）：<http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247512717&idx=1&sn=90d9ee1cbcb33e3442cfd9d4d4c1d958&chksm=ea9483e7dde30af103b74637ffdefd0a6d62164388d12598a2a74b18e802f659d18f3e11a70f&scene=21#wechat_redirect>
- 原文参考链接（未重新核验）：<http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247512301&idx=2&sn=8692c38f4cf01bc6ae31e903937819f7&chksm=ea948187dde30891f434d90835b849b48564c5b0c642973efc1eb86324af13f3c4f1bfaefbe9&scene=21#wechat_redirect>

### 归档技术正文

综合编译  代码卫士   2022-08-23 17:45  
  
![](../../.resource/remote/afc2fa5611a63e89ebec625ecc33d28c5dcdb706b6fbdabb79f7c1e8982068c0.gif "")  
  
   
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
****  
上周五，微软详述了ChromeOS 中严重漏洞 (CVE-2022-2587) 的详情。该漏洞可用于执行拒绝服务 (DoS) 攻击，并在一些情况下可导致远程代码执行后果。  
  
  
CVE-2022-2587是一个界外写漏洞，CVSS评分为9.8，由微软 365 Defender团队的研究员 Jonathan Bar Or 发现并报告，已在6月份修复。漏洞出在 CRAS (ChromiumOS Audio Server) 组件D-Bus中，可通过使用与歌曲相关联的恶意元数据触发。  
  
CRAS位于操作系统和 ALSA（高级声音体系）之间，用于将音频路由到支持音频的新的外围设备如USB扬声器和蓝牙耳机中。  
  
微软的研究员发现，该服务器中包含一个并不检查用户所提供的的“identigy”参数的函数，导致基于堆的缓冲区溢出后果，这种漏洞通常用于实现远程代码执行。D-Bus服务被称为 org.chromium.cras，其中包括一个名为SetPlayerIdentity的函数，接受名为identity的字符串参数作为输入。该函数的C代码调用标准库中的危险函数 strcpy。由于该函数并不会执行任何边界检查，因此是不安全的，可引发多种内存损坏漏洞。  
  
微软解释称，该易受攻击的组件中包含一种方法，它从代表歌曲题目的元数据中提取“identity”。攻击者可修改该音频元数据，从而触发该漏洞。  
  
微软指出，攻击者可从浏览器或通过蓝牙利用该漏洞。在这两种情况下，当元数据发生改变时，就会调用该易受攻击的函数，如当在浏览器中或通过配对的蓝牙设备播放新歌曲时。  
  
微软指出，“基于堆的缓冲区溢出漏洞可导致拒绝服务或远程代码执行后果。尽管可通过媒体元数据操控来分配和释放代码块，但在这种情况下要执行精确的堆风水 (grooming) 并不容易，它要求攻击者结合利用其它漏洞来执行任意代码。”  
  
研究员在4月份将该漏洞告知谷歌，后者在两个月后修复并颁发2.5万美元的奖励金。微软并未发现该漏洞已遭利用的指标。  
  
  
  
  
代码卫士试用地址：  
https://codesafe.qianxin.com  
  
开源卫士试用地址：  
https://oss.qianxin.com  
  
  
  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[谷歌修复今年第五个Chrome 0day](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247513606&idx=2&sn=eb7c5b8b8637ed62d0be305f14e2ba9e&chksm=ea94876cdde30e7ac31840c96b22a9c1872036aff023b5d8f88d53f211f15811f84aede4f150&scene=21#wechat_redirect)  
  
  
[间谍软件 Candiru 利用 Chrome 0day 攻击记者](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247513028&idx=3&sn=79c8d781d604e70522630b58315bf010&chksm=ea9482aedde30bb8b7d8d21ea1ae630e8716995afec64599d4e6d5bff0cf26c5c6cdbfd6fd6a&scene=21#wechat_redirect)  
  
  
[Chrome 103紧急修复已遭利用的0day](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247512717&idx=1&sn=90d9ee1cbcb33e3442cfd9d4d4c1d958&chksm=ea9483e7dde30af103b74637ffdefd0a6d62164388d12598a2a74b18e802f659d18f3e11a70f&scene=21#wechat_redirect)  
  
  
[谷歌修复7个 Chrome 浏览器漏洞，CISA建议尽快更新](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247512301&idx=2&sn=8692c38f4cf01bc6ae31e903937819f7&chksm=ea948187dde30891f434d90835b849b48564c5b0c642973efc1eb86324af13f3c4f1bfaefbe9&scene=21#wechat_redirect)  
  
  
[谷歌修复Chrome Dev 频道中严重的 RCE 漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247512014&idx=2&sn=c8e692934d4e7fac9cd328d7b583e823&chksm=ea949ea4dde317b260b99b4ce42b5a0a550c1b8ae36721bca277f704497201609f2315a73afa&scene=21#wechat_redirect)  
  
  
  
  
**原文链接**  
  
https://www.securityweek.com/microsoft-shares-details-critical-chromeos-vulnerability  
  
https://www.theregister.com/2022/08/23/microsoft_chromeos_bug/  
  
  
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
