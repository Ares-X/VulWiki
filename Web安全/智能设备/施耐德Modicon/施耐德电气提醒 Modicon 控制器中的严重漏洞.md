---
source: "gelusus/wxvl 公众号漏洞文库"
id: "vw-506ba9784b2626d8e4f67927"
entity_id: "ve-506ba9784b2626d8e4f67927"
schema_version: "1"
title: "施耐德电气提醒注意 Modicon 控制器中的严重漏洞"
product: "Schneider Modicon M241/M251/M258/LMC058"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "primary"
primary_identifiers: "CVE-2024-11737"
referenced_identifiers: ""
prerequisites: "截至2024-12报道所有版本，TCP502不可信访问"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E6%99%BA%E8%83%BD%E8%AE%BE%E5%A4%87/%E6%96%BD%E8%80%90%E5%BE%B7Modicon/%E6%96%BD%E8%80%90%E5%BE%B7%E7%94%B5%E6%B0%94%E6%8F%90%E9%86%92%20Modicon%20%E6%8E%A7%E5%88%B6%E5%99%A8%E4%B8%AD%E7%9A%84%E4%B8%A5%E9%87%8D%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_status: "unknown"
---

#  施耐德电气提醒注意 Modicon 控制器中的严重漏洞   

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Schneider Modicon M241/M251/M258/LMC058
- 本文讨论：CVE-2024-11737
- 版本、权限与配置前提：截至2024-12报道所有版本，TCP502不可信访问
- 资料类型：控制器漏洞新闻；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 未解释具体根因/权限，所有版本与修复进行中是历史状态须加日期
- 原文仅securityonline二手链接，缺厂商通知；广告及无关推荐较多

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- 官方根因、实际影响及当前修复状态未核
- 引用图片未查看，截图内容及有效性待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->

securityonline  代码卫士   2024-12-12 10:09  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Az5ZsrEic9ot90z9etZLlU7OTaPOdibteeibJMMmbwc29aJlDOmUicibIRoLdcuEQjtHQ2qjVtZBt0M5eVbYoQzlHiaw/640?wx_fmt=gif "")  
  
   
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
**施耐德电气发布一份安全通知，提醒注意 Modicon M241、M251、M258和LMC058 可编程逻辑控制器 (PLCs) 中的一个严重漏洞CVE-2024-11737（CVSS评分9.8）。该漏洞可导致攻击者引发拒绝服务攻击并攻陷该控制器的完整性。**  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/oBANLWYScMQaYHjeLoEv3R4T7PI8tFRoFaLuscYbbvpwRXczVlBGxJ40tiaRM3iawxic54cvj0icN2xk5yiaSbQVvFA/640?wx_fmt=gif&from=appmsg "")  
  
  
该漏洞影响 Modicon M241、M251、M258和LMC058 PLCs 的所有版本。这些控制器用于多种工业自动化应用中如制造业、能源和交通行业。  
  
施耐德电气公司目前正在着手推出修复方案，同时建议客户采取如下缓解措施：  
  
- 仅在受保护环境中使用控制器和设备，将网络暴露最小化并确保无法从公开互联网或不可信网络访问。  
  
- 通过嵌入式防火墙过滤端口和IP。  
  
- 设置网络分段并部署防火前，拦截所有对502/TCP的越权访问。  
  
- 禁用所有的未使用协议（默认配置）。  
  
  
  
施耐德电气公司还推荐客户阅读《ExoStruxure Machine Expert、Modicon 和 PacDrive 控制器网络安全指南》以及相关联设备的用户手册获取如何保护PLCs 安全的详细信息。  
  
  
代码卫士试用地址：  
https://codesafe.qianxin.com  
  
开源卫士试用地址：https://oss.qianxin.com  
  
  
  
  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[能源巨头施耐德电气遭勒索攻击](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247518779&idx=2&sn=fc541cc2a46dc855480ebc0adc836ae1&scene=21#wechat_redirect)  
  
  
[西门子爱立信施耐德电气等：欧盟《网络安全弹性法案(CRA)》或破坏供应链](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247518086&idx=1&sn=f13ff428d3f9ed6d4ea180de7154309a&scene=21#wechat_redirect)  
  
  
[工控补丁星期二：西门子、施耐德电气等修复50个漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247517016&idx=2&sn=8edf5db583691ce70b6b4910729e5c5b&scene=21#wechat_redirect)  
  
  
[施耐德电气 UPS 软件中存在严重的未认证 RCE 漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247516335&idx=1&sn=d6970653344d43075615c17ff16238fe&scene=21#wechat_redirect)  
  
  
[多个漏洞可导致施耐德电气继电器遭重启或设备遭接管](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247510739&idx=4&sn=96c3f57363e08e0b1c5d095730bfa726&scene=21#wechat_redirect)  
  
  
  
  
  
**原文链接**  
  
  
https://securityonline.info/schneider-electric-warns-of-critical-flaw-in-modicon-controllers-cve-2024-11737-cvss-9-8/  
  
  
题图：  
Pexels   
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
