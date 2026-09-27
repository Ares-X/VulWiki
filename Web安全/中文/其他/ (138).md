---
cve: "CVE-2024-49194"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  [PoC] Databricks 远程代码执行漏洞 CVE-2024-49194   
 独眼情报   2024-12-20 12:33  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/KgxDGkACWnRFCjic3QibWVoxCPwz9yzWoj3hYdtKx1bkhuS3svibR39Zib0TkMP8ODGGWFfzZWuWhyadyyBUDuV0hQ/640?wx_fmt=png&from=appmsg "")  
  
  
Databricks JDBC 驱动程序中新发现的一个漏洞 (CVE-2024-49194) 可允许攻击者在易受攻击的系统上远程执行代码。该漏洞由阿里云智能安全团队的安全研究人员发现，严重性评级较高 (CVSSv3.1 评分为 7.3)，影响驱动程序版本 2.6.38 及以下。  
  
该漏洞源于驱动程序中对 krbJAASFile 参数的不当处理。通过在特制的连接 URL 中操纵此参数，攻击者可以触发 JNDI 注入，最终导致在驱动程序上下文中远程执行代码。  
  
安全研究员 pyn3rd 也通过创建概念验证（PoC）漏洞做出了贡献，进一步强调了 CVE-2024-49194 漏洞的潜在影响。  
> https://blog.pyn3rd.com/2024/12/13/Databricks-JDBC-Attack-via-JAAS/  
  
  
  
Databricks 已迅速采取行动解决该问题，修补了驱动程序版本 2.6.40 及更高版本中的漏洞。Databricks 计算和无服务器计算上所有当前版本的 Databricks Runtime 都已受到保护。但是，建议在本地计算机上运行旧版本 JDBC 驱动程序的用户立即更新。  
  
对于无法立即更新其 JDBC 驱动程序的用户，Databricks 建议更新 JVM 配置以防止通过 JNDI 进行任意反序列化。这可以通过将以下配置值设置为false来实现：  
- com.sun.jndi.ldap.object.trustURLCodebase  
  
- com.sun.jndi.ldap.object.trustSerialData  
  
此解决方法可提供暂时的缓解，直到驱动程序可以更新。  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
