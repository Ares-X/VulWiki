---
source: "gelusus/wxvl 公众号漏洞文库"
cve: "CVE-2025-33067"
identifier_role: "primary"
primary_identifiers: "CVE-2025-33067"
referenced_identifiers: ""
identifier_status: "unknown"
title: "Windows 任务计划程序允许攻击者提升权限漏洞"
product: "Windows Task Scheduler"
record_type: "advisory"
document_type: "Windows安全通告"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
prerequisites: "本地AV:L/PR:N向量宣称，具体调用/访问条件未披露；2025-06更新"
side_effects: "原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%85%B6%E4%BB%96%E8%BD%AF%E4%BB%B6/%E6%9D%82%E9%A1%B9/Windows%20%E4%BB%BB%E5%8A%A1%E8%AE%A1%E5%88%92%E7%A8%8B%E5%BA%8F%E5%85%81%E8%AE%B8%E6%94%BB%E5%87%BB%E8%80%85%E6%8F%90%E5%8D%87%E6%9D%83%E9%99%90%E6%BC%8F%E6%B4%9E.md"
archive_commit: "41940cb0038d09ca5aaddbe5bffb923e423d210f"
source_status: "missing"
source_note: "原始出处待补；仓库归档不等同原始披露"
id: "vw-0b3b0ad608485645feeb03d6"
entity_id: "ve-0b3b0ad608485645feeb03d6"
schema_version: "1"
---

# Windows 任务计划程序允许攻击者提升权限漏洞

<!-- vulwiki-editorial-rebuild:system-misc -->
## 条目范围与校订

- 本文对象：Windows Task Scheduler
- 文献类型：Windows安全通告
- 版本、权限及部署边界：本地AV:L/PR:N向量宣称，具体调用/访问条件未披露；2025-06更新
- 核验状态：仅重建文本校订；未执行文中代码、PoC 或扫描，未把截图或转载声明记为本站复现

### 具体结论与待核项

以下为原归档的逐项勘误与证据缺口；可由文本确定的问题已在下文订正，仍缺来源的事实保持待核。

1. 将TaskScheduler直接称Windows内核组件缺技术定位，不能据提权结果推内核内存漏洞
2. Windows10原始版本写1607但后面10240实际另列；22H2/23H2共给22631 build忽略22621；27配置无完整可追溯清单
3. 全部KB/build、发现者/可利用性评级均无MSRC链接，需逐分支核验；8.4CVSS高与微软Important是不同尺度
4. PR:N不等于能从网络匿名触发，文后本地访问应前置；低利用可能性不自动等于没有在野，需独立状态字段

### 操作风险

原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响

技术请求、代码与实验方法按原文保留；其中的破坏性动作仅限授权、可恢复的隔离环境。缺失代码、参数或版本事实不猜补。

### 来源追溯

- 原始披露 URL 未确认；既有归档来源标签保留，不能替代原始公告

### 归档技术正文

 网安百色   2025-06-13 11:30  
  
Windows Task Scheduler 中存在一个重大安全漏洞，使得攻击者能够将其权限升级到 SYSTEM 级别访问权限，而无需初始管理权限。  
  
此特权提升漏洞被指定为 CVE-2025-33067，它影响多个版本的 Windows作系统，并已被分配为“重要”严重性评级，CVSS 评分为 8.4。  
  
该漏洞源于 Windows 内核的任务计划组件中权限管理不当，使未经授权的本地攻击者能够获得完整的系统控制权。  
  
Microsoft 于 2025 年 6 月 10 日发布了全面的安全更新，解决了所有受支持的 Windows 平台（从旧版 Windows 10 安装到最新的 Windows Server 2025 部署）中的缺陷。  
## Windows Task Scheduler 漏洞  
  
该漏洞被归类为 Improper Privilege Management，表示 Windows Task Scheduler 处理计划任务权限的方式存在严重缺陷。  
  
根据 Microsoft 的安全公告，攻击媒介完全是本地的 （AV：L），复杂度低 （AC：L），不需要事先权限 （PR：N），也不需要用户交互 （UI：N）。  
  
这种组合使漏洞特别危险，因为一旦攻击者获得对系统的初始访问权限，它就会为权限提升提供直接途径。  
  
CVSS 向量字符串 CVSS：3.1 表示机密性、完整性和可用性的最大影响评级，所有评级均为“高”。  
  
该漏洞允许攻击者利用权限处理缺陷，该漏洞允许在特定条件下与某些计划任务进行交互，最终导致 SYSTEM 权限，这是 Windows 环境中的最高访问级别。  
  
安全研究员 Alexander Pudwill 因通过协调披露协议发现并负责任地披露此漏洞而受到赞誉。  
  
<table><tbody><tr style="box-sizing: border-box;"><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;"><strong msttexthash="14330498" msthash="71" style="box-sizing: border-box;font-weight: bold;"><span leaf="">风险因素</span></strong></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;"><strong msttexthash="3259074" msthash="72" style="box-sizing: border-box;font-weight: bold;"><span leaf="">详</span></strong></td></tr><tr style="box-sizing: border-box;"><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;"><section><span leaf="">受影响的产品</span></section></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;"><section><span leaf="">– Windows 10（版本 1607/1809/21H2/22H2）- Windows 11 （22H2/23H2/24H2）- Windows Server 2016-2025- 服务器核心安装 - ARM64/x64/32 位架构</span></section></td></tr><tr style="box-sizing: border-box;"><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;"><section><span leaf="">冲击</span></section></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;"><section><span leaf="">权限提升到 SYSTEM 级别</span></section></td></tr><tr style="box-sizing: border-box;"><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;"><section><span leaf="">利用先决条件</span></section></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;"><section><span leaf="">– 本地系统访问 （AV：L）- 无需事先权限 （PR：N）- 无需用户交互 （UI：N）- 低攻击复杂性 （AC：L）- Windows 任务计划程序组件交互</span></section></td></tr><tr style="box-sizing: border-box;"><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;"><section><span leaf="">CVSS 3.1 分数</span></section></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;"><section><span leaf="">8.4 （重要）</span></section></td></tr></tbody></table>

## 受影响的系统和安全更新  
  
Microsoft 的安全响应涵盖广泛的 Windows 平台，在 27 种不同的 Windows 配置中同时发布安全更新。  
  
受影响的系统包括从原始版本（版本 1607）到当前 22H2 版本的 Windows 10 版本、所有 Windows 11 版本，包括最新的 24H2，以及从 Windows Server 2016 到最新的 Windows Server 2025 的服务器平台。  
  
关键安全更新包包括适用于 Windows Server 2016 和 Windows 10 版本 1607 系统（内部版本 10.0.14393.8148）的KB5061010、适用于原始 Windows 10 安装的KB5060998（内部版本 10.0.10240.21034）以及适用于 Windows Server 2025 和 Windows 11 版本 24H2（内部版本 10.0.26100.4349/10.0.26100.4270）的 KB5060842/KB5060841。  
  
Windows 11 版本 23H2 和 22H2 系统需要 KB5060999（内部版本 10.0.22631.5472），而 Windows 10 版本 22H2 和 21H2 安装需要KB5060533（内部版本 10.0.19045.5965 和 10.0.19044.5965，分别为）。  
  
组织应优先在所有 Windows 系统中立即部署 2025 年 6 月 10 日的安全更新。  
  
该漏洞的“利用可能性较小”评估提供了一些保证，因为 Microsoft 表示，虽然该漏洞在技术上是可利用的，但尚未在野外观察到主动利用尝试。  
  
应关注具有高价值数据或可能不受信任的用户可访问的系统，因为本地攻击媒介通常需要通过其他方式（如网络钓鱼、物理访问或利用其他漏洞）进行初始系统访问。  
  
**免责声明**  
：  
  
本公众号所载文章为本公众号原创或根据网络搜索下载编辑整理，文章版权归原作者所有，仅供读者学习、参考，禁止用于商业用途。因转载众多，无法找到真正来源，如标错来源，或对于文中所使用的图片、文字、链接中所包含的软件/资料等，如有侵权，请跟我们联系删除，谢谢！  
  
![图片](https://mmbiz.qpic.cn/mmbiz_jpg/1QIbxKfhZo5lNbibXUkeIxDGJmD2Md5vKicbNtIkdNvibicL87FjAOqGicuxcgBuRjjolLcGDOnfhMdykXibWuH6DV1g/640?wx_fmt=other&from=appmsg&wxfrom=5&wx_lazy=1&wx_co=1&tp=webp "")  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原始披露 URL 尚未确认，现有链接按来源追溯区分别标注）
