---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  思科提醒注意通信软件中的严重 RCE 漏洞   
Bill Toulas  代码卫士   2024-01-26 18:45  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Az5ZsrEic9ot90z9etZLlU7OTaPOdibteeibJMMmbwc29aJlDOmUicibIRoLdcuEQjtHQ2qjVtZBt0M5eVbYoQzlHiaw/640?wx_fmt=gif "")  
  
   
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
**思科提醒称，多款 Unified Communications Manager (CM) 和 Contact Center Solutions 产品易受严重的远程代码执行漏洞 (CVE-2024-20253) 影响。**  
  
  
思科 Unified Communications 和 Contact Center Solutions 是一体化解决方案，提供企业级语音、视频和消息服务以及客户参与和管理。该公司已发布安全公告提醒注意该漏洞，它可导致未认证的远程攻击者在受影响设备上执行任意代码。  
  
该漏洞由 Synacktiv 公司的研究员 Julien Egloff 发现，CVSS 评分为9.9分，是由不正确地将用户提供的数据读取处理到内存导致的。攻击者可向监听端口发送特殊构造的信息，可能以 web 服务用户的权限获得执行任意命令的能力并建立root 访问权限。  
  
该漏洞影响默认配置下的如下思科产品：  
  
- Packaged Contact Center Enterprise (PCCE) 12.0 及更早版本， 12.5(1) 和12.5(2)。  
  
- Unified Communications Manager (Unified CM) 版本11.5、12.5(1) 和14（Unified CM SME，同）。  
  
- Unified Communications Manager IM & Presence Service (Unified CM IM&P) 版本11.5(1)、12.5(1) 和14。  
  
- Unified Contact Center Enterprise (UCCE) 12.0 及更早版本，12.5(1) 和 12.5(2)。  
  
- Unified Contact Center Express (UCCX) 12.0 及更早版本和12.5(1)。  
  
- Unity Connection versions 11.5(1)、12.5(1) 和14。  
  
- Virtualized Voice Browser (VVB) 12.0及更早版本，12.5(1) 和12.5(2)。  
  
  
  
思科表示目前不存在应变措施，推荐应用可用的安全更新。如下发布修复了这个严重的远程代码执行漏洞：  
  
- PCCE: 12.5(1) 和12.5(2) 应用补丁ucos.v1_java_deserial-CSCwd64245.cop.sgn。  
  
- Unified CM和Unified CME：12.5(1)SU8 或 ciscocm.v1_java_deserial-CSCwd64245.cop.sha512. 14SU3 或 ciscocm.v1_java_deserial-CSCwd64245.cop.sha512。  
  
- Unified CM IM&P: 12.5(1)SU8 或 ciscocm.cup-CSCwd64276_JavaDeserialization.cop.sha512. 14SU3 或 ciscocm.cup-CSCwd64276_JavaDeserialization.cop.sha512。  
  
- UCCE: 为12.5(1) 和 12.5(2) 应用补丁ucos.v1_java_deserial-CSCwd64245.cop.sgn。  
  
- UCCX: 为12.5(1) 应用补丁ucos.v1_java_deserial-CSCwd64245.cop.sgn。  
  
- VVB:为 12.5(1) 和12.5(2) 应用补丁ucos.v1_java_deserial-CSCwd64245.cop.sgn。  
  
  
  
思科建议管理员如无法利用更新，则设置访问控制列表 (ACLs) 作为缓解措施。具体而言，建议用户在中间设备上执行ACLs，将Cisco Unified Communications 或 Cisco Contact Center Solutions 集群与用户和其它网络分隔开。必须将ACLs 配置为仅允许访问所部署服务的端口，从而控制能够触及受影响组件的流量。  
  
在部署任何缓解措施之前，管理员应当评估它们的可用性以及对环境的潜在影响，并在受控空间进行测试，确保业务运营不受影响。思科表示并未发现该漏洞遭公开或被恶意利用的证据。  
  
  
****  
  
代码卫士试用地址：  
https://codesafe.qianxin.com  
  
开源卫士试用地址：https://oss.qianxin.com  
  
  
  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[思科称严重的 Unity Connection 漏洞可导致攻击者获得root权限](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247518649&idx=1&sn=21ff8ab835664822aef75af18b5178a8&chksm=ea94b8d3dde331c5c49a02303ecda17deb3b8897d8bee8be24590ef862f6d2be63c6f37b66cd&scene=21#wechat_redirect)  
  
  
[思科新0day 被用于在数千台设备上植入恶意后门 Lua](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247517960&idx=1&sn=a77de274fb21796ddac20805028ec8b0&chksm=ea94b662dde33f74645e70725b4ffb565280e526d7c94ee2cbd1c5177a6c3330dc1b383922b3&scene=21#wechat_redirect)  
  
  
[思科披露称严重的 IOS XE 认证绕过0day已遭利用](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247517910&idx=1&sn=8fb7babd282149838a933250b863edc8&chksm=ea94b7bcdde33eaa96070746c3597032b223e499e281eb14ab47149dc366af11b935031b6706&scene=21#wechat_redirect)  
  
  
[思科紧急修复 Emergency Responder 系统中的严重漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247517792&idx=1&sn=2597cf0fcd5b0d3561468663bbc2c62b&chksm=ea94b70adde33e1c4078d399916095b0e03ac6c5af4add39de2897fa077d31d2f2792e844d2e&scene=21#wechat_redirect)  
  
  
  
  
**原文链接**  
  
https://www.bleepingcomputer.com/news/security/cisco-warns-of-critical-rce-flaw-in-communications-software/  
  
  
题图：  
Pexels  
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
