---
source: "gelusus/wxvl 公众号漏洞文库"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
title: "恶意推送脚本，Windows 修复漏洞"
product: "Vidar借Windows更新错误投毒新闻"
record_type: "unknown"
document_type: "技术文章（细分类待核）"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
prerequisites: "原文未给出可确认的版本、认证及部署边界；保留待核"
side_effects: "标题Windows紧急修复与正文主线假修复投毒不符"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%85%B6%E4%BB%96%E8%BD%AF%E4%BB%B6/%E6%9D%82%E9%A1%B9/%E6%81%B6%E6%84%8F%E6%8E%A8%E9%80%81%E8%84%9A%E6%9C%AC%EF%BC%8CWindows%20%E4%BF%AE%E5%A4%8D%E6%BC%8F%E6%B4%9E.md"
archive_commit: "41940cb0038d09ca5aaddbe5bffb923e423d210f"
source_status: "missing"
source_note: "原始出处待补；仓库归档不等同原始披露"
id: "vw-3d575485da1ad903e8da9b58"
entity_id: "ve-3d575485da1ad903e8da9b58"
schema_version: "1"
---

# 恶意推送脚本，Windows 修复漏洞

<!-- vulwiki-editorial-rebuild:system-misc -->
## 条目范围与校订

- 本文对象：Vidar借Windows更新错误投毒新闻
- 文献类型：技术文章（细分类待核）
- 版本、权限及部署边界：原文未给出可确认的版本、认证及部署边界；保留待核
- 核验状态：仅重建文本校订；未执行文中代码、PoC 或扫描，未把截图或转载声明记为本站复现

### 具体结论与待核项

以下为原归档的逐项勘误与证据缺口；可由文本确定的问题已在下文订正，仍缺来源的事实保持待核。

1. 标题Windows紧急修复与正文主线假修复投毒不符
2. CVE2024-20666是引诱受害者更新失败背景不是所执行PoC
3. 0x80070643原因只适该WinRE补丁情境不能概括所有此错误
4. 称发现两个网站却列五域名数量错
5. 所有账户被盗是过度确定，应区分可窃凭据与成功滥用
6. 隐藏KB5034441只止提示不修漏洞，作为最佳办法缺风险说明/官方后续处置
7. 无eSentire/微软精确源链接，恶意脚本全图无hash/采集时间
8. 域名已去活化较好，清调查HTML

### 操作风险

标题Windows紧急修复与正文主线假修复投毒不符

技术请求、代码与实验方法按原文保留；其中的破坏性动作仅限授权、可恢复的隔离环境。缺失代码、参数或版本事实不猜补。

### 来源追溯

- 原始披露 URL 未确认；既有归档来源标签保留，不能替代原始公告

### 归档技术正文

 信息安全大事件   2024-07-03 22:03  
  
虚假的   
IT 支持网站宣传针对常见 Windows 错误（如 0x80070643 错误）的恶意PowerShell“修复”，以使用窃取信息的恶意软件感染设备。  
  
这些虚假支持网站首先由   
eSentire 的威胁响应部门 (TRU) 发现，它们通过已被入侵和劫持的 YouTube 频道进行推广，以增加内容创建者的合法性。  
  
具体来说，威胁行为者正在制作虚假视频，宣传修复自一月份以来数百万   
Windows 用户一直在处理的 0x80070643 错误。  
  
在   
2024 年 1 月补丁星期二期间，微软发布了安全更新以修复 BitLocker 加密绕过漏洞，该漏洞被追踪为 CVE-2024-20666。  
  
安装更新后，全球的   
Windows 用户报告称，在尝试安装更新时收到“0x80070643 – ERROR_INSTALL_FAILURE”，无论他们如何努力，该错误都不会消失。  
  
“安装更新时出现一些问题，但我们稍后会再试。如果您继续看到此信息并想在网上搜索或联系支持人员获取信息，这可能会有所帮助：（0x80070643）”，Windows 更新错误显示。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/JqliagemfTA6IE0dGnJy5O2hVsY9icD5fvezVcclIOb6fMGEFK0zw3vxOUvciaPUro0ia0JBHgutUfy6BOrqDKXzQg/640?wx_fmt=png&from=appmsg "")  
  
Windows 更新中的 0x80070643  
  
事实证  
明，  
Windows Update 显示了不正确的错误消息，因为它应该在 Windows 恢复环境 (WinRE) 分区太小而无法安装更新的系统上显示 CBS_E_INSUFFICIENT_DISK_SPACE 错误。微软解释称，新的安全更新要求 WinRE 分区有 250MB 的可用空间，如果没有，则必须自行手动扩展该分区。但是，对于那些 WinRE 不是驱动器上的最后一个分区的人来说，扩展 WinRE 分区很复杂，甚至是不可能的。因此，许多人无法安装安全更新，并且每次使用 Windows 更新时都会出现 0x80070643 错误消息。  
  
这些错误导致许多沮丧的   
Windows 用户在线寻求解决方案，从而让威胁行为者得以利用他们寻找解决方案的机会。  
  
**虚假 IT 网站宣传 PowerShell 修复程序**  
  
据   
eSentire 称，威胁行为者正在创建许多虚假的 IT 支持网站，这些网站专门用于帮助用户解决常见的 Windows 错误，重点关注 0x80070643 错误。  
  
eSentire 报告解释道：“2024 年 6 月，eSentire 的威胁响应部门 (TRU)观察到一个有趣的案例，涉及通过虚假 IT 支持网站发起的 Vidar Stealer 感染。”  
  
“当受害者在网上搜索 Windows 更新错误代码的解决方案时，感染就开始了。”  
  
研究人员在   
YouTube 上发现了两个虚假的 IT 支持网站，名为 pchelprwizzards[.]com和pchelprwizardsguide[.]com、pchelprwizardpro[.]com、pchelperwizard[.]com 和 fixedguides[.]com 等网站。  
  
就像   
eSentire 为 PCHelperWizard 拼写错误网站找到的其他视频一样，研究人员还在 FixedGuides 网站上找到了 YouTube 视频，同样宣传了针对 0x80070643 错误的修复。  
  
这些网站都提供了修复方法，要么要求您复制并运行   
PowerShell 脚本，要么导入 Windows 注册表文件的内容。无论使用哪种“解决方案”，都会执行一个 PowerShell 脚本，在设备上下载恶意软件。eSentire 的报告概述了 PCHelperWizard 网站（不要与合法课程网站混淆）如何引导用户将 PowerShell 脚本复制到 Windows 剪贴板并在 PowerShell 提示符中执行它。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/JqliagemfTA6IE0dGnJy5O2hVsY9icD5fvRz92mNiaN2SL7gOfEfpOgBXYvoFIubDw7vznbyPMFKIkCeuVr1icA6HA/640?wx_fmt=png&from=appmsg "")  
  
伪装成  
   
Windows 错误修复程序的恶意 PowerShell 脚本  
  
该   
PowerShell 脚本包含一个 Base64 编码的脚本，它将连接到远程服务器以下载另一个 PowerShell 脚本，该脚本会在设备上安装 Vidar 信息窃取恶意软件。脚本完成后，它会显示修复成功的消息并重新启动计算机，同时还会启动恶意软件。FixedGuides 网站的做法略有不同，它使用混淆的 Windows 注册表文件来隐藏启动恶意 PowerShell 脚本的自动启动程序。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/JqliagemfTA6IE0dGnJy5O2hVsY9icD5fvegxBuqah4A0nxBqp46oTicOsI095wiaTn4ZcxGd4PvnzkaNt6k72MgoQ/640?wx_fmt=webp&from=appmsg "")  
  
混淆的 Windows 注册表文件  
  
但是，当从上述文件中提取字符串时，您可以看到它包含一个有效的注册表文件，该文件添加了运行   
PowerShell 脚本的 Windows 自动启动 (RunOnce) 条目。该脚本最终会在计算机上下载并安装窃取信息的恶意软件。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/JqliagemfTA6IE0dGnJy5O2hVsY9icD5fvuE0bOqc1rL5rKIGbibFvo69xkibyVOOtxdsbgtFfzUD2rjo6facHe22A/640?wx_fmt=webp&from=appmsg "")  
  
未混淆的 Windows 注册表文件  
  
使用任何虚假修复都会导致在   
Windows 重新启动后启动窃取信息的恶意软件。一旦启动，恶意软件将从您的浏览器中提取已保存的凭据、信用卡、cookie 和浏览历史记录。Vidar 还可以窃取加密货币钱包、文本文件和 Authy 2FA 身份验证器数据库，以及截取您的桌面屏幕截图。这些数据被汇编成一个名为“日志”的档案，然后上传到攻击者的服务器。被盗数据随后被用来发动其他攻击，例如勒索软件攻击，或在暗网市场上出售给其他威胁行为者。然而，受感染的用户现在面临一场噩梦，他们的所有账户均被盗用，并可能遭受金融欺诈。  
  
虽然   
Windows 错误可能令人烦恼，但至关重要的是只从可信赖的网站下载软件和修复程序，而不是从随机视频和信誉不佳或没有信誉的网站下载。  
  
您的凭证已经成为一种宝贵的商品，而威胁行为者正在想出各种狡猾且有创意的方法来窃取它们，因此不幸的是，每个人都需要对不寻常的攻击方法保持警惕。  
  
至于   
0x80070643 错误，如果您无法调整 WinRE 分区的大小，最好的办法是使用Microsoft 的显示或隐藏工具来隐藏 KB5034441 更新，以便 Windows Update 不再在您的系统上提供它，并且不会在 Internet 上搜索神奇的修复方法。  
  
  
<table><tbody style="outline: 0px;visibility: visible;"><tr class="ue-table-interlace-color-single js_darkmode__0" data-style="outline: 0px; background-color: rgb(28, 28, 28); visibility: visible; color: rgb(205, 205, 205) !important;" style="background-color: rgb(28, 28, 28);outline: 0px;visibility: visible;color: rgb(205, 205, 205) !important;"><td width="557" valign="top" data-style="outline: 0px; word-break: break-all; hyphens: auto; border-color: rgb(76, 76, 76); background-color: rgb(255, 218, 169); visibility: visible; color: rgb(25, 25, 25) !important;" class="js_darkmode__1" style="border-color: rgb(76, 76, 76);outline: 0px;word-break: break-all;hyphens: auto;background-color: rgb(255, 218, 169);visibility: visible;color: rgb(25, 25, 25) !important;"><section style="outline: 0px;line-height: normal;visibility: visible;"><span style="outline: 0px;font-size: 12px;visibility: visible;color: rgb(0, 0, 0);">尊敬的读者：<br style="outline: 0px;visibility: visible;"/>感谢您花时间阅读我们提供的这篇文章。我们非常重视您的时间和精力，并深知信息对您的重要性。<br style="outline: 0px;visibility: visible;"/>我们希望了解您对这篇文章的看法和感受。我们真诚地想知道您是否认为这篇文章为您带来了有价值的资讯和启示，是否有助于您的个人或职业发展。<br style="outline: 0px;visibility: visible;"/>如果您认为这篇文章对您非常有价值，并且希望获得更多的相关资讯和服务，我们愿意为您提供进一步的定制化服务。请通过填写我们提供的在线表单，与我们联系并提供您的邮箱地址或其他联系方式。我们将定期向您发送相关资讯和更新，以帮助您更好地了解我们的服务和文章内容。</span></section><section style="outline: 0px;line-height: normal;visibility: visible;"><br style="outline: 0px;visibility: visible;"/></section><section style="outline: 0px;line-height: normal;text-indent: 0em;visibility: visible;"><span style="outline: 0px;color: rgb(0, 0, 0);">                       </span><img class="rich_pages wxw-img" data-backh="106" data-backw="106" data-cropselx1="0" data-cropselx2="119" data-cropsely1="0" data-cropsely2="119" data-galleryid="" data-imgfileid="100005814" data-ratio="1" data-s="300,640" data-src="https://mmbiz.qpic.cn/sz_mmbiz_png/JqliagemfTA5N8G6ZVujodYTTD7NSaxFG5suXlkibicfoGRzCk6vHhCUBx7ST8b4AxdsFVNNAH4ltePBWX4AxKY0A/640?wx_fmt=other&amp;wxfrom=5&amp;wx_lazy=1&amp;wx_co=1&amp;tp=webp" data-type="png" data-w="1000" style="outline: 0px;font-family: 宋体;font-size: 14px;letter-spacing: 0.578px;text-align: center;visibility: visible !important;width: 119px !important;"/></section><section style="outline: 0px;line-height: normal;text-indent: 0em;"><span style="outline: 0px;font-family: 宋体;font-size: 12px;letter-spacing: 0.578px;text-align: center;color: rgb(0, 0, 0);">                               扫描二维码，参与调查</span></section><section style="outline: 0px;line-height: normal;"><br style="outline: 0px;letter-spacing: 0.544px;"/></section></td></tr></tbody></table>  
  
**END**  
  
  
  
点击下方，关注公众号  
  
获取免费咨询和安全服务  
  
![](https://mmbiz.qpic.cn/mmbiz_png/JqliagemfTA5OxIlGh6IbpxrTJHkcY5DZ4O80nevX4Ev7IHvjZfPZDDMxibSVWk4IdYfaYpuhBgz2iaWS5tzXZLJw/640?wx_fmt=other&wxfrom=5&wx_lazy=1&wx_co=1&tp=webp "")  
  
  
  
  
安全咨询/安全集成/安全运营  
  
专业可信的信息安全应用服务商！  
  
http://www.jsgjxx.com  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原始披露 URL 尚未确认，现有链接按来源追溯区分别标注）
