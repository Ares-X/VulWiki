---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  华硕 Armoury Crate漏洞可导致攻击者获取Windows 管理员权限  
Bill Toulas  代码卫士   2025-06-17 10:40  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Az5ZsrEic9ot90z9etZLlU7OTaPOdibteeibJMMmbwc29aJlDOmUicibIRoLdcuEQjtHQ2qjVtZBt0M5eVbYoQzlHiaw/640?wx_fmt=gif "")  
    
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
**华硕Armoury Crate软件中存在一个高危漏洞，可导致威胁人员在Windows设备上提权至系统权限。该漏洞是CVE-2025-3464，CVSS评分8.8。**  
  
![](https://mmbiz.qpic.cn/mmbiz_png/oBANLWYScMSW47rBFzuOCUm7ezhoRFVzofFc6icb0ozGx0q56Fv57KABKjPOnhTI3RRJbzFRTDO7SClpVZt3UYw/640?wx_fmt=png&from=appmsg "")  
  
  
该漏洞可用于绕过授权，影响 Armoury Crate 系统管理软件的 AsIO3.sys 版本。Armoury Crate 是华硕 Windows 的官方系统控制软件，为控制RGB灯光 (Aura Sync)、调整风扇弧度、管理性能配置和华硕外围设备以及下载驱动和固件更新提供统一接口。  
  
为了执行所有这些功能并提供底层系统监控，该软件套件使用内核驱动访问和控制硬件特性。思科Talos团队的研究员 Marcin “Icewall” Noga 报送了该漏洞。  
  
思科Talos 团队发布安全公告提到，该漏洞在于驱动基于 AsusCertService.exe的硬编码 SHA-256哈希和一个PID允许列表验证调用函数，而非使用正确的OS级别的访问控制。利用该漏洞需要创建从一个非恶意测试app到一个虚假可执行文件的硬链接。攻击者启动该app，暂停并将该硬链接指向 AsusCertService.exe。当该驱动检查该文件的 SHA-256哈希时，它会读取现已链接的可信二进制，使该测试 app 绕过授权并获得对驱动的访问权限。这就使得攻击者能够获得底层系统权限，从而直接访问物理内存、I/O端口和特定模型的注册表 (MSRs)，从而导致OS易受攻陷。  
  
值得注意的是，攻击者必须已经在该系统（恶意软件感染、钓鱼攻击、受陷低权限账户）才能利用CVE-2025-3464。然而，该漏洞在全球计算机上大量部署，因此这个庞大的攻击面足以吸引攻击者的火力。  
  
研究人员已正式开漏洞影响 Armoury Crate 5.9.13.0版本，但华硕在安全通告中提到，该漏洞影响5.9.9.0至6.1.18.0之间的所有版本。要缓解该漏洞，建议打开 Armoury Crate app，进入“设置＞更新中心＞检查更新＞更新”应用最新更新。  
  
2月份，思科将该漏洞报送给华硕，但截止目前尚未出现在野利用。不过，“华硕强烈建议用户将 Armoury Crate 更新至最新版本”。  
  
Windows 内核驱动漏洞可导致本地提权后果，非常受黑客欢迎，包括勒索团伙、恶意软件团伙以及政府机构威胁组织等。  
  
  
****  
代码卫士试用地址：  
https://codesafe.qianxin.com  
  
开源卫士试用地址：https://oss.qianxin.com  
  
  
  
  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[华硕修复严重的DriverHub 漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247522987&idx=1&sn=dd6c1684116b2d65b1efe7c80afe5945&scene=21#wechat_redirect)  
  
  
[华硕修复严重的AMI 漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247522841&idx=1&sn=b39cd7520c5b0c63d3c0e807374feeb2&scene=21#wechat_redirect)  
  
  
[华硕：启用AiCloud 的路由器中存在严重的认证绕过漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247522801&idx=1&sn=be29e21bdd328bab3ee1bbc42562d47e&scene=21#wechat_redirect)  
  
  
[华硕：严重的远程绕过漏洞影响7款路由器](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247519766&idx=1&sn=e5617e80059a29c20c16b011271e8511&scene=21#wechat_redirect)  
  
  
[华硕证实菲律宾员工数据被泄露在黑客论坛](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247519060&idx=2&sn=6105a3152e4cf58dc7f6100cc53d066c&scene=21#wechat_redirect)  
  
  
  
  
  
**原文链接**  
  
https://www.bleepingcomputer.com/news/security/asus-armoury-crate-bug-lets-attackers-get-windows-admin-privileges/  
  
  
  
题图：  
Pixabay Licen  
se  
  
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
