---
source: "gelusus/wxvl 公众号漏洞文库"
title: "Mandiant报告：APT黑客利用VMware漏洞作为0day漏洞攻击长达两年"
product: "VMware vCenter/UNC3886"
record_type: "incident"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
primary_identifiers: ""
referenced_identifiers: "CVE-2023-34048"
identifier_role: "reference"
source_status: "unknown"
prerequisites: "原文未完整说明身份权限、部署配置和可达性；不能假定匿名、默认开启或所有版本适用。"
side_effects: "含资源消耗、延时或崩溃验证：可能影响服务可用性；限制请求次数、并发与超时，保留无攻击负载的对照结果。"
id: "vw-cceb0ddb995ebc5253e72060"
entity_id: "ve-cceb0ddb995ebc5253e72060"
schema_version: "1"
---

# Mandiant报告：APT黑客利用VMware漏洞作为0day漏洞攻击长达两年

<!-- vulwiki-editorial:start -->
## 校订与适用边界


### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- Mandiant是报告者非漏洞产品
- 34048/20867/41328为不同链阶段不可同实体
- 称Mandiant修补实际产品修补主体VMware
- 不具EDR所以更容易检测阻止语义反转
- 原文链接折行损坏但另处完整
- 无修复版本且大量资讯导航污染，保留原始Mandiant链接与日期

### 操作风险与资料使用

- 含资源消耗、延时或崩溃验证：可能影响服务可用性；限制请求次数、并发与超时，保留无攻击负载的对照结果。

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

 军哥网络安全读报   2024-01-20 09:01  
  
**导****读**  
  
  
  
至少自 2021 年底以来，一个某国黑客组织一直在利用一个关键的 vCenter Server 漏洞 (CVE-2023-34048)
作为  
0day  
漏洞攻击。  
  
![](https://mmbiz.qpic.cn/mmbiz_png/AnRWZJZfVaENpJ1SjpMDo3Z9FGm6AjmqhLxlHIWH9icOOYLDL8hialKZKia1v48GSEkwLxIia2ib58NY0btEVp66BtA/640?wx_fmt=png&from=appmsg "")  
  
该漏洞已于去年 10
月得到修复，VMware本周三确认（  
https://www.bleepingcomputer.com/news/security/vmware-confirms-critical-vcenter-flaw-now-exploited-in-attacks/）其已发现
CVE-2023-34048 的野外利用情况，但没有透露有关攻击的任何其他详细信息。  
  
  
谷歌旗下的安全公司 Mandiant 透露，CVE-2023-34048  
   
漏洞被 UNC3886 网络间谍组织利用，该活动于 2023 年 6 月曝光。  
  
  
网络间谍组织利用它破坏目标的
vCenter 服务器并窃取凭证，通过恶意制作的 vSphere 安装捆绑包 (VIB) 在 ESXi 主机上部署 VirtualPita 和
VirtualPie 后门。  
  
  
在下一阶段，他们利用CVE-2023-20867
VMware Tools 身份验证绕过漏洞来升级权限、收集文件并将其从来宾虚拟机中窃取。  
  
  
虽然到目前为止，Mandiant
并不知道攻击者如何获得对受害者 vCenter 服务器的特权访问，但在 2023 年末，VMware vmdird 服务崩溃，在后门部署前几分钟，与
CVE-2023-34048 漏洞利用紧密匹配，从而使这种联系变得明显。。  
  
![](https://mmbiz.qpic.cn/mmbiz_png/AnRWZJZfVaENpJ1SjpMDo3Z9FGm6AjmqtsiaXSTw4ODG05nDV19XNibQdfabPOTSNl0O5gbIzNNN7kI2S7tmlPkg/640?wx_fmt=png&from=appmsg "")  
  
UNC3886攻击链（Mandiant）  
  
  
Mandiant周五的报告（  
https://www.mandiant.com/resources/blog/chinese-vmware-exploitation-since-2021）中表示：“虽然
Mandiant 于 2023 年 10 月公开报告并修补了该漏洞，但 Mandiant 在 2021 年底至 2022 年初期间观察到多个 UNC3886
案例中的这些崩溃，这为攻击者访问此漏洞留下了大约一年半的时间。”  
  
  
“观察到这些崩溃的大多数环境都保留了日志条目，但‘vmdird’核心转储本身已被删除。  
  
  
“VMware
的默认配置会在系统上无限期地保留核心转储，这表明攻击者故意删除了核心转储，以试图掩盖其踪迹。”  
  
  
UNC3886
以专注于美国和亚太及日本地区的国防、政府、电信和技术部门的组织而闻名。  
  
  
APT  
组织最喜欢的目标是防火墙和虚拟化平台中的  
0day  
安全漏洞，这些平台不具备端点检测和响应（EDR）功能，可以更轻松地检测和阻止其攻击。  
  
  
  
3
月份，Mandiant 透露，他们还在同一活动中滥用了 Fortinet   
0day  
漏洞(CVE-2022-41328)，以破坏
FortiGate 防火墙设备并安装以前未知的 Castletap 和 Thincrust 后门。  
  
  
Fortinet
当时表示：“这次攻击具有很强的针对性，有一些迹象表明是首选政府或与政府相关的目标。”  
  
  
“该漏洞需要对
FortiOS 和底层硬件有深入的了解。定制植入表明攻击者具有高级功能，包括对 FortiOS 的各个部分进行逆向工程。”  
  
  
**参考链接：**  
https://www.bleepingcomputer.com/news/security/  
chinese  
-hackers-exploit-vmware-bug-as-zero-day-for-two-years/  
  
![](https://mmbiz.qpic.cn/mmbiz_svg/McYMgia19V0WHlibFPFtGclHY120OMhgwDUwJeU5D8KY3nARGC1mBpGMlExuV3bibicibJqMzAHnDDlNa5SZaUeib46xSzdeKIzoJA/640?wx_fmt=svg "")  
  
**今日安全资讯速递**  
  
  
  
**APT事件**  
  
  
Advanced Persistent Threat  
  
Mandiant  
报告：  
APT  
黑客利用VMware漏洞作为0day漏洞攻击长达两年  
  
https://www.bleepingcomputer.com/news/security/chinese-hackers-exploit-vmware-bug-as-zero-day-for-two-years/  
  
  
随着 VPN
缺陷的利用增加，Ivanti EPMM 漏洞成为攻击目标  
  
https://www.securityweek.com/ivanti-epmm-vulnerability-targeted-in-attacks-as-exploitation-of-vpn-flaws-increases/  
  
  
谷歌：俄罗斯 FSB
黑客部署新的 Spica 后门恶意软件  
  
https://www.bleepingcomputer.com/news/security/google-russian-fsb-hackers-deploy-new-spica-backdoor-malware/  
  
  
伊朗网络钓鱼活动针对以色列-哈马斯冲突相关的知名研究人员  
  
https://www.infosecurity-magazine.com/news/iranian-phishing-israel-hamas/  
  
  
**一般威胁事件**  
  
  
General Threat Incidents  
  
TeamViewer
在新的勒索软件攻击中被滥用来破坏网络  
  
https://www.bleepingcomputer.com/news/security/teamviewer-abused-to-breach-networks-in-new-ransomware-attacks/  
  
  
勒索软件组织针对富士康子公司
Foxsemicon  
  
https://www.securityweek.com/ransomware-group-targets-foxconn-subsidiary-foxsemicon/  
  
  
North
Face、Vans、Timberland制造商VF Corp表示，勒索软件攻击造成的数据泄露影响了  
 3500   
万人  
  
https://www.securityweek.com/vf-corp-says-data-breach-resulting-from-ransomware-attack-impacts-35-million/  
  
  
僵尸网络劫持智能电视占用黄金时段推送战争内容  
  
https://www.theregister.com/2024/01/18/bigpanzi_botnet_smart_tvs/  
  
  
专家警告 macOS
后门隐藏在流行软件的盗版版本中  
  
https://thehackernews.com/2024/01/experts-warn-of-macos-backdoor-hidden.html  
  
  
Npm 木马绕过
UAC，使用“Os兼容”软件包安装 AnyDesk  
  
https://thehackernews.com/2024/01/npm-trojan-bypasses-uac-installs.html  
  
  
**漏洞事件**  
  
  
Vulnerability Incidents  
  
VMware
vCenter Server 漏洞（CVE-2023-34048）被广泛利用  
  
https://www.securityweek.com/vmware-vcenter-server-vulnerability-exploited-in-wild/  
  
  
未修补的Rapid
SCADA 漏洞使工业组织面临攻击  
  
https://www.securityweek.com/unpatched-rapid-scada-vulnerabilities-could-expose-industrial-organizations-to-attacks/  
  
  
Citrix NetScaler、Google Chrome  
 0day  
漏洞已添加到 CISA 的利用漏洞目录中  
  
https://www.scmagazine.com/brief/citrix-netscaler-google-chrome-zero-days-added-to-cisas-exploited-vulnerabilities-catalog  
  
  
苹果、高通和 AMD
GPU 容易使人工智能数据面临风险  
  
https://www.spiceworks.com/it-security/vulnerability-management/news/apple-qualcomm-amd-gpus-artificial-intelligence-data-risk/  
  
  
PixieFail
UEFI 缺陷使数百万台计算机面临 RCE、DoS 和数据盗窃  
  
https://thehackernews.com/2024/01/pixiefail-uefi-flaws-expose-millions-of.html  
  
  
开源人工智能
(AI) 和机器学习 (ML) 平台中发现严重漏洞，CVSS 得分为 10  
  
https://www.securityweek.com/critical-vulnerabilities-found-in-ai-ml-open-source-platforms/  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/AnRWZJZfVaGC3gsJClsh4Fia0icylyBEnBywibdbkrLLzmpibfdnf5wNYzEUq2GpzfedMKUjlLJQ4uwxAFWLzHhPFQ/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1 "")  
  
扫码关注  
  
会杀毒的单反狗  
  
**讲述普通人能听懂的安全故事**  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
