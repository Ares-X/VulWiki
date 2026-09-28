---
cve: "CVE-2024-37051"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【漏洞通告】JetBrains IntelliJ IDE信息泄露漏洞安全风险通告   
 嘉诚安全   2024-06-14 13:17  
  
**漏洞背景**  
  
  
  
  
  
  
  
  
近日，嘉诚安全监测到JetBrains IntelliJ IDE中存在一个信息泄露漏洞，漏洞编号为：CVE-2024-37051，目前该漏洞  
**细节及PoC已公开**。  
  
  
JetBrains IntelliJ是一个集成开发环境（IDE）平台，由JetBrains公司开发并维护，支持Java、Kotlin、Scala、Groovy、Python、JavaScript、TypeScript、Go、Rust等多种编程语言。  
  
  
鉴于漏洞危害较大，嘉诚安全提醒相关用户尽快更新至安全版本，避免引发漏洞相关的网络安全事件。  
  
  
**漏洞详情**  
  
  
  
  
  
  
  
  
经研判，该漏洞为  
**高危**漏洞。JetBrains IntelliJ平台上的JetBrains GitHub插件中存在漏洞，当在IDE中使用GitHub拉取请求功能时可能导致将访问令牌暴露给第三方主机，导致敏感信息泄露。该漏洞影响从2023.1 起启用并配置/使用JetBrains GitHub插件的所有基于IntelliJ的集成开发环境。  
  
  
**危害影响**  
  
  
  
  
  
  
  
  
影响范围  
  
IntelliJ IDE 2023.1及更高版本，其中启用并配置了JetBrains GitHub插件  
  
  
**处置建议**  
  
  
  
  
  
  
  
  
目前JetBrains已修复该漏洞，并修补了易受攻击的JetBrains GitHub插件，并从其官方插件市场中删除了所有以前受影响的版本，IntelliJ IDE的完整修复版本列表包括：  
  
Aqua：2024.1.2  
  
CLion：2023.1.7, 2023.2.4, 2023.3.5, 2024.1.3, 2024.2 EAP2  
  
DataGrip：2024.1.4  
  
DataSpell：2023.1.6, 2023.2.7, 2023.3.6, 2024.1.2  
  
GoLand：2023.1.6, 2023.2.7, 2023.3.7, 2024.1.3, 2024.2 EAP3  
  
IntelliJ IDEA：2023.1.7, 2023.2.7, 2023.3.7, 2024.1.3, 2024.2 EAP3  
  
MPS：2023.2.1, 2023.3.1, 2024.1 EAP2  
  
PhpStorm：2023.1.6, 2023.2.6, 2023.3.7, 2024.1.3, 2024.2 EAP3  
  
PyCharm：2023.1.6, 2023.2.7, 2023.3.6, 2024.1.3, 2024.2 EAP2  
  
Rider：2023.1.7, 2023.2.5, 2023.3.6, 2024.1.3  
  
RubyMine：2023.1.7, 2023.2.7, 2023.3.7, 2024.1.3, 2024.2 EAP4  
  
RustRover：2024.1.1  
  
WebStorm：2023.1.6, 2023.2.7, 2023.3.7, 2024.1.4  
  
下载链接：  
  
https://www.jetbrains.com/  
  
参考链接：  
  
https://www.jetbrains.com/privacy-security/issues-fixed/  
  
https://blog.jetbrains.com/security/2024/06/updates-for-security-issue-affecting-intellij-based-ides-2023-1-and-github-plugin/  
  
https://www.bleepingcomputer.com/news/security/jetbrains-warns-of-intellij-ide-bug-exposing-github-access-tokens/  
  
  
![](https://mmbiz.qpic.cn/mmbiz_png/1t8LLTibEW5NtxqlBL1HLib8jMO0PWtibWTWTFPOa3ND1lyaEQyBgp2fodg9A1XxvPjY7L6ILtK26MBGhofWE0ORw/640?wx_fmt=png&wx_ "")  
![](https://mmbiz.qpic.cn/sz_mmbiz_gif/sDiaO8GNKJrJnzIYoQAv2nF3pgKm4SgdFkzuniaicBHQxgSdu0U0xyYbNDOcNkDMWCjwJNwKnic9ASAhhxEpkFL6lg/640?wx_fmt=gif&wx_ "")  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
