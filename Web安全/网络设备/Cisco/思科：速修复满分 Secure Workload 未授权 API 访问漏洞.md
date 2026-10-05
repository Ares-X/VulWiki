---
source: "gelusus/wxvl 公众号漏洞文库"
id: "vw-e161ab2fc5cc36dee9463333"
entity_id: "ve-e161ab2fc5cc36dee9463333"
schema_version: "1"
title: "思科：速修复满分 Secure Workload 未授权 API 访问漏洞"
product: "Cisco Secure Workload Cluster Software"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "primary"
primary_identifiers: "CVE-2026-20223"
referenced_identifiers: ""
prerequisites: "内部REST API未认证跨租户管理员；Web UI不受影响；3.10.8.3/4.0.3.1.7修复、SaaS厂商处理"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/Cisco/%E6%80%9D%E7%A7%91%EF%BC%9A%E9%80%9F%E4%BF%AE%E5%A4%8D%E6%BB%A1%E5%88%86%20Secure%20Workload%20%E6%9C%AA%E6%8E%88%E6%9D%83%20API%20%E8%AE%BF%E9%97%AE%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_status: "unknown"
---

#  思科：速修复满分 Secure Workload 未授权 API 访问漏洞  

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Cisco Secure Workload Cluster Software
- 本文讨论：CVE-2026-20223
- 版本、权限与配置前提：内部REST API未认证跨租户管理员；Web UI不受影响；3.10.8.3/4.0.3.1.7修复、SaaS厂商处理
- 资料类型：厂商公告译文；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 正文大量断词与营销图；缺结构化CVE/版本元数据
- 安全工作负载管理软件宜安全设备/软件分类而非泛网络设备

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- 翻译与当前官方公告一致性待核验
- 引用图片未查看，截图内容及有效性待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->

Cisco
                    Cisco  代码卫士   2026-05-21 06:41  
  
![](../../.resource/remote/afc2fa5611a63e89ebec625ecc33d28c5dcdb706b6fbdabb79f7c1e8982068c0.gif "")  
    
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
  
  
![](../../.resource/remote/ae040977292eb5987d2738c4f8833ef44f371aa27dcf1f9c58858ae713f6dfce.gif "")  
  
**受影响版本**  
  
  
![](../../.resource/remote/ae040977292eb5987d2738c4f8833ef44f371aa27dcf1f9c58858ae713f6dfce.gif "")  
  
  
  
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
  
  
  
  
![](../../.resource/remote/2c03ce3cc6bb81bca85bd412ed60e93c4bc0a295a1fc9d3739d8aca43497fbb4.jpg "")  
  
![](../../.resource/remote/b33054170f5acbf0023711f517b5bee9799a2f57b155a774d3945e6d78184e63.jpg "")  
  
**奇安信代码卫士 (codesafe)**  
  
国内首个专注于软件开发安全的产品线。  
  
   ![](../../.resource/remote/8a5c84b98d9b52b1d4f4306180ec26c9aa65342b326b5b98ad2f097b488152f4.gif "")  
  
  
   
觉得不错，就点个 “  
在看  
” 或 "  
赞  
” 吧~  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
