---
source: "gelusus/wxvl 公众号漏洞文库"
cve: "CVE-2026-0877;CVE-2026-0878;CVE-2026-0879;CVE-2026-0880;CVE-2026-0881;CVE-2026-0882;CVE-2026-0891;CVE-2026-0892"
identifier_role: "primary"
primary_identifiers: "CVE-2026-0877;CVE-2026-0878;CVE-2026-0879;CVE-2026-0880;CVE-2026-0881;CVE-2026-0882;CVE-2026-0891;CVE-2026-0892"
referenced_identifiers: ""
identifier_status: "unknown"
title: "Firefox 147发布时修复了16个允许任意代码执行的漏洞"
product: "Firefox/Firefox ESR；Thunderbird"
record_type: "roundup"
document_type: "多漏洞补丁摘要"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
prerequisites: "文称Firefox147/ESR140.7、Thunderbird对应版本；具体组件前置条件不详"
side_effects: "原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E6%A1%8C%E9%9D%A2%E8%BD%AF%E4%BB%B6/Firefox/Firefox%20147%E5%8F%91%E5%B8%83%E6%97%B6%E4%BF%AE%E5%A4%8D%E4%BA%8616%E4%B8%AA%E5%85%81%E8%AE%B8%E4%BB%BB%E6%84%8F%E4%BB%A3%E7%A0%81%E6%89%A7%E8%A1%8C%E7%9A%84%E6%BC%8F%E6%B4%9E.md"
archive_commit: "41940cb0038d09ca5aaddbe5bffb923e423d210f"
source_status: "missing"
source_note: "原始出处待补；仓库归档不等同原始披露"
id: "vw-899dd8c1208112c9b1db8831"
entity_id: "ve-899dd8c1208112c9b1db8831"
schema_version: "1"
---

# Firefox 147发布时修复了16个允许任意代码执行的漏洞

<!-- vulwiki-editorial-rebuild:system-misc -->
## 条目范围与校订

- 本文对象：Firefox/Firefox ESR；Thunderbird
- 文献类型：多漏洞补丁摘要
- 版本、权限及部署边界：文称Firefox147/ESR140.7、Thunderbird对应版本；具体组件前置条件不详
- 核验状态：仅重建文本校订；未执行文中代码、PoC 或扫描，未把截图或转载声明记为本站复现

### 具体结论与待核项

以下为原归档的逐项勘误与证据缺口；可由文本确定的问题已在下文订正，仍缺来源的事实保持待核。

1. 标题16个任意代码执行过度，正文含信息泄露/DoS/UI欺骗；六高危全称沙箱逃逸也需逐项公告证据
2. 元数据为空，明确编号仅八项（含范围展开），其余不能猜补；漏洞集合与CVE条目数亦需区分
3. Firefox与Thunderbird通道不能统一套全部漏洞范围，ESR/平台及脚本默认设置需各自矩阵
4. 脚注4/14/18/20/1/9残留却无文献表，官方下载页也没URL，来源不可追溯
5. Linux长期目录Bug259356不一定是安全漏洞；ETP/WDAC/关扩展为一般措施不证明可缓解这些CVE

### 操作风险

原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响

技术请求、代码与实验方法按原文保留；其中的破坏性动作仅限授权、可恢复的隔离环境。缺失代码、参数或版本事实不猜补。

### 来源追溯

- 原始披露 URL 未确认；既有归档来源标签保留，不能替代原始公告

### 归档技术正文

 网安百色   2026-01-17 11:08  
  
![](../../.resource/remote/02ca733ea88d324542d3674afd88749701c249c9997be3696a3c7a56d060a8d0.jpg "")  
  
Firefox 147于2026年1月12日发布，修复了16个安全漏洞，其中包括6个高危漏洞，主要涉及沙箱逃逸和内存安全问题，建议所有用户立即更新以防止潜在的任意代码执行攻击  
。  
## 一、漏洞概览与核心修复  
### 1. 漏洞统计与严重性分布  
<table><thead><tr style="-webkit-font-smoothing: antialiased;"><th style="-webkit-font-smoothing: antialiased;"><span style="-webkit-font-smoothing: antialiased;"><span leaf="">严重程度</span></span></th><th style="-webkit-font-smoothing: antialiased;"><span style="-webkit-font-smoothing: antialiased;"><span leaf="">漏洞数量</span></span></th><th style="-webkit-font-smoothing: antialiased;"><span style="-webkit-font-smoothing: antialiased;"><span leaf="">主要类型</span></span></th></tr></thead><tbody><tr style="-webkit-font-smoothing: antialiased;"><td style="-webkit-font-smoothing: antialiased;"><span style="-webkit-font-smoothing: antialiased;"><span leaf="">高危 (High)</span></span></td><td style="-webkit-font-smoothing: antialiased;"><span style="-webkit-font-smoothing: antialiased;"><span leaf="">6</span></span></td><td style="-webkit-font-smoothing: antialiased;"><span style="-webkit-font-smoothing: antialiased;"><span leaf="">沙箱逃逸、内存破坏、DOM绕过</span></span></td></tr><tr style="-webkit-font-smoothing: antialiased;"><td style="-webkit-font-smoothing: antialiased;"><span style="-webkit-font-smoothing: antialiased;"><span leaf="">中危 (Moderate)</span></span></td><td style="-webkit-font-smoothing: antialiased;"><span style="-webkit-font-smoothing: antialiased;"><span leaf="">7</span></span></td><td style="-webkit-font-smoothing: antialiased;"><span style="-webkit-font-smoothing: antialiased;"><span leaf="">信息泄露、释放后重用（Use-after-free）</span></span></td></tr><tr style="-webkit-font-smoothing: antialiased;"><td style="-webkit-font-smoothing: antialiased;"><span style="-webkit-font-smoothing: antialiased;"><span leaf="">低危 (Low)</span></span></td><td style="-webkit-font-smoothing: antialiased;"><span style="-webkit-font-smoothing: antialiased;"><span leaf="">3</span></span></td><td style="-webkit-font-smoothing: antialiased;"><span style="-webkit-font-smoothing: antialiased;"><span leaf="">拒绝服务、界面欺骗</span></span></td></tr></tbody></table>  


此次更新主要修复了六个高影响漏洞（CVE-2026-0877至CVE-2026-0882），这些漏洞可能被利用来实现沙箱逃逸，从而在用户的设备上执行任意代码。此外，还修复了包括CVE-2026-0891和CVE-2026-0892在内的多个内存安全漏洞  
4  
。  
### 2. 关键高危漏洞技术细节  
- **CVE-2026-0877**  
：DOM安全组件中的缓解措施绕过漏洞，允许攻击者绕过同源策略限制  
- **CVE-2026-0878至CVE-2026-0880**  
：Graphics和CanvasWebGL组件中的边界条件和整数溢出漏洞，可导致沙箱逃逸  
- **CVE-2026-0881**  
：消息系统组件中的沙箱逃逸漏洞，可能被用于进程间通信攻击  
- **CVE-2026-0882**  
：IPC（进程间通信）组件中的释放后重用（Use-after-free）漏洞  
特别值得注意的是，**CVE-2026-0891和CVE-2026-0892**  
是两个已被证实存在内存破坏问题的漏洞，Mozilla的fuzzing团队已观察到内存损坏的迹象，表明这些漏洞可能被利用。这些漏洞主要影响JavaScript引擎和图形渲染组件  
14  
。  
## 二、受影响产品与修复范围  
### 1. 受影响产品矩阵  
<table><thead><tr style="-webkit-font-smoothing: antialiased;"><th style="-webkit-font-smoothing: antialiased;"><span data-spm-anchor-id="5176.28103460.0.i12.96a07551unFSll" style="-webkit-font-smoothing: antialiased;"><span leaf="">产品</span></span></th><th style="-webkit-font-smoothing: antialiased;"><span style="-webkit-font-smoothing: antialiased;"><span leaf="">受影响版本</span></span></th><th style="-webkit-font-smoothing: antialiased;"><span style="-webkit-font-smoothing: antialiased;"><span leaf="">修复版本</span></span></th></tr></thead><tbody><tr style="-webkit-font-smoothing: antialiased;"><td style="-webkit-font-smoothing: antialiased;"><span style="-webkit-font-smoothing: antialiased;"><span leaf="">Firefox</span></span></td><td style="-webkit-font-smoothing: antialiased;"><span style="-webkit-font-smoothing: antialiased;"><span leaf="">146及更早版本</span></span></td><td style="-webkit-font-smoothing: antialiased;"><span style="-webkit-font-smoothing: antialiased;"><span leaf="">147</span></span></td></tr><tr style="-webkit-font-smoothing: antialiased;"><td style="-webkit-font-smoothing: antialiased;"><span style="-webkit-font-smoothing: antialiased;"><span leaf="">Firefox ESR</span></span></td><td style="-webkit-font-smoothing: antialiased;"><span style="-webkit-font-smoothing: antialiased;"><span leaf="">140.6及更早版本</span></span></td><td style="-webkit-font-smoothing: antialiased;"><span style="-webkit-font-smoothing: antialiased;"><span leaf="">140.7</span></span></td></tr><tr style="-webkit-font-smoothing: antialiased;"><td style="-webkit-font-smoothing: antialiased;"><span style="-webkit-font-smoothing: antialiased;"><span leaf="">Thunderbird</span></span></td><td style="-webkit-font-smoothing: antialiased;"><span style="-webkit-font-smoothing: antialiased;"><span leaf="">146及更早版本</span></span></td><td style="-webkit-font-smoothing: antialiased;"><span style="-webkit-font-smoothing: antialiased;"><span leaf="">147</span></span></td></tr><tr style="-webkit-font-smoothing: antialiased;"><td style="-webkit-font-smoothing: antialiased;"><span style="-webkit-font-smoothing: antialiased;"><span leaf="">Thunderbird ESR</span></span></td><td style="-webkit-font-smoothing: antialiased;"><span style="-webkit-font-smoothing: antialiased;"><span leaf="">140.6及更早版本</span></span></td><td style="-webkit-font-smoothing: antialiased;"><span style="-webkit-font-smoothing: antialiased;"><span leaf="">140.7</span></span></td></tr></tbody></table>

### 2. 漏洞发现来源  
  
此次修复的漏洞主要通过以下渠道发现：  
- **外部研究人员**  
：Oskar L.报告了3个高危沙箱逃逸漏洞  
- **Mozilla fuzzing团队**  
：通过自动化测试发现了内存安全漏洞  
- **社区报告**  
：Andrew McCreight、Randell Jesup等安全研究员提交了多个漏洞  
## 三、技术背景与安全机制  
  
Firefox采用多进程架构和沙箱机制来隔离不同组件，防止恶意代码访问系统资源。然而，此次修复的多个“沙箱逃逸”（Sandbox Escape）漏洞表明，攻击者可能通过精心构造的网页内容，利用这些漏洞突破沙箱的隔离限制，从而在用户的设备上执行任意代码。  
  
沙箱逃逸通常涉及利用浏览器引擎中的内存破坏漏洞。例如，通过JavaScript触发内存错误，攻击者可能获得在内存中执行任意代码的能力，进而完全控制浏览器进程，甚至可能提升权限控制整个系统  
14  
。  
## 四、更新建议与最佳实践  
### 1. 立即更新方案  
- **普通用户**  
：通过"帮助→关于Firefox"检查并安装更新，或访问  
官方下载页面  
  
- **企业环境**  
：通过组策略部署更新，使用policies.json配置自动更新策略  
- **Linux用户**  
：注意，Firefox 147 版本也修复了自2003年起报告的、与Linux系统文件目录相关的长期问题（Bug 259356），该问题存在已超过20年  
18  
20  
。  
### 2. 临时缓解措施  
- 禁用不必要的浏览器扩展，特别是那些需要高级权限的扩展  
- 避免访问不可信网站，特别是包含复杂WebGL内容的站点  
- 不要下载和运行来源不明的文件  
### 3. 企业安全策略建议  
- **实施应用控制**  
：使用如Windows Defender Application Control (WDAC)等工具，仅允许执行经过签名验证的代码，阻止未经授权的脚本和可执行文件。  
- **启用强化跟踪保护**  
：在Firefox中启用“增强跟踪保护”(ETP)，该功能在“严格”模式下会默认阻止许多可能用于攻击的第三方内容  
1  
9  
。  
- **定期安全审计**  
：检查浏览器扩展和用户配置文件，确保没有异常活动  
本公众号所载文章为本公众号原创或根据网络搜索下载编辑整理，文章版权归原作者所有，仅供读者学习、参考，禁止用于商业用途。因转载众多，无法找到真正来源，如标错来源，或对于文中所使用的图片、文字、链接中所包含的软件/资料等，如有侵权，请跟我们联系删除，谢谢！  
  
![图片](../../.resource/remote/cc9dd7fb5b24fc27ce16bb1e9985b3b85c989e00551dbfad66f86d1e7499d3f3.webp "")  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原始披露 URL 尚未确认，现有链接按来源追溯区分别标注）
