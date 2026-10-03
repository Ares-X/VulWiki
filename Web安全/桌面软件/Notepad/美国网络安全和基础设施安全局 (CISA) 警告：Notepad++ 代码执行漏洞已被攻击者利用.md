---
source: "gelusus/wxvl 公众号漏洞文库"
cve: "CVE-2025-15556"
identifier_role: "primary"
primary_identifiers: "CVE-2025-15556"
referenced_identifiers: ""
identifier_status: "unknown"
title: "美国网络安全和基础设施安全局 (CISA) 警告：Notepad++ 代码执行漏洞已被攻击者利用"
product: "Notepad++ WinGUp更新器"
record_type: "advisory"
document_type: "在野利用与更新器漏洞新闻"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
prerequisites: "攻击者能拦截/重定向更新链路，受害者执行更新；文称8.8.9修复、主要8.6–8.8.8"
side_effects: "原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E6%A1%8C%E9%9D%A2%E8%BD%AF%E4%BB%B6/Notepad/%E7%BE%8E%E5%9B%BD%E7%BD%91%E7%BB%9C%E5%AE%89%E5%85%A8%E5%92%8C%E5%9F%BA%E7%A1%80%E8%AE%BE%E6%96%BD%E5%AE%89%E5%85%A8%E5%B1%80%20%28CISA%29%20%E8%AD%A6%E5%91%8A%EF%BC%9ANotepad%2B%2B%20%E4%BB%A3%E7%A0%81%E6%89%A7%E8%A1%8C%E6%BC%8F%E6%B4%9E%E5%B7%B2%E8%A2%AB%E6%94%BB%E5%87%BB%E8%80%85%E5%88%A9%E7%94%A8.md"
archive_commit: "41940cb0038d09ca5aaddbe5bffb923e423d210f"
source_status: "missing"
source_note: "原始出处待补；仓库归档不等同原始披露"
id: "vw-e6a8d9c9598d1235961e2bc1"
entity_id: "ve-e6a8d9c9598d1235961e2bc1"
schema_version: "1"
---

# 美国网络安全和基础设施安全局 (CISA) 警告：Notepad++ 代码执行漏洞已被攻击者利用

<!-- vulwiki-editorial-rebuild:system-misc -->
## 条目范围与校订

- 本文对象：Notepad++ WinGUp更新器
- 文献类型：在野利用与更新器漏洞新闻
- 版本、权限及部署边界：攻击者能拦截/重定向更新链路，受害者执行更新；文称8.8.9修复、主要8.6–8.8.8
- 核验状态：仅重建文本校订；未执行文中代码、PoC 或扫描，未把截图或转载声明记为本站复现

### 具体结论与待核项

以下为原归档的逐项勘误与证据缺口；可由文本确定的问题已在下文订正，仍缺来源的事实保持待核。

1. 无用户交互却排除例行更新这一限定需清楚，签名验证缺失也不自动证明任意网络中间人能突破TLS，链路控制前提未说明
2. 禁用自动更新仍有风险与建议临时禁用WinGUp要区分手动旧更新器触发和完全不运行更新器；不能混为无条件持续入口
3. BOD22-01误称云集成服务约束，适用FCEB而非所有组织；KEV日期/期限和在野状态无CISA直接链接
4. 只有厂商域名字符串，没有官方修复/社区/NVD/CISA可追溯页；所有补丁前版本范围过泛
5. 新版本安装不等排除既有供应链感染；需把预防完整性与事件响应分开，CVSS待定保留

### 操作风险

原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响

技术请求、代码与实验方法按原文保留；其中的破坏性动作仅限授权、可恢复的隔离环境。缺失代码、参数或版本事实不猜补。

### 来源追溯

- 原始披露 URL 未确认；既有归档来源标签保留，不能替代原始公告

### 归档技术正文

原创 网络安全9527
                    网络安全9527  安全圈的那点事儿   2026-02-13 05:39  
  
CISA 已将 CVE-2025-15556 添加到其已知利用漏洞 (KEV) 目录中，重点指出 Notepad++（一款在开发人员和 IT 专业人员中广泛使用的开源文本编辑器）中存在一个严重的代码执行漏洞，该漏洞正被积极利用。  
  
该漏洞于 2026 年 2 月 12 日添加，联邦民事行政部门 (FCEB) 的修补截止日期为 2026 年 3 月 5 日。该漏洞源于 WinGUp 更新程序未能对下载的代码执行完整性检查。  
  
攻击者可以拦截或重定向更新流量，诱骗用户安装恶意载荷，这些恶意载荷可以以用户级权限执行任意代码。  
  
该漏洞被归类为 CWE-494（未经完整性检查下载代码），在实际攻击中构成严重风险。攻击者可以利用中间人攻击 (MitM) 技术在不安全的网络上投放篡改过的安装程序，从而可能部署勒索软件、恶意软件投放器或持久性后门。  
  
虽然与勒索软件攻击的直接联系尚不清楚，但该漏洞的简单性（除了例行更新外，无需身份验证或用户交互）使其成为供应链式入侵的理想选择。  
  
Notepad++ 在 Windows 终端上的普及加剧了风险，尤其是在手动更新很常见的企业环境中。  
  
<table><thead style="box-sizing: border-box;border-bottom-width: 3px;border-bottom-style: solid;border-bottom-color: currentcolor;"><tr style="box-sizing: border-box;"><th style="box-sizing: border-box;padding: 2px 8px;text-align: left;border: 1px solid;word-break: break-word;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;">CVE ID</font></font></th><th style="box-sizing: border-box;padding: 2px 8px;text-align: left;border: 1px solid;word-break: break-word;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;">CVSS评分</font></font></th><th style="box-sizing: border-box;padding: 2px 8px;text-align: left;border: 1px solid;word-break: break-word;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;">描述</font></font></th></tr></thead><tbody style="box-sizing: border-box;"><tr style="box-sizing: border-box;"><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;">CVE-2025-15556</font></font></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;">待定（NVD待定）</font></font></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;">Notepad++ WinGUp 更新程序下载的代码未经过完整性验证，攻击者可以利用恶意安装程序重定向流量并执行任意代码。受影响的版本为补丁发布之前的版本；影响 Windows 用户。</font></font></td></tr></tbody></table>  


Notepad++ 开发人员已在 8.8.9 及更高版本中解决了此问题，详情请参阅其官方说明和社区论坛。该补丁强制对更新包进行加密验证，从而阻止拦截尝试。  
  
但是，如果禁用自动更新（为了保持稳定性，通常采用这种配置），则使用易受攻击版本（主要是 8.6 到 8.8.8）的用户仍然面临风险。  
  
CISA 敦促立即应用供应商补丁，遵守云集成服务的约束性操作指令 (BOD) 22-01，或者如果缓解措施不可行，则停止使用该产品。  
  
组织应使用 Microsoft Defender 或端点检测解决方案等工具扫描端点，查找过时的 Notepad++ 安装，暂时禁用 WinGUp，并强制执行网络分段以阻止中间人攻击。  
  
启用更新通知，并使用 notepad-plus-plus.org 提供的官方 SHA-256 哈希值验证下载。  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原始披露 URL 尚未确认，现有链接按来源追溯区分别标注）
