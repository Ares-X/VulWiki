---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  思科 Unified CM 中存在满分漏洞，可用于获得root权限  
Ravie Lakshmanan  代码卫士   2025-07-03 10:55  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Az5ZsrEic9ot90z9etZLlU7OTaPOdibteeibJMMmbwc29aJlDOmUicibIRoLdcuEQjtHQ2qjVtZBt0M5eVbYoQzlHiaw/640?wx_fmt=gif "")  
    
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
**思科发布安全更新，修复了位于Unified CM 和 Unified CM SME中的一个满分漏洞CVE-2025-20309，CVSS评分10分，可导致攻击者以 root 用户身份登录可疑设备，获得提升后的权限。**  
  
![](https://mmbiz.qpic.cn/mmbiz_png/oBANLWYScMTzEKgjQaZRqN5pGpEzyYtVyjqBkfEBgm6yB9t7AEYG6YXCcNp3bmfzicKunyobJWwBHeib07UKC40w/640?wx_fmt=png&from=appmsg "")  
  
  
思科在安全公告中提到，“该漏洞是由于为开发保留的root账户的静态用户凭据而引起的。攻击者可利用该账号登录到受影响系统，利用该漏洞，以 root 用户身份执行任意命令。”  
  
此类硬编码凭据通常源自开发过程中的测试或快速修复，但永远不应进入生产系统。 Unified CM负责处理公司语音通话和通信，这类工具的 root 访问权限可导致攻击者更深入地移到网络中、监听通话或更改用户的登录方式。  
  
思科表示未发现该漏洞遭在野利用的证据，且该漏洞是在内部安全测试过程中发现的。该漏洞影响 Unified CM 和 Unified CM SME 15.0.1.13010-1至 15.0.1.13017-1的所有版本，无论设备配置如何。  
  
思科还发布了与该漏洞相关联的妥协指标 (IoCs)，表示成功利用该漏洞可导致具有 root 权限的 root 用户在 "/var/log/active/syslog/secure" 日志文件中留下日志条目，可通过从命令行界面运行如下命令获取该日志：  
```
cucm1# file get activelog syslog/secure
```  
  
  
几天前，思科刚刚修复了位于ISE和ISE Passive Identity Connector 中的两个严重漏洞（CVE-2025-20281和CVE-2025-20282），它们可导致未认证攻击者以 root 用户身份执行任意命令。  
  
  
代码卫士试用地址：  
https://codesafe.qianxin.com  
  
开源卫士试用地址：https://oss.qianxin.com  
  
  
  
  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[思科提醒注意 ISE 中的满分 RCE 漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247523394&idx=1&sn=6155e41bcc07bb70bcdcdd88cc88d8de&scene=21#wechat_redirect)  
  
  
[思科 AnyConnect VPN 服务器漏洞可用于触发 DoS 条件](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247523347&idx=1&sn=4789a7999ec060d43881b5c1f1b8e576&scene=21#wechat_redirect)  
  
  
[思科提醒注意严重的 ISE 和 CCP 漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247523184&idx=1&sn=f205e1639e39bac5e3d3496845db4087&scene=21#wechat_redirect)  
  
  
[Atlassian 和思科修复多个高危漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247522791&idx=2&sn=841f61a29df71610844f2e021c5c9bab&scene=21#wechat_redirect)  
  
  
[思科智能许可证实用程序中的严重漏洞已遭利用](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247522568&idx=2&sn=ec34401dbcb58be493c11352d5815bb6&scene=21#wechat_redirect)  
  
  
  
  
  
**原文链接**  
  
https://thehackernews.com/2025/07/critical-cisco-vulnerability-in-unified.html  
  
  
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
