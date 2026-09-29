---
cve: "CVE-2024-12754"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  AnyDesk 漏洞PoC发布，利用该漏洞通过壁纸获取管理员权限   
会杀毒的单反狗  军哥网络安全读报   2025-02-11 01:01  
  
**导****读**  
  
  
  
流行的远程桌面软件 AnyDesk 最近披露了一个漏洞，编号为 CVE-2024-12754，该漏洞使本地攻击者能够利用对Windows 背景图像的处理来获取对敏感系统文件的未经授权的访问。  
  
![](https://mmbiz.qpic.cn/mmbiz_png/AnRWZJZfVaG0a3yk2giasY8X9eKpEVYfssyZnQ20icRgaqZ6icSmBEu2ttsVicDb0ahgtJ4aP0SgVofg4odjg8k8uw/640?wx_fmt=png&from=appmsg "")  
  
  
这可能会将他们的权限升级到管理级别，对系统安全构成重大威胁。  
  
  
该漏洞被归类为 CWE-59（文件访问前不正确的链接解析），并分配了 CVSS 评分 5.5（中等），表明其有可能导致机密性泄露。  
  
  
一个概念验证漏洞代码（  
PoC  
）已被披露，展示了攻击者如何利用此漏洞。  
  
### AnyDesk 本地权限提升漏洞  
###   
  
据网络安全研究员 Naor Hodorov 称，该漏洞存在于AnyDesk在会话初始化期间处理桌面背景图像的方式中。  
  
  
当会话开始时，AnyDesk 会将当前桌面壁纸复制到 C:\Windows\Temp 目录中。  
  
![](https://mmbiz.qpic.cn/mmbiz_png/AnRWZJZfVaG0a3yk2giasY8X9eKpEVYfs8ibJwDvuUZHCkicHK2lpHSpBJhEHtgfwRFhNJbI54KFeicUHTCPBLwibicA/640?wx_fmt=png&from=appmsg "")  
  
AnyDesk 将现有背景图像复制到 C:\Windows\Temp\  
  
  
此操作由在具有提升权限的 NT AUTHORITY\SYSTEM 帐户下运行的 AnyDesk 服务执行。  
  
![](https://mmbiz.qpic.cn/mmbiz_png/AnRWZJZfVaG0a3yk2giasY8X9eKpEVYfsI9rn16WZp9mQtxFoj8LdQkWobNNia9wmeV36h7lZjjZGiaGu0hPlaxGA/640?wx_fmt=png&from=appmsg "")  
  
AnyDesk 以 NT AUTHORITY\SYSTEM 身份执行文件复制  
  
  
具有较低权限的攻击者可以通过在 C:\Windows\Temp 目录中预先创建文件或利用符号链接（连接点）来操纵此过程。  
  
  
攻击的工作原理如下：  
  
  
当 AnyDesk 复制桌面壁纸时，它会保留 SYSTEM 帐户的所有权和权限。默认情况下，低权限用户无法访问复制的文件。  
  
  
攻击者创建一个连接点（一种符号链接），将 AnyDesk 的文件复制操作重定向到敏感目录，如 \Device\HarddiskVolumeShadowCopy1\Windows\System32\CONFIG。  
  
  
这使得攻击者可以访问关键文件，例如 SAM（安全帐户管理器）、SYSTEM 和 SECURITY。  
  
  
通过获取这些文件，攻击者可以使用 mimikatz 等工具提取散列凭据或机器密钥。这使他们能够提升权限并可能获得管理访问权限。  
  
### 概念验证 (PoC) 公开  
###   
  
PoC 漏洞代码已发布，展示了攻击者如何利用此漏洞。  
  
  
该漏洞涉及使用 Windows 对象管理器命名空间 (OMNS) 目录（例如 \RPC Control）中的重新解析点来操纵文件操作。  
  
![](https://mmbiz.qpic.cn/mmbiz_png/AnRWZJZfVaG0a3yk2giasY8X9eKpEVYfs1tXnW7fSibgglSBr18kQ8ibricTicC78p07dGtbFgDveNLXxf3ANCIrYUg/640?wx_fmt=png&from=appmsg "")  
  
  
这表明漏洞被成功利用，在触发 oplock（机会锁）后，敏感文件可以被访问和恢复。  
  
  
为了解决此漏洞，AnyDesk已在9.0.1及更高版本中发布补丁。强烈建议用户立即更新其软件。  
  
  
CVE-2024-12754 的发现凸显了本地权限提升技术的日益复杂化，这些技术利用了桌面背景图像等看似无害的功能。  
  
  
新闻链接：  
  
https://cybersecuritynews.com/poc-exploit-released-for-anydesk-vulnerability-exploited/  
  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/AnRWZJZfVaGC3gsJClsh4Fia0icylyBEnBywibdbkrLLzmpibfdnf5wNYzEUq2GpzfedMKUjlLJQ4uwxAFWLzHhPFQ/640?wx_fmt=jpeg "")  
  
扫码关注  
  
军哥网络安全读报  
  
**讲述普通人能听懂的安全故事**  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
