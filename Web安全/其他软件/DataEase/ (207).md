---
cve: "CVE-2024-23328"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【漏洞预警】Dataease jdbc 反序列化漏洞CVE-2024-23328   
cexlife  飓风网络安全   2024-03-01 19:30  
  
![](https://mmbiz.qpic.cn/mmbiz_png/ibhQpAia4xu02bjgY4UQia7NjdHM4r5VOibVDsGdwicUKcQ8asZyr2DnAxUYdN3f9gtWXdBO1oQvX4TicpALwLAZbKAw/640?wx_fmt=png&from=appmsg "")  
  
**漏洞描述:**  
  
Dataease是一款开源的数据可视化分析工具,受影响版本中，由于未对用户输入的数据库连接参数做有效过滤,具有Dataease登陆权限的攻击者可通过使用URL编码jdbc url中的 autoDeserialize、allowUrlInLocalInfile参数绕过 jdbcUrl 检测,进而读取 MySQL 客户端任意文件或反序列化恶意代码。  
  
![](https://mmbiz.qpic.cn/mmbiz_png/ibhQpAia4xu02bjgY4UQia7NjdHM4r5VOibVGrMwacXqUWibyD8ak68cxdXvnXoibLM3rHqjneicIgpiaVTTeaHTW75xfw/640?wx_fmt=png&from=appmsg "")  
  
![](https://mmbiz.qpic.cn/mmbiz_png/ibhQpAia4xu02bjgY4UQia7NjdHM4r5VOibVIJK6Mmibic8znGk4PrWPpCVfh17SDOA0MyINLyR2hLnN0JWRBuPOo2NA/640?wx_fmt=png&from=appmsg "")  
  
![](https://mmbiz.qpic.cn/mmbiz_png/ibhQpAia4xu02bjgY4UQia7NjdHM4r5VOibVFQUGicBFXFRiak555JJF9HlEP9ZNl7MSEJyU9nMWtwtAav1nT5Iz0dsA/640?wx_fmt=png&from=appmsg "")  
  
![](https://mmbiz.qpic.cn/mmbiz_png/ibhQpAia4xu02bjgY4UQia7NjdHM4r5VOibV3lQniapVFHnB2G1ndEUrtHowoYPq9lmoibfOXa4lia4d4aq2PdAXxq2icQ/640?wx_fmt=png&from=appmsg "")  
  
**影响范围:**  
  
dataease(-∞, 1.18.15)io.dataease:core-backend(-∞, 1.18.15)**修复方案:**将组件dataease 升级至 1.18.15 及以上版本将io.dataease:core-backend 升级至 1.18.15 及以上版本**参考链接:**https://github.com/dataease/dataease/commit/4128adf5fc4592b55fa1722a53b178967545d46ahttps://github.com/dataease/dataease/commit/bb540e6dc83df106ac3253f331066129a7487d1a  
  
https://github.com/dataease/dataease/security/advisories/GHSA-8x8q-p622-jf25  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
