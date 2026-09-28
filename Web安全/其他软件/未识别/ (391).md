---
cve: "CVE-2024-43532"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【漏洞预警】Microsoft Remote Registry Service特权提升漏洞CVE-2024-43532   
cexlife  飓风网络安全   2024-10-23 23:26  
  
![](https://mmbiz.qpic.cn/mmbiz_png/ibhQpAia4xu03L9qo3JzB3YibFNpRlaev8g52G40IUS4FLzG50m9ViaKnQYAyKhdOPrYS8MBD4nQGMhaDNCH8An4iaA/640?wx_fmt=png&from=appmsg "")  
  
**漏洞描述:**  
  
Microsoft Remote Registry Service（远程注册表服务）是Windows 操作系统中的一个服务,允许远程用户通过网络访问和修改计算机上的注册表。,Microsoft Remote Registry Service特权提升漏洞（CVE-2024-43532）的技术细节及PoC在互联网上公开,该漏洞的CVSS评分为8.8，该漏洞源于Microsoft Remote Registry客户端在SMB传输不可用的情况下回退到RPC（远程过程调用）认证时，切换到较旧的协议（如TCP/IP）并采用弱认证级（RPC_C_AUTHN_LEVEL_CONNECT），该级别无法验证通信的完整性或来源，攻击者可利用该缺陷，通过拦截NTLM 身份验证握手并将其中继到其他服务（如ADCS），实现 NTLM 中继攻击，进而可能创建域管理员账户或接管整个域。  
**影响范围:**Windows Server 2012 R2 (Server Core installation)Windows Server 2012 R2Windows Server 2012 (Server Core installation)Windows Server 2012Windows Server 2008 R2 for x64-based Systems Service Pack 1 (Server Core installation)Windows Server 2008 R2 for x64-based Systems Service Pack 1Windows Server 2008 for x64-based Systems Service Pack 2 (Server Core installation)Windows Server 2008 for x64-based Systems Service Pack 2Windows Server 2008 for 32-bit Systems Service Pack 2 (Server Core installation)Windows Server 2008 for 32-bit Systems Service Pack 2Windows Server 2016 (Server Core installation)Windows Server 2016Windows 10 Version 1607 for x64-based SystemsWindows 10 Version 1607 for 32-bit SystemsWindows 10 for x64-based SystemsWindows 10 for 32-bit SystemsWindows 11 Version 24H2 for x64-based SystemsWindows 11 Version 24H2 for ARM64-based SystemsWindows Server 2022, 23H2 Edition (Server Core installation)Windows 11 Version 23H2 for x64-based SystemsWindows 11 Version 23H2 for ARM64-based SystemsWindows 10 Version 22H2 for 32-bit SystemsWindows 10 Version 22H2 for ARM64-based SystemsWindows 10 Version 22H2 for x64-based SystemsWindows 11 Version 22H2 for x64-based SystemsWindows 11 Version 22H2 for ARM64-based SystemsWindows 10 Version 21H2 for x64-based SystemsWindows 10 Version 21H2 for ARM64-based SystemsWindows 10 Version 21H2 for 32-bit SystemsWindows 11 version 21H2 for ARM64-based SystemsWindows 11 version 21H2 for x64-based SystemsWindows Server 2022 (Server Core installation)Windows Server 2022Windows Server 2019 (Server Core installation)Windows Server 2019Windows 10 Version 1809 for x64-based SystemsWindows 10 Version 1809 for 32-bit Systems  
**安全措施:**升级版本目前该漏洞已在微软10月发布的安全更新中修复,受影响用户可及时修复。**下载链接:**https://msrc.microsoft.com/update-guide/en-US/advisory/CVE-2024-43532Windows中可通过控制面板-程序和功能-查看已安装的更新查询当前系统已安装的更新,如果系统尚未安装相应补丁,可手动下载安装。  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
