---
source: "gelusus/wxvl 公众号漏洞文库"
id: "vw-44e673449ee2a94128845699"
entity_id: "ve-44e673449ee2a94128845699"
schema_version: "1"
title: "Fortinet 修复影响多款产品中的高危漏洞"
product: "FortiOS/FortiProxy；FortiWeb"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "primary"
primary_identifiers: "CVE-2023-29183; CVE-2023-34984"
referenced_identifiers: ""
prerequisites: "29183已认证guest管理设置XSS；34984防护绕过；有修复分支"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/Fortinet/Fortinet%20%E4%BF%AE%E5%A4%8D%E5%BD%B1%E5%93%8D%E5%A4%9A%E6%AC%BE%E4%BA%A7%E5%93%81%E4%B8%AD%E7%9A%84%E9%AB%98%E5%8D%B1%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_status: "unknown"
---

#  Fortinet 修复影响多款产品中的高危漏洞   

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：FortiOS/FortiProxy；FortiWeb
- 本文讨论：CVE-2023-29183；CVE-2023-34984
- 版本、权限与配置前提：29183已认证guest管理设置XSS；34984防护绕过；有修复分支
- 资料类型：双漏洞新闻；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 影响版本写整分支容易包含安全维护版，FortiWeb7.0、x排版错误
- XSS/CSRF防护绕过不等于无需其他条件完全攻陷；CISA泛述需分开
- 无各产品官方公告

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- 34984实际触发条件与修复范围待核验
- 引用图片未查看，截图内容及有效性待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->

Ionut Arghire  代码卫士   2023-09-19 17:47  
  
![](../../.resource/remote/afc2fa5611a63e89ebec625ecc33d28c5dcdb706b6fbdabb79f7c1e8982068c0.gif "")  
  
   
聚焦源代码安全，网罗国内外最新资讯！****  
  
**编译：代码卫士**  
  
**Fortinet公司修复了影响多个 FortiOS 和 FortiProxy 版本中的一个高危XSS 漏洞 (CVE-2023-29183)。**  
  
  
![](../../.resource/remote/069e71dd2598622aec068a8356a7fde20fbe3212af64e16563691ce2ac11aa83.png "")  
  
  
该漏洞是“在网页生成过程中的处理不当”问题，CVSS 评分为7.3分，如遭成功利用，可导致认证攻击者使用构造的guest 管理设置触发恶意JavaScript 代码执行。  
  
该漏洞由Fortinet 的CSE 团队发现，影响 FortiProxy 版本 7.0.x和7.2.x以及 FortiOS 版本 6.2.x、6.4.x、7.0.x和7.2.x版本。Fortinet 公司已在 FortiProxy 版本7.0.11和7.2.5以及 FortiOS 版本6.2.15、6.4.13、7.0.12、7.2.5和7.4.0中修复。  
  
Fortinet 公司还发布补丁修复了位于 web 应用防火墙和API 防护解决方案 FortiWeb 中的一个高危漏洞（CVE-2023-34984，CVSS 评分7.1）。该漏洞可导致攻击者绕过已有的XSS和CSRF防护措施。Fortinet 公司指出，该漏洞影响 FortiWeb 版本6.3、6.4、7.0、x和7.2.x，并在FortiWeb版本7.0.7和7.2.2中修复。  
  
建议Fortinet 用户尽快更新其防火墙和交换机。虽然该并未提到这些漏洞是否遭利用，但Fortinet设备中的漏洞此前曾在野用于获得对企业网络的访问权限。  
  
CISA提醒称，利用这些漏洞可导致系统遭完全攻陷，并建议管理人员查看Fortinet 公司的安全公告并应用必要更新。CISA提到，“网络威胁行动者可利用其中一个漏洞控制受影响系统”。****  
  
  
代码卫士试用地址：  
https://codesafe.qianxin.com  
  
开源卫士试用地址：https://oss.qianxin.com  
  
  
  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[Fortinet：速修复 FortiOS、FortiProxy 设备中的严重RCE漏洞！](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247517034&idx=2&sn=0e6034be825eac879386635841578fa0&chksm=ea94b200dde33b16e5b00a74e6327aca06b3192a6c9501d14cc86edab7c248c3044a44ff1a9c&scene=21#wechat_redirect)  
  
  
[Fortinet 修复严重的 FortiNAC 远程命令执行漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247516818&idx=3&sn=7524bc2288375bbf06f9574e73e15a00&chksm=ea94b3f8dde33aeeeb1313ae4cb6608ffa6876baa1ba49cbdac2b97cf5307198a79fd41eed8b&scene=21#wechat_redirect)  
  
  
[Fortinet 修复 Fortigate SSL-VPN 设备中严重的 RCE 漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247516712&idx=1&sn=db056d3f152e8f52867cc5021679e6f1&chksm=ea94b342dde33a543f8d7daaae604ffb6f0a65f865bf3fd926dfee86ad48be7d6460b9107d7d&scene=21#wechat_redirect)  
  
  
[Fortinet 修复FortiADC 和 FortiOS 中的多个高危漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247516406&idx=3&sn=f6d52c7913cb9a7127079a424f287d22&chksm=ea94b19cdde3388a41d9382c14e8649d4db7f27382de8b638a8c2430d9fb7a6e3125a60ceed6&scene=21#wechat_redirect)  
  
  
  
  
**原文链接**  
  
https://www.securityweek.com/fortinet-patches-high-severity-vulnerabilities-in-fortios-fortiproxy-fortiweb-products/  
  
  
题图：  
Pixabay  
 License  
  
****  
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
