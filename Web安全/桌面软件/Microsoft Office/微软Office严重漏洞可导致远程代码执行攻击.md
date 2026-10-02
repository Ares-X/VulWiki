---
source: "gelusus/wxvl 公众号漏洞文库"
cve: "CVE-2026-26110"
identifier_role: "primary"
primary_identifiers: "CVE-2026-26110"
referenced_identifiers: ""
identifier_status: "unknown"
title: "微软Office严重漏洞可导致远程代码执行攻击"
product: "Microsoft Office类型混淆"
record_type: "advisory"
document_type: "Office补丁新闻"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
prerequisites: "文称Windows/Mac/Android；Windows预览窗格路径；不要求宏或高权限，具体组件/补丁构建未给"
side_effects: "原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E6%A1%8C%E9%9D%A2%E8%BD%AF%E4%BB%B6/Microsoft%20Office/%E5%BE%AE%E8%BD%AFOffice%E4%B8%A5%E9%87%8D%E6%BC%8F%E6%B4%9E%E5%8F%AF%E5%AF%BC%E8%87%B4%E8%BF%9C%E7%A8%8B%E4%BB%A3%E7%A0%81%E6%89%A7%E8%A1%8C%E6%94%BB%E5%87%BB.md"
archive_commit: "41940cb0038d09ca5aaddbe5bffb923e423d210f"
source_status: "missing"
source_note: "原始出处待补；仓库归档不等同原始披露"
id: "vw-5706cd799bdc4a302a550d97"
entity_id: "ve-5706cd799bdc4a302a550d97"
schema_version: "1"
---

# 微软Office严重漏洞可导致远程代码执行攻击

<!-- vulwiki-editorial-rebuild:system-misc -->
## 条目范围与校订

- 本文对象：Microsoft Office类型混淆
- 文献类型：Office补丁新闻
- 版本、权限及部署边界：文称Windows/Mac/Android；Windows预览窗格路径；不要求宏或高权限，具体组件/补丁构建未给
- 核验状态：仅重建文本校订；未执行文中代码、PoC 或扫描，未把截图或转载声明记为本站复现

### 具体结论与待核项

以下为原归档的逐项勘误与证据缺口；可由文本确定的问题已在下文订正，仍缺来源的事实保持待核。

1. 解释本地攻击向量为恶意代码必须事先执行，容易与利用结果混淆，应是受害端处理本地内容的入口语义
2. 完全无需用户交互与选中文件预览的实际动作需按UI评分定义解释，不能称无任何操作自动接管
3. Office年份与平台列表过粗，跨Mac/Android不能套Windows预览缓解，缺逐产品KB/安全版本
4. 无MSRC或原新闻链接，8.4/Exploitation Unlikely/暂无利用代码等需按公告时点核验
5. 正文类型混淆通用解释不能替代具体触发路径和进程权限；代码执行不等管理员权限

### 操作风险

原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响

技术请求、代码与实验方法按原文保留；其中的破坏性动作仅限授权、可恢复的隔离环境。缺失代码、参数或版本事实不猜补。

### 来源追溯

- 原始披露 URL 未确认；既有归档来源标签保留，不能替代原始公告

### 归档技术正文

原创 网络安全9527
                    网络安全9527  安全圈的那点事儿   2026-03-12 11:07  
  
2026年3月10日，微软发布了安全更新，以解决其广泛使用的Office套件中的一个严重漏洞。  
  
该安全漏洞编号为CVE-2026-26110，允许未经授权的攻击者在受害者的设备上执行恶意代码。  
  
该漏洞严重性评级高，CVSS 基本得分为 8.4 分（满分 10 分），会影响Windows、Mac 和 Android 平台上的各种 Microsoft Office 应用程序。  
  
CVE-2026-26110 的核心问题在于一种名为“类型混淆”（CWE-843）的漏洞。当软件分配或初始化特定类型的资源（例如指针、对象或变量）时，如果随后尝试使用另一种不兼容的类型访问该资源，就会发生这种情况。  
  
由于资源不具备预期的属性，因此会导致逻辑错误和越界内存访问。  
  
攻击者可以利用类型处理不当来绕过预期的软件限制，访问非预期的内存区域，并在目标系统上执行未经授权的命令。  
## 微软Office漏洞可导致远程代码执行攻击  
  
虽然该缺陷被标记为“远程代码执行”（RCE）漏洞，但实际的攻击途径是本地的。  
  
正如微软的安全公告所解释的那样，“远程”一词指的是攻击者的位置，而不是代码的部署方式。  
  
要成功利用此漏洞，恶意代码必须在本地计算机上执行。  
  
这意味着攻击者或毫无戒心的受害者需要在本地触发有效载荷，这种技术通常被称为任意代码执行 (ACE)。  
  
CVE-2026-26110 最令人担忧的方面之一是其攻击复杂度低，而且它完全不需要任何提升的权限或用户交互即可实施。  
  
值得注意的是，Windows 预览窗格已被证实是一个攻击途径。这意味着受害者甚至无需双击恶意文档就会受到攻击。  
  
只需选中文件并在预览窗格中查看，就足以触发漏洞利用，使攻击者能够控制本地系统。  
  
幸运的是，微软报告称，尚未发现针对此漏洞的利用代码，也没有已知的在实际环境中被积极利用的案例。  
  
一位匿名研究人员负责任地披露了该漏洞，微软认为未来被利用的可能性“较小”，这给了防御者一个应用更新的关键窗口期。  
  
然而，受影响的软件范围非常广泛，与其他“周二补丁日”重大漏洞的规模相当。受影响的产品包括：  
- Microsoft Office 2016 和 2019（32 位和 64 位版本）  
- 适用于企业的 Microsoft 365 应用（32 位和 64 位版本）  
- Microsoft Office LTSC 2021 和 2024（Windows 和 Mac 版本）  
- 适用于安卓系统的 Microsoft Office  
微软已针对所有受影响的产品发布了官方修复程序。强烈建议网络安全专业人员和IT管理员立即采取行动，保护其环境安全：  
- **应用官方更新：**立即下载并安装 2026 年 3 月 10 日的安全补丁，以更新网络中所有 Windows 和 Mac 版 Office 的安装。  
- **更新移动应用：确保移动用户**直接从 Google Play 商店更新Microsoft Office for Android 应用。  
- **禁用预览窗格：**如果无法立即进行修补，请考虑禁用 Windows 中的文件资源管理器预览窗格，作为一项临时防御措施，以消除最容易受到攻击的途径。  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原始披露 URL 尚未确认，现有链接按来源追溯区分别标注）
