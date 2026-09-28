---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  研究人员称攻击者正在大规模利用新的Ivanti VPN漏洞，Fortinet警告APT 组织在攻击中利用FortiOS漏洞   
 军哥网络安全读报   2024-02-10 09:00  
  
**导****读**  
  
  
  
新的公开数据显示，黑客已开始大规模利用影响
Ivanti 的企业 VPN 设备的第三个漏洞。  
  
![](https://mmbiz.qpic.cn/mmbiz_png/AnRWZJZfVaEkerp0BCUP3s7MNAxdWFB55ZwOdt4QUz1NrbXibiaN7GQPTdFg8fC9ibk7Xl15NiazCsKibwtiahCfTJFQ/640?wx_fmt=png&from=appmsg "")  
  
上周，Ivanti
表示，它发现了两个新的安全漏洞（编号为 CVE-2024-21888 和 CVE-2024-21893），影响 Connect
Secure，这是全球数千家公司和大型组织使用的远程访问 VPN 解决方案。  
  
  
根据其网站，Ivanti 拥有超过 40,000
家客户，包括大学、医疗机构和银行，其技术允许员工从办公室外登录。  
  
  
就在 Ivanti
确认 Connect Secure 中存在两个早期漏洞（编号为 CVE-2023-46805 和
CVE-2024-21887）后不久，安全研究人员表示，某国支持的黑客自 12 月以来一直在利用这些漏洞闯入客户网络并窃取信息。  
  
  
现在数据显示，新发现的缺陷之一——CVE-2024-21893，一个服务器端请求伪造缺陷——正在被大规模利用。  
  
  
尽管 Ivanti
此后已修补了这些漏洞，但安全研究人员预计，随着越来越多的黑客组织利用该漏洞，会对组织产生更大的影响。  
  
  
网络安全公司 Volexity 一直在跟踪 Ivanti
漏洞的利用情况，网络安全公司 Volexity 的创始人史蒂文·阿代尔 (Steven Adair)
警告说，概念验证漏洞代码已公开，“任何可通过互联网访问的未打补丁的设备都可能多次遭到破坏”。  
  
  
扫描和监控互联网漏洞的非营利组织
Shadowserver Foundation 的首席执行官 Piotr Kijewski 周四告诉 TechCrunch，该组织已观察到超过 630
个独特的 IP 试图利用服务器端缺陷，从而使攻击者能够获得访问权限易受攻击的设备上的数据。  
  
  
与上周
Shadowserver 表示观察到 170 个唯一 IP试图利用该漏洞相比，这一数字急剧增加。  
  
  
对新服务器端缺陷的分析表明，该错误可被用来绕过
Ivanti 针对涉及前两个漏洞的初始利用链的原始缓解措施，从而有效地使这些补丁前的缓解措施变得毫无意义。  
  
  
Kijewski
补充说，Shadowserver 目前观察到大约 20,800 台 Ivanti Connect Secure 设备暴露在互联网上，低于上周的 22,500
台，不过他指出，目前尚不清楚其中有多少 Ivanti 设备容易受到利用。  
  
  
目前尚不清楚大规模利用的幕后黑手是谁，安全研究人员将前两个
Connect Secure 漏洞的利用归咎于某国政府支持的黑客组织，该组织可能是出于间谍活动的动机。  
  
  
Ivanti
此前表示，它意识到针对“有限数量的客户”的服务器端漏洞的“有针对性”利用。尽管 TechCrunch 本周一再要求，Ivanti
不愿对有关该漏洞正在被大规模利用的报道发表评论，但它并没有对 Shadowserver 的调查结果提出异议。  
  
  
Ivanti本月早些时候开始向客户发布针对所有漏洞的补丁以及第二组缓解措施。然而，Ivanti
在其安全公告（最后一次更新于 2 月 2 日）中指出，它“首先针对安装量最高的用户发布补丁，然后继续按递减的顺序发布补丁”。  
  
  
目前尚不清楚
Ivanti 何时会向所有潜在易受攻击的客户提供这些补丁。  
  
  
几天前，美国网络安全机构CISA
命令联邦机构紧急断开所有 Ivanti VPN 设备的连接，有报道称另一个 Ivanti 漏洞被大规模利用。  
  
  
该机构发出警告称，CISA
仅给各机构两天的时间来断开设备连接，理由是受到主动攻击的漏洞造成了“严重威胁”。  
  
  
Fortinet
周三警告说，APT组织一直在利用两个已知的 FortiOS 漏洞进行针对各个部门（包括关键基础设施）的攻击。  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/AnRWZJZfVaEkerp0BCUP3s7MNAxdWFB5YcYic6KzibSjYiaWml3tA8GHMJstLExZLovljEamRK76m7KI9icmU6hFfw/640?wx_fmt=jpeg "")  
  
  
其中一个被利用的漏洞是 CVE-2022-42475，Fortinet 于 2022 年 12
月修补了该漏洞，当时它警告说，它已经意识到了野外利用的情况。  
APT  
组织利用该缺陷作为针对政府和其他类型组织的  
0day  
攻击。  
    
  
  
Fortinet 新警告中描述的第二个漏洞是CVE-2023-27997，该漏洞于 2023 年 6
月曝光，当时该网络安全公司通知客户该漏洞已在有限的攻击中被用作  
0day  
漏洞。  
  
  
Fortinet
周三指出，一些客户尚未修补这两个 FortiOS
漏洞，该公司已经发现了多起攻击和攻击集群，其中包括针对政府、服务提供商、制造、咨询和关键基础设施部门的攻击和攻击集群。  
  
  
该公司分享了技术细节和危害检测指标
(IoC)，以帮助组织检测和调查攻击。  
  
  
**参考链接：**  
  
****  
https://techcrunch.com/2024/02/08/researchers-say-attackers-are-mass-exploiting-new-ivanti-vpn-flaw/  
  
https://www.securityweek.com/fortinet-warns-of-new-fortios-zero-day/  
  
![](https://mmbiz.qpic.cn/mmbiz_svg/McYMgia19V0WHlibFPFtGclHY120OMhgwDUwJeU5D8KY3nARGC1mBpGMlExuV3bibicibJqMzAHnDDlNa5SZaUeib46xSzdeKIzoJA/640?wx_fmt=svg "")  
  
**今日安全资讯速递**  
  
  
  
**APT事件**  
  
  
Advanced Persistent Threat  
  
AnyDesk  
分享了有关最近黑客攻击的更多信息  
  
https://www.securityweek.com/anydesk-shares-more-information-on-recent-hack/  
  
  
微软称，伊朗黑客在与哈马斯冲突中加强了对以色列的网络攻击  
  
https://www.securityweek.com/iran-ramps-up-cyberattacks-on-israel-amid-hamas-conflict-microsoft/  
  
  
隐形 Zardoor
后门针对沙特伊斯兰慈善组织  
  
https://thehackernews.com/2024/02/stealthy-zardoor-backdoor-targets-saudi.html  
  
  
Kimsuky 的新
Golang 窃取程序“Troll”和“GoBear”后门瞄准韩国  
  
https://thehackernews.com/2024/02/kimsukys-new-golang-stealer-troll-and.html  
  
  
联合国表示，朝鲜从
58 次网络攻击中筹集了 30 亿美元  
  
https://cybernews.com/security/north-korea-3b-58-cyberattacks-nuclear-weapons-united-nations/  
  
  
**一般威胁事件**  
  
  
General Threat Incidents  
  
新的 macOS
后门与 Black Basta 和 Alphv/BlackCat 勒索软件组织相关  
  
https://www.securityweek.com/new-macos-backdoor-linked-to-prominent-ransomware-groups/  
  
  
“Coyote”恶意软件开始狩猎，攻击
61 款银行应用程序  
  
https://www.darkreading.com/threat-intelligence/coyote-malware-preying-61-banking-apps  
  
  
LockBit
声称对加州工会勒索软件攻击事件负责  
  
https://therecord.media/california-union-lockbit-attack-ransomware  
  
  
新的
Ov3r_Stealer 密码窃取恶意软件正在通过Facebook 虚假招聘广告推送  
  
https://www.bleepingcomputer.com/news/security/facebook-ads-push-new-ov3r-stealer-password-stealing-malware/  
  
  
300万支智能牙刷没有被用于DDoS攻击，但这种情况有可能发生  
  
https://www.zdnet.com/home-and-office/smart-home/3-million-smart-toothbrushes-were-not-used-in-a-ddos-attack-but-they-could-have-been/  
  
  
研究人员发现许多
Android 电视盒感染了恶意软件  
  
https://techcentral.co.za/researchers-android-tv-boxes-malware/239350/  
  
  
2023
年勒索软件支付额翻倍，超过 10 亿美元  
  
https://therecord.media/ransomware-payments-doubled-to-more-than-1-billion-2023  
  
  
Apple App
Store 中发现假冒 LastPass 应用程序  
  
https://cybernews.com/security/fake-lastpass-app-apple-app-store/  
  
  
现代汽车欧洲分部遭受Black Basta勒索软件攻击，约  
3TB  
数据被盗  
  
https://cybernews.com/news/hyundai-europe-alleged-victim-of-black-basta-ransomware/  
  
  
瑞典云提供商
Advania 遭受网络攻击，医疗保健服务受到影响  
  
https://cybernews.com/news/cyberattack-hits-swedish-cloud-provider-advania/  
  
  
法国：3300
万个社会安全号码因健康保险黑客攻击而暴露  
  
https://www.infosecurity-magazine.com/news/france-33-million-social-security/  
  
  
加拿大将禁止“Flippe  
r
Zero”以阻止汽车盗窃案激增  
  
https://www.bleepingcomputer.com/news/security/canada-to-ban-the-flipper-zero-to-stop-surge-in-car-thefts/  
  
  
新的
RustDoor macOS 恶意软件冒充 Visual Studio 更新  
  
https://www.bleepingcomputer.com/news/security/new-rustdoor-macos-malware-impersonates-visual-studio-update/  
  
  
FTC
警告称，2023 年美国人因欺诈损失创纪录的 100 亿美元  
  
https://www.bleepingcomputer.com/news/security/americans-lost-record-10-billion-to-fraud-in-2023-ftc-warns/  
  
  
Android
XLoader 恶意软件现在可以在安装后自动执行  
  
https://www.bleepingcomputer.com/news/security/android-xloader-malware-can-now-auto-execute-after-installation/  
  
  
Raspberry
Robin 恶意软件升级，出现 Discord 传播和新漏洞  
  
https://thehackernews.com/2024/02/raspberry-robin-malware-upgrades-with.html  
  
  
**漏洞事件**  
  
  
Vulnerability Incidents  
  
Shim
中的一个严重远程代码执行漏洞可能允许攻击者接管易受攻击的 Linux 系统  
  
https://www.securityweek.com/most-linux-systems-exposed-to-complete-compromise-via-shim-vulnerability/  
  
  
CISA 确认新的
Fortinet RCE 漏洞已被积极利用  
  
https://www.bleepingcomputer.com/news/security/new-fortinet-rce-bug-is-actively-exploited-cisa-confirms/  
  
  
针对
Cisco、Fortinet、VMware 产品的新缺陷发布了重要补丁  
  
https://thehackernews.com/2024/02/critical-patches-released-for-new-flaws.html  
  
  
研究人员称攻击者正在大规模利用新的
Ivanti VPN 漏洞  
  
https://techcrunch.com/2024/02/08/researchers-say-attackers-are-mass-exploiting-new-ivanti-vpn-flaw/  
  
  
Fortinet警告：APT  
   
组织在关键基础设施攻击中利用
FortiOS 漏洞  
  
https://www.securityweek.com/fortinet-warns-of-new-fortios-zero-day/  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/AnRWZJZfVaGC3gsJClsh4Fia0icylyBEnBywibdbkrLLzmpibfdnf5wNYzEUq2GpzfedMKUjlLJQ4uwxAFWLzHhPFQ/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1 "")  
  
扫码关注  
  
会杀毒的单反狗  
  
**讲述普通人能听懂的安全故事**  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
