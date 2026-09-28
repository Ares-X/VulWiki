---
cve: "CVE-2024-10811"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【漏洞通告】Ivanti Endpoint Manager多个信息泄露漏洞安全风险通告   
 嘉诚安全   2025-01-16 07:28  
  
**漏洞背景**  
  
  
  
  
  
  
  
  
近日，嘉诚安全监测到Ivanti Endpoint Manager中存在多个信息泄露漏洞，漏洞编号分别为：  
CVE-2024-10811、CVE-2024-13161、CVE-2024-13160、CVE-2024-13159。  
  
  
Ivanti Endpoint Manager（EPM）是由Ivanti公司开发的一款综合性端点管理解决方案，它帮助企业有效管理和保护网络中的端点设备，包括桌面、笔记本电脑、服务器、移动设备和虚拟环境等。  
  
  
鉴于漏洞危害较大，嘉诚安全提醒相关用户尽快下载相关补丁，避免引发漏洞相关的网络安全事件。  
  
  
**漏洞详情**  
  
  
  
  
  
  
  
  
经研判，该漏洞为  
**高危**  
漏洞。  
未经身份验证的攻击者可以利用绝对路径遍历获取敏感信息，可能导致攻击者获得未经授权的访问、执行远程代码或权限提升等进一步攻击。  
  
  
**危害影响**  
  
  
  
  
  
  
  
  
影响版本：  
  
Ivanti Endpoint Manager <= 2024 November security update  
  
Ivanti Endpoint Manager <= 2022 SU6 November security update  
  
  
**处置建议**  
  
  
  
  
  
  
  
  
官方已发布修复方案，受影响的用户建议及时下载补丁包进行漏洞修复。  
  
1. 下载安全热补丁文件。  
  
EPM 2024补丁下载链接：https://download.ivanti.com/downloads/Patch/component/EPM2024/Security/Flat/EPM_2024_Flat_Jan_2025_Patch.zip  
  
EPM 2022 SU6补丁下载链接：https://download.ivanti.com/downloads/Patch/component/EPM2022/Security/SU6/EPM_2022_SU6_Jan_2025_Patch.zip  
  
2. 关闭EPM控制台。  
  
3. 解压文件夹，以管理员身份打开PowerShell，然后运行Deploy.ps1（zip文件中包含详细说明）。  
  
4. 重新启动。  
  
  
![](https://mmbiz.qpic.cn/mmbiz_png/1t8LLTibEW5NtxqlBL1HLib8jMO0PWtibWTWTFPOa3ND1lyaEQyBgp2fodg9A1XxvPjY7L6ILtK26MBGhofWE0ORw/640?wx_fmt=png&wx_ "")  
![](https://mmbiz.qpic.cn/sz_mmbiz_gif/sDiaO8GNKJrJnzIYoQAv2nF3pgKm4SgdFkzuniaicBHQxgSdu0U0xyYbNDOcNkDMWCjwJNwKnic9ASAhhxEpkFL6lg/640?wx_fmt=gif&wx_ "")  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
