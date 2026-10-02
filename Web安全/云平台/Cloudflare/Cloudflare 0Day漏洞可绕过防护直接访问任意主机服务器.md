---
source: "gelusus/wxvl 公众号漏洞文库"
title: "Cloudflare 0Day漏洞可绕过防护直接访问任意主机服务器"
product: "Cloudflare ACME WAF"
record_type: "incident"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
source_status: "unknown"
prerequisites: "原文未完整说明身份权限、部署配置和可达性；不能假定匿名、默认开启或所有版本适用。"
side_effects: "原文未完整记录副作用、清理步骤或运行验证；阅读样例不等于获准在真实系统执行。"
id: "vw-410bde153ce099168e6f8f98"
entity_id: "ve-410bde153ce099168e6f8f98"
schema_version: "1"
---

# Cloudflare 0Day漏洞可绕过防护直接访问任意主机服务器

<!-- vulwiki-editorial:start -->
## 校订与适用边界


### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- 第三篇同事件，有受控演示主机和框架差异补充
- 路径被下划线污染，修复全部路径仍与有效token例外矛盾
- 保留Oct2025修复Jan2026披露区分
- 不把404响应等于读取敏感文件
- 需原厂/研究直链

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

 FreeBuf   2026-01-21 10:31  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/qq5rfBadR38jUokdlWSNlAjmEsO1rzv3srXShFRuTKBGDwkj4gvYy34iajd6zQiaKl77Wsy9mjC0xBCRg0YgDIWg/640?wx_fmt=gif "")  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/qq5rfBadR3ibqicrdic5icku8cXyORbJUic2v8iaYRibWNlMia9AI2P2flCzVvEwGMrhoJPwKGicCvJExr3uQ6jd2LEvFdg/640?wx_fmt=jpeg&from=appmsg "")  
  
  
Cloudflare Web应用防火墙（WAF）存在一个高危0Day漏洞，攻击者可借此绕过安全控制措施，通过证书验证路径直接访问受保护的主机服务器。  
  
  
FearsOff安全研究人员发现，针对_/.well-known/acme-challenge/目录的请求能够直达主机服务器，即使客户配置的WAF规则已明确拦截所有其他流量。自动证书管理环境（ACME）协议通过要求证书颁发机构（CA）验证域名所有权来自动完成SSL/TLS证书验证。在HTTP-01验证方法中，CA要求网站在/.well-known/acme-challenge/{token}_路径提供一次性令牌。该路径几乎存在于所有现代网站中，作为自动化证书颁发的静默维护通道。设计初衷是将此访问权限限制在单个验证机器人检查特定文件，而非作为通往主机服务器的开放网关。  
  
  
**Part01**  
## Cloudflare 0Day漏洞分析  
  
  
FearsOff研究人员在审查WAF配置拦截全局访问、仅允许特定来源的应用时发现了该漏洞。测试表明，针对ACME挑战路径的请求会完全绕过WAF规则，使主机服务器直接响应而非返回Cloudflare拦截页面。  
  
  
为确认这不是租户特有的配置错误，研究人员在cf-php.fearsoff.org、cf-spring.fearsoff.org和cf-nextjs.fearsoff.org创建了受控演示主机。对这些主机的正常请求如预期般遭遇拦截页面，但ACME路径请求却返回了主机生成的响应（通常是框架404错误）。  
  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/qq5rfBadR3ibqicrdic5icku8cXyORbJUic2vpjFbF5m5mdUQHPJibvF9dOSpmQ0WUmRCcn6D3OYaN5JH7iavGH2frjXA/640?wx_fmt=jpeg&from=appmsg "")  
  
  
该漏洞源于Cloudflare边缘网络对ACME HTTP-01挑战路径的处理逻辑。当Cloudflare为其托管的证书订单提供挑战令牌时，系统会禁用WAF功能以防止干扰CA验证。但存在一个关键缺陷：如果请求的令牌与Cloudflare托管的证书订单不匹配，请求会完全绕过WAF评估直接转发至客户主机。这一逻辑错误将原本有限的证书验证例外变成了影响所有Cloudflare防护主机的广泛安全绕过。  
  
  
**Part02**  
## 攻击向量与影响范围  
  
  
研究人员利用该绕过漏洞展示了针对常见Web框架的多种攻击方式：  
  
- 在Spring/Tomcat应用中，通过_..;/_进行servlet路径遍历可访问暴露进程环境、数据库凭证、API令牌和云密钥的敏感执行器端点  
  
- Next.js服务端渲染应用通过直接主机响应泄露运营数据（这些数据本不应公开访问）  
  
- 存在本地文件包含漏洞的PHP应用可被利用，攻击者通过恶意路径参数访问文件系统  
  
除框架特定攻击外，基于自定义标头拦截请求的账户级WAF规则对ACME路径流量完全失效。  
  
  
**Part03**  
## 漏洞修复时间线  
  
  
FearsOff于2025年10月9日通过Cloudflare的HackerOne漏洞赏金计划报告该漏洞。Cloudflare于10月13日启动验证，HackerOne于10月14日完成问题分类。该公司于10月27日部署永久修复方案，修改代码使其仅在请求匹配特定主机名的有效ACME HTTP-01挑战令牌时禁用安全功能。  
  
  
修复后测试证实WAF规则现已统一适用于所有路径（包括先前存在漏洞的ACME挑战路由）。Cloudflare表示客户无需采取任何措施，并确认未发现恶意利用证据。  
  
  
**参考来源：**  
  
Cloudflare Zero-Day Vulnerability Enables Any Host Access Bypassing Protections  
  
https://cybersecuritynews.com/cloudflare-zero-day-vulnerability/  
  
  
###   
###   
###   
  
**推荐阅读**  
  
[](https://mp.weixin.qq.com/s?__biz=MjM5NjA0NjgyMA==&mid=2651334067&idx=1&sn=817c2149a41e006fedbb453ec71f40ec&scene=21#wechat_redirect)  
  
### 电台讨论  
###   
  
****  
![](https://mmbiz.qpic.cn/mmbiz_png/qq5rfBadR3ibvNluUKZ6RPy7h2fbYibRbLQDHPFqj89KkFsXBRibx5YTLiaTUfFOy9PKicps3l56iazUPNQrwdhkZ7jA/640?wx_fmt=png&from=appmsg "")  
  
****  
  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
