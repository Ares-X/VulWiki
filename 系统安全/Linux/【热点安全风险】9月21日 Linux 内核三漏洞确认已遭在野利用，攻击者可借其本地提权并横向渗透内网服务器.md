---
source: "gelusus/wxvl 公众号漏洞文库"
cve: "CVE-2026-53266;CVE-2025-39682;CVE-2025-39964;CVE-2026-10747;CVE-2026-48908;CVE-2026-81657;CVE-2026-82340"
identifier_role: "primary"
primary_identifiers: "CVE-2026-53266;CVE-2025-39682;CVE-2025-39964;CVE-2026-10747;CVE-2026-48908;CVE-2026-81657;CVE-2026-82340"
referenced_identifiers: ""
identifier_status: "unknown"
title: "【热点安全风险】9月21日 Linux 内核三漏洞确认已遭在野利用，攻击者可借其本地提权并横向渗透内网服务器"
product: "Linux三内核漏洞 / IBM MQ / Joomla SP Page Builder / IBM Guardium / 威胁事件"
record_type: "vulnerability"
document_type: "六主题安全风险日报"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
prerequisites: "各项权限/版本不一，Linux本地；MQ/组件宣称未认证；事件另列"
side_effects: "frontmatter仅首个CVE且Linux目录覆盖六主题，应拆多漏洞实体、新闻事件与摘要，不能当一个漏洞或自动编造PoC"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/%E7%B3%BB%E7%BB%9F%E5%AE%89%E5%85%A8/Linux/%E3%80%90%E7%83%AD%E7%82%B9%E5%AE%89%E5%85%A8%E9%A3%8E%E9%99%A9%E3%80%919%E6%9C%8821%E6%97%A5%20Linux%20%E5%86%85%E6%A0%B8%E4%B8%89%E6%BC%8F%E6%B4%9E%E7%A1%AE%E8%AE%A4%E5%B7%B2%E9%81%AD%E5%9C%A8%E9%87%8E%E5%88%A9%E7%94%A8%EF%BC%8C%E6%94%BB%E5%87%BB%E8%80%85%E5%8F%AF%E5%80%9F%E5%85%B6%E6%9C%AC%E5%9C%B0%E6%8F%90%E6%9D%83%E5%B9%B6%E6%A8%AA%E5%90%91%E6%B8%97%E9%80%8F%E5%86%85%E7%BD%91%E6%9C%8D%E5%8A%A1%E5%99%A8.md"
archive_commit: "41940cb0038d09ca5aaddbe5bffb923e423d210f"
source_status: "missing"
source_note: "原始出处待补；仓库归档不等同原始披露"
id: "vw-4ba4becb73fbb84b7067cad9"
entity_id: "ve-4ba4becb73fbb84b7067cad9"
schema_version: "1"
---

# 【热点安全风险】9月21日 Linux 内核三漏洞确认已遭在野利用，攻击者可借其本地提权并横向渗透内网服务器

<!-- vulwiki-editorial-rebuild:system-misc -->
## 条目范围与校订

- 本文对象：Linux三内核漏洞 / IBM MQ / Joomla SP Page Builder / IBM Guardium / 威胁事件
- 文献类型：六主题安全风险日报
- 版本、权限及部署边界：各项权限/版本不一，Linux本地；MQ/组件宣称未认证；事件另列
- 核验状态：仅重建文本校订；未执行文中代码、PoC 或扫描，未把截图或转载声明记为本站复现

### 具体结论与待核项

以下为原归档的逐项勘误与证据缺口；可由文本确定的问题已在下文订正，仍缺来源的事实保持待核。

1. frontmatter仅首个CVE且Linux目录覆盖六主题，应拆多漏洞实体、新闻事件与摘要，不能当一个漏洞或自动编造PoC
2. TLS39682在同库技术稿为UAF7.1而此稿称内存泄漏9.8，修复6.12.3等与其他稿6.12.44等冲突，需官方核验优先
3. 真实组合提权横移与CISA确认在野是不同证据等级，来源只第三方摘要非CISA记录，不能推导完整攻击链
4. 总结CVE-2026-53266/39682/39964把后两2025编号隐式改成年2026，需完整逐条编号
5. IBM全部当前版本与厂商已修复并述范围不清；Guardium缺IBM公告，SP PageBuilder应补厂商/KEV链接
6. 重复泛化处置建议长于事实，保留摘要时带2026-09-21时点/独立来源

### 操作风险

frontmatter仅首个CVE且Linux目录覆盖六主题，应拆多漏洞实体、新闻事件与摘要，不能当一个漏洞或自动编造PoC

技术请求、代码与实验方法按原文保留；其中的破坏性动作仅限授权、可恢复的隔离环境。缺失代码、参数或版本事实不猜补。

### 来源追溯

- 原文参考链接（未重新核验）：<https://aviatrix.ai/threat-research-center/cisa-flags-three-linux-kernel-vulnerabilities-exploited-wild-2026>
- 原文参考链接（未重新核验）：<https://aviatrix.ai/threat-research-center/shinyhunters-hacks-clop-leak-site-threatens-extort-ransomware-gang-2026/>
- 原文参考链接（未重新核验）：<https://nvd.nist.gov/vuln/detail/CVE-2026-10747>
- 原文参考链接（未重新核验）：<https://nvd.nist.gov/vuln/detail/CVE-2026-48908>
- 原文参考链接（未重新核验）：<https://www.elastic.co/security-labs/telepuz-maas-malware-clickfix>
- 原文参考链接（未重新核验）：<https://feed.craftedsignal.io/briefs/2026-09-ibm-guardium-rce>
- 原始披露 URL 未确认；既有归档来源标签保留，不能替代原始公告

### 归档技术正文

 华顺信安威胁情报中心   2026-09-20 23:30  
  
**PART.****0****1**  
  
  
风险汇总  
‍  
‍  
‍  
  
## 风险一：Linux 内核三漏洞被证实遭在野利用，列入 CISA KEV 目录  
  
CISA 于 9 月 18 日将 Linux 内核三个漏洞列入 KEV 目录并确认在野利用：CVE-2026-53266（ebtables 越界写，8.8）、CVE-2025-39682（TLS 内存泄露，9.8）、CVE-2025-39964（AF_ALG 并发写，5.5），均可本地提权或拒绝服务，普遍影响云、容器与裸金属 Linux 底座。攻击者已在真实攻击中组合利用完成提权与横向移动，CISA 要求联邦机构最迟 9 月 21 日完成修复。利用成功后可取得主机完全控制，再借其横向移动扩大战果；云、容器与裸金属混布的环境尤其需要尽快收敛这类提权入口。  
### 建议排查  
1. 清点全部 Linux 服务器与云主机内核版本，核对是否低于对应修复版本（6.12.5 / 6.12.3 / 6.11.8）。  
  
1. 排查本地账号、容器与多租户环境的异常提权迹象（ebtables、TLS、AF_ALG 相关告警）。  
  
1. 关注发行版内核安全更新推送，优先修复公网可达与承载核心业务的主机。  
  
### 加固建议  
1. 按发行版安全公告统一升级内核至修复版本，重启后确认实际加载版本。  
  
1. 收紧本地账号与特权边界，限制高风险服务以本地低权限账号运行。  
  
1. 对云与容器底座启用内核级检测，将提权与横向移动纳入重点  
监测。  
  
### 参考来源  
  
https://aviatrix.ai/threat-research-center/cisa-flags-three-linux-kernel-vulnerabilities-exploited-wild-2026  
  
## 风险二：勒索圈爆发"黑吃黑"，ShinyHunters 攻破 Clop 泄密站并窃走源码与私钥  
  
勒索软件地下圈爆发内讧：ShinyHunters 利用 Clop 团伙泄密站所用 Grav CMS 的未认证任意文件上传漏洞，攻破其 Tor 站点，涂上本方 Umbreon 标志，并称窃走源码、服务器日志与 onion 私钥。起因是 Clop 曾威胁 ShinyHunters（后者破坏过其对企业软件的窃密行动），属报复性"黑吃黑"。该事件打乱了两伙团伙的既有运营节奏，相关数据资产的后续公开节奏变得不确定；对防守方而言，它同样印证：即便攻击者自用的第三方系统，无认证上传一旦暴露也会被反向利用，自建与外包组件都应同等审视暴露面。  
### 建议排查  
1. 核查内部自建网站是否使用 Grav 等开源 CMS，确认相关上传类漏洞是否已修复。  
  
1. 排查是否存在被商业情报平台代理的数据资产，评估二次公开与再次泄露风险。  
  
1. 将地下生态动向纳入风险研判，关注 Clop、ShinyHunters 泄密站数据变化。  
  
### 加固建议  
1. 对自建 CMS、论坛等系统及时升级，并用 WAF 收敛上传与登录接口。  
  
1. 数据泄露处置按勒索事件预案执行，确保离线备份与取证完整。  
  
1. 持续跟踪涉己数据是否出现在公开泄密站，出现则立即通报与处置。  
  
### 参考来源  
  
https://aviatrix.ai/threat-research-center/shinyhunters-hacks-clop-leak-site-threatens-extort-ransomware-gang-2026/  
  
## 风险三：IBM MQ Appliance 满分漏洞无需认证即可远程取代码执行（CVE-2026-10747）  
  
IBM MQ Appliance（消息中间件设备）存在 CVSS 10.0 堆缓冲区溢出漏洞 CVE-2026-10747：协议消息处理在认证前触发，攻击者只需触达设备网络即可远程执行代码或拒绝服务，无需任何凭据，影响全部当前版本。MQ Appliance 常用于银行、政府与大型企业核心消息队列，承载支付、订单等关键业务消息；满分且未认证，一旦公开利用方法出现会迅速武器化，并可作进入内网的入口。厂商已修复，暂无在野利用，仍应按紧急事件优先处置，同步核查消息链路的信任边界。  
### 建议排查  
1. 盘点全部 IBM MQ Appliance 设备型号与固件版本，对照 IBM 安全公告确认修复状态。  
  
1. 核查 MQ 设备是否可从非信任网段访问，识别暴露于企业边界的实例。  
  
1. 检索 MQ 协议异常流量、异常进程与设备异常重启记录，判断是否已有利用迹象。  
  
### 加固建议  
1. 立即按厂商公告为 MQ Appliance 应用修复，并限制管理面与消息端口访问来源。  
  
1. 将消息中间设备纳入关键资产台账，关闭非必要协议端口、最小化网络暴露。  
  
1. 部署针对 MQ 协议流量的异常检测，并把消息设备纳入应急响应范围。  
  
### 参考来源  
  
https://nvd.nist.gov/vuln/detail/CVE-2026-10747  
  
## 风险四：Joomla SP Page Builder 未认证 0day 已在野利用，可上传 PHP 控制整站（CVE-2026-48908）  
  
Joomla 页面构建组件 SP Page Builder 存在未认证任意文件上传漏洞（CVE-2026-48908，10.0）：攻击者可利用未保护的 icon 上传接口上传恶意 PHP 并执行，控制整站甚至创建超级管理员账号，影响 6.6.1 及更早版本，6.6.2 已修复。该漏洞已作为零日在野利用并列入 CISA KEV，与 6 月 JCE、iCagenda 等 Joomla 上传 0day 属同波，大量站点被植入 WebShell。Joomla 在全球拥有庞大建站量，且不少站点缺乏专职运维，上传类 0day 常被批量扫描自动利用，升级窗口越短越有利，服务商应优先排查。  
### 建议排查  
1. 盘点 Joomla 站点是否安装 SP Page Builder 及版本，低于 6.6.2 的列为首要处置对象。  
  
1. 检查站点异常上传的可执行文件、WebShell 与新建立的超级管理员账号。  
  
1. 结合访问日志排查对上传接口的匿名请求与可疑脚本访问记录。  
  
### 加固建议  
1. 将 SP Page Builder 升级至 6.6.2 及以上，并同步核对 JCE、iCagenda 等组件补丁状态。  
  
1. 对上传接口启用文件类型与内容白名单校验，收紧网站目录写权限。  
  
1. 对站点启用文件完整性监控，发现新增可执行文件立即告警并溯源。  
  
### 参考来源  
  
https://nvd.nist.gov/vuln/detail/CVE-2026-48908  
  
## 风险五：恶意软件即服务后门 TELEPUZ 快速扩散，多重隐藏通道对抗检测  
  
安全厂商披露经恶意软件即服务（MaaS）扩散的 Windows 后门 TELEPUZ，2026 年 4 月底起活跃：以诱导运行 PowerShell 载荷开始，落地伪装 DLL 后注册服务、提权、关闭安全监控，收割浏览器与邮箱凭据；命令与控制藏于 Telegram、Steam 与区块链智能合约，并内建反分析。它主要经钓鱼与 ClickFix 社工投放——"运行不明命令"仍是主入口，MaaS 让抗检测组件触手可及。一旦落地，攻击者可长期隐蔽驻留并持续窃取高价值凭据，终端行为检测与凭据保护需前置。  
### 建议排查  
1. 核查终端是否存在异常的 PowerShell 加载、伪装 DLL 落地与新增服务项。  
  
1. 检索安全软件被异常终止、监控被关闭等篡改事件与告警。  
  
1. 关注指向 Telegram、Steam 等非常规通道的异常外联连接。  
  
### 加固建议  
1. 启用终端防护的防篡改与行为检测，对服务终止、脚本加载设置告警。  
  
1. 落实凭据最小化与硬件密钥，优先保护浏览器与邮箱凭据。  
  
1. 对用户开展"勿粘贴运行不明命令、勿轻信客服诱导"的防社工教育。  
  
### 参考来源  
  
https://www.elastic.co/security-labs/telepuz-maas-malware-clickfix  
  
## 风险六：IBM Guardium 数据保护产品曝多枚关键漏洞，未认证即可远程执行代码  
  
IBM Guardium Data Protection 12.2 集中披露一批关键漏洞，其中 CVE-2026-81657 与 CVE-2026-82340 均为未认证反序列化（9.8）：向设备 16017 端口发送构造消息即可在 Collector 等组件执行任意代码；另有认证缺失（9.9）与 SQL 注入等多枚，已有公开利用代码。作为保护数据库的产品，Guardium 自身成为入口，被控后可篡改审计日志、窃取监控数据并横移。多个安全与数据类产品接连曝出自身失守，提示加固清单不能只覆盖业务系统，安全工具本身也须纳入同等级别的补丁与访问治理。  
### 建议排查  
1. 清点所有 Guardium Data Protection 12.2 实例，对照 IBM 公告确认补丁状态。  
  
1. 核查 16017 等管理端口是否暴露于非信任网络，识别越权访问路径。  
  
1. 检查设备日志是否存在异常反序列化调用、非预期进程与管理员操作。  
  
### 加固建议  
1. 立即应用 IBM 修复，无法升级时限制管理接口仅允许受信管理网段访问。  
  
1. 对数据保护、审计类设备实施同样的安全基线与补丁管理，杜绝"防务工具失守"。  
  
1. 将 Guardium 纳入关键资产台账，启用对审计日志与配置改动的联动告警。  
  
### 参考来源  
  
https://feed.craftedsignal.io/briefs/2026-09-ibm-guardium-rce  
  
  
**PART.****02**  
  
  
总体处置建议  
‍  
‍  
‍  
  
## 总结  
  
本期风险的突出特征是"基础设施与攻击者自身同时失守"。最紧迫的是 Linux 内核三漏洞被证实遭在野利用并列入 KEV：云、容器与裸金属底座普遍受影响，攻击者已在真实攻击中组合提权，应作为当前第一优先级完成内核升级。漏洞侧另有两枚重磅：IBM MQ Appliance 的满分未认证远程代码执行，以及 IBM Guardium 数据保护产品自身曝出未认证反序列化漏洞——安全设备自身成为入口，是必须警惕的信号；Joomla SP Page Builder 的未认证 0day 已被用于批量植壳，站点服务商应快速排查。事件侧，ShinyHunters 反向攻破 Clop 泄密站上演"黑吃黑"，再次印证任何自建或第三方系统的外部暴露面都可能被利用；恶意软件即服务后门 TELEPUZ 则提示终端入口仍以社工诱导为主。建议优先处理两枚满分未认证漏洞与内核在野清单，同步加固终端行为检测与上传类接口防护。  
  
## 整体风险处置建议  
1. 以最高优先级完成 Linux 内核升级（CVE-2026-53266/39682/39964），覆盖云、容器与裸金属底座，确保实际加载修复版本。  
  
1. 立即为 IBM MQ Appliance 应用修复，收敛管理面与消息端口暴露，并核查 CVE-2026-81657/82340 等 Guardium 实例补丁状态。  
  
1. 排查全部 Joomla SP Page Builder 至 6.6.2，审计站点 WebShell、超级管理员账号与上传接口异常访问。  
  
1. 对数据保护、消息中间件等安全与关键业务类设备执行同等安全基线，杜绝"防务工具自身失守"。  
  
1. 强化终端行为检测与防篡改，对 PowerShell 加载、异常服务与外联 Telegram/Steam 等通道设置告警。  
  
1. 治理自建与第三方系统的外部暴露面，对上传、登录等接口做好白名单校验与访问收敛。  
  
## 合规说明  
  
以上内容基于公开信息整理，仅用于网络安全防护与管理决策参考，具体影响范围与修复方式请以厂商官方公告为准。  
  
  
![](../../Web%E5%AE%89%E5%85%A8/.resource/remote/a3f3a4b3de615915686aa846b1a7ac233c29628bb2de882291076cff139f46a7.png "")  
  
![](../../Web%E5%AE%89%E5%85%A8/.resource/remote/2b3cfe37d8a711b48f7113a5881c281ea7a816db13ce043475449ca00c96a19a.jpg "")  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原始披露 URL 尚未确认，现有链接按来源追溯区分别标注）
