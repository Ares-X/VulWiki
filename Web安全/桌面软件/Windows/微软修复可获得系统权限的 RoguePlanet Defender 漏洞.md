---
source: "gelusus/wxvl 公众号漏洞文库"
cve: "CVE-2026-50656"
identifier_role: "primary"
primary_identifiers: "CVE-2026-50656"
referenced_identifiers: "CVE-2026-33825;CVE-2026-45498;CVE-2026-41091"
identifier_status: "unknown"
title: "微软修复可获得系统权限的 RoguePlanet Defender 漏洞"
product: "Microsoft Defender恶意软件保护引擎"
record_type: "advisory"
document_type: "安全更新新闻"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
prerequisites: "文中本地竞争条件，mpengine.dll1.1.26060.3008修复，实时保护开关均可触发为研究者声明"
side_effects: "原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E6%A1%8C%E9%9D%A2%E8%BD%AF%E4%BB%B6/Windows/%E5%BE%AE%E8%BD%AF%E4%BF%AE%E5%A4%8D%E5%8F%AF%E8%8E%B7%E5%BE%97%E7%B3%BB%E7%BB%9F%E6%9D%83%E9%99%90%E7%9A%84%20RoguePlanet%20Defender%20%E6%BC%8F%E6%B4%9E.md"
archive_commit: "41940cb0038d09ca5aaddbe5bffb923e423d210f"
source_status: "recorded"
source_note: "正文标注的原文链接；链接内容及权威性未在本次重新核验"
source_url: "https://thehackernews.com/2026/07/microsoft-patches-rogueplanet-defender.html"
id: "vw-9a722c3f58fdd641d42ca8a3"
entity_id: "ve-9a722c3f58fdd641d42ca8a3"
schema_version: "1"
---

# 微软修复可获得系统权限的 RoguePlanet Defender 漏洞

<!-- vulwiki-editorial-rebuild:system-misc -->
## 条目范围与校订

- 本文对象：Microsoft Defender恶意软件保护引擎
- 文献类型：安全更新新闻
- 版本、权限及部署边界：文中本地竞争条件，mpengine.dll1.1.26060.3008修复，实时保护开关均可触发为研究者声明
- 核验状态：仅重建文本校订；未执行文中代码、PoC 或扫描，未把截图或转载声明记为本站复现

### 具体结论与待核项

以下为原归档的逐项勘误与证据缺口；可由文本确定的问题已在下文订正，仍缺来源的事实保持待核。

1. 缺主CVE元数据，其他三编号为历史背景不要并为本篇根因
2. 应明确本地低权限执行与竞争操作前提；所谓最新Windows仍受影响需绑定披露日期和引擎版本
3. 自动更新无需操作有网络/策略条件，应建议核验实际引擎版本，OS月补丁不等于引擎更新
4. 仅THN转载链接，需补MSRC公告和原研究报告核验命名、版本、评分与实时保护结论；清理广告

### 操作风险

原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响

技术请求、代码与实验方法按原文保留；其中的破坏性动作仅限授权、可恢复的隔离环境。缺失代码、参数或版本事实不猜补。

### 来源追溯

- 原文标注出处：<https://thehackernews.com/2026/07/microsoft-patches-rogueplanet-defender.html>
- 原文参考链接（未重新核验）：<https://oss.qianxin.com/#/login>
- 原文参考链接（未重新核验）：<https://sast.qianxin.com/#/login>
- 原文参考链接（未重新核验）：<https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247526255&idx=1&sn=b5c19c4120582e72f64c7e7a6e4c4ae4&scene=21#wechat_redirect>
- 原文参考链接（未重新核验）：<https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247526116&idx=1&sn=2dba11975b0d1b5a35299b0e18f14c1d&scene=21#wechat_redirect>
- 原文参考链接（未重新核验）：<https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247526088&idx=1&sn=b80d042e47259040384c71978889be86&scene=21#wechat_redirect>
- 原文参考链接（未重新核验）：<https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247518206&idx=1&sn=5262405ff7209703aeea0bb434ce7f9d&scene=21#wechat_redirect>

### 归档技术正文

Ravie Lakshmanan
                    Ravie Lakshmanan  代码卫士   2026-07-10 07:40  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Az5ZsrEic9ot90z9etZLlU7OTaPOdibteeibJMMmbwc29aJlDOmUicibIRoLdcuEQjtHQ2qjVtZBt0M5eVbYoQzlHiaw/640?wx_fmt=gif "")  
    
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
**微软已修复Defender漏洞“RoguePlanet”（CVE-2026-50656，CVSS评分7.8），距离该漏洞的技术细节被公开已过去近一个月。**  
  
  
  
该漏洞是位于微软恶意软件保护引擎（“mpengine.dll”）中的一个权限提升问题。该引擎为防病毒和反间谍软件提供扫描、检测和清除功能。该漏洞已在微软恶意软件保护引擎1.1.26060.3008版本中修复，同时微软还发布了深度防御更新，强化未指定的安全相关功能。  
  
RoguePlanet最初由一名ID为Chaotic Eclipse（又名Nightmare-Eclipse）的安全研究人员披露，该漏洞被指为一个竞争条件漏洞，可用于生成具有SYSTEM级别权限的shell，进而使攻击者能够执行任意代码或进行未授权操作。该漏洞利用被指可在安装了2026年6月补丁星期二更新且保持最新状态的Windows系统上运行。随后，Chaotic Eclipse还透露，无论实时保护是否开启，该利用均能生效。微软并未正式将漏洞发现归功于Chaotic Eclipse。  
  
RoguePlanet是 Chaotic Eclipse披露的第四个Defender漏洞，此前三个分别为BlueHammer（CVE-2026-33825）、UnDefend（CVE-2026-45498）和RedSun（CVE-2026-41091），所有这些漏洞均已由微软修复。  
  
微软表示，安装该漏洞的更新，客户无需采取任何操作，该软件会频繁更新，保护客户免受新旧威胁的威胁。微软表示：“对于企业部署和终端用户，微软反恶意软件软件的默认配置有助于确保恶意软件定义和微软恶意软件保护引擎自动保持最新。根据所使用的微软反恶意软件软件及其配置方式，该软件在连接到互联网时，可每天检查一次引擎和定义更新，甚至每天多次检查。客户也可以随时选择手动检查更新。”  
  
  
 开源  
卫士试用地址：  
https://oss.qianxin.com/#/login  
  
 代码卫士试用地址：https://sast.qianxin.com/#/login  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[微软六月补丁星期二值得关注的漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247526255&idx=1&sn=b5c19c4120582e72f64c7e7a6e4c4ae4&scene=21#wechat_redirect)  
  
  
[微软修复影响 SharePoint 多个版本的 RCE 漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247526116&idx=1&sn=2dba11975b0d1b5a35299b0e18f14c1d&scene=21#wechat_redirect)  
  
  
[微软提醒注意两个已遭利用的 Defender 漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247526088&idx=1&sn=b80d042e47259040384c71978889be86&scene=21#wechat_redirect)  
  
  
[微软推出 Defender 漏洞奖励计划，最高奖金$2万](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247518206&idx=1&sn=5262405ff7209703aeea0bb434ce7f9d&scene=21#wechat_redirect)  
  
  
  
  
  
**原文链接**  
  
https://thehackernews.com/2026/07/microsoft-patches-rogueplanet-defender.html  
  
  
题图：Pixa  
bay Licens  
e  
  
  
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
