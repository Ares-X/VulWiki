---
cve: "CVE-2024-10486"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  漏洞预警 | WordPress Plugin Google for WooCommerce信息泄露漏洞   
浅安  浅安安全   2025-04-24 00:00  
  
**0x00 漏洞编号**  
- # CVE-2024-10486  
  
**0x01 危险等级**  
- 中危  
  
**0x02 漏洞概述**  
  
Google for WooCommerce是一款WordPress插件，能将WooCommerce商店与Google Merchant Center无缝对接，自动同步产品信息，通过Google平台展示产品，利用Google AI优化广告，并提供分析与跟踪功能以助力电商业务增长。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/7stTqD182SUlKyAEbo36eib9nc0VoS9h2YUlepDAXnXj2CW0qYr23ia2KByOYKJQX0De99la7tfTBXRwyMbbzavg/640?wx_fmt=png&from=appmsg "")  
  
  
**0x03 漏洞详情**  
###   
  
**CVE-2024-10486**  
  
**漏洞类型：**  
SSRF****  
  
**影响：**  
  
获取敏感信息  
  
  
****  
  
**简述：**  
Google for WooCommerce的/wp-content/plugins/google-listings-and-ads/vendor/googleads/google-ads-php/scripts/print_php_information.php接口存在信息泄露漏洞，未经身份验证的攻击者通过该漏洞可获取有关Web服务器和PHP配置的信息。  
  
**0x04 影响版本**  
- Google for WooCommerce < 2.8.6  
  
**0x05****POC状态**  
- 已公开  
  
**0x06****修复建议**  
  
**目前官方已发布漏洞修复版本，建议用户升级到安全版本****：**  
  
https://cn.wordpress.org/plugins/google-listings-and-ads/  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
