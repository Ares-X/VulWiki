---
source: "gelusus/wxvl 公众号漏洞文库"
id: "vw-f49b526f0b37d6d0df011ae6"
entity_id: "ve-f49b526f0b37d6d0df011ae6"
schema_version: "1"
title: "Ivanti 紧急修复暴露敏感数据的严重 Xtraction 漏洞"
product: "Ivanti Xtraction"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "primary"
primary_identifiers: "CVE-2026-8043"
referenced_identifiers: ""
prerequisites: "远程已认证；≤2026.1，2026.2修复；读文件与写HTML"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/Ivanti/%E6%9A%B4%E9%9C%B2%E6%95%8F%E6%84%9F%E6%95%B0%E6%8D%AE%E7%9A%84%E4%B8%A5%E9%87%8D%20Xtraction.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_status: "unknown"
---

#  Ivanti 紧急修复暴露敏感数据的严重 Xtraction 漏洞  

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Ivanti Xtraction
- 本文讨论：CVE-2026-8043
- 版本、权限与配置前提：远程已认证；≤2026.1，2026.2修复；读文件与写HTML
- 资料类型：新闻通告；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- Xtraction商业报告平台按厂商误归网络设备
- 无官方公告直链/具体接口权限；写HTML是客户端攻击风险，不应泛化为服务器RCE

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- 版本/角色、文件读写范围待核验
- 引用图片未查看，截图内容及有效性待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->

DDoS
                    DDoS  代码卫士   2026-05-14 04:04  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Az5ZsrEic9ot90z9etZLlU7OTaPOdibteeibJMMmbwc29aJlDOmUicibIRoLdcuEQjtHQ2qjVtZBt0M5eVbYoQzlHiaw/640?wx_fmt=gif "")  
    
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
**Ivanti****发布关于 Xtraction 平台的紧急更新，修复了一个严重漏洞CVE-2026-8043（CVSS评分9.6），可导致严重的数据暴露以及恶意客户端攻击。该漏洞影响2026.1及之前版本，已在2026.2版本中修复。**  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
该漏洞的根因在于 Ivanti Xtraction 应用中的“文件名称的外部控制”，与CWE-22和CWE-73有关，可导致恶意人员绕过标准文件和目录限制。攻击者必须经过远程身份认证才能利用该漏洞，如成功则可获得危险的双重能力：  
  
- 攻击者可读取系统内的高度敏感文件，导致重大信息泄露；  
  
- 直接将任意HTML 文件写入 Web 目录，将用户服务器武器化，对其它不知情用户发动客户端攻击。  
  
  
  
该漏洞影响未安装最新安全补丁的旧版和当前部署。虽然官方披露时声称“未发现客户被利用”，但补丁公开后，威胁行动者通常会迅速逆向分析并攻击未修复的系统。官方修复方案已发布，建议立即升级。  
  
  
  
 开源  
卫士试用地址：  
https://oss.qianxin.com/#/login  
  
 代码卫士试用地址：https://sast.qianxin.com/#/login  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[Ivanti 提醒注意已遭利用的 EPMM 高危漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247525953&idx=1&sn=40c610f460f60706c41341497c18c035&scene=21#wechat_redirect)  
  
  
[CISA：须在周日前修复已遭利用的 Ivanti EPMM 漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247525686&idx=2&sn=a7cb71292f83e55b49f1e23a7f775864&scene=21#wechat_redirect)  
  
  
[Ivanti Endpoint 管理器漏洞可导致远程攻击者泄露任意数据](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247525108&idx=2&sn=eb3ace41d769ee7dcd8d459a227040f3&scene=21#wechat_redirect)  
  
  
[Ivanti 提醒注意已遭利用的两个 EPMM 漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247525028&idx=2&sn=762ebd580b93c85ca6f361c47033a215&scene=21#wechat_redirect)  
  
  
[Ivanti提醒注意 EPM 中严重的代码执行漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247524630&idx=1&sn=f3a9316989486371722d9656c43f333e&scene=21#wechat_redirect)  
  
  
  
  
  
**原文链接**  
  
https://securityonline.info/ivanti-xtraction-vulnerability-cve-2026-8043-critical-flaw/  
  
  
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
