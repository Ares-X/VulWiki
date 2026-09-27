---
cve: "CVE-2023-5009"
source: "gelusus/wxvl 公众号漏洞文库"
---

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
