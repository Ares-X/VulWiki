---
source: "gelusus/wxvl 公众号漏洞文库"
title: "Cloudflare 零日漏洞：可绕过 WAF 访问全球任意后端主机"
product: "Cloudflare ACME验证"
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
id: "vw-378e96740e4b9cf60c012344"
entity_id: "ve-378e96740e4b9cf60c012344"
schema_version: "1"
---

# Cloudflare 零日漏洞：可绕过 WAF 访问全球任意后端主机

<!-- vulwiki-editorial:start -->
## 校订与适用边界


### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- 任意伪造token即可与后文获取有效pending token自相矛盾
- token永远不失效无依据
- HTTP-01写HTTPS忽略端口80起始
- 修复后所有路径统一WAF与官方按主机有效挑战仍例外说法冲突
- Spring/LFI等后果依额外配置或漏洞不能扩为全球任意主机
- 译文我们搭建为FearsOff研究非本文作者实测，保留归因及原始链接

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

喜欢挖洞吗
                    喜欢挖洞吗  喜欢挖洞吗   2026-01-21 10:44  
  
# Cloudflare 零日漏洞：可绕过 WAF 访问全球任意后端主机  
  
——当 .well-known 路径悄然绕过了防火墙  
  
在几乎每个现代网站上，都存在一个专为机器而非人类设计的 URL：/.well-known/acme-challenge/  
。它只在证书签发过程中短暂启用几秒钟，供自动化机器人验证你是否真正拥有该域名。这个过程本应悄无声息、例行公事。但这一次，这条“安静的小径”却突然变得喧闹起来！  
  
本文将讲述一个关键发现：**即使客户配置了严格的 Web 应用防火墙（WAF）规则来阻止所有外部流量，攻击者仍可通过 ACME 挑战路径直接触达被 Cloudflare 保护的源站服务器**  
。我们将解释这一问题为何重要、如何在不造成破坏的前提下验证其存在，并说明该漏洞现已修复。内容兼顾安全研究员所需的技术细节，也照顾安全决策者对核心风险的理解。  
# 60 秒了解 ACME 协议  
  
ACME（Automated Certificate Management Environment）是证书颁发机构（CA）用来验证域名控制权的标准协议。其中最常用的是 **HTTP-01 验证方式**  
：你需要在 /.well-known/acme-challenge/{token}  
 路径下提供一个一次性令牌文件。CA 会像普通客户端一样通过 HTTPS 请求该 URL，若返回内容匹配，则签发证书。  
  
设计初衷非常明确：**仅允许机器人读取一个特定路径下的小文件，其他任何操作都不应被允许**  
。这就像一条仅供持 clipboard 的机器人通行的走廊，绝不该成为人群混入的后门。  
# 异常观察：不符合预期的行为  
  
我们在审查一组应用的安全策略时注意到一个反常现象：这些应用的 WAF 被配置为“默认拒绝所有流量，仅放行特定来源”。在绝大多数路径上，WAF 表现正常——返回 Cloudflare 的拦截页面。**但当我们向 /.well-known/acme-challenge/{任意token} 发起请求时，WAF 竟然“让路”了，源站直接返回了响应（通常是框架生成的 404 页面）**  
。  
  
这种“说话者”的变化——从 Cloudflare 变成源站应用——就是关键信号。  
  
为排除这是某个租户的特殊配置错误，我们搭建了三个受控的演示站点（均默认屏蔽公网访问）：  
- • https://cf-php.fearsoff.org/  
  
- • https://cf-spring.fearsoff.org/  
  
- • https://cf-nextjs.fearsoff.org/  
  
在普通路径下，你会看到 Cloudflare 的拦截页；但只要请求指向 ACME 路径（即使 token 是伪造的），就会收到源站返回的 404——页面风格明显属于各自的应用框架（PHP、Spring、Next.js），而非 Cloudflare。  
> **技巧**  
：我们在 token 后附加无害后缀（如 /ae  
），证明**无需真实 ACME 文件**  
，仅路径结构就足以触发此行为。  
  
# 如何获得一个“稳定”的挑战 Token？  
  
为了可重复测试，我们需要一个长期有效的 token。我们利用 Cloudflare 的 **SSL/TLS 自定义主机名（Custom Hostnames）**  
 功能：  
1. 1. 添加一个新主机名：cf-well-known.fearsoff.org  
  
1. 2. 选择 **HTTP 验证方式**  
  
1. 3. **故意不配置 DNS 记录**  
，使证书验证一直处于“Pending”状态  
  
此时，Cloudflare 会显示类似如下的验证 URL：  
  
text  
```
http://cf-well-known.fearsoff.org/.well-known/acme-challenge/yMnWOcR2yv0yW-...Jm5QksreNRDUmqKfKPTk
```  
  
由于我们未完成验证，该 token 永远不会失效，成为理想的测试锚点。  
# 为什么这个问题很严重？  
  
WAF 本应是唯一的入口守门人。一旦某条维护路径能绕过它，**信任边界就发生了偏移**  
——原本受保护的内部系统，突然对公网开放了一个“合法”入口。  
### 实际影响示例：  
#### 🔹 Spring / Tomcat  
  
许多 Spring Boot 应用暴露 /actuator  
 端点（如 /actuator/env  
），通常位于内网或受 WAF 保护。 但通过 ACME 路径 + Servlet 路径遍历技巧（如 ..;/  
），我们成功访问到环境变量，**泄露数据库连接串、API 密钥等敏感信息**  
。  
#### 🔹 Next.js  
  
服务端渲染（SSR）框架常在 HTML 中嵌入服务器变量用于前端“注水”（hydration）。这些信息本不应公开。 但当源站直接响应时，**运维元数据（如构建时间、内部路径）意外暴露**  
。  
#### 🔹 PHP 路由  
  
大量 PHP 应用通过 index.php  
 统一路由，若存在本地文件包含（LFI）漏洞，攻击者可读取 /etc/hosts  
 等系统文件。**即使只是 404 页面，也可能因路由机制触发敏感逻辑**  
。  
> 这些不是漏洞根源，而是**WAF 绕过带来的连锁反应**  
——一旦后端可被直接访问，任何微小缺陷都可能被放大。  
  
# 不只是 404：账户级 WAF 规则也被绕过！  
  
我们进一步测试：配置一条账户级 WAF 规则，**拦截携带 X-middleware-subrequest 头的请求**  
。  
- • 在根路径 /  
：请求被正确拦截 ✅  
  
- • 在 ACME 路径：**相同请求竟被放行，由应用处理**  
 ❌  
  
这意味着：**所有依赖 WAF 过滤恶意 Header 的防护全部失效**  
！ 潜在风险包括：  
- • 老旧代码中基于 Header 的 SQL 拼接（SQLi）  
  
- • 利用 X-Forwarded-Host  
 或 X-Original-URL  
 的 SSRF/Host 头攻击  
  
- • 基于 Header 的缓存投毒  
  
- • 通过 X-HTTP-Method-Override  
 的方法篡改  
  
- • 由自定义 Header 触发的调试模式  
  
**问题核心在于：多少应用仍在盲目信任 Header？又有多少依赖 WAF 作为最后一道防线？**  
# 根本原因与修复  
  
我们的推测是：Cloudflare 内部对 /.well-known/acme-challenge/  
 路径做了**特殊处理**  
——为确保证书验证顺利进行，该路径的请求被提前放行，**跳过了客户自定义的 WAF 规则**  
。  
  
好消息是：**Cloudflare 已于 2025 年 10 月 27 日部署修复补丁**  
。 我们重新测试确认：现在 WAF 规则已**统一应用于所有路径**  
，包括 ACME 挑战路径。那条“危险的小径”终于恢复平静。  
# AI 时代的新威胁面  
  
此类 WAF 绕过漏洞在 AI 驱动的攻击浪潮下尤为危险。**AI 自动化工具可大规模扫描 /.well-known/acme-challenge/ 路径**  
，结合框架指纹（如识别 Spring、Next.js、PHP）自动尝试针对性载荷（路径遍历、LFI、Header 注入等），将单一维护接口转化为广泛攻击面。  
  
反之，AI 也可用于防御。例如，Crypto.com 安全团队就利用 AI 分析能力快速复现并验证了该漏洞，加速了修复进程。**当源站可被直接访问，AI 攻防的竞赛将更加激烈——可靠的 WAF 控制从未如此重要**  
。  
# 时间线  
- • **2025 年 10 月 9 日**  
：通过 HackerOne 提交漏洞  
  
- • **10 月 13 日**  
：厂商开始验证  
  
- • **10 月 14 日**  
：HackerOne 完成分类  
  
- • **10 月 27 日**  
：官方修复上线，我们验证确认修复成功  
  
# 致谢  
  
特别感谢 **Crypto.com CISO Jason Lau 及其安全团队**  
。我们首先联系他们协助独立验证此零日漏洞。他们凭借深厚的技术实力、先进的 AI 安全能力建设，以及高效响应，与 Cloudflare CEO Matthew Prince 团队紧密协作，极大加速了补丁开发与测试。 正因多方合力，全球无数组织今日得以免受此风险威胁。  
# 结语  
  
最危险的漏洞，往往始于最平凡的细节。**证书机器人的专用通道，绝不该变成攻击者的后门**  
。 我们赞赏 Cloudflare 从发现到修复的迅速响应，以及全程透明的合作态度。  
  
你可以在 Cloudflare 官方博客 阅读更多细节。 文章翻译至：https://fearsoff.org/research/cloudflare-acme  
# 免责声明  
1. 1. 本公众号发布的网络安全工具、POC 脚本、技术文章等内容，仅面向具备合法授权的网络安全从业人员、技术爱好者用于**合法合规的渗透测试、安全研究、漏洞验证**  
及技术学习交流，严禁用于任何未经授权的非法攻击、入侵他人网络或信息系统的行为。  
  
1. 2. 任何单位或个人在使用本公众号内容前，必须确保已获得目标系统的合法授权，并严格遵守《网络安全法》《数据安全法》《个人信息保护法》等国家相关法律法规及行业规范，独立承担因违规使用所产生的全部法律责任、经济损失及一切后果，与本公众号及作者无关。  
  
1. 3. 本公众号发布的内容仅为技术研究与分享，不构成任何攻击指导、非法用途的暗示或诱导。所有工具及 POC 的安全性、稳定性未经全面验证，仅供学习参考，使用者需自行评估风险并承担使用后果，本公众号及作者不承担任何因工具使用不当、漏洞利用失误导致的直接或间接损失。  
  
1. 4. 本公众号尊重并保护各类知识产权，发布的内容若涉及第三方技术、工具或资料，均已注明来源或基于合法授权。若存在侵权行为，请及时联系作者删除，任何未经授权的转载、篡改、传播本公众号内容的行为，需自行承担相应法律责任。  
  
1. 5. 凡浏览、关注本公众号或使用本公众号内容者，即视为已充分理解并同意本免责声明全部条款。若您不同意本声明，请勿使用本公众号任何内容。  
  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
