---
source: "gelusus/wxvl 公众号漏洞文库"
id: "vw-4bea493f62edc36064b73299"
entity_id: "ve-4bea493f62edc36064b73299"
schema_version: "1"
title: "Check Point 紧急修复已遭利用的 Management Server 0day"
product: "Check Point Management / Log Server / SmartEvent"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "primary"
primary_identifiers: "CVE-2026-93616"
referenced_identifiers: "CVE-2024-24919; CVE-2026-50751; CVE-2026-16232; CVE-2026-85102; CVE-2026-85103"
prerequisites: "未认证路径遍历上传执行；仅说R82.20安全热修复，未列完整受影响范围"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/Check%20Point/%E5%B7%B2%E9%81%AD%E5%88%A9%E7%94%A8%E7%9A%84%20Management%20Server%200day.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_status: "unknown"
---

#  Check Point 紧急修复已遭利用的 Management Server 0day  

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Check Point Management / Log Server / SmartEvent
- 本文讨论：CVE-2026-93616
- 版本、权限与配置前提：未认证路径遍历上传执行；仅说R82.20安全热修复，未列完整受影响范围
- 资料类型：新闻通告；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 同文先称CVE-2026-16232从7月已在野利用，后称上周五修复且尚未标记活跃利用，自相矛盾
- 结尾CVE-2026-16232+Username too long日志疑似误引CVE-2026-91843，与相邻独立通告对不上
- 没有直接官方通告及热修复构建号；网页营销噪声

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- 主漏洞版本及引用编号冲突待官方核验
- 引用图片未查看，截图内容及有效性待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->

Sergiu Gatlan
                    Sergiu Gatlan  代码卫士   2026-09-23 05:53  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Az5ZsrEic9ot90z9etZLlU7OTaPOdibteeibJMMmbwc29aJlDOmUicibIRoLdcuEQjtHQ2qjVtZBt0M5eVbYoQzlHiaw/640?wx_fmt=gif "")  
    
聚焦源代码安全，网罗国内外最新资讯！  
  
编译：代码卫士  
  
**Check Point****软件公司发布紧急热修复程序，修复了一个严重的安全管理服务器漏洞****(CVE-2026-93616)****，可导致攻击者运行任意脚本。**  
  
安全管理服务器是一个中央存储库，用于存储和管理安全策略、处理管理员更改，并收集企业网络中的系统日志。该路径遍历漏洞可导致未经身份验证的威胁行动者在易受攻击的  
 Check Point   
管理服务器上上传任意脚本，并在低复杂度攻击中执行这些脚本。  
  
自  
 2024   
年  
 5   
月以来，美国网络安全和基础设施安全局  
 (CISA)   
和联邦调查局  
 (FBI)   
就一直敦促软件公司在发布产品前消除路径遍历弱点，称此类安全问题  
“  
至少自  
 2007   
年以来就被称为  
‘  
不可原谅  
’”  
。  
  
Check Point   
公司已在  
 R82.20   
安全热修复方案中修复该漏洞，并表示受影响产品的完整列表包括安全管理服务器、多域安全管理服务器、日志服务器、多域日志服务器和  
 SmartEvent  
。  
  
该公司在安全公告中提到，“该漏洞正遭在野利用，  
Check Point   
已知有少数客户遭到攻击。”该公司同时建议安全团队使用安全公告中共享的入侵指标检查网络，寻找成功利用的证据。  
  
Check Point   
还为无法立即在易受攻击系统上部署热修复程序的客户提供临时缓解措施，包括将易受攻击系统置于防火墙之后，并在  
 SmartConsole   
仪表板的  
“  
管理  
 &   
设置  
 >   
权限  
 &   
管理员  
 >   
受信任客户端  
”  
中限制只有受信任  
 IP   
地址可以访问，从而加固这些系统以抵御攻击。  
  
近几个月，  
Check Point   
还提醒客户注意正遭在野活跃利用的漏洞。两年前，  
CISA   
将  
 Check Point Quantum   
安全网关中的一个漏洞  
 (CVE-2024-24919)   
标记为已被勒索软件团伙积极利用，并证实了  
 Orange Cyberdefense CERT  
将这些攻击与  
 NailaoLocker   
勒索软件关联起来的一份报告。  
  
Qilin   
勒索软件附属组织自  
 6   
月以来还利用了身份验证绕过漏洞  
 (CVE-2026-50751) 0day  
漏洞，而第二个身份验证绕过  
 0day   
漏洞  
 (CVE-2026-16232)  
至少自  
 7   
月以来一直被利用，以管理员权限对  
 SmartConsole   
管理面板进行身份验证。  
  
两周前，荷兰国家网络安全中心  
 (NCSC-NL)   
也提醒各组织机构紧急修复两个严重的  
 Check Point VPN   
漏洞（  
CVE-2026-85102   
和  
 CVE-2026-85103  
），因为该中心  
“  
预计利用尝试很快就会发生  
”  
。  
  
上周五，  
Check Point   
公司发布安全更新，修复安全管理服务器和安全网关登录过程中的另一个严重身份验证绕过漏洞  
 (CVE-2026-16232)  
，它可导致攻击者在管理系统上以  
 root   
权限执行代码。  
  
虽然该公司尚未将  
 CVE-2026-16232   
标记为正在遭活跃利用，但认为安全团队可以通过在审计和管理员登录日志中查找  
“Administrator failed to log in: Username too long  
（管理员登录失败：用户名太长）  
”  
警报来识别攻击。  
  
  
代码卫士试用地址：https://sast.qianxin.com/  
  
开源卫士试用地址：https://oss.qianxin.com/  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[Check Point 紧急修复严重漏洞，可使远程未认证攻击者获得 root 权限](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247527165&idx=1&sn=065c0d69dff53c546fce09eee69ae140&scene=21#wechat_redirect)  
  
  
[Check Point 提醒注意两个严重的未认证 RCE 漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247527106&idx=1&sn=bbf5299ba4eef963c2c55d28c8620961&scene=21#wechat_redirect)  
  
  
[攻击者利用 Check Point VPN 访问企业网络](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247519614&idx=2&sn=61729da3c7c16514ae5bdae557f4e001&scene=21#wechat_redirect)  
  
  
[思科：ISE 认证绕过满分 0day 已遭活跃利用](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247527173&idx=1&sn=1ae52540af18bbb2b176b85380e718cc&scene=21#wechat_redirect)  
  
  
[GeoServer 0day 已遭利用，可导致RCE](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247526875&idx=1&sn=a17a7b733568d42551bc0237a295999e&scene=21#wechat_redirect)  
  
  
  
  
  
**原文链接**  
  
**https://www.bleepingcomputer.com/news/security/check-point-patches-management-server-zero-day-exploited-in-attacks/**  
  
  
题图：Pixa  
b  
ay Licens  
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
”   
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
