---
source: "gelusus/wxvl 公众号漏洞文库"
product: "GitLab WebIDE XSS"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "CVE-2024-4835"
referenced_identifiers: "CVE-2023-7045; CVE-2024-2874; CVE-2023-7028"
identifier_role: "primary"
identifier_status: "unknown"
title: "GitLab 高危漏洞可导致账号遭接管"
prerequisites: "来源所述条件，未列明部分仍待核：Fix17.0.2/16.11.3/16.10.6, affected starts absent; victim interaction needed"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-1a210aeb07f175900e37a605"
entity_id: "ve-1a210aeb07f175900e37a605"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：Fix17.0.2/16.11.3/16.10.6, affected starts absent; victim interaction needed

代码与实验材料：No PoC; account consequence summary

来源证据范围：BleepingComputer source; vendor/CISA claims without direct primary links

- **证据待核（1）**：Keep currentXSS versus older active7028 separate; missing branch start and official advisory。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

- **结论使用边界（2）**：Publication-relative exposure counts/deadline need date retained; generic title。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

#  GitLab 高危漏洞可导致账号遭接管   
Sergiu Gatlan  代码卫士   2024-05-24 17:24  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Az5ZsrEic9ot90z9etZLlU7OTaPOdibteeibJMMmbwc29aJlDOmUicibIRoLdcuEQjtHQ2qjVtZBt0M5eVbYoQzlHiaw/640?wx_fmt=gif "")  
  
   
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
**GitLab 修复了一个高危漏洞，它可导致未认证攻击者在跨站点脚本攻击中接管用户账户。**  
  
该漏洞的编号是CVE-2024-4835，是位于VS 代码编辑器 （Web IDE）中的一个XSS弱点，可导致威胁行动者使用恶意构造的页面窃取受限制的信息。虽然攻击者可在无需认证的攻击中利用该漏洞，但仍然需要用户交互，因此增加了攻击的复杂性。  
  
GitLab 指出，“今天，我们发布GitLab 社区版 (CE) 和企业版 (EE) 17.0.2、16.11.3和16.10.6。这些版本中包括重要的漏洞和安全修复方案，我们强烈建议将所有的 GitLab 立即升级至这些版本。”  
  
本周三，GitLab还修复了6个中危漏洞，包括通过 Kubernetes Agent Server 实现CSRF 的漏洞 CVE-2023-7045以及可导致攻击者中断 GitLab web 资源加载的拒绝服务漏洞 (CVE-2024-2874)。  
  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/oBANLWYScMRWyjibjcoF9UM0DrochwkhSzfXpNsSe8z7Kvb1f6tcWW1GvOCCMEPqBqv7HYZUFgpqQ4bd92xhlCw/640?wx_fmt=gif&from=appmsg "")  
  
**老旧账户劫持漏洞遭活跃利用**  
  
  
  
  
  
因托管多种类型的敏感数据如API密钥和专有代码，GitLab称为热门目标。  
  
因此，被劫持的GitLab 账户可造成重大影响，如供应链攻击：如果攻击者将恶意代码插入CI/CD环境，则可攻陷组织机构的仓库。正如CISA在本月初提醒的那样，威胁行动者们正在活跃利用GitLab 在1月份劫持的另外一个零点击账户劫持漏洞CVE-2023-7028。该漏洞CVSS评分为10，可导致未认证攻击者通过密码重置接管GitLab 账户。尽管Shadowserver 在1月份发现超过5300个易受攻击的 GitLab 实例暴露在网上，但目前不到一半的还可被触及。CISA在5月1日将该漏洞添加至必修清单，要求美国联邦机构在三周内即5月22日前修复该漏洞。  
  
  
  
代码卫士试用地址：  
https://codesafe.qianxin.com  
  
开源卫士试用地址：https://oss.qianxin.com  
  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[GitLab 提醒注意严重的零点击账户劫持漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247518669&idx=1&sn=e9e78678e6c35cd6c0c37b638d5a988c&chksm=ea94b8a7dde331b16bdf8306a2700a04ea240bc5baa204b72ab3c9664a58b77c6fc92b1841f4&scene=21#wechat_redirect)  
  
  
[GitLab 督促用户安装安全更新，修复严重的管道漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247517701&idx=2&sn=9efeb89e9c34a3dcb192e347897ea5d3&chksm=ea94b76fdde33e79439751b5f121c7f1c6903963de1ec1e650ed19876271b10ebc9271391861&scene=21#wechat_redirect)  
  
  
[GitLab强烈建议尽快修复 CVSS 满分漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247516580&idx=1&sn=3e272b8a4ba9c8f7b596e5bc1c9f6576&chksm=ea94b0cedde339d8dee6f14566aaa4da84cb44e202cc0582353695ecd4620c832ba4c9ddab91&scene=21#wechat_redirect)  
  
  
[GitLab修复GitHub import函数中的RCE漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247514207&idx=1&sn=eda12473aec122dcbe50bf0b2545da32&chksm=ea948935dde300234feefd9ebdb2e36056f43a607bd274323e86088fbc98d2737efa2f63658f&scene=21#wechat_redirect)  
  
  
[GitLab 远程代码执行漏洞安全风险通告](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247513707&idx=1&sn=6c80379607fc2214bebf651c01750491&chksm=ea948701dde30e17d699dd8ce24dd9852b091e66462aee72c89a53dae49d8d3027bb1ddb3c99&scene=21#wechat_redirect)  
  
  
  
  
  
**原文链接**  
  
  
https://www.bleepingcomputer.com/news/security/high-severity-gitlab-flaw-lets-attackers-take-over-accounts/  
  
  
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
