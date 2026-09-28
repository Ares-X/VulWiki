---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  华硕：启用AiCloud 的路由器中存在严重的认证绕过漏洞   
Bill Toulas  代码卫士   2025-04-21 09:32  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Az5ZsrEic9ot90z9etZLlU7OTaPOdibteeibJMMmbwc29aJlDOmUicibIRoLdcuEQjtHQ2qjVtZBt0M5eVbYoQzlHiaw/640?wx_fmt=gif "")  
    
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
**华硕提醒称，启用 AiCloud 的路由器中存在一个认证绕过漏洞，可导致远程攻击者在设备上执行未授权函数执行。**  
  
该漏洞的编号是CVE-2025-2492，CVSS v4评分为9.2，可通过一个特殊构造的请求遭远程利用且无需认证，使其尤为危险。华硕在安全通告中提到，“某些华硕路由器固件系列中存在一个认证控制不当漏洞。一个构造请求即可触发该漏洞。”  
  
AiCloud 是很多华硕路由器内置的基于云的远程访问特性，可将路由器转换为小型的私有云服务器。用户可通过AiCloud 访问从任何地方经由互联网连接到该路由器的USB驱动上的文件，远程访问流媒体、访问家庭网络和其它云存储服务之间的同步文件，并通过链接与他人共享文件。  
  
该漏洞位于 AiCloud 中，影响大量机型。华硕已为多个固件分支发布修复方案，包括 3.0.0.4_382系列、3.0.0.4_386系列、3.0.0.4_388系列和3.0.0.6_102系列。  
  
建议用户升级至相关型号的最新固件版本，可从厂商的支持门户或产品查询页面获得相关信息。另外，华硕还给出如何申请固件更新的详细指南。华硕还建议用户使用唯一密码保护无线网络安全和路由器管理员页面，并确保密码至少为10个字符长度且由字母、数字和字符组成。  
  
建议已达生命周期产品的受影响用户完全禁用 AiCloud 并关闭 WAN 的互联网访问权限、端口转发、DDNS、VPN服务器、DMZ、端口触发和FTP服务。  
  
虽然尚未有关于CVE-2025-2492已遭活跃利用或公开 PoC 利用的报告，但攻击者一般都会通过恶意软件利用这些漏洞或将其纳入 DDoS 僵尸网络中。因此，强烈建议用户尽快升级至最新固件版本。  
  
****  
代码卫士试用地址：  
https://codesafe.qianxin.com  
  
开源卫士试用地址：https://oss.qianxin.com  
  
  
  
  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[华硕：严重的远程绕过漏洞影响7款路由器](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247519766&idx=1&sn=e5617e80059a29c20c16b011271e8511&scene=21#wechat_redirect)  
  
  
[华硕证实菲律宾员工数据被泄露在黑客论坛](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247519060&idx=2&sn=6105a3152e4cf58dc7f6100cc53d066c&scene=21#wechat_redirect)  
  
  
[华硕路由器易遭多个RCE漏洞影响](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247517570&idx=1&sn=34fd77e3506951e7f7fd62a7ab442b2c&scene=21#wechat_redirect)  
  
  
[华硕紧急修复多个严重的路由器漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247516769&idx=1&sn=e00e30e1c0b1187da247a4f936d2761e&scene=21#wechat_redirect)  
  
  
[华硕修复可禁用安全启动程序的UEFI漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247514814&idx=2&sn=d77760825e29cde63586a63c502a43c9&scene=21#wechat_redirect)  
  
  
  
  
  
**原文链接**  
  
https://www.bleepingcomputer.com/news/security/asus-warns-of-critical-auth-bypass-flaw-in-routers-using-aicloud/  
  
  
  
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
