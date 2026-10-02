---
source: "gelusus/wxvl 公众号漏洞文库"
id: "vw-79fd5e89d3543cd2f54cbd55"
entity_id: "ve-79fd5e89d3543cd2f54cbd55"
schema_version: "1"
title: "Cisco 会议管理漏洞让攻击者能够将权限提升为管理员"
product: "Cisco Meeting Management"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "primary"
primary_identifiers: "CVE-2025-20156"
referenced_identifiers: ""
prerequisites: "低权限已认证REST API用户提权；<3.9.1，3.10不受影响"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/Cisco/Cisco%20%E4%BC%9A%E8%AE%AE%E7%AE%A1%E7%90%86%E6%BC%8F%E6%B4%9E%E8%AE%A9%E6%94%BB%E5%87%BB%E8%80%85%E8%83%BD%E5%A4%9F%E5%B0%86%E6%9D%83%E9%99%90%E6%8F%90%E5%8D%87%E4%B8%BA%E7%AE%A1%E7%90%86%E5%91%98.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_status: "unknown"
---

#  Cisco 会议管理漏洞让攻击者能够将权限提升为管理员   

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Cisco Meeting Management
- 本文讨论：CVE-2025-20156
- 版本、权限与配置前提：低权限已认证REST API用户提权；&lt;3.9.1，3.10不受影响
- 资料类型：新闻通告；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 修复版本和认证要求清楚，但没有官方公告直链，仅二手报道
- 推荐阅读和推广污染，SMB CVE引用不属本文漏洞

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- 版本及边缘节点控制影响待官方核验
- 引用图片未查看，截图内容及有效性待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->

邑安科技  邑安全   2025-01-23 03:37  
  
更多全球网络安全资讯尽在邑安全  
  
![](https://mmbiz.qpic.cn/mmbiz_png/1N39PtINn8sl2ribVVhnRCjmiadibY1vZyMiaWRuYCQuPJZd1tOhhKSCkz3rg9QWT4vH0JhAC8Q8un7sno55h7X4dg/640?wx_fmt=png&from=appmsg "")  
  
  
在Cisco Meeting Management 中发现了一个严重的安全漏洞，可能允许具有低级访问权限的攻击者将其权限提升为管理员。  
  
CVE-2025-20156漏洞存在于思科会议管理的REST API中。它源于对REST API用户的授权协议实施不足。  
  
利用此漏洞需要攻击者向特定端点发送特制的 API 请求。如果成功，攻击者可以获得对 Cisco Meeting Management 管理的边缘节点的管理员级控制权。  
  
此漏洞尤其令人担忧，因为它可能使攻击者能够通过提升其权限来破坏关键系统。但是，只有经过身份验证且具有低级别访问权限的用户才能利用该漏洞，与未经身份验证的漏洞相比，这限制了其范围。  
  
**Cisco 会议管理漏洞**  
  
此漏洞会影响 3.9.1 版之前的所有 Cisco Meeting Management 版本。建议运行 3.9 之前版本的用户迁移到固定版本。第一个安全版本如下：  
- 3.9.1：漏洞修补。  
  
- 3.10：不受影响。  
  
Cisco 已发布解决此漏洞的免费软件更新。拥有有效服务合同的客户可以通过其常用的支持渠道或通过 Cisco 支持和下载页面访问更新。  
  
对于没有服务合同的用户，Cisco 技术支持中心 （TAC） 可以提供帮助以获取必要的补丁。  
  
Cisco 已发布安全公告并发布软件更新以解决该问题，敦促用户立即升级。  
  
此问题没有可用的解决方法，因此软件更新是降低风险的唯一可行解决方案。  
  
Cisco 强烈建议所有客户：  
- 立即升级到版本 3.9.1 或更高版本。  
  
- 在升级之前，请验证其设备是否具有足够的内存和兼容的硬件配置。  
  
- 定期查看所有 Cisco 产品的安全建议，以确保提供全面保护。  
  
截至目前，思科的产品安全事件响应团队 （PSIRT） 尚未观察到任何针对此漏洞的积极利用。  
  
该问题是在内部安全测试期间发现的，凸显了思科采取的主动措施来识别和解决潜在威胁，以免被利用。  
  
使用 Cisco Meeting Management 的组织应迅速采取行动，应用必要的更新并保护其系统免受潜在攻击。  
  
原文来自:   
cybersecuritynews.com  
  
原文链接: https://cybersecuritynews.com/cisco-meeting-management-vulnerability/  
  
  
欢迎收藏并分享朋友圈，让五邑人网络更安全  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/1N39PtINn8tD9ic928O6vIrMg4fuib48e1TsRj9K9Cz7RZBD2jjVZcKm1N4QrZ4bwBKZic5crOdItOcdDicPd3yBSg/640?wx_fmt=jpeg "")  
  
欢迎扫描关注我们，及时了解最新安全动态、学习最潮流的安全姿势！  
  
推荐文章  
  
1  
  
[新永恒之蓝？微软SMBv3高危漏洞（CVE-2020-0796）分析复现](http://mp.weixin.qq.com/s?__biz=MzUyMzczNzUyNQ==&mid=2247488913&idx=1&sn=acbf595a4a80dcaba647c7a32fe5e06b&chksm=fa39554bcd4edc5dc90019f33746404ab7593dd9d90109b1076a4a73f2be0cb6fa90e8743b50&scene=21#wechat_redirect)  
  
  
2  
  
[重大漏洞预警：ubuntu最新版本存在本地提权漏洞（已有EXP）　](http://mp.weixin.qq.com/s?__biz=MzUyMzczNzUyNQ==&mid=2247483652&idx=1&sn=b2f2ec90db499e23cfa252e9ee743265&chksm=fa3941decd4ec8c83a268c3480c354a621d515262bcbb5f35e1a2dde8c828bdc7b9011cb5072&scene=21#wechat_redirect)  
  
  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
