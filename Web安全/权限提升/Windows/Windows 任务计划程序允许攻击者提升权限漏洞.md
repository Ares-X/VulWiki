---
cve: "CVE-2025-33067"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  Windows 任务计划程序允许攻击者提升权限漏洞  
 网安百色   2025-06-13 11:30  
  
Windows Task Scheduler 中存在一个重大安全漏洞，使得攻击者能够将其权限升级到 SYSTEM 级别访问权限，而无需初始管理权限。  
  
此特权提升漏洞被指定为 CVE-2025-33067，它影响多个版本的 Windows作系统，并已被分配为“重要”严重性评级，CVSS 评分为 8.4。  
  
该漏洞源于 Windows 内核的任务计划组件中权限管理不当，使未经授权的本地攻击者能够获得完整的系统控制权。  
  
Microsoft 于 2025 年 6 月 10 日发布了全面的安全更新，解决了所有受支持的 Windows 平台（从旧版 Windows 10 安装到最新的 Windows Server 2025 部署）中的缺陷。  
## Windows Task Scheduler 漏洞  
  
该漏洞被归类为 Improper Privilege Management，表示 Windows Task Scheduler 处理计划任务权限的方式存在严重缺陷。  
  
根据 Microsoft 的安全公告，攻击媒介完全是本地的 （AV：L），复杂度低 （AC：L），不需要事先权限 （PR：N），也不需要用户交互 （UI：N）。  
  
这种组合使漏洞特别危险，因为一旦攻击者获得对系统的初始访问权限，它就会为权限提升提供直接途径。  
  
CVSS 向量字符串 CVSS：3.1 表示机密性、完整性和可用性的最大影响评级，所有评级均为“高”。  
  
该漏洞允许攻击者利用权限处理缺陷，该漏洞允许在特定条件下与某些计划任务进行交互，最终导致 SYSTEM 权限，这是 Windows 环境中的最高访问级别。  
  
安全研究员 Alexander Pudwill 因通过协调披露协议发现并负责任地披露此漏洞而受到赞誉。  
  
<table><tbody><tr style="box-sizing: border-box;"><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;"><strong msttexthash="14330498" msthash="71" style="box-sizing: border-box;font-weight: bold;"><span leaf="">风险因素</span></strong></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;"><strong msttexthash="3259074" msthash="72" style="box-sizing: border-box;font-weight: bold;"><span leaf="">详</span></strong></td></tr><tr style="box-sizing: border-box;"><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;"><section><span leaf="">受影响的产品</span></section></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;"><section><span leaf="">– Windows 10（版本 1607/1809/21H2/22H2）- Windows 11 （22H2/23H2/24H2）- Windows Server 2016-2025- 服务器核心安装 - ARM64/x64/32 位架构</span></section></td></tr><tr style="box-sizing: border-box;"><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;"><section><span leaf="">冲击</span></section></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;"><section><span leaf="">权限提升到 SYSTEM 级别</span></section></td></tr><tr style="box-sizing: border-box;"><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;"><section><span leaf="">利用先决条件</span></section></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;"><section><span leaf="">– 本地系统访问 （AV：L）- 无需事先权限 （PR：N）- 无需用户交互 （UI：N）- 低攻击复杂性 （AC：L）- Windows 任务计划程序组件交互</span></section></td></tr><tr style="box-sizing: border-box;"><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;"><section><span leaf="">CVSS 3.1 分数</span></section></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;"><section><span leaf="">8.4 （重要）</span></section></td></tr></tbody></table>## 受影响的系统和安全更新  
  
Microsoft 的安全响应涵盖广泛的 Windows 平台，在 27 种不同的 Windows 配置中同时发布安全更新。  
  
受影响的系统包括从原始版本（版本 1607）到当前 22H2 版本的 Windows 10 版本、所有 Windows 11 版本，包括最新的 24H2，以及从 Windows Server 2016 到最新的 Windows Server 2025 的服务器平台。  
  
关键安全更新包包括适用于 Windows Server 2016 和 Windows 10 版本 1607 系统（内部版本 10.0.14393.8148）的KB5061010、适用于原始 Windows 10 安装的KB5060998（内部版本 10.0.10240.21034）以及适用于 Windows Server 2025 和 Windows 11 版本 24H2（内部版本 10.0.26100.4349/10.0.26100.4270）的 KB5060842/KB5060841。  
  
Windows 11 版本 23H2 和 22H2 系统需要 KB5060999（内部版本 10.0.22631.5472），而 Windows 10 版本 22H2 和 21H2 安装需要KB5060533（内部版本 10.0.19045.5965 和 10.0.19044.5965，分别为）。  
  
组织应优先在所有 Windows 系统中立即部署 2025 年 6 月 10 日的安全更新。  
  
该漏洞的“利用可能性较小”评估提供了一些保证，因为 Microsoft 表示，虽然该漏洞在技术上是可利用的，但尚未在野外观察到主动利用尝试。  
  
应关注具有高价值数据或可能不受信任的用户可访问的系统，因为本地攻击媒介通常需要通过其他方式（如网络钓鱼、物理访问或利用其他漏洞）进行初始系统访问。  
  
**免责声明**  
：  
  
本公众号所载文章为本公众号原创或根据网络搜索下载编辑整理，文章版权归原作者所有，仅供读者学习、参考，禁止用于商业用途。因转载众多，无法找到真正来源，如标错来源，或对于文中所使用的图片、文字、链接中所包含的软件/资料等，如有侵权，请跟我们联系删除，谢谢！  
  
![图片](https://mmbiz.qpic.cn/mmbiz_jpg/1QIbxKfhZo5lNbibXUkeIxDGJmD2Md5vKicbNtIkdNvibicL87FjAOqGicuxcgBuRjjolLcGDOnfhMdykXibWuH6DV1g/640?wx_fmt=other&from=appmsg&wxfrom=5&wx_lazy=1&wx_co=1&tp=webp "")  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
