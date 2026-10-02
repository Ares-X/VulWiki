---
source: "gelusus/wxvl 公众号漏洞文库"
product: "WordPress Forminator"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "CVE-2024-28890; CVE-2024-31077; CVE-2024-31857"
referenced_identifiers: ""
identifier_role: "primary"
identifier_status: "unknown"
cve: "CVE-2024-28890; CVE-2024-31077; CVE-2024-31857"
version: "28890: Forminator <1.29.0; 31077: <1.29.3; 31857: <1.15.4"
title: "WordPress 插件 Forminator 中存在严重漏洞，影响30多万站点"
prerequisites: "来源所述条件，未列明部分仍待核：upload<=1.29.0; SQLi administrator <=1.29.3 claimed; XSS<=1.15.4 victim click; separate ranges"
side_effects: "未执行；本文需注意的操作影响：明确更正：JVN 公告分别给上传 CVE-2024-28890 影响 &lt;1.29.0、SQLi CVE-2024-31077 影响 &lt;1.29.3、XSS CVE-2024-31857 影响 &lt;1.15.4；原文将这些修复边界也包含为受影响有误。"
source_status: "unknown"
id: "vw-0cc30ce1e44e1096c0a90dc9"
entity_id: "ve-0cc30ce1e44e1096c0a90dc9"
schema_version: "1"
---

## 核对与使用边界

- 明确更正：JVN 公告分别给上传 CVE-2024-28890 影响 &lt;1.29.0、SQLi CVE-2024-31077 影响 &lt;1.29.3、XSS CVE-2024-31857 影响 &lt;1.15.4；原文将这些修复边界也包含为受影响有误。
- SQLi 需要管理员权限，XSS 需要用户交互，不能合并成匿名 RCE。安装数减下载次数不是未更新实例数，不能由此得“至少32万受影响”。

核对来源：[JPCERT/IPA 协调公告](https://jvn.jp/en/jp/JVN50132400/)

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：upload&lt;=1.29.0; SQLi administrator &lt;=1.29.3 claimed; XSS&lt;=1.15.4 victim click; separate ranges

- **适用与权限边界（1）**：同文称SQLi影响1.29.3及更早，又建议1.29.3修复全部，明确版本边界矛盾。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **结论使用边界（2）**：50万安装减18万下载得至少32万受影响不成立，下载次数不等于更新实例。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **适用与权限边界（3）**：主元数据缺三个CVE；勿将管理员SQLi或点击XSS归无条件匿名RCE。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **来源与引用处置（4）**：有新闻原文链接但缺JPCERT原始公告，广告/推荐段较长。保留这部分来源材料并与技术结论分开；其引用或宣传内容不能补足本文漏洞的证据。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

#  WordPress 插件 Forminator 中存在严重漏洞，影响30多万站点   
Bill Toulas  代码卫士   2024-04-24 17:33  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Az5ZsrEic9ot90z9etZLlU7OTaPOdibteeibJMMmbwc29aJlDOmUicibIRoLdcuEQjtHQ2qjVtZBt0M5eVbYoQzlHiaw/640?wx_fmt=gif "")  
  
   
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
**50多万个站点都在使用的WordPress 插件 Forminator 易受严重漏洞CVE-2024-28890（CVSS评分9.8）的影响，可导致恶意人员将不受限制的文件上传到服务器中。**  
  
  
  
Forminator 由 WPMU DEV 创建，是一款适用于 WordPress 站点的自定义联系、反馈、测试、调查和支付表单构建器，提供拖放功能、广泛的第三方集成和通用的多功能。  
  
本周四，日本CERT发布提醒称，该漏洞可导致远程攻击者利用Forminator插件将恶意软件上传到网站，“远程攻击者可访问位于服务器上的文件以获取敏感信息，修改使用该插件的网站并引发DoS 条件。”  
  
JPCERT在安全公告中提出了如下三个漏洞：  
  
- CVE-2024-28890：在文件上传过程中对文件的验证不充分，导致远程攻击者在站点服务器上上传和执行恶意文件，影响 Forminator 1.29.0及更早版本。  
  
- CVE-2024-31077：SQL注入漏洞，导致具有管理员权限的远程攻击者在网站数据库中执行任意SQL查询，影响 Forminator 1.29.3及更早版本。  
  
- CVE-2024-31857：XSS漏洞，可导致远程攻击者在用户被诱骗点击特殊构造的链接前提下，在用户浏览器中执行任意HTML和脚本代码，影响 Forminator 1.15.4及更早版本。  
  
  
  
建议使用Forminator 插件的网站管理员尽快升级至已修复这些漏洞的1.29.3版本。  
  
WordPress.org 网站数据显示，自2024年4月8日发布该安全更新后，约18万名站点管理员已下载该插件。建设所有下载都和最新版本有关，那么至少还有32万个站点仍然易受攻击。截止本文发布之时，并未有报告表明该漏洞已遭活跃利用。但鉴于该漏洞的严重性以及易利用的程序，如推迟修复则风险较高。为将WordPress 网站上的攻击面最小化，应尽量少用插件、尽快升级至最新版本以及禁用不再活跃利用或需要的插件。  
  
  
代码卫士试用地址：  
https://codesafe.qianxin.com  
  
开源卫士试用地址：https://oss.qianxin.com  
  
  
  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[热门Wordpress 插件 LayerSlider 中存在严重漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247519223&idx=2&sn=a927e2b6bd81218102ea07e2de3133d7&chksm=ea94ba9ddde3338bf760ba11cb2fb665b8ad6e728bcc5b21ea7c1c1bf46968a037b5e55499a3&scene=21#wechat_redirect)  
  
  
[热门 WordPress 插件 Ultimate Member 中存在严重漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247518957&idx=1&sn=8d096042c0c0ab672b2763c4be529085&chksm=ea94bb87dde332919301d11f7a8c23002f628ae325511713f594d8afae88da1d90d44818421f&scene=21#wechat_redirect)  
  
  
[WordPress 插件 LiteSpeed 漏洞影响500万个站点](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247518947&idx=3&sn=a79e0235f3e78c2f4980247b4e0a365d&chksm=ea94bb89dde3329f127d8c01ddbfd59e454133a12f03962b70d34129434f08d38529852aa820&scene=21#wechat_redirect)  
  
  
[备份插件存在严重RCE漏洞，可导致WordPress网站遭接管](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247518349&idx=2&sn=da5a15622c08723ed8cacf81f9a2dd55&chksm=ea94b9e7dde330f1ebb50e99491cbc925e6e932730363f189179878a4dc2b3a4ccb480badb86&scene=21#wechat_redirect)  
  
  
[黑客利用WordPress 插件中的提权0day攻陷网站](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247516908&idx=1&sn=3861a45ade1fc801daa3c767fef3f318&chksm=ea94b386dde33a90582ec8599b01780524bb88c9f1a2cd4cfd9874889611594313e5443e60b1&scene=21#wechat_redirect)  
  
  
  
  
**原文链接**  
  
  
https://www.bleepingcomputer.com/news/security/critical-forminator-plugin-flaw-impacts-over-300k-wordpress-sites/  
  
  
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
