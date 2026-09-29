---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  CISA提醒注意 WHILL Model C2 电动轮椅中的严重漏洞  
Abinaya  代码卫士   2026-01-05 10:34  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Az5ZsrEic9ot90z9etZLlU7OTaPOdibteeibJMMmbwc29aJlDOmUicibIRoLdcuEQjtHQ2qjVtZBt0M5eVbYoQzlHiaw/640?wx_fmt=gif "")  
    
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
**CISA****提醒称WHILL电动轮椅重存在严重漏洞CVE-2025-14346（CVSS评分9.8），可通过蓝牙遭远程劫持。**  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
该漏洞影响两款在全球广泛使用的型号：由日本WHILL公司制造的WHILL Model C2电动轮椅和Model F电动轮椅。研究人员提到，该漏洞源于关键功能缺乏身份验证机制，使得任何在蓝牙范围内的攻击者无需授权或物理接触设备，即可完全控制轮椅。  
  
该漏洞对医疗机构和公共场所的使用者构成重大风险。成功利用该漏洞可能导致恶意人员操纵轮椅移动，从而对使用者或旁观者造成人身伤害。受影响的产品在全球范围内的医疗保健和公共卫生关键基础设施领域均有部署。  
  
CISA敦促相关组织机构和个人立即采取防御措施以降低被攻击风险。CISA 提到的主要建议包括：通过确保设备无法从互联网访问来减少网络暴露面、为控制系统部署防火墙，以及在必须进行远程访问时使用安全的虚拟专用网络 (VPN)。用户应直接联系WHILL公司获取具体的缓解指导和可能的固件更新信息。相关组织机构在部署防护措施前，必须进行全面的影响分析和风险评估。CISA强调称，虽然目前尚未出现已知的公开攻击案例，但鉴于其严重级别，应立即处理。  
  
  
 开源  
卫士试用地址：  
https://oss.qianxin.com/#/login  
  
  
 代码卫士试用地址：https://sast.qianxin.com/#/login  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[CISA 将已遭利用的 Digiever NVR RCE漏洞纳入KEV](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247524761&idx=2&sn=1b94ad55c3aaf6d0f95f5c0d1386a2e4&scene=21#wechat_redirect)  
  
  
[React2Shell：30家机构已受陷77k IP地址易受影响，被列入 CISA KEV](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247524607&idx=2&sn=73748657190a71ffd47cbbeb32fe077e&scene=21#wechat_redirect)  
  
  
[CISA 将 OpenPLC ScadaBR 纳入必修清单](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247524567&idx=2&sn=51761f3ab07806bb1af7abb9723370e1&scene=21#wechat_redirect)  
  
  
  
  
  
**原文链接**  
  
https://cybersecuritynews.com/cisa-warns-of-whill-model-c2-wheelchairs-vulnerability/  
  
  
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
