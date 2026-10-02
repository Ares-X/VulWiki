---
source: "gelusus/wxvl 公众号漏洞文库"
cve: "CVE-2023-28205;CVE-2023-28206"
identifier_role: "primary"
primary_identifiers: "CVE-2023-28205;CVE-2023-28206"
referenced_identifiers: ""
identifier_status: "unknown"
title: "Apple发布针对间谍软件式0day漏洞的修复"
product: "Apple WebKit；IOSurfaceAccelerator"
record_type: "advisory"
document_type: "漏洞修复新闻"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
prerequisites: "恶意Web内容浏览器执行与本地恶意应用内核执行两个阶段；受影响iPhone/iPad/Mac型号仅概述"
side_effects: "原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E6%A1%8C%E9%9D%A2%E8%BD%AF%E4%BB%B6/Apple/Apple%E5%8F%91%E5%B8%83%E9%92%88%E5%AF%B9%E9%97%B4%E8%B0%8D%E8%BD%AF%E4%BB%B6%E5%BC%8F0day%E6%BC%8F%E6%B4%9E%E7%9A%84%E4%BF%AE%E5%A4%8D.md"
archive_commit: "41940cb0038d09ca5aaddbe5bffb923e423d210f"
source_status: "missing"
source_note: "原始出处待补；仓库归档不等同原始披露"
id: "vw-fe42404a72acc3da1e654628"
entity_id: "ve-fe42404a72acc3da1e654628"
schema_version: "1"
---

# Apple发布针对间谍软件式0day漏洞的修复

<!-- vulwiki-editorial-rebuild:system-misc -->
## 条目范围与校订

- 本文对象：Apple WebKit；IOSurfaceAccelerator
- 文献类型：漏洞修复新闻
- 版本、权限及部署边界：恶意Web内容浏览器执行与本地恶意应用内核执行两个阶段；受影响iPhone/iPad/Mac型号仅概述
- 核验状态：仅重建文本校订；未执行文中代码、PoC 或扫描，未把截图或转载声明记为本站复现

### 具体结论与待核项

以下为原归档的逐项勘误与证据缺口；可由文本确定的问题已在下文订正，仍缺来源的事实保持待核。

1. 元数据漏28206，需保留两个漏洞和可能攻击链关系
2. 先说可能链接两漏洞，后转为确定可接管整个设备，缺链条及沙箱逃逸验证，应保留推断层级
3. 没有修复系统版本、官方安全公告、Sophos原文链接，难以据此升级
4. AppStore与浏览器引擎规则属当时平台背景，不能无时间限制外推；移动设备不宜仅列桌面

### 操作风险

原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响

技术请求、代码与实验方法按原文保留；其中的破坏性动作仅限授权、可恢复的隔离环境。缺失代码、参数或版本事实不猜补。

### 来源追溯

- 原始披露 URL 未确认；既有归档来源标签保留，不能替代原始公告

### 归档技术正文

 安全客   2023-04-11 11:38  
  
Apple 发布了安全更新，以解决两个在野外被积极利用并针对 iPad、Mac 和 iPhone 的零日漏洞。  
  
这些漏洞被跟踪为CVE-2023-28205和CVE-2023-28206。根据 Apple安全公告，这些修复解决了谷歌威胁分析小组的 Clément Lecigne 和国际特赦组织安全实验室的 Donncha Ó Cearbhaill 发现的相同安全问题。  
  
最新的零日漏洞影响 iPhone 8 及更高版本、所有型号的 iPad Pro、第三代 iPad Air 及更高版本、第五代及更高版本的 iPad、第五代 iPad mini 及更高版本以及运行 macOS Ventura 的 Mac。  
  
“这些更新解决了两个不同的漏洞。重要的是，这两个漏洞不仅被描述为导致“任意代码执行”，而且被描述为‘被积极利用’，使它们成为零日漏洞，”安全研究员 Paul Ducklin Sophos，在博客文章中  
说。  
  
由于越界写入缺陷（指定为 CVE-2023-28206），在 Apple 的 IOSurfaceAccelerator 显示代码中，任何 iOS 应用程序都可以使用内核权限执行任意代码。  
  
Ducklin 说：“这个漏洞允许一个设下陷阱的本地应用程序将自己的流氓代码直接注入操作系统内核本身。” “内核代码执行错误不可避免地比应用程序级别的错误严重得多，因为内核负责管理整个系统的安全性，包括应用程序可以获得哪些权限，以及应用程序之间如何自由共享文件和数据。”  
  
越界写入是指在缓冲区开始之前或结束之后写入数据。“通常，这会导致数据损坏、崩溃或代码执行，”根据 Mitre 的常见弱点枚举  
网站  
。  
  
虽然苹果公司表示它“知道有关此问题可能已被积极利用的报告”，但它并未将此类漏洞利用归因于任何特定的网络犯罪或民族国家组织。  
  
另一个被追踪为 CVE-2023-28205 的漏洞存在于开源 Web 浏览器引擎 WebKit 中，该引擎在 iOS 和 Apple 设备上使用。WebKit 是 Apple 的网页内容显示子系统。它说，未打补丁的“恶意制作的网络内容可能会导致任意代码执行”。  
  
WebKit 漏洞可让攻击者控制用户的浏览器或任何使用 WebKit 呈现和显示 HTML 内容的应用程序。这些应用程序使用“WebKit 来向您展示网页预览、显示帮助文本，甚至只是生成一个好看的关于屏幕，”Ducklin 说。  
  
“Apple 自己的 Safari 浏览器使用 WebKit，使其直接容易受到 WebKit 错误的影响。此外，Apple 的 App Store 规则意味着 iPhone 和 iPad 上的所有浏览器都必须使用 WebKit，这使得这种错误成为移动 Apple 设备真正的跨浏览器问题， "达克林说。  
  
攻击者也有可能将这两个漏洞链接在一起 - 例如，利用 WebKit 并使用它来转向内核漏洞。  
  
内核级错误依赖于诱杀应用程序，由于其严格的 App Store围墙花园  
规则，这通常本身就是对 Apple 设备的威胁，这使得攻击者很难诱骗受害者安装流氓应用程序。  
  
Ducklin 表示，用户不会去市场并从二级或非官方来源安装应用程序，“即使你愿意，所以骗子需要先将他们的流氓应用程序偷偷带入 App Store，然后他们才能试图说服你进入安装它。但是当攻击者可以将远程破坏浏览器的错误与本地破坏内核的漏洞结合起来时，他们就可以完全避开 App Store 问题。”  
  
Ducklin 说，这个错误就是这种情况。跟踪为 CVE-2023-28205 的第一个错误允许攻击者远程接管手机的浏览器应用程序 - 此时攻击者拥有一个陷阱应用程序，他们可以使用该应用程序来利用跟踪为 CVE-2023-28206 的第二个错误来接管整个设备。  
  
“请记住，由于所有具有 Web 显示功能的 App Store 应用程序都需要使用 WebKit，因此即使您安装了第三方浏览器而不是 Safari，CVE-2023-28205 错误也会影响您，”Ducklin 补充道。  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原始披露 URL 尚未确认，现有链接按来源追溯区分别标注）
