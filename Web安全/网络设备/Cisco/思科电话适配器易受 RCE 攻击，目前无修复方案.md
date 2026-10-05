---
source: "gelusus/wxvl 公众号漏洞文库"
id: "vw-fb23317728e35c915d461a99"
entity_id: "ve-fb23317728e35c915d461a99"
schema_version: "1"
title: "思科电话适配器易受 RCE 攻击，目前无修复方案"
product: "Cisco SPA112电话适配器"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "primary"
primary_identifiers: "CVE-2023-20126"
referenced_identifiers: ""
prerequisites: "未认证Web固件更新；EOL无补丁；网络可达不等于必须本地"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/Cisco/%E6%80%9D%E7%A7%91%E7%94%B5%E8%AF%9D%E9%80%82%E9%85%8D%E5%99%A8%E6%98%93%E5%8F%97%20RCE%20%E6%94%BB%E5%87%BB%EF%BC%8C%E7%9B%AE%E5%89%8D%E6%97%A0%E4%BF%AE%E5%A4%8D%E6%96%B9%E6%A1%88.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_status: "unknown"
---

#  思科电话适配器易受 RCE 攻击，目前无修复方案   

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Cisco SPA112电话适配器
- 本文讨论：CVE-2023-20126
- 版本、权限与配置前提：未认证Web固件更新；EOL无补丁；网络可达不等于必须本地
- 资料类型：新闻通告；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 无固件范围和厂商直链
- 2023年推荐ATA190但同时称2024-03-31到期，作为当前替换建议已失效
- 无需检测横移等后果是推测，须与漏洞证据分开

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- EOL里程碑、固件范围与可行替换待核验
- 引用图片未查看，截图内容及有效性待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->

Bill Toulas  代码卫士   2023-05-05 17:32  
  
![](../../.resource/remote/afc2fa5611a63e89ebec625ecc33d28c5dcdb706b6fbdabb79f7c1e8982068c0.gif "")  
  
   
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
**思科披露了 SPA112 2-Port 电话适配器 web 管理接口中的一个漏洞 (CVE-2023-20126)，它可导致未认证远程攻击者在设备上执行任意代码。**  
  
![](../../.resource/remote/cd0c5e75c20dd68311f507cef9a3c569c1db69279d5eb6d2f33eb382a147c6fc.png "")  
  
  
该漏洞是严重级别的漏洞，CVSS评分为9.8，是由固件升级功能中缺少认证流程导致的。思科在安全通告中提到，“攻击者可将受影响设备升级至构造固件版本，利用该漏洞。成功利用该漏洞可导致攻击者以完全权限在受影响设备上执行任意代码。”  
  
这些电话适配器非常受欢迎，无需升级即将模拟电话机集成到 VoIP 网络中。虽然这些适配器可能用于很多组织机构中，但可能不会暴露到互联网，导致这些漏洞基本可从本地网络遭利用。然而，获得对这些设备的访问权限有助于攻击者在无需检测的情况下在网络中横向移动，因为安全软件一般不会监控这类设备。  
  
鉴于思科 SPA112 已达生命周期，因此已经不再受支持且不会收到安全更新。同时思科并未提供相关缓解措施。  
  
思科安全通告旨在提醒用户替换受影响的电话适配器或者执行额外安全层，以免受攻击。推荐的替换型号是思科 ATA 190系列模拟电话适配器，它将于2024年3月31日到期。  
  
思科并未发现该漏洞遭在野利用的实例，不过情况可能随时变化，因此建议管理员尽快采取适当的预防措施。热门设备上的严重漏洞是攻击者的潜在候选目标，可能导致大规模的安全事件发生。  
  
  
****  
  
![](../../.resource/remote/66b1ac947994df6ffca93aa0695c4d5878660931663fdc6f9bb6359a33c59e8f.png "")  
  
  
![](../../.resource/remote/7ac0e4dd5ecf5ae15d5f5eede1491e723925c4ff6a4ed491da1c31ac64c5b113.jpg "")  
  
****  
代码卫士试用地址：  
https://codesafe.qianxin.com  
  
开源卫士试用地址：https://oss.qianxin.com  
  
  
  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247511052&idx=3&sn=fb116392e405ae62e6c339117fffdb59&chksm=ea949d66dde31470758b6ee8f9dbecdb67ef6c0c8af277f26b83b60dbac95748d28db787a4b4&scene=21#wechat_redirect)  
[奇安信入选全球《软件成分分析全景图》代表厂商](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247515374&idx=1&sn=8b491039bc40f1e5d4e1b29d8c95f9e7&chksm=ea948d84dde30492f8a6c9953f69dbed1f483b6bc9b4480cab641fbc69459d46bab41cdc4859&scene=21#wechat_redirect)  
  
  
[思科多款IP电话存在严重的Web UI RCE漏洞，有一个将不修复](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247515804&idx=1&sn=3584a336f62d0ca3a0fde7fe3f9bd5dd&chksm=ea948ff6dde306e0cd113b8566d71e3afaca9efd2a9a141cc0a9126b8e84380d067a6405ab9f&scene=21#wechat_redirect)  
  
  
[思科开源杀软ClamAV中存在严重的RCE漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247515647&idx=2&sn=704411c89c34c85e52e2ad18ff0fb77c&chksm=ea948c95dde305838410d09bd123fd529f7be43231802fc228e4300929816f4adb5d4f72007e&scene=21#wechat_redirect)  
  
  
[思科不打算修复VPN路由器 RCE 0day](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247512438&idx=1&sn=563e5fbc7e61730cf40397cd09414e2b&chksm=ea94801cdde3090ad98fcb1524ccb001df9942040fddf238640160b7dab3a84c77eeef57ee7e&scene=21#wechat_redirect)  
  
  
[VPN路由器存在 RCE 0day，思科不打算修复](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247507288&idx=1&sn=35ea226a198d2e8b498fc0594f0c9e4c&chksm=ea94ec32dde365247ce79386abc905a55fa29ff709ced9085f116a97b44f37d5af3b6c853711&scene=21#wechat_redirect)  
  
  
  
  
**原文链接**  
  
https://www.bleepingcomputer.com/news/security/cisco-phone-adapters-vulnerable-to-rce-attacks-no-fix-available/  
  
  
题图：Pixabay License  
  
  
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
