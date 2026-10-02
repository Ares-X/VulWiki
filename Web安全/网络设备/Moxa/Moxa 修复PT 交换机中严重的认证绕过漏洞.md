---
source: "gelusus/wxvl 公众号漏洞文库"
id: "vw-90829063504f3474644b738a"
entity_id: "ve-90829063504f3474644b738a"
schema_version: "1"
title: "Moxa 修复PT 交换机中严重的认证绕过漏洞"
product: "Moxa PT系列及EDS508A交换机"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "primary"
primary_identifiers: "CVE-2024-12297"
referenced_identifiers: "CVE-2024-9138; CVE-2024-9140; CVE-2024-7695; CVE-2024-9404; CVE-2024-9137"
prerequisites: "认证弱点/MD5猜测或碰撞，九型号固件范围"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/Moxa/Moxa%20%E4%BF%AE%E5%A4%8DPT%20%E4%BA%A4%E6%8D%A2%E6%9C%BA%E4%B8%AD%E4%B8%A5%E9%87%8D%E7%9A%84%E8%AE%A4%E8%AF%81%E7%BB%95%E8%BF%87%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_status: "unknown"
---

#  Moxa 修复PT 交换机中严重的认证绕过漏洞   

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Moxa PT系列及EDS508A交换机
- 本文讨论：CVE-2024-12297
- 版本、权限与配置前提：认证弱点/MD5猜测或碰撞，九型号固件范围
- 资料类型：新闻通告；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 有受影响型号但无首修固件，全部联系支持；无Moxa原始公告URL
- 所谓MD5碰撞绕过与暴力猜凭据是不同能力，需要原始机制支持

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- 碰撞条件/凭据需求及固件修复待核验
- 引用图片未查看，截图内容及有效性待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->

Ravie Lakshmanan  代码卫士   2025-03-13 17:56  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Az5ZsrEic9ot90z9etZLlU7OTaPOdibteeibJMMmbwc29aJlDOmUicibIRoLdcuEQjtHQ2qjVtZBt0M5eVbYoQzlHiaw/640?wx_fmt=gif "")  
  
   
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
**Moxa 发布安全更新，修复了PT 交换机中的一个严重漏洞CVE-2024-12297，它可导致攻击者绕过认证机制。**  
  
该漏洞的CVSS v4 评分为9.2。该公司在上周发布的一份安全公告中提到，“多款 Moxa PT 交换机易受认证机制中一个认证绕过漏洞影响”，“尽管存在客户端和后端服务器验证机制，但攻击者可利用其实现中的弱点。该漏洞可能导致暴力攻击以猜测有效凭据或MD5碰撞攻击，伪造认证哈希，从而可能攻陷设备安全性”。  
  
换句话说，成功利用该漏洞可导致认证绕过，并使攻击者获得对敏感配置的越权访问或破坏多种服务。该漏洞影响如下版本：  
  
- PT-508 系列（固件版本3.8及更早版本）  
  
- PT-510 系列（固件版本3.8及更早版本）  
  
- PT-7528 系列（固件版本5.0及更早版本）  
  
- PT-7728 系列（固件版本3.9及更早版本）  
  
- PT-7828 系列（固件版本4.0及更早版本）  
  
- PT-G503 系列（固件版本5.3及更早版本）  
  
- PT-G510 Series系列（固件版本6.5及更早版本）  
  
- PT-G7728 系列（固件版本6.5及更早版本）以及  
  
- PT-G7828 系列（固件版本6.5及更早版本）  
  
  
  
用户可联系 Moxa 技术支持此团队获取漏洞补丁。该漏洞由莫斯科RASU公司的研究员 Artem Turyshev 发现并报送。除了应用最新修复方案外，建议使用受影响产品的企业限制使用防火墙或访问控制列表的网络访问，执行网络分段，将在互联网的直接暴露降至最小，为访问关键系统执行多因素认证机制，启用事件日志并监控网络流量和设备行为中的异常活动。值得注意的是，Moxa 已在2025年1月中旬在运行固件版本3.11及更早的 Ethernet交换机 EDS-508A 系列中修复了该漏洞。  
  
两个多月前，Moxa 发布影响其蜂窝路由器、安全路由器和网络安全设备中的两个漏洞CVE-2024-9138和CVE-2024-9140，它们可导致提权和命令执行后果。上个月，该公司还修复了影响多款交换机的多个高危漏洞（CVE-2024-7695、CVE-2024-9404和CVE-2024-9137），它们可导致拒绝服务攻击或命令执行后果。  
  
  
  
代码卫士试用地址：  
https://codesafe.qianxin.com  
  
开源卫士试用地址：https://oss.qianxin.com  
  
  
  
  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[Moxa 设备严重漏洞将工业网络暴露在攻击中](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247521996&idx=2&sn=dbafe74fa2a73a7ecd72c5ca600d8614&scene=21#wechat_redirect)  
  
  
[台商 Moxa 网络设备被曝多个漏洞，导致工业环境易受攻击](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247492357&idx=2&sn=0d537358b33dda855b617e0308f53c5c&scene=21#wechat_redirect)  
  
  
[Moxa IIoT 产品有缺陷 导致 ICS 易受远程攻击](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247489104&idx=4&sn=763f93957651f81be1c109d3a13ec6d0&scene=21#wechat_redirect)  
  
  
[Moxa 路由器中存在多个严重漏洞易遭攻击](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247486898&idx=1&sn=841b60f17f7d5bea481367d80908835e&scene=21#wechat_redirect)  
  
  
  
  
  
**原文链接**  
  
https://thehackernews.com/2025/03/moxa-issues-fix-for-critical.html  
  
  
  
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
