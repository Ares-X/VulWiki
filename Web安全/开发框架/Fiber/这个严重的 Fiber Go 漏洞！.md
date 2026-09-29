---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  开发人员注意：速修复这个严重的 Fiber Go 漏洞！   
DO SON  代码卫士   2024-02-23 18:24  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Az5ZsrEic9ot90z9etZLlU7OTaPOdibteeibJMMmbwc29aJlDOmUicibIRoLdcuEQjtHQ2qjVtZBt0M5eVbYoQzlHiaw/640?wx_fmt=gif "")  
  
   
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
**使用 Fiber Go web 框架的开发人员应立即修复位于中间件 CORS 中的一个严重漏洞CVE-2024-25124（CVSS评分9.4）。该漏洞是因为在同步启用凭据时允许CORS 配置中出现通配符Origin (“*”) 导致的。**  
  
  
![](https://mmbiz.qpic.cn/mmbiz_png/oBANLWYScMQezqMGSrgdqc1eU7bXLtBxpeg2iaO8y9RXRSbjTnDs4XhlGWGxpRJlG4TsfrMMeqoWEOzweHu1dSA/640?wx_fmt=png&from=appmsg "")  
  
  
Fiber 是基于 Go 语言开发的快速、灵活且高性能的 web 框架，基于快速的HTTP 路由器和高性能的HTTP处理程序。  
  
  
![](https://mmbiz.qpic.cn/mmbiz_png/oBANLWYScMQezqMGSrgdqc1eU7bXLtBxpeg2iaO8y9RXRSbjTnDs4XhlGWGxpRJlG4TsfrMMeqoWEOzweHu1dSA/640?wx_fmt=png&from=appmsg "")  
  
**权限过度的CORS**  
  
  
  
CORS 是一种重要的机制，使 web 应用能够在不同域名之间安全地共享资源。错误配置 CORS 可为攻击者带来机会。CVE-2024-25124 的问题在于结合通配符 Origin (“*”) 与已启用的凭据的设置，这种组合违反了 web 安全最佳实践并可导致：  
  
- 越权数据访问：敏感的用户信息可被泄露给恶意网站。  
  
- 跨站点请求伪造 (CSRF)：攻击者可诱骗用户在 web app 上执行有害操作。  
  
- 其它web利用：为大量基于 web 的攻击创造启动面板。  
  
  
  
安全公告提到，“CORS 中间件可允许不安全的配置，从而可能将应用暴露到多个与CORS关联的漏洞。具体而言，该漏洞可为通配符（“*”）设置 Access-Control-Allow-Origin 标头，同时将 Access-Control-Allow-Credentials 设置为真，这与所建议的安全最佳实践相悖。”  
  
  
![](https://mmbiz.qpic.cn/mmbiz_png/oBANLWYScMQezqMGSrgdqc1eU7bXLtBxpeg2iaO8y9RXRSbjTnDs4XhlGWGxpRJlG4TsfrMMeqoWEOzweHu1dSA/640?wx_fmt=png&from=appmsg "")  
  
**受影响版本**  
  
  
  
使用 Fiber 2.52.1之前版本的任何应用均易受攻击。如果不确定所使用版本情况，则应立即升级。  
  
- 升级：修复方案已在 Fiber 2.52.1及后续版本中推出。  
  
- 人工审计：查看现有的 CORS 配置。在启用凭据时不要允许使用通配符origin (“*”)，确保CORS配置的安全。  
  
- 安全最佳实践：熟悉CORS安全配置实践。  
  
  
  
****  
  
代码卫士试用地址：  
https://codesafe.qianxin.com  
  
开源卫士试用地址：https://oss.qianxin.com  
  
  
  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[GitHub 上的1.5万个 Go 模块仓库易受 repojacking 攻击](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247518290&idx=3&sn=d48a9ac247a072b6234c58ea0609cf42&chksm=ea94b938dde3302ee8b16722a0117cd6863a3db3f74222d463c004c9d030ca79878c0a95296f&scene=21#wechat_redirect)  
  
  
[ParseThru：多款Go应用中出现HTTP参数走私缺陷](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247513397&idx=2&sn=c49e54e6e496b3140c5937ed82e2acf6&chksm=ea94845fdde30d4903784fe57f9232adc810fe8551de4c51a02a532d38dea8ff4fac85923e7b&scene=21#wechat_redirect)  
  
  
[找到恶意软件包：Go 语言生态系统中的供应链攻击是怎样的？](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247501804&idx=2&sn=afbc4399ce9ae0da406f1faf62ca063a&chksm=ea94f686dde37f908b2cd8e81e55bdcbf4a7638465d8a96274771c692bde81dde786c5d1d120&scene=21#wechat_redirect)  
  
  
  
  
**原文链接**  
  
  
https://securityonline.info/urgent-alert-for-developers-fix-the-critical-fiber-go-cve-2024-25124-vulnerability-now/  
  
  
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
