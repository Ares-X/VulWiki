---
source: "gelusus/wxvl 公众号漏洞文库"
cve: "CVE-2023-23397;CVE-2023-24880;CVE-2023-23415;CVE-2023-23392;CVE-2023-23416;CVE-2022-43552;CVE-2022-23257;CVE-2022-23825;CVE-2022-23816"
identifier_role: "reference"
primary_identifiers: "CVE-2023-23397; CVE-2023-24880; CVE-2023-23415; CVE-2023-23392; CVE-2023-23416; CVE-2022-43552; CVE-2022-23257; CVE-2022-23825"
referenced_identifiers: "CVE-2022-23816"
identifier_status: "unknown"
title: "微软Outlook和Web标记功能的两个高危漏洞已被大肆利用"
product: "Microsoft Outlook、SmartScreen及Windows组件"
record_type: "roundup"
document_type: "月度补丁多漏洞新闻"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
prerequisites: "2023-03更新；Outlook自动处理邮件，其他组件各自条件未完整给出"
side_effects: "原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%85%B6%E4%BB%96%E8%BD%AF%E4%BB%B6/%E6%9D%82%E9%A1%B9/%21%E5%BE%AE%E8%BD%AFOutlook%E5%92%8CWeb%E6%A0%87%E8%AE%B0%E5%8A%9F%E8%83%BD%E7%9A%84%E4%B8%A4%E4%B8%AA%E9%AB%98%E5%8D%B1%E6%BC%8F%E6%B4%9E%E5%B7%B2%E8%A2%AB%E5%A4%A7%E8%82%86%E5%88%A9%E7%94%A8.md"
archive_commit: "41940cb0038d09ca5aaddbe5bffb923e423d210f"
source_status: "missing"
source_note: "原始出处待补；仓库归档不等同原始披露"
id: "vw-9cc54428aa66de1e03a31f3c"
entity_id: "ve-9cc54428aa66de1e03a31f3c"
schema_version: "1"
---

## 2026-10-03 编号核验

CVE-2022-23816 已由 CNA 标记为未使用并撤销。本次仅将这一编号移入历史引用，保留本篇其他八个主编号；下文关于该编号获得补丁的说法仍作为原文记录，不再作为有效漏洞映射。


# 微软Outlook和Web标记功能的两个高危漏洞已被大肆利用

<!-- vulwiki-editorial-rebuild:system-misc -->
## 条目范围与校订

- 本文对象：Microsoft Outlook、SmartScreen及Windows组件
- 文献类型：月度补丁多漏洞新闻
- 版本、权限及部署边界：2023-03更新；Outlook自动处理邮件，其他组件各自条件未完整给出
- 核验状态：仅重建文本校订；未执行文中代码、PoC 或扫描，未把截图或转载声明记为本站复现

### 具体结论与待核项

以下为原归档的逐项勘误与证据缺口；可由文本确定的问题已在下文订正，仍缺来源的事实保持待核。

1. 元数据只23397但正文含九项更新及未编号EoP，需多实体，旧四项是此次修订而非全新漏洞
2. Outlook在客户端处理恶意邮件触发却称电子邮件服务器端触发，明确技术层级错误；Net-NLMv2笔误
3. 23415省略原始套接字应用监听条件，23392省略HTTP3/I/O缓冲，范围因省略而扩大
4. Net-NTLMv2挑战响应不等于直接明文或密码哈希，冒充还需中继/破解条件
5. 74/85及6/9统计已解释口径不同，保留该差异勿当必然错误；24/72小时是厂商建议非统一标准
6. 微软具体KB/公告缺失，保留ZDI/Automox/媒体源，关联桌面178简报但保留额外更新内容

### 操作风险

原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响

技术请求、代码与实验方法按原文保留；其中的破坏性动作仅限授权、可恢复的隔离环境。缺失代码、参数或版本事实不猜补。

### 来源追溯

- 原文参考链接（未重新核验）：<https://www.darkreading.com/vulnerabilities-threats/microsoft-zero-day-bugs-security-feature-bypass>
- 原文参考链接（未重新核验）：<https://www.automox.com/blog/patch-tuesday-march-2023>
- 原文参考链接（未重新核验）：<https://www.zerodayinitiative.com/blog/2023/3/14/the-march-2023-security-update-review>
- 原始披露 URL 未确认；既有归档来源标签保留，不能替代原始公告

### 归档技术正文

 网络安全应急技术国家工程中心   2023-03-17 14:44  
  
微软在本月的补丁星期二发布延续了自2022年6月以来修复零日漏洞的趋势。3月14日的补丁星期二共修复了85个漏洞，其中9个是关键漏洞。其中两个被积极利用的零日漏洞尤其显眼，一个（CVE-2023-23397）在几乎无处不在的Outlook应用程序中，允许攻击者在窃取用户的Net-NTLMv2哈希。另一个（CVE-2023-24880）是绕过Windows SmartScreen中的另一个安全功能。在尚未被利用的关键漏洞中，还有一个影响互联网控制消息协议(ICMP)中大多数Windows操作系统的关键远程代码执行漏洞CVE-2023-23415。网络安全专家建议组织在24小时内修补上述两个已被利用的零日漏洞。   
  
![](https://mmbiz.qpic.cn/mmbiz_png/ss7c5mF5JlSiaYjHO8oa2Ixatl4ichibkMFiawh4xLsuzLjWbOxYsPsfOFaUH9vvLP1zl7icpLribdgIAGrFUCMuak7A/640?wx_fmt=png&tp=wxpic&wxfrom=5&wx_lazy=1&wx_co=1 "")  
  
微软近一年来补丁日公告和修复漏洞（最严重和被利用）的数量  
  
尽管安全供应商对微软3月更新中新的严重漏洞总数的看法略有不同（有说74个和，有说85个的）——可能是因为他们在计数中包含的内容不同。例如，Trend Micro的零日计划(ZDI)将微软3月更新中的六个漏洞确定为最严重漏洞，而Tenable和Action1将这一数字定为九个。  
  
两个已被利用的零日漏洞  
  
编号为CVE-2023-23397的零日漏洞，是Microsoft Outlook中的严重权限提升漏洞，它允许攻击者访问受害者的Net-NTLMv2质询-响应身份验证哈希，然后冒充用户。   
  
![](https://mmbiz.qpic.cn/mmbiz_png/ss7c5mF5JlSiaYjHO8oa2Ixatl4ichibkMFsrlU7iaiaxPNwbXn48Pq75KpHEibbwDm12SibTHJdfmT8PaiaKqe9jmPTQQ/640?wx_fmt=png&tp=wxpic&wxfrom=5&wx_lazy=1&wx_co=1 "")  
  
该错误之所以危险，是因为攻击者只需发送一封特制的电子邮件即可触发它，Outlook会在用户甚至在预览窗格中查看它之前检索并处理该电子邮件。  
  
“这是因为该漏洞是在电子邮件服务器端触发的，这意味着在受害者查看恶意电子邮件之前就会发生利用，”Tenable高级研究工程师Satnam Narang在一封电子邮件评论中说。攻击者可以使用受害者的Net-NLMv2哈希进行攻击，利用NTLM质询-响应机制并允许对手以用户身份进行身份验证。  

> 编者注：上方按归档保留历史引文，其中“电子邮件服务器端”与本文讨论的 Outlook 客户端触发位置不符；后文应按客户端处理恶意邮件的边界理解。技术名称应为 Net-NTLMv2。
  
ZDI研究员Dustin Childs在一篇总结了微软3月补丁星期二更新中最重要漏洞的博客文章中补充说，这使得该错误更像是一个身份验证绕过漏洞，而不是特权升级问题。禁用预览窗格选项不会减轻威胁，因为该漏洞甚至在此之前就已被触发。  
  
微软将漏洞的发现归功于乌克兰计算机应急响应小组(CERT)的研究人员以及它自己的一名研究人员。  
  
Automox公司的研究人员表示，无法立即修补CVE-2023-23397的组织应考虑实施微软针对该漏洞的缓解措施，这会阻止使用NTLM 作为身份验证机制。  
  
第二个零日漏洞，CVE-2023-24880，这是一个Windows SmartScreen安全功能绕过问题，攻击者可以利用该问题绕过微软用来识别用户可能从Internet下载的文件的Web标记。  
  
![](https://mmbiz.qpic.cn/mmbiz_png/ss7c5mF5JlSiaYjHO8oa2Ixatl4ichibkMFMQDUy4icrtiaB5xEuR3VrvMIgLVYFJFU4iaWUbFr37CvdkjgO4Fic7arJQ/640?wx_fmt=png&tp=wxpic&wxfrom=5&wx_lazy=1&wx_co=1 "")  
  
该功能旨在警告用户潜在的不安全内容。CVE-2023-24880影响所有运行Windows 10及更高版本的桌面系统以及运行Windows Server 2016、2019和2022的服务器系统。  
  
Ivanti安全产品副总裁Chris Goettl告诫管理员不要被微软相对较低的漏洞严重性评级所迷惑，产生错误的安全感。   
  
“CVSSv3.1得分仅为5.4，这可能会避免被许多组织注意到，”Goettl在一份声明中说。他警告说，就其本身而言，CVE可能并不那么具有威胁性，“但它很可能被用于带有其他漏洞利用的攻击链中”。  
  
其它优先级较高的严重漏洞  
  
需要特别注意的RCE漏洞之一是CVE-2023-23415，它存在于网络设备用于诊断通信问题的互联网控制消息协议(ICMP)中。   
  
![](https://mmbiz.qpic.cn/mmbiz_png/ss7c5mF5JlSiaYjHO8oa2Ixatl4ichibkMFuUXZcSlf9IrkMZ34qp6BE4tEF4OAUkf8s3YQ8IziaveIfkkDLXDiaoSQ/640?wx_fmt=png&tp=wxpic&wxfrom=5&wx_lazy=1&wx_co=1 "")  
  
微软表示：“攻击者可以通过使用在发送到目标机器的标头中包含分段IP数据包的低级协议错误来远程利用此漏洞。” 该漏洞影响多个微软产品，包括Windows 10、Windows 11、Windows Server 2008、2012、2016、2019和2022。  
  
ZDI、Automox和Action1都将这个RCE漏洞确定为组织可能希望优先考虑的另一个漏洞。   
  
CVE-2023-23392允许未经身份验证的攻击者向使用导致RCE的HTTP协议栈的服务器发送特制数据包。“该漏洞影响Windows Server 2022和 Windows 11，并且具有不需要特权或用户交互的低复杂性攻击向量，”Action1警告说。因此，Microsoft将该漏洞评估为威胁行为者比其他漏洞更有可能利用的漏洞。  
  
![](https://mmbiz.qpic.cn/mmbiz_png/ss7c5mF5JlSiaYjHO8oa2Ixatl4ichibkMFbHzp7ibtcL8lDqjr9JxdSiba7CVh9PSibnEeNLFJ6je8NT6O14vztdEMQ/640?wx_fmt=png&tp=wxpic&wxfrom=5&wx_lazy=1&wx_co=1 "")  
  
Automox还建议组织在72小时内解决CVE-2023-23416，这是Windows加密服务协议中的一个RCE错误。这是因为，除其他外，它会影响Windows 10及更高版本的所有桌面版本，以及Server 2012以上的所有Windows服务器版本。  
  
![](https://mmbiz.qpic.cn/mmbiz_png/ss7c5mF5JlSiaYjHO8oa2Ixatl4ichibkMF5UoW5TnPYLzJibyj5MKHlxPRulSjr47AJr7Yl5ettTI8aBdibITIQBOA/640?wx_fmt=png&tp=wxpic&wxfrom=5&wx_lazy=1&wx_co=1 "")  
  
除了针对新漏洞的补丁外，微软还在其3月的补丁周期中发布了针对四个旧漏洞的更新——全部来自2022年。Ivanti表示，此次更新扩大了受漏洞影响的微软软件和应用程序的数量，并为它们提供了补丁。安全供应商将这四个漏洞CVE-2022-43552、CVE-2022-23257、CVE-2022-23825和CVE-2022-23816尽快打上补丁。  
  
另外本月有相当多的特权提升(EoP)漏洞收到补丁，其中大部分漏洞需要攻击者在目标上执行代码以提升权限——通常会提升为YSTEM权限。http.sys中的权限提升是由一位匿名研究人员提交给ZDI的。这是一个整数溢出，可能允许攻击者升级到SYSTEM。Marcin Wiązowski向ZDI报告了图形组件中的权限提升漏洞， 这是一个释放后使用(UAF)的漏洞，可提升到SYSTEM权限。  
  
**参考资源：**  
  
1.https://www.darkreading.com/vulnerabilities-threats/microsoft-zero-day-bugs-security-feature-bypass  
  
2.https://www.automox.com/blog/patch-tuesday-march-2023  
  
3.https://www.zerodayinitiative.com/blog/2023/3/14/the-march-2023-security-update-review  
  
  
  
原文来源：网空闲话  
  
“投稿联系方式：孙中豪 010-82992251   sunzhonghao@cert.org.cn”  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/GoUrACT176n1NvL0JsVSB8lNDX2FCGZjW0HGfDVnFao65ic4fx6Rv4qylYEAbia4AU3V2Zz801UlicBcLeZ6gS6tg/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1 "")  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原始披露 URL 尚未确认，现有链接按来源追溯区分别标注）
