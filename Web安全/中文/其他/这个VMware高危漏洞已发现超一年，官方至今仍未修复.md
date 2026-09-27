---
cve: "CVE-2022-22048"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  这个VMware高危漏洞已发现超一年，官方至今仍未修复   
 安全内参   2022-10-12 21:14  
  
**关注我们**  
  
  
**带你读懂网络安全**  
  
  
编译：  
代码卫士  
  
摘要  
  
VMware 提醒客户称，vCenter Server 8.0（最新版本）仍然未修复早在2021年11月就已发现的一个高危漏洞（CVE-2022-22048）。  
  
该漏洞是由CrowdStrike 公司的研究员在vCenter Server的IWA（集成Windows认证）机制中发现的，它还影响 VMware的Cloud Foundation 混合云平台部署。  
  
具有非管理员权限的攻击者可利用该漏洞，在未修复服务器上，将权限提升至更高的权限组。  
  
VMware 表示攻击者仅可使用邻近目标服务器的向量网络利用该漏洞，发动低权限且无需用户交互的高复杂性攻击（然而，NIST旗下NVD表示可遭远程利用，发动低复杂度攻击）。  
  
尽管如此，VMware 将该漏洞的严重性评级为“重要”，意味着“利用可导致用户数据和/或通过用户协助或认证攻击者处理资源的机密性和/或完整性遭完全攻陷”。  
  
尽管VMware 在2022年7月已发布安全更新，但仅解决了运行当时最新发布 (vCenter Server 7.0 Update 3f) 中的漏洞，不过11天后，由于补丁无法修复该漏洞且导致安全令牌服务 (vmware-stsd)在修复过程中崩溃而被放弃。  
  
VMware 发布安全公告指出，“VMware 认为响应矩阵中提到的 vCenter 7.0u3f 更新并未解决CVE-2021-22048，并引入功能问题。”  
  
缓解措施已发布  
  
尽管尚不存在针对所有受影响产品的补丁，但VMware提供了缓解措施，可使管理员移除该攻击向量。  
  
要拦截攻击尝试，VMware建议管理员从IWA转向 Active Directory over LDAPs 认证或者Identity Provider Federation for AD FS （仅限vSphere 7.0）。  
  
VMware公司解释称，“Active Directory over LDAP认证并不受该漏洞影响。然而，VMware 强烈建议客户转向另一种认证方法。Active Directory over LDAP并不理解域信任，因此转向该方法的客户必须为所信任的每个域名配置唯一的身份源。Identity Provider Federation for AD FS没有这种限制。”  
  
VMware 提供了相关更改指南。  
  
原文链接  
  
https://www.bleepingcomputer.com/news/security/vmware-vcenter-server-bug-disclosed-last-year-still-not-patched/  
  
  
**推荐阅读**  
- [网安智库平台长期招聘兼职研究员](http://mp.weixin.qq.com/s?__biz=MzI4NDY2MDMwMw==&mid=2247499450&idx=2&sn=2da3ca2e0b4d4f9f56ea7f7579afc378&chksm=ebfab99adc8d308c3ba6e7a74bd41beadf39f1b0e38a39f7235db4c305c06caa49ff63a0cc1d&scene=21#wechat_redirect)  
  
  
- [欢迎加入“安全内参热点讨论群”](https://mp.weixin.qq.com/s?__biz=MzI4NDY2MDMwMw==&mid=2247501251&idx=1&sn=8b6ebecbe80c1c72317948494f87b489&chksm=ebfa82e3dc8d0bf595d039e75b446e14ab96bf63cf8ffc5d553b58248dde3424fb18e6947440&token=525430415&lang=zh_CN&scene=21#wechat_redirect)  
  
  
  
  
  
  
文章来源：代码卫士  
  
  
点击下方卡片关注我们，  
  
带你一起读懂网络安全 ↓  
  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
