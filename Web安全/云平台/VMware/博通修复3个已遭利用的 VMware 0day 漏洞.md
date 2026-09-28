---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  博通修复3个已遭利用的 VMware 0day 漏洞   
Sergiu Gatlan  代码卫士   2025-03-05 18:15  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Az5ZsrEic9ot90z9etZLlU7OTaPOdibteeibJMMmbwc29aJlDOmUicibIRoLdcuEQjtHQ2qjVtZBt0M5eVbYoQzlHiaw/640?wx_fmt=gif "")  
  
   
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
**今天，博通发布安全公告提醒称 VMware 的三个0day 漏洞已遭在野利用。**  
  
这些漏洞是CVE-2025-22224、CVE-2025-22225和CVE-2025-22226，影响 VMware ESXi、Workstation 和 Fusion。受影响产品已获得补丁，但不存在应变措施。  
  
CVE-2025-22224 是一个严重的VMCI 堆溢出漏洞，影响 VMware ESXi 和 Worksation，可导致在虚拟机上拥有本地管理员权限的攻击者“作为在主机上运行的虚拟机的VMX进程执行代码”。  
  
CVE-2025-22225影响VMware ESXi，是一个高危的任意文件写漏洞，可导致在VMX 进程中拥有权限的攻击者“触发任意内核写，导致沙箱逃逸”。  
  
CVE-2025-22226影响VMware ESXi、Workstation 和 Fusion，是因HGFS 组件中界外读漏洞引起的高危信息泄露漏洞，可导致拥有虚拟机管理员权限的攻击者泄露VMX 进程中的内存。  
  
截至本文发布前，不存在利用这些0day漏洞的攻击的信息。  
  
博通在2023年收购VMware，该公司提到利用这些漏洞要求权限提升，也就是说攻击者获得对受害者系统的初始访问权限后，可能会利用这些漏洞发动更具针对性的攻击活动。这一理论在问答文档中得到佐证，博通提到这些0day漏洞可导致虚拟机逃逸。  
  
博通解释称，“当攻击者已经攻陷了虚拟机的guest OS 并获得提升后的访问权限（管理员或root）时，可转移到管理程序本身。”这些漏洞由微软威胁情报中心报送，不过微软目前尚未对此置评。  
  
威胁行动者利用VMware 产品漏洞的情况并不鲜见。CISA 发布的必须清单中包含了26个VMware 漏洞，不过今天公布的这三个0day漏洞并不包含在内。必修清单公认是不完整的，因此实际的漏洞数量可能会更多。  
  
  
  
代码卫士试用地址：  
https://codesafe.qianxin.com  
  
开源卫士试用地址：https://oss.qianxin.com  
  
  
  
  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[VMware 修复 Aria Operations 中的多个高危漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247521645&idx=2&sn=3a85491541969226b45d2bca18f4373b&scene=21#wechat_redirect)  
  
  
[补丁不给力，VMware vCenter 严重RCE漏洞遭利用](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247521523&idx=1&sn=286f99df03f25ebd1cb1fb497f991b21&scene=21#wechat_redirect)  
  
  
[关于VMware vCenter Server存在堆溢出漏洞的安全公告](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247521255&idx=2&sn=96000770c62b8decfa9e07a493e63e88&scene=21#wechat_redirect)  
  
  
[VMware 修复HCX 平台上可导致RCE的高危SQLi 漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247521136&idx=2&sn=092bf2813ecefa63156a83b9d8eab160&scene=21#wechat_redirect)  
  
  
[博通修复 VMware vCenter Server 中的严重RCE漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247520848&idx=2&sn=d95814f9037c7711dfcb09cd0e590f0c&scene=21#wechat_redirect)  
  
  
  
  
  
**原文链接**  
  
https://www.bleepingcomputer.com/news/security/cisa-tags-windows-and-cisco-vulnerabilities-as-actively-exploited/  
  
  
题图：  
Pixabay   
License  
  
****  
**本文由奇安信编译，不代表奇安信观点。转载请注明“转自奇安信代码卫士 https://codesafe.qianxin.com”。**  
  
  
  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/oBANLWYScMSf7nNLWrJL6dkJp7RB8Kl4zxU9ibnQjuvo4VoZ5ic9Q91K3WshWzqEybcroVEOQpgYfx1uYgwJhlFQ/640?wx_fmt=jpeg "")  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/oBANLWYScMSN5sfviaCuvYQccJZlrr64sRlvcbdWjDic9mPQ8mBBFDCKP6VibiaNE1kDVuoIOiaIVRoTjSsSftGC8gw/640?wx_fmt=jpeg "")  
  
**奇安信代码卫士 (codesafe)**  
  
国内首个专注于软件开发安全的产品线。  
  
   ![](https://mmbiz.qpic.cn/mmbiz_gif/oBANLWYScMQ5iciaeKS21icDIWSVd0M9zEhicFK0rbCJOrgpc09iaH6nvqvsIdckDfxH2K4tu9CvPJgSf7XhGHJwVyQ/640?wx_fmt=gif "")  
  
   
觉得不错，就点个 “  
在看  
” 或 "  
赞  
” 吧~  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
