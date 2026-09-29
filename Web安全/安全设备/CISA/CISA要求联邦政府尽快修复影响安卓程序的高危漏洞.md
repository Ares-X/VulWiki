---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  CISA要求联邦政府尽快修复影响安卓程序的高危漏洞   
 网络安全应急技术国家工程中心   2023-07-11 15:34  
  
近日，CISA要求联邦机构尽快修补一个高危的内核驱动特权升级漏洞Arm Mali GPU，该漏洞已被列入到其积极处理的漏洞列表中，并在本月的安卓安全更新中得到解决。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/QmbJGbR2j6x3ziaY5hg4ibnljsxOvdwEV11oZ1R3sq6aTBm4WtFYALD3ZwqD8AEy0qlb81oms9mKCEcgTEiatficKw/640?wx_fmt=png&wxfrom=13 "")  
  
该漏洞（被追踪为CVE-2021-29256）是一种在释放后使用的漏洞，通过允许对GPU内存的不正当操作，让攻击者升级到root权限或者访问目标安卓设备上的敏感信息。Arm在公告中写道：“非特权用户可以对GPU内存进行不当操作，以访问已释放的内存，并可能获得root权限或披露信息。”此问题在Bifrost和Valhall GPU内核驱动程序r30p0以及Midgard内核驱动程序r31p0版本中得到修复。如果用户受到此问题的影响，建议他们尽快升级。  
  
随着本月安卓操作系统的安全更新，谷歌又修补了两个在攻击中被利用的安全缺陷。  
  
CVE-2023-26083是Arm Mali GPU驱动程序中的一个中等程度的内存泄漏缺陷，该漏洞于2022年12月被利用，是向三星设备提供间谍软件的漏洞链的一部分。  
  
第三个漏洞被追踪为CVE-2023-2136，被评为严重级别，是在谷歌的开源多平台2D图形库Skia中发现的整数溢出漏洞。值得注意的是，Skia与谷歌Chrome浏览器一起使用，而该浏览器在4月份被称为零日漏洞。  
# 联邦机构被要求在未来3周内保护安卓设备  
  
据悉，美国联邦民事行政部门机构（FCEB）已被要求在7月28日之前保护他们的设备免受CVE-2021-29256漏洞的攻击，该漏洞今天被列入到CISA积极处理的漏洞列表中。  
  
根  
据202  
1年11月发布的具有约束力的操作指令（BOD 22-01），联邦机构必须彻底评估和解决CISA KEV目录中列出的所有安全缺陷。  
尽管该目录主要关注美国联邦机构，但也强烈建议私营公司优先考虑并修补目录中列出的所有漏洞。  
CISA也警告称：  
“这些类型的漏洞是网络中恶意行为者的常见攻击载体，会对联邦企业构成重大风险。  
”  
  
一周前，网络安全  
机构警告说，TrueBot恶意软件操作背后的攻击者利用了Netwrix Auditor软件中的一个关键的远程代码执行（RCE）漏洞，对目标网络进行初始访问。  
CISA也表示，分布式拒绝服务（DDoS）针对性地攻击美国多个行业部门的组织。  
  
  
  
原文来源：E安全  
  
“投稿联系方式：孙中豪 010-82992251   sunzhonghao@cert.org.cn”  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/GoUrACT176n1NvL0JsVSB8lNDX2FCGZjW0HGfDVnFao65ic4fx6Rv4qylYEAbia4AU3V2Zz801UlicBcLeZ6gS6tg/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1 "")  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
