---
source: "gelusus/wxvl 公众号漏洞文库"
cve: "CVE-2026-43707;CVE-2026-43716;CVE-2026-43745;CVE-2026-43715;CVE-2026-43720;CVE-2026-43725;CVE-2026-43722;CVE-2026-43724;CVE-2026-39868"
identifier_role: "primary"
primary_identifiers: "CVE-2026-43707;CVE-2026-43716;CVE-2026-43745;CVE-2026-43715;CVE-2026-43720;CVE-2026-43725;CVE-2026-43722;CVE-2026-43724;CVE-2026-39868"
referenced_identifiers: ""
identifier_status: "unknown"
title: "苹果修复了iOS、macOS和Safari的30多个漏洞，其中包括人工智能发现的WebKit漏洞"
product: "Apple WebKit与内核"
record_type: "roundup"
document_type: "多漏洞安全更新新闻"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
prerequisites: "文中iOS/iPadOS/macOS/Safari26.5.2更新；Web内容漏洞与本地恶意应用内核漏洞条件不同"
side_effects: "明确没有公开在野利用证据，不能推广崩溃为任意代码执行"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E6%A1%8C%E9%9D%A2%E8%BD%AF%E4%BB%B6/Webkit/%E8%8B%B9%E6%9E%9C%E4%BF%AE%E5%A4%8D%E4%BA%86iOS%E3%80%81macOS%E5%92%8CSafari%E7%9A%8430%E5%A4%9A%E4%B8%AA%E6%BC%8F%E6%B4%9E%EF%BC%8C%E5%85%B6%E4%B8%AD%E5%8C%85%E6%8B%AC%E4%BA%BA%E5%B7%A5%E6%99%BA%E8%83%BD%E5%8F%91%E7%8E%B0%E7%9A%84WebKit%E6%BC%8F%E6%B4%9E.md"
archive_commit: "41940cb0038d09ca5aaddbe5bffb923e423d210f"
source_status: "missing"
source_note: "原始出处待补；仓库归档不等同原始披露"
id: "vw-e700c9d4eb4a708b51d58112"
entity_id: "ve-e700c9d4eb4a708b51d58112"
schema_version: "1"
---

# 苹果修复了iOS、macOS和Safari的30多个漏洞，其中包括人工智能发现的WebKit漏洞

<!-- vulwiki-editorial-rebuild:system-misc -->
## 条目范围与校订

- 本文对象：Apple WebKit与内核
- 文献类型：多漏洞安全更新新闻
- 版本、权限及部署边界：文中iOS/iPadOS/macOS/Safari26.5.2更新；Web内容漏洞与本地恶意应用内核漏洞条件不同
- 核验状态：仅重建文本校订；未执行文中代码、PoC 或扫描，未把截图或转载声明记为本站复现

### 具体结论与待核项

以下为原归档的逐项勘误与证据缺口；可由文本确定的问题已在下文订正，仍缺来源的事实保持待核。

1. 元数据仅43707，正文至少九个编号，三十多个总体统计不能替代逐项记录
2. AI发现归属、Dirty Frag研究者关联、版本、披露时序与Reuters引语均无原始可点击来源，需核验后收录为确定事实
3. 末尾引语未闭合且文章突然终止，疑似采集截断
4. 明确没有公开在野利用证据，不能推广崩溃为任意代码执行

### 操作风险

明确没有公开在野利用证据，不能推广崩溃为任意代码执行

技术请求、代码与实验方法按原文保留；其中的破坏性动作仅限授权、可恢复的隔离环境。缺失代码、参数或版本事实不猜补。

### 来源追溯

- 原始披露 URL 未确认；既有归档来源标签保留，不能替代原始公告

### 归档技术正文

原创 网络安全9527
                    网络安全9527  安全圈的那点事儿   2026-06-30 11:12  
  
苹果公司周一发布了iOS、macOS 和 Safari 网络浏览器的安全更新，以解决三十多个漏洞，其中包括使用 Anthropic Claude 和 OpenAI Codex Security 等人工智能 (AI) 工具发现的 WebKit 中的四个漏洞。  
  
WebKit漏洞如下所示 -  
- CVE-2026-43707 - 内存损坏问题，可能导致在处理恶意构造的网页内容时进程意外崩溃。此问题已通过改进内存管理得到解决。  
- CVE-2026-43716 - 此漏洞未具体说明，可能导致 Safari 在处理恶意构造的网页内容时意外崩溃。该漏洞已通过改进内存管理得到解决。  
- CVE-2026-43745 - 越界写入漏洞，可能导致 Safari 在处理恶意构造的网页内容时意外崩溃。此漏洞已通过改进输入验证得到修复。  
- CVE-2026-43715 - 一个释放后使用漏洞，在处理恶意构造的网页内容时可能导致内存损坏。该漏洞已通过改进内存管理得到解决。  
苹果公司将前三个安全缺陷归功于 OpenAI Codex Security，而 Anthropic 的研究人员 Milad Nasr 和 Nicholas Carlini 以及 Claude 则因 CVE-2026-43715 而受到表彰。  
  
这四个漏洞只是苹果公司开发的开源网络浏览器引擎 WebKit 中近 30 个已修复漏洞的一部分。其他漏洞包括 WebKit Canvas 中的释放后使用漏洞 (CVE-2026-43720) 以及恶意网站可能利用该漏洞在沙箱之外处理受限网页内容的漏洞 (CVE-2026-43725)。  
  
苹果公司还修复了三个可能被恶意应用程序利用的漏洞，这些漏洞可能导致敏感内核状态泄露（CVE-2026-43722）、系统意外终止或写入内核内存（CVE-2026-43724）以及内核内存损坏（CVE-2026-39868）。安全研究员金贤宇（Hyunwoo Kim）发现了Dirty Frag漏洞，并因此发现了 CVE-2026-43724 和 CVE-2026-43722 漏洞。  
  
此次更新适用于iOS 26.5.2、iPadOS 26.5.2、macOS Tahoe 26.5.2和Safari 26.5.2。目前尚未披露任何已修复的漏洞已被实际利用。  
  
苹果公司在一份与路透社分享的声明中表示，由于担心人工智能工具可能会加速漏洞利用的开发，并成为网络战的推动者，将发现漏洞和将其武器化之间的时间缩短到几个小时，因此苹果公司正在比以往更早地进行安全更新。  
  
据路透社报道，该公司表示，“鉴于人工智能能够加速恶意黑客工具的开发，该公司正在适应这一现实，因此需要缩短更新首次公开到交付给客户之间的时间。  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原始披露 URL 尚未确认，现有链接按来源追溯区分别标注）
