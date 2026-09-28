---
cve: "CVE-2024-3596"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【漏洞预警】RADIUS响应篡改漏洞CVE-2024-3596   
cexlife  飓风网络安全   2024-07-12 18:54  
  
![](https://mmbiz.qpic.cn/mmbiz_png/ibhQpAia4xu00cK4wqC32f9icl2XqCxBnmBG2NJFpJIcicc1TpMlhcm7qNUCsoZqe2j7JibrwhIUDEuKtToriaZibxuuA/640?wx_fmt=png&from=appmsg "")  
  
**漏洞描述:**  
  
RADIUS协议是用于远程用户认证和授权的网络协议,广泛用于网络访问的场景，例如Wi-Fi、VPN、以及网络设备管理等,受影响版本中,由于RADIUS 的认证响应验证使用了不安全加密的验证方法,具有本地网络访问权限的攻击者可以在传输RADIUS协议的网络中进行中间人攻击,当不强制使用Message-Authenticator属性时,攻击者可以伪造基于UDP的RADIUS响应数据包,将任何有效的响应（例如“访问接受”、“访问拒绝”或“访问质询”）篡改为其他响应,仅执行RFC3579中指定的可扩展身份验证协议 (EAP) 的RADIUS服务器不受该漏洞影响。影响范围:freeradius@(-∞, 3.0.27)freeradius@[3.2.0, 3.2.5)freeradius@影响所有版本freeradius-devel@影响所有版本freeradius-doc@影响所有版本freeradius-mysql@影响所有版本freeradius-perl@影响所有版本freeradius-doc@影响所有版本freeradius-krb5@影响所有版本freeradius-perl@影响所有版本freeradius-postgresql@影响所有版本freeradius-rest@影响所有版本freeradius-unixODBC@影响所有版本freeradius-utils@影响所有版本python3-freeradius@影响所有版本freeradius-krb5@影响所有版本freeradius-ldap@影响所有版本freeradius-postgresql@影响所有版本freeradius-rest@影响所有版本freeradius-sqlite@影响所有版本freeradius-unixODBC@影响所有版本freeradius-utils@影响所有版本python3-freeradius@影响所有版本freeradius@影响所有版本freeradius-devel@影响所有版本freeradius-ldap@影响所有版本freeradius-mysql@影响所有版本freeradius-sqlite@影响所有版本freeradius:3.0/freeradius@影响所有版本freeradius:3.0/freeradius-devel@影响所有版本freeradius:3.0/freeradius-doc@影响所有版本freeradius:3.0/freeradius-ldap@影响所有版本freeradius:3.0/freeradius-perl@影响所有版本freeradius:3.0/python3-freeradius@影响所有版本freeradius:3.0/freeradius-devel@影响所有版本freeradius:3.0/freeradius-mysql@影响所有版本freeradius:3.0/freeradius-postgresql@影响所有版本freeradius:3.0/python3-freeradius@影响所有版本freeradius:3.0/freeradius-krb5@影响所有版本freeradius:3.0/freeradius-mysql@影响所有版本freeradius:3.0/freeradius-postgresql@影响所有版本freeradius:3.0/freeradius-rest@影响所有版本freeradius:3.0/freeradius-sqlite@影响所有版本freeradius:3.0/freeradius-unixODBC@影响所有版本freeradius:3.0/freeradius-utils@影响所有版本freeradius:3.0/freeradius@影响所有版本freeradius:3.0/freeradius-doc@影响所有版本freeradius:3.0/freeradius-krb5@影响所有版本freeradius:3.0/freeradius-ldap@影响所有版本freeradius:3.0/freeradius-perl@影响所有版本freeradius:3.0/freeradius-rest@影响所有版本freeradius:3.0/freeradius-sqlite@影响所有版本freeradius:3.0/freeradius-unixODBC@影响所有版本freeradius:3.0/freeradius-utils@影响所有版本freeradius@(-∞, 3.2.5+dfsg-1)**修复方案:**RADIUS客户端和服务器之间的通信使用TLS或DTLS 加密使用Message-Authenticator进行RADIUS 身份验证将组件freeradius升级至3.2.5及以上版本将组件freeradius升级至3.2.5+dfsg-1及以上版本**参考链接:**https://msrc.microsoft.com/update-guide/en-US/vulnerability/CVE-2024-3596  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
