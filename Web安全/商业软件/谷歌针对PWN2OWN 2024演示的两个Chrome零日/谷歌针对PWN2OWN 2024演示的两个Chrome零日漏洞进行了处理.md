---
cve: "CVE-2024-2886"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  谷歌针对PWN2OWN 2024演示的两个Chrome零日漏洞进行了处理   
鹏鹏同学  黑猫安全   2024-03-28 11:47  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/8dBEfDPEce9NbceqboWIA5UJzWZ6jYlTgs76WTre043ibDXQq1yDavLom27qOZiasMndX3tcKOr7RGslelFk1FHQ/640?wx_fmt=png&from=appmsg "")  
  
本周，谷歌解决了Chrome浏览器中的几个漏洞，包括两个零日漏洞，分别被跟踪为CVE-2024-2886和CVE-2024-2887，在Pwn2Own Vancouver 2024黑客竞赛期间展示。  
  
高危漏洞CVE-2024-2886是一个位于WebCodecs中的使用后释放问题。该漏洞由KAIST Hacking Lab的Seunghyun Lee(@0x10n)在Pwn2Own 2024期间展示。  
  
高危漏洞CVE-2024-2887是一个位于WebAssembly中的类型混淆问题。Manfred Paul在Pwn2Own 2024期间展示了这个漏洞。谷歌还解决了以下漏洞：  
  
[$10000][327807820] 严重 CVE-2024-2883：ANGLE中的使用后释放问题。由Cassidy Kim(@cassidy6564)于2024年03月03日报告 [TBD][328958020] 高危 CVE-2024-2885：Dawn中的使用后释放问题。由wgslfuzz于2024年03月11日报告。“稳定通道已更新至123.0.6312.86/.87适用于Windows和Mac，123.0.6312.86适用于Linux，将在未来几天/几周内推出。  
  
此版本中的所有更改列表可在日志中找到。”根据该IT巨头发布的公告。该IT巨头并未透露这些漏洞是否在野外被积极利用。上周，Mozilla解决了Firefox浏览器中在最近的Pwn2Own Vancouver 2024黑客竞赛期间被利用的两个零日漏洞。研究人员Manfred Paul(@_manfp)赢得了比赛，分别利用了CVE-2024-29944和CVE-2024-29943跟踪的两个漏洞。  
  
第二天，Paul利用OOB Write进行了Mozilla Firefox的沙盒逃逸以及一个暴露的危险函数漏洞。他因此攻击赢得了10万美元和10个Master of Pwn积分。以下是两个问题的描述，根据公告，漏洞CVE-2024-29944只影响桌面版Firefox，不影响Firefox的移动版本：  
  
CVE-2024-29943：通过欺骗基于范围的边界检查消除，攻击者能够对JavaScript对象执行越界读取或写入。  
  
CVE-2024-29944：攻击者能够向特权对象中注入事件处理程序，从而允许在父进程中执行任意JavaScript代码。Mozilla发布了Firefox 124.0.1和Firefox ESR 115.9.1来解决这两个问题。  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
