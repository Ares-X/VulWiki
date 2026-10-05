---
source: "gelusus/wxvl 公众号漏洞文库"
product: "应主归Undertow/WildFly-JBoss依赖关联"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "CVE-2025-12543"
referenced_identifiers: ""
identifier_role: "primary"
identifier_status: "unknown"
title: "Java Apps 严重漏洞可用于劫持会话"
prerequisites: "来源所述条件，未列明部分仍待核：只写JBoss EAP8.1及相关包，未给Undertow影响/固定版本；需恶意Host进入相关应用流程及有限用户交互"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-3de5094930b59cc3415a6d2c"
entity_id: "ve-3de5094930b59cc3415a6d2c"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：只写JBoss EAP8.1及相关包，未给Undertow影响/固定版本；需恶意Host进入相关应用流程及有限用户交互

代码与实验材料：无PoC，仅概括Host校验与会话/缓存/内网后果，未提供完整利用链

来源证据范围：SecurityOnline译文；RHSA编号可追溯但没有直接官方链接

- **事实待核（1）**：过泛标题及范围缺失；依据：Java Apps标题像全Java问题，实际Undertow；两个RHSA涉及哪些包和修复构建未映射。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **凭据与会话边界（2）**：评分和下游影响来源需分层；依据：CVSS9.6与RedHat重要评级并存无评分版本/向量；会话劫持/内部扫描需要具体应用行为，不应一概必然。抓包中的会话不能视为未认证访问证明。需重新取得授权测试会话，不能复用文中值。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

#  Java Apps 严重漏洞可用于劫持会话  
Ddos  代码卫士   2026-01-12 10:20  
  
![](../../.resource/remote/afc2fa5611a63e89ebec625ecc33d28c5dcdb706b6fbdabb79f7c1e8982068c0.gif "")  
    
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
****  
**Java应用程序如 WildFly 和 JBoss EAP 等中广为使用的组件 Undertow HTTP 服务器内核中存在一个严重漏洞CVE-2025-12543（CVSS评分9.6），可导致攻击者劫持用户会话并攻陷内部系统。**  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
该漏洞存在于 Undertow 在进站请求中处理 HTTP Host 标头的方式中。该库未能正确验证这些标头，可导致恶意 Host 标头顺利通过。该弱点可带来多个攻击向量，如缓存投毒、内部网络扫描和会话劫持等。  
  
Red Hat 将该漏洞评级为“重要”级别，因为它可导致攻击者无需身份验证就远程利用，不过利用该漏洞仍然需要有限的用户交互。成功利用该漏洞可导致攻击者窃取用户凭据、劫持更多账户或者获得对内部系统的越权访问权限。  
  
该漏洞严重影响受影响系统的机密性和完整性，如Red Hat Jboss 企业应用平台8.1版本和多个程序包相关组件包括 eap8-undertow、eap8-wildfly和其它相关库等。Red Hat 已发布补丁修复该漏洞。组织机构应当立即应用2026年1月8日发布的更新，相关安全公告为 RHSA-2026:0386和RHSA-2026:0383。目前尚不存在满足 Red Hat 关于易用性和稳定性安全标准的缓解措施，因此用户应立即应用所推荐的补丁。  
  
  
 开源  
卫士试用地址：  
https://oss.qianxin.com/#/login  
  
  
 代码卫士试用地址：https://sast.qianxin.com/#/login  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[热门JavaScript 加密库 Forge 修复签名验证绕过漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247524529&idx=2&sn=f430edc811448de4be9a55cfb12448d5&scene=21#wechat_redirect)  
  
  
[JavaScript 热门库 expr-eval 易受 RCE 攻击](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247524359&idx=3&sn=dca660000a6936def1900d3d5cf13519&scene=21#wechat_redirect)  
  
  
[Apache Parquet Java 中存在CVSS满分漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247522648&idx=1&sn=8642efdcfe877619e821e6fa74e779b7&scene=21#wechat_redirect)  
  
  
[Apache Avro SDK 中存在严重漏洞，可导致在 Java 应用中实现RCE](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247520994&idx=1&sn=0feb249fd14e6b8b07d5d6531f3287c2&scene=21#wechat_redirect)  
  
  
  
  
  
**原文链接**  
  
https://securityonline.info/the-9-6-crack-in-javas-foundation-critical-undertow-flaw-cve-2025-12543/  
  
  
题图：Pixa  
bay Licens  
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
