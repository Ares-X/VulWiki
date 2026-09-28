---
cve: "CVE-2023-29357"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  CISA：Microsoft SharePoint 的关键漏洞已被积极利用   
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
