---
cve: "CVE-2025-11953"
source: "gelusus/wxvl 公众号漏洞文库"
product: "React Native Community CLI/Metro开发服务"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "CVE-2025-11953"
referenced_identifiers: "CVE-2026-21509; CVE-2025-22225"
identifier_role: "primary"
identifier_status: "unknown"
title: "黑客利用 React Native CLI 的漏洞在公开披露前部署了 Rust 恶意软件"
prerequisites: "来源所述条件，未列明部分仍待核：无CLI包影响和修复版本，开发服务需外网可达；Windows与其他平台影响分开较清楚"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-e1b1d0212f93462081a8cb8d"
entity_id: "ve-e1b1d0212f93462081a8cb8d"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：无CLI包影响和修复版本，开发服务需外网可达；Windows与其他平台影响分开较清楚

代码与实验材料：没有PoC，只有多阶段恶意软件行为总结

来源证据范围：VulnCheck原在野研究直链与SecurityAffairs新闻，支持性较好未抓取

- **事实待核（1）**：披露与利用时间线前后矛盾；依据：标题披露前、导读披露已过去数周、正文广泛披露前，须区分原漏洞披露与公开在野报告。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **事实待核（2）**：资产与缓解资料缺失；依据：大量资讯占文但无具体CLI包版本/修复；EPSS0.00405需保留观测日期。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **证据待核（3）**：翻译误导主体；依据：称缺乏公开承认使攻击者措手不及，应核原文防御者，漏洞利用的缺失与持续利用相冲。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

#  黑客利用 React Native CLI 的漏洞在公开披露前部署了 Rust 恶意软件  
会杀毒的单反狗
                    会杀毒的单反狗  军哥网络安全读报   2026-02-05 01:00  
  
**导****读**  
  
  
  
黑客利用 React Native CLI 的一个严重漏洞 (CVE-2025-11953) 运行远程命令并投放隐蔽的 Rust 恶意软件，而此时距离该漏洞被公开披露已过去数周。  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/AnRWZJZfVaHaI1axiaPMAhhRpd4ibk7IN1aMXLOHuWNibtNLlPibGKxqkxAQMgAWqYcsZrFRqXByyvqH71ynEGQIYQ/640?wx_fmt=jpeg&from=appmsg "")  
  
  
攻击者正在积极利用 React Native CLI Metro 服务器中的一个严重漏洞，该漏洞编号为CVE-2025-11953。React Native CLI 的 Metro 开发服务器默认绑定到外部接口，从而暴露了一个命令注入漏洞。  
  
  
未经身份验证的攻击者可以发送 POST 请求来执行任意程序，并且在 Windows 系统上还可以运行带有完全可控参数的 shell 命令。  
  
  
“React Native Community CLI 打开的 Metro 开发服务器默认绑定到外部接口。该服务器暴露了一个易受操作系统命令注入攻击的端点。这使得未经身份验证的网络攻击者可以向服务器发送 POST 请求并运行任意可执行文件。”  
  
  
 安全公告指出。 “在 Windows 系统上，攻击者还可以执行带有完全可控参数的任意 shell 命令。”  
  
  
Metro 是 React Native 使用的 JavaScript 打包器和开发服务器。默认情况下，它会暴露一个端点，允许未经身份验证的攻击者在 Windows 上运行操作系统命令。  
  
  
VulnCheck 的研究人员在广泛披露前几周就观察到了持续的真实攻击。  
  
  
VulnCheck 于 2025 年 12 月 21 日和 1 月两次发现 CVE-2025-11953 (Metro4Shell) 漏洞的实际利用案例，表明攻击者仍在持续使用该漏洞。尽管如此，该漏洞仍未引起公众广泛关注，且 EPSS 评分较低。由于该漏洞易于利用，且许多暴露的服务器仍然在线，因此这种漏洞利用的缺失存在风险。  
  
  
VulnCheck发布的公告指出： “在漏洞首次被利用一个多月后，EPSS仍然将其利用概率评为 0.00405的低值。这种实际利用与更广泛认知之间的差距至关重要，尤其对于那些易于利用且如互联网 搜索数据显示已在公共互联网上暴露的漏洞而言。”  
    
  
  
VulnCheck 发现 CVE-2025-11953 漏洞已被持续利用，表明该漏洞已被用于实际攻击而非测试。  
  
  
攻击者通过 cmd.exe 程序传递了一个多阶段的、经过 base64 编码的 PowerShell 加载器，禁用了 Microsoft Defender 的安全防护，通过原始 TCP 协议获取有效载荷，并执行了下载的二进制文件。该恶意软件是一个使用 UPX 打包的 Rust 有效载荷，具备基本的反分析功能。  
  
  
攻击者在数周内重复使用相同的基础设施和技术。VulnCheck警告称，由于缺乏公开承认，攻击者可能措手不及，因为攻击往往在官方承认之前就已经开始。  
  
  
报告总结道：“CVE-2025-11953 的显著之处不在于它的存在，而在于它强化了一种防御者不断重新学习的模式：开发基础设施一旦可访问，无论其初衷如何，都会变成生产基础设施。”  
  
  
VulnCheck  
官方博客：  
  
《Metro4Shell：React Native Metro Server 的野外漏洞利用》  
  
https://www.vulncheck.com/blog/metro4shell_eitw  
  
  
新闻链接：  
  
https://securityaffairs.com/187587/hacking/hackers-abused-react-native-cli-flaw-to-deploy-rust-malware-before-public-disclosure.html  
  
![](https://mmbiz.qpic.cn/mmbiz_svg/McYMgia19V0WHlibFPFtGclHY120OMhgwDUwJeU5D8KY3nARGC1mBpGMlExuV3bibicibJqMzAHnDDlNa5SZaUeib46xSzdeKIzoJA/640?wx_fmt=svg "")  
  
**今日安全资讯速递**  
  
  
  
**APT事件**  
  
  
Advanced Persistent Threat  
  
曹县APT  
37   
利用LNK文件部署复杂的恶意软件针对专注于半岛事务的专业人士  
  
https://gbhackers.com/chollima-apt-hackers/  
  
  
俄罗斯 APT28 利用微软 Office 漏洞发起恶意软件攻击  
  
https://www.helpnetsecurity.com/2026/02/03/russian-hackers-are-exploiting-recently-patched-microsoft-office-vulnerability-cve-2026-21509/  
  
  
Mustang Panda黑客组织利用虚假外交简报安装监控工具  
  
https://hackread.com/chinese-mustang-panda-briefing-spy-diplomat/  
  
  
Amaranth-Dragon利用 WinRAR 漏洞进行间谍活动  
  
https://thehackernews.com/2026/02/china-linked-amaranth-dragon-exploits.html  
  
  
  
**一般威胁事件**  
  
  
General Threat Incidents  
  
Interlock勒索软件利用游戏反作弊驱动程序  
0day  
工具，禁用EDR和AV系统  
  
https://cybersecuritynews.com/interlock-ransomware-actors-new-tool-exploiting-gaming-anti-cheat-driver-0-day/  
  
  
PhantomVAI 自定义加载器使用 RunPE 工具攻击用户  
  
https://cybersecuritynews.com/phantomvai-custom-loader/  
  
  
SystemBC僵尸网络劫持了全球1万台设备用于DDoS攻击  
  
https://cybersecuritynews.com/systembc-botnet-hijacked-10000-devices/  
  
  
GreyNoise 发现一个使用 63000 多个住宅代理和 AWS 的双模式 Citrix Gateway 侦察活动  
  
https://securityaffairs.com/187615/hacking/greynoise-tracks-massive-citrix-gateway-recon-using-63k-residential-proxies-and-aws.html  
  
  
ValleyRAT伪装成LINE安装程序攻击用户窃取登录信息  
  
https://cybersecuritynews.com/valleyrat-mimic-as-line-installer-attacking-users/  
  
  
微软报告：信息窃取恶意软件已从 Windows 扩展到 macOS  
  
https://securityaffairs.com/187608/security/microsoft-info-stealing-malware-expands-from-windows-to-macos.html  
  
  
借助  
AI  
辅助，AWS入侵者在不到10分钟的时间内获得管理员权限  
  
https://www.theregister.com/2026/02/04/aws_cloud_breakin_ai_assist/  
  
  
**漏洞事件**  
  
  
Vulnerability Incidents  
  
VMware ESXi 中的 CVE-2025-22225 漏洞现已被用于勒索软件攻击  
  
https://securityaffairs.com/187637/security/cve-2025-22225-in-vmware-esxi-now-used-in-active-ransomware-attacks.html  
  
  
Chrome漏洞允许攻击者执行任意代码并导致系统崩溃  
  
https://cybersecuritynews.com/chrome-vulnerabilities-arbitrary-code-2/  
  
  
SolarWinds Web Help Desk 严重漏洞遭受攻击  
  
https://www.theregister.com/2026/02/04/critical_solarwinds_web_help_desk/  
  
  
n8n AI 工作流自动化平台的两大关键缺陷可能导致完全接管  
  
https://www.infosecurity-magazine.com/news/two-critical-flaws-in-n8n-ai/  
  
  
研究人员披露了Docker AI助手的一个已修复漏洞，该漏洞可执行代码  
  
https://www.cysecurity.news/2026/02/researchers-disclose-patched-flaw-in.html  
  
  
ASUSTOR NAS 存在严重安全漏洞，可导致设备完全被控制  
  
https://gbhackers.com/critical-asustor-nas-security-flaw/  
  
  
TP-Link漏洞使黑客能够完全控制设备  
  
https://gbhackers.com/tp-link-vulnerabilities/  
  
  
Ingress-NGINX漏洞可导致任意代码执行攻击  
  
https://gbhackers.com/ingress-nginx-flaw/  
  
  
Django 严重漏洞允许发起拒绝服务攻击和 SQL 注入攻击  
  
https://gbhackers.com/critical-django-flaw/  
  
  
黑客利用 React Native CLI 的漏洞在公开披露前部署了 Rust 恶意软件  
  
https://securityaffairs.com/187587/hacking/hackers-abused-react-native-cli-flaw-to-deploy-rust-malware-before-public-disclosure.html  
  
****  
扫码关注  
  
军哥网络安全读报  
  
**讲述普通人能听懂的安全故事**  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
