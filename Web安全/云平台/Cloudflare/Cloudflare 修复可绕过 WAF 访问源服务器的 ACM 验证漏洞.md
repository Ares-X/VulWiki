---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  Cloudflare 修复可绕过 WAF 访问源服务器的 ACM 验证漏洞  
Ravie Lakshmanan
                    Ravie Lakshmanan  代码卫士   2026-01-21 10:15  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Az5ZsrEic9ot90z9etZLlU7OTaPOdibteeibJMMmbwc29aJlDOmUicibIRoLdcuEQjtHQ2qjVtZBt0M5eVbYoQzlHiaw/640?wx_fmt=gif "")  
    
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
**Cloudflare修复了一个影响其自动证书管理环境（ACME）验证逻辑的安全漏洞。该漏洞可能被用于绕过安全控制并访问源服务器。**  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
网络基础设施公司Cloudflare的安全研究员表示：“该漏洞源于我们的边缘网络如何处理指向ACME HTTP-01验证路径（/.well-known/acme-challenge/*）的请求。”该公司表示，目前尚未发现该漏洞遭在野利用的证据。  
  
ACME是一种通信协议（RFC 8555），用于自动化签发、更新和吊销SSL/TLS证书。证书颁发机构向网站颁发的每张证书都需要通过验证挑战来确认域名所有权。这一过程通常通过Certbot等ACME客户端完成，客户端通过HTTP-01（或DNS-01）挑战验证域名所有权并管理证书生命周期。HTTP-01挑战会检查位于“https://<域名>/.well-known/acme-challenge/<令牌>”路径的验证令牌和密钥指纹，通过HTTP 80端口访问。  
  
该证书颁发机构的服务器会向该URL发起HTTP GET请求以获取文件。验证成功后即签发证书，同时证书颁发机构会将该ACME账户（即在其服务器注册的实体）标记为已授权管理该特定域名。  
  
当该挑战用于Cloudflare管理的证书订单时，Cloudflare会在前述路径响应请求，并向调用方提供CA给出的令牌。但如果该请求与Cloudflare管理的订单无关，则请求会被路由至客户源服务器，而客户源服务器可能使用不同的域名验证系统。  
  
该漏洞由FearsOff在2025年10月发现并报告，问题根源在于ACME验证过程的缺陷实现——导致某些向该URL发起的验证请求会禁用Web应用程序防火墙（WAF）规则，使本应被拦截的请求得以到达源服务器。  
  
换言之，该逻辑未能验证请求中的令牌是否实际匹配该特定主机名的有效挑战，这使得攻击者能够向ACME路径发送任意请求，完全绕过WAF防护，从而获得访问源服务器的能力。  
  
Cloudflare解释称：“此前，当Cloudflare提供HTTP-01挑战令牌时，如果调用方请求的路径匹配我们系统中有效挑战的令牌，提供ACME挑战令牌的逻辑就会禁用WAF功能，因为此时Cloudflare会直接提供响应。”  
  
“这样设计是因为这些功能可能干扰CA验证令牌值的能力，导致自动化证书订单和续期失败。然而，当所用令牌关联其他区域且非由Cloudflare直接管理时，请求将被允许继续传送至客户源服务器，且不再经过WAF规则集的进一步处理。”  
  
FearsOff公司的创始人兼首席执行官Kirill Firsov指出，恶意攻击者可利用此漏洞获取确定性、长期有效的令牌，访问所有Cloudflare主机上源服务器的敏感文件，从而为侦察活动打开通道。  
  
Cloudflare已于2025年10月27日通过代码更新修复该漏洞。新机制仅在请求匹配该主机名的有效ACME HTTP-01挑战令牌时，才提供响应并禁用WAF功能。  
  
  
 开源  
卫士试用地址：  
https://oss.qianxin.com/#/login  
  
  
 代码卫士试用地址：https://sast.qianxin.com/#/login  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[ChatGPT 代理绕过Cloudflare 的“我不是机器人”验证检查](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247523692&idx=2&sn=8738f5e2363ac654e83b957ae66aeb26&scene=21#wechat_redirect)  
  
  
[攻击者利用Okta被盗令牌黑入Cloudflare](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247518810&idx=1&sn=2acf3ce3594a9dff2165e0edf5b4f317&scene=21#wechat_redirect)  
  
  
[Okta 支持系统遭攻陷，已有Cloudflare、1Password等三家客户受影响](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247517967&idx=1&sn=a0c2ff2dfd52aa69d170f3e95247f143&scene=21#wechat_redirect)  
  
  
  
  
  
**原文链接**  
  
https://thehackernews.com/2026/01/cloudflare-fixes-acme-validation-bug.html  
  
  
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
