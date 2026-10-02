---
source: "gelusus/wxvl 公众号漏洞文库"
id: "vw-d15b9edcd52c2d5139c56f1e"
entity_id: "ve-d15b9edcd52c2d5139c56f1e"
schema_version: "1"
title: "Cloudflare WAF存在高危0day漏洞"
product: "Cloudflare WAF ACME路径逻辑"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "历史边缘逻辑、有效挑战token及特定路径；后续影响依赖源站缺陷"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%AE%89%E5%85%A8%E8%AE%BE%E5%A4%87/Cloudflare%20WAF/Cloudflare%20WAF%E5%AD%98%E5%9C%A8%E9%AB%98%E5%8D%B10day%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_status: "unknown"
---

#  Cloudflare WAF存在高危0day漏洞  

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Cloudflare WAF ACME路径逻辑
- 本文讨论：2025 ACME跨主机挑战token绕过，无CVE
- 版本、权限与配置前提：历史边缘逻辑、有效挑战token及特定路径；后续影响依赖源站缺陷
- 资料类型：WAF绕过新闻摘要；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 2026年1月仍称存在0day，遗漏同组详文明确2025-10-27已修复的重要状态
- 简化成所有token不匹配都会绕过，缺有效活动token/跨zone前提
- 缺原研究/厂商链接，非所有现代站点必有HTTP-01路径

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- 有效token范围、修复日期及客户影响待厂商原文核验
- 引用图片未查看，截图内容及有效性待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->

 网安百色   2026-01-20 11:22  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/1QIbxKfhZo4x2icHa78mLXEj3fk2w4nZrjvOfeHZuYF6ticeQIuVh4V0xt9IcV25XMibgrPricZlmRf86eOgRicVFIQ/640?wx_fmt=jpeg&from=appmsg "")  
  
Cloudflare的Web应用防火墙(WAF)中存在一个关键的零日漏洞，该漏洞允许攻击者绕过安全控制，通过证书验证路径直接访问受保护的源服务器。  
  
FearsOff安全研究人员发现，即使客户配置的WAF规则明确阻止了所有其他流量，针对/.well-known/acme-challenge/  
目录的请求仍能到达源服务器。  
  
自动证书管理环境(ACME)协议通过要求证书颁发机构(CAs)验证域名所有权来自动化SSL/TLS证书验证。在HTTP-01验证方法中，CAs期望网站在/.well-known/acme-challenge/{token}  
提供一次性令牌。此路径存在于几乎所有现代网站上，作为自动化证书颁发的静默维护通道。  
  
设计意图是将此访问限制为单个验证程序检查一个特定文件，而非作为通往源服务器的开放网关。  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/1QIbxKfhZo4x2icHa78mLXEj3fk2w4nZrBAcM8jL2iars9qejt3DwRlPXEUcj9WGD07jNQsNdJwASicw3bPlgwD1g/640?wx_fmt=jpeg&from=appmsg "")  
  
FearsOff研究人员在审查WAF配置阻止全局访问且仅允许特定来源的应用程序时检测到该漏洞。测试表明，针对ACME挑战路径的请求完全绕过了WAF规则，允许源服务器直接响应，而不是返回Cloudflare的阻止页面。  
  
为确认这不是租户特定的错误配置，研究人员在cf-php.fearsoff.org、cf-spring.fearsoff.org和cf-nextjs.fearsoff.org创建了受控演示主机。对这些主机的正常请求遇到了预期的阻止页面，但ACME路径请求返回了源生成的响应，通常是框架404错误。  
  
该漏洞源于Cloudflare边缘网络对ACME HTTP-01挑战路径的处理逻辑。当Cloudflare为其自身管理的证书订单提供挑战令牌时，系统会禁用WAF功能以防止干扰CA验证。然而，出现了一个关键缺陷：如果请求的令牌与Cloudflare管理的证书订单不匹配，该请求将完全绕过WAF评估，并直接前往客户源服务器。  
  
这个逻辑错误将一个有限的证书验证例外转变为影响Cloudflare保护下所有主机的广泛安全绕过。  
  
该绕过允许研究人员针对常见Web框架演示多种攻击向量：  
- 在Spring/Tomcat应用程序上，使用..;/  
的servlet路径遍历技术访问了敏感的执行器端点，暴露了进程环境、数据库凭证、API令牌和云密钥  
- Next.js服务器端渲染应用程序通过直接源响应泄露了操作数据，这些数据从未打算供公共互联网访问  
- 具有本地文件包含漏洞的PHP应用程序变得可被攻击，允许攻击者通过恶意路径参数访问文件系统  
本公众号所载文章为本公众号原创或根据网络搜索下载编辑整理，文章版权归原作者所有，仅供读者学习、参考，禁止用于商业用途。因转载众多，无法找到真正来源，如标错来源，或对于文中所使用的图片、文字、链接中所包含的软件/资料等，如有侵权，请跟我们联系删除，谢谢！  
  
![图片](https://mmbiz.qpic.cn/mmbiz_jpg/1QIbxKfhZo5lNbibXUkeIxDGJmD2Md5vKicbNtIkdNvibicL87FjAOqGicuxcgBuRjjolLcGDOnfhMdykXibWuH6DV1g/640?wx_fmt=other&from=appmsg&wxfrom=5&wx_lazy=1&wx_co=1&randomid=p6hk1x4r&tp=webp#imgIndex=1 "")  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
