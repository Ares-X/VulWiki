---
cve: "CVE-2023-20891"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【漏洞预警】VMware信息泄露漏洞   
安识科技  SecPulse安全脉搏   2023-07-27 10:29  
  
##   
  
1. **通告信息**  
  
  
  
近日，安识科技  
A-Team团队监测到VMware Tanzu Application Service for VMs （TAS for VMs）和Isolation Segment中存在信息泄露漏洞（CVE-2023-20891），该漏洞的CVSS评分为6.5。  
  
对此，安识科技建议广大用户及时升级到安全版本，并做好资产自查以及预防工作，以免遭受黑客攻击。  
##   
  
2. **漏洞概述**  
  
  
  
漏洞名称：  
VMware Tanzu Application Service for VMs & Isolation Segment信息泄露漏洞  
  
CVE编号：  
CVE-2023-20891  
  
简述：  
VMware Tanzu 应用程序服务是一个适用于公有云和私有云的应用程序开发和部署平台。  
  
适用于虚拟机的   
VMware Tanzu 应用程序服务和隔离段在多个版本中存在信息泄露漏洞，由于平台系统审核日志中以十六进制编码记录凭据，有权访问平台系统审核日志的非管理员用户（默认部署中非管理员用户无权访问平台系统审核日志）可以访问十六进制编码的CF API管理员凭据，导致敏感信息泄露，可利用该漏洞推送恶意应用程序。  
##   
  
3. **漏洞危害**  
  
  
  
由于平台系统审核日志中以十六进制编码记录凭据，有权访问平台系统审核日志的非管理员用户（默认部署中非管理员用户无权访问平台系统审核日志）可以访问十六进制编码的  
CF API管理员凭据，导致敏感信息泄露，可利用该漏洞推送恶意应用程序。  
##   
  
4. **影响版本**  
  
  
  
目前受影响的  
VMware Tanzu Application Service for VMs & Isolation Segment  
版本：  
  
VMware Tanzu Application Service for VMs 4.0.x < 4.0.5  
  
VMware Tanzu Application Service for VMs 3.0.x < 3.0.14  
  
VMware Tanzu Application Service for VMs 2.13.x < 2.13.24  
  
VMware Tanzu Application Service for VMs 2.11.x < 2.11.42  
  
Isolation Segment 4.0.x < 4.0.4  
  
Isolation Segment 3.0.x < 3.0.13  
  
Isolation Segment 2.13.x < 2.13.20  
  
Isolation Segment 2.11.x < 2.11.35  
##   
  
5. **解决方案**  
  
  
  
目前该漏洞已经修复，受影响用户可升级到以下版本：  
  
VMware Tanzu Application Service for VMs 4.0.x >= 4.0.5  
  
VMware Tanzu Application Service for VMs 3.0.x >= 3.0.14  
  
VMware Tanzu Application Service for VMs 2.13.x >= 2.13.24  
  
VMware Tanzu Application Service for VMs 2.11.x >= 2.11.42  
  
Isolation Segment 4.0.x >= 4.0.4  
  
Isolation Segment 3.0.x >= 3.0.13  
  
Isolation Segment 2.13.x >= 2.13.20  
  
Isolation Segment 2.11.x >= 2.11.35  
  
下载链接：  
  
https://www.vmware.com/security/advisories/VMSA-2023-0016.html  
  
临时措施：  
  
受影响用户可进行  
CF API 管理员凭据轮换，以确保威胁者无法使用任何泄露的密码。有关更改 Cloud Foundry 用户帐户和身份验证 (UAA) 管理员凭据，可参考：  
  
https://community.pivotal.io/s/article/How-to-Change-the-Admin-Password-for-UAA?language=en_US  
##   
  
6. **时间轴**  
  
  
  
【-】2023年0  
7  
月  
25  
日 安识科技A-Team团队监测到漏洞公布信息  
  
【  
-】2023年0  
7  
月  
26  
日   
安识科技  
A-Team团队根据漏洞信息分析  
  
【  
-】2023年0  
7  
月  
27  
日   
安识科技  
A-Team团队发  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
