---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  博通：注意 Vmware Windows Tools 中的认证绕过漏洞   
Sergiu Gatlan  代码卫士   2025-03-26 18:20  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Az5ZsrEic9ot90z9etZLlU7OTaPOdibteeibJMMmbwc29aJlDOmUicibIRoLdcuEQjtHQ2qjVtZBt0M5eVbYoQzlHiaw/640?wx_fmt=gif "")  
  
   
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
**博通发布安全更新，修复了位于Windows版 Vmware Tools中的一个高危认证绕过漏洞CVE-2025-22230。**  
  
  
![](https://mmbiz.qpic.cn/mmbiz_png/oBANLWYScMQjsAJ7iaX1kH2GH6cYn58icGV5BywFXP63ibOKxIY6Jjsny8jCt9InCW6Y2kDW5LGavHEKrCukcx8Dw/640?wx_fmt=png&from=appmsg "")  
  
  
Vmware Tools 包括一系列驱动和工具，旨在提升在 Vmware 虚拟机中运行的guest 操作系统的性能、图形和整体系统集成。该漏洞是由一个访问控制不当弱点引发的，由 Positive Technologies 公司（被美国以走私黑客工具为名遭制裁的一家俄罗斯网络安全公司）的研究员 Sergey Bliznyuk 报送。  
  
具有低权限的本地攻击者可在无需用户交互的复杂度低的攻击中利用该漏洞，从而获得易受攻击虚拟机上的高权限。Vmware 公司发布安全公告提到，“在Windows guest VM上拥有非管理权限的恶意人员或能够在该VM中执行某些高权限操作。”  
  
本月早些时候，博通还修复了三个Vmware 0day漏洞（CVE-2025-22224、CVE-2025-22225和CVE-2025-22226），它们已遭利用，由微软威胁情报中心报送。正如该公司当时解释的那样，具有提权后管理员权限或根访问权限的攻击者可组合利用这些漏洞，逃逸虚拟机的沙箱。  
  
就在补丁发布几天后，威胁监控平台 Shadowserver 发现超过3.7万个暴露在互联网的 Vmware ESXi实例易受CVE-2025-22224攻击。  
  
勒索团伙和受国家支持的黑客组织经常攻击Vmware 漏洞，因为Vmware 产品广泛用于企业运营中，存储或传输敏感的企业数据。例如，博通公司在去年11月提醒称攻击者正在利用两个 VMware vCenter Server 中的多个漏洞：一个提权至root的漏洞（CVE-2024-38813）和一个严重的RCE漏洞（CVE-2024-38812）。  
  
  
代码卫士试用地址：  
https://codesafe.qianxin.com  
  
开源卫士试用地址：https://oss.qianxin.com  
  
  
  
  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[博通修复3个已遭利用的 VMware 0day 漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247522410&idx=1&sn=0f5b704ab0b14c7dd3262ffbc0697b07&scene=21#wechat_redirect)  
  
  
[VMware 修复 Aria Operations 中的多个高危漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247521645&idx=2&sn=3a85491541969226b45d2bca18f4373b&scene=21#wechat_redirect)  
  
  
[补丁不给力，VMware vCenter 严重RCE漏洞遭利用](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247521523&idx=1&sn=286f99df03f25ebd1cb1fb497f991b21&scene=21#wechat_redirect)  
  
  
[VMware 修复HCX 平台上可导致RCE的高危SQLi 漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247521136&idx=2&sn=092bf2813ecefa63156a83b9d8eab160&scene=21#wechat_redirect)  
  
  
  
  
  
**原文链接**  
  
https://www.bleepingcomputer.com/news/security/broadcom-warns-of-authentication-bypass-in-vmware-windows-tools/  
  
  
  
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
  
   
觉得不错，就点个 “  
在看  
” 或 "  
赞  
” 吧~  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
