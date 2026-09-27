---
cve: "CVE-2024-34102"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  漏洞预警 | Magento Open Source XXE漏洞   
浅安  浅安安全   2024-06-22 08:30  
  
**0x00 漏洞编号**  
- # CVE-2024-34102  
  
**0x01 危险等级**  
- 高危  
  
**0x02 漏洞概述**  
  
Adobe Magento Open Source是Adobe公司的一套开源的PHP电子商务系统，Magento Open Source提供所有基本的商务功能，可用于从头开始建立独特的线上商店。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/7stTqD182SXaqpBYiaDTgZPe9XeqSxh7yOLFz89okSbeNCBvI3EH8Uib9OBmh9gZnjOuukml79kZ7pXrfwQsicNnw/640?wx_fmt=other&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1 "")  
  
**0x03 漏洞详情**  
###   
###   
  
**CVE-2024-34102**  
  
**漏洞类型：**  
XXE  
  
**影响：**  
执行任意命令  
  
**简述：**  
Adobe Commerce和Magento Open Sourc多个受影响版本中存在XML外部实体引用限制不当，未经身份验证的威胁者可发送引用外部实体的恶意设计的XML文档来利用该漏洞，成功利用可能导致任意代码执行。  
###   
  
**0x04 影响版本**  
- Adobe Commerce <= 2.4.7  
  
- Adobe Commerce <= 2.4.6-p5  
  
- Adobe Commerce <= 2.4.5-p7  
  
- Adobe Commerce <= 2.4.4-p8  
  
- Adobe Commerce <= 2.4.3-ext-7  
  
- Adobe Commerce <= 2.4.2-ext-7  
  
- Adobe Commerce <= 2.4.1-ext-7  
  
- Adobe Commerce <= 2.4.0-ext-7  
  
- Adobe Commerce <= 2.3.7-p4-ext-7  
  
- Magento Open Source <= 2.4.7  
  
- Magento Open Source <= 2.4.6-p5  
  
- Magento Open Source <= 2.4.5-p7  
  
- Magento Open Source <= 2.4.4-p8  
  
**0x05****修复建议**  
  
**目前官方已发布漏洞修复版本，建议用户升级到安全版本****：**  
  
https://www.adobe.com/  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
