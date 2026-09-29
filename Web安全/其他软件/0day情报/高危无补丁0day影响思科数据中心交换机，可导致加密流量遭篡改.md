---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  高危无补丁0day影响思科数据中心交换机，可导致加密流量遭篡改   
Sergiu Gatlan  代码卫士   2023-07-07 17:48  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Az5ZsrEic9ot90z9etZLlU7OTaPOdibteeibJMMmbwc29aJlDOmUicibIRoLdcuEQjtHQ2qjVtZBt0M5eVbYoQzlHiaw/640?wx_fmt=gif "")  
  
   
聚焦源代码安全，网罗国内外最新资讯！****  
  
**编译：代码卫士**  
  
**今天，思科提醒客户称某些数据中心交换机型中存在一个高危漏洞，可导致攻击者篡改加密流量。该漏洞的编号是CVE-2023-20185。**  
  
  
![](https://mmbiz.qpic.cn/mmbiz_png/oBANLWYScMRicJe1G0dSEr7hrV6alX1lI86sGbzVibc7kh7KaSzNjD1hqevItSG5vPpOH8PQRxGlapskGQxeusxA/640?wx_fmt=png "")  
  
  
该漏洞是思科内部审计数据中心 Cisco Nexus 9000系列 Fabric 交换机的 ACI 多站点 CloudSec 加密特性时发现的。该漏洞仅影响Cisco Nexus 9332C、9364C和9500 脊交换机（配备Cisco Nexus N9K-X9736C-FX Line Card）且它们需满足一些条件，包括处于 ACI 模式下、是 Multi-Site 拓扑的一部分、启用了 CloudSec 加密特性以及运行固件14.0和后续版本。  
  
漏洞如遭成功利用，可导致未认证攻击者远程读取或修改站点之间交换的站点间加密流量。思科表示，“该漏洞是因为受影响交换机上CloudSec 加密特性所使用的密码被执行时引发的。在 ACI 站点之间拥有在路径位置的攻击者可通过拦截站点间加密流量的方式利用该漏洞，并通过加密分析技术破解该加密。”  
  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/oBANLWYScMRicJe1G0dSEr7hrV6alX1lIgwEK7OHSFHaiaQP0IbCAUSibJZcEQqvySnjFnpTwhIRc6mycG2nEq1GQ/640?wx_fmt=gif "")  
  
**无补丁且无活跃利用**  
  
  
思科尚未发布CVE-2023-20185的软件更新。建议使用受影响数据中心交换机的客户关闭易受影响的特性并获得支持组织机构的指南，探索可选解决方案。  
  
如需寻找 ACI 站点上是否使用了 CloudSec 加密，则需在Cisco Nexus Dashboard Orchestrator (NDO) 的 Infrastructure > Site Connectivity > Configure > Sites > site-name > Inter-Site Connectivity，检查“CloudSec 加密”是否被标记为“已启用”。检查 Cisco Nexus 9000系列交换机上是否启用了 CloudSec 加密，则在交换机命令行运行 show cloudsec sa interface all 命令。如为任何接口访问“Operational Status”，则说明加密已启用。  
  
思科产品安全事件响应团队 (PSIRT) 尚未发现该漏洞已遭利用的迹象。5月份，该团队还修复了四个严重的远程代码执行漏洞，它们的利用代码已公开且影响多款 Small Business 系列路由器。  
  
另外，思科正在着手修复位于 Prime Collaboration Deployment (PCD) 服务器管理工具中的一个跨站点脚本 (XSS) 漏洞。它由北约网络安全中心的研究员 Pierre Vivegnis 报告。  
  
****  
代码卫士试用地址：  
https://codesafe.qianxin.com  
  
开源卫士试用地址：https://oss.qianxin.com  
  
  
  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[奇安信入选全球《静态应用安全测试全景图》代表厂商](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247516678&idx=1&sn=5b9e480c386161b1e105f9818b2a5a3d&chksm=ea94b36cdde33a7a05cafa9918733669252a02611c222b02bc6e66cbb508ee3fbf748453ee7a&scene=21#wechat_redirect)  
  
  
[奇安信入选全球《软件成分分析全景图》代表厂商](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247515374&idx=1&sn=8b491039bc40f1e5d4e1b29d8c95f9e7&chksm=ea948d84dde30492f8a6c9953f69dbed1f483b6bc9b4480cab641fbc69459d46bab41cdc4859&scene=21#wechat_redirect)  
  
  
[思科修复企业协作解决方案中的严重漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247516704&idx=1&sn=6a051f71c4415e8ad5f9be754927a9e7&chksm=ea94b34adde33a5c62b6fd4ed5257ace796ceae62afe7d61ca91d818c2973aaa40cfbe68ff91&scene=21#wechat_redirect)  
  
  
[思科提醒：多款交换机存在多个RCE漏洞且利用代码已公开](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247516520&idx=1&sn=b218e43205e7038adc4f452ffee4c6e2&chksm=ea94b002dde339147f0499b209d253c186277b9ecf0af4a44153ac18705dffd978ecbe379083&scene=21#wechat_redirect)  
  
  
[思科电话适配器易受 RCE 攻击，目前无修复方案](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247516392&idx=2&sn=30f06254fcca6feb3228b78389c85056&chksm=ea94b182dde338944d1c48c872c538f5333e8de4ceb4594aede8579d82c069df184557fca031&scene=21#wechat_redirect)  
  
  
[思科服务器管理工具中存在 XSS 0day](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247516356&idx=1&sn=3a870e38244c8f43090fe23f54c81fa7&chksm=ea94b1aedde338b8242499091a2cb37dec7924bffa0bde2f1dc62c5d42e10242fb0125850d86&scene=21#wechat_redirect)  
  
  
[思科企业路由器受高危DoS漏洞影响](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247515885&idx=1&sn=8bd8588f210b0b78430ead9ac6d5eeb1&chksm=ea948f87dde30691621e2aadd60a0a45bf17ed8880497e1c1b6489d2b57c7f52806f896318c4&scene=21#wechat_redirect)  
  
  
  
  
**原文链接**  
  
https://www.bleepingcomputer.com/news/security/cisco-warns-of-bug-that-lets-attackers-break-traffic-encryption/  
  
  
题图：Pixabay License  
  
  
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
