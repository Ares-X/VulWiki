---
cve: "CVE-2024-33575"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  漏洞预警 | User Meta敏感信息泄露漏洞   
浅安  浅安安全   2024-05-18 08:00  
  
**0x00 漏洞编号**  
- # CVE-2024-33575  
  
**0x01 危险等级**  
- 中危  
  
**0x02 漏洞概述**  
  
User Meta是一款WordPress前端注册登录与编辑资料插件，允许用户在前端页面进行注册、登录以及编辑个人资料的操作。这款插件还支持额外字段的用户注册，增加了用户注册的灵活性和个性化。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/7stTqD182SWA27o97G4gEuv1V27DowOJozLthuw0xWZW41F5eC4JH9Mjg0VIriaPGgvpQgbichxmCDH3IMAgibnDw/640?wx_fmt=png&from=appmsg "")  
  
**0x03 漏洞详情**  
###   
###   
  
**CVE-2024-33575**  
  
**漏洞类型：**  
敏感信息泄露  
  
**影响：**  
获取敏感信息  
  
****  
  
**简述：**  
User Meta存在敏感信息泄露漏洞，未授权的攻击者可以通过该漏洞获取敏感的配置数据。  
###   
  
**0x04 影响版本**  
- User Meta < 3.1  
  
**0x05****POC**  
  
```
{{BaseURL}}/wp-content/plugins/user-meta/views/debug.php
```  
  
  
**仅供安全研究与学习之用，若将工具做其他用途，由使用者承担全部法律及连带责任，作者及发布****者**  
**不承担任何法律及连带责任。**  
  
**0x06****修复建议**  
  
**目前官方已发布漏洞修复版本，建议用户升级到安全版本****：**  
  
https://wordpress.org/plugins/user-meta/  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
