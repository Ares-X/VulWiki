---
cve: "CVE-2024-21175"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【漏洞预警】Oracle WebLogic Server未授权访问漏洞（CVE-2024-21175）   
原创 聚焦网络安全情报  安全聚   2024-07-17 17:07  
  
预警公告 **高危**  
  
近日，安全聚实验室监测到 Oracle WebLogic Server 存在未授权访问漏洞 ，编号为：CVE-2024-21175，CVSS:7.5  Oracle WebLogic Server 中存在未授权访问漏洞，未经身份验证的攻击者可通过HTTP网络访问对Oracle WebLogic Server造成破坏。  
  
  
**01**  
  
**漏洞描述**  
  
  
Oracle WebLogic Server是Oracle提供的企业级Java应用服务器，具有高可用性、性能优化、安全性、扩展性和开发工具支持等特点。该服务器提供了丰富的管理和监控功能，适用于构建和部署大规模、高性能的企业应用程序，帮助企业实现高效的开发、部署和管理。Oracle WebLogic Server存在身份验证绕过漏洞，未经授权的攻击者可通过HTTP网络访问对其进行破坏。此漏洞的成功利用可能导致对关键数据或所有可访问数据的未授权创建、删除或修改访问。  
  
**02**  
  
**影响范围**  
  
  
Oracle WebLogic Server <= 14.1.1.0.0Oracle WebLogic Server <=12.2.1.4.0  
  
**03**  
  
**安全措施**  
  
  
目前厂商已发布补丁修复漏洞，建议用户尽快更新至 Oracle WebLogic Server 的修复版本或更高的版本：  
Oracle WebLogic Server > 14.1.1.0.0  
Oracle WebLogic Server > 12.2.1.4.0  
  
**04**  
  
**参考链接**  
  
  
1.https://www.oracle.com/security-alerts/cpujul2024.html  
  
**05**  
  
**技术支持**  
  
  
长按识别二维码，关注“**安全聚**”公众号，联系我们的团队技术支持。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/Icw1mW4eH3f0EPFicEDoJgTxOg248sjyFribLQXHTQsQCnIpRGg4OgIoF6MxfibpiaOK7aZXgNejnNKMlWSg9pecaw/640?wx_fmt=jpeg&from=appmsg "")  
  
  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
