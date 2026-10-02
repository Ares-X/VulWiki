---
source: "gelusus/wxvl 公众号漏洞文库"
cve: "CVE-2022-42821"
identifier_role: "primary"
primary_identifiers: "CVE-2022-42821"
referenced_identifiers: ""
identifier_status: "unknown"
title: "微软发现可以绕过安全审查，开启Mac电脑大门的恶意漏洞"
product: "Apple macOS Gatekeeper / Achilles"
record_type: "advisory"
document_type: "Gatekeeper绕过漏洞新闻"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
prerequisites: "用户下载/执行带特制ACL与AppleDouble的应用；列Monterey12.6.2/BigSur11.7.2/Ventura13修复"
side_effects: "原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/%E7%B3%BB%E7%BB%9F%E5%AE%89%E5%85%A8/Windows/%E5%BE%AE%E8%BD%AF%E5%8F%91%E7%8E%B0%E5%8F%AF%E4%BB%A5%E7%BB%95%E8%BF%87%E5%AE%89%E5%85%A8%E5%AE%A1%E6%9F%A5%EF%BC%8C%E5%BC%80%E5%90%AFMac%E7%94%B5%E8%84%91%E5%A4%A7%E9%97%A8%E7%9A%84%E6%81%B6%E6%84%8F%E6%BC%8F%E6%B4%9E.md"
archive_commit: "41940cb0038d09ca5aaddbe5bffb923e423d210f"
source_status: "missing"
source_note: "原始出处待补；仓库归档不等同原始披露"
id: "vw-64a39ff4941138ffc7e535ce"
entity_id: "ve-64a39ff4941138ffc7e535ce"
schema_version: "1"
---

# 微软发现可以绕过安全审查，开启Mac电脑大门的恶意漏洞

<!-- vulwiki-editorial-rebuild:system-misc -->
## 条目范围与校订

- 本文对象：Apple macOS Gatekeeper / Achilles
- 文献类型：Gatekeeper绕过漏洞新闻
- 版本、权限及部署边界：用户下载/执行带特制ACL与AppleDouble的应用；列Monterey12.6.2/BigSur11.7.2/Ventura13修复
- 核验状态：仅重建文本校订；未执行文中代码、PoC 或扫描，未把截图或转载声明记为本站复现

### 具体结论与待核项

以下为原归档的逐项勘误与证据缺口；可由文本确定的问题已在下文订正，仍缺来源的事实保持待核。

1. 因发现者微软误分Windows，实际Apple macOS漏洞应迁macOS分类
2. Gatekeeper绕过不是任意权限提升或零点击远程攻击，LockdownMode背景不能改变本漏洞交互条件
3. 修复版本和Safari quarantine/ACL机制有清楚摘要，缺Apple安全公告、Microsoft原始研究URL和精确版本构建
4. 仅标来源E安全未给原文，研究发现日期/范围需核；无PoC属新闻不补造
5. Gatekeeper所有互联网应用都必经检查为简化说明，需限定下载标记和启动路径；去投稿宣传，图片未视检

### 操作风险

原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响

技术请求、代码与实验方法按原文保留；其中的破坏性动作仅限授权、可恢复的隔离环境。缺失代码、参数或版本事实不猜补。

### 来源追溯

- 原始披露 URL 未确认；既有归档来源标签保留，不能替代原始公告

### 归档技术正文

 网络安全应急技术国家工程中心   2022-12-23 14:37  
  
**摘要：**  
微软发现编号CVE-2022-42821的“Achilles”漏洞，能让攻击者绕过苹果Gatekeeper安全机制，而在Mac电脑上执行恶意应用程序，建议Mac电脑用户更新作业系统至macOS Monterey 12.6.2、macOS Big Sur 11.7.2及macOS Ventura 13以完成修补。  
  
![](https://mmbiz.qpic.cn/mmbiz_png/QmbJGbR2j6yrMqPsXuHEpfoGqvSKdg9jBia1hFzbkd8kRib9jMgJVZ4vzxdvWXYzJjL6XsXhtE4aTUSavzko9Esw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1 "")  
  
微软安全威胁情报小组（Microsoft Security Threat Intelligence）发现macOS有项漏洞，能让攻击者绕过Gatekeeper安全机制，而在Mac电脑上执行恶意应用程序。苹果已经释出新版macOS作业系统予以修补。  
  
据悉，微软是在7月发现编号CVE-2022-42821的漏洞，它可使用应用程序绕过macOS Gatekeeper提供的应用执行限制。Gatekeeper功能是确保只有受信赖的应用程序可以在Mac装置上执行。本漏洞可为恶意程序开启Mac电脑大门，再协助提升攻击活动成功率。微软也将此漏洞为“Achilles”。  
  
微软解释，Gatekeeper会检查所有从网络下载的应用程序，确认应用程序是否具备（苹果核准的）开发人员签章以及经过苹果公证，应用程序必须通过检查才能开启，否则Gatekeeper就会封锁应用程序执行并通知使用者（如下图所示）。  
  
![](https://mmbiz.qpic.cn/mmbiz_png/QmbJGbR2j6yrMqPsXuHEpfoGqvSKdg9jS1bicdTic0GTrzHWWTmwvCDTznXITtYYTvSQMNwFrSkDUub7dCcDXRibA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1 "")  
  
Gatekeeper的作业原理是检查苹果浏览器Safari在应用程序下载时赋予的扩充属性，其中com.apple.quarantine储存下载档案来源资讯，以及提供Gatekeeper处理档案的指示。  
  
研究人员发现，透过设定非常严格的存取控制清单（Access Control List，ACL），可使Safari（或其他应用程序）无法设定扩充属性，包括Gatekeeper相关的com.apple.quarantine。结果就能使Gatekeeper无法在用户从网络下载执行恶意程序时发挥把关的作用。  
  
研究人员并在概念验证中设计了滥用这项漏洞的方法，建立假路径及储存经改造的ACL的假AppleDouble档案，成功使Gatekeeper使用了这个档案，因而造成了Gatekeeper绕过的结果。  
  
这项漏洞影响macOS 12 Monterey、macOS 11 Big Sur等版本。经过微软通报，苹果已经释出macOS Monterey 12.6.2、macOS Big Sur 11.7.2及macOS Ventura 13解决漏洞。  
  
微软并提醒，macOS的安全功能封闭模式（Lockdown Mode）无法防范Achilles漏洞攻击。这功能是Ventura以后加入，用于保护特定高风险人士可能遭国家或进阶黑客执行零点击远端程序码攻击。微软呼吁Mac电脑用户，不论是否开启封闭模式都必须安装更新。  
  
  
  
原文来源：E安全  
  
“投稿联系方式：010-82992251   sunzhonghao@cert.org.cn”  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/GoUrACT176n1NvL0JsVSB8lNDX2FCGZjW0HGfDVnFao65ic4fx6Rv4qylYEAbia4AU3V2Zz801UlicBcLeZ6gS6tg/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1 "")  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原始披露 URL 尚未确认，现有链接按来源追溯区分别标注）
