---
cve: "CVE-2024-6328"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【漏洞预警】MStore API 身份验证绕过漏洞（CVE-2024-6328）   
原创 聚焦网络安全情报  安全聚   2024-07-14 19:30  
  
预警公告 **严重**  
  
近日，安全聚实验室监测到 WordPress的插件中MStore API存在身份验证绕过漏洞 ，编号为：CVE-2024-6328，CVSS:9.8  MStore API – Create Native Android & iOS Apps On The Cloud中由于参数验证不足，容易受到身份验证绕过攻击。  
  
  
**01**  
  
**漏洞描述**  
  
MStore API 是一个基于 WordPress 的云原生插件，专为 Android 和 iOS 应用程序设计，旨在将 WooCommerce 商店快速转化为功能强大的移动应用。MStore API的WordPress云原生Android和iOS应用程序插件存在身份验证绕过漏洞。该漏洞源于在“firebase_sms_login”和“firebase_sms_login_v2”函数中对“phone”参数的不充分验证。攻击者无需经过身份验证，只需访问电子邮件地址或电话号码，即可潜在地登录到网站上的任何现有用户账户，包括管理员账户。  
  
**02**  
  
**影响范围**  
  
  
MStore API – Create Native Android & iOS Apps On The Cloud <= 4.14.7   
  
**03**  
  
**安全措施**  
  
  
目前厂商已发布可更新版本，建议用户尽快更新至 MStore API – Create Native Android & iOS Apps On The Cloud的修复版本或更高的版本：MStore API – Create Native Android & iOS Apps On The Cloud  >= 4.15.0  
  
**04**  
  
**参考链接**  
  
  
1.https://plugins.trac.wordpress.org/changeset/3115231/2.https://plugins.trac.wordpress.org/browser/mstore-api/trunk/controllers/flutter-user.php#L6993.https://www.wordfence.com/threat-intel/vulnerabilities/wordpress-plugins/mstore-api/mstore-api-create-native-android-ios-apps-on-the-cloud-4147-authentication-bypass  
  
**05**  
  
**技术支持**  
  
  
长按识别二维码，关注“**安全聚**”公众号，联系我们的团队技术支持。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/Icw1mW4eH3f0EPFicEDoJgTxOg248sjyFribLQXHTQsQCnIpRGg4OgIoF6MxfibpiaOK7aZXgNejnNKMlWSg9pecaw/640?wx_fmt=jpeg&from=appmsg "")  
  
  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
