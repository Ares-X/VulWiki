---
cve: "CVE-2026-64600"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【成功复现】Linux Kernel XFS Reflink本地权限提升漏洞(CVE-2026-64600)  
弥天安全实验室
                    弥天安全实验室  弥天安全实验室   2026-07-26 02:31  
  
网安引领时代，弥天点亮未来    
   
  
  
  
  
  
   
  
![Image](https://mmbiz.qpic.cn/mmbiz_png/MjmKb3ap0hDCVZx96ZMibcJI8GEwNnAyx4yiavy2qelCaTeSAibEeFrVtpyibBCicjbzwDkmBJDj9xBWJ6ff10OTQ2w/640?wx_fmt=other&wxfrom=5&wx_lazy=1&wx_co=1&randomid=2jntd263&tp=webp#imgIndex=0 "")  
  
  
**0x00写在前面**  
  
**本次测试仅供学习使用，如若非法他用，与平台和本文作者无关，需自行负责！**  
  
![Image](https://mmbiz.qpic.cn/mmbiz_png/MjmKb3ap0hDCVZx96ZMibcJI8GEwNnAyx4yiavy2qelCaTeSAibEeFrVtpyibBCicjbzwDkmBJDj9xBWJ6ff10OTQ2w/640?wx_fmt=other&wxfrom=5&wx_lazy=1&wx_co=1&randomid=7c3v7kvq&tp=webp#imgIndex=1 "")  
  
  
**0x01漏洞介绍**  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/YfTkN0R6oGgmnMO1YEaqC2dpyr0fJl9vVicyq5jM6mN4eUDibvQicClW9JFCI1JIHWwdspxmzMVVEyDkzJaic0xhnevQD3blY8tOb3YibLn6XVbY/640?wx_fmt=png&from=appmsg "")  
  
  
Linux kernel是美国Linux基金会开源的一款操作系统内核。  
  
Linux kernel 4.11版本存在安全漏洞，该漏洞源于xfs文件系统中数据fork映射在ILOCK周期后未重新采样，可能导致直接I/O写入时使用过时的映射。  
  
  
****  
  
![Image](https://mmbiz.qpic.cn/mmbiz_png/MjmKb3ap0hDCVZx96ZMibcJI8GEwNnAyx4yiavy2qelCaTeSAibEeFrVtpyibBCicjbzwDkmBJDj9xBWJ6ff10OTQ2w/640?wx_fmt=other&wxfrom=5&wx_lazy=1&wx_co=1&randomid=bzequ3sx&tp=webp#imgIndex=3 "")  
  
  
**0x02影响版本**  
  
  
受影响的Linux内核版本： 4.11 <= Linux Kernel < 6.12.966.13 <= Linux Kernel < 6.18.396.19 <= Linux Kernel < 7.1.47.2 <= Linux Kernel < 7.2-rc4目前已知受影响的操作系统：Red Hat Enterprise Linux 8/9/10CentOS StreamRocky LinuxOracle LinuxAlmaLinuxCloudLinuxFedora Server 31+Amazon Linux 2 / 2023 利用前提条件：1.攻击者拥有目标系统本地普通用户权限。2.系统运行 Linux 内核 4.11或更高版本（2017年4月及之后发布），且未包含修复补丁。3.存在使用 reflink=1 选项创建的 XFS 文件系统（自2019年起为 mkfs.xfs 默认配置）。4.攻击者能够读取目标文件（例如 /etc/passwd 为全局可读，SUID-root 二进制文件为全局可执行/可读）。  
  
![Image](https://mmbiz.qpic.cn/mmbiz_png/MjmKb3ap0hDCVZx96ZMibcJI8GEwNnAyx4yiavy2qelCaTeSAibEeFrVtpyibBCicjbzwDkmBJDj9xBWJ6ff10OTQ2w/640?wx_fmt=other&wxfrom=5&wx_lazy=1&wx_co=1&randomid=bzequ3sx&tp=webp#imgIndex=5 "")  
  
  
**0x03漏洞复现**  
  
  
连接环境，普通用户权限，漏洞复现  
  
![](https://mmbiz.qpic.cn/mmbiz_png/YfTkN0R6oGhk6jy12uAKgSYhbNlpzOpPT44ibrw2AAaO5KIrAEibiaibSd8vFKBUm6QvYibadcQeld3B33ibaqqliadXeXkvibiaH2NzHmiavqwqiaibs4E/640?wx_fmt=png&from=appmsg "")  
  
测试没有漏洞  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/YfTkN0R6oGh3Tq7dxxdIa3uZb274IO2EbomNNh1IP0oYgzcPdP1ECibY4dhasr7ficmL73WDv7yTRyxRCT6Q9sMYNOAXX5JdoYrzqKiajBwrNg/640?wx_fmt=png&from=appmsg "")  
  
![Image](https://mmbiz.qpic.cn/mmbiz_png/MjmKb3ap0hDCVZx96ZMibcJI8GEwNnAyx4yiavy2qelCaTeSAibEeFrVtpyibBCicjbzwDkmBJDj9xBWJ6ff10OTQ2w/640?wx_fmt=other&wxfrom=5&wx_lazy=1&wx_co=1&randomid=bzequ3sx&tp=webp#imgIndex=3 "")  
  
  
**0x04修复建议**  
  
  
目前厂商已发布升级补丁以修复漏洞，补丁获取链接：  
  
临时缓解方案  
  
限制对系统的本地访问权限，避免非特权用户执行XFS rеflink相关操作；监控文件系统异常行为；在关键业务系统上考虑临时禁用XFS的rеflink功能或避免使用dirесｔ I/O模式。  
  
建议尽快升级修复漏洞，再次声明本文仅供学习使用，非法他用责任自负！     
```
https://www.kernel.org/
https://blog.qualys.com/vulnerabilities-threat-research/2026/07/22/refluxfs-a-linux-kernel-local-privilege-escalation-to-root-in-xfs-cve-2026-64600
https://ti.qianxin.com/vulnerability/detail/479902
https://github.com/0xBlackash/CVE-2026-64600
```  
  
  
弥天简介  
  
学海浩茫，予以风动，必降弥天之润！弥天安全实验室成立于2019年2月19日，主要研究安全防守溯源、威胁狩猎、漏洞复现、工具分享等不同领域。目前主要力量为民间白帽子，也是民间组织。主要以技术共享、交流等不断赋能自己，赋能安全圈，为网络安全发展贡献自己的微薄之力。  
  
口号 网安引领时代，弥天点亮未来  
  
  
  
  
  
![Image](https://mmbiz.qpic.cn/mmbiz_gif/b96CibCt70iaaqjXT4YxgHVARD1NNv0RvKtiaAvXhmruVqgavPY3stwrfvLKetGycKUfxIq3Xc6F6dhU7eb4oh2gg/640?wx_fmt=gif&wxfrom=5&wx_lazy=1&randomid=h6lqq1ue&tp=webp#imgIndex=8 "")  
  
   
  
  
知识分享完了  
  
喜欢别忘了关注我们哦~  
  
学海浩茫，  
  
予以风动，  
  
必降弥天之润！  
  
  
   弥  天  
  
安全实验室  
  
![Image](https://mmbiz.qpic.cn/mmbiz_jpg/MjmKb3ap0hDyTJAqicycpl7ZakwfehdOgvOqd7bOUjVTdwxpfudPLOJcLiaSZnMC7pDDdlIF4TWBWWYnD04wX7uA/640?wx_fmt=other&wxfrom=5&wx_lazy=1&wx_co=1&randomid=u34b870m&tp=webp#imgIndex=9 "")  
  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
