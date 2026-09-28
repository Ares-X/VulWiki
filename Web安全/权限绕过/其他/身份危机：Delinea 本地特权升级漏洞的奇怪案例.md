---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  身份危机：Delinea 本地特权升级漏洞的奇怪案例   
 Ots安全   2024-07-27 16:39  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/bL2iaicTYdZn7gtxSFZlfuCW6AdQib8Q1onbR0U2h9icP1eRO6wH0AcyJmqZ7USD0uOYncCYIH7ZEE8IicAOPxyb9IA/640?wx_fmt=gif "")  
  
在最近的一次客户接触中，CyberArk Red Team 发现并利用了 Delinea 权限管理器（以前称为 Thycotic 权限管理器）中的特权提升 (EoP) 漏洞 ( CVE-2024-39708 )。此漏洞允许非特权用户以 SYSTEM 身份执行任意代码。作为我们致力于为安全社区做出贡献的承诺的一部分，CyberArk 负责任地向 Delinea 披露了此漏洞，包括漏洞利用概念验证 (POC) 代码。  
  
分析CVE-2024-39708  
  
适用于 Windows 12.0.1096 之前的版本 Delinea Privilege Manager 容易受到动态链接库 (DLL) 搜索顺序劫持漏洞的影响，该漏洞允许非特权用户以 SYSTEM 身份执行任意代码。  
  
代理服务启动后，会尝试从以下路径按顺序加载httpapi.dll ：  
- C:\Windows\Temp\Arellia\AmsAgent\Cache\ArelliaAgent\assembly\dl3\7f9cbee9\00bbcf35_70d5d901\  
  
- C:\Program Files\Thycotic\Agents\Agent\  
  
- C:\Windows\System32\  
  
如图 1 所示，代理服务在 Windows 临时目录和应用程序安装目录中找不到 DLL 后，成功从System32目录加载httpapi.dll 。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/rWGOWg48tadmVOdM5ao2uSzDS930qALFA1LkN5qSHuN9icGlZiabqhibxv5IZLH7eqdUl8xJcdicWak9OhFvSd37DQ/640?wx_fmt=webp&from=appmsg "")  
  
图 1：DLL 搜索顺序 - 代理服务 httpapi.dll  
  
默认情况下，Windows 授予非特权用户将文件和文件夹写入C:\Windows\Temp 的权限，除非另有说明，否则此默认的自由访问控制列表 (DACL) 将被子目录继承。如图 2 所示，由于继承了 DACL，Users 组可以写入C:\Windows\Temp\Arellia\AmsAgent\Cache\ArelliaAgent\assembly\dl3\7f9cbee9\00bbcf35_70d5d901 中的文件和文件夹。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/rWGOWg48tadmVOdM5ao2uSzDS930qALF3Hibk74d5iazSaVh5sMBEfr12Dia7ZWjFJXTia1KulNP8BV0ib6dBStS8tQ/640?wx_fmt=webp&from=appmsg "")  
  
图 2：用户权限  
  
**C:\Windows\Temp\Arellia\AmsAgent\Cache\ArelliaAgent\assembly\dl3\7f9cbee9\00bbcf35_70d5d901**  
  
由于 DACL 较弱，非特权用户可以在目录中植入自定义的httpapi.dll二进制文件，以便在服务重新启动时找到并加载该 DLL，从而以 SYSTEM 身份执行任意代码。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/rWGOWg48tadmVOdM5ao2uSzDS930qALFpHqiboMxH7nVmYpeBrIZ7icJYeBPhzI2T6YUgozIKLIA3N4ELWLAZDdA/640?wx_fmt=webp&from=appmsg "")  
  
图 3：DLL 搜索顺序劫持  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/rWGOWg48tadmVOdM5ao2uSzDS930qALFPh3kjJ6CYtXufTzNJmgSdX7D1dNU4N146rjgaZDdSib0M5qMlQX0kmw/640?wx_fmt=webp&from=appmsg "")  
  
图4：以SYSTEM身份执行  
  
代理服务不允许非特权用户手动重启它；但是，我们可以通过重新启动系统或对某些 MSI 安装使用巧妙的技巧来强制重新启动服务并随后加载我们的 DLL。即使配置了NoModify设置（通过“应用程序和功能”Windows 设置禁用任何安装修改），也可以使用缓存的安装包或安装产品代码执行安装修复操作。  
  
使用 MSI 包安装软件时，Windows 会将包缓存在C:\Windows\Installer目录中，文件名由 Windows 安装程序选择。我们可以在命令行上通过识别目标安装的缓存包（例如，通过文件的Author 和 Subject属性）来执行修复操作。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/rWGOWg48tadmVOdM5ao2uSzDS930qALFhAHpJg96dLw4e4cdVEWAoXKYkhr5LibL22StKFTTPNmicicXbWhLO85dQ/640?wx_fmt=webp&from=appmsg "")  
  
图 5：C:\Windows\Installer  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/rWGOWg48tadmVOdM5ao2uSzDS930qALF0cddlkGPFw0NNBmtrF7zYyZkbvdFUHCCfw1CiaibjGvmcqO2Xsf2uQ4A/640?wx_fmt=webp&from=appmsg "")  
  
图 6：MSI 修复安装  
  
或者，可以从 WMI 数据库或 Windows 注册表中检索安装产品代码，并可以通过命令行或应用程序安装和服务Win32 API 执行修复操作。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/rWGOWg48tadmVOdM5ao2uSzDS930qALFGN0mq3UAeTTicacojorBpGDvPsRfpKtfBWItrUzfxtVk4Ooe4Dqic7cQ/640?wx_fmt=webp&from=appmsg "")  
  
图 7：WMI 获取安装产品代码  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/rWGOWg48tadmVOdM5ao2uSzDS930qALFKgERBRnT4UtAUWQL2zec9cYTPQIMlibI7cIjUYLuicFrv0fX8J4O3pTg/640?wx_fmt=webp&from=appmsg "")  
  
图 8：按产品代码安装 MSI 修复程序  
  
CVE-2024-39708 披露时间表  
  
2024 年 5 月 29 日：CyberArk 向 Delinea 报告了该漏洞并要求分配 CVE。  
  
2024 年 5 月 29 日：Delinea 承认收到了披露。  
  
2024 年 6 月 5 日：CyberArk 跟进 Delinea，确认使用提供的概念证明 (POC) 成功重现了该漏洞。  
  
2024 年 6 月 5 日：Delinea 确认正在内部测试修复方法。  
  
2024 年 6 月 11 日：CyberArk 收到 Delinea 的确认，确认分配 CVE。  
  
2024 年 7 月 1 日：Delinea 发布修复代理版本 12.0.1096。  
  
了解 CyberArk Red Team Services 用来模拟真实对手并防范漏洞的高级策略。探索CyberArk 上的 Red Team Services，详细了解这些策略如何帮助加强防御。  
  
```
Identity Crisis: The Curious Case of a Delinea Local Privilege Escalation Vulnerability
https://www.cyberark.com/resources/threat-research-blog/identity-crisis-the-curious-case-of-a-delinea-local-privilege-escalation-vulnerability
```  
  
  
  
  
感谢您抽出  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Ljib4So7yuWgdSBqOibtgiaYWjL4pkRXwycNnFvFYVgXoExRy0gqCkqvrAghf8KPXnwQaYq77HMsjcVka7kPcBDQw/640?wx_fmt=gif "")  
  
.  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Ljib4So7yuWgdSBqOibtgiaYWjL4pkRXwycd5KMTutPwNWA97H5MPISWXLTXp0ibK5LXCBAXX388gY0ibXhWOxoEKBA/640?wx_fmt=gif "")  
  
.  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Ljib4So7yuWgdSBqOibtgiaYWjL4pkRXwycU99fZEhvngeeAhFOvhTibttSplYbBpeeLZGgZt41El4icmrBibojkvLNw/640?wx_fmt=gif "")  
  
来阅读本文  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Ljib4So7yuWge7Mibiad1tV0iaF8zSD5gzicbxDmfZCEL7vuOevN97CwUoUM5MLeKWibWlibSMwbpJ28lVg1yj1rQflyQ/640?wx_fmt=gif "")  
  
**点它，分享点赞在看都在这里**  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
