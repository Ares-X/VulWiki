---
cve: "CVE-2023-5009"
source: "gelusus/wxvl 公众号漏洞文库"
product: "GitLab EE"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "CVE-2023-5009"
referenced_identifiers: "CVE-2023-3932"
identifier_role: "primary"
identifier_status: "unknown"
version: "13.12 <= GitLab EE < 16.2.7; 16.3 <= GitLab EE < 16.3.4"
title: "GitLab存在高严重性漏洞，建议立即更新版本"
prerequisites: "来源所述条件，未列明部分仍待核：EE13.12–<16.2.7,16.3–<16.3.4; Directtransfers andSecuritypolicies enabled"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-975c6818a2a37ef605f8e474"
entity_id: "ve-975c6818a2a37ef605f8e474"
schema_version: "1"
---

## 核对与使用边界

- 明确更正：16.2.7 与 16.3.4 是两条发布分支的安全版本，不能分别解释为 EE 与 CE 的专属版本。官方 CVE-2023-5009 描述受影响为 GitLab EE，13.12 ≤ v &lt; 16.2.7 及 16.3 ≤ v &lt; 16.3.4。
- 适用条件：Direct transfers 与 Security policies 同时开启；这是经权限条件约束的流水线身份问题。当前官方历史公告评分为 8.2/PR:L，原文 9.6 为来源差异，不作为本次确认；不能由此称任意匿名用户直接控制主机。

核对来源：[GitLab 官方安全发布](https://docs.gitlab.com/releases/patches/patch-release-gitlab-16-3-4-released/)

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：EE13.12–&lt;16.2.7,16.3–&lt;16.3.4; Directtransfers andSecuritypolicies enabled

代码与实验材料：No PoC; clearfeatureconjunction; privilege/codeexecution consequence not demonstrated

来源证据范围：GitLab/X named without exact URLs; researcher credited

- **结论使用边界（1）**：SaysCE16.3.4 versusEE16.2.7 asedition-specificfixes although affectedEE andbranches, conflatingedition/release。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **适用与权限边界（2）**：Authentication-bypass label may obscure authenticated authorization context; source links absent。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

#  GitLab存在高严重性漏洞，建议立即更新版本   
看雪学苑  看雪学苑   2023-09-22 18:05  
  
本周，GitLab发布了一个重要的安全补丁，以修复一个严重身份认证绕过漏洞（CVE-2023-5009，CVSS 分数：9.6）。  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/1UG7KPNHN8FJ3BiblV2gIwVD82qUo5OkL5bgGHcYV75uldibvspbSu7wsgqQuia4jlCcyAsGlg7ibib0DRk1vPZdyEQ/640?wx_fmt=png "")  
  
  
  
GitLab安全公告中写道：“发现了一个影响GitLab EE（从13.12版本开始到16.2.7之前的所有版本，以及从16.3版本开始到16.3.4之前的所有版本）的问题。攻击者能够通过计划的安全扫描策略以任意用户身份运行流水线。这是对CVE-2023-3932的绕过，显示出额外的影响。这是一个critical级别的高严重性问题。”  
  
  
据了解，攻击者可以利用此漏洞访问敏感信息，或使用所冒充用户的提升权限来访问或修改源代码，或在系统上运行任意代码。  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/1UG7KPNHN8FJ3BiblV2gIwVD82qUo5OkL98SpSkPeGwpx2LP1pYA1cRgVpp9kYxrGh85hVM6I0uvbHtvAUINLaA/640?wx_fmt=png "")  
  
  
该漏洞由安全研究员Johan Carlsson通过GitLab HackerOne漏洞赏金计划报告。GitLab为此发布了Community Edition（社区版）的16.3.4版本和Enterprise Edition（企业版）的16.2.7版本以修复此漏洞。  
  
  
GitLab.com目前已在运行修补版本。为降低此漏洞的风险，GitLab强烈建议所有用户立即升级到GitLab社区版（CE）和企业版（EE）的最新版本。对于不便升级的情况，为缓解漏洞影响，用户需要禁用“Direct transfers”和“Security policies”其中至少一个功能。假如同时启用了这两个功能，则会处于易受攻击状态。  
  
  
  
  
编辑：左右里  
  
资讯来源：gitlab、X  
  
转载请注明出处和本文链接  
  
  
**每日涨知识**  
  
误报            
  
也称为无效告警，通常指告警错误，即把合法行为判断成非法行为而产生了告警。  
目前，由于攻击技术的快速进步和检测技术的限制，误报的数量非常大，使得安全人员  
不得不花费大量时间来处理此类告警，已经成为困扰并拉低日常安全处置效率的主要原因。  
  
  
﹀  
  
﹀  
  
﹀  
  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/Uia4617poZXP96fGaMPXib13V1bJ52yHq9ycD9Zv3WhiaRb2rKV6wghrNa4VyFR2wibBVNfZt3M5IuUiauQGHvxhQrA/640?wx_fmt=jpeg "")  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_gif/1UG7KPNHN8E9S6vNnUMRCOictT4PicNGMgHmsIkOvEno4oPVWrhwQCWNRTquZGs2ZLYic8IJTJBjxhWVoCa47V9Rw/640?wx_fmt=gif "")  
  
**球分享**  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_gif/1UG7KPNHN8E9S6vNnUMRCOictT4PicNGMgHmsIkOvEno4oPVWrhwQCWNRTquZGs2ZLYic8IJTJBjxhWVoCa47V9Rw/640?wx_fmt=gif "")  
  
**球点赞**  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_gif/1UG7KPNHN8E9S6vNnUMRCOictT4PicNGMgHmsIkOvEno4oPVWrhwQCWNRTquZGs2ZLYic8IJTJBjxhWVoCa47V9Rw/640?wx_fmt=gif "")  
  
**球在看**  
  
****  
****  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/1UG7KPNHN8FxuBNT7e2ZEfQZgBuH2GkFjvK4tzErD5Q56kwaEL0N099icLfx1ZvVvqzcRG3oMtIXqUz5T9HYKicA/640?wx_fmt=gif "")  
  
戳  
“阅读原文  
”  
一起来充电吧！  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
