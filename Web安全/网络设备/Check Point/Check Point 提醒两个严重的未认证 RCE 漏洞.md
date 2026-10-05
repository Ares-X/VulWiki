---
source: "gelusus/wxvl 公众号漏洞文库"
id: "vw-d091f0353e36fe35be62a15a"
entity_id: "ve-d091f0353e36fe35be62a15a"
schema_version: "1"
title: "Check Point 提醒注意两个严重的未认证 RCE 漏洞"
product: "Check Point Quantum Security Gateway / Security Management"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "primary"
primary_identifiers: "CVE-2026-85102; CVE-2026-85103"
referenced_identifiers: "CVE-2026-50751; CVE-2026-16232"
prerequisites: "R82.10 Take≤43、R82 Take≤125、R81.20 Take≤165；未认证但特定条件未公开；证书处理可能不依赖启用VPN"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/Check%20Point/Check%20Point%20%E6%8F%90%E9%86%92%E4%B8%A4%E4%B8%AA%E4%B8%A5%E9%87%8D%E7%9A%84%E6%9C%AA%E8%AE%A4%E8%AF%81%20RCE%20%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_status: "unknown"
---

#  Check Point 提醒注意两个严重的未认证 RCE 漏洞  

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Check Point Quantum Security Gateway / Security Management
- 本文讨论：CVE-2026-85102；CVE-2026-85103
- 版本、权限与配置前提：R82.10 Take≤43、R82 Take≤125、R81.20 Take≤165；未认证但特定条件未公开；证书处理可能不依赖启用VPN
- 资料类型：双漏洞新闻通告；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 大量逐词换行及营销/推荐阅读污染
- 正文清楚区分受影响版与修复版，但尚缺固定修复构建和直接官方公告URL
- Spark与旧分支范围明确仍未知，不能自动扩展影响列表

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- 官方sk1000117/sk1000118、修复构建及具体条件待核验
- 引用图片未查看，截图内容及有效性待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->

Swati Khandelwal
                    Swati Khandelwal  代码卫士   2026-09-11 08:42  
  
![](../../.resource/remote/afc2fa5611a63e89ebec625ecc33d28c5dcdb706b6fbdabb79f7c1e8982068c0.gif "")  
    
聚焦源代码安全，网罗国内外最新资讯！  
  
编译：代码卫士  
  
**Check Point****已修复因防火墙和管理产品处理****VPN****证书方式引发的两个严重漏洞（****CVE-2026-85102****和****CVE-2026-85103****）。该公司表示，这两个漏洞都可能导致未经身份验证的远程攻击者运行代码，但仅限于该公司并未描述的****“****特定条件****”****下。**  
  
Check Point   
于  
 9   
月  
 9   
日在向客户社区发布的通知中披露了这些漏洞，并于同日开始提供修复程序。该公司表示，这两个漏洞都由内部发现，且未有迹象表明其中任何一个已被用于攻击。  
  
CVE-2026-85102   
是在  
 VPN   
协商期间未能正确验证证书信任。未经身份验证的远程攻击者可能能够在防火墙设备  
 Security Gateway   
上运行代码。  
CVE-2026-85103   
是一个基于堆的缓冲区溢出，发生在产品解码  
 VPN   
证书的  
 ASN.1   
结构时未经身份验证的远程攻击者可能能够在  
 Quantum Security Management   
和  
 Quantum Security Gateway   
系统上运行代码。这两个漏洞的  
 CVSS   
评分均为  
 9.8  
。  
Check Point   
自行分配了这些标识符和评分。  
  
这两个漏洞的受影响版本相同，如下：  
  
- R82.10   
搭配  
 Jumbo Hotfix Take 43   
或更低版本  
  
- R82   
搭配  
 Jumbo Hotfix Take 125   
或更低版本  
  
- R81.20   
搭配  
 Jumbo Hotfix Take 165   
或更低版本  
  
  
  
以上版本是受影响版本，并非包含修复的版本。该列表涵盖三个  
 Quantum   
分支，并未提供其它任何版本信息。加拿大网络安全中心当晚发布的公告列出了更广泛的产品，但并未提供版本信息。它列出了  
 Security Gateway  
、  
Security Management Server   
和  
 Spark Firewall  
，即  
 Check Point   
的小型企业产品线。  
Spark   
出现了两次，一次针对使用站点到站点或远程访问  
 VPN   
的部署，一次针对没有该条件的情况。  
  
在同一社区帖子中，一名  
 Check Point   
员工被问及关闭了  
 VPN   
软件刀片的网关是否受  
 CVE-2026-85103   
漏洞的影响。该员工回复称，该问题涉及证书处理，因此理论上，在没有  
 VPN   
但存在  
 VPN   
证书的环境中也可能被触发。  
  
Check Point   
为客户提供了两条修复途径。第一种是  
 Check Point Live Patch  
。该公司表示，使用它的客户会随着  
 rollout   
开始而自动受到保护，该  
 rollout   
已于  
 9   
月  
 9   
日开始。一名  
 Check Point   
员工在帖子中表示，它可以安装在  
 R81.20  
、  
R82.00   
和  
 R82.10   
的任何  
 Jumbo Hotfix   
级别之上，并且只列出了这三个版本。第二种是  
 Jumbo Hotfix  
。  
Check Point 告知  
客户称，应尽早安装部署版本的最新  
 Jumbo Hotfix 。  
  
  
![](../../.resource/remote/ae040977292eb5987d2738c4f8833ef44f371aa27dcf1f9c58858ae713f6dfce.gif "")  
  
**如无法打补丁**  
  
  
![](../../.resource/remote/ae040977292eb5987d2738c4f8833ef44f371aa27dcf1f9c58858ae713f6dfce.gif "")  
  
  
  
两名客户在帖子中表示，他们正在运行  
 R81.10  
，并且数周内不会迁移离开该版本。其中一人表示，该分支没有可用的  
 Jumbo Hotfix  
，也没有  
 Live Patch  
，因此缓解措施是唯一选择。  
  
该客户称，公告中的缓解措施是关闭  
 VPN   
的未明确规则，并称其过于含糊，无法据此采取行动，还询问应注释掉哪些配置行。另一人询问如何在不影响远程用户的情况下应用该缓解措施。这两个问题在帖子中都没有得到回答。几名客户还表示，自动  
 rollout   
尚未覆盖他们。五个不同账户报告称，在公告发布当天，网关仍停留在紧急安全更新包的  
 Take 18   
或  
 Take 17  
；其中一人发布了一份更新日志，显示  
 Take 18   
于  
 9   
月  
 1   
日安装，此后没有任何更新。  
  
几名客户报告称，两份公告中的下载链接对他们无效，一名  
 Check Point   
员工回复称，链接已经过检查并且可用。一名客户随后表示，公告链接在两个浏览器中仍然失败，而  
 Live Patch   
文章中的链接则可用。  
  
6   
月和  
 7   
月，  
Check Point   
修复了这些产品中的严重漏洞，并称在宣布时这些漏洞已被利用。  
6   
月的是  
 CVE-2026-50751  
，是  
 Remote Access VPN   
和  
 Mobile Access   
证书验证中的身份验证绕过漏洞。美国网络安全和基础设施安全局  
 (CISA)   
于  
 6   
月  
 8   
日将其加入已知被利用漏洞目录。  
  
7   
月的是  
 CVE-2026-16232  
，是一个  
 SmartConsole   
身份验证绕过漏洞，  
CISA   
在其披露当天将其加入同一目录。这是  
 Check Point   
当月修复的三个漏洞之一，其中两个影响  
 Security Management Server  
，也就是  
 CVE-2026-85103   
所触及的同一组件。  
  
Check Point   
尚未发布这两个新漏洞的妥协指标。当在帖子中被问及日志是否会显示利用它们的尝试时，一名员工表示，公司没有看到外部利用的证据，并且妥协指标只适用于已经存在的利用。  
  
Check Point   
的通知以及本文审阅的任何公开记录，均未说明哪些  
 Spark   
或  
 Security Management   
版本受影响、哪些构建包含修复，或该公司所称这些漏洞需要哪些具体条件。这些材料中也没有任何内容说明安装修复程序是否会移除攻击者可能已经获得的访问权限。  
  
客户可参见  
Check Point   
的公告  
 sk1000117   
和  
 sk1000118  
，获取受影响产品、缓解指导和修复步骤的文件指南。  
  
  
代码卫士试用地址：https://sast.qianxin.com/  
  
开源卫士试用地址：https://oss.qianxin.com/  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[攻击者利用 Check Point VPN 访问企业网络](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247519614&idx=2&sn=61729da3c7c16514ae5bdae557f4e001&scene=21#wechat_redirect)  
  
  
[黑客利用 vBulletin 0day 攻陷 Check Point 旗下软件安全公司](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247491542&idx=2&sn=6500e7b105b4d3af132fb5fc82757a55&scene=21#wechat_redirect)  
  
  
[Zimbra SNMP 未认证 RCE 漏洞已遭利用](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247526941&idx=1&sn=11e4c40814e3f01c72e6879ff92a5b4c&scene=21#wechat_redirect)  
  
  
[Langflow 高危漏洞被用于未认证RCE攻击](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247526269&idx=2&sn=0d7a31b3a12799330b0f67e3123dcd7c&scene=21#wechat_redirect)  
  
  
[SolarWinds 修复四个严重漏洞，可导致未认证RCE和认证绕过](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247525028&idx=3&sn=70181900e6f00cf38ce9655f395495d9&scene=21#wechat_redirect)  
  
  
[速修复！React满分漏洞同时影响 Next.js，可导致未认证RCE](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247524584&idx=2&sn=d601040ac12c82888e8edba633d2fc02&scene=21#wechat_redirect)  
  
  
  
  
  
**原文链接**  
  
https://thehackernews.com/2026/09/check-point-discloses-two-98-rated-vpn.html  
  
  
题图：Pixa  
b  
ay Licens  
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
