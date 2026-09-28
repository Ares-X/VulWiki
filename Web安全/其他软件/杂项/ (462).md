---
cve: "CVE-2024-6457"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【漏洞预警】Products Filter Professional for WooCommerce存在sql注入漏洞   
原创 聚焦网络安全情报  安全聚   2024-07-17 17:07  
  
预警公告 **严重**  
  
近日，安全聚实验室监测到 WordPress的插件中存在SQL注入漏洞 ，编号为：CVE-2024-6457，CVSS:9.8  由于对用户提供的参数转义不充分，以及对现有SQL查询缺乏充分的准备，未经身份验证的攻击者可以将其他SQL查询追加到现有查询中，从而从数据库中提取敏感信息。  
  
  
  
**01**  
  
**漏洞描述**  
  
Products Filter Professional for WooCommerce是一款WordPress的插件，专为WooCommerce电子商务平台设计。该插件提供了高度可定制的产品过滤功能，使用户能够轻松地根据其需求和偏好筛选和查找所需的产品，还具有用户友好的界面和灵活的设置选项，使其易于使用和定制，同时提高了用户体验和购物效率。此漏洞源于未对用户提供的"woof_author"参数进行足够的转义处理，以及对现有SQL查询的准备不足。这使得未经身份验证的攻击者可以将其他 SQL 查询追加到可用于从数据库中提取敏感信息的现有查询中。  
  
**02**  
  
**影响范围**  
  
  
Products Filter Professional for WooCommerce <= 1.3.6  
  
**03**  
  
**安全措施**  
  
  
目前厂商已发布补丁修复漏洞，建议用户尽快更新  
至Products Filter Professional for WooCommerce 的修复版本或更高的版本：  
  
Products Filter Professional for WooCommerce >= 1.3.6.1  
  
**04**  
  
**参考链接**  
  
  
1.https://plugins.trac.wordpress.org/changeset/3116888/  
2.https://plugins.trac.wordpress.org/browser/woocommerce-products-filter/trunk/ext/by_author/index.php#L1023.  
https://www.wordfence.com/threat-intel/vulnerabilities/wordpress-plugins/woocommerce-products-filter/husky-products-filter-professional-for-woocommerce-136-unauthenticated-time-based-sql-injection  
  
**05**  
  
**技术支持**  
  
  
长按识别二维码，关注“**安全聚**”公众号，联系我们的团队技术支持。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/Icw1mW4eH3f0EPFicEDoJgTxOg248sjyFribLQXHTQsQCnIpRGg4OgIoF6MxfibpiaOK7aZXgNejnNKMlWSg9pecaw/640?wx_fmt=jpeg&from=appmsg "")  
  
  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
