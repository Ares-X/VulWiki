---
source: "gelusus/wxvl 公众号漏洞文库"
cve: "CVE-2024-43461"
identifier_role: "primary"
primary_identifiers: "CVE-2024-43461"
referenced_identifiers: "CVE-2024-38112;CVE-2024-38217"
identifier_status: "unknown"
title: "黑客利用Windows 漏洞-盲文“空格”进行零日攻击"
product: "Windows MSHTML/InternetShortcut显示欺骗"
record_type: "advisory"
document_type: "MSHTML在野攻击链新闻"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
prerequisites: "用户点击.url并选择打开伪装HTA；38112与43461链式配合；2024-07和09分别修复"
side_effects: "原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/%E7%B3%BB%E7%BB%9F%E5%AE%89%E5%85%A8/Windows/%E9%BB%91%E5%AE%A2%E5%88%A9%E7%94%A8Windows%20%E6%BC%8F%E6%B4%9E-%E7%9B%B2%E6%96%87%E2%80%9C%E7%A9%BA%E6%A0%BC%E2%80%9D%E8%BF%9B%E8%A1%8C%E9%9B%B6%E6%97%A5%E6%94%BB%E5%87%BB.md"
archive_commit: "41940cb0038d09ca5aaddbe5bffb923e423d210f"
source_status: "missing"
source_note: "原始出处待补；仓库归档不等同原始披露"
id: "vw-c286954f61687b448780e420"
entity_id: "ve-c286954f61687b448780e420"
schema_version: "1"
---

# 黑客利用Windows 漏洞-盲文“空格”进行零日攻击

<!-- vulwiki-editorial-rebuild:system-misc -->
## 条目范围与校订

- 本文对象：Windows MSHTML/InternetShortcut显示欺骗
- 文献类型：MSHTML在野攻击链新闻
- 版本、权限及部署边界：用户点击.url并选择打开伪装HTA；38112与43461链式配合；2024-07和09分别修复
- 核验状态：仅重建文本校订；未执行文中代码、PoC 或扫描，未把截图或转载声明记为本站复现

### 具体结论与待核项

以下为原归档的逐项勘误与证据缺口；可由文本确定的问题已在下文订正，仍缺来源的事实保持待核。

1. 区分38112调用IE和43461文件名显示欺骗的链条清楚，保留；38217仅同月旁述不得合并主实体
2. 先未标在野后公告更新的时间线可补9月月报状态差异，但周五/本月需恢复准确日期
3. 26个U+2800显示空白而非普通空格，百分号编码的UI影响需标具体浏览器/构建；不意味着无交互RCE
4. 修复显示真实.hta后仍可社工的评论不等于漏洞补丁无效，需区分剩余欺骗风险
5. 只给来源BleepingComputer名称，无源文/MSRC/TrendMicro/CheckPoint直接URL和补丁KB；截图未视检，APT归因需原研究

### 操作风险

原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响

技术请求、代码与实验方法按原文保留；其中的破坏性动作仅限授权、可恢复的隔离环境。缺失代码、参数或版本事实不猜补。

### 来源追溯

- 原始披露 URL 未确认；既有归档来源标签保留，不能替代原始公告

### 归档技术正文

Rhinoer  犀牛安全   2024-09-29 19:07  
  
![](../../Web%E5%AE%89%E5%85%A8/.resource/remote/da0f750e60d29ccdb92e88104800e1a53ec766a647c52719c75693c4da5d91b5.png "")  
  
最近修复的“Windows MSHTML 欺骗漏洞”编号为 CVE-2024-43461，现被标记为之前被利用，因为该漏洞曾被 Void Banshee APT 黑客组织用于攻击。  
  
在2024 年 9 月补丁星期二首次披露该漏洞时，微软并未将该漏洞标记为已利用。然而，微软在周五更新了CVE-2024-43461公告，指出该漏洞在修复之前就已被利用。  
  
该漏洞的发现归功于趋势科技零日高级威胁研究员Peter Girnus，他告诉 BleepingComputer，Void Banshee 在零日攻击中利用 CVE-2024-43461 漏洞来安装窃取信息的恶意软件。  
  
Void Banshee 是趋势科技首次追踪的一个 APT 黑客组织，其目标是北美、欧洲和东南亚的组织，以窃取数据和获取经济利益。  
  
CVE-2024-43461 零日漏洞  
  
7 月份，Check Point Research 和 Trend Micro 均报告了同样的攻击，这些攻击利用 Windows 零日漏洞感染设备，并安装 Atlantida 信息窃取程序，用于从受感染设备窃取密码、身份验证 cookie 和加密货币钱包。  
  
此次攻击利用了被追踪为 CVE-2024-38112（7 月修复）和 CVE-2024-43461（本月修复）的零日漏洞作为攻击链的一部分。  
  
CVE-2024-38112 零日漏洞的发现归功于 Check Point 研究员 Haifei Li，他表示该漏洞被用来强制 Windows 在启动特制的快捷方式文件时在 Internet Explorer 中打开恶意网站，而不是在 Microsoft Edge 中打开。  
  
Check Point 研究员在7 月份的 Check Point Research 报告中解释道：“具体来说，攻击者使用特殊的 Windows Internet 快捷方式文件（.url 扩展名），单击该文件时，会调用已退役的 Internet Explorer（IE）来访问攻击者控制的 URL。”  
  
这些 URL 被用来下载恶意 HTA 文件并提示用户打开它。打开后，脚本将运行以安装 Atlantida 信息窃取程序。  
  
HTA 文件利用另一个零日漏洞（CVE-2024-43461）来隐藏 HTA 文件扩展名，并在 Windows 提示用户是否打开时使文件显示为 PDF，如下所示。  
  
ZDI 研究员 Peter Girnus 告诉 BleepingComputer，CVE-2024-43461 漏洞也被用于 Void Banshee 攻击 ，通过包含 26 个编码盲文空格字符（%E2%A0%80）的 HTA 文件名创建 CWE-451 条件以隐藏 .hta 扩展名。  
  
正如您在下面看到的，文件名以 PDF 文件开头，但包含二十六个重复编码的盲文空白字符（%E2%A0%80），后面跟着最后的 '.hta' 扩展名。  
  
![](../../Web%E5%AE%89%E5%85%A8/.resource/remote/cb55a5a3bf68ba591e9df45a7ff6bb02848922ce3d584dd9ba3f743b48607295.png "")  
  
当 Windows 打开此文件时，盲文空白字符会将 HTA 扩展推到用户界面之外，仅在 Windows 提示中用“ ...”字符串划定界限，如下所示。这导致 HTA 文件显示为 PDF 文件，使其更有可能被打开。  
  
![](../../Web%E5%AE%89%E5%85%A8/.resource/remote/1eaac60c773e4f5d34143b4de8f07b93c8d9751a8cfc03a88bb3c18ed0e50940.png "")  
  
安装 CVE-2024-43461 的安全更新后，Girnus 表示空格未被删除，但 Windows 现在 在提示中显示文件的实际.hta扩展名。  
  
![](../../Web%E5%AE%89%E5%85%A8/.resource/remote/e7145227875f7b554a6e5fcc40785d1891ed816e83b3bbc385ba639651e2208f.png "")  
  
不幸的是，这个修复并不完美，因为包含的空格可能仍然会让人们误以为该文件是 PDF 而不是 HTA 文件。  
  
微软在 9 月补丁星期二修复了其他三个被积极利用的零日漏洞，其中包括 CVE-2024-38217，该漏洞被利用于LNK 踩踏攻击中以绕过 Web 安全功能的标记。  
  
  
信息来源：BleepingComputer  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原始披露 URL 尚未确认，现有链接按来源追溯区分别标注）
