---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  思科：速修复满分 Secure Workload 未授权 API 访问漏洞  
Cisco
                    Cisco  代码卫士   2026-05-21 06:41  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Az5ZsrEic9ot90z9etZLlU7OTaPOdibteeibJMMmbwc29aJlDOmUicibIRoLdcuEQjtHQ2qjVtZBt0M5eVbYoQzlHiaw/640?wx_fmt=gif "")  
    
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
**今天，思科发布紧急更新，提醒用户修复位于****Secure Workload****中的未授权****API****访问漏洞****CVE-2026-20223****（****CVSS****满分****10****分）。**  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
思科提到，该漏洞（  
CVE-2026-20223  
）位于  
 Secure Workload   
内部  
 REST API   
的访问验证中，可导致未经身份认证的远程攻击者以站点管理员权限，访问站点资源。  
  
该漏洞因在访问  
 REST API   
端点时的验证和认证不充分而引发。攻击者可通过向受影响端点发送构造  
 API   
请求的方式利用该漏洞，如利用成功，则可以站点管理员用户的权限读取敏感信息并跨租户边界进行配置更改。  
  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/t5z0xV2OYfXk8ynQtYI2Zvlvv60yL6wgic85aI6vmEaWgYDmRLTrVa4D6ibR1kiaL6DolxfyNnPHBOMOra2YqId5OcIF15nRynHEcmYsGOZdTM/640?wx_fmt=gif&from=appmsg "")  
  
**受影响版本**  
  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/t5z0xV2OYfVZ7w9MUkOCgwUwiaDFliaUzOZFG3EKVOfskp8Np2WZ91UK74ooavklZG3cJbAVzlO7TlmUDaI1zFK84nEXhBl7NBLfLQdPgMgUY/640?wx_fmt=gif&from=appmsg "")  
  
  
  
该漏洞影响  
Secure Workload Cluster Software   
任何配置下的  
SaaS   
版本和本地部署。该漏洞仅影响内部  
 REST API  
，并不影响基于  
 web   
的管理接口。  
<table><tbody><tr><td data-colwidth="277" width="277" valign="top" style="border: 1px solid windowtext;padding:5px 10px;"><p style="text-align:left;text-indent: 0em;margin-bottom: 15px;display: block;"><span style="letter-spacing: 1px;font-size: 15px;"><strong><span leaf="">思科</span></strong><strong><span style="letter-spacing: 1px;font-size: 15px;"><span leaf="">Secure Workload </span></span></strong><strong><span leaf="">版本</span></strong></span></p></td><td data-colwidth="277" width="277" valign="top" style="border-top: 1px solid windowtext;border-right: 1px solid windowtext;border-bottom: 1px solid windowtext;border-image: initial;border-left: none;padding:5px 10px;"><p style="text-align:left;text-indent: 0em;margin-bottom: 15px;display: block;"><span style="letter-spacing: 1px;font-size: 15px;"><strong><span leaf="">首次已修复版本</span></strong></span></p></td></tr><tr style="height:22px;"><td data-colwidth="277" width="277" valign="top" style="border-right: 1px solid windowtext;border-bottom: 1px solid windowtext;border-left: 1px solid windowtext;border-image: initial;border-top: none;padding:5px 10px;"><p style="text-align:left;text-indent: 0em;margin-bottom: 15px;display: block;"><span style="letter-spacing: 1px;font-size: 15px;"><span style="letter-spacing: 1px;font-size: 15px;"><span leaf="">3.9</span></span><span leaf="">及更早版本</span></span></p></td><td data-colwidth="277" width="277" valign="top" style="border-top: none;border-left: none;border-bottom: 1px solid windowtext;border-right: 1px solid windowtext;padding:5px 10px;"><p style="text-align:left;text-indent: 0em;margin-bottom: 15px;display: block;"><span style="letter-spacing: 1px;font-size: 15px;"><span leaf="">迁移到已修复版本</span></span></p></td></tr><tr><td data-colwidth="277" width="277" valign="top" style="border-right: 1px solid windowtext;border-bottom: 1px solid windowtext;border-left: 1px solid windowtext;border-image: initial;border-top: none;padding:5px 10px;"><p style="text-align:left;text-indent: 0em;margin-bottom: 15px;display: block;"><span style="letter-spacing: 1px;font-size: 15px;"><span leaf="">3.10</span></span></p></td><td data-colwidth="277" width="277" valign="top" style="border-top: none;border-left: none;border-bottom: 1px solid windowtext;border-right: 1px solid windowtext;padding:5px 10px;"><p style="text-align:left;text-indent: 0em;margin-bottom: 15px;display: block;"><span style="letter-spacing: 1px;font-size: 15px;"><span leaf="">3.10.8.3</span></span></p></td></tr><tr><td data-colwidth="277" width="277" valign="top" style="border-right: 1px solid windowtext;border-bottom: 1px solid windowtext;border-left: 1px solid windowtext;border-image: initial;border-top: none;padding:5px 10px;"><p style="text-align:left;text-indent: 0em;margin-bottom: 15px;display: block;"><span style="letter-spacing: 1px;font-size: 15px;"><span leaf="">4.0</span></span></p></td><td data-colwidth="277" width="277" valign="top" style="border-top: none;border-left: none;border-bottom: 1px solid windowtext;border-right: 1px solid windowtext;padding:5px 10px;"><p style="text-align:left;text-indent: 0em;margin-bottom: 15px;display: block;"><span style="letter-spacing: 1px;font-size: 15px;"><span leaf="">4.0.3.1.7</span></span></p></td></tr></tbody></table>  
  
思科提到，已在  
 SaaS   
版本中修复该漏洞，因此无需任何用户操作。另外，思科表示产品安全事件响应团队仅验证了所发布安全公告中列出的受影响和已修复版本信息。  
  
该漏洞由思科在内部安全测试时发现。思科已发布软件更新修复该漏洞，目前尚无应变措施。思科表示尚未发现该漏洞遭在野利用的迹象。  
  
  
 开源  
卫士试用地址：  
https://oss.qianxin.com/#/login  
  
 代码卫士试用地址：https://sast.qianxin.com/#/login  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[思科：注意已遭利用的满分 SD-WAN 新 0day](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247526019&idx=1&sn=a356c936f290fca11bdc81d87da6081f&scene=21#wechat_redirect)  
  
  
[思科紧急修复高危 ISE 漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247525791&idx=1&sn=8e8b1cc8aa09816bba96ee685aa24394&scene=21#wechat_redirect)  
  
  
[思科 IMC 中存在严重的认证绕过漏洞，可用于获取管理员权限](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247525643&idx=1&sn=123aa4e38d29ce29d7107d5e7378e00f&scene=21#wechat_redirect)  
  
  
[思科修复多个高危 IOS XR 漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247525403&idx=1&sn=a7ca207e2fb245b56f2a17c2cf9d5f80&scene=21#wechat_redirect)  
  
  
[思科：注意已遭利用的两个 Catalyst SD-WAN 管理器 0day 漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247525349&idx=2&sn=d24d6683fb3bc04d5b47bb36bf521194&scene=21#wechat_redirect)  
  
  
[思科提醒注意满分 Secure FMC 漏洞可用于获取 root 权限](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247525317&idx=1&sn=400b0183f75f78413cb8fd0ab335e576&scene=21#wechat_redirect)  
  
  
  
  
  
**原文链接**  
  
https://sec.cloudapps.cisco.com/security/center/content/CiscoSecurityAdvisory/cisco-sa-csw-pnbsa-g8WEnuy  
  
  
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
