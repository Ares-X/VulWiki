---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  HPE Aruba漏洞致敏感信息遭未授权访问  
 嘶吼专业版   2026-01-16 06:00  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/wpkib3J60o297rwgIksvLibPOwR24tqI8dGRUah80YoBLjTBJgws2n0ibdvfvv3CCm0MIOHTAgKicmOB4UHUJ1hH5g/640?wx_fmt=gif "")  
  
HPE已发布安全补丁，修复其Networking Instant On设备中存在的多个高危漏洞。这些漏洞可能泄露内部VLAN配置数据，允许远程攻击者破坏无线网络或未授权获取敏感网络信息。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/wpkib3J60o29YDcBxoBic8tXFTf7aHeZ3DFDqialCESGASZFQ0b3BSaIHiafvycoflJTAl8CMXynqA2OiaibVLddrL1w/640?wx_fmt=jpeg&from=appmsg "")  
  
上述缺陷影响运行3.3.1.0及以下版本软件的Instant On接入点和1930交换机，3.3.2.0及更高版本已包含对应修复程序。  
  
根据HPE安全公告HPESBNW04988，最严重的漏洞（编号CVE-2025-37165）存在于HPE Networking Instant On接入点的路由器模式配置中，会导致VLAN信息在非预期网络接口上泄露。  
  
当设备以路由器模式运行时，精心构造的流量会使内部网络配置细节（如VLAN标识符及分段设计）通过数据包外泄，而此类数据包本不应包含此类信息。  
  
![](https://mmbiz.qpic.cn/mmbiz_png/wpkib3J60o287jwk8LWD9icmgWlahS21WB8lECGmeJOXSiafEcxpJYOHrph36wNX7lyjD7jckJk6EMZ4bGp59RNrA/640?wx_fmt=png "")  
  
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
  
![](https://mmbiz.qpic.cn/mmbiz_png/wpkib3J60o287jwk8LWD9icmgWlahS21WBibH0Iz3x2kLShrmHpicmyoLLZjhkG6s61yDMgXpJ74WhrDYlWupFxzKg/640?wx_fmt=png "")  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/wpkib3J60o2icEjy5ZrpCcgr4BicXicPv08DSsrgibDcJQpvwkZoO4OqdIpJNhj6TO5xV0ic0AnVf7f2kcPnNevQlTtQ/640?wx_fmt=png "")  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
