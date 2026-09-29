---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  Veeam 修复备份服务器中的RCE漏洞  
Sergiu Gatlan  代码卫士   2026-01-08 10:03  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Az5ZsrEic9ot90z9etZLlU7OTaPOdibteeibJMMmbwc29aJlDOmUicibIRoLdcuEQjtHQ2qjVtZBt0M5eVbYoQzlHiaw/640?wx_fmt=gif "")  
    
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
**Veeam****发布安全更新，修复备份与复制软件中的多个安全漏洞，包括一个严重的远程代码执行漏洞CVE-2025-59470。该漏洞影响Veeam备份与复制软件13.0.1.180及所有更早的13.x版本。**  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
本周二，Veeam发布安全公告称：“该漏洞可导致拥有 Backup 或 Tape Operator权限的攻击者，通过发送恶意的时间间隔参数或排序参数，以postgres用户身份执行远程代码。” 不过Veeam 认为该漏洞仅能遭拥有Backup 或 Tape Operator权限的攻击者利用，因此将严重等级调整为“高危”。该公司在安全公告补充中指出：“Backup 或 Tape Operator角色被视为高权限角色，应受到相应级别的保护。遵循Veeam建议的安全指南可进一步降低漏洞被利用的可能性。”  
  
Veeam已于1月6日发布版本13.0.1.1071，修复该RCE漏洞，并同时修复了另外两个漏洞：高危漏洞CVE-2025-55125和中危漏洞CVE-2025-59468。这两个漏洞分别可导致恶意备份或磁带操作员通过创建恶意的备份配置文件或发送恶意密码参数，获得远程代码执行权限。  
  
Veeam备份与复制软件 (VBR) 是一款企业级数据备份与恢复解决方案，用于创建关键数据和应用程序的副本，以便在网络攻击、硬件故障或灾难发生后能够快速恢复。  
  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/oBANLWYScMSHZBiaVPjVHlxOEE8EGvBrPqzVFEeJ5VmHkJGh3ZcIjgvX78GVmOn4nN3jf7wZ4k8JlYo4ATPewkw/640?wx_fmt=gif&from=appmsg "")  
  
**Veeam 常遭勒索团伙利用**  
  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/oBANLWYScMSHZBiaVPjVHlxOEE8EGvBrPqzVFEeJ5VmHkJGh3ZcIjgvX78GVmOn4nN3jf7wZ4k8JlYo4ATPewkw/640?wx_fmt=gif&from=appmsg "")  
  
  
  
VBR软件在中大型企业及托管服务提供商中尤为普及，但也常成为勒索软件团伙的攻击目标。因为在受害者的网络环境中，VBR服务器可作为快速横向移动的跳板。  
  
勒索软件团伙曾向BleepingComputer透露，他们总是以受害者的VBR服务器为目标，以此简化数据窃取过程，并便于在部署勒索软件 payload 前删除备份，从而阻止数据恢复。  
  
古巴勒索软件团伙以及出于财务动机的FIN7威胁组织（该组织曾与Conti、REvil、Maze、Egregor和BlackBasta等勒索软件团伙合作）此前也曾被证实利用过VBR漏洞发起攻击。更近期的是Sophos X-Ops事件响应团队在2024年11月透露称，Frag勒索软件利用了两个月前披露的另一个VBR远程代码执行漏洞CVE-2024-40711。该漏洞也曾被Akira和Fog勒索软件利用，自2024年10月起针对存在漏洞的Veeam备份服务器发起攻击。  
  
Veeam在全球拥有超过55万客户，其中包括74%的全球2000强企业和82%的财富500强公司。  
  
****  
****  
  
 开源  
卫士试用地址：  
https://oss.qianxin.com/#/login  
  
  
 代码卫士试用地址：https://sast.qianxin.com/#/login  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[Veeam RCE漏洞导致域用户入侵备份服务器](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247523322&idx=2&sn=347204929358f8a4c82b2634e62774cd&scene=21#wechat_redirect)  
  
  
[Veeam 修复Backup & Replication 中的严重RCE漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247522555&idx=1&sn=46e012bb1770fd23ba35da839b60f669&scene=21#wechat_redirect)  
  
  
[Veeam 提醒注意VSPC中的严重RCE漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247521684&idx=1&sn=b5ba5835dc8937327b3ded698979f0f2&scene=21#wechat_redirect)  
  
  
[Veeam 修复5个严重漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247520714&idx=1&sn=df4e06a4fa7f19703c54eeb2ccf244d6&scene=21#wechat_redirect)  
  
  
[Veeam：Backup Enterprise Manager 中存在严重的认证绕过漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247519550&idx=2&sn=6b4de50a6ef98b37be097aae6daafa64&scene=21#wechat_redirect)  
  
  
  
  
  
**原文链接**  
  
https://www.bleepingcomputer.com/news/security/new-veeam-vulnerabilities-expose-backup-servers-to-rce-attacks/  
  
  
题图：Pixa  
bay Licens  
e  
  
  
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
