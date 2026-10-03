---
source: "gelusus/wxvl 公众号漏洞文库"
cve: "CVE-2024-43639"
identifier_role: "primary"
primary_identifiers: "CVE-2024-43639"
referenced_identifiers: ""
identifier_status: "unknown"
title: "关键的 Windows漏洞使数百万台服务器面临攻击"
product: "Windows Kerberos KDC Proxy"
record_type: "advisory"
document_type: "安全新闻与范围评估"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
prerequisites: "只涉及配置为Kerberos KDC代理的服务器，HTTPS桥接可达；未给Windows版本/补丁矩阵"
side_effects: "原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/%E7%B3%BB%E7%BB%9F%E5%AE%89%E5%85%A8/Windows/%E5%85%B3%E9%94%AE%E7%9A%84%20Windows%E6%BC%8F%E6%B4%9E%E4%BD%BF%E6%95%B0%E7%99%BE%E4%B8%87%E5%8F%B0%E6%9C%8D%E5%8A%A1%E5%99%A8%E9%9D%A2%E4%B8%B4%E6%94%BB%E5%87%BB.md"
archive_commit: "41940cb0038d09ca5aaddbe5bffb923e423d210f"
source_status: "missing"
source_note: "原始出处待补；仓库归档不等同原始披露"
id: "vw-4e4fecbe26367f98639e2866"
entity_id: "ve-4e4fecbe26367f98639e2866"
schema_version: "1"
---

# 关键的 Windows漏洞使数百万台服务器面临攻击

<!-- vulwiki-editorial-rebuild:system-misc -->
## 条目范围与校订

- 本文对象：Windows Kerberos KDC Proxy
- 文献类型：安全新闻与范围评估
- 版本、权限及部署边界：只涉及配置为Kerberos KDC代理的服务器，HTTPS桥接可达；未给Windows版本/补丁矩阵
- 核验状态：仅重建文本校订；未执行文中代码、PoC 或扫描，未把截图或转载声明记为本站复现

### 具体结论与待核项

以下为原归档的逐项勘误与证据缺口；可由文本确定的问题已在下文订正，仍缺来源的事实保持待核。

1. 正文明确KDC Proxy配置条件但标题数百万Windows服务器放大范围，2,274,340暴露数与1,211,834可能脆弱并非实际漏洞资产数
2. frontmatter缺CVE，正文有清晰43639应补；产品不能泛化所有KDC/所有Windows
3. 把密码协议漏洞写得过泛，缺具体解析根因及原研究；通告性质不补造PoC
4. Censys统计无调查原URL/采样日期/识别条件，不能据此断言实际受影响数量
5. 仅MSRC advisory链接，缺具体修补措施/KB；未公开/未在野需标2024-11时点，HTML样式可去除

### 操作风险

原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响

技术请求、代码与实验方法按原文保留；其中的破坏性动作仅限授权、可恢复的隔离环境。缺失代码、参数或版本事实不猜补。

### 来源追溯

- 原文参考链接（未重新核验）：<https://msrc.microsoft.com/update-guide/en-US/advisory/CVE-2024-43639>
- 原始披露 URL 未确认；既有归档来源标签保留，不能替代原始公告

### 归档技术正文

BaizeSec  白泽安全实验室   2024-11-21 12:55  
  
**一、事件概述**  
  
Kerberos协议最初由麻省理工学院（MIT）在1980年代开发，目的是为了提供一个安全的身份验证机制，特别是在分布式计算环境中。它通过使用密钥分发中心（KDC）和基于凭证的认证机制，确保了用户身份的安全性和网络通信的保密性。从Windows 2000开始，微软在其操作系统中集成了对Kerberos协议的全面支持，使其成为Windows操作系统中实现安全认证和授权的核心机制被广泛使用。近日，微软在其“Patch Tuesday”更新中发布了针对Windows Kerberos认证协议的关键漏洞补丁。该漏洞（CVE-2024-43639）被评为9.8的CVSS严重性评分，表明其对全球数百万服务器构成了极高的安全风险。  
  
**二、技术分析**  
  
此次发现的是Windows Kerberos认证协议中的一个关键漏洞（CVE-2024-43639），允许未经身份验证的攻击者在受影响的系统上执行远程代码。通过利用这个缺陷，攻击者可以向一个易受攻击的系统发送特别制作的请求，利用Windows Kerberos中的密码协议漏洞获得未经授权的访问权限，并执行任意代码。根据Censys的调查，全球有超过两百万（2,274,340）台暴露的Windows服务器实例，其中1,211,834台可能易受攻击。然而，并非所有这些实例都易受攻击，只有配置为Kerberos KDC代理的服务器才会受到影响。  
  
KDC代理协议服务器是一种允许客户端通过HTTPS安全地与KDC服务器进行通信的机制。这种服务器使用Kerberos协议来处理身份验证和授权，其中UDP/TCP 88端口用于Kerberos认证服务和票据授予服务的交换，而TCP 464端口则用于处理Kerberos密码更改。这些协议通常被设计为在可以直接和可靠访问KDC服务器的网络环境中工作，比如在同一局域网内或者通过VPN连接的远程位置。KDC代理协议服务器的应用场景包括远程桌面网关和DirectAccess等服务，它们使得用户即使在外部网络也能通过HTTPS安全地进行Kerberos认证，从而安全地访问内部网络资源。简而言之，KDC代理协议服务器通过HTTPS为Kerberos协议提供了一个安全的通信桥梁，使得用户可以在不同的网络环境下安全地进行身份验证和访问控制。  
  
**三、漏洞详情**  
<table><tbody><tr style="height:17.0000pt;"><td width="81" valign="center" style="padding: 0pt 5.4pt;border-width: 1pt;border-color: windowtext;word-break: break-all;"><p><strong><span style="font-family: 宋体;font-size: 10.5pt;"><span style="font-family:Calibri;">C</span></span></strong><strong><span style="font-family: Calibri;font-size: 10.5pt;">VE ID</span></strong><strong><span style="font-family: Calibri;font-size: 10.5pt;"><o:p></o:p></span></strong></p></td><td width="98" valign="center" style="padding: 0pt 5.4pt;border-width: 1pt;border-color: windowtext;word-break: break-all;"><p><span style="font-family:Calibri;mso-fareast-font-family:宋体;mso-bidi-font-family:&#39;Times New Roman&#39;;font-size:10.5000pt;mso-font-kerning:1.0000pt;">CVE-202</span><span style="font-family:宋体;mso-ascii-font-family:Calibri;mso-hansi-font-family:Calibri;mso-bidi-font-family:&#39;Times New Roman&#39;;font-size:10.5000pt;mso-font-kerning:1.0000pt;"><span style="font-family:Calibri;">4</span></span><span style="font-family:Calibri;mso-fareast-font-family:宋体;mso-bidi-font-family:&#39;Times New Roman&#39;;font-size:10.5000pt;mso-font-kerning:1.0000pt;">-</span><span style="font-family:宋体;mso-ascii-font-family:Calibri;mso-hansi-font-family:Calibri;mso-bidi-font-family:&#39;Times New Roman&#39;;font-size:10.5000pt;mso-font-kerning:1.0000pt;"><span style="font-family:Calibri;">43639</span></span><span style="font-family:Calibri;mso-fareast-font-family:宋体;mso-bidi-font-family:&#39;Times New Roman&#39;;font-size:10.5000pt;mso-font-kerning:1.0000pt;"><o:p></o:p></span></p></td><td width="83" valign="center" style="padding: 0pt 5.4pt;border-width: 1pt;border-color: windowtext;word-break: break-all;"><p><strong><span style="font-family: 宋体;font-size: 10.5pt;">公布时间</span></strong><strong><span style="font-family: Calibri;font-size: 10.5pt;"><o:p></o:p></span></strong></p></td><td width="72" valign="center" style="padding: 0pt 5.4pt;border-width: 1pt;border-color: windowtext;word-break: break-all;"><p><span style="font-family:Calibri;mso-fareast-font-family:宋体;mso-bidi-font-family:&#39;Times New Roman&#39;;font-size:10.5000pt;mso-font-kerning:1.0000pt;">2024-</span><span style="font-family:宋体;mso-ascii-font-family:Calibri;mso-hansi-font-family:Calibri;mso-bidi-font-family:&#39;Times New Roman&#39;;font-size:10.5000pt;mso-font-kerning:1.0000pt;"><span style="font-family:Calibri;">11</span></span><span style="font-family:Calibri;mso-fareast-font-family:宋体;mso-bidi-font-family:&#39;Times New Roman&#39;;font-size:10.5000pt;mso-font-kerning:1.0000pt;">-</span><span style="font-family:宋体;mso-ascii-font-family:Calibri;mso-hansi-font-family:Calibri;mso-bidi-font-family:&#39;Times New Roman&#39;;font-size:10.5000pt;mso-font-kerning:1.0000pt;"><span style="font-family:Calibri;">13</span></span><span style="font-family:Calibri;mso-fareast-font-family:宋体;mso-bidi-font-family:&#39;Times New Roman&#39;;font-size:10.5000pt;mso-font-kerning:1.0000pt;"><o:p></o:p></span></p></td></tr><tr style="height:17.0000pt;"><td width="101" valign="center" style="padding: 0pt 5.4pt;border-left-width: 1pt;border-left-color: windowtext;border-right-width: 1pt;border-right-color: windowtext;border-top: none;border-bottom-width: 1pt;border-bottom-color: windowtext;"><p><strong><span style="font-family:宋体;mso-ascii-font-family:Calibri;mso-hansi-font-family:Calibri;mso-bidi-font-family:&#39;Times New Roman&#39;;mso-ansi-font-weight:bold;font-size:10.5000pt;mso-font-kerning:1.0000pt;">类型</span></strong><strong><span style="font-family:Calibri;mso-fareast-font-family:宋体;mso-bidi-font-family:&#39;Times New Roman&#39;;mso-ansi-font-weight:bold;font-size:10.5000pt;mso-font-kerning:1.0000pt;"><o:p></o:p></span></strong></p></td><td width="118" valign="center" style="padding: 0pt 5.4pt;border-left-width: 1pt;border-left-color: windowtext;border-right-width: 1pt;border-right-color: windowtext;border-top: none;border-bottom-width: 1pt;border-bottom-color: windowtext;"><p><span style="font-family:宋体;mso-ascii-font-family:Calibri;mso-hansi-font-family:Calibri;mso-bidi-font-family:&#39;Times New Roman&#39;;font-size:10.5000pt;mso-font-kerning:1.0000pt;">远程代码执行</span><span style="font-family:Calibri;mso-fareast-font-family:宋体;mso-bidi-font-family:&#39;Times New Roman&#39;;font-size:10.5000pt;mso-font-kerning:1.0000pt;"><o:p></o:p></span></p></td><td width="83" valign="center" style="padding: 0pt 5.4pt;border-left-width: 1pt;border-left-color: windowtext;border-right-width: 1pt;border-right-color: windowtext;border-top: none;border-bottom-width: 1pt;border-bottom-color: windowtext;"><p><strong><span style="font-family: 宋体;font-size: 10.5pt;"><span style="font-family:Calibri;">CVSS</span></span></strong><strong><span style="font-family: Calibri;font-size: 10.5pt;"><o:p></o:p></span></strong></p></td><td width="92" valign="center" style="padding: 0pt 5.4pt;border-left-width: 1pt;border-left-color: windowtext;border-right-width: 1pt;border-right-color: windowtext;border-top: none;border-bottom-width: 1pt;border-bottom-color: windowtext;"><p><span style="font-family:宋体;mso-ascii-font-family:Calibri;mso-hansi-font-family:Calibri;mso-bidi-font-family:&#39;Times New Roman&#39;;font-size:10.5000pt;mso-font-kerning:1.0000pt;"><span style="font-family:Calibri;">9.8</span></span><span style="font-family:Calibri;mso-fareast-font-family:宋体;mso-bidi-font-family:&#39;Times New Roman&#39;;font-size:10.5000pt;mso-font-kerning:1.0000pt;"><o:p></o:p></span></p></td></tr><tr style="height:17.0000pt;"><td width="101" valign="center" style="padding: 0pt 5.4pt;border-left-width: 1pt;border-left-color: windowtext;border-right-width: 1pt;border-right-color: windowtext;border-top: none;border-bottom-width: 1pt;border-bottom-color: windowtext;"><p><strong><span style="font-family:宋体;mso-ascii-font-family:Calibri;mso-hansi-font-family:Calibri;mso-bidi-font-family:&#39;Times New Roman&#39;;mso-ansi-font-weight:bold;font-size:10.5000pt;mso-font-kerning:1.0000pt;">攻击向量</span></strong><strong><span style="font-family:Calibri;mso-fareast-font-family:宋体;mso-bidi-font-family:&#39;Times New Roman&#39;;mso-ansi-font-weight:bold;font-size:10.5000pt;mso-font-kerning:1.0000pt;"><o:p></o:p></span></strong></p></td><td width="118" valign="center" style="padding: 0pt 5.4pt;border-left-width: 1pt;border-left-color: windowtext;border-right-width: 1pt;border-right-color: windowtext;border-top: none;border-bottom-width: 1pt;border-bottom-color: windowtext;"><p><span style="font-family:宋体;mso-ascii-font-family:Calibri;mso-hansi-font-family:Calibri;mso-bidi-font-family:&#39;Times New Roman&#39;;font-size:10.5000pt;mso-font-kerning:1.0000pt;">网络</span><span style="font-family:Calibri;mso-fareast-font-family:宋体;mso-bidi-font-family:&#39;Times New Roman&#39;;font-size:10.5000pt;mso-font-kerning:1.0000pt;"><o:p></o:p></span></p></td><td width="83" valign="center" style="padding: 0pt 5.4pt;border-left-width: 1pt;border-left-color: windowtext;border-right-width: 1pt;border-right-color: windowtext;border-top: none;border-bottom-width: 1pt;border-bottom-color: windowtext;"><p><strong><span style="font-family: 宋体;font-size: 10.5pt;">所需权限</span></strong><strong><span style="font-family: Calibri;font-size: 10.5pt;"><o:p></o:p></span></strong></p></td><td width="92" valign="center" style="padding: 0pt 5.4pt;border-left-width: 1pt;border-left-color: windowtext;border-right-width: 1pt;border-right-color: windowtext;border-top: none;border-bottom-width: 1pt;border-bottom-color: windowtext;"><p><span style="font-family:宋体;mso-ascii-font-family:Calibri;mso-hansi-font-family:Calibri;mso-bidi-font-family:&#39;Times New Roman&#39;;font-size:10.5000pt;mso-font-kerning:1.0000pt;">无</span><span style="font-family:Calibri;mso-fareast-font-family:宋体;mso-bidi-font-family:&#39;Times New Roman&#39;;font-size:10.5000pt;mso-font-kerning:1.0000pt;"><o:p></o:p></span></p></td></tr><tr style="height:17.0000pt;"><td width="101" valign="center" style="padding: 0pt 5.4pt;border-left-width: 1pt;border-left-color: windowtext;border-right-width: 1pt;border-right-color: windowtext;border-top: none;border-bottom-width: 1pt;border-bottom-color: windowtext;"><p><strong><span style="font-family:宋体;mso-ascii-font-family:Calibri;mso-hansi-font-family:Calibri;mso-bidi-font-family:&#39;Times New Roman&#39;;mso-ansi-font-weight:bold;font-size:10.5000pt;mso-font-kerning:1.0000pt;">攻击复杂度</span></strong><strong><span style="font-family:Calibri;mso-fareast-font-family:宋体;mso-bidi-font-family:&#39;Times New Roman&#39;;mso-ansi-font-weight:bold;font-size:10.5000pt;mso-font-kerning:1.0000pt;"><o:p></o:p></span></strong></p></td><td width="118" valign="center" style="padding: 0pt 5.4pt;border-left-width: 1pt;border-left-color: windowtext;border-right-width: 1pt;border-right-color: windowtext;border-top: none;border-bottom-width: 1pt;border-bottom-color: windowtext;"><p><span style="font-family:宋体;mso-ascii-font-family:Calibri;mso-hansi-font-family:Calibri;mso-bidi-font-family:&#39;Times New Roman&#39;;font-size:10.5000pt;mso-font-kerning:1.0000pt;">低</span><span style="font-family:Calibri;mso-fareast-font-family:宋体;mso-bidi-font-family:&#39;Times New Roman&#39;;font-size:10.5000pt;mso-font-kerning:1.0000pt;"><o:p></o:p></span></p></td><td width="83" valign="center" style="padding: 0pt 5.4pt;border-left-width: 1pt;border-left-color: windowtext;border-right-width: 1pt;border-right-color: windowtext;border-top: none;border-bottom-width: 1pt;border-bottom-color: windowtext;"><p><strong><span style="font-family: 宋体;font-size: 10.5pt;">用户交互</span></strong><strong><span style="font-family: Calibri;font-size: 10.5pt;"><o:p></o:p></span></strong></p></td><td width="92" valign="center" style="padding: 0pt 5.4pt;border-left-width: 1pt;border-left-color: windowtext;border-right-width: 1pt;border-right-color: windowtext;border-top: none;border-bottom-width: 1pt;border-bottom-color: windowtext;"><p><span style="font-family:宋体;mso-ascii-font-family:Calibri;mso-hansi-font-family:Calibri;mso-bidi-font-family:&#39;Times New Roman&#39;;font-size:10.5000pt;mso-font-kerning:1.0000pt;">不需要</span><span style="font-family:Calibri;mso-fareast-font-family:宋体;mso-bidi-font-family:&#39;Times New Roman&#39;;font-size:10.5000pt;mso-font-kerning:1.0000pt;"><o:p></o:p></span></p></td></tr><tr style="height:17.0000pt;"><td width="101" valign="center" style="padding: 0pt 5.4pt;border-left-width: 1pt;border-left-color: windowtext;border-right-width: 1pt;border-right-color: windowtext;border-top: none;border-bottom-width: 1pt;border-bottom-color: windowtext;"><p><strong><span style="font-family:宋体;mso-ascii-font-family:Calibri;mso-hansi-font-family:Calibri;mso-bidi-font-family:&#39;Times New Roman&#39;;mso-ansi-font-weight:bold;font-size:10.5000pt;mso-font-kerning:1.0000pt;"><span style="font-family:Calibri;">PoC</span></span></strong><strong><span style="font-family:Calibri;mso-fareast-font-family:宋体;mso-bidi-font-family:&#39;Times New Roman&#39;;mso-ansi-font-weight:bold;font-size:10.5000pt;mso-font-kerning:1.0000pt;">/EXP</span></strong><strong><span style="font-family:Calibri;mso-fareast-font-family:宋体;mso-bidi-font-family:&#39;Times New Roman&#39;;mso-ansi-font-weight:bold;font-size:10.5000pt;mso-font-kerning:1.0000pt;"><o:p></o:p></span></strong></p></td><td width="118" valign="center" style="padding: 0pt 5.4pt;border-left-width: 1pt;border-left-color: windowtext;border-right-width: 1pt;border-right-color: windowtext;border-top: none;border-bottom-width: 1pt;border-bottom-color: windowtext;"><p><span style="font-family:宋体;mso-ascii-font-family:Calibri;mso-hansi-font-family:Calibri;mso-bidi-font-family:&#39;Times New Roman&#39;;font-size:10.5000pt;mso-font-kerning:1.0000pt;">未公开</span><span style="font-family:Calibri;mso-fareast-font-family:宋体;mso-bidi-font-family:&#39;Times New Roman&#39;;font-size:10.5000pt;mso-font-kerning:1.0000pt;"><o:p></o:p></span></p></td><td width="83" valign="center" style="padding: 0pt 5.4pt;border-left-width: 1pt;border-left-color: windowtext;border-right-width: 1pt;border-right-color: windowtext;border-top: none;border-bottom-width: 1pt;border-bottom-color: windowtext;"><p><strong><span style="font-family: 宋体;font-size: 10.5pt;">在野利用</span></strong><strong><span style="font-family: Calibri;font-size: 10.5pt;"><o:p></o:p></span></strong></p></td><td width="92" valign="center" style="padding: 0pt 5.4pt;border-left-width: 1pt;border-left-color: windowtext;border-right-width: 1pt;border-right-color: windowtext;border-top: none;border-bottom-width: 1pt;border-bottom-color: windowtext;word-break: break-all;"><p><span style="font-family:宋体;mso-ascii-font-family:Calibri;mso-hansi-font-family:Calibri;mso-bidi-font-family:&#39;Times New Roman&#39;;font-size:10.5000pt;mso-font-kerning:1.0000pt;">未发现</span><span style="font-family:宋体;mso-ascii-font-family:Calibri;mso-hansi-font-family:Calibri;mso-bidi-font-family:&#39;Times New Roman&#39;;font-size:10.5000pt;mso-font-kerning:1.0000pt;"><o:p></o:p></span></p></td></tr></tbody></table>  


参考链接：  
  
https://msrc.microsoft.com/update-guide/en-US/advisory/CVE-2024-43639  
  
  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原始披露 URL 尚未确认，现有链接按来源追溯区分别标注）
