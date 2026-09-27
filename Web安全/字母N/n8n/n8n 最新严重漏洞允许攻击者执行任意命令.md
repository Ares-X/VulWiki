---
cve: "CVE-2025-68668"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  n8n 最新严重漏洞允许攻击者执行任意命令  
会杀毒的单反狗  军哥网络安全读报   2026-01-07 01:04  
  
**导****读**  
  
  
  
流行的开源工作流自动化平台n8n中发现一个严重漏洞，该漏洞允许经过身份验证的攻击者在主机系统上执行任意命令。  
  
  
该漏洞编号为 CVE-2025-68668，CVSS 评分为 9.9 分（满分 10 分），属于严重级别，凸显了其高度危险性。  
  
![](https://mmbiz.qpic.cn/mmbiz_png/AnRWZJZfVaGNqLP8O2pnP6Yt9MjyK51gAL7GNVteZW6SsLQygdy1K3wA1MQ2Y8caIvLzxZibMqY7bPKAyRqH8VQ/640?wx_fmt=png&from=appmsg "")  
  
  
该安全漏洞源于 n8n 的 Python 代码节点中的沙箱绕过问题，该节点使用Pyodide 进行代码执行。该漏洞允许具有工作流创建或修改权限的已认证用户绕过预期的安全沙箱。  
  
![](https://mmbiz.qpic.cn/mmbiz_png/AnRWZJZfVaGNqLP8O2pnP6Yt9MjyK51gpueyO6nsUfbK3zHE2t3Afibo7SIv6QLTNBdSJdiaVCOYib7ibLJ9DEMfVw/640?wx_fmt=png&from=appmsg "")  
  
  
攻击者可以使用与 n8n 进程相同的权限，直接在运行 n8n 的主机系统上执行任意命令。该漏洞影响从 1.0.0 到 1.111.0 的所有 n8n 版本，使各种部署面临潜在的风险。  
  
  
这种攻击复杂度低，无需用户交互，只需要网络访问权限和低级别的身份验证权限。利用 CVE-2025-68668 可能导致系统完全被攻破，因为攻击者可以执行具有 n8n 进程权限的命令。  
  
  
该漏洞的“已变更”范围分类表明，其影响范围已超出易受攻击的组件本身，并可能影响 n8n 安全范围之外的资源。  
  
  
该漏洞被归类为CWE-693（保护机制失效），表明 n8n 的安全控制措施未能充分防御针对 Python 执行环境的定向攻击。  
  
  
n8n 在 2.0.0 版本中通过实施基于任务运行器的原生Python 执行模型解决了这一严重漏洞，从而提供了增强的隔离性。  
  
  
运行受影响版本的组织应立即升级到 2.0.0 或更高版本。根据 n8n在 GitHub 上发布的公告 ，无法立即升级的组织可以通过应用临时解决方案来降低风险。  
  
  
通过设置 NODES_EXCLUDE 环境变量排除 n8n-nodes-base.code，完全禁用代码节点。通过设置环境变量 N8N_PYTHON_ENABLED=false 禁用 Python 支持（版本 1.104.0 及更高版本可用）。  
  
  
通过 N8N_RUNNERS_ENABLED 和 N8N_NATIVE_PYTHON_RUNNER 环境变量启用基于任务运行器的 Python 沙箱，从而使用沙箱化的 Python 执行模型。  
  
  
安全公告：  
  
https://github.com/n8n-io/n8n/security/advisories/GHSA-62r4-hw23-cc8v  
  
  
新闻链接：  
  
https://cybersecuritynews.com/critical-n8n-vulnerability/  
  
![](https://mmbiz.qpic.cn/mmbiz_svg/McYMgia19V0WHlibFPFtGclHY120OMhgwDUwJeU5D8KY3nARGC1mBpGMlExuV3bibicibJqMzAHnDDlNa5SZaUeib46xSzdeKIzoJA/640?wx_fmt=svg "")  
  
**今日安全资讯速递**  
  
  
  
**APT事件**  
  
  
Advanced Persistent Threat  
  
与俄罗斯关联的  
APT  
组织利用 Viber 攻击乌克兰  
  
https://securityaffairs.com/186571/apt/russia-linked-apt-uac-0184-uses-viber-to-spy-on-ukrainian-military-in-2025.html  
  
  
APT36 又名 Transparent Tribe）利用恶意 Windows 快捷方式攻击印度  
  
https://www.esecurityplanet.com/threats/apt36-uses-malicious-windows-shortcuts-to-target-indian-government/  
  
  
黑客声称从欧洲航天局窃取了 200GB 数据  
  
https://www.techrepublic.com/article/news-hacker-claims-200gb-data-theft-european-space-agency/  
  
  
HoneyMyte APT 组织通过内核模式 rootkit 和 ToneShell 后门不断演变  
  
https://securelist.com/honeymyte-kernel-mode-rootkit/118590/  
  
  
Evasive Panda 网络间谍活动利用 DNS 投毒技术安装 MgBot 后门  
  
https://securityaffairs.com/186213/apt/evasive-panda-cyberespionage-campaign-uses-dns-poisoning-to-install-mgbot-backdoor.html  
  
  
银狐黑客利用所得税钓鱼诱饵攻击印度实体  
  
https://cybersecuritynews.com/silver-fox-hackers-attacking-indian-entities/  
  
  
  
**一般威胁事件**  
  
  
General Threat Incidents  
  
数百万台安卓电视和流媒体设备感染了 Kimwolf 僵尸网络  
  
https://hackread.com/android-tv-streaming-devices-infected-kimwolf-botnet/  
  
  
ClickFix 最新攻击利用伪造的 Windows 蓝屏死机画面诱骗用户执行恶意代码  
  
https://cybersecuritynews.com/new-clickfix-attack-uses-fake-windows-bsod-screens/  
  
  
Tuoni C2恶意软件利用人工智能增强策略攻击美国大型房地产公司  
  
https://cybersecuritynews.com/stealthy-tuoni-c2-malware-targets-major-u-s-real-estate-firm/  
  
  
Sedgwick 证实， TridentLocker 勒索软件导致信息泄露  
  
https://cybersecuritynews.com/sedgwick-confirms-data-breach/  
  
  
Ledger证实Global-e数据泄露事件，警告用户提防网络钓鱼攻击  
  
https://hackread.com/ledger-global-e-breach-phishing-attempts/  
  
  
罗马尼亚水务局遭遇BitLocker勒索软件攻击，1000个系统瘫痪  
  
https://www.cysecurity.news/2026/01/romanian-water-authority-hit-by.html  
  
  
伪装成谷歌技术支持和通知的新型复杂网络钓鱼攻击旨在窃取登录信息  
  
https://cybersecuritynews.com/phishing-attack-mimic-as-google-support/  
  
  
两款 Chrome 扩展程序被发现窃取了 90 万用户的 ChatGPT 和 DeepSeek 聊天记录  
  
https://thehackernews.com/2026/01/two-chrome-extensions-caught-stealing.html  
  
  
**漏洞事件**  
  
  
Vulnerability Incidents  
  
未修复的固件漏洞使 TOTOLINK EX200 面临完全远程设备控制的风险  
  
https://thehackernews.com/2026/01/unpatched-firmware-flaw-exposes.html  
  
  
AdonisJS 存在严重漏洞，允许远程攻击者向服务器写入文件  
  
https://cybersecuritynews.com/adonisjs-vulnerability-write-files-on-server/  
  
  
WhatsApp漏洞泄露用户元数据，包括设备操作系统详情  
  
https://cybersecuritynews.com/whatsapp-device-fingerprinting/  
  
  
n8n 最新严重漏洞允许攻击者执行任意命令  
  
https://cybersecuritynews.com/critical-n8n-vulnerability/  
  
  
AdonisJS 存在严重漏洞，允许远程攻击者向服务器写入文件  
  
https://gbhackers.com/adonisjs-vulnerability/  
  
  
macOS TCC 绕过漏洞允许攻击者访问敏感用户数据  
  
https://cybersecuritynews.com/macos-tcc-attack-bypass-vulnerability/  
  
  
谷歌在安卓一月更新中修复了杜比解码器的关键漏洞  
  
https://securityaffairs.com/186591/security/google-fixes-critical-dolby-decoder-bug-in-android-january-update.html  
  
扫码关注  
  
军哥网络安全读报  
  
**讲述普通人能听懂的安全故事**  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
