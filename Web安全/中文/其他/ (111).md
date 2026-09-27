---
cve: "CVE-2024-22371"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【漏洞预警】Apache Camel ExchangeCreatedEvent 信息泄漏CVE-2024-22371   
cexlife  飓风网络安全   2024-02-28 22:50  
  
![](https://mmbiz.qpic.cn/mmbiz_png/ibhQpAia4xu00E5bq7xsQibDHbWhOr2Hh1tnagnwZF9CSU3vG0fbJXloDGjvXG36hoUSVicDnuTdFndH3fUcCfh8Xg/640?wx_fmt=png&from=appmsg "")  
  
**漏洞描述:**ApacheCamel是开源的系统间数据交互集成框架。EventFactory是ApacheCamel中的一个组件，用于创建和发布事件，由于未对 EventFactory 和 ExchangeCreatedEvent 接收的数据进行充分验证,攻击者可以通过构建恶意的EventFactory并提供自定义的ExchangeCreatedEvent,进而泄露系统中敏感数据。  
  
**影响范围:**org.apache.camel:camel-core[4.1.0, 4.4.0)org.apache.camel:camel-core[3.22.0, 3.22.1)org.apache.camel:camel-core[4.0.0, 4.0.4)org.apache.camel:camel-core[3.21.0, 3.21.4)**修复方案:**将 org.apache.camel:camel-core 升级至 4.4.0 及以上版本将组件 org.apache.camel:camel-core 升级至 3.22.1 及以上版本将 org.apache.camel:camel-core 升级至 4.0.4 及以上版本将 org.apache.camel:camel-core 升级至 3.21.4 及以上版本**参考链接:**https://camel.apache.org/security/CVE-2024-22371.html  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
