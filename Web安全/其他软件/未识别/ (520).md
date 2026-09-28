---
cve: "CVE-2024-49039"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【漏洞通告】Windows 任务计划程序特权提升漏洞 （CVE-2024-49039）   
 安迈信科应急响应中心   2024-11-21 03:50  
  
![](https://mmbiz.qpic.cn/mmbiz_png/tdibEPWdubQUgErMslSgzVibGKdSFkWPTbTgu83UTXdNYm7eOxRSmuNmOjUIxdicy73wTLufCMnbs6CAsc3uicJUcg/640?wx_fmt=png "")  
### 01 漏洞概况      Windows 任务计划程序是系统中的一个组件，可以预先计划在特定时间或指定时间后启动程序或脚本，还可以设置为响应事件的触发形式。其中存在权限提升漏洞，攻击者可以利用该漏洞在目标系统获取更高的权限。02 漏洞处置综合处置优先级：高漏洞信息漏洞名称Windows 任务计划程序特权提升漏洞漏洞编号CVE编号CVE-2024-49039‍漏洞评估披露时间2024-11-12漏洞类型权限提升危害评级高危公开程度PoC未公开威胁类型远程利用情报在野利用是影响产品产品名称Windows系统受影响版本Windows Server 2016 (Server Core installation),Windows Server 2016,Windows 10 Version 1607 for x64-based Systems,Windows 10 Version 1607 for 32-bit Systems,Windows 10 for x64-based Systems,Windows 10 for 32-bit Systems,Windows 11 Version 24H2 for x64-based Systems,Windows 11 Version 24H2 for x64-based Systems,Windows 11 Version 24H2 for ARM64-based Systems,Windows 11 Version 24H2 for ARM64-based Systems,Windows Server 2022, 23H2 Edition (Server Core installation),Windows 11 Version 23H2 for x64-based Systems,Windows 11 Version 23H2 for ARM64-based Systems,Windows 10 Version 22H2 for 32-bit Systems,Windows 10 Version 22H2 for ARM64-based Systems,Windows 10 Version 22H2 for x64-based Systems,Windows 11 Version 22H2 for x64-based Systems,Windows 11 Version 22H2 for ARM64-based Systems,Windows 10 Version 21H2 for x64-based Systems,Windows 10 Version 21H2 for ARM64-based Systems,Windows 10 Version 21H2 for 32-bit Systems,Windows Server 2022 (Server Core installation),Windows Server 2022 (Server Core installation),Windows Server 2022,Windows Server 2022,Windows Server 2019 (Server Core installation),Windows Server 2019,Windows 10 Version 1809 for x64-based Systems,Windows 10 Version 1809 for 32-bit Systems,Windows Server 2025 (Server Core installation),Windows Server 2025 (Server Core installation),Windows Server 2025,Windows Server 2025影响范围广有无修复补丁有  
### 03 漏洞排查      用户尽快排查windows系统版本是否存在影响版本，若存在应用使用，极大可能会受到影响。04 修复方案1、官方修复方案：微软官方已更新受影响软件的安全补丁，用户可根据不同系统版本下载安装对应的安全补丁，安全更新链接如下：https://msrc.microsoft.com/update-guide/vulnerability/CVE-2024-4903905 时间线      2024.11.12 厂商发布安全补丁      2024.11.21 安迈信科安全运营团队发布通告   关于安迈信科西安安迈信科科技有限公司以“数字化可管理”为核心理念，坚持DevOps自主研发，创新打造“能力聚合、流程闭环、持续赋能”的综合性网络数据安全平台与运营服务。公司从古城西安出发，已在全国范围内为政府、运营商、电力、能源等行业客户提供了高质量的安全保障，并将继续为我国数字化转型和发展贡献力量。知 行 . 至 简 . 致 诚  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
