---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  新的UEFI漏洞使得针对技嘉、微星、华硕和华擎主板的预启动攻击成为焦点  
Rhinoer  犀牛安全   2026-01-11 16:00  
  
![](https://mmbiz.qpic.cn/mmbiz_png/qvpgicaewUBmMMwaqibcJJpIx8sVQHD98icrFnF2BkFfyWcf82MLhXrpRYVDPrnCZHbjelRbTqf9NyLFY6icxQxNTQ/640?wx_fmt=png&from=appmsg "")  
  
华硕、技嘉、微星和华擎等厂商的部分主板的 UEFI 固件实现存在漏洞，容易受到直接内存访问 (DMA) 攻击，这种攻击可以绕过早期启动内存保护。  
  
由于不同厂商的实现方式不同，该安全问题获得了多个标识符（CVE-2025-11901、CVE-2025-14302、CVE-2025-14303 和 CVE-2025-14304）。  
  
DMA 是一种硬件功能，它允许显卡、Thunderbolt 设备和 PCIe 设备等设备直接读写 RAM，而无需 CPU 参与。  
  
IOMMU 是一种硬件强制执行的内存防火墙，位于设备和 RAM 之间，控制每个设备可以访问哪些内存区域。  
  
在启动初期，UEFI 固件初始化时，IOMMU 必须先激活才能进行 DMA 攻击；否则，将无法通过物理访问来阻止对内存区域的读写操作。  
  
Valorant 无法在易受攻击的系统上启动  
  
该漏洞由 Riot Games 的研究人员 Nick Peterson 和 Mohamed Al-Sharifi 发现。它会导致 UEFI 固件显示 DMA 保护已启用，即使 IOMMU 没有正确初始化，从而使系统容易受到攻击。  
  
Peterson 和 Al-Sharifi 负责任地披露了安全问题，并与 台湾CERT合作 协调应对措施，联系受影响的供应商。  
  
研究人员解释说，当计算机系统启动时，它处于“最高特权状态：它拥有对整个系统和所有连接的硬件的完全、不受限制的访问权限”。  
  
只有在加载初始固件（通常是 UEFI）后，保护功能才会生效。UEFI 会以安全的方式初始化硬件和软件。操作系统是启动序列中最后加载的组件之一。  
  
在存在安全漏洞的系统上，部分 Riot Games 的游戏，例如热门游戏《Valorant》，将无法启动。这是由于内核级 Vanguard 系统的存在，该系统旨在防止作弊行为。  
  
![](https://mmbiz.qpic.cn/mmbiz_png/qvpgicaewUBmMMwaqibcJJpIx8sVQHD98icmA1VpBzhAicbOh3au9KUfsr4HnjuhKew52iaCbxHxFLhLnuc4FGibwTHg/640?wx_fmt=png&from=appmsg "")  
  
虽然研究人员从游戏行业的角度描述了这种漏洞，即作弊程序可以提前加载，但安全风险也延伸到可能破坏操作系统的恶意代码。  
  
这些攻击需要物理访问权限，恶意 PCIe 设备需要在操作系统启动前连接，以发起 DMA 攻击。在此期间，恶意设备可以自由读取或修改 RAM。  
  
卡内基梅隆大学 CERT 协调中心 (CERT/CC) 发布的公告称：“尽管固件声称 DMA 保护处于活动状态，但在启动序列的早期交接阶段，它未能正确配置和启用 IOMMU。”  
  
这一漏洞使得具有物理访问权限的恶意 DMA 功能外围组件互连高速 (PCIe) 设备能够在操作系统级别的安全措施建立之前读取或修改系统内存。  
  
由于攻击发生在操作系统启动之前，因此安全工具不会发出警告，不会弹出权限提示，也不会发出警报通知用户。  
  
影响广泛，已得到证实  
  
卡内基梅隆大学 CERT/CC 确认，该漏洞会影响华擎、华硕、技嘉和微星的部分主板型号，但其他硬件制造商的产品也可能受到影响。  
  
各厂商受影响的具体型号已在厂商发布的安全公告和固件更新中列出（华硕、微星、技嘉、华擎）。  
  
建议用户在备份重要数据后，检查是否有可用的固件更新并进行安装。  
  
Riot Games 更新了 Vanguard，这是一款内核级反作弊系统，可为 Valorant 和英雄联盟等游戏提供针对机器人和脚本的保护。  
  
如果系统受到 UEFI 漏洞的影响，Vannguard 将阻止 Valorant 启动，并弹出窗口提示用户，提供启动游戏所需的详细信息。   
  
Riot Games 的研究人员表示：“我们的 VAN:Restriction 系统是 Vanguard 向您表明，由于已禁用的安全功能，我们无法保证系统完整性的一种方式。”  
  
  
信息来源 ：  
BleepingComputer  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
