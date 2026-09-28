---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  SolarWinds 修复四个严重漏洞，可导致未认证RCE和认证绕过  
Ravie Lakshmanan
                    Ravie Lakshmanan  代码卫士   2026-01-30 09:36  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Az5ZsrEic9ot90z9etZLlU7OTaPOdibteeibJMMmbwc29aJlDOmUicibIRoLdcuEQjtHQ2qjVtZBt0M5eVbYoQzlHiaw/640?wx_fmt=gif "")  
    
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
**SolarWinds****公司已发布安全更新，修复影响SolarWinds Web Help Desk的多个漏洞，其中包括四个可导致认证绕过和远程代码执行的严重漏洞。**  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
这些漏洞：  
  
- CVE-2025-40536 (CVSS评分：8.1) ——安全控制绕过漏洞，可导致未经身份验证的攻击者访问某些受限功能。  
  
- CVE-2025-40537 (CVSS评分：7.5) ——硬编码凭据漏洞，可导致攻击者使用"client"用户账户访问管理功能。  
  
- CVE-2025-40551 (CVSS评分：9.8) ——不受信任数据反序列化漏洞，可造成远程代码执行，导致未经身份验证的攻击者在主机上运行命令。  
  
- CVE-2025-40552 (CVSS评分：9.8) —— 认证绕过漏洞，可导致未经身份验证的攻击者执行操作和方法。  
  
- C  
VE-2025-40553 (CVSS评分：9.8) —— 不受信任数据反序列化漏洞，可导致远程代码执行，允许未经身份验证的攻击者在主机上运行命令。  
  
- CVE-2025-40554 (CVSS评分：9.8) —— 认证绕过漏洞，可导致攻击者调用Web Help Desk内的特定操作。  
  
  
  
前三个漏洞由Horizon3.ai公司研究员Jimi Sebree发现并报送，其余三个漏洞则由watchTowr团队的研究员Piotr Bazydlo负责披露。所有漏洞均已在WHD 2026.1版本中修复。  
  
Rapid7公司指出："CVE-2025-40551和CVE-2025-40553均属于严重的不可信数据反序列化漏洞，可使未经身份验证的远程攻击者在目标系统上实现远程代码执行，进而执行诸如任意操作系统命令等恶意载荷。通过反序列化实现远程代码执行是攻击者惯用的高可靠性攻击向量。由于这两个漏洞在无需身份验证即可利用，其可能造成的影响尤为严重。"该公司补充表示，虽然CVE-2025-40552和CVE-2025-40554被归类为身份验证绕过漏洞，但攻击者同样可利用它们实现远程代码执行，最终达到与前述两个反序列化漏洞相同的利用效果。  
  
近年来，SolarWinds已多次发布修复方案，修复其Web Help Desk软件中的多个漏洞，包括CVE-2024-28986、CVE-2024-28987、CVE-2024-28988和CVE-2025-26399。值得注意的是，CVE-2025-26399修复的是CVE-2024-28988的补丁绕过问题，而CVE-2024-28988本身又是针对CVE-2024-28986的补丁绕过。  
  
2024年末，美国网络安全和基础设施安全局将CVE-2024-28986和CVE-2024-28987列入其"已知被利用漏洞 (KEV)"目录，理由是有证据表明这两个漏洞正被活跃利用。  
  
研究人员提到，CVE-2025-40551是又一个由AjaxProxy功能引发的反序列化漏洞，可能导致远程代码执行。为实现远程代码执行，攻击者需要执行以下一系列操作——  
  
- 建立有效会话并提取关键值  
  
- 创建LoginPref组件  
  
- 设置LoginPref组件的状态以获取文件上传访问权限  
  
- 通过JSONRPC桥接在后台创建恶意Java对象  
  
- 触发这些恶意Java对象  
  
  
  
鉴于Web Help Desk的漏洞曾遭实际利用，因此用户必须尽快将该服务台和IT服务管理平台更新至最新版本。  
  
****  
 开源  
卫士试用地址：  
https://oss.qianxin.com/#/login  
  
  
 代码卫士试用地址：https://sast.qianxin.com/#/login  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[SolarWinds 第三次修复 Web Help Desk RCE漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247524063&idx=1&sn=bbbe6b07384696379e2020d8ea0e3c24&scene=21#wechat_redirect)  
  
  
[SolarWinds 修复 Web Help Desk 中的硬编码凭据漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247520566&idx=2&sn=2201f2665ef471e47e5dc87762920af5&scene=21#wechat_redirect)  
  
  
[SolarWinds Web Help Desk是 0day时或已遭利用](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247520517&idx=1&sn=33f6242a7bd079eb73527d2099be7fc1&scene=21#wechat_redirect)  
  
  
[SolarWinds 修复访问权限审计软件中的8个严重漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247520104&idx=1&sn=b5831c292df944c1998d2c0e89a80188&scene=21#wechat_redirect)  
  
  
[SolarWinds 访问审计解决方案中存在严重的RCE漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247517960&idx=2&sn=859ca4a50e7e9df4867d1973b7bba390&scene=21#wechat_redirect)  
  
  
  
  
  
**原文链接**  
  
https://thehackernews.com/2026/01/solarwinds-fixes-four-critical-web-help.html  
  
  
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
