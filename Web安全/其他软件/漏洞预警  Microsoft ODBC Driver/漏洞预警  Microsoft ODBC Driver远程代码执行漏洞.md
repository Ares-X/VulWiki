---
cve: "CVE-2023-35639"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  漏洞预警 | Microsoft ODBC Driver远程代码执行漏洞   
浅安  浅安安全   2023-12-16 08:00  
  
**0x00 漏洞编号**  
- # CVE-2023-35639  
  
**0x01 危险等级**  
- 高危  
  
**0x02 漏洞概述**  
  
Microsoft ODBC Driver是由微软提供的一种数据库连接工具，它允许应用程序在Windows操作系统上与各种数据源进行交互，包括SQL Server、Microsoft Access、Oracle、MySQL等主流数据库系统。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/7stTqD182SVleaDeU1ibPickZJzpKIF4Mcm9iaHXXSDJfzdooHoG4ZA4iaHupxCYLp8HtE2qPLEqYibUd5u3E3Nmiczw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1 "")  
  
**0x03 漏洞详情**  
  
**CVE-2023-35639**  
  
**漏洞类型：**  
远程代码执行  
  
**影响：**  
执  
行任意代码  
  
**简述：**  
Microsoft ODBC Driver中存在远程代码执行漏洞，攻击者诱使经过身份验证的受害者使用SQL客户端应用程序连接恶意SQL数据库，恶意数据库会返回特制的消息，从而导致客户端程序上下中执行任意代码。   
###   
  
**0x04 影响版本**  
- Windows Server 2012 R2 (Server Core installation)  
  
- Windows Server 2012 R2  
  
- Windows Server 2012 (Server Core installation)  
  
- Windows Server 2012  
  
- Windows Server 2008 R2 for x64-based Systems Service Pack 1  
  
- Windows Server 2008 R2 for x64-based Systems Service Pack 1  
  
- Windows Server 2008 for x64-based Systems Service Pack 2 (Server Core installation)  
  
- Windows Server 2008 for x64-based Systems Service Pack 2 (Server Core installation)  
  
- Windows Server 2008 for x64-based Systems Service Pack 2  
  
- Windows Server 2008 for x64-based Systems Service Pack 2  
  
- Windows Server 2008 for 32-bit Systems Service Pack 2 (Server Core installation)  
  
- Windows Server 2008 for 32-bit Systems Service Pack 2 (Server Core installation)  
  
- Windows Server 2008 for 32-bit Systems Service Pack 2  
  
- Windows Server 2008 for 32-bit Systems Service Pack 2  
  
- Windows Server 2016 (Server Core installation)  
  
- Windows Server 2016  
  
- Windows 10 Version 1607 for x64-based Systems  
  
- Windows 10 Version 1607 for 32-bit Systems  
  
- Windows 10 for x64-based Systems  
  
- Windows 10 for 32-bit Systems  
  
- Windows Server 2022, 23H2 Edition (Server Core installation)  
  
- Windows 11 Version 23H2 for x64-based Systems  
  
- Windows 11 Version 23H2 for ARM64-based Systems  
  
- Windows 10 Version 22H2 for 32-bit Systems  
  
- Windows 10 Version 22H2 for ARM64-based Systems  
  
- Windows 10 Version 22H2 for x64-based Systems  
  
- Windows 11 Version 22H2 for x64-based Systems  
  
- Windows 11 Version 22H2 for ARM64-based Systems  
  
- Windows 10 Version 21H2 for x64-based Systems  
  
- Windows 10 Version 21H2 for ARM64-based Systems  
  
- Windows 10 Version 21H2 for 32-bit Systems  
  
- Windows 11 version 21H2 for ARM64-based Systems  
  
- Windows 11 version 21H2 for x64-based Systems  
  
- Windows Server 2022 (Server Core installation)  
  
- Windows Server 2022 (Server Core installation)  
  
- Windows Server 2022  
  
- Windows Server 2022  
  
- Windows Server 2019 (Server Core installation)  
  
- Windows Server 2019  
  
- Windows 10 Version 1809 for ARM64-based Systems  
  
- Windows 10 Version 1809 for x64-based Systems  
  
- Windows 10 Version 1809 for 32-bit Systems  
  
**0x05****修复建议**  
  
**目前官方已发布漏洞修复版本，建议用户升级到安全版本****：**  
  
https://msrc.microsoft.com/update-guide/vulnerability/CVE-2023-35639  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
