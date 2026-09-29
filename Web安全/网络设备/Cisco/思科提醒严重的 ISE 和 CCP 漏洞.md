---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  思科提醒注意严重的 ISE 和 CCP 漏洞   
Sergiu Gatlan  代码卫士   2025-06-05 10:37  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Az5ZsrEic9ot90z9etZLlU7OTaPOdibteeibJMMmbwc29aJlDOmUicibIRoLdcuEQjtHQ2qjVtZBt0M5eVbYoQzlHiaw/640?wx_fmt=gif "")  
   
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
**思科发布补丁，修复了位于身份服务引擎 (ISE) 和客户协作平台 (CCP) 解决方案中的、已存在公开利用代码的三个漏洞。**  
  
其中最严重的是位于思科ISE中的静态凭据漏洞CVE-2025-20286。ISE 是基于身份的策略执行软件，在企业环境中提供端点访问控制和网络设备管理服务。该漏洞是因为在云平台上部署ISE时不当生成凭据造成的，可导致不同部署共享凭据。  
  
未认证攻击者可从ISE云部署中提取用户凭据并借此访问其它云环境中的部署。然而，如思科解释，威胁行动者只有在主管理节点在云中部署时才能成功利用该漏洞。  
  
思科解释称，“部署了思科ISE的AWS、微软 Azure 和 Oracle OCI 云中存在一个漏洞，可导致未认证的远程攻击者在受影响系统中访问敏感数据、执行有限的管理员操作、修改系统配置或者破坏服务。思科PSIRT 已了解到本安全公告中提到的漏洞已存在 PoC 利用代码。”  
  
思科还提到，如下ISE 部署不受影响：  
  
- 所有从思科软件下载中心（ISO或OVA）中安装工件的具有任何形状参数的所有本地部署，包括具有不同形状参数的设备和虚拟机。  
  
- Azure VMware Solution (AVS) 上的 ISE  
  
- 谷歌云 VMware Engine 上的ISE  
  
- AWS中VMware 云上的ISE  
  
- 具有所有本地ISE 管理员角色（主要和第二管理员）以及具有云中其它角色的ISE 混合部署  
  
  
  
思科建议仍在等待热修复方案或无法立即应用今天所发布热修复方案的管理员，在主管理角色云节点上运行命令 application reset-config ise，重置用户密码。然而，管理员应该意识到该命令将把思科 ISE 重置为出厂配置，恢复备份也将恢复原始凭据。  
  
今天修复的其它拥有 PoC 利用代码的两个漏洞一个是位于ISE中的任意文件上传 (CVE-2025-20130)，另外一个是位于思科 CSP 中的信息泄露漏洞 (CVE-2025-20129)。  
  
去年9月份，思科还修复了另外一个已存在公开利用代码的ISE漏洞，它是命令注入漏洞，可导致攻击者在未修复系统上提权至根权限。  
  
  
代码卫士试用地址：  
https://codesafe.qianxin.com  
  
开源卫士试用地址：https://oss.qianxin.com  
  
  
  
  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[Atlassian 和思科修复多个高危漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247522791&idx=2&sn=841f61a29df71610844f2e021c5c9bab&scene=21#wechat_redirect)  
  
  
[思科智能许可证实用程序中的严重漏洞已遭利用](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247522568&idx=2&sn=ec34401dbcb58be493c11352d5815bb6&scene=21#wechat_redirect)  
  
  
[思科修复 IOS XR 中的10个漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247522518&idx=3&sn=6117e55c1a630be2784ce1a5033b2094&scene=21#wechat_redirect)  
  
  
[思科： Webex 漏洞可导致凭据遭远程访问](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247522410&idx=2&sn=0aef267bcd2c2f831a7dedbda98b4668&scene=21#wechat_redirect)  
  
  
[思科ISE严重漏洞导致攻击者以root权限运行命令](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247522190&idx=2&sn=9702cf83b7bdb3ee94d30829bea9f51b&scene=21#wechat_redirect)  
  
  
  
  
  
**原文链接**  
  
bleepingcomputer.com/news/security/cisco-warns-of-ise-and-ccp-flaws-with-public-exploit-code/  
  
  
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
