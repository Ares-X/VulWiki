---
cve: "CVE-2024-41667"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【漏洞预警】OpenAM FreeMarker 模板注入漏洞（CVE-2024-41667）   
原创 聚焦网络安全情报  安全聚   2024-07-27 19:30  
  
预警公告 **高危**  
  
近日，安全聚实验室监测到 OpenAM FreeMarker 存在模板注入漏洞，编号为：CVE-2024-41667，CVSS：8.8  此漏洞允许攻击者在应用程序的模板中插入恶意代码，利用模板注入漏洞来篡改页面内容、执行任意代码等。  
  
  
**01**  
  
**漏洞描述**  
  
  
OpenAM与FreeMarker集成提供了强大的模板引擎功能，使用户能够轻松创建和定制认证和授权页面。通过OpenAM的FreeMarker支持，用户可以利用FreeMarker的灵活性和功能来设计各种用户界面，包括登录页面、访问请求页面和其他身份验证相关页面。这种集成不仅提供了更丰富的用户体验，还可以帮助开发人员更高效地定制和管理认证流程，从而提升应用程序的安全性和用户友好性。此漏洞由于没有限制“CustomLoginUrlTemplate”，允许自由设置，导致RealmOAuth2ProviderSettings.java 中的“getCustomLoginUrlTemplate”方法由于使用用户输入而容易受到模板注入的影响。  
  
**02**  
  
**影响范围**  
  
OpenAM <= 15.0.3  
  
**03**  
  
**安全措施**  
  
  
目前厂商已发布可更新版本，建议用户尽快更新至 OpenAM 的修复版本或更高版本：OpenAM >= 15.0.4下载链接：https://github.com/OpenIdentityPlatform/OpenAM/commit/fcb8432aa77d5b2e147624fe954cb150c568e0b8  
  
**04**  
  
**参考链接**  
  
  
1.https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2024-41667  
**05**  
  
**技术支持**  
  
  
长按识别二维码，关注“**安全聚**”公众号，联系我们的团队技术支持。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/Icw1mW4eH3f0EPFicEDoJgTxOg248sjyFribLQXHTQsQCnIpRGg4OgIoF6MxfibpiaOK7aZXgNejnNKMlWSg9pecaw/640?wx_fmt=jpeg&from=appmsg "")  
  
  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
