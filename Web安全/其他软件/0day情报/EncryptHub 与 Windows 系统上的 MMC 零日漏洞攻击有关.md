---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  EncryptHub 与 Windows 系统上的 MMC 零日漏洞攻击有关   
Rhinoer  犀牛安全   2025-04-13 16:01  
  
![](https://mmbiz.qpic.cn/mmbiz_png/qvpgicaewUBn7w4ic9RfBzVVLHEo3j6zlv5hlx9hkofJ2iaP7NqxxdGtAMGw1Vh0VTUuILLL824d2tXIShk8JugUw/640?wx_fmt=png&from=appmsg "")  
  
一个名为 EncryptHub 的攻击者被发现与利用本月修补的 Microsoft 管理控制台漏洞的 Windows 零日漏洞攻击有关。  
  
趋势科技员工研究员 Aliakbar Zahravi 发现，这种安全功能绕过（被称为“MSC EvilTwin”，目前跟踪为CVE-2025-26633）存在于易受攻击的设备上处理 MSC 文件的方式中。  
  
攻击者可以利用此漏洞逃避 Windows 文件信誉保护并执行代码，因为在未修补的设备上加载意外的 MSC 文件之前没有警告用户。  
  
微软在本月补丁星期二发布的公告中解释道：“在电子邮件攻击场景中，攻击者可以通过向用户发送特制文件并说服用户打开文件来利用此漏洞。在基于 Web 的攻击场景中，攻击者可以托管一个网站（或利用接受或托管用户提供内容的受感染网站），其中包含旨在利用此漏洞的特制文件。”  
  
在向微软报告漏洞之前，趋势科技的研究人员就发现了一些攻击，其中 EncryptHub（也称为 Water Gamayun 或 Larva-208）利用 CVE-2025-26633 零日漏洞执行恶意代码并从受感染的系统中窃取数据。  
  
在整个活动中，攻击者部署了与之前的 EncryptHub 攻击相关的多个恶意负载，包括 EncryptHub 窃取程序、DarkWisp 后门、SilentPrism 后门、Stealc、Rhadamanthys 窃取程序和基于 PowerShell 的 MSC EvilTwin 木马加载程序。  
  
![](https://mmbiz.qpic.cn/mmbiz_png/qvpgicaewUBn7w4ic9RfBzVVLHEo3j6zlv1GkGs8HsyvQ5NnCRutvjlVibeKSnomTyiawggLSPQ5zBLicI2BWwussibA/640?wx_fmt=png&from=appmsg "")  
  
Zahravi在周二发布的一份报告中表示： “在这次攻击中，攻击者操纵 .msc 文件和多语言用户界面路径 (MUIPath) 来下载和执行恶意负载，保持持久性并从受感染的系统中窃取敏感数据。”  
  
此活动正在积极开发中；它采用多种交付方法和自定义负载，旨在保持持久性并窃取敏感数据，然后将其泄露给攻击者的命令和控制（C＆C）服务器。  
  
在分析这些攻击时，趋势科技还发现了 2024 年 4 月事件中使用的该技术的早期版本。  
  
网络威胁情报公司 Prodaft 此前曾将 EncryptHub 与全球至少 618 家组织遭受鱼叉式网络钓鱼和社会工程攻击后的违规行为联系起来。  
  
作为 RansomHub 和 BlackSuit 勒索软件行动的附属机构，EncryptHub 还在窃取敏感文件后部署勒索软件负载来加密受害者的文件。  
  
本月，微软还修补了 Windows Win32 内核子系统中的一个零日漏洞 (CVE-2025-24983)，该漏洞自 2023 年 3 月以来就已在攻击中被利用。  
  
  
信息来源：  
BleepingComputer  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
