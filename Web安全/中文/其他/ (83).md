---
cve: "CVE-2024-42062"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【漏洞预警】Apache CloudStack 权限提升漏洞（CVE-2024-42062）   
原创 聚焦网络安全情报  安全聚   2024-08-07 20:39  
  
预警公告 **高危**  
  
近日，安全聚实验室监测到 Apache CloudStack 存在由密钥信息泄露导致的权限提升漏洞，编号为：CVE-2024-42062， 拥有域管理员访问权限的攻击者可以利用此漏洞获得root管理员和其他账户权限，导致权限提升，并且可以执行恶意操作。  
  
  
**01**  
  
**漏洞描述**  
  
  
Apache CloudStack是一个开源的基础设施即服务（IaaS）平台，旨在提供企业级的云计算解决方案。作为一个全功能的云管理平台，Apache CloudStack能够帮助用户轻松地部署、管理和扩展公共、私有或混合云环境。它支持多个虚拟化技术，如VMware、KVM、XenServer等，同时提供了丰富的管理功能，包括自动化虚拟机管理、网络管理、存储管理等。Apache CloudStack具有高度可扩展性和灵活性，适用于各种规模的云计算部署，从小型部署到大型企业级部署。由于访问权限控制不当，域管理员账户能够查询环境中所有已注册的账户用户API和密钥，包括root管理员的API和密钥。拥有域管理员访问权限的攻击者可以利用此漏洞获取root管理员和其他账户的权限，并执行恶意操作。  
  
**02**  
  
**影响范围**  
  
4.10.0 <= Apache CloudStack <= 4.18.2.24.19.0.0 <= Apache CloudStack <= 4.19.1.0  
  
**03**  
  
**安全措施**  
  
  
目前厂商已发布可更新版本，建议用户尽快更新至 Apache CloudStack 的修复版本或更高的版本：Apache CloudStack >= 4.18.2.3Apache CloudStack >= 4.19.1.1下载链接：https://cloudstack.apache.org/downloads  
  
**04**  
  
**参考链接**  
  
  
1.https://cloudstack.apache.org/blog/security-release-advisory-4.19.1.1-4.18.2.3/2.https://lists.apache.org/thread/lxqtfd6407prbw3801hb4fz3ot3t8wlj  
  
**05**  
  
**技术支持**  
  
  
长按识别二维码，关注“**安全聚**”公众号，联系我们的团队技术支持。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/Icw1mW4eH3f0EPFicEDoJgTxOg248sjyFribLQXHTQsQCnIpRGg4OgIoF6MxfibpiaOK7aZXgNejnNKMlWSg9pecaw/640?wx_fmt=jpeg&from=appmsg "")  
  
  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
