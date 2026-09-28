---
cve: "CVE-2025-0994"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【漏洞通告】Trimble Cityworks反序列化漏洞安全风险通告   
 嘉诚安全   2025-02-13 00:29  
  
**漏洞背景**  
  
  
  
  
  
  
  
  
近日，嘉诚安全监测到Trimble Cityworks反序列化漏洞，漏洞编号为：  
CVE-2025-0994。  
  
  
rimble Cityworks是一款基于地理信息系统（GIS）的资产管理平台，专为公共设施管理、城市规划和基础设施维护设计。它提供全面的解决方案，帮助政府和企业有效管理资产、维护设施、优化工作流程，并提升运营效率。通过与GIS技术的集成，Cityworks能够实现精确的空间数据管理，支持智能决策和资源分配。  
  
  
鉴于漏洞危害较大，嘉诚安全提醒相关用户尽快更新至安全版本，避免引发漏洞相关的网络安全事件。  
  
**漏洞详情**  
  
  
  
  
  
  
  
  
经研判，该漏洞为  
**高危**  
漏洞  
。  
该漏洞允许经过身份验证的攻击者在客户的Microsoft Internet Information Services（IIS）服务器上执行远程代码（RCE），可能导致系统被控制并危及数据安全。  
  
**危害影响**  
  
  
  
  
  
  
  
  
影响版本：  
  
Cityworks < 15.8.9  
  
Cityworks with Office Companion < 23.10  
  
**处置建议**  
  
  
  
  
  
  
  
  
1.升级版本  
  
升级至Cityworks 15.8.9或更新版本  
  
升级至Cityworks with Office Companion 23.10或更新版本  
  
下载链接：  
  
https://learn.assetlifecycle.trimble.com/i/1532182-cityworks-customer-communication-2025-02-06-docx/0?  
  
2.临时措施  
  
检查IIS服务器权限，避免使用本地或域级管理员权限  
  
优化附件目录配置，仅允许存储附件文件。  
  
3.通用建议  
  
定期更新系统补丁，减少系统漏洞，提升服务器的安全性。  
  
加强系统和网络的访问控制，修改防火墙策略，关闭非必要的应用端口或服务，减少将危险服务（如SSH、RDP等）暴露到公网，减少攻击面。  
  
使用企业级安全产品，提升企业的网络安全性能。  
  
加强系统用户和权限管理，启用多因素认证机制和最小权限原则，用户和软件权限应保持在最低限度。  
  
启用强密码策略并设置为定期修改。  
  
4.参考链接  
  
https://www.cisa.gov/known-exploited-vulnerabilities-catalog  
  
https://www.cisa.gov/news-events/ics-advisories/icsa-25-037-04  
  
https://nvd.nist.gov/vuln/detail/CVE-2025-0994  
  
https://learn.assetlifecycle.trimble.com/i/1532182-cityworks-customer-communication-2025-02-05-docx/0?  
  
  
![](https://mmbiz.qpic.cn/mmbiz_png/1t8LLTibEW5NtxqlBL1HLib8jMO0PWtibWTWTFPOa3ND1lyaEQyBgp2fodg9A1XxvPjY7L6ILtK26MBGhofWE0ORw/640?wx_fmt=png&wx_ "")  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_gif/sDiaO8GNKJrJnzIYoQAv2nF3pgKm4SgdFkzuniaicBHQxgSdu0U0xyYbNDOcNkDMWCjwJNwKnic9ASAhhxEpkFL6lg/640?wx_fmt=gif&wx_ "")  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
