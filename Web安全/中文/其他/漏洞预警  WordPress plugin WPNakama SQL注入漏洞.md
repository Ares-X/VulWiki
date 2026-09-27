---
cve: "CVE-2025-14068"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  漏洞预警 | WordPress plugin WPNakama SQL注入漏洞  
浅安
                    浅安  浅安安全   2026-03-05 23:50  
  
**0x00 漏洞编号**  
- # CVE-2025-14068  
  
**0x01 危险等级**  
- 高危  
  
**0x02 漏洞概述**  
  
WPNakama是一款原生集成在WordPress仪表盘内的项目和团队协作插件。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/NQlfTO30MhzVwamuvjE4H90cPvw6SG0FFqPTQo2tNh3GBZFcbS8JlrKpQ8cab0pfhK4uTicYmyfBibWAXQh2z9VaPgYPI2QLibJgCSBp5qs5PE/640?wx_fmt=png&from=appmsg "")  
  
**0x03 漏洞详情**  
###   
  
**CVE-2025-14068**  
  
**漏洞类型：**  
SQL注入****  
  
**影响：**  
  
获取敏感信息  
  
  
****  
  
**简述：**  
WPNakama存在SQL注入漏洞，由于对用户提供参数清理不当，且对现有SQL预处理不足，攻击者可利用该漏洞通过order_by参数注入SQL，在现有查询中附加额外的SQL查询，并从数据库中提取敏感信息。  
  
**0x04 影响版本**  
- WordPress WPNakama plugin <= 0.6.3  
  
**0x05****POC状态**  
- 未公开  
  
**0x06****修复建议**  
  
**目前官方已发布漏洞修复版本，建议用户升级到安全版本****：**  
  
https://cn.wordpress.org/plugins/wpnakama/  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
