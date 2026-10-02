---
source: "gelusus/wxvl 公众号漏洞文库"
title: "LiteLLM 遭受攻击：三重威胁漏洞使 AI 网关面临全面接管风险"
product: "LiteLLM"
record_type: "analysis"
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
id: "vw-58864ff555349a49547cd92c"
entity_id: "ve-58864ff555349a49547cd92c"
schema_version: "1"
---

# LiteLLM 遭受攻击：三重威胁漏洞使 AI 网关面临全面接管风险

<!-- vulwiki-editorial:start -->
## 校订与适用边界


### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- 正文存在CVE-2026-35030和35029，frontmatter却无编号
- 三项问题仅两条GHSA引用，需建立逐项对应，不猜第三编号
- OIDC默认关闭/需要已登录等前提不同，不能合成一个未授权RCE结论
- 统一升级1.83.0说法需分别核对各漏洞版本
- 标题遭受攻击未提供明确在野证据；缺原文URL

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

sec随谈
                    sec随谈  sec随谈   2026-04-14 00:54  
  
LiteLLM 是一个广受欢迎的开源库，它为超过 100 种大型语言模型 (LLM)（例如 OpenAI 和 Anthropic）提供统一的接口。然而，该库近日曝出一系列严重的安全漏洞。研究人员在一系列安全公告中详细阐述了三个不同的**缺陷**，如果这些缺陷结合起来，攻击者就可以绕过身份验证、窃取凭据，甚至执行任意代码。  
  
**这些漏洞**中最严重的漏洞CVSS 评分为 9.4，这意味着依赖该工具管理其 AI 基础设施的组织需要立即进行修补。  
  
评级最高的**漏洞**，编号为CVE-2026-35030，涉及 LiteLLM 处理 OpenID Connect (OIDC) 身份验证方式中的一个严重冲突。启用 JWT 身份验证后，系统会使用缓存来加速用户信息查找。然而，系统并没有使用完整的令牌，而是仅使用前 20 个字符作为缓存键。  
  
使用相同签名算法创建的 JWT 标头通常会产生相同的前 20 个字符。未经身份验证的攻击者可以构造一个与合法用户缓存的 20 个字符前缀相匹配的令牌。  
  
一旦缓存命中，攻击者就能获得该合法用户的身份和权限。虽然此配置默认情况下未启用，但它对使用 JWT/OIDC 身份验证的部署构成灾难性风险。  
  
即使未使用 OIDC，LiteLLM 的内部用户管理也面临哈希传递身份验证绕过问题，导致仅通过三个 HTTP 请求即可完全提升权限。  
  
密码使用未加盐的 SHA-256 哈希值存储，这使得它们很容易成为彩虹表攻击的目标。多个 API 端点（包括 /user/info 和 /spend/users）会将这些密码哈希值泄露给任何已认证的用户，无论其角色如何。  
  
经查，/v2/login 端点接受原始 SHA-256 哈希值作为有效密码，而无需重新哈希处理。这使得已通过身份验证的用户能够简单地从 API 响应中“抓取”其他用户的哈希值，并使用该哈希值直接以该用户的身份登录——这是一种典型的哈希传递攻击。  
  
最后，研究人员在 /config/update 端点中发现了一个严重的权限提升**漏洞**（ CVE-2026-35029，CVSS 8.7）。该端点控制着核心代理设置，但未能强制执行仅限管理员访问的机制。  
  
任何已认证的用户都可以利用这一漏洞：  
- 注册指向攻击者控制的 Python 代码的自定义处理程序，以实现远程代码执行 (RCE)。  
- 通过操作 UI_LOGO_PATH 变量读取服务器上的任意文件。  
- 覆盖 UI_USERNAME 和 UI_PASSWORD 等环境变量，以获取特权帐户的控制权。  
LiteLLM 的维护人员已迅速采取行动解决这些问题。强烈建议用户立即升级到v1.83.0 版本以应用以下修复：  
- OIDC 修复：缓存键现在使用 JWT 令牌的完整哈希值，而不是 20 个字符的切片。  
- 密码机制全面升级：密码现在使用强大的 scrypt 算法和随机盐值进行哈希处理。此外，所有 API 响应中的哈希值都将被移除。  
- 配置锁定：/config/update 端点现在严格要求 proxy_admin 角色。  
如果无法立即更新，安全团队建议禁用 OIDC 用户信息缓存并严格限制 API 密钥的分发。  
  
参考链接：  
  
https://github.com/BerriAI/litellm/security/advisories/GHSA-jjhc-v7c2-5hh6  
  
https://github.com/BerriAI/litellm/security/advisories/GHSA-53mr-6c8q-9789  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
