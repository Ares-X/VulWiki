---
cve: "CVE-2023-29357"
source: "gelusus/wxvl 公众号漏洞文库"
id: "vw-07a3a6c3001064fa122984b7"
entity_id: "ve-07a3a6c3001064fa122984b7"
schema_version: "1"
title: "CISA：Microsoft SharePoint 的关键漏洞已被积极利用"
product: "Microsoft SharePoint Server"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "primary"
primary_identifiers: "CVE-2023-29357"
referenced_identifiers: ""
prerequisites: "伪造JWT认证；RCE需独立24955，版本未列"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%AE%89%E5%85%A8%E8%AE%BE%E5%A4%87/CISA/CISA%EF%BC%9AMicrosoft%20SharePoint%20%E7%9A%84%E5%85%B3%E9%94%AE%E6%BC%8F%E6%B4%9E%E5%B7%B2%E8%A2%AB%E7%A7%AF%E6%9E%81%E5%88%A9%E7%94%A8.md"
review_date: "2026-10-02"
category_recommendation: "Web安全/服务器应用/SharePoint"
side_effects: "执行文中载荷可能以目标进程权限启动命令或加载代码；权限受认证角色、操作系统账户及依赖版本约束，不能把 root/200 等通用字符串当成功证据"
source_status: "unknown"
---

#  CISA：Microsoft SharePoint 的关键漏洞已被积极利用   

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Microsoft SharePoint Server
- 本文讨论：CVE-2023-29357主，24955 RCE链
- 版本、权限与配置前提：伪造JWT认证；RCE需独立24955，版本未列
- 资料类型：SharePoint KEV新闻与每日资讯；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 误归CISA；大量其他事件新闻不应并为本漏洞
- 正文称利用详情未知，页尾却列勒索组织利用标题，需独立来源核对不能相互佐证
- 研究者姓名断裂、PoC/分析日期与同链另一文章相差一天
- 无微软/STAR Labs/KEV直链

### 操作风险与恢复

- 执行文中载荷可能以目标进程权限启动命令或加载代码；权限受认证角色、操作系统账户及依赖版本约束，不能把 root/200 等通用字符串当成功证据

### 待核与来源

- 发布时间、勒索归因和补丁矩阵待核
- 引用图片未查看，截图内容及有效性待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->

 军哥网络安全读报   2024-01-13 09:19  
  
**导****读**  
  
  
  
CISA
警告说，攻击者现在正在利用一个关键的 Microsoft SharePoint 权限提升漏洞，该漏洞可以与另一个关键漏洞相结合以实现远程代码执行。  
  
  
该安全漏洞的编号为CVE-2023-29357，该安全漏洞使远程攻击者能够通过使用欺骗性
JWT 身份验证令牌绕过身份验证，从而在未修补的服务器上获得管理员权限。  
  
  
微软在公告中解释说：“获得欺骗性
JWT 身份验证令牌的攻击者可以使用它们来执行网络攻击，绕过身份验证并允许他们获得经过身份验证的用户的权限。”  
  
  
“成功利用此漏洞的攻击者可以获得管理员权限。攻击者不需要任何权限，用户也不需要执行任何操作。”  
  
  
将此缺陷与CVE-2023-24955
SharePoint Server 远程代码执行漏洞链接起来时，远程攻击者还可以通过命令注入在受感染的 SharePoint 服务器上执行任意代码。  
  
  
STAR
Labs 研究员Jang (Nguy  
ễ  
n Ti  
ế  
n Giang)在去年 2023 年 3 月于温哥华举行的 Pwn2Own
竞赛中成功演示了这个 Microsoft SharePoint Server 漏洞链，并获得了 100,000 美元的奖励。  
  
  
研究人员于 9 月
25 日发布了一份技术分析报告，详细描述了利用过程。  
演示视频链接：https://youtu.be/x0DPpVh8fO4  
  
![](https://mmbiz.qpic.cn/mmbiz_png/AnRWZJZfVaFEFxQbbnIot8HzVDMj8eQk9IdESJf4orDZWibalmVXa1ib5NjwQWFVVNDmA3PiavSRiaCoxRshok7HTA/640?wx_fmt=png&from=appmsg "")  
  
  
就在一天后，一名安全研究人员还在
GitHub 上发布了 CVE-2023-29357 概念验证漏洞。  
  
  
尽管该漏洞无法在目标系统上远程执行代码，但由于它不是
Pwn2Own 演示的链的完整漏洞，其作者表示，攻击者可以将其与 CVE-2023-24955 漏洞本身链接起来进行 RCE。  
  
  
PoC
漏洞利用的开发人员表示：“该脚本会输出管理员用户的详细信息，并且可以在单一和大规模利用模式下运行。该脚本不包含执行 RCE
的功能，并且仅用于教育目的以及合法和授权的测试。”  
  
  
之后，该漏洞利用链的其他
PoC 漏洞在网上出现，降低了漏洞利用门槛，甚至允许技能较低的攻击者在野外利用中部署它。  
  
  
虽然尚未提供有关
CVE-2023-29357 主动利用的更多详细信息，但 CISA 已将该漏  
  
洞添加到其已知被利用的漏洞目录中，现在要求美国联邦机构在本月底（即 1 月 31
日）之前修复该漏洞。  
  
  
**参考链接：**  
https://www.bleepingcomputer.com/news/security/cisa-critical-microsoft-sharepoint-bug-now-actively-exploited/  
  
  
![](https://mmbiz.qpic.cn/mmbiz_svg/McYMgia19V0WHlibFPFtGclHY120OMhgwDUwJeU5D8KY3nARGC1mBpGMlExuV3bibicibJqMzAHnDDlNa5SZaUeib46xSzdeKIzoJA/640?wx_fmt=svg "")  
  
**今日安全资讯速递**  
  
  
  
**APT事件**  
  
  
Advanced Persistent Threat  
  
Volexity 发现黑客利用 Ivanti VPN 0Day漏洞  
  
https://www.securityweek.com/volexity-catches-chinese-hackers-exploiting-ivanti-vpn-zero-days/  
  
  
Volt Typhoon APT组织似乎对美国、英国和澳大利亚目标发动了新的攻击  
  
https://securityscorecard.com/blog/threat-intelligence-research-volt-typhoon/  
  
  
**一般威胁事件**  
  
  
General Threat Incidents  
  
俄罗斯黑客可能没有参与对丹麦关键基础设施的攻击  
  
https://www.securityweek.com/russian-hackers-likely-not-involved-in-attacks-on-denmarks-critical-infrastructure/  
  
  
美国海军造船厂遭勒索软件攻击泄露近
17,000 人信息  
  
https://therecord.media/fincantieri-shipbuilder-us-navy-wisconsin-ransomware  
  
  
CISA：Microsoft
SharePoint 的关键漏洞已被积极利用  
  
https://www.bleepingcomputer.com/news/security/cisa-critical-microsoft-sharepoint-bug-now-actively-exploited/  
  
  
Windows
计算机遭到 AgentTesla 恶意软件攻击以窃取数据  
  
https://gbhackers.com/agenttesla-malware-windows-machine/  
  
  
FBot
恶意软件对云和支付服务构成重大威胁  
  
https://siliconangle.com/2024/01/11/fbot-malware-emerges-significant-threat-cloud-payment-services/  
  
  
笔记本电脑制造商Framework
Computer因第三方服务造成客户数据泄露  
  
https://www.pcmag.com/news/framework-laptop-reports-data-breach-exposing-user-names-email-addresses  
  
  
勒索软件组织利用了
SharePoint 关键漏洞（CVE-2023-29357）  
  
https://www.theregister.com/2024/01/12/microsoft_sharepoint_vuln_exploit/  
  
  
130 万 FNF
客户的数据可能在勒索软件攻击中暴露  
  
https://www.infosecurity-magazine.com/news/fnf-customers-data-ransomware/  
  
  
英国化妆品公司
Lush 证实遭受网络攻击  
  
https://therecord.media/british-cosmetics-lush-cyberattack  
  
  
**漏洞事件**  
  
  
Vulnerability Incidents  
  
GitLab
中的严重漏洞，一个简单的技巧就可以重置任何用户的密码，CVSS 评分为 10  
  
https://sekurak.pl/krytyczna-podatnosc-w-gitlab-prostym-trickiem-mozna-zresetowac-dowolnemu-uzytkownikowi-haslo-10-10-w-skali-cvss/  
  
  
CISA
敦促关键基础设施修补紧急 ICS 漏洞  
  
https://www.infosecurity-magazine.com/news/cisa-critical-infrastructure-patch/  
  
  
博世修复了影响智能恒温器的漏洞  
  
https://therecord.media/vulnerability-smart-thermostats-bosch-patch  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/AnRWZJZfVaGC3gsJClsh4Fia0icylyBEnBywibdbkrLLzmpibfdnf5wNYzEUq2GpzfedMKUjlLJQ4uwxAFWLzHhPFQ/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1 "")  
  
扫码关注  
  
会杀毒的单反狗  
  
**讲述普通人能听懂的安全故事**  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
