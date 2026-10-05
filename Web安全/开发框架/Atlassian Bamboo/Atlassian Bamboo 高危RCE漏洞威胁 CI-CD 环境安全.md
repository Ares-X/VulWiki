---
source: "gelusus/wxvl 公众号漏洞文库"
product: "Bamboo Data Center"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "CVE-2026-21570"
referenced_identifiers: ""
identifier_role: "primary"
identifier_status: "unknown"
title: "Atlassian Bamboo 高危RCE漏洞威胁 CI-CD 环境安全"
prerequisites: "来源所述条件，未列明部分仍待核：Introduced9.6,10.0/10.1/10.2,11.0/11.1,12.0/12.1; fixes9.6.24,10.2.16,12.1.3; authenticated"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-c60a9fd8a914f0eb191489a2"
entity_id: "ve-c60a9fd8a914f0eb191489a2"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：Introduced9.6,10.0/10.1/10.2,11.0/11.1,12.0/12.1; fixes9.6.24,10.2.16,12.1.3; authenticated

代码与实验材料：No PoC or exploit mechanism; minimum-fix table retained

来源证据范围：SecurityOnline link; vendor advisory not linked

- **结论使用边界（1）**：Introduced release labels are not full affected ranges; migration destinations for other branches unclear。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **来源与引用处置（2）**：HTML presentation noise and unrelated links; add primary CVE metadata。保留这部分来源材料并与技术结论分开；其引用或宣传内容不能补足本文漏洞的证据。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

#  Atlassian Bamboo 高危RCE漏洞威胁 CI/CD 环境安全  
Ddos
                    Ddos  代码卫士   2026-03-20 10:08  
  
![](../../.resource/remote/afc2fa5611a63e89ebec625ecc33d28c5dcdb706b6fbdabb79f7c1e8982068c0.gif "")  
    
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
**Atlassian 提醒其 Bamboo Data Center 用户注意一个高危远程代码执行漏洞CVE-2026-21570（CVSS评分8.6），可导致攻击者夺取对开发环境的控制权。该漏洞凸显了对大型企业持续集成和部署流水线的重大风险。**  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
作为众多软件开发生命周期的基石，Bamboo 一旦遭入侵，可能导致恶意代码被注入下游软件产品，因此安装此补丁成为 IT 安全团队的首要任务。该漏洞可导致已获得系统认证访问权限的攻击者通过执行任意代码来升级其影响。尽管需要认证设置了一定的门槛，但其对系统机密性、完整性和可用性具有"高"度影响的潜力，使其成为一个严重问题。  
  
该漏洞有效地绕过了标准的安全边界，使恶意行为者能够直接与远程系统的底层架构进行交互。该漏洞影响范围相当广泛，波及Data Center 产品的多个主要发布周期。安全公告提到，该漏洞被引入以下版本：  
  
- 9.6.0  
  
- 10.0.0、10.1.0、10.2.0  
  
- 11.0.0、11.1.0  
  
- 12.0.0 和 12.1.0  
  
  
  
Atlassian 强烈建议所有 Bamboo Data Center 客户立即迁移到最新的可用版本。对于因故只能使用特定发布分支的组织，已指定以下最低修复版本：  
<table><tbody><tr><td data-colwidth="277" width="277" valign="top" style="border: 1px solid windowtext;padding:5px 10px;"><p style="text-align:left;margin-bottom: 15px;display: block;margin-left: 5px;margin-right: 5px;text-indent: 0em;"><span style="font-size: 15px;letter-spacing: 1px;"><strong><span leaf="">分支</span></strong></span></p></td><td data-colwidth="277" width="277" valign="top" style="border-top: 1px solid windowtext;border-right: 1px solid windowtext;border-bottom: 1px solid windowtext;border-image: initial;border-left: none;padding:5px 10px;"><p style="text-align:left;margin-bottom: 15px;display: block;margin-left: 5px;margin-right: 5px;text-indent: 0em;"><span style="font-size: 15px;letter-spacing: 1px;"><strong><span leaf="">所需升级版本</span></strong></span></p></td></tr><tr><td data-colwidth="277" width="277" valign="top" style="border-right: 1px solid windowtext;border-bottom: 1px solid windowtext;border-left: 1px solid windowtext;border-image: initial;border-top: none;padding:5px 10px;"><p style="text-align:left;margin-bottom: 15px;display: block;margin-left: 5px;margin-right: 5px;text-indent: 0em;"><span style="font-size: 15px;letter-spacing: 1px;"><span leaf="">9.6</span></span></p></td><td data-colwidth="277" width="277" valign="top" style="border-top: none;border-left: none;border-bottom: 1px solid windowtext;border-right: 1px solid windowtext;padding:5px 10px;"><p style="text-align:left;margin-bottom: 15px;display: block;margin-left: 5px;margin-right: 5px;text-indent: 0em;"><span style="font-size: 15px;letter-spacing: 1px;"><span leaf="">9.6.24 或更高版本</span></span></p></td></tr><tr><td data-colwidth="277" width="277" valign="top" style="border-right: 1px solid windowtext;border-bottom: 1px solid windowtext;border-left: 1px solid windowtext;border-image: initial;border-top: none;padding:5px 10px;"><p style="text-align:left;margin-bottom: 15px;display: block;margin-left: 5px;margin-right: 5px;text-indent: 0em;"><span style="font-size: 15px;letter-spacing: 1px;"><span leaf="">10.2</span></span></p></td><td data-colwidth="277" width="277" valign="top" style="border-top: none;border-left: none;border-bottom: 1px solid windowtext;border-right: 1px solid windowtext;padding:5px 10px;"><p style="text-align:left;margin-bottom: 15px;display: block;margin-left: 5px;margin-right: 5px;text-indent: 0em;"><span style="font-size: 15px;letter-spacing: 1px;"><span leaf="">10.2.16 或更高版本</span></span></p></td></tr><tr><td data-colwidth="277" width="277" valign="top" style="border-right: 1px solid windowtext;border-bottom: 1px solid windowtext;border-left: 1px solid windowtext;border-image: initial;border-top: none;padding:5px 10px;"><p style="text-align:left;margin-bottom: 15px;display: block;margin-left: 5px;margin-right: 5px;text-indent: 0em;"><span style="font-size: 15px;letter-spacing: 1px;"><span leaf="">12.1</span></span></p></td><td data-colwidth="277" width="277" valign="top" style="border-top: none;border-left: none;border-bottom: 1px solid windowtext;border-right: 1px solid windowtext;padding:5px 10px;"><p style="text-align:left;margin-bottom: 15px;display: block;margin-left: 5px;margin-right: 5px;text-indent: 0em;"><span style="font-size: 15px;letter-spacing: 1px;"><span leaf="">12.1.3 或更高版本</span></span></p></td></tr></tbody></table>  
  
 开源  
卫士试用地址：  
https://oss.qianxin.com/#/login  
  
  
 代码卫士试用地址：https://sast.qianxin.com/#/login  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[Atlassian 和思科修复多个高危漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247522791&idx=2&sn=841f61a29df71610844f2e021c5c9bab&scene=21#wechat_redirect)  
  
  
[Atlassian 修复Confluence 和 Crowd 中的多个严重漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247522309&idx=2&sn=75d35854eb171a70fb22bd76ed1b2cf4&scene=21#wechat_redirect)  
  
  
[Atlassian Bamboo Data Center and Server中存在RCE漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247520541&idx=1&sn=f403f1139228e0543f485dc49192281e&scene=21#wechat_redirect)  
  
  
[Atlassian 修复Confluence等产品中的多个高危漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247520092&idx=2&sn=cc02ff9f6ef98e6d539f13b4c6c892c2&scene=21#wechat_redirect)  
  
  
[Atlassian Confluence 高危漏洞可导致代码执行](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247519665&idx=2&sn=86259d3f96b173403f1a65b601fc1989&scene=21#wechat_redirect)  
  
  
  
  
  
**原文链接**  
  
https://securityonline.info/high-severity-rce-flaw-atlassian-bamboo-data-center-cve-2026-21570/  
  
  
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
