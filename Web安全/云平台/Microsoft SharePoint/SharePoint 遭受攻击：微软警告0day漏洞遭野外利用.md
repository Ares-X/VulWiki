---
cve: "CVE-2025-53770"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  SharePoint 遭受攻击：微软警告0day漏洞遭野外利用  
会杀毒的单反狗  军哥网络安全读报   2025-07-21 01:03  
  
**导****读**  
  
  
  
微软周六向 SharePoint Server 客户发出紧急警告，称主动攻击针对的是该软件产品中的  
0day  
漏洞，该漏洞编号为 CVE-2025-53770，CVSS 评分为 9.8。  
  
![](https://mmbiz.qpic.cn/mmbiz_png/AnRWZJZfVaEXSwAFfGfxn6nKmeibIn4QRXp3paXYKGPOfWwJUTA8PmwNYIiaH9M9fCWic1c2iauTOoCIX75wzfm3Xw/640?wx_fmt=png&from=appmsg "")  
  
  
目前尚未有针对该漏洞的补丁，该漏洞被称为“ ToolShell ”，微软称其是 CVE-2025-49706 的变体。  
  
  
谷歌表示：“谷歌威胁情报小组观察到威胁组织利用此漏洞安装 Webshell，并从受害者服务器窃取加密的机密信息。这会导致持续的、未经身份验证的访问，并对受影响的组织构成重大风险。”  
  
  
Palo Alto Networks Unit42 团队周六表示，他们还发现影响 Microsoft SharePoint 的 CVE-2025-49704 和 CVE-2025-49706 漏洞正被积极利用。  
  
  
利用此漏洞的攻击者不仅会注入任意代码，还会滥用 SharePoint 反序列化不受信任对象的方式，使其甚至在身份验证之前就能执行命令。  
  
  
一旦进入系统，他们就可以使用窃取的机器密钥伪造受信任的有效载荷，从而实现持久化或横向移动，并经常与合法的 SharePoint 活动混杂在一起——如果没有深度端点可见性，检测和响应将变得尤为困难。  
  
  
微软在其安全公告中解释道： “为了保护本地 SharePoint Server 环境，建议客户在 SharePoint 中配置 AMSI集成，并在所有 SharePoint 服务器上部署Defender AV  
    
。这将阻止未经身份验证的攻击者利用此漏洞。”  
  
  
2025年7月18日晚，荷兰网络安全公司  
  
Eye Security 发现有人正在大规模利用一个新的SharePoint 远程代码执行 (RCE)漏洞链，该漏洞链名为ToolShell，几天前在 X 上演示过。  
  
  
该漏洞正被广泛利用，入侵全球各地的本地 SharePoint 服务器，该漏洞被微软跟踪为(CVE-2025-53770)。  
  
  
对于无法启用 AMSI 的用户，建议断开 SharePoint Server 与互联网的连接，直到有可用的安全更新为止。为了增强保护，建议用户部署 Defender for Endpoint 来检测并阻止漏洞利用后的活动。  
  
  
Eye Security 团队扫描了全球8000 多台 SharePoint 服务器，发现数十个系统遭到主动入侵，入侵时间可能在 7 月 18 日 18:00 左右（UTC）和 7 月 19 日 07:30 左右（UTC）。  
  
### 漏洞时间线：  
  
![](https://mmbiz.qpic.cn/mmbiz_png/AnRWZJZfVaEXSwAFfGfxn6nKmeibIn4QRQU5icjcFuoO3zQA1lG8zUibia9dpib9tIOrhfUCx2TVsoKpviaWWT6qcSBA/640?wx_fmt=png&from=appmsg "")  
  
  
2025年7月18日晚，Eye Security 团队收到来自某位客户的CrowdStrike Falcon EDR部署的警报 。该警报标记了旧版 SharePoint 本地服务器上的可疑进程链，该进程链与最近上传的恶意.aspx文件相关联。  
  
  
乍一看，它看起来很眼熟。是一个经典的 Web Shell，在自定义路径中嵌入了混淆代码，旨在允许通过 HTTP 执行远程命令。  
  
  
仔细分析后认为，有攻击者在不进行任何身份验证的情况下将文件写入服务器。研究人员意识到，这不是一个简单的基于凭证的入侵，而是一个  
0  
day  
漏洞利用。  
  
  
三天前，Code White GmbH的安全团队演示了他们可以复现 SharePoint 中一个未经身份验证的 RCE 漏洞链，该漏洞链由今年 5 月初在柏林 Pwn2Own 漏洞大会上披露的两个漏洞 CVE-2025-49706 和 CVE-2025-49704 组合而成。他们将  
该漏洞链命名为ToolShell。  
  
  
当时，它被认为是一个概念验证。没有公开代码发布，细节也很少。研究人员最终确认这是一个被武器化的Pwn2Own 漏洞。  
  
  
Eye Security 首席技术官 Piet Kerkhofs 在一份声明中说：“我们仍在识别大规模漏洞攻击浪潮。这将产生巨大影响，攻击者正在利用这种远程代码执行技术快速横向移动。”  
  
  
截至本文撰写时，全球已有超过 85 台 SharePoint 服务器被确认受到恶意 Web Shell 攻击。这些被黑的服务器属于 29 个组织，其中包括跨国公司和政府机构。  
  
  
Eye Security  
详细漏洞分析：  
  
https://research.eye.security/sharepoint-under-siege/  
  
  
微软官方安全指南：  
  
https://msrc.microsoft.com/blog/2025/07/customer-guidance-for-sharepoint-vulnerability-cve-2025-53770/  
  
  
新闻链接：  
  
https://thehackernews.com/2025/07/critical-microsoft-sharepoint-flaw.html  
  
![](https://mmbiz.qpic.cn/mmbiz_svg/McYMgia19V0WHlibFPFtGclHY120OMhgwDUwJeU5D8KY3nARGC1mBpGMlExuV3bibicibJqMzAHnDDlNa5SZaUeib46xSzdeKIzoJA/640?wx_fmt=svg "")  
  
**今日安全资讯速递**  
  
  
  
**APT事件**  
  
  
Advanced Persistent Threat  
  
新加坡警告 UNC3886 威胁组织瞄准其关键基础设施  
  
https://securityaffairs.com/180179/uncategorized/singapore-warns-china-linked-group-unc3886-targets-its-critical-infrastructure.html  
  
  
Fancy Bear 黑客组织利用先进工具攻击政府和军事实体  
  
https://gbhackers.com/fancy-bear-hackers-target-governments-and-military-entities/  
  
  
Ivanti   
0day  
漏洞被利用来投放 MDifyLoader 并发起 Cobalt Strike 攻击  
  
https://thehackernews.com/2025/07/ivanti-zero-days-exploited-to-drop.html  
  
  
SquidLoader恶意软件攻击香港金融公司  
  
https://hackread.com/squidloader-malware-hits-hong-kong-financial-firms/  
  
  
  
**一般威胁事件**  
  
  
General Threat Incidents  
  
网络犯罪分子通过恶意 AI 浏览器扩展程序窃取 50 万美元加密货币  
  
https://www.cysecurity.news/2025/07/online-criminals-steal-500k-crypto-via.html  
  
  
EncryptHub 瞄准使用虚假 AI 平台部署 Fickle Stealer 恶意软件的 Web3 开发者  
  
https://thehackernews.com/2025/07/encrypthub-targets-web3-developers.html  
  
  
Interlock RAT 演变成针对美国工业领域的新 KongTuke Web 注入攻击  
  
https://www.cysecurity.news/2025/07/interlock-rat-evolves-in-new-kongtuke.html  
  
  
超过 200 万用户受到影响：浏览器扩展程序变成了静默间谍工具  
  
https://www.cysecurity.news/2025/07/over-2-million-users-affected-browser.html  
  
  
Snake Keylogger 绕过 Windows Defender 和计划任务窃取登录凭证  
  
https://cybersecuritynews.com/snake-keylogger-evades-windows-defender/  
  
  
Lumma Infostealer 窃取浏览器中存储的所有数据并将其作为日志在地下市场出售  
  
https://cybersecuritynews.com/lumma-infostealer-steal-all-data-stored-in-browsers/  
  
  
新型恶意软件“LameHug”部署人工智能生成的命令  
  
https://www.infosecurity-magazine.com/news/new-lamehug-malware-deploys/  
  
  
犯罪集团利用虚假应用程序和骡子账户在印度洗钱 5.8 亿美元  
  
https://hackread.com/chinese-groups-launder-india-fake-apps-mule-accounts/  
  
  
俄罗斯伏特加生产商报告称勒索软件攻击导致业务中断  
  
https://therecord.media/novabev-russia-vodka-maker-ransomware-attack  
  
  
**漏洞事件**  
  
  
Vulnerability Incidents  
  
SharePoint 遭受攻击：微软警告  
0day  
漏洞遭野外利用  
  
https://thehackernews.com/2025/07/critical-microsoft-sharepoint-flaw.html  
  
  
Fortinet FortiWeb 漏洞 CVE-2025-25257 在 PoC 发布数小时后被利用  
  
https://securityaffairs.com/180118/hacking/fortinet-fortiweb-flaw-cve-2025-25257-exploited-hours-after-poc-release.html  
  
  
黑客利用 CrushFTP 严重漏洞获取未打补丁服务器的管理员访问权限  
  
https://thehackernews.com/2025/07/hackers-exploit-critical-crushftp-flaw.html  
  
  
Grafana 漏洞允许用户重定向到恶意网站并在仪表板中执行代码  
  
https://cybersecuritynews.com/grafana-vulnerabilities-redirection/  
  
  
Sophos Intercept X for Windows 漏洞可导致任意代码执行  
  
https://gbhackers.com/sophos-intercept-x-for-windows-flaws/  
  
  
Ubiquiti UniFi 漏洞可让黑客注入恶意命令  
  
https://gbhackers.com/ubiquiti-unifi-vulnerability-2/  
  
扫码关注  
  
军哥网络安全读报  
  
**讲述普通人能听懂的安全故事**  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
