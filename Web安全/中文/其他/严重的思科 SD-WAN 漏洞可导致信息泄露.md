---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  严重的思科 SD-WAN 漏洞可导致信息泄露   
Ionut Arghire  代码卫士   2023-07-18 17:52  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Az5ZsrEic9ot90z9etZLlU7OTaPOdibteeibJMMmbwc29aJlDOmUicibIRoLdcuEQjtHQ2qjVtZBt0M5eVbYoQzlHiaw/640?wx_fmt=gif "")  
  
   
聚焦源代码安全，网罗国内外最新资讯！****  
  
**编译：代码卫士**  
  
**思科 SD-WAN vManage 软件中存在一个可远程利用的漏洞 (CVE-2023-20214)，可导致未认证攻击者从易受攻击实例中检索信息。**  
  
该漏洞的 CVSS 评分为9.1，产生的原因在于 vManage 的 REST API 特性未充分验证请求。该 vManage API 可使管理员通过网络配置、控制和监控思科设备。攻击者可向易受攻击实例发送构造的 API 请求触发该漏洞，从 vManage 检索信息或者向 vManage 发送信息。  
  
思科在安全公告中提到，“思科 SD-WAN vManage 软件的 REST API 的请求认证验证中存在一个漏洞，可导致未认证的远程攻击者获得对受影响思科 SD-WAN vManage 实例的读权限或有限的写权限。”  
  
思科指出，基于 web 的管理接口和 CLI 并不受该漏洞影响。  
  
要获得访问 REST API 的尝试，建议管理员审计日志文件。然而，日志中的请求并未表明越权访问权限。思科提到，虽然并不存在相关缓解措施，但执行访问控制列表限制 vManage 访问可缓解该问题。  
  
思科解释称，“在云托管部署中，vManage 的访问受包含获允许的 IP 地址的访问控制列表限制。网络管理员应当审计和编辑访问控制列表中所许可的 IP 地址。在本地部署中，可通过使用访问控制列表和配置许可 IP 地址的类似方式限制 vManage 访问权限。”  
  
该漏洞已在 SD-WAN vManage 版本 20.6.3.4、20.6.4.2、20.6.5.5、20.9.3.2、20.10.1.2和20.11.1.2中修复。18.3至20.6.3.2 版本不受影响。建议使用SD-WAN vManage 20.7和20.8版本的用户迁移到已修复版本。  
  
思科表示并未发现该漏洞遭利用。  
  
  
  
代码卫士试用地址：  
https://codesafe.qianxin.com  
  
开源卫士试用地址：https://oss.qianxin.com  
  
  
  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[奇安信入选全球《静态应用安全测试全景图》代表厂商](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247516678&idx=1&sn=5b9e480c386161b1e105f9818b2a5a3d&chksm=ea94b36cdde33a7a05cafa9918733669252a02611c222b02bc6e66cbb508ee3fbf748453ee7a&scene=21#wechat_redirect)  
  
  
[奇安信入选全球《软件成分分析全景图》代表厂商](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247515374&idx=1&sn=8b491039bc40f1e5d4e1b29d8c95f9e7&chksm=ea948d84dde30492f8a6c9953f69dbed1f483b6bc9b4480cab641fbc69459d46bab41cdc4859&scene=21#wechat_redirect)  
  
  
[VMware SD-WAN 修复6个漏洞，可关闭整个企业网络](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247497818&idx=3&sn=93041b17a39c93e2f379eff3228041b4&chksm=ea94c930dde34026adb992630f4c282a582e4fbe02a89b28ed6f8460eea2b3517f5d56dfa40c&scene=21#wechat_redirect)  
  
  
  
  
**原文链接**  
  
https://www.securityweek.com/critical-cisco-sd-wan-vulnerability-leads-to-information-leaks/  
  
  
题图：Pexels License  
  
  
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
