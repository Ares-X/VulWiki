---
source: "gelusus/wxvl 公众号漏洞文库"
product: "ZITADEL / Login V2 saml-post"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "CVE-2026-29191"
referenced_identifiers: ""
identifier_role: "primary"
identifier_status: "unknown"
title: "开源 IAM 平台ZITADEL中存在漏洞，可导致用户账户遭完全接管"
prerequisites: "来源所述条件，未列明部分仍待核：4.0.0–4.11.1、修复4.12.0；需受害者会话/点击，MFA/无密码对特定接管链缓解"
side_effects: "未执行；本文需注意的操作影响：版本/补丁结论待官方核验；只新闻来源，删除端点与要求旧密码应有官方commit"
source_status: "unknown"
id: "vw-d422f2be2e93b30ac6eebc35"
entity_id: "ve-d422f2be2e93b30ac6eebc35"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：4.0.0–4.11.1、修复4.12.0；需受害者会话/点击，MFA/无密码对特定接管链缓解

代码与实验材料：无原始PoC或响应，描述javascript协议+HTML注入及密码重置链

来源证据范围：SecurityOnline二手原文，无官方GHSA/patch

- **事实待核（1）**：CVE元数据缺失；依据：正文29191但frontmatter仅source，标题也无编号。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **凭据与会话边界（2）**：XSS与完全接管前提需分开；依据：无认证攻击者仍需用户交互和有效会话；MFA缓解账号接管不等于修复XSS。抓包中的会话不能视为未认证访问证明。需重新取得授权测试会话，不能复用文中值。

- **操作与副作用边界（3）**：版本/补丁结论待官方核验；依据：只新闻来源，删除端点与要求旧密码应有官方commit。保留原步骤及请求方法。执行条件包括隔离且获授权的可恢复环境、预先记录相关文件/账号/配置/业务记录状态；响应完成不能等同无副作用，恢复时须核对该操作涉及的实际对象。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

#  开源 IAM 平台ZITADEL中存在漏洞，可导致用户账户遭完全接管  
Ddos
                    Ddos  代码卫士   2026-03-09 09:31  
  
![](../../.resource/remote/afc2fa5611a63e89ebec625ecc33d28c5dcdb706b6fbdabb79f7c1e8982068c0.gif "")  
    
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
**安全研究人员披露了开源 IAM 平台 ZITADEL 中的一个高危漏洞CVE-2026-29191（CVSS 评分为 9.3），可导致未经身份验证的攻击者通过单次恶意点击接管用户账户。**  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
ZITADEL 广泛用于管理复杂的身份验证需求，能够以开箱即用的方式提供单点登录和多因素认证等功能。这一新漏洞影响该平台的 Login V2 接口。该漏洞源自一个名为“/saml-post” 的 HTTP 端点，它用于处理对 SAML 身份提供商的请求，接受两个特定的 GET 参数：url 和 id。  
  
该端点会基于 url 参数以不安全的方式重定向用户。通过提供一个 javascript: 协议而非标准网址，攻击者可以强制受害者的浏览器执行恶意代码。此外，该端点直接将用户提供的输入反映在服务器响应中，且未进行恰当的 HTML 编码。因而造成了一个典型的跨站脚本条件，使得任意的 HTML 和 JavaScript 可以被注入到用户的会话中。  
  
未经身份验证的远程攻击者能够利用这些漏洞，以 ZITADEL 用户的名义执行 JavaScript。一旦恶意脚本运行，攻击者就可以“重置受害者的密码，并接管他们的账户”。值得注意的是，ZITADEL 在“默认的开箱即用配置”下即存在该漏洞，意味着即使管理员没有显式配置 SAML 身份提供商，风险依然存在。  
  
  
![](../../.resource/remote/ae040977292eb5987d2738c4f8833ef44f371aa27dcf1f9c58858ae713f6dfce.gif "")  
  
**缓解措施**  
  
  
![](../../.resource/remote/ae040977292eb5987d2738c4f8833ef44f371aa27dcf1f9c58858ae713f6dfce.gif "")  
  
  
  
对于已启用多因素认证或无密码认证的账户，该特定攻击向量可以得到有效缓解。ZITADEL 团队已发布了一个补丁，从根本上改写了 SAML 集成的处理方式。运行 ZITADEL 4.0.0 至 4.11.1 版本的用户均受影响，应立即升级至 4.12.0 或更高版本。  
  
在新版本中，易受攻击的 /saml-post 端点已被彻底移除。此外，无论认证会话状态如何，密码更改页面从现在开始“始终要求用户输入当前密码”，从而提供了一个关键的防御层来抵御会话劫持。  
  
如果无法立即升级，且所在组织机构不需要 SAML IdP 集成，研究人员建议部署 Web 应用防火墙或反向代理规则，阻止所有对 /saml-post 端点的访问。  
  
  
 开源  
卫士试用地址：  
https://oss.qianxin.com/#/login  
  
  
 代码卫士试用地址：https://sast.qianxin.com/#/login  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[适用于Kubernetes 的AWS IAM 验证器中存在漏洞，导致提权等攻击](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247512889&idx=4&sn=bd3623a8d3f38a4206124b8681f1c510&scene=21#wechat_redirect)  
  
  
[开源库 Libpng 漏洞已存在30年，可导致数百万系统遭代码执行攻击](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247525101&idx=1&sn=ebdb207062b81e30e6939a2fa2e85a8e&scene=21#wechat_redirect)  
  
  
[用AI攻击AI：Ray AI开源框架中的老旧漏洞被用于攻击集群](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247524465&idx=2&sn=41ec03ab3c0572c4ecc61e20dcd8fdb6&scene=21#wechat_redirect)  
  
  
[Zeroday Cloud 黑客大赛专注开源云和AI工具，赏金池450万美元](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247524136&idx=2&sn=1ab345272edbec98f4aedbfa52607ee0&scene=21#wechat_redirect)  
  
  
  
  
  
**原文链接**  
  
https://securityonline.info/1-click-to-compromise-critical-9-3-cvss-flaw-in-zitadel-exposes-accounts-to-full-takeover/  
  
  
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
