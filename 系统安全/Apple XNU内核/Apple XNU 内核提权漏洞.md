---
source: "gelusus/wxvl 公众号漏洞文库"
cve: "CVE-2025-31219"
identifier_role: "primary"
primary_identifiers: "CVE-2025-31219"
referenced_identifiers: ""
identifier_status: "unknown"
title: "Apple XNU 内核提权漏洞"
product: "Apple XNU vm_map"
record_type: "advisory"
document_type: "安全新闻"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
prerequisites: "本地低权限代码执行；列macOS/iOS/iPadOS/watchOS/tvOS/visionOS修复版本"
side_effects: "iPadOS表格17.7.7和建议18.5是不同分支，需分清覆盖范围而非单值覆盖"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/%E7%B3%BB%E7%BB%9F%E5%AE%89%E5%85%A8/Apple%20XNU%E5%86%85%E6%A0%B8/Apple%20XNU%20%E5%86%85%E6%A0%B8%E6%8F%90%E6%9D%83%E6%BC%8F%E6%B4%9E.md"
archive_commit: "41940cb0038d09ca5aaddbe5bffb923e423d210f"
source_status: "missing"
source_note: "原始出处待补；仓库归档不等同原始披露"
id: "vw-28d07d62c1555320e070626c"
entity_id: "ve-28d07d62c1555320e070626c"
schema_version: "1"
---

# Apple XNU 内核提权漏洞

<!-- vulwiki-editorial-rebuild:system-misc -->
## 条目范围与校订

- 本文对象：Apple XNU vm_map
- 文献类型：安全新闻
- 版本、权限及部署边界：本地低权限代码执行；列macOS/iOS/iPadOS/watchOS/tvOS/visionOS修复版本
- 核验状态：仅重建文本校订；未执行文中代码、PoC 或扫描，未把截图或转载声明记为本站复现

### 具体结论与待核项

以下为原归档的逐项勘误与证据缺口；可由文本确定的问题已在下文订正，仍缺来源的事实保持待核。

1. 表格把watchOS11.5/macOS15.5等已修补版本标成受影响产品，与后文修复说明冲突，是关键版本语义错误
2. iPadOS表格17.7.7和建议18.5是不同分支，需分清覆盖范围而非单值覆盖
3. 根因vm_map竞态和ZDI署名可追溯线索，但无ZDI或Apple公告链接；CVSS与具体各平台漏洞映射待核验
4. 重复空泛风险段、机翻作系统/@用户名岁、HTML属性和免责声明噪声

### 操作风险

iPadOS表格17.7.7和建议18.5是不同分支，需分清覆盖范围而非单值覆盖

技术请求、代码与实验方法按原文保留；其中的破坏性动作仅限授权、可恢复的隔离环境。缺失代码、参数或版本事实不猜补。

### 来源追溯

- 原始披露 URL 未确认；既有归档来源标签保留，不能替代原始公告

### 归档技术正文

 网安百色   2025-05-25 11:30  
  
Apple 的 XNU 内核中的一个严重安全漏洞已被披露。它允许本地攻击者提升权限，并可能以内核级访问权限执行任意代码。  
  
该漏洞被确定为 CVE-2025-31219，在多个 Apple 作系统中代表重大安全风险，CVSS 评分为 8.8，表明严重性较高。  
  
Trend Micro 的 Zero Day Initiative 的安全研究人员 Michael DePlante（@izobashi 岁）和 Lucas Leong（@wmliang 岁）发现了该漏洞，该漏洞于 2025 年 5 月 21 日按照负责任的披露做法公开披露。  
  
Apple 已经承认了这个问题，并在其生态系统中发布了补丁来解决安全漏洞。  
## Apple XNU 内核缺陷 （CVE-2025-31219）  
  
该漏洞源于 XNU 内核的 vm_map 内存管理子系统中的争用条件，明确影响了虚拟内存分配的处理。  
  
根据 Zero Day Initiative 咨询报告，“在 macOS 内核中处理虚拟内存分配时存在特定缺陷。该问题是由于在对对象执行作时缺乏适当的锁定造成的”。  
  
此争用条件漏洞它涉及不正确的内存处理，可能导致内存损坏情况。  
  
该漏洞允许具有低权限代码执行能力的攻击者利用争用条件将其权限升级到内核级别，从而有效地获得对受影响系统的完全控制权。  
  
历史背景表明，XNU 内核竞争条件一直是一个反复出现的安全问题。  
  
过去曾记录过类似的漏洞，包括以前被利用的显著vm_map_copy优化争用条件。这些漏洞表明在保护内核级内存管理作方面存在持续的挑战。  
  
<table><tbody><tr style="box-sizing: border-box;background-color: rgb(240, 240, 240);"><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);word-break: break-word;"><strong msttexthash="14330498" msthash="71" style="box-sizing: border-box;font-weight: bold;"><span leaf="">风险因素</span></strong></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);word-break: break-word;"><strong msttexthash="3259074" msthash="72" style="box-sizing: border-box;font-weight: bold;"><span leaf="">详</span></strong></td></tr><tr style="box-sizing: border-box;"><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);word-break: break-word;"><section><span leaf="">受影响的产品</span></section></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);word-break: break-word;"><section><span leaf="">watchOS 11.5、macOS Sonoma 14.7.6、tvOS 18.5、iPadOS 17.7.7、iOS 18.5、macOS Sequoia 15.5、visionOS 2.5、macOS Ventura 13.7.6</span></section></td></tr><tr style="box-sizing: border-box;background-color: rgb(240, 240, 240);"><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);word-break: break-word;"><section><span leaf="">冲击</span></section></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);word-break: break-word;"><section><span leaf="">允许攻击者导致系统意外终止、损坏内核内存并破坏系统稳定性</span></section></td></tr><tr style="box-sizing: border-box;"><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);word-break: break-word;"><section><span leaf="">利用先决条件</span></section></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);word-break: break-word;"><section><span leaf="">本地攻击者必须具有低权限代码执行能力</span></section></td></tr><tr style="box-sizing: border-box;background-color: rgb(240, 240, 240);"><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);word-break: break-word;"><section><span leaf="">CVSS 3.1 分数</span></section></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);word-break: break-word;"><section><span leaf="">8.8 （高）</span></section></td></tr></tbody></table>## 受影响的系统和 CVSS 影响评估  
  
该漏洞影响了 Apple 的作系统生态系统，为 watchOS 11.5、macOS Sonoma 14.7.6、tvOS 18.5、iPadOS 17.7.7、iOS 18.5、macOS Sequoia 15.5、macOS Ventura 13.7.6 和 visionOS 2.5 发布了补丁。  
  
对 Apple 产品系列的广泛影响凸显了 XNU 内核漏洞的基本性质。  
  
CVSS 3.1 矢量字符串 AV：L/AC：L/PR：L/UI：N/S：C/C：H/I：H/A：H 表示，虽然该漏洞需要本地访问和低权限才能利用，但一旦成功触发，它就会对机密性、完整性和可用性产生很大影响。  
  
“已更改”范围评级表明，该漏洞可能影响其初始安全上下文之外的资源，这是内核级权限提升缺陷的典型特征。  
  
安全研究人员指出，该漏洞“允许本地攻击者升级受影响的 Apple macOS 安装的权限。  
  
攻击者必须首先获得在目标系统上执行低权限代码的能力，才能利用此漏洞。此先决条件意味着该漏洞通常用作多阶段攻击链的一部分。  
## 缓解策略  
  
Apple 已通过改进所有受影响平台上的内存处理机制解决了此漏洞。  
  
该公司的安全公告指出，“该问题已通过改进的内存处理得到解决”，并为每个修补的作系统提供了特定的版本号。  
  
用户应立即将他们的设备更新到最新的可用版本：macOS Sequoia 15.5、macOS Sonoma 14.7.6、iOS 18.5、iPadOS 18.5、watchOS 11.5、tvOS 18.5 和 visionOS 2.5。  
  
组织应优先考虑这些更新，特别是对于暴露给潜在攻击者的系统，这些攻击者可以通过其他向量实现初始代码执行。  
  
目前没有证据表明在野外积极利用，因此立即修补是建议的主要缓解策略。  
  
**免责声明**  
：  
  
本公众号所载文章为本公众号原创或根据网络搜索下载编辑整理，文章版权归原作者所有，仅供读者学习、参考，禁止用于商业用途。因转载众多，无法找到真正来源，如标错来源，或对于文中所使用的图片、文字、链接中所包含的软件/资料等，如有侵权，请跟我们联系删除，谢谢！  
  
![图片](https://mmbiz.qpic.cn/mmbiz_jpg/1QIbxKfhZo5lNbibXUkeIxDGJmD2Md5vKicbNtIkdNvibicL87FjAOqGicuxcgBuRjjolLcGDOnfhMdykXibWuH6DV1g/640?wx_fmt=other&from=appmsg&wxfrom=5&wx_lazy=1&wx_co=1&tp=webp "")  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原始披露 URL 尚未确认，现有链接按来源追溯区分别标注）
