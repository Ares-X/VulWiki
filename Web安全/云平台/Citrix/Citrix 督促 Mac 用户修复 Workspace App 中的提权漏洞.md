---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  Citrix 督促 Mac 用户修复 Workspace App 中的提权漏洞   
DO SON  代码卫士   2024-05-29 17:26  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Az5ZsrEic9ot90z9etZLlU7OTaPOdibteeibJMMmbwc29aJlDOmUicibIRoLdcuEQjtHQ2qjVtZBt0M5eVbYoQzlHiaw/640?wx_fmt=gif "")  
  
   
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
**Citrix 产品的幕后实体公司 Cloud Software Group 发布安全公告，提醒Mac 用户注意 Citrix Workspace app 中的一个高危漏洞CVE-2024-5027。该漏洞可导致对 Mac 设备具有本地访问权限的攻击者将权限提升至最高等级（root 用户），从而完全控制该系统。**  
  
  
  
CVE-2024-5027的CVSS评分为7.7，影响 Citrix Workspace app for Mac 2402.10之前的所有版本。攻击者必须能够对运行易受攻击版本的设备具有认证的访问权限才能够利用该漏洞，这意味着攻击者需要具有系统上的已有用户账户，这样虽然减少了远程利用风险，但提高了内部威胁或者攻击者可通过其它方式获得初始访问权限带来的重大风险。  
  
成功攻击可导致：  
  
- 数据窃取：获得对敏感文件和信息的越权访问权限。  
  
- 系统修改：修改系统共设置、安装恶意软件或创建后门的能力。  
  
- 完全接管系统：在最糟糕的情况下，攻击者可完全控制受影响设备。  
  
  
  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/oBANLWYScMTvKA4buNrJMJ4aicp77CQicsNh585DsJdFPibETJtWOlVibd36ttaN9iaFyvpmTN78KpoyUrHr1nVpuVA/640?wx_fmt=gif&from=appmsg "")  
  
**缓解措施至关重要**  
  
  
  
  
  
Cloud Software Group 强烈建议所有受影响用户立即将 Citrix Workspace app for Mac 更新至2402.10或后续版本。该更新修复了该漏洞并消减了利用风险。  
  
  
  
  
代码卫士试用地址：  
https://codesafe.qianxin.com  
  
开源卫士试用地址：https://oss.qianxin.com  
  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[Citrix 提醒管理员手动缓解 PuTTY SSH 客户端漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247519453&idx=1&sn=b108366a369534bc2bc55f5a5089d587&chksm=ea94bdb7dde334a1ed46fce3773a11cab5d7d420a9b40d13263be90a5ffc622be738b323c0ec&scene=21#wechat_redirect)  
  
  
[Citrix悄悄修复相似度极高但严重性不及CitrixBleed的高危漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247519419&idx=1&sn=3bb85759ff76414bd555bb55aa1b3c16&chksm=ea94bdd1dde334c73add716fd4c17f5d7be8d21d23464d3e187d43446f34d83e52d9482ed5cd&scene=21#wechat_redirect)  
  
  
[Citrix 提醒注意已遭利用的两个 NetScaler 0day 漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247518689&idx=1&sn=0c28377e9cd188322fb8de2c9b984d4f&chksm=ea94b88bdde3319d66fb2901eac70e83e8071ee933f5b8bdb067917e92e94c9d23efc23f4ea8&scene=21#wechat_redirect)  
  
  
[Citrix NetScaler 严重漏洞可泄露“敏感”数据](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247517841&idx=2&sn=de64058a934247781132d8fdd5886240&chksm=ea94b7fbdde33eed8920dc403119072a08ff3f018fc6122497a8acfadfbdcf1fca8ab3aa986b&scene=21#wechat_redirect)  
  
  
[Citrix 修复 Ubuntu 版本安全访问客户端中的严重漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247517034&idx=4&sn=6e2b7be2533c1e454539a3b4905483c7&chksm=ea94b200dde33b16f46f5c52b43bc116d9a9ed99bf381bbe9dbd8d1b3902ca57cb785c81a283&scene=21#wechat_redirect)  
  
  
  
  
  
**原文链接**  
  
  
https://securityonline.info/citrix-urges-mac-users-to-patch-workspace-app-against-privilege-escalation-flaw-cve-2024-5027/  
  
  
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
