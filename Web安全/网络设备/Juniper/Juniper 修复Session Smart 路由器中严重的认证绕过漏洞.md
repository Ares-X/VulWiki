---
source: "gelusus/wxvl 公众号漏洞文库"
id: "vw-0e03af89ae9b8d4974f15914"
entity_id: "ve-0e03af89ae9b8d4974f15914"
schema_version: "1"
title: "Juniper 修复Session Smart 路由器中严重的认证绕过漏洞"
product: "Juniper Session Smart Router/Conductor/WAN Assurance"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "primary"
primary_identifiers: "CVE-2025-21589"
referenced_identifiers: "CVE-2024-2973"
prerequisites: "网络认证绕过；各SSR分支修复；Conductor可推缓解至节点"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/Juniper/Juniper%20%E4%BF%AE%E5%A4%8DSession%20Smart%20%E8%B7%AF%E7%94%B1%E5%99%A8%E4%B8%AD%E4%B8%A5%E9%87%8D%E7%9A%84%E8%AE%A4%E8%AF%81%E7%BB%95%E8%BF%87%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_status: "unknown"
---

#  Juniper 修复Session Smart 路由器中严重的认证绕过漏洞   

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Juniper Session Smart Router/Conductor/WAN Assurance
- 本文讨论：CVE-2025-21589
- 版本、权限与配置前提：网络认证绕过；各SSR分支修复；Conductor可推缓解至节点
- 资料类型：新闻通告；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 仅列安全版缺受影响最低范围及官方直链
- 升级Conductor后不易受影响不等于路由固件已经永久修复，文中建议仍升级应保留
- 常在一周内遭攻击为泛化历史断言无统计来源

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- Conductor自动缓解机制、范围待核验
- 引用图片未查看，截图内容及有效性待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->

Sergiu Gatlan  代码卫士   2025-02-19 10:07  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Az5ZsrEic9ot90z9etZLlU7OTaPOdibteeibJMMmbwc29aJlDOmUicibIRoLdcuEQjtHQ2qjVtZBt0M5eVbYoQzlHiaw/640?wx_fmt=gif "")  
  
   
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
**Juniper Networks 公司修复了一个严重漏洞，它可导致攻击者绕过认证并接管Session Smart Router (SSR) 设备。**  
  
该漏洞的编号是CVE-2025-21589，是Juniper Networks 公司在内部产品安全测试过程中找到的，它同时影响 Session Smart Conductor和WAN Assurance Managed Routers。上周，该公司在一份带外安全公告中提到，“Juniper Networks Session Smart Router 中存在通过可选路径或信道绕过认证的漏洞，可导致基于网络的攻击者绕过认证并控制设备。”  
  
Juniper Networks安全事件响应团队 (SIRT) 提到，尚未发现该漏洞已遭利用的证据。该公司已在SSR-5.6.17、SSR-6.1.12-lts、SSR-6.2.8-lts、SSR-6.3.3-r2和之后版本中修复该漏洞。虽然该公司表示与Mist Cloud 相连接的一些设备已得到修复，但建议管理员将所有受影响系统升级至已修复版本。  
  
Juniper 表示，“在Conductor管理的部署中，仅修复 Conductor 节点即可，修复方案将会自动推送到联网路由器。在实践中，路由器应当升级至已修复版本，尽管它们连接至已升级的 Conductor后并不易受影响。”  
  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/oBANLWYScMQhr6jXufaic6PJrZauaJPDaD1ibGiaFMEGFsj7NfhCojnSXl4L07PJSBB07fT9Nq8ENpy0ywg1icNS0A/640?wx_fmt=gif&from=appmsg "")  
  
**常遭攻击**  
  
  
因用于关键环境中Juniper 设备常遭攻击，经常在厂商发布安全更新不到一周时间后就会被攻击。  
  
例如，去年6月，Juniper 公司发布紧急更新，修复了另外一个SSR 认证绕过漏洞（CVE-2024-2973），它可用于完全接管未修复设备。8月，ShadowServer 威胁监控服务提醒称，威胁行动者利用watchTowr Labs 发布的利用代码攻击 Juniper EX交换机和 SRX 防火墙。一个月之后，VulnCheck 公司发现数千台 Juniper 设备仍然受该利用链的影响。去年12月，Juniper还提醒称攻击者正在使用默认凭据扫描互联网中的Session Smart路由器并通过 Mirai 恶意软件实施感染。  
  
  
  
代码卫士试用地址：  
https://codesafe.qianxin.com  
  
开源卫士试用地址：https://oss.qianxin.com  
  
  
  
  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[Juniper 紧急修复严重的认证绕过漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247519930&idx=1&sn=fb9fb97863d38cac47e2e8c94fdfc267&scene=21#wechat_redirect)  
  
  
[Juniper Networks 修复交换机、防火墙中的多个漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247518790&idx=2&sn=8654a2f71be0f352dbd073de6482ef88&scene=21#wechat_redirect)  
  
  
[Juniper 提醒注意防火墙和交换机中的严重RCE漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247518669&idx=2&sn=0cbdae2b9be2d7406ffaea5ba7dc47d1&scene=21#wechat_redirect)  
  
  
[CISA 提醒注意已遭活跃利用的 Juniper 预认证 RCE 利用链](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247518122&idx=1&sn=d6b5a20e45ee8897ed249a7bdde21ebb&scene=21#wechat_redirect)  
  
  
[Juniper Networks 修复Junos OS中的30多个漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247517894&idx=2&sn=dfa23961cb9b4c490ab70b8e96d111c7&scene=21#wechat_redirect)  
  
  
  
  
  
**原文链接**  
  
  
https://www.bleepingcomputer.com/news/security/juniper-patches-critical-auth-bypass-in-session-smart-routers/  
  
  
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
