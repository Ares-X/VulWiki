---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  SCADA系统中存在的特权文件系统漏洞  
博智非攻研究院
                    博智非攻研究院  博智非攻研究院   2026-02-02 08:22  
  
![图片](https://mmbiz.qpic.cn/mmbiz_gif/ibQxG9cezyUYOCE1WKtTJZjTlHOhu42yCbr2tZ6du8qfF7H6ekFKuuO0a0rRUAILMzGTq8yT8UQj4ERZct4Gib9Q/640?wx_fmt=gif&from=appmsg&wxfrom=5&wx_lazy=1&tp=webp#imgIndex=0 "")  
  
  
0  
1  
  
  
**概述**  
  
本文详述了Iconics Suite SCADA中的一个漏洞CVE-2025-0921，成功利用此漏洞可在受影响的系统上造成拒绝服务（DoS）情况。Iconics Suite是监控和数据采集（SCADA）系统的名称。该系统用于控制和监测不同行业的工业过程，包括汽车、能源和制造业。漏洞详情如下：  
  
![](https://mmbiz.qpic.cn/mmbiz_png/ibQxG9cezyUa2s0poGWxI24TFCoicUicKjZxhslkPOgu9jU8So5sWgx2KaJ8Aukl3FPXMqakePzRlsLRvichPAejOQ/640?wx_fmt=png&from=appmsg "")  
  
  
02  
  
  
**漏洞背景**  
  
以提升的权限运行的进程会带来很大的安全风险，尤其是当它们在没有适当访问控制的情况下与敏感文件和目录进行交互时。这称为特权文件系统操作漏洞。此类漏洞可能为攻击者创造机会，利用文件系统操作，如创建、覆盖、复制、移动或删除文件。这些行为可能带来各种安全后果，从DoS、信息泄露到完全的系统沦陷。  
  
  
CVE-2  
025-0921漏洞允许Iconics Suite中的特权文件系统操作，攻击者可能滥用此操作来破坏关键的系统二进制文件，并破坏SCADA系统的可用性和完整性。  
此漏洞可在多种  
场景下被利用。我们的演示利用了先前发现的漏洞CVE-2024-7587，该漏洞通过授予过度的文件权限创造了理想的攻击环境。CVE-2024-7587影响GenBroker32安装程序，该程序授予对C:\ProgramData\ICONICS目录的过度权限，允许系统上的任何用户修改关键的配置文件。  
  
在Iconics Suite中，我们在Pager Agent中发现了此特权文件系统操作漏洞，Pager Agent是AlarmWorX64 MMX功能集的一个组件。AlarmWorX64 MMX是警报管理系统，用于监控工业过程并在出现问题时自动触发警报Pager Agent使管理员能够在AlarmWorX64 MMX中建立自定义的触发器和活动警报。这些警报通过PagerCfg.exe（Pager Agent的配置实用程序）进行管理。该实用程序允许管理员配置通过各种寻呼服务和协议（如SMS、GSM和TAP）传递的警报。下图显示了在Windows主机上运行PagerCfg.exe时显示的Pager Agent配置窗口：  
  
![](https://mmbiz.qpic.cn/mmbiz_png/ibQxG9cezyUa2s0poGWxI24TFCoicUicKjZibftxqVNtIPOZYxhF48RkricGWYuurt3U8fZ1Uibia9wSc9KbUzY8Pic3Yw/640?wx_fmt=png&from=appmsg "")  
  
要配置SMS警报，管理员可以使用上图中显示的SMS Unicode按钮打开SMS配置窗口，下图显示了SMS Unicode配置窗口中的参数。此SMS Unicode配置窗口使系统管理员能够选择设备、波特率和收件人，并编写警报消息正文。  
  
![](https://mmbiz.qpic.cn/mmbiz_png/ibQxG9cezyUa2s0poGWxI24TFCoicUicKjZ8ahjv32PWDv3Yb7rp4f6V5oiaEIHqwicuaPhiasGnGdnq2Nwha15ngg3g/640?wx_fmt=png&from=appmsg "")  
  
此配置窗口还提供了发送测试SMS的选项。除了SMS配置外，PagerCfg.exe还允许管理员定义SMSLogFile的路径，如图所示，日志信息将写入该文件，一旦管理员定义了SMSLogFile路径，应用程序就会将每个SMS操作的每条日志写入此文件。  
  
03  
  
  
**关键配置文件漏洞**  
  
管理员使用PagerCfg.exe配置Pager Agent后，SMSLogFile的路径将保存在C:\ProgramData\ICONICS\IcoSetup64.ini配置文件中。在正常的安全环境中，此配置文件应受到保护，防止非特权用户修改。然而，当系统上安装了GenBroker32时，CVE-2024-7587就开始发挥作用。GenBroker32是Iconics软件套件中包含的一个旧版通信实用程序，它通过在不同的通信协议之间进行转换，帮助旧的工业系统连接到新的Iconics软件。GenBroker32安装程序中的漏洞（CVE-2024-7587）授予系统上每个用户对C:\ProgramData\ICONICS目录的完全读写访问权限，使得任何本地用户都可以写入IcoSetup64.ini配置文件。下图显示了GraphWorX64（Iconics Suite的一个核心HMI/SCADA可视化组件）对C:\ProgramData\ICONICS的权限，这是由GenBroker32安装程序修改的。  
  
![](https://mmbiz.qpic.cn/mmbiz_png/ibQxG9cezyUa2s0poGWxI24TFCoicUicKjZ1MVesDWs0s6ib0UWA7YiabUnj2oicXR72uyxe9T1kRoJL3Ihh4OPYWElA/640?wx_fmt=png&from=appmsg "")  
  
0  
4  
  
  
**利用漏洞**  
  
在攻击者获得了安装GenBroker32的系统的非管理员访问权限的场景下，攻击者可以操纵配置文件内的任何信息，这对于控制应用程序记录SMS活动位置的SMSLogFile路径尤其如此。在安装了GenBroker32的系统上，攻击者可以执行以下步骤来利用CVE-2025-0921（借助CVE-2024-7587的过度权限）发起DoS攻击。  
  
步骤一：  
  
以非管理员用户身份登录后，攻击者可以通过检查位于C:\ProgramData\ICONICS中的IcoSetup64.ini文件来发现SMSLogFile路径。  
  
![](https://mmbiz.qpic.cn/mmbiz_png/ibQxG9cezyUa2s0poGWxI24TFCoicUicKjZC1Qib2v2P7pCUA2A0XGuIx3tHOQkFDrSpDPvfkOHHzLicCmVxFOjXBYQ/640?wx_fmt=png&from=appmsg "")  
  
步骤二：  
  
攻击者从SMSLogFile位置创建一个指向目标二进制文件的特殊符号链接（称为symlinks），攻击者创建此符号链接不需要管理员权限。在我们的安全评估中，我们选择了cng.sys作为目标二进制文件。随后，PagerCfg.exe写入或覆盖此二进制文件的内容，从而损坏目标二进制文件。  
  
cng.sys驱动程序用于Microsoft加密API：下一代（CNG）。CNG为Windows系统组件提供加密服务。cng.sys驱动程序通常位于C:\Windows\System32\drivers目录中。但是，如果cng.sys存在于其父目录C:\Windows\System32中，Windows可能会尝试从C:\Windows\System32加载驱动程序文件，而不是从C:\Windows\System32\drivers加载。  
如果攻击者成功在C:\Windows\System32\cng.sys创建了一个无效驱动程序或损坏了一个有效驱动程序，操作系统将无法启动。这可以通过结合对象管理器符号链接和NTFS挂载点来创建无需管理员权限的文件符号链接来实现。  
  
步骤三：  
  
然后，攻击者将等待管理员通过SMS Unicode配置窗口发送测试消息，或者等待AlarmWorx MMX自动触发警报。下图显示了我们在安全评估期间使用的SMS Unicode配置参数示例，包括SMSLogFile路径：  
  
![](https://mmbiz.qpic.cn/mmbiz_png/ibQxG9cezyUa2s0poGWxI24TFCoicUicKjZOTRbcEx9TZTx9rLfeVtTjZ6sias2HyGjFgkhfPySV3saplOuRfQoZ0w/640?wx_fmt=png&from=appmsg "")  
  
当发送SMS时，此配置会将其日志信息定向到符号链接，从C:\ProgramData\ICONICS\LogFiles\log.txt指向C:\Windows\System32\cng.sys，从而有效地将日志数据重定向到C:\Windows\System32\cng.sys。cng.sys的更改内容现在将包含SMS信息日志数据，而不是预期的二进制代码。我们通过使用CFF Explorer检查C:\Windows\System32\cng.sys来验证这一点，如图所示：  
  
![](https://mmbiz.qpic.cn/mmbiz_png/ibQxG9cezyUa2s0poGWxI24TFCoicUicKjZ8he0CM6EeKby4eacqwCK2VEGrV8d9MYaDwD4H7f3rOpdDI2GG1XB9g/640?wx_fmt=png&from=appmsg "")  
  
步骤四：  
  
重新启动机器后，操作系统将尝试加载C:\Windows\System32\cng.sys。然而，由于新更改的文件是日志文件而不是有效的驱动程序，加载过程将失败。此失败将导致操作系统卡在失败的修复模式中，如下图所示：  
  
![](https://mmbiz.qpic.cn/mmbiz_png/ibQxG9cezyUa2s0poGWxI24TFCoicUicKjZQuRXONmvSOic3pEyhwQfd24P8P639QHJ4B30J2fIUOcy2ZpbwJyJX1g/640?wx_fmt=png&from=appmsg "")  
  
  
总结这种DoS攻击方法：  
  
当以没有管理员权限的本地用户身份登录时，攻击者首先会识别管理员之前在IcoSetup64.ini文件中设置的SMSLogFile路径。- 然后，通过创建符号链接，攻击者将损坏一个关键二进制文件，如cng.sys驱动程序。攻击者随后等待管理员触发SMS，将日志信息重定向到cng.sys文件，这会导致cng.sys驱动程序的损坏版本。  
  
重新启动后，操作系统将尝试加载损坏的驱动程序但会失败。这将导致启动失败，使机器处于修复模式，从而对关键的OT工程工作站造成DoS攻击。  
  
即使我们之前威胁研究文章中描述的漏洞CVE-2024-7587不存在，如果日志文件通过其他方式变得可供非特权用户写入，攻击者仍然可以利用CVE-2025-0921。例如，这可能包括配置错误、替代漏洞或修改文件权限的社会工程学攻击。   
  
  
05  
  
  
**结 论**  
  
人们常常忽视攻击者滥用特权文件系统操作的可能性，无论它们对运行这些进程的系统构成多大危险，当这些漏洞在OT环境中被发现时，这一点尤其重要。  
  
在Microsoft Windows版本10.97.2及更早的Iconics Suite中发现漏洞，突显了强有力的安全措施的重要性。主动措施可以帮助缓解这些漏洞，防范潜在的利用。  
  
  
06  
  
  
**参 考**  
  
1.  
https://unit42.paloaltonetworks.com/iconics-suite-cve-2025-0921//  
  
  
![](https://mmbiz.qpic.cn/mmbiz_png/ibQxG9cezyUa2s0poGWxI24TFCoicUicKjZ1OWXibAZz592pZN9ojtZPOBib8RxMn5UYuyQGnibKVJEMEPzQad5Wmspg/640?wx_fmt=png&from=appmsg "")  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
