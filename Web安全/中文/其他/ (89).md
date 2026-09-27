---
cve: "CVE-2024-39914"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【漏洞预警-已复现】FOGPROJECT 文件名命令注入漏洞（CVE-2024-39914）   
原创 聚焦网络安全情报  安全聚   2024-07-15 20:01  
  
预警公告 **严重**  
  
近日，安全聚实验室监测到 FOGPROJECT中存在命令注入漏洞 ，编号为：CVE-2024-39914，CVSS:9.8   在FOG中的packages/web/lib/fog/reportmaker.class.php文件受到命令注入漏洞的影响。  
  
  
**01**  
  
**漏洞描述**  
  
FOG是一个开源的计算机镜像解决方案，旨在帮助管理员轻松地部署、维护和克隆大量计算机。FOG Project 提供了一套功能强大的工具，使用户能够快速部署操作系统、软件和配置设置到多台计算机上，从而节省时间和精力。该项目支持基于网络的 PXE 启动、镜像创建和还原、硬件和软件清单管理、远程控制和监视等功能，为 IT 管理员和系统管理员提供了一个全面的工具集。该漏洞在FOGPROJECT  
中的packages/web/lib/fog/reportmaker.class.php文件受到命令注入漏洞的影响，该漏洞存在于/fog/management/export.php的filename参数  
  
**02**  
  
**影响范围**  
  
  
FOGPROJECT < 1.5.10.34  
  
**03**  
  
**漏洞复现**  
  
目前，安全聚实验室已成功复现FOGPROJECT 文件名命令注入漏洞（CVE-2024-39914）  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/Icw1mW4eH3dEyd4icp7RWsa28fD6CUluaVT3ZMeAia6m2Hxw0J2PWdycYxXFianZ4CgsibCTt5J94y1HY6dUpk1Zpg/640?wx_fmt=png&from=appmsg "")  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/Icw1mW4eH3dEyd4icp7RWsa28fD6CUluav7pzd5W1oeLeySVPnstbZYZT1dIg4xCEAKaeVFFBDayAA8RJVib37zQ/640?wx_fmt=png&from=appmsg "")  
  
  
**04**  
  
**安全措施**  
  
  
建议用户更新至 FOGPROJECT 的安全版本：  
>= 1.5.10.34  
  
**05**  
  
**参考链接**  
  
  
1.https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2024-39914  
  
**06**  
  
**技术支持**  
  
  
长按识别二维码，关注“**安全聚**”公众号，联系我们的团队技术支持。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/Icw1mW4eH3f0EPFicEDoJgTxOg248sjyFribLQXHTQsQCnIpRGg4OgIoF6MxfibpiaOK7aZXgNejnNKMlWSg9pecaw/640?wx_fmt=jpeg&from=appmsg "")  
  
  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
