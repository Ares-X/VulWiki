---
cve: "CVE-2024-6636"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【漏洞预警】WooCommerce - Social Login数据篡改漏洞（CVE-2024-6636）   
原创 聚焦网络安全情报  安全聚   2024-07-21 20:00  
  
预警公告 **严重**  
  
近日，安全聚实验室监测到 WooCommerce - Social Login 存在数据篡改漏洞，编号为：CVE-2024-6636，CVSS:9.8 此漏洞使得未经身份验证的攻击者能够在注册帐户时更改默认角色为管理员。  
  
  
**01**  
  
**漏洞描述**  
  
  
   
WooCommerce - Social Login 是一款方便的 WooCommerce 插件，为用户的网上商店提供了简便的社交登录选项。通过允许用户使用他们在社交媒体平台上的账号登录，这个插件提升了用户体验，简化了注册流程，有助于提高用户转化率和减少购物车放弃率。WordPress的WooCommerce社交登录插件存在数据未经授权修改的潜在风险，根源在于"woo_slg_login_email"函数的权限检查不完善。这一漏洞可能被利用，使得未经身份验证的攻击者能够在注册账户时将默认角色更改为管理员。  
  
**02**  
  
**影响范围**  
  
WooCommerce - Social Login <= 2.7.3  
  
**03**  
  
**安全措施**  
  
  
目前厂商已发布可更新版本，建议用户尽快更新至 WooCommerce - Social Login 的修复版本或更高的版本：WooCommerce - Social Login >= 2.7.4  
  
**04**  
  
**参考链接**  
  
  
1.https://codecanyon.net/item/social-login-wordpress-woocommerce-plugin/8495883  
2.https://www.wordfence.com/threat-intel/vulnerabilities/wordpress-plugins/woo-social-login/woocommerce-social-login-273-missing-authorization-to-unauthenticated-privilege-escalation  
  
**05**  
  
**技术支持**  
  
  
长按识别二维码，关注“**安全聚**”公众号，联系我们的团队技术支持。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/Icw1mW4eH3f0EPFicEDoJgTxOg248sjyFribLQXHTQsQCnIpRGg4OgIoF6MxfibpiaOK7aZXgNejnNKMlWSg9pecaw/640?wx_fmt=jpeg&from=appmsg "")  
  
  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
