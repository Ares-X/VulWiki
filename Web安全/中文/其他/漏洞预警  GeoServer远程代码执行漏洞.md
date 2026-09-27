---
cve: "CVE-2024-36404"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  漏洞预警 | GeoServer远程代码执行漏洞   
浅安  浅安安全   2024-12-31 00:03  
  
**0x00 漏洞编号**  
- # CVE-2024-36404  
  
**0x01 危险等级**  
- 高危  
  
**0x02 漏洞概述**  
  
GeoServer是一个用Java编写的开源服务器，它允许用户共享、处理和编辑地理空间数据。为了互操作性而设计，它使用开源标准发布来自任何主要空间数据源的数据。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/7stTqD182SWd1a3VRIeVBRap94GX4e5Smoro5Q6WzIBM9gzltID0XJbfoJyUshz5xFNMgQKkjk03e0maUSWSMg/640?wx_fmt=png&from=appmsg "")  
  
**0x03 漏洞详情**  
###   
  
**CVE-2024-36404**  
  
**漏洞类型：**  
远程代码执行  
  
**影响：**  
执行任意命令  
  
**简述：**  
GeoServer的/geoserver/wfs接口存在远程代码执行漏洞，如果应用程序使用某些GeoTools功能来评估用户输入提供的XPath表达式，则未经身份验证的攻击者可以通过该漏洞远程执行任意代码，从而控制目标服务器。  
  
**0x04 影响版本**  
- GeoServer GeoTools < 31.2  
  
- GeoServer GeoTools < 30.4  
  
- GeoServer GeoTools < 29.6  
  
**0x05 POC状态**  
- 已公开  
  
**0x06****修复建议**  
  
**目前官方已发布漏洞修复版本，建议用户升级到安全版本****：**  
  
https://geoserver.org/  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
