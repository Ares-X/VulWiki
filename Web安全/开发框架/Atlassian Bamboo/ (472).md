---
cve: "CVE-2024-21687"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【漏洞预警】Atlassian Bamboo Data Center And Server 文件包含漏洞   
原创 聚焦网络安全情报  安全聚   2024-07-17 17:07  
  
预警公告 **高危**  
  
近日，安全聚实验室监测到Atlassian Bamboo Data Center And Server 存在文件包含漏洞 ，编号为：CVE-2024-21687，CVSS:8.1  允许经过身份验证的攻击者获取应用程序显示本地文件的内容，或执行已存储在本地服务器上的其他文件。  
  
  
**01**  
  
**漏洞描述**  
  
  
Atlassian Bamboo是一款持续集成和持续交付工具，提供了Server和Data Center两个版本，分别适用于小型团队和中小型组织以及大型企业和组织。Bamboo帮助团队实现自动化软件构建、测试和部署，提高交付速度和质量，同时提供灵活的配置选项和高级的安全功能，确保系统稳定性和可靠性。经过身份验证的攻击者可以利用漏洞获取应用程序显示本地文件内容或执行本地服务器上的其他文件，可能严重影响机密性和完整性，但不会对可用性造成影响。  
  
**02**  
  
**影响范围**  
  
  
9.6.0 <= Atlassian Bamboo <= 9.6.39.5.0 <= Atlassian Bamboo <= 9.5.29.4.0 <= Atlassian Bamboo <= 9.4.39.3.0 <= Atlassian Bamboo <= 9.3.69.2.0 <= Atlassian Bamboo <= 9.2.159.1.0 <= Atlassian Bamboo <= 9.1.39.0.0 <= Atlassian Bamboo <= 9.0.4  
  
**03**  
  
**安全措施**  
  
  
目前厂商已发布补丁修复漏洞，建议用户尽快更新至Atlassian Bamboo 的修复版本或更高的版本：  
Atlassian Bamboo >= 9.6.4  
Atlassian Bamboo >= 9.2.16  
官方最新版本下载地址：  
https://www.atlassian.com/software/bamboo/download-archives  
  
**04**  
  
**参考链接**  
  
  
1.https://confluence.atlassian.com/pages/viewpage.action?pageId=1417150917  
2.  
https://jira.atlassian.com/browse/BAM-25822  
  
**05**  
  
**技术支持**  
  
  
长按识别二维码，关注“**安全聚**”公众号，联系我们的团队技术支持。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/Icw1mW4eH3f0EPFicEDoJgTxOg248sjyFribLQXHTQsQCnIpRGg4OgIoF6MxfibpiaOK7aZXgNejnNKMlWSg9pecaw/640?wx_fmt=jpeg&from=appmsg "")  
  
  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
