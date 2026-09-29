---
cve: "CVE-2025-0411"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  7-Zip Mark-of-the-Web 绕过漏洞 [CVE-2025-0411] - POC   
 Ots安全   2025-01-23 05:04  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/bL2iaicTYdZn7gtxSFZlfuCW6AdQib8Q1onbR0U2h9icP1eRO6wH0AcyJmqZ7USD0uOYncCYIH7ZEE8IicAOPxyb9IA/640?wx_fmt=gif "")  
  
**CVE-2025-0411 详细信息**  
  
“此漏洞（CVSS SCORE 7.0）允许远程攻击者绕过受影响的 7-Zip 安装上的 Mark-of-the-Web 保护机制。利用此漏洞需要用户交互，即目标必须访问恶意页面或打开恶意文件。特定缺陷存在于存档文件的处理中。从带有 Mark-of-the-Web 的精心设计的存档中提取文件时，7-Zip 不会将 Mark-of-the-Web 传播到提取的文件中。攻击者可以利用此漏洞在当前用户的上下文中执行任意代码。”  
  
**存在漏洞的版本**  
- 24.09之前的所有版本都存在漏洞。  
  
**缓解措施**  
- “更新 7-Zip：从官方 7-Zip 网站下载并安装 24.09 或更高版本。”  
  
- “谨慎对待不受信任的文件：避免打开来自未知或可疑来源的文件，尤其是压缩档案。”  
  
- “利用安全功能：确保您的操作系统和安全软件配置为检测和阻止恶意文件。”  
  
**概念验证**  
  
作为 POC 的一部分，实现了 calc.exe 的一个简单加载器。  
  
**武器化**  
  
该方法是双重压缩触发漏洞的可执行文件。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_gif/rWGOWg48tafia8VicgibPGDmQPcA8SOV9JJIXypabGzAj43ALLsYjZIyEfmxUmO2VUehicP2Hv3xaGOJOCrFjzVEuQ/640?wx_fmt=gif&from=appmsg "")  
  
**送货**  
  
接下来，将双重压缩的 7Zip 文件上传到有效载荷传送服务器（在本例中为 MediaFire），并通过提供恶意 URL 的网络钓鱼电子邮件传送给受害者。下载文件后，可以看到“MotW”（Zone.Identifier - 下载来源）：  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/rWGOWg48tafia8VicgibPGDmQPcA8SOV9JJYiaYrck7VDPmWqTbQ3JINpzich5oMibkIqSum89lTTseDicSJLUBIrq4bg/640?wx_fmt=png&from=appmsg "")  
  
**执行**  
  
作为执行的一部分，受害者需要点击压缩文件并运行可执行文件。      
  
**修补版本**  
  
在这种情况下，使用 7Zip 24.09 版本（已修补），它显示 Windows SmartScreen 警告，该文件来自不受信任的来源（因为它包含 MotW）。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_gif/rWGOWg48tafia8VicgibPGDmQPcA8SOV9JJWBavmLqZkibTg18GuGZqddbKicKjhicfNblWBibBN557z848XxG1swMRdg/640?wx_fmt=gif&from=appmsg "")  
  
**存在漏洞的版本**  
  
在这种情况下，使用 7Zip 24.07 版本（易受攻击），它允许直接执行可执行文件而不显示任何警告（因为它不包含 MotW）。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_gif/rWGOWg48tafia8VicgibPGDmQPcA8SOV9JJz2k1MWv9dIxtmWwicQOxXsyMbjlxeCUib25042vkRicaDfWN4TXr665Fg/640?wx_fmt=gif&from=appmsg "")  
  
**参考**  
- https://www.zerodayinitiative.com/advisories/ZDI-25-045/  
  
- https://nvd.nist.gov/vuln/detail/CVE-2025-0441  
  
- https://securityonline.info/cve-2025-0411-7-zip-security-vulnerability-enables-code-execution-update-now/  
  
**项目地址：**  
  
https://github.com/dhmosfunk/7-Zip-CVE-2025-0411-POC  
  
  
  
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
