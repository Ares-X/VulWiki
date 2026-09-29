---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  Ivanti 紧急修复暴露敏感数据的严重 Xtraction 漏洞  
DDoS
                    DDoS  代码卫士   2026-05-14 04:04  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Az5ZsrEic9ot90z9etZLlU7OTaPOdibteeibJMMmbwc29aJlDOmUicibIRoLdcuEQjtHQ2qjVtZBt0M5eVbYoQzlHiaw/640?wx_fmt=gif "")  
    
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
**Ivanti****发布关于 Xtraction 平台的紧急更新，修复了一个严重漏洞CVE-2026-8043（CVSS评分9.6），可导致严重的数据暴露以及恶意客户端攻击。该漏洞影响2026.1及之前版本，已在2026.2版本中修复。**  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
该漏洞的根因在于 Ivanti Xtraction 应用中的“文件名称的外部控制”，与CWE-22和CWE-73有关，可导致恶意人员绕过标准文件和目录限制。攻击者必须经过远程身份认证才能利用该漏洞，如成功则可获得危险的双重能力：  
  
- 攻击者可读取系统内的高度敏感文件，导致重大信息泄露；  
  
- 直接将任意HTML 文件写入 Web 目录，将用户服务器武器化，对其它不知情用户发动客户端攻击。  
  
  
  
该漏洞影响未安装最新安全补丁的旧版和当前部署。虽然官方披露时声称“未发现客户被利用”，但补丁公开后，威胁行动者通常会迅速逆向分析并攻击未修复的系统。官方修复方案已发布，建议立即升级。  
  
  
  
 开源  
卫士试用地址：  
https://oss.qianxin.com/#/login  
  
 代码卫士试用地址：https://sast.qianxin.com/#/login  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[Ivanti 提醒注意已遭利用的 EPMM 高危漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247525953&idx=1&sn=40c610f460f60706c41341497c18c035&scene=21#wechat_redirect)  
  
  
[CISA：须在周日前修复已遭利用的 Ivanti EPMM 漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247525686&idx=2&sn=a7cb71292f83e55b49f1e23a7f775864&scene=21#wechat_redirect)  
  
  
[Ivanti Endpoint 管理器漏洞可导致远程攻击者泄露任意数据](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247525108&idx=2&sn=eb3ace41d769ee7dcd8d459a227040f3&scene=21#wechat_redirect)  
  
  
[Ivanti 提醒注意已遭利用的两个 EPMM 漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247525028&idx=2&sn=762ebd580b93c85ca6f361c47033a215&scene=21#wechat_redirect)  
  
  
[Ivanti提醒注意 EPM 中严重的代码执行漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247524630&idx=1&sn=f3a9316989486371722d9656c43f333e&scene=21#wechat_redirect)  
  
  
  
  
  
**原文链接**  
  
https://securityonline.info/ivanti-xtraction-vulnerability-cve-2026-8043-critical-flaw/  
  
  
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
