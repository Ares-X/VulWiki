---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  思科 AnyConnect VPN 服务器漏洞可用于触发 DoS 条件  
Guru Baran  代码卫士   2025-06-20 10:34  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Az5ZsrEic9ot90z9etZLlU7OTaPOdibteeibJMMmbwc29aJlDOmUicibIRoLdcuEQjtHQ2qjVtZBt0M5eVbYoQzlHiaw/640?wx_fmt=gif "")  
    
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
**思科披露了影响Cisco Meraki MX 和 Z 系列设备的一个严重漏洞CVE-2025-20212，可对企业网络造成重大风险。**  
  
![](https://mmbiz.qpic.cn/mmbiz_png/oBANLWYScMQvzqYOjR8q6tB3cgvRRcuQyLpRXqkcdPDOxGia5IJibwkzxWwCvmjxcuv106VTljrCPjPT2YozjQ8Q/640?wx_fmt=png&from=appmsg "")  
  
  
该漏洞可导致认证的远程攻击者通过操纵 SSL VPN 会话属性来触发拒绝服务 (DoS) 条件。该高危漏洞的CVSS评分为7.7，影响依赖 Cisco AnyConnect VPN 保护远程访问解决方案的组织机构。  
  
思科在安全公告中提到，该漏洞是由 SSL VPN会话建立过程中的一个未初始化变量造成的。  
  
  
![](https://mmbiz.qpic.cn/mmbiz_png/oBANLWYScMQvzqYOjR8q6tB3cgvRRcuQPndUvOX9D6oPC79KKib5B2oDCBW6dUVs5DvAWAH9l4BMq1QiaG2Lr7GA/640?wx_fmt=png&from=appmsg "")  
  
**Cisco AnyConnect VPN 服务器漏洞**  
  
  
  
具有合法VPN用户凭据的攻击者可在SSL 握手过程中提供构造属性，利用该漏洞。如遭成功利用，AnyConnect VPN服务突然重启，终止所有的已建立VPN会话并强制远程用户重新连接和重新认证。当服务器处理进站请求时，该漏洞可操纵会话状态。  
  
该漏洞的CVSS 评分为7.7说明虽然要求进行认证，但攻击的复杂度较低，因此在真实的网络环境中，利用相对简单。持续攻击可阻止建立新的SSL VPN 连接，从而导致在恶意流量停止进入之前，服务长时间处于宕机状态。  
  
该系统旨在当攻击流量停止时，无需手动干预就自动恢复，但利用过程中对业务造成的影响仍然重大，可能导致关键操作中断。网络管理员可通过查看 Cisco AnyConnect VPN是否启用来验证系统是否易遭攻击。Meraki MX设备可登录到主板，导航至“安全和SD-WAN＞配置＞客户端VPN”并选择 AnyConnect Settings 标签。对于Z系列设备，管理员应当检查“Teleworker Gateway＞配置＞Client VPN”，如“启用”按钮已开启，则需要立即行动。  
  
  
![](https://mmbiz.qpic.cn/mmbiz_png/oBANLWYScMQvzqYOjR8q6tB3cgvRRcuQPndUvOX9D6oPC79KKib5B2oDCBW6dUVs5DvAWAH9l4BMq1QiaG2Lr7GA/640?wx_fmt=png&from=appmsg "")  
  
**影响设备**  
  
  
  
该漏洞影响的设备是已启用 AnyConnect VPN的思科 Meraki MX/Z 系列设备：MX64/MX65 （仅固件版本≥17.6）MX67/MX68/MX75/MX84/MX95/MX100/MX250- Z3/Z4 series- vMX。攻击者需要具有有效的VPN用户凭据、对易受攻击设备的网络访问权限并启用目标设备上的 AnyConnect VPN。尤其易受攻击的 Meraki 机型包括：MX64、MX65、MX67、MX68、MX75、MX84、MX85、MX95、MX100、MX105、MX250、MX400、MX450、MX600、vMX和 Z 系列设备 (Z3、Z3C、Z4、Z4C)。不过MX64和MX65仅在运行固件版本17.6及后续版本时才受影响。  
  
  
![](https://mmbiz.qpic.cn/mmbiz_png/oBANLWYScMQvzqYOjR8q6tB3cgvRRcuQPndUvOX9D6oPC79KKib5B2oDCBW6dUVs5DvAWAH9l4BMq1QiaG2Lr7GA/640?wx_fmt=png&from=appmsg "")  
  
**缓解措施和已修复版本**  
  
  
  
思科已发布软件更新，修复该漏洞。已修复固件版本包括：  
<table><tbody><tr style="height:44px;"><td style="border: 1px solid windowtext;padding:5px 10px;"><p style="text-align:left;font-size: 15px;margin-bottom: 15px;display: block;margin-left: 5px;margin-right: 5px;"><span style="font-size: 15px;letter-spacing: 1px;"><strong><span style="color: #222222;font-size: 15px;letter-spacing: 1px;font-family:宋体;"><span leaf="">固件版本</span></span></strong></span></p></td><td style="border-top: 1px solid windowtext;border-right: 1px solid windowtext;border-bottom: 1px solid windowtext;border-image: initial;border-left: none;padding:5px 10px;"><p style="text-align:left;font-size: 15px;margin-bottom: 15px;display: block;margin-left: 5px;margin-right: 5px;"><span style="font-size: 15px;letter-spacing: 1px;"><strong><span style="color: #222222;font-size: 15px;letter-spacing: 1px;font-family:宋体;"><span leaf="">首次修复版本</span></span></strong></span></p></td></tr><tr><td style="border-right: 1px solid windowtext;border-bottom: 1px solid windowtext;border-left: 1px solid windowtext;border-image: initial;border-top: none;padding:5px 10px;"><p style="text-align:left;font-size: 15px;margin-bottom: 15px;display: block;margin-left: 5px;margin-right: 5px;"><span style="color: #222222;font-size: 15px;letter-spacing: 1px;font-family:Poppins, serif;"><span leaf="">18.1</span></span></p></td><td style="border-top: none;border-left: none;border-bottom: 1px solid windowtext;border-right: 1px solid windowtext;padding:5px 10px;"><p style="text-align:left;font-size: 15px;margin-bottom: 15px;display: block;margin-left: 5px;margin-right: 5px;"><span style="color: #222222;font-size: 15px;letter-spacing: 1px;font-family:Poppins, serif;"><span leaf="">18.107.12</span></span></p></td></tr><tr><td style="border-right: 1px solid windowtext;border-bottom: 1px solid windowtext;border-left: 1px solid windowtext;border-image: initial;border-top: none;padding:5px 10px;"><p style="text-align:left;font-size: 15px;margin-bottom: 15px;display: block;margin-left: 5px;margin-right: 5px;"><span style="color: #222222;font-size: 15px;letter-spacing: 1px;font-family:Poppins, serif;"><span leaf="">18.2</span></span></p></td><td style="border-top: none;border-left: none;border-bottom: 1px solid windowtext;border-right: 1px solid windowtext;padding:5px 10px;"><p style="text-align:left;font-size: 15px;margin-bottom: 15px;display: block;margin-left: 5px;margin-right: 5px;"><span style="color: #222222;font-size: 15px;letter-spacing: 1px;font-family:Poppins, serif;"><span leaf="">18.211.4</span></span></p></td></tr><tr><td style="border-right: 1px solid windowtext;border-bottom: 1px solid windowtext;border-left: 1px solid windowtext;border-image: initial;border-top: none;padding:5px 10px;"><p style="text-align:left;font-size: 15px;margin-bottom: 15px;display: block;margin-left: 5px;margin-right: 5px;"><span style="color: #222222;font-size: 15px;letter-spacing: 1px;font-family:Poppins, serif;"><span leaf="">19.1</span></span></p></td><td style="border-top: none;border-left: none;border-bottom: 1px solid windowtext;border-right: 1px solid windowtext;padding:5px 10px;"><p style="text-align:left;font-size: 15px;margin-bottom: 15px;display: block;margin-left: 5px;margin-right: 5px;"><span style="color: #222222;font-size: 15px;letter-spacing: 1px;font-family:Poppins, serif;"><span leaf="">19.1.4</span></span></p></td></tr></tbody></table>  
之前版本的用户必须迁移到已修复版本。由于不存在应变措施，因此必须及时安装更新。行业专家强调称该漏洞凸显了保护现代VPN实现中的内在复杂性。Meraki 设备中同时集成了 Client VPN (L2TP/IPsec) 和 AnyConnect VPN (SSL/DTLS)，引入了新的安全问题，因此要进行谨慎的固件管理。组织机构必须优先处理这些更新，保护关键网络基础设施的安全并防止服务中断。  
  
由于远程工作仍然普遍存在，因此VPN服务构成重要的业务基础设施，因此它们的安全至关重要。思科建议遵循固件最佳实践，确保设备在升级前拥有足够的内存和可兼容的固件配置。  
  
****  
代码卫士试用地址：  
https://codesafe.qianxin.com  
  
开源卫士试用地址：https://oss.qianxin.com  
  
  
  
  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[思科提醒注意严重的 ISE 和 CCP 漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247523184&idx=1&sn=f205e1639e39bac5e3d3496845db4087&scene=21#wechat_redirect)  
  
  
[Atlassian 和思科修复多个高危漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247522791&idx=2&sn=841f61a29df71610844f2e021c5c9bab&scene=21#wechat_redirect)  
  
  
[思科公开AnyConnect VPN 高危0day，exploit 代码已公开](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247496772&idx=2&sn=291232ade496e261a57b6c35551fff34&scene=21#wechat_redirect)  
  
  
[思科 AnyConnect 等企业 VPN 的认证和会话 cookie 存储方式被曝不安全](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247489683&idx=1&sn=6a4240b37941f6ee4d6a08f15029816f&scene=21#wechat_redirect)  
  
  
[思科 SAML 执行中存在bug 影响AnyConnect 等三款产品](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247486959&idx=2&sn=21afda373dc7c457333e82836e361cf0&scene=21#wechat_redirect)  
  
  
  
  
  
**原文链接**  
  
https://cybersecuritynews.com/cisco-anyconnect-vpn-server-vulnerability/  
  
  
  
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
