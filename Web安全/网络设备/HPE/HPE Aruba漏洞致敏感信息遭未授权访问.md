---
source: "gelusus/wxvl 公众号漏洞文库"
id: "vw-f261afb0b9f14675b86f7cd3"
entity_id: "ve-f261afb0b9f14675b86f7cd3"
schema_version: "1"
title: "HPE Aruba漏洞致敏感信息遭未授权访问"
product: "HPE Networking Instant On AP/1930交换机"
record_type: "roundup"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "primary"
primary_identifiers: "CVE-2025-37165; CVE-2025-37166"
referenced_identifiers: ""
prerequisites: "≤3.3.1.0/修3.3.2.0；37165需路由器模式，其余条件不同"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/HPE/HPE%20Aruba%E6%BC%8F%E6%B4%9E%E8%87%B4%E6%95%8F%E6%84%9F%E4%BF%A1%E6%81%AF%E9%81%AD%E6%9C%AA%E6%8E%88%E6%9D%83%E8%AE%BF%E9%97%AE.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_status: "unknown"
---

#  HPE Aruba漏洞致敏感信息遭未授权访问  

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：HPE Networking Instant On AP/1930交换机
- 本文讨论：CVE-2025-37165；CVE-2025-37166
- 版本、权限与配置前提：≤3.3.1.0/修3.3.2.0；37165需路由器模式，其余条件不同
- 资料类型：多漏洞新闻；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 唯一来源URL为gbhackers.com/nissan-motor-breach，与HPE主题明显不符
- 首段AP/交换机统称受影响，两个主漏洞正文只AP，需逐CVE型号映射
- 内核副漏洞条件与评分概括过宽；无HPESBNW04988直链

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- 原始公告、交换机映射/内核条件待核验
- 引用图片未查看，截图内容及有效性待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->

 嘶吼专业版   2026-01-16 06:00  
  
![](../../.resource/remote/80b6b7b79e984bc49420b10fe1591d45aaacd71189216eaceb88bde0aa98a0bc.gif "")  
  
HPE已发布安全补丁，修复其Networking Instant On设备中存在的多个高危漏洞。这些漏洞可能泄露内部VLAN配置数据，允许远程攻击者破坏无线网络或未授权获取敏感网络信息。  
  
![](../../.resource/remote/93fb3580ffb436b62518242bfb1f08b0c144327289979372cbe836e705db428f.jpg "")  
  
上述缺陷影响运行3.3.1.0及以下版本软件的Instant On接入点和1930交换机，3.3.2.0及更高版本已包含对应修复程序。  
  
根据HPE安全公告HPESBNW04988，最严重的漏洞（编号CVE-2025-37165）存在于HPE Networking Instant On接入点的路由器模式配置中，会导致VLAN信息在非预期网络接口上泄露。  
  
当设备以路由器模式运行时，精心构造的流量会使内部网络配置细节（如VLAN标识符及分段设计）通过数据包外泄，而此类数据包本不应包含此类信息。  
  
![](../../.resource/remote/8cf29923aecf253f283bbf72e013e921c67f52767b31cf2a04747d32e7c66482.png "")  
  
HPE Aruba Instant On缺陷泄露网络细节  
  
该漏洞无需身份验证或用户交互，可通过网络远程利用，严重等级为高，CVSS v3.1评分为7.5，对数据机密性影响极大，但不直接影响数据完整性或系统可用性。  
  
HPE警告称，能够监控或注入受影响接口流量的恶意攻击者，可利用泄露的VLAN及拓扑数据绘制内部网段地图，进而策划进一步横向渗透或针对网络敏感区域的定向攻击。  
  
目前该漏洞无临时解决方案，由Quora.org的丹尼尔·J·布鲁曼（Daniel J Blueman）发现并报告，其CVSS向量为CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:N/A:N，属于网络型低复杂度漏洞，无需任何权限即可利用。  
  
第二个高危漏洞（编号CVE-2025-37166）同样影响HPE Networking Instant On接入点，当设备处理特制网络数据包时可能被触发。  
  
成功利用该漏洞可导致接入点陷入无响应状态，部分情况下需硬重置才能恢复服务，使攻击者得以对Wi-Fi基础设施实施远程拒绝服务攻击。  
  
该漏洞由GreyCortex的彼得·切尔马尔（Petr Chelmar）发现，同样被评定为“高危”，CVSS v3.1评分为7.5，向量为CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H，凸显其对系统可用性的影响，而非数据安全性或完整性。  
  
此外，HPE Instant On设备还受底层操作系统内核中多个数据包处理漏洞影响，对应编号为CVE-2023-52340和CVE-2022-48839。  
  
这些内核级漏洞源于IPv4和IPv6数据包处理机制缺陷，可能导致设备运行期间出现拒绝服务故障及内存损坏，严重等级均为高，CVSS评分最高可达7.5，具体分值视漏洞编号及攻击向量而定。  
  
HPE表示，内核开发人员已在 upstream 层面修复这些漏洞，HPE Instant On工程团队也已完成集成，除升级软件外，无其他针对性临时解决方案。  
  
截至发稿，HPE尚未发现针对这些漏洞的公开利用代码或活跃攻击行为。  
  
HPE建议受影响的Aruba Instant On 1930交换机系列及Instant On接入点，尽快升级至3.3.2.0及更高版本软件。升级可通过2025年12月10日当周推送的自动更新完成，也可通过Instant On应用程序或Web门户手动操作。  
  
参考及来源：  
https://gbhackers.com/nissan-motor-breach/  
  
![](../../.resource/remote/96138f55660ddac887ee1f08aeb91402c73b11dc0ff5612eca8486560a08ec82.png "")  
  
![](../../.resource/remote/e3ceafd722522b1d33a4c6672786bddb148c5ad46649aad117bf1e82c6ce5e1f.png "")  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
