---
source: "gelusus/wxvl 公众号漏洞文库"
cve: "CVE-2025-31251;CVE-2025-31233;CVE-2025-31226;CVE-2025-31223;CVE-2025-24223;CVE-2025-31217;CVE-2025-31215;CVE-2025-31206;CVE-2025-31257;CVE-2025-31214;CVE-2025-31222"
identifier_role: "primary"
primary_identifiers: "CVE-2025-31251;CVE-2025-31233;CVE-2025-31226;CVE-2025-31223;CVE-2025-24223;CVE-2025-31217;CVE-2025-31215;CVE-2025-31206;CVE-2025-31257;CVE-2025-31214;CVE-2025-31222"
referenced_identifiers: ""
identifier_status: "unknown"
title: "苹果发布安全更新以修复iOS和macOS中的多个漏洞"
product: "Apple iOS/iPadOS/macOS及组件"
record_type: "roundup"
document_type: "多漏洞补丁摘要"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
prerequisites: "媒体/网页解析、iPhone16e基带、mDNSResponder等不同路径；iOS18.5等更新"
side_effects: "导语仅打开即可恶意代码执行过度概括，清单多项仅DoS/崩溃/内存损坏，须逐项保持影响等级"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E6%A1%8C%E9%9D%A2%E8%BD%AF%E4%BB%B6/Apple/%E8%8B%B9%E6%9E%9C%E5%8F%91%E5%B8%83%E5%AE%89%E5%85%A8%E6%9B%B4%E6%96%B0%E4%BB%A5%E4%BF%AE%E5%A4%8DiOS%E5%92%8CmacOS%E4%B8%AD%E7%9A%84%E5%A4%9A%E4%B8%AA%E6%BC%8F%E6%B4%9E.md"
archive_commit: "41940cb0038d09ca5aaddbe5bffb923e423d210f"
source_status: "missing"
source_note: "原始出处待补；仓库归档不等同原始披露"
id: "vw-5601c46b160f090da22388ff"
entity_id: "ve-5601c46b160f090da22388ff"
schema_version: "1"
---

# 苹果发布安全更新以修复iOS和macOS中的多个漏洞

<!-- vulwiki-editorial-rebuild:system-misc -->
## 条目范围与校订

- 本文对象：Apple iOS/iPadOS/macOS及组件
- 文献类型：多漏洞补丁摘要
- 版本、权限及部署边界：媒体/网页解析、iPhone16e基带、mDNSResponder等不同路径；iOS18.5等更新
- 核验状态：仅重建文本校订；未执行文中代码、PoC 或扫描，未把截图或转载声明记为本站复现

### 具体结论与待核项

以下为原归档的逐项勘误与证据缺口；可由文本确定的问题已在下文订正，仍缺来源的事实保持待核。

1. 至少11明确CVE且元数据为空，应建逐组件关联，不把未编号备忘录/FrontBoard问题猜配编号
2. 导语仅打开即可恶意代码执行过度概括，清单多项仅DoS/崩溃/内存损坏，须逐项保持影响等级
3. 基带流量拦截与mDNS提权没有攻击距离/初始权限条件，不能泛化成网页利用
4. 缺任何官方/原新闻链接，其他平台修复版本仅分支名称；设备兼容列表不足以代替受影响范围

### 操作风险

导语仅打开即可恶意代码执行过度概括，清单多项仅DoS/崩溃/内存损坏，须逐项保持影响等级

技术请求、代码与实验方法按原文保留；其中的破坏性动作仅限授权、可恢复的隔离环境。缺失代码、参数或版本事实不猜补。

### 来源追溯

- 原始披露 URL 未确认；既有归档来源标签保留，不能替代原始公告

### 归档技术正文

鹏鹏同学  黑猫安全   2025-05-13 23:00  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/8dBEfDPEce9BQ6ka98O4HfvB8lHhIAibKRozbiaOsIvI1gaURukko3aiaz2Z83THSqBObdE5bjhSzoiboAgcKmaWrg/640?wx_fmt=png&from=appmsg "")  
  
苹果紧急发布iOS和macOS安全更新，修复可能让攻击者仅通过打开特制图片/视频/网站就能执行恶意代码的关键漏洞：  
  
• AppleJPEG漏洞（CVE-2025-31251）——处理恶意制作的媒体文件可能导致应用意外终止或进程内存损坏  
• CoreMedia漏洞（CVE-2025-31233）——处理恶意制作的视频文件可能导致应用意外终止或内存损坏  
• ImageIO漏洞（CVE-2025-31226）——处理恶意制作的图像可能导致拒绝服务攻击  
• WebKit漏洞（CVE-2025-31223）——处理恶意网页内容可能导致内存损坏  
• WebKit漏洞（CVE-2025-24223）——处理恶意网页内容可能导致内存损坏  
• WebKit漏洞（CVE-2025-31217）——处理恶意网页内容可能导致Safari浏览器意外崩溃  
• WebKit漏洞（CVE-2025-31215）——处理恶意网页内容可能导致进程意外崩溃  
• WebKit漏洞（CVE-2025-31206）——处理恶意网页内容可能导致Safari意外崩溃  
• WebKit漏洞（CVE-2025-31257）——处理恶意网页内容可能导致Safari意外崩溃  
  
苹果iOS 18.5更新修复了AppleJPEG、CoreMedia等组件的多个高危漏洞，攻击者可能通过恶意媒体文件执行代码或泄露数据。  
  
公司还修补了CoreAudio、CoreGraphics和ImageIO中严重的文件解析漏洞，打开恶意内容可能导致应用崩溃、进程内存损坏或数据泄露。部分漏洞可能触发拒绝服务攻击或内存损坏。其中编号CVE-2025-31217的漏洞可通过恶意网页内容导致Safari浏览器崩溃。  
  
苹果还修复了基带漏洞（CVE-2025-31214），攻击者可利用该漏洞拦截iPhone 16e的网络流量。此外还修复了：  
• mDNSResponder权限提升漏洞（CVE-2025-31222）  
• 备忘录应用可能泄露锁屏信息的漏洞  
• FrontBoard、iCloud文档共享和邮件地址功能的安全缺陷  
  
iOS 18.5支持iPhone XS及后续机型，iPadOS更新支持2018款及后续iPad Pro、第三代iPad Air、第七代iPad、第五代iPad mini等设备。苹果还同步发布了macOS Sequoia/Sonoma/Ventura以及watchOS、tvOS、visionOS的系统更新。  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原始披露 URL 尚未确认，现有链接按来源追溯区分别标注）
