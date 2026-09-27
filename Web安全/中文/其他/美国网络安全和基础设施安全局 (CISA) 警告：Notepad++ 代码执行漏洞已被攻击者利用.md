---
cve: "CVE-2025-15556"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  美国网络安全和基础设施安全局 (CISA) 警告：Notepad++ 代码执行漏洞已被攻击者利用  
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

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
