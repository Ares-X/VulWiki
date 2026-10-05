---
source: "gelusus/wxvl 公众号漏洞文库"
cve: "CVE-2024-38217;CVE-2024-38226;CVE-2024-38014;CVE-2024-43461;CVE-2024-43491;CVE-2024-38018;CVE-2024-38227;CVE-2024-38228;CVE-2024-43464"
identifier_role: "primary"
primary_identifiers: "CVE-2024-38217;CVE-2024-38226;CVE-2024-38014;CVE-2024-43461;CVE-2024-43491;CVE-2024-38018;CVE-2024-38227;CVE-2024-38228;CVE-2024-43464"
referenced_identifiers: ""
identifier_status: "unknown"
title: "涉及微软多款产品，4个被利用的0 Day漏洞亟待修复"
product: "Windows/Publisher/Installer/MSHTML/SharePoint"
record_type: "advisory"
document_type: "2024年9月补丁日新闻汇编"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
prerequisites: "LNK/Publisher需文件交互，Installer本地认证，SharePoint需认证且角色门槛各异，43491仅特定Win10 1507可选组件/更新状态"
side_effects: "原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/%E7%B3%BB%E7%BB%9F%E5%AE%89%E5%85%A8/Windows/%E6%B6%89%E5%8F%8A%E5%BE%AE%E8%BD%AF%E5%A4%9A%E6%AC%BE%E4%BA%A7%E5%93%81%EF%BC%8C4%E4%B8%AA%E8%A2%AB%E5%88%A9%E7%94%A8%E7%9A%840%20Day%E6%BC%8F%E6%B4%9E%E4%BA%9F%E5%BE%85%E4%BF%AE%E5%A4%8D.md"
archive_commit: "41940cb0038d09ca5aaddbe5bffb923e423d210f"
source_status: "missing"
source_note: "原始出处待补；仓库归档不等同原始披露"
id: "vw-32810affc6103392f6c75d1a"
entity_id: "ve-32810affc6103392f6c75d1a"
schema_version: "1"
---

# 涉及微软多款产品，4个被利用的0 Day漏洞亟待修复

<!-- vulwiki-editorial-rebuild:system-misc -->
## 条目范围与校订

- 本文对象：Windows/Publisher/Installer/MSHTML/SharePoint
- 文献类型：2024年9月补丁日新闻汇编
- 版本、权限及部署边界：LNK/Publisher需文件交互，Installer本地认证，SharePoint需认证且角色门槛各异，43491仅特定Win10 1507可选组件/更新状态
- 核验状态：仅重建文本校订；未执行文中代码、PoC 或扫描，未把截图或转载声明记为本站复现

### 具体结论与待核项

以下为原归档的逐项勘误与证据缺口；可由文本确定的问题已在下文订正，仍缺来源的事实保持待核。

1. frontmatter只38217，正文9CVE多产品应拆关联记录保留新闻索引
2. 标题4个已利用与正文43461微软尚未标在野有区别，应保留ZDI与微软报道时点分歧，不能改成单一已核结论
3. 43491自身未证实利用与回滚后的旧漏洞被利用需严格区分，文中该区分有价值应保留
4. 43491段开头重复并截断Windo，确认采集/编辑噪声；79修复补丁与79CVE计数概念应核原文
5. SSU KB5043936再KB5043083的顺序要求应保留并对官方确认；缺每实体MSRC直接链接/版本
6. HelpNetSecurity原文完整可追溯，SharePoint仅认证不够精细需角色，推测Publisher恶意代码事件不可当官方事实；去宣传图

### 操作风险

原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响

技术请求、代码与实验方法按原文保留；其中的破坏性动作仅限授权、可恢复的隔离环境。缺失代码、参数或版本事实不猜补。

### 来源追溯

- 原文参考链接（未重新核验）：<https://www.helpnetsecurity.com/2024/09/10/cve-2024-38217-cve-2024-43491/>
- 原始披露 URL 未确认；既有归档来源标签保留，不能替代原始公告

### 归档技术正文

 安全客   2024-09-11 13:32  
  
近日，微软发布了79个修复补丁，其中包括针对几个被攻击者在实际环境中利用的0 Day漏洞（CVE-2024-38217、CVE-2024-38226、CVE-2024-38014、CVE-2024-43461）以及一个导致Windows 10早期CVE修复失效的代码缺陷（CVE-2024-43491）。  
  
  
**NEWS**  
  
  
  
**被积极利用的漏洞**  
  
  
首先，我们来看一下唯一一个之前已公开的漏洞：CVE-2024-38217，这是一个允许攻击者绕过“网页标记”（Mark of the Web, MotW）的漏洞。  
  
  
Elastic Security研究员Joe Desimone报告称，这个漏洞已经被攻击者利用多年，他们通过构造具有非标准目标路径或内部结构的Windows快捷方式文件（.LNK）进行攻击。  
  
  
这些文件会迫使Windows“重写”它们并移除MotW元数据，从而导致安全特性如SmartScreen应用程序声誉检查和旧版Windows附件服务安全提示的完整性和可用性受到影响。  
  
  
接下来是CVE-2024-38226，这是另一个允许攻击者绕过安全功能的漏洞。该漏洞影响Microsoft Publisher，这是一款独立应用程序，也包含在某些版本的Microsoft Office中。  
  
  
微软解释道，“攻击本身是由一个对目标系统已认证的用户在本地执行的。经过认证的攻击者可以通过社会工程学说服受害者从网站下载并打开一个特制的文件，从而在受害者的计算机上发起本地攻击。”  
  
  
显然，有人成功绕过了Office宏策略，在目标计算机上执行了恶意代码。遗憾的是，微软没有透露是谁报告了这个漏洞，因此我们无法推测该漏洞被利用的攻击性质。  
  
  
另一个被利用的0 Day漏洞是CVE-2024-38014，这个漏洞存在于Windows Installer中，可能允许经过认证的攻击者提升权限至SYSTEM级别。  
  
  
Trend Micro零日计划负责人Dustin Childs指出：“有趣的是，微软表示这个漏洞不需要用户交互，所以实际的利用机制可能比较特殊。不过，这类权限提升漏洞通常会与代码执行漏洞配合使用，以控制系统。”他建议“快速测试和部署这个修复。”  
  
  
Tenable高级研究工程师Satnam Narang补充道，由于权限提升漏洞通常与后期入侵活动有关，它们可能不会像远程代码执行漏洞那样受到广泛关注。但这类漏洞对攻击者来说非常有价值，因为它们可以造成更多损害或获取更多数据，因此组织必须确保修复这些漏洞，以切断攻击路径，防止未来的入侵。  
  
  
CVE-2024-43461是一个Windows MSHTML平台伪装漏洞，目前尚未描述为在实际环境中被利用，但Childs表示它应被视为高风险漏洞。  
  
  
“这个漏洞类似于我们在7月报告并修复的漏洞。ZDI威胁狩猎团队在6月发现了这个漏洞并报告给微软。看来威胁行为者很快绕过了之前的修复，”他指出。“我们报告这个漏洞时表示它正在被积极利用，但不清楚为何微软没有将其列为活跃攻击。应将其视为高风险漏洞，特别是它影响所有受支持的Windows版本。”  
  
  
**NEWS**  
  
  
  
**其他值得关注的漏洞**  
  
  
CVE-2024-43491是一个有趣的漏洞，它有效地使得一些影响WindoCVE-2024-43491是一个有趣的漏洞，它使得影响Windows 10版本1507的一些可选组件（如Internet Explorer 11、Windows Media Player、MSMQ服务器核心等）的修复回滚。  
  
  
Immersive Labs的高级威胁研究总监Kevin Breen指出，“这个漏洞影响了Windows更新系统，使得某些组件的安全补丁被回滚到易受攻击的状态，自2024年3月以来一直处于这种状态。这些组件中有些曾在实际环境中被利用过，这意味着尽管Windows更新显示已完全修补，但攻击者仍可能利用这些组件。”  
  
  
不过，微软表示尚未检测到对CVE-2024-43491本身的利用。微软的Windows产品团队发现了这个问题，但没有证据表明它在公开场合被知晓。  
  
  
另一个好消息是，受影响的Windows 10系统仅占少数。用户/管理员应检查公告，确认机器是否受影响，并按照顺序安装“2024年9月的服务堆栈更新（SSU KB5043936）和2024年9月的Windows安全更新（KB5043083）。”  
  
  
在微软认为更可能被利用的修复漏洞中，有四个Microsoft SharePoint漏洞（CVE-2024-38018、CVE-2024-38227、CVE-2024-38228、CVE-2024-43464），这些漏洞可能被用来在SharePoint服务器上实现远程代码执行。尽管这四个漏洞都要求攻击者首先进行认证，但SharePoint管理员应该及时实施这些修复。  
  
  
文章来源：  
  
https://www.helpnetsecurity.com/2024/09/10/cve-2024-38217-cve-2024-43491/  
  
  
**安全KER**  
  
  
安全KER致力于搭建国内安全人才学习、工具、淘金、资讯一体化开放平台，推动数字安全社区文化的普及推广与人才生态的链接融合。目前，安全KER已整合全国数千位白帽资源，联合南京、北京、广州、深圳、长沙、上海、郑州等十余座城市，与ISC、XCon、看雪SDC、Hacking Group等数个中大型品牌达成合作。  
  
![](../../Web%E5%AE%89%E5%85%A8/.resource/remote/d6caf2b9d07446e5db2fc0c72b39245bd35ef1117cbe12d413cf0c1f3677e90a.png "")  
  
![](../../Web%E5%AE%89%E5%85%A8/.resource/remote/31600ffd2a8b7de6a5cfe92a17d234f4fe8bb143ca88486bc2e1ef8dac3fea63.png "")  
  
**注册安全KER社区**  
  
**链接最新“圈子”动态**  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原始披露 URL 尚未确认，现有链接按来源追溯区分别标注）
