---
cve: "CVE-2024-11667"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  CISA 警告 Zyxel 防火墙漏洞可能被利用进行攻击   
会杀毒的单反狗  军哥网络安全读报   2024-12-05 01:00  
  
**导****读**  
  
  
  
美国网络安全机构 CISA 周二警告称，多款 Zyxel 防火墙设备中的路径遍历漏洞已被利用。  
  
  
该漏洞编号为 CVE-2024-11667（CVSS 评分为 7.5），是一个高严重性漏洞，影响 Zyxel ATP、USG FLEX 和 USG20(W)-VPN 系列设备的 Web 管理界面。  
  
  
NIST 公告称，成功利用此安全漏洞可能允许攻击者使用精心设计的 URL 下载或上传文件。  
  
  
Qualys周二警告称： “攻击者可能利用该漏洞获得系统的未经授权访问、窃取凭证并创建后门 VPN 连接。”  
  
  
本地模式下的 Zyxel ATP 和 USG FLEX 系列防火墙以及运行 ZLD 固件版本 4.32 至 5.38 且启用了远程管理或 SSL VPN 的设备受到影响。  
  
  
11 月 27 日，感恩节前夕，Zyxel 更新了针对之前披露的针对其防火墙的攻击的公告，警告称该漏洞正在被广泛利用。  
  
  
更新后的公告称：“我们确认，2024 年 9 月 3 日发布的防火墙固件版本 5.39 及更高版本不受该漏洞影响，因为我们已经解决了所有已知漏洞，包括 CVE-2024-11667，并在版本 5.39 中执行了一系列安全增强功能。 ”  
  
  
该通报引用了 Sekoia 的一份报告（  
https://blog.sekoia.io/helldown-ransomware-an-overview-of-this-emerging-threat/），该报告介绍了 Helldown 勒索软件攻击中利用另一个 Zyxel 防火墙漏洞（编号为 CVE-2024-42057）的情况。针对 CVE-2024-42057 和其他六个安全缺陷的补丁已于 9 月 3 日发布。  
  
  
Zyxel 在其更新的公告中警告称：“为了保护设备，我们强烈建议用户更新固件并更改管理员密码。这些更新对于降低威胁行为者利用 Zyxel 安全设备中先前披露的漏洞的风险至关重要。”  
  
  
11 月 22 日，德国计算机应急响应小组 (CERT-Bund) 透露，一些组织在应用 Zyxel 的补丁后，没有更改管理密码或检查新创建的账户，就受到了攻击。  
  
  
CERT-Bund 的公告(  
https://www.bsi.bund.de/SharedDocs/Cybersicherheitswarnungen/DE/2024/2024-290907-1032.pdf) 中写道：“进一步的调查显示，仅更新受影响的设备不足以永久防止入侵。相反，攻击者可以使用创建的账户来侵入网络。”  
  
![](https://mmbiz.qpic.cn/mmbiz_png/AnRWZJZfVaEHSjeLIMKmo4MlfcgwLGotHXQYDRK55dibzxLhqZ6oWO5mdvtedpjojzrLicvRuXPAz1DhqhZUG6yQ/640?wx_fmt=png&from=appmsg "")  
  
  
12 月 3 日，CISA 将 CVE-2024-11667 添加到其已知利用漏洞(KEV) 目录中，敦促联邦机构在 12 月 24 日之前应用可用的补丁，以符合具有约束力的操作指令 (BOD) 22-01。  
  
  
该机构还警告称，Proself 电子邮件安全和数据清理设备漏洞 CVE-2023-45727 和开源应用程序 ProjectSend 中的漏洞CVE-2024-11680 正受到野蛮利用。  
  
  
**新闻链接：**  
  
https://www.securityweek.com/cisa-warns-of-zyxel-firewall-vulnerability-exploited-in-attacks/  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/AnRWZJZfVaGC3gsJClsh4Fia0icylyBEnBywibdbkrLLzmpibfdnf5wNYzEUq2GpzfedMKUjlLJQ4uwxAFWLzHhPFQ/640?wx_fmt=jpeg "")  
  
扫码关注  
  
军哥网络安全读报  
  
**讲述普通人能听懂的安全故事**  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
