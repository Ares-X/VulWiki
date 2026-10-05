---
source: "gelusus/wxvl 公众号漏洞文库"
cve: "CVE-2026-1862"
identifier_role: "primary"
primary_identifiers: "CVE-2026-1862"
referenced_identifiers: ""
identifier_status: "unknown"
title: "漏洞预警  Google Chrome类型混淆漏洞"
product: "Google Chrome V8"
record_type: "advisory"
document_type: "简短漏洞通告"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
prerequisites: "文称<144.0.7559.132；恶意HTML和沙箱内内存损坏；PoC未公开属报道日期状态"
side_effects: "影响版本缺平台及受影响下限，不能覆盖所有历史Chrome；旧产品简介WebKit/Firefox代码不能替代当前组件信息"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E6%A1%8C%E9%9D%A2%E8%BD%AF%E4%BB%B6/Chrome/%E6%BC%8F%E6%B4%9E%E9%A2%84%E8%AD%A6%20%20Google%20Chrome%E7%B1%BB%E5%9E%8B%E6%B7%B7%E6%B7%86%E6%BC%8F%E6%B4%9E.md"
archive_commit: "41940cb0038d09ca5aaddbe5bffb923e423d210f"
source_status: "missing"
source_note: "原始出处待补；仓库归档不等同原始披露"
id: "vw-1683870d96d3071a0213a659"
entity_id: "ve-1683870d96d3071a0213a659"
schema_version: "1"
---

# 漏洞预警  Google Chrome类型混淆漏洞

<!-- vulwiki-editorial-rebuild:system-misc -->
## 条目范围与校订

- 本文对象：Google Chrome V8
- 文献类型：简短漏洞通告
- 版本、权限及部署边界：文称<144.0.7559.132；恶意HTML和沙箱内内存损坏；PoC未公开属报道日期状态
- 核验状态：仅重建文本校订；未执行文中代码、PoC 或扫描，未把截图或转载声明记为本站复现

### 具体结论与待核项

以下为原归档的逐项勘误与证据缺口；可由文本确定的问题已在下文订正，仍缺来源的事实保持待核。

1. 同1861/1862更新组的单CVE摘要，无独立机制或测试；可作为关联通告而非独立新漏洞
2. 影响版本缺平台及受影响下限，不能覆盖所有历史Chrome；旧产品简介WebKit/Firefox代码不能替代当前组件信息
3. 没有厂商公告/CVE记录来源，只chrome设置入口；保留高危、修复版本但待核验

### 操作风险

影响版本缺平台及受影响下限，不能覆盖所有历史Chrome；旧产品简介WebKit/Firefox代码不能替代当前组件信息

技术请求、代码与实验方法按原文保留；其中的破坏性动作仅限授权、可恢复的隔离环境。缺失代码、参数或版本事实不猜补。

### 来源追溯

- 原始披露 URL 未确认；既有归档来源标签保留，不能替代原始公告

### 归档技术正文

浅安
                    浅安  浅安安全   2026-02-10 00:00  
  
**0x00 漏洞编号**  
- # CVE-2026-1862  
  
**0x01 危险等级**  
- 高危  
  
**0x02 漏洞概述**  
  
Google Chrome是由Google开发的免费网页浏览器。Chrome代码是基于其他开放源代码软件所编写，包括Apple WebKit和Mozilla Firefox。  
  
![图片](../../.resource/remote/7297aee5a682510836f64794705754bddd20a943359b4718ccddd4066ae543b8.webp "")  
  
**0x03 漏洞详情**  
###   
  
**CVE-2026-1862**  
  
**漏洞类型：**  
类型混淆  
  
**影响：**  
执行  
任意代码  
  
**简述：**  
Google Chrome中V8引擎存在类型混淆漏洞，该漏洞允许攻击者通过精心构造的HTML页面，触发V8引擎中的堆内存损坏，可能导致应用崩溃或执行恶意代码。  
  
**0x04 影响版本**  
- Chrome < 144.0.7559.132  
  
**0x05****POC状态**  
- 未公开  
  
**0x06****修复建议**  
  
**目前官方已发布漏洞修复版本，建议用户升级到安全版本****：**  
  
chrome://settings/help  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原始披露 URL 尚未确认，现有链接按来源追溯区分别标注）
