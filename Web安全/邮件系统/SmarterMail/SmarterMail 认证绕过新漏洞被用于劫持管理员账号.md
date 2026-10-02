---
source: "gelusus/wxvl 公众号漏洞文库"
title: "SmarterMail 认证绕过新漏洞被用于劫持管理员账号"
product: "SmarterMail"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "active"
primary_identifiers: "CVE-2026-23760"
referenced_identifiers: "CVE-2025-52691"
identifier_role: "primary"
cve: "CVE-2026-23760"
prerequisites: "Known/guessed admin username; fixed9511 stated; no normal-user reset"
source_status: "unknown"
side_effects: "原文未完整记录副作用、清理步骤或运行验证；阅读样例不等于获准在真实系统执行。"
id: "vw-e9b024c47b39c1499d13632d"
entity_id: "ve-e9b024c47b39c1499d13632d"
schema_version: "1"
---

# SmarterMail 认证绕过新漏洞被用于劫持管理员账号

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 适用前提：Known/guessed admin username; fixed9511 stated; no normal-user reset
- 证据范围：Same force-reset-password issue as mail40, with distinct discovery/exploitation timeline

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- Preserve 'no CVE' as datedJan23 historical state; current identity should link later23760 after primary verification
- Do not misclassify as52691 merely because it is only CVE in body
- Spelling SmaterMail and '自由' likely mistranslation
- Large ad/recommendation/footer and blank-line noise

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

Bill Toulas
                    Bill Toulas  代码卫士   2026-01-23 10:36  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Az5ZsrEic9ot90z9etZLlU7OTaPOdibteeibJMMmbwc29aJlDOmUicibIRoLdcuEQjtHQ2qjVtZBt0M5eVbYoQzlHiaw/640?wx_fmt=gif "")  
    
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
**黑客正在利用邮件服务器和协同工具SmaterMail中的一个认证绕过漏洞重置管理员密码。该漏洞可导致未认证攻击者重置系统管理员密码并获得完整权限，目前已遭利用。该漏洞没有CVE编号。**  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
该认证绕过漏洞位于 force-reset-password API 端点中，而该端点无需认证即可遭暴露。网络安全公司 watchTowr 在1月8日报送该漏洞，SmarterMail 补丁已在1月15日发布，但并未分配CVE编号。  
  
就在该漏洞修复后的两天，研究人员发现已遭利用，这说明黑客逆向工程该补丁并找到了利用的方法。  
  
SmarterMail 是一款自由 SmarterTools 开发的托管 Windows 邮件服务器和协作平台，提供 SMTP/IMAP/POP 邮件、webmail、日历、通讯录和基本的群组特性。该平台的客户通常是服务管理提供商 (MSPs)、中小型企业以及提供邮件服务的托管提供商。SmarterTools 表示其产品遍布120个国家的1500万名用户。  
  
该漏洞产生的根因在于 API 端点 “force-reset-password” 接受由攻击者控制的 JSON 输入如 “IsSysAdmin”布尔类型属性，如该属性设置为true，则强制后端执行系统管理员密码重置逻辑。然而，该机制并未执行任何安全控制或验证旧密码，尽管请求中出现了 “OldPassword” 字段。因此，任何知道或猜测到管理员用户名的用户即可设置一个新密码并劫持管理员账号。  
  
研究人员提到，该漏洞仅影响管理员级别的账号，不影响普通用户。攻击者获得管理员权限后可运行OS命令，从而在主机上获得完整的远程代码执行权限。研究人员展示了利用该漏洞可获得系统级别的 shell 访问权限。  
  
一名匿名用户告知研究人员称该漏洞已遭在野利用，并提到有人在重置管理员密码。为证明自己言论的可信度，该用户向研究人员出示了遇到类似情况的一个论坛帖子。研究人员检查了日志后发现，这些攻击针对的是 “force-reset-password”端点，说明该漏洞目前正在活跃利用。  
  
两周前，研究人员曾发现了位于 SmarterMail 中的一个严重的预认证RCE漏洞CVE-2025-52691，且受该漏洞启发而发现了目前的这个认证绕过漏洞。建议 SmarterMail 用户升级至1月15日发布的最新版本 Build 9511，修复这两个漏洞。  
  
  
 开源  
卫士试用地址：  
https://oss.qianxin.com/#/login  
  
  
 代码卫士试用地址：https://sast.qianxin.com/#/login  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[SmarterMail 严重漏洞可导致服务器遭完全接管](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247524768&idx=1&sn=9637d0eb4df20ac66e8c9fa5c1d84ddd&scene=21#wechat_redirect)  
  
  
[Apache StreamPipes 严重漏洞可用于获取管理员权限](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247524778&idx=2&sn=17e6675d731950fb6f61f841bb161ef5&scene=21#wechat_redirect)  
  
  
[MikroTik 严重漏洞可用于暴露路由器管理员凭据](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247524305&idx=1&sn=60cf6de2e02ede50696541627d839f18&scene=21#wechat_redirect)  
  
  
[兄弟打印机689个机型的默认管理员密码遭暴露](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247523404&idx=1&sn=61e4dc2dfdcfd4bd40bdaef90768ec00&scene=21#wechat_redirect)  
  
  
  
  
  
**原文链接**  
  
https://www.bleepingcomputer.com/news/security/smartermail-auth-bypass-flaw-now-exploited-to-hijack-admin-accounts/  
  
  
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
