---
source: "gelusus/wxvl 公众号漏洞文库"
title: "Cloudflare曝零日漏洞：攻击者可借证书验证路径绕过WAF访问任意源站"
product: "Cloudflare ACME WAF"
record_type: "advisory"
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
id: "vw-f66099dcf347c9bcf7566ebb"
entity_id: "ve-f66099dcf347c9bcf7566ebb"
schema_version: "1"
---

# Cloudflare曝零日漏洞：攻击者可借证书验证路径绕过WAF访问任意源站

<!-- vulwiki-editorial:start -->
## 校订与适用边界


### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- 同事件更完整2025-10-27修复时间线，另一篇补机制
- 源站影响需框架路由/漏洞条件，不能泛化任意敏感文件
- 特定有效挑战仍有例外却称所有路径统一WAF有内部矛盾
- 仅媒体名缺原厂/研究URL
- 已修复历史事件

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

看雪学苑
                    看雪学苑  看雪学苑   2026-01-20 09:59  
  
近日，Cloudflare的Web应用防火墙（WAF）曝出一处关键零日漏洞，  
攻击者可通过证书验证路径绕过安全控制，直接访问受保护的源站服务器。该漏洞由安全研究团队FearsOff发现，目前已由Cloudflare紧急修复。  
  
  
研究发现，  
当请求指向 `/.well-known/acme-challenge/` 目录时，即使客户配置的WAF规则明确阻止了所有其他流量，请求仍可抵达源站。  
这一路径普遍存在于现代网站中，用于自动化证书管理环境（ACME）协议执行SSL/TLS证书验证。其设计初衷仅限于证书颁发机构（CA）的验证机器人访问特定令牌文件，而非作为通往源站的开放通道。  
  
  
FearsOff团队在审查应用配置时注意到此异常。测试表明，针对ACME挑战路径的请求完全绕过了WAF规则，使得源站服务器直接响应请求，而非返回Cloudflare的拦截页面。为排除租户配置错误的可能性，研究人员专门搭建了多个演示主机进行验证，结果确认该漏洞具有普遍性。  
  
  
漏洞根源在于Cloudflare边缘网络处理ACME HTTP-01挑战路径的逻辑缺陷。当Cloudflare为其自身管理的证书订单提供挑战令牌时，系统会禁用WAF功能以防止干扰CA验证流程。然而，当请求的令牌与Cloudflare管理的证书订单不匹配时，请求竟会完全跳过WAF评估，直接转发至客户源站。这一逻辑错误使得原本狭窄的证书验证例外情况，演变为影响所有受Cloudflare保护主机的广泛安全绕过。  
  
  
利用此漏洞，攻击者可针对常见Web框架实施多种攻击。例如，在Spring/Tomcat应用上，通过路径遍历技术可访问敏感的执行器端点，泄露进程环境、数据库凭证、API令牌及云端密钥；Next.js服务端渲染应用可能暴露本不应公开的运营数据；存在本地文件包含漏洞的PHP应用则可能被恶意参数利用以访问文件系统。此外，基于自定义头部设置的账户级WAF规则对ACME路径流量完全失效。  
  
  
FearsOff于2025年10月9日通过Cloudflare的HackerOne漏洞赏金计划报告该漏洞。Cloudflare于10月13日启动验证，HackerOne于次日完成分类。10月27日，该公司部署永久修复方案，修改代码逻辑，确保仅当请求匹配特定主机名的有效ACME HTTP-01挑战令牌时才禁用安全功能。修复后测试证实，WAF规则现已对所有路径统一生效，包括先前存在漏洞的ACME挑战路径。Cloudflare表示无需客户采取额外措施，并确认目前未发现漏洞遭恶意利用的证据。  
  
  
  
资讯来源  
：  
securityonline.info  
  
转载请注明出处和本文链接  
  
  
  
﹀  
  
﹀  
  
﹀  
  
  
![](../../.resource/remote/067b16256e0ba673a1adf65d982af935c9dacaa6db0fe2765439200e9725754c.jpg "")  
  
![](../../.resource/remote/c953c0b9b281634c2c507d132859e779159195ce3db48c3a5eb6f0585d7d6e4e.gif "")  
  
**球分享**  
  
![](../../.resource/remote/c953c0b9b281634c2c507d132859e779159195ce3db48c3a5eb6f0585d7d6e4e.gif "")  
  
**球点赞**  
  
![](../../.resource/remote/c953c0b9b281634c2c507d132859e779159195ce3db48c3a5eb6f0585d7d6e4e.gif "")  
  
**球在看**  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
