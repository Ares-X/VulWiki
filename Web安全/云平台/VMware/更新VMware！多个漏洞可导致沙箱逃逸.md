---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  更新VMware！多个漏洞可导致沙箱逃逸   
看雪学苑  看雪学苑   2024-03-07 17:59  
  
3月5日，虚拟化巨头VMware针对虚拟机逃逸漏洞发布了紧急安全更新，漏洞影响范围包括VMware的ESXi、Workstation、Fusion和Cloud Foundation。  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/1UG7KPNHN8F4IGWNIKGxNd1Tibr0ibn5ZZ1JIibeNNnrM1GhB97AnH66sWlY43o8Ffqz6NxUY2Y4MLQvaGQqAsnWw/640?wx_fmt=png&from=appmsg "")  
  
  
  
据VMware公告，四个漏洞中有两个（CVE-2024-22252、CVE-2024-22253，CVSS评分皆为9.3）可能导致代码执行，它们分别是XHCI USB控制器和UHCI USB 控制器中的释放后使用漏洞（Use After Free）。在虚拟机上具有本地管理权限的攻击者通过利用该漏洞，能够在主机上以虚拟机的VMX进程执行代码。  
  
  
同时，VMware还修复了如下两个漏洞：  
  
CVE-2024-22254（CVSS评分7.9）-VMware ESXi中的越界写入漏洞，在VMX进程中具有特权的攻击者，能够利用此漏洞触发越界写入，从而导致沙箱逃逸。  
  
CVE-2024-22255（CVSS评分7.1）-VMware ESXi、Workstation和Fusion的UHCI USB控制器中的信息泄露漏洞，在虚拟机上具有管理访问权限的攻击者，能够利用此漏洞从vmx进程中泄露内存。  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/1UG7KPNHN8F4IGWNIKGxNd1Tibr0ibn5ZZqE75VUdGEULJLLXJWAG9ajK9WClnVkhhAoyX8DicNiclsDf8tkkcJszg/640?wx_fmt=png&from=appmsg "")  
  
  
VMware表示，上述漏洞使得攻击者有可能突破沙箱保护，违背了VMware产品的基本目的——在与主机相隔离的虚拟机内运行敏感操作。鉴于问题的严重性，VMware已在以下版本将之修复，包括已经达到生命周期终点（EoL）的版本：  
  
- ESXi 6.5 - 6.5U3v  
  
- ESXi 6.7 - 6.7U3u  
  
- ESXi 7.0 - ESXi70U3p-23307199  
  
- ESXi 8.0 - ESXi80U2sb-23305545和ESXi80U1d-23299997  
  
- VMware Cloud Foundation (VCF) 3.x  
  
- Workstation 17.x - 17.5.1  
  
- Fusion 13.x (macOS) - 13.5.1  
  
  
VMware敦促客户尽快为受影响的产品打上补丁。作为一种临时解决方案，用户可以选择从受影响的虚拟机中移除USB控制器。  
  
  
此链接查看公告详情：  
https://www.vmware.com/security/advisories/VMSA-2024-0006.html  
  
  
  
编辑：左右里  
  
资讯来源：VMware  
  
转载请注明出处和本文链接  
  
  
**每日涨知识**  
  
 后门(backdoor)  
  
后门是没有被记录到文挡的命令序列，允许软件开发人员绕过正常的访问限制。后门可  
以由制造商放置和留下，或者由黑客使用漏洞来放置。  
  
  
﹀  
  
﹀  
  
﹀  
  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/Uia4617poZXP96fGaMPXib13V1bJ52yHq9ycD9Zv3WhiaRb2rKV6wghrNa4VyFR2wibBVNfZt3M5IuUiauQGHvxhQrA/640?wx_fmt=jpeg "")  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_gif/1UG7KPNHN8E9S6vNnUMRCOictT4PicNGMgHmsIkOvEno4oPVWrhwQCWNRTquZGs2ZLYic8IJTJBjxhWVoCa47V9Rw/640?wx_fmt=gif "")  
  
**球分享**  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_gif/1UG7KPNHN8E9S6vNnUMRCOictT4PicNGMgHmsIkOvEno4oPVWrhwQCWNRTquZGs2ZLYic8IJTJBjxhWVoCa47V9Rw/640?wx_fmt=gif "")  
  
**球点赞**  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_gif/1UG7KPNHN8E9S6vNnUMRCOictT4PicNGMgHmsIkOvEno4oPVWrhwQCWNRTquZGs2ZLYic8IJTJBjxhWVoCa47V9Rw/640?wx_fmt=gif "")  
  
**球在看**  
  
****  
****  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/1UG7KPNHN8FxuBNT7e2ZEfQZgBuH2GkFjvK4tzErD5Q56kwaEL0N099icLfx1ZvVvqzcRG3oMtIXqUz5T9HYKicA/640?wx_fmt=gif "")  
  
戳  
“阅读原文  
”  
一起来充电吧！  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
