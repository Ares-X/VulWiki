---
source: "gelusus/wxvl 公众号漏洞文库"
id: "vw-d1f84b0b078ac4ebbb8b6e84"
entity_id: "ve-d1f84b0b078ac4ebbb8b6e84"
schema_version: "1"
title: "BeyondTrust 严重漏洞可导致预认证RCE"
product: "BeyondTrust Remote Support/Privileged Remote Access"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "primary"
primary_identifiers: "CVE-2026-1731"
referenced_identifiers: ""
prerequisites: "RS≤25.3.1/PRA≤24.3.4声称，修复RS25.3.2/PRA25.1.1及BT26-02补丁，site用户权限"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%AE%89%E5%85%A8%E8%AE%BE%E5%A4%87/BeyondTrust%20PAM/BeyondTrust%20%E4%B8%A5%E9%87%8D%E6%BC%8F%E6%B4%9E%E5%8F%AF%E5%AF%BC%E8%87%B4%E9%A2%84%E8%AE%A4%E8%AF%81RCE.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_status: "unknown"
---

#  BeyondTrust 严重漏洞可导致预认证RCE  

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：BeyondTrust Remote Support/Privileged Remote Access
- 本文讨论：CVE-2026-1731
- 版本、权限与配置前提：RS≤25.3.1/PRA≤24.3.4声称，修复RS25.3.2/PRA25.1.1及BT26-02补丁，site用户权限
- 资料类型：预认证RCE公告新闻；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 缺官方直链，版本升级与独立补丁适用矩阵需明确
- SaaS已修复是2026-02-02时间状态，不能代替自托管确认；广告冗余

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- PRA版本区间及旧版本21.3/22.1补丁支持边界待核
- 引用图片未查看，截图内容及有效性待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->

Ddos
                    Ddos  代码卫士   2026-02-09 10:31  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Az5ZsrEic9ot90z9etZLlU7OTaPOdibteeibJMMmbwc29aJlDOmUicibIRoLdcuEQjtHQ2qjVtZBt0M5eVbYoQzlHiaw/640?wx_fmt=gif "")  
    
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
**BeyondTrust****公司发布关于热门远程访问解决方案的安全报警，提醒注意CVSS v4评分为9.9的严重漏洞CVE-2026-1731，它可导致攻击者在无需登录的情况下控制系统。管理自托管实例的组织机构应立即修复。**  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
该漏洞影响 BeyondTrust 远程支持 (RS) 和特权远程访问 (PRA) 工具，它们旨在帮助IT团队以安全的方式管理基础设施。具有讽刺意味的是，该漏洞将该安全工具转变为潜在的攻破口。  
  
该问题的核心是一个“预认证远程代码执行”漏洞，即攻击者无需用户名、密码或任何系统访问权限，只需向目标服务器发送特定类型的网络请求即可发动攻击。安全公告提到，“BeyondTrust 远程支持和特权远程访问的老旧版本中包含一个严重的预认证远程代码执行漏洞，可通过特殊构造的客户端请求触发。”  
  
一旦接收到请求，攻击者即可以“站点用户”的权限执行操作系统命令。由于这些工具通常深入集成到企业网络，因此潜在影响巨大。报告提醒称，“成功利用无需认证或用户交互，可导致系统遭攻陷如未经授权访问、数据提取和服务中断等。”  
  
BeyondTrust 已在2026年2月2日为所有SaaS 版本推送补丁。不过使用自托管（本地）设备的组织机构面临风险，必须手动更新：  
  
- 远程支持 (RS)：25.3.1及之前版本易受攻击。管理员必须升级至25.3.2或后续版本。  
  
- 特权远程访问 (PRA)：24.3.4及之前版本易受攻击。管理员必须升级至25.1.1或后续版本。  
  
  
  
运行远程支持21.3之前版本或PRA 22.1之前版本的客户无法直接应用补丁修复漏洞，而是“需要升级至更新版本来应用补丁”。鉴于该漏洞的CVSS评分高达9.9，IT管理员应立即检查设备接口并确保应用BT26-02-RS补丁或BT26-02-PRA补丁。  
  
  
 开源  
卫士试用地址：  
https://oss.qianxin.com/#/login  
  
  
 代码卫士试用地址：https://sast.qianxin.com/#/login  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[BeyondTrust：注意远程支持软件中的预认证RCE](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247523333&idx=1&sn=7293c7dd1145ab18fd71d834ad208fe0&scene=21#wechat_redirect)  
  
  
[Commvault 预认证利用链可用于实施RCE攻击](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247523861&idx=1&sn=d7b88fdc84ab443ced7ac3c7ee6786b6&scene=21#wechat_redirect)  
  
  
[Fortinet：注意这个严重的 FortiSIEM 预认证 RCE 漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247523808&idx=1&sn=ef2a5d044fa1a9c53dc3920c5ce650d5&scene=21#wechat_redirect)  
  
  
[MongoDB 服务器预认证漏洞可用于触发 DoS 条件](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247523414&idx=2&sn=35dbec1ac12ce977cb52bd37b9d9860a&scene=21#wechat_redirect)  
  
  
[CISA 提醒注意已遭活跃利用的 Juniper 预认证 RCE 利用链](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247518122&idx=1&sn=d6b5a20e45ee8897ed249a7bdde21ebb&scene=21#wechat_redirect)  
  
  
  
  
  
**原文链接**  
  
https://securityonline.info/cve-2026-1731-critical-beyondtrust-flaw-cvss-9-9-allows-pre-auth-rce/  
  
  
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
