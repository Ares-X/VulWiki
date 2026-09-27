---
cve: "CVE-2024-29849"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【漏洞通告】Veeam Backup Enterprise Manager身份验证绕过漏洞安全风险通告   
 嘉诚安全   2024-06-12 16:48  
  
**漏洞背景**  
  
  
  
  
  
  
  
  
近日，嘉诚安全监测到Veeam Backup Enterprise Manager中存在一个身份验证绕过漏洞，漏洞编号为：CVE-2024-29849，目前该漏洞的  
**细节及PoC已公开**。  
  
  
Veeam Backup Enterprise Manager（VBEM）是一款用于通过单个Web UI管理多个Veeam Backup&Replication服务器的解决方案，有助于控制备份作业，并在组织的备份基础架构和大规模部署中执行恢复操作。  
  
  
鉴于漏洞危害较大，嘉诚安全提醒相关用户尽快更新至安全版本，避免引发漏洞相关的网络安全事件。  
  
  
**漏洞详情**  
  
  
  
  
  
  
  
  
经研判，该漏洞为  
**高危**漏洞，存在于Veeam.Backup.Enterprise.RestAPIService.exe服务中，未经身份验证的远程攻击者可利用该漏洞以任何用户身份登录Veeam Backup Enterprise Manager Web界面，导致未授权访问。  
  
  
**危害影响**  
  
  
  
  
  
  
  
  
影响范围  
  
Veeam Backup Enterprise Manager < 12.1.2.172  
  
  
**处置建议**  
  
  
  
  
  
  
  
  
目前该漏洞已经修复，受影响用户可升级到Veeam Backup Enterprise Manager 12.1.2.172或更高版本。  
  
下载链接：  
  
https://www.veeam.com/kb4581  
  
参考链接：  
  
https://summoning.team/blog/veeam-enterprise-manager-cve-2024-29849-auth-bypass/  
  
  
![](https://mmbiz.qpic.cn/mmbiz_png/1t8LLTibEW5NtxqlBL1HLib8jMO0PWtibWTWTFPOa3ND1lyaEQyBgp2fodg9A1XxvPjY7L6ILtK26MBGhofWE0ORw/640?wx_fmt=png&wx_ "")  
![](https://mmbiz.qpic.cn/sz_mmbiz_gif/sDiaO8GNKJrJnzIYoQAv2nF3pgKm4SgdFkzuniaicBHQxgSdu0U0xyYbNDOcNkDMWCjwJNwKnic9ASAhhxEpkFL6lg/640?wx_fmt=gif&wx_ "")  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
