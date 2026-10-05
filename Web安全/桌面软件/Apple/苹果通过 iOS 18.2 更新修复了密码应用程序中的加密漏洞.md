---
source: "gelusus/wxvl 公众号漏洞文库"
cve: "CVE-2024-54492;CVE-2024-54526;CVE-2024-54527;CVE-2024-54494;CVE-2024-54505;CVE-2024-44246"
identifier_role: "primary"
primary_identifiers: "CVE-2024-54492;CVE-2024-54526;CVE-2024-54527;CVE-2024-54494;CVE-2024-54505;CVE-2024-44246"
referenced_identifiers: ""
identifier_status: "unknown"
title: "苹果通过 iOS 18.2 更新修复了密码应用程序中的加密漏洞"
product: "Apple Passwords及其他iOS组件"
record_type: "advisory"
document_type: "iOS补丁新闻"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
prerequisites: "Passwords iOS18至18.2修复前；网络中间人位置；其余组件各自本地/Web前提"
side_effects: "原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E6%A1%8C%E9%9D%A2%E8%BD%AF%E4%BB%B6/Apple/%E8%8B%B9%E6%9E%9C%E9%80%9A%E8%BF%87%20iOS%2018.2%20%E6%9B%B4%E6%96%B0%E4%BF%AE%E5%A4%8D%E4%BA%86%E5%AF%86%E7%A0%81%E5%BA%94%E7%94%A8%E7%A8%8B%E5%BA%8F%E4%B8%AD%E7%9A%84%E5%8A%A0%E5%AF%86%E6%BC%8F%E6%B4%9E.md"
archive_commit: "41940cb0038d09ca5aaddbe5bffb923e423d210f"
source_status: "missing"
source_note: "原始出处待补；仓库归档不等同原始披露"
id: "vw-c290d126dae2d14d49c86b88"
entity_id: "ve-c290d126dae2d14d49c86b88"
schema_version: "1"
---

# 苹果通过 iOS 18.2 更新修复了密码应用程序中的加密漏洞

<!-- vulwiki-editorial-rebuild:system-misc -->
## 条目范围与校订

- 本文对象：Apple Passwords及其他iOS组件
- 文献类型：iOS补丁新闻
- 版本、权限及部署边界：Passwords iOS18至18.2修复前；网络中间人位置；其余组件各自本地/Web前提
- 核验状态：仅重建文本校订；未执行文中代码、PoC 或扫描，未把截图或转载声明记为本站复现

### 具体结论与待核项

以下为原归档的逐项勘误与证据缺口；可由文本确定的问题已在下文订正，仍缺来源的事实保持待核。

1. 元数据漏全部CVE，主篇54492与后续五项补丁应主从关联或拆记录
2. 网站图标HTTP/元数据泄露并不直接证明密码库明文或密码泄露，风险措辞需约束
3. 伪造图标到用户被重定向恶意网站的因果缺演示，应保留可能性
4. 研究者推文有链接但缺Apple/Tenable公告；iPad范围与其他组件受影响版本未逐项给出，空列表和小标题清理

### 操作风险

原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响

技术请求、代码与实验方法按原文保留；其中的破坏性动作仅限授权、可恢复的隔离环境。缺失代码、参数或版本事实不猜补。

### 来源追溯

- 原文参考链接（未重新核验）：<https://twitter.com/mysk_co/status/1866970731478913277>
- 原始披露 URL 未确认；既有归档来源标签保留，不能替代原始公告

### 归档技术正文

很近也很远  网络研究观   2024-12-12 15:59  
  
![](../../.resource/remote/ee61242e584e02c1d0f89d2fc74f425d5202e0c329d2c2a383a0876c96715d0d.png "")  
  
在安全研究人员 Talal Haj Bakry 和 Mysk Inc. 的 Tommy Mysk 报告之后，Apple 在发布 iOS 18.2 时解决了其密码应用程序中的一个重要安全漏洞。  
  
  
该漏洞被追踪为 CVE-2024-54492，涉及应用程序使用未加密的 HTTP 连接下载网站图标，使用户面临中间人 (MITM) 攻击等风险。  
  
  
自 iOS 18 发布以来，密码应用一直依赖不安全的 HTTP 来获取已保存密码条目的图标。  
  
  
这种疏忽意味着任何拥有特权网络地位的人（例如公共 Wi-Fi 上的攻击者或受感染的路由器）都可以拦截或操纵流量。  
  
  
这种干扰可能允许不良行为者伪造图标、将用户重定向到恶意网站或利用缺乏加密来收集敏感元数据。  
  
  
Mysk 于 2024 年 9 月向 Apple 报告了此问题，并在 2024 年 12 月 11 日发布的 iOS 18.2 中实施了修复。  
  
  
安全公司Tenable将该漏洞归类为高严重性，并强调了更新以避免被利用的重要性。  
  
  
https://twitter.com/mysk_co/status/1866970731478913277  
  
  
该漏洞对用户的隐私和安全构成了重大风险。  
  
  
应用程序中存储的密码旨在提供安全的存储库，但不安全的 HTTP 连接破坏了这一前提。  
  
  
虽然没有报告已知的主动攻击，但该漏洞可能会泄露敏感信息，因此必须立即修复。  
  
### iOS 18.2：关键修复  
###   
  
Apple 的iOS 18.2 更新还解决了不同组件中其他几个值得注意的漏洞：  
  
- AppleMobileFileIntegrity（CVE-2024-54526、CVE-2024-54527）：这些漏洞可能允许恶意应用程序访问私人或敏感用户数据，从而可能绕过沙盒限制。  
-   
- 内核（CVE-2024-54494）：修复了可能使攻击者能够写入只读内存的竞争条件。  
-   
- WebKit（CVE-2024-54505）：解决了处理恶意制作的 Web 内容时可能导致内存损坏的类型混淆问题。  
-   
- Safari (CVE-2024-44246)：解决了一个隐私问题，将网站添加到 Safari 的阅读列表可能会无意中向网站泄露原始 IP 地址，即使启用了私人中继也是如此。  
-   
苹果敦促所有用户立即将其设备更新至 iOS 18.2 和 iPadOS 18.2。此更新适用于 iPhone XS 及更高版本的所有设备以及兼容的 iPad。  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原始披露 URL 尚未确认，现有链接按来源追溯区分别标注）
