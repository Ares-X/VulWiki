---
cve: "CVE-2024-38812"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  CNCERT：关于VMware vCenter Server存在堆溢出漏洞的安全公告   
 安全内参   2024-10-24 16:44  
  
安全公告编号:  
CNTA-2024-0018  
  
  
  
2024年10月23日，国家信息安全漏洞共享平台（CNVD）收录了VMware vCenter Server堆溢出漏洞（CNVD-2024-41447，对应CVE-2024-38812）。具有网络访问权限的攻击者可利用漏洞远程执行代码，获取服务器控制权限。官方已于10月21日发布安全公告修复该漏洞，CNVD建议受影响的单位和用户安全升级到最新版本。  
  
**一、漏洞情况分析**  
  
VMware vCenter Server是VMware公司提供的一款虚拟化服务器管理平台，用于集中管理和监控VMware vSphere虚拟化环境。  
  
近日，VMware公司发布安全公告修复了VMware vCenter Server堆溢出漏洞。vCenter Server的远程过程调用（DCERPC）协议实现存在堆溢出漏洞，具有vCenter Server网络访问权限的恶意攻击者可利用该漏洞，通过远程发送特制的网络数据包来触发该漏洞，从而执行任意代码，实现对服务器的权限获取和完全控制。  
  
CNVD对该漏洞的综合评级为“高危”。  
  
**二、漏洞影响范围**  
  
漏洞影响的产品和版本：  
  
VMware vCenter Server 8.0 < 8.0 U3d  
  
VMware vCenter Server 8.0 < 8.0 U2e  
  
VMware vCenter Server 7.0 < 7.0 U3t  
  
VMware Cloud Foundation 5.x < 8.0 U3d  
  
VMware Cloud Foundation 5.x < 8.0 U2e  
  
VMware Cloud Foundation 4.x < 7.0 U3t  
  
**三、漏洞处置建议**  
  
目前，VMware公司已发布新版本修复该漏洞，CNVD建议受影响用户升级至最新版本：  
  
VMware vCenter Server 8.0 U3d  
  
VMware vCenter Server 8.0 U2e  
  
VMware vCenter Server 7.0 U3t  
  
VMware Cloud Foundation 5.x 8.0 U3d  
  
VMware Cloud Foundation 5.x 8.0 U2e  
  
VMware Cloud Foundation 4.x 7.0 U3t  
  
官方下载链接及文档地址：  
  
VMware vCenter Server 8.0 U3d：  
  
https://support.broadcom.com/web/ecx/solutiondetails?patchId=5574  
  
https://docs.vmware.com/en/VMware-vSphere/8.0/rn/vsphere-vcenter-server-80u3d-release-notes/index.html  
  
VMware vCenter Server 8.0 U2e：  
  
https://support.broadcom.com/web/ecx/solutiondetails?patchId=5531  
  
https://docs.vmware.com/en/VMware-vSphere/8.0/rn/vsphere-vcenter-server-80u2e-release-notes/index.html  
  
VMware vCenter Server 7.0 U3t：  
  
https://support.broadcom.com/web/ecx/solutiondetails?patchId=5580  
  
https://docs.vmware.com/en/VMware-vSphere/7.0/rn/vsphere-vcenter-server-70u3t-release-notes/index.html  
  
Cloud Foundation 5.x/4.x：  
  
https://knowledge.broadcom.com/external/article?legacyId=88287  
  
  
参考链接：  
  
https://support.broadcom.com/web/ecx/support-content-notification/-/external/content/SecurityAdvisories/0/24968  
  
感谢奇安信网神信息技术（北京）股份有限公司为本报告提供的技术支持。  
  
  
**推荐阅读**  
- [网安智库平台长期招聘兼职研究员](http://mp.weixin.qq.com/s?__biz=MzI4NDY2MDMwMw==&mid=2247499450&idx=2&sn=2da3ca2e0b4d4f9f56ea7f7579afc378&chksm=ebfab99adc8d308c3ba6e7a74bd41beadf39f1b0e38a39f7235db4c305c06caa49ff63a0cc1d&scene=21#wechat_redirect)  
  
  
- [欢迎加入“安全内参热点讨论群”](https://mp.weixin.qq.com/s?__biz=MzI4NDY2MDMwMw==&mid=2247501251&idx=1&sn=8b6ebecbe80c1c72317948494f87b489&chksm=ebfa82e3dc8d0bf595d039e75b446e14ab96bf63cf8ffc5d553b58248dde3424fb18e6947440&token=525430415&lang=zh_CN&scene=21#wechat_redirect)  
  
  
  
  
  
  
文章来源：CNVD漏洞平台  
  
  
点击下方卡片关注我们，  
  
带你一起读懂网络安全 ↓  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
