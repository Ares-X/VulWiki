---
cve: "CVE-2024-54085"
source: "gelusus/wxvl 公众号漏洞文库"
id: "vw-bc55e1a20cdc80bb9243ba87"
entity_id: "ve-bc55e1a20cdc80bb9243ba87"
schema_version: "1"
title: "华硕修复严重的AMI 漏洞"
product: "AMI MegaRAC BMC / ASUS四款主板"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "primary"
primary_identifiers: "CVE-2024-54085"
referenced_identifiers: ""
prerequisites: "Redfish管理面可达；列四主板安全BMC版本"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/%E5%8D%8E%E7%A1%95/%E5%8D%8E%E7%A1%95%E4%BF%AE%E5%A4%8D%E4%B8%A5%E9%87%8D%E7%9A%84AMI%20%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_status: "unknown"
---

#  华硕修复严重的AMI 漏洞   

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：AMI MegaRAC BMC / ASUS四款主板
- 本文讨论：CVE-2024-54085
- 版本、权限与配置前提：Redfish管理面可达；列四主板安全BMC版本
- 资料类型：OEM BMC补丁新闻；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 应归服务器BMC非华硕路由设备；复用AMI实体并保存OEM补丁差异
- 缺ASUS/AMI/Eclypsium直接链接，物理损坏是潜在影响而非本篇实证
- full flash建议有破坏配置风险，未给官方操作范围；MBC拼错

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- 板卡BMC版本与full flash要求、攻击前提待厂商确认
- 引用图片未查看，截图内容及有效性待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->

Bill Toulas  代码卫士   2025-04-24 09:51  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Az5ZsrEic9ot90z9etZLlU7OTaPOdibteeibJMMmbwc29aJlDOmUicibIRoLdcuEQjtHQ2qjVtZBt0M5eVbYoQzlHiaw/640?wx_fmt=gif "")  
    
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
**华硕发布安全更新，修复CVSS评分为10的严重漏洞CVE-2024-54085，它可导致攻击者劫持并导致服务器崩溃。**  
  
  
![](https://mmbiz.qpic.cn/mmbiz_png/oBANLWYScMQAYLCC5zXvDXGjUic1kFNkPVSxZWEmwBglBWfF4Miakn2yYTWTzmGWhX2D6AM3Nwtw13YWn3hax5iaw/640?wx_fmt=png&from=appmsg "")  
  
  
该漏洞影响安迈科技公司的 MegaRAC BMC 软件，而它用于超过12家服务器硬件厂商，包括慧与、华硕以及ASRock公司。CVE-2024-54085可遭远程利用，可能导致恶意软件感染、固件遭修改以及因电压过高造成的不可逆物理损坏。  
  
Eclypsium 公司在一份相关的报告中提到，“本地或远程攻击者可通过访问远程管理界面 (Redfish) 或BMC 界面 (Redfish) 的内部主机，利用该漏洞。利用该漏洞可导致攻击者远程控制受陷服务器、远程部署恶意软件、勒索软件、固件篡改、导致主板组件（BMC 或可能是BIOS/UEFI）崩溃、还可能造成服务器物理损坏（电压过高/崩溃）及受害者无法停止的重启循环。”  
  
尽管AMI公司在2025年3月11日发布安全通告和补丁，但受影响的原始设备制造商将修复方案部署在产品上时需要时间。今天，华硕宣布已为受CVE-2024-54085影响的四款主板模型发布修复方案。  
  
用户应升级到的 BMC 固件版本如下：  
  
- PRO WS W790E-SAGE SE – 1.1.57版本  
  
- PRO WS W680M-ACE SE –1.1.21版本  
  
- PRO WS WRX90E-SAGE SE –2.1.28版本  
  
- Pro WS WRX80E-SAGE SE WIFI –1.34.0版本  
  
  
  
鉴于该漏洞的严重性高，且可被远程利用，因此应尽快执行固件更新。可通过web界面＞维护＞固件更新进行，选择该文件，并点击“开启固件更新”来下载最新版的BMC 固件更新（.ima 文件）。也同时建议用户检查“full flash”选项。要了解关于安全执行 MBC 固件更新和调试的更多相关信息，可查看华硕公司的FAQ页面。  
  
  
****  
代码卫士试用地址：  
https://codesafe.qianxin.com  
  
开源卫士试用地址：https://oss.qianxin.com  
  
  
  
  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[华硕：启用AiCloud 的路由器中存在严重的认证绕过漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247522801&idx=1&sn=be29e21bdd328bab3ee1bbc42562d47e&scene=21#wechat_redirect)  
  
  
[华硕：严重的远程绕过漏洞影响7款路由器](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247519766&idx=1&sn=e5617e80059a29c20c16b011271e8511&scene=21#wechat_redirect)  
  
  
[华硕证实菲律宾员工数据被泄露在黑客论坛](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247519060&idx=2&sn=6105a3152e4cf58dc7f6100cc53d066c&scene=21#wechat_redirect)  
  
  
[华硕路由器易遭多个RCE漏洞影响](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247517570&idx=1&sn=34fd77e3506951e7f7fd62a7ab442b2c&scene=21#wechat_redirect)  
  
  
[华硕紧急修复多个严重的路由器漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247516769&idx=1&sn=e00e30e1c0b1187da247a4f936d2761e&scene=21#wechat_redirect)  
  
  
  
  
  
**原文链接**  
  
https://www.bleepingcomputer.com/news/security/asus-releases-fix-for-ami-bug-that-lets-hackers-brick-servers/  
  
  
  
题图：  
Pixabay   
License  
  
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
