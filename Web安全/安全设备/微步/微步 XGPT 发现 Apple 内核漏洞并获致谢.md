---
cve: "CVE-2026-43722"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  微步 XGPT 发现 Apple 内核漏洞并获致谢  
微步情报局
                    微步情报局  微步在线研究响应中心   2026-06-30 07:23  
  
漏洞概况  
  
  
今天Apple官方发布   
Apple iOS、iPadOS、macOS  
 26.5.2版，修复了WebKit、Kernel 等组件的多个漏洞。  
其中CVE-2026-43722由微步XGPT发现并报送Apple官方。  
  
![](https://mmbiz.qpic.cn/mmbiz_png/T4OSm0sXdEOH9tDgfo5FUN2FdIlbaxbpAeH9XbLicWnEkAy08GGpKA251dMia7kYc1CqCUP8Ta9wlMju2DCKfTibb0xR2Ch76GsEXtrqzSIdC0/640?wx_fmt=png&from=appmsg "")  
  
该漏洞由于  
XNU Kernel 未验证 page_starts_offset 和 page_extras_offset，攻击者可利用此漏洞触发内核堆越界读，进而通过重定向链写入系统级共享区域页面。精心构造的攻击可能可以实现从非特权用户到 root 的本地权限提升。  
修复方案  
  
### 官方修复方案  
  
Apple 建议所有用户尽快通过设置 > 通用 > 软件更新进行升级。官方修复通告地址：：  
  
https://support.apple.com/en-us/127594  
  
微步产品支撑  
  
  
微步漏洞情报于  
2026-06-29  
收录该漏洞。  
  
微步下一代威胁情报平台NGTIP及X情报社区已于漏洞收录时向漏洞订阅用户推送该漏洞情报，并将持续推送后续更新；对于已经录入资产的用户，支持实时自动化排查受影响资产。  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
