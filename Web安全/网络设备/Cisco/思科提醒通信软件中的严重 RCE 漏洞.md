---
source: "gelusus/wxvl 公众号漏洞文库"
id: "vw-9d8fe914fc9e96b335ecdb3d"
entity_id: "ve-9d8fe914fc9e96b335ecdb3d"
schema_version: "1"
title: "思科提醒注意通信软件中的严重 RCE 漏洞"
product: "Cisco Unified Communications / Contact Center系列"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "primary"
primary_identifiers: "CVE-2024-20253"
referenced_identifiers: ""
prerequisites: "未认证监听服务、默认配置；多产品12.5/14等修复包"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/Cisco/%E6%80%9D%E7%A7%91%E6%8F%90%E9%86%92%E9%80%9A%E4%BF%A1%E8%BD%AF%E4%BB%B6%E4%B8%AD%E7%9A%84%E4%B8%A5%E9%87%8D%20RCE%20%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_status: "unknown"
---

#  思科提醒注意通信软件中的严重 RCE 漏洞   

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Cisco Unified Communications / Contact Center系列
- 本文讨论：CVE-2024-20253
- 版本、权限与配置前提：未认证监听服务、默认配置；多产品12.5/14等修复包
- 资料类型：多产品单漏洞通告；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 影响段Unified CM SME，修复段误写Unified CME，两者不同产品
- 影响清单含Unity Connection，但修复清单缺对应项
- 根因仅模糊内存处理，补丁名却为Java反序列化，需要准确定义
- 无厂商直链；无workaround与ACL减缓风险术语需区分

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- 根因、Unity补丁和版本矩阵待核验
- 引用图片未查看，截图内容及有效性待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->

Bill Toulas  代码卫士   2024-01-26 18:45  
  
![](../../.resource/remote/afc2fa5611a63e89ebec625ecc33d28c5dcdb706b6fbdabb79f7c1e8982068c0.gif "")  
  
   
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
**思科提醒称，多款 Unified Communications Manager (CM) 和 Contact Center Solutions 产品易受严重的远程代码执行漏洞 (CVE-2024-20253) 影响。**  
  
  
思科 Unified Communications 和 Contact Center Solutions 是一体化解决方案，提供企业级语音、视频和消息服务以及客户参与和管理。该公司已发布安全公告提醒注意该漏洞，它可导致未认证的远程攻击者在受影响设备上执行任意代码。  
  
该漏洞由 Synacktiv 公司的研究员 Julien Egloff 发现，CVSS 评分为9.9分，是由不正确地将用户提供的数据读取处理到内存导致的。攻击者可向监听端口发送特殊构造的信息，可能以 web 服务用户的权限获得执行任意命令的能力并建立root 访问权限。  
  
该漏洞影响默认配置下的如下思科产品：  
  
- Packaged Contact Center Enterprise (PCCE) 12.0 及更早版本， 12.5(1) 和12.5(2)。  
  
- Unified Communications Manager (Unified CM) 版本11.5、12.5(1) 和14（Unified CM SME，同）。  
  
- Unified Communications Manager IM & Presence Service (Unified CM IM&P) 版本11.5(1)、12.5(1) 和14。  
  
- Unified Contact Center Enterprise (UCCE) 12.0 及更早版本，12.5(1) 和 12.5(2)。  
  
- Unified Contact Center Express (UCCX) 12.0 及更早版本和12.5(1)。  
  
- Unity Connection versions 11.5(1)、12.5(1) 和14。  
  
- Virtualized Voice Browser (VVB) 12.0及更早版本，12.5(1) 和12.5(2)。  
  
  
  
思科表示目前不存在应变措施，推荐应用可用的安全更新。如下发布修复了这个严重的远程代码执行漏洞：  
  
- PCCE: 12.5(1) 和12.5(2) 应用补丁ucos.v1_java_deserial-CSCwd64245.cop.sgn。  
  
- Unified CM和Unified CME：12.5(1)SU8 或 ciscocm.v1_java_deserial-CSCwd64245.cop.sha512. 14SU3 或 ciscocm.v1_java_deserial-CSCwd64245.cop.sha512。  
  
- Unified CM IM&P: 12.5(1)SU8 或 ciscocm.cup-CSCwd64276_JavaDeserialization.cop.sha512. 14SU3 或 ciscocm.cup-CSCwd64276_JavaDeserialization.cop.sha512。  
  
- UCCE: 为12.5(1) 和 12.5(2) 应用补丁ucos.v1_java_deserial-CSCwd64245.cop.sgn。  
  
- UCCX: 为12.5(1) 应用补丁ucos.v1_java_deserial-CSCwd64245.cop.sgn。  
  
- VVB:为 12.5(1) 和12.5(2) 应用补丁ucos.v1_java_deserial-CSCwd64245.cop.sgn。  
  
  
  
思科建议管理员如无法利用更新，则设置访问控制列表 (ACLs) 作为缓解措施。具体而言，建议用户在中间设备上执行ACLs，将Cisco Unified Communications 或 Cisco Contact Center Solutions 集群与用户和其它网络分隔开。必须将ACLs 配置为仅允许访问所部署服务的端口，从而控制能够触及受影响组件的流量。  
  
在部署任何缓解措施之前，管理员应当评估它们的可用性以及对环境的潜在影响，并在受控空间进行测试，确保业务运营不受影响。思科表示并未发现该漏洞遭公开或被恶意利用的证据。  
  
  
****  
  
代码卫士试用地址：  
https://codesafe.qianxin.com  
  
开源卫士试用地址：https://oss.qianxin.com  
  
  
  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[思科称严重的 Unity Connection 漏洞可导致攻击者获得root权限](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247518649&idx=1&sn=21ff8ab835664822aef75af18b5178a8&chksm=ea94b8d3dde331c5c49a02303ecda17deb3b8897d8bee8be24590ef862f6d2be63c6f37b66cd&scene=21#wechat_redirect)  
  
  
[思科新0day 被用于在数千台设备上植入恶意后门 Lua](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247517960&idx=1&sn=a77de274fb21796ddac20805028ec8b0&chksm=ea94b662dde33f74645e70725b4ffb565280e526d7c94ee2cbd1c5177a6c3330dc1b383922b3&scene=21#wechat_redirect)  
  
  
[思科披露称严重的 IOS XE 认证绕过0day已遭利用](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247517910&idx=1&sn=8fb7babd282149838a933250b863edc8&chksm=ea94b7bcdde33eaa96070746c3597032b223e499e281eb14ab47149dc366af11b935031b6706&scene=21#wechat_redirect)  
  
  
[思科紧急修复 Emergency Responder 系统中的严重漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247517792&idx=1&sn=2597cf0fcd5b0d3561468663bbc2c62b&chksm=ea94b70adde33e1c4078d399916095b0e03ac6c5af4add39de2897fa077d31d2f2792e844d2e&scene=21#wechat_redirect)  
  
  
  
  
**原文链接**  
  
https://www.bleepingcomputer.com/news/security/cisco-warns-of-critical-rce-flaw-in-communications-software/  
  
  
题图：  
Pexels  
 License  
  
****  
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
