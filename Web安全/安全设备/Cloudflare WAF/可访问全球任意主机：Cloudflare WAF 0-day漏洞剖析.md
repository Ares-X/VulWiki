---
source: "gelusus/wxvl 公众号漏洞文库"
id: "vw-cc344e9f6b4846e61de9f3f8"
entity_id: "ve-cc344e9f6b4846e61de9f3f8"
schema_version: "1"
title: "可访问全球任意主机：Cloudflare WAF 0-day漏洞剖析"
product: "Cloudflare WAF ACME逻辑"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "活动token与其他区域关联，特定路径到源站；2025-10-27修复"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%AE%89%E5%85%A8%E8%AE%BE%E5%A4%87/Cloudflare%20WAF/%E5%8F%AF%E8%AE%BF%E9%97%AE%E5%85%A8%E7%90%83%E4%BB%BB%E6%84%8F%E4%B8%BB%E6%9C%BA%EF%BC%9ACloudflare%20WAF%200-day%E6%BC%8F%E6%B4%9E%E5%89%96%E6%9E%90.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_status: "unknown"
---

#  可访问全球任意主机：Cloudflare WAF 0-day漏洞剖析  

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Cloudflare WAF ACME逻辑
- 本文讨论：有效挑战token跨区域/主机绑定不足导致WAF绕过
- 版本、权限与配置前提：活动token与其他区域关联，特定路径到源站；2025-10-27修复
- 资料类型：FearsOff研究与Cloudflare厂商回应双翻译；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 研究部分HTTP-01称HTTPS，厂商部分正确写HTTP，内部不一致
- 报告日期研究10月9而厂商10月13，应保留提交/收到区别而非抹平
- 全球任意主机标题超出Cloudflare代理范围，源站文件读取需额外LFI等条件
- AI展望与已证实行为需分层

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- 厂商原文、研究截图和时间线差异待核
- 引用图片未查看，截图内容及有效性待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->

Dubito
                    Dubito  云原生安全指北   2026-01-21 00:35  
  
   
  
> 注：本文翻译自 FearsOff 的文章  
《Cloudflare Zero-day: Accessing Any Host Globally Or, when .well‑known went well past the WAF》[1]  
，可点击文末“阅读原文”按钮查看英文原文。  
  
  
全文如下：  
## 一、引言  
  
在现代几乎每个网站上，都有一个为机器而非人类存在的URL。它位于 /.well-known/acme-challenge/  
 路径下，在证书颁发的几秒钟内，一个机器人会访问它，以验证您确实控制着该域名。这段访问理应平淡无奇，是一项例行的静默任务。但在本例中，这条寂静之路却发出了巨大的声响！  
  
这份报告将讲述，为什么指向该证书验证路径的流量能够绕过客户规则，到达 Cloudflare 后方的源站（origin），而应用程序的其余部分则被正常阻挡；为什么这很重要；我们如何谨慎地证明了这一点；以及该问题现已被如何修复。本文既写给希望了解细节的研究者，也写给需要把握全局而不陷入技术细节的安全负责人。  
## 二、ACME 协议的 60 秒速成课  
  
ACME（Automatic Certificate Management Environment）是让证书颁发机构（Certificate Authority, CA）验证域名控制权的协议。在 HTTP-01 验证方法中，CA 期望您的站点在 /.well-known/acme-challenge/{token}  
 路径下提供一个一次性令牌。CA 会像任何其他客户端一样，通过普通的 HTTPS 协议获取该令牌；如果字节匹配，则颁发证书。其本意严格且极简：仅让机器人在一个非常特定的路径下读取一个小文件，仅此而已。ACME 走廊只为一个拿着剪贴板的机器人而设，而非让一群人从守卫眼皮下溜过去。  
## 三、一个不合常理的发现  
  
我们当时正在审查一组应用程序的访问配置，这些应用的 WAF 被设置为阻止所有流量，只允许特定来源。在其他所有地方，WAF 都完全如其所述地工作。但当我们向 /.well-known/acme-challenge/{token}  
 路径发起请求时，WAF 却让开了路，由源站以自己的声音作出了响应。正是这个发言者的单一改变——从 Cloudflare 的中间页面变成了源站框架的响应——暴露了问题。  
  
为了确保我们追查的不是租户特有的错误配置，我们启动了受控的演示主机，并在其前方部署了 Cloudflare，这些主机默认对普通流量是 blocked（已阻挡）状态：  
  
https://cf-php.fearsoff.org/, https://cf-spring.fearsoff.org/，以及 https://cf-nextjs.fearsoff.org/。  
  
访问这些主机的普通路径，您会遇到 Cloudflare 的阻挡页面。但访问这些主机的 ACME 挑战路径（并附带任意有效的令牌），您就会得到一个由源站生成的响应，最常见的是框架的 404 页面。即使不看响应头，差异也显而易见：一个页面是 Cloudflare 的，另一个则无疑是应用本身的。  
## 四、我们确信的信号  
  
在演示主机上，我们使用了小型、幂等的请求，并在令牌后附加了一个无害的后缀（例如，在令牌后添加 /ae  
），以此证明无需真实的 ACME 文件也会触发该行为。在所有情况下，我们都收到了源站响应，而其本应遇到 WAF 的阻挡。  
  
以下是来自演示环境的代表性截图。第一张图显示了一个正常请求终止于 Cloudflare 的阻挡页面。第二张图展示了我们在演示中用于阻挡所有 cf-  
 相关主机名的自定义规则。接下来的三张图则显示了当请求指向 ACME 路径时，每个演示主机都返回了一个由源站生成的 404 页面。  
  
**阻挡页面（正常请求）**  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/d7OsfYudM4bIRwkkEmouqvgEol7BkXrQoeiaJBO8SPLwUewZib7kbPN0czTtGWYjrkdNhkia0ibvhz99kbAciam4fJQ/640?from=appmsg "null")  
  
**自定义规则 - 拦截包含 cf- 的主机名**  
  
为了演示，我们创建了一个规则，阻挡任何包含 cf-  
 的主机名。在生产环境中，许多团队会阻挡公共互联网流量，只允许公司 VPN 出口流量。此规则模拟了我们演示环境中的这种配置状态。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/d7OsfYudM4bIRwkkEmouqvgEol7BkXrQ2wDcA45qHURadeE8P8sFXxhZwx2wvZxiaYtX4vaf6s4wQQ5goFOosUA/640?from=appmsg "null")  
  
**源站 404 页面（Next.js）**  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/d7OsfYudM4bIRwkkEmouqvgEol7BkXrQxysTjIuEIUxBic2ibibkCJ7D7Mf5G02JGlpibNs4tLS4nrAe1e71gkkbAQ/640?from=appmsg "null")  
  
**源站 404 页面（Spring）**  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/d7OsfYudM4bIRwkkEmouqvgEol7BkXrQ2oRlTT4mJ5kNghkFgpBlB4Y31sqiaicvf8a8pTlxiadcP57wDMW6XWqKw/640?from=appmsg "null")  
  
**源站 404 页面（PHP）**  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/d7OsfYudM4bIRwkkEmouqvgEol7BkXrQ0RkE3SBFwaXTwib6vndcCmgHXK35LvVweBDJhLW4LIicg3dvIYiaRfWNQ/640?from=appmsg "null")  
## 五、我们如何获取一个稳定的挑战令牌  
  
为了进行可重复的演示，我们需要一个不会在测试中途消失的挑战令牌。Cloudflare 的 **SSL/TLS Custom Hostnames**  
 功能允许您管理 CNAME 指向您域名的第三方的主机名和证书。我们添加了一个名为 cf-well-known.fearsoff.org  
 的自定义主机名，并明确选择了 HTTP 验证方式。下面的截图展示了添加流程和最终的“Pending Validation”（待验证）状态。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/d7OsfYudM4bIRwkkEmouqvgEol7BkXrQia1Yl9byT9mJbovIaEgpejFEuEr1MhAEVDbdbELBkHCOoibrk0PqQbNg/640?from=appmsg "null")  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/d7OsfYudM4bIRwkkEmouqvgEol7BkXrQJEqYV0NJyGX0AUY6iaOzwzlhmTGv6iaicVPibohP9iaehPqwCfl5JqyQzUw/640?from=appmsg "null")  
  
我们故意没有为 cf-well-known.fearsoff.org  
 创建 DNS 记录，因此证书签发过程将无限期保持“待处理”状态。在这个待处理状态下，Cloudflare 会展示验证机器人最终将请求的 HTTP-01 URL，例如：  
  
http://cf-well-known.fearsoff.org/.well-known/acme-challenge/yMnWOcR2yv0yW-...Jm5QksreNRDUmqKfKPTk  
  
我们没有完成验证，也没有在该路径下放置任何挑战文件。我们的目标是获得一个确定性的、长期有效的令牌格式，以便为我们的 WAF 行为测试提供一个锚点，同时无需与真实的 CA 竞争验证。有了这个令牌，我们就能在全球所有 Cloudflare 托管的主机上测试 /.well-known/acme-challenge/{token}  
 这条路由。  
## 六、为什么这在实际中很重要  
  
WAF 控制理应是大门。当一条维护路径可以绕过这扇门时，“内部”的定义就发生了改变。实际上，/.well-known/acme-challenge/...  
 的信任边界从 WAF 滑向了源站。一旦源站可以从互联网访问——即使只针对一条路由——普通的漏洞便获得了网络路径，普通的页面也变成了侦查目标。  
  
下图展示了这一变化在我们的演示环境中的直观表现。  
### 6.1 Spring / Tomcat  
  
在正常的安全配置下，执行器（actuator）端点位于 WAF 和内部网络控制之后。通过 ACME 路径访问应用程序则改变了这一边界。利用某些 servlet 栈中一个众所周知的路径遍历特性（..;/  
），请求可以访问 /actuator/env  
 端点，并返回进程环境和配置信息。这些数据通常包含敏感值——数据库 URL、API 令牌、云密钥——这实质上扩大了对源站中任何错误的潜在攻击面。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/d7OsfYudM4bIRwkkEmouqvgEol7BkXrQu3dljQjiaObmPHzJ0UAl2bal3tXwMv4De8D0ke3pkFhAg6xiaQ8e3oicA/640?from=appmsg "null")  
### 6.2 Next.js  
  
服务器端渲染框架通常会将服务器派生的值发送给客户端，以便进行页面数据渲染（hydrate）。当 WAF 守在大门前时，这没有问题。但当源站直接响应时，同一个页面就可能暴露出本不应从公共互联网访问的操作细节。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/d7OsfYudM4bIRwkkEmouqvgEol7BkXrQFrWrsPunWKljwkCUVZOZewq7L0tXicswHibnuWcwm8xV2EIo7ZkCKBiaQ/640?from=appmsg "null")  
### 6.3 PHP 路由  
  
许多 PHP 应用将所有请求都路由到 index.php  
 文件，并使用一个查询参数来选择视图。当这种模式存在 LFI漏洞（本地文件包含）时，公开可访问性就将其转化为了一个文件读取漏洞。请求 ../../../../etc/hosts  
 就足以证明其影响。在我们的演示中，即使是 404 流程也是通过 index.php  
 路由的，这就是为什么一旦源站开始直接响应，便会暴露出额外的页面。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/d7OsfYudM4bIRwkkEmouqvgEol7BkXrQxnCLlpzwJiciapglpYZvGNI6LyTwVPIibxpANVI23jxEXyafcusnqEGtA/640?from=appmsg "null")  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/d7OsfYudM4bIRwkkEmouqvgEol7BkXrQKc3PuNFfoaVH9PrciaAI84u9q0oycasNHACnCTqRMhwGibX4icIz3XTtw/640?from=appmsg "null")  
  
这些演示是后果，而非原因。根本问题在于 WAF 在一个特殊路径上所做的放行决定。一旦那扇门被打开，源站内部任何脆弱的环节都突然变得只需一个请求即可触及。  
## 七、不只是 404——账户级 WAF 规则也被忽略  
  
为了证明这不仅仅是绕路到框架的 404 页面，我们配置了账户级的 WAF 规则，以阻挡携带特定标记（sentinel ）Header 的请求。在根路径 /  
，带有 X-middleware-subrequest:  
 头部的请求如预期被阻挡。而完全相同的请求指向 ACME 路径时，却被放行并由应用程序处理。换句话说，本应阻止该请求的账户级规则，并未针对该路径进行评估。  
  
为什么这个区别很重要？许多实际应用程序会根据 Header 做决策，或者将 Header 值传递给下游代码。当限制 Header 的 WAF 规则被跳过时，整类问题就重新获得了通往源站的路径：遗留代码中基于 Header 的 SQL 拼接、通过 X-Forwarded-Host  
 或 X-Original-URL  
 实现的 SSRF 和host 混淆、当缓存依赖 Header 进行变化时的缓存投毒、使用 X-HTTP-Method-Override  
 的方法覆盖技巧，以及通过自定义 Header 启用的调试开关。随之而来的明显问题是：有多少应用仍然过分信任 Header？有多少应用依赖 WAF 来隔离这种信任与互联网？  
## 八、可能的原因与修复方案  
  
我们在调查期间的初步假设是，/.well-known/acme-challenge/  
 路径下的请求是在另一条代码路径上被评估的——这是一条旨在协助证书验证的隐式例外路径，它在客户阻断控制之前执行。这就可以解释为什么在 ACME 路径下总是源站响应，而在其他地方则是拦截页面。  
  
2025年10月27日，Cloudflare 部署了修复程序。我们重新测试了相同的模式，并观察到了预期的行为：WAF 统一应用了客户规则，包括对 /.well-known/acme-challenge/*  
 路径的请求。这条乏味的路径再次变得乏味了。  
## 九、AI 与新的攻击面  
  
随着人工智能（AI）驱动的攻击不断发展，此类 WAF 绕过漏洞带来了额外的紧迫性。由机器学习驱动的自动化工具能够快速枚举并利用像 /.well-known/acme-challenge/  
 这样的暴露路径，大规模地探测特定框架的漏洞或错误配置。  
  
例如，一个经过训练能识别 Servlet 路径遍历特性或 PHP 路由漏洞的 AI 模型，可以将此绕过与针对性攻击载荷串联起来，从而将一条狭窄的维护路径变成广泛的攻击向量。相反，AI 驱动的安全工具可以通过模拟这些攻击场景来帮助防御者，正如我们与 Crypto[.]com 安全团队的合作中所见，他们使用 AI 分析验证了此问题。随着源站变得可直接寻址，AI 攻击者与防御者之间的竞赛愈演愈烈，这使得强大的 WAF 控制比以往任何时候都更为关键。  
## 十、时间线  
- • 2025年10月9日 - 通过 HackerOne 提交报告。  
  
- • 2025年10月13日 - 供应商开始验证。  
  
- • 2025年10月14日 - 由 HackerOne 完成分类分级。  
  
- • 2025年10月27日 - 最终修复部署完成；重新测试确已修复。  
  
## 十一、致谢  
  
我们谨向  
Jason Lau, CISO[2]  
及 **Crypto[.]com**  
 安全团队致以诚挚的谢意。我们首先联系了他们，以协助独立验证此零日（zero-day）漏洞。他们的专业技术、AI 安全能力、速度和响应效率，使得他们能够与  
Matthew Prince, CEO[3]  
 及 **Cloudflare**  
 团队密切合作，加速了补丁的开发和测试。感谢我们共同的努力，如今全球的组织都更加安全。  
## 十二、结语  
  
最危险的漏洞往往始于寻常的细节。一个证书机器人使用的走廊绝不应成为一道侧门。我们赞赏从调查到修复的快速响应，以及全过程中的协作。  
  
您可以在   
Cloudflare 博客[4]  
上阅读关于此漏洞的文章。  
> 注：以下是对于  
Cloudflare 博客《How we mitigated a vulnerability in Cloudflare’s ACME validation logic》[4]  
 文章的翻译，该文章从防御角度出发，剖析了漏洞原理及修补方式。  
  
# Cloudflare ACME验证漏洞的根因与修复方案详解  
## 一、引言  
  
2025年10月13日，  
FearsOff[5]  
 的安全研究人员发现并报告了 Cloudflare ACME 验证逻辑中的一个漏洞，该漏洞导致在特定与 ACME 相关的路径上部分   
WAF[6]  
 功能失效。此漏洞通过 Cloudflare 的  
漏洞赏金计划[7]  
报告并得到验证。  
  
该漏洞源于我们的边缘网络处理发往 ACME HTTP-01 挑战路径（*/.well-known/acme-challenge/**  
）请求的方式。  
  
在此，我们将简要解释该协议的工作原理以及我们为修复漏洞所采取的措施。  
  
**Cloudflare 已修复此漏洞，客户无需采取任何措施。**  
 我们未发现任何恶意行为者滥用此漏洞。  
## 二、ACME 如何验证证书  
  
ACME 是一种用于自动化颁发、续期和吊销   
SSL/TLS证书[8]  
 的协议。当使用 HTTP-01 挑战来验证域名所有权时，**证书颁发机构**  
 期望在格式为 http://{customer domain}/.well-known/acme-challenge/{token value}  
 的 HTTP 路径上找到一个验证令牌。  
  
如果此挑战被 Cloudflare 管理的证书订单使用，那么 Cloudflare 将在该路径上进行响应，并向调用者提供 CA 给出的令牌。如果提供的令牌与 Cloudflare 管理的订单无关，则该请求将传递给客户源站，因为他们可能正试图作为其他系统的一部分完成域名验证。查看更多细节请参考下图流程——其他用例将在博文后部分讨论。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/d7OsfYudM4bIRwkkEmouqvgEol7BkXrQ6nk1yTxqKQZGomUPET8JvUbw5LLcY2M9WGWFDRUYuuk2GFXntCpJ7w/640?from=appmsg "null")  
  
（注：译者对其进行了翻译，见下图）  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/d7OsfYudM4bIRwkkEmouqvgEol7BkXrQsF31tBWy90LtmTwm0CV9aPg4oXMmibemHXkFz1OdEK7n1xiagK5DHvog/640?from=appmsg "null")  
## 三、底层逻辑缺陷  
  
发往 */.well-known/acme-challenge/**  
 的某些请求，会触发服务于 ACME 挑战令牌的逻辑去禁用 WAF 功能，并允许本应被阻挡的挑战请求继续前往源站。  
  
此前，当 Cloudflare 服务于 HTTP-01 挑战令牌时，如果调用者请求的路径与我们系统中某个活动挑战的令牌匹配，服务于 ACME 挑战令牌的逻辑会禁用 WAF 功能，因为 Cloudflare 将直接提供响应。这样做是因为这些功能可能会干扰 CA 验证令牌值的能力，并导致自动化证书订单和续期失败。  
  
然而，在使用的令牌与不同区域关联且并非由 Cloudflare 直接管理的情况下，该请求将被允许继续前往客户源站，而不会经过 WAF 规则集的进一步处理。  
## 四、我们如何缓解此漏洞  
  
为缓解此问题，我们发布了一个代码变更。该变更仅允许在请求匹配该主机名的有效 ACME HTTP-01 挑战令牌时，才禁用该组安全功能。在这种情况下，Cloudflare 才会有一个挑战响应可返回。  
## 五、Cloudflare 客户已受保护  
  
如上所述，**Cloudflare 已修复此漏洞，客户无需采取任何措施。**  
 此外，我们未发现任何恶意行为者滥用此漏洞。  
## 六、快速响应与漏洞透明度  
  
一如既往，我们感谢外部研究人员负责任地披露此漏洞。我们鼓励 Cloudflare 社区提交任何已识别的漏洞，以帮助我们持续改进产品与平台的安全状况。  
  
我们也认识到，您对我们的信任对于您在 Cloudflare 上构建基础设施的成功至关重要。我们极为重视此类漏洞，并将继续竭尽全力减轻影响。我们衷心感谢您对我们平台的持续信任，并承诺不仅在我们所做的一切中优先考虑安全，而且每当问题出现时，都会迅速、透明地采取行动。  
#### 引用链接  
  
[1]  
 《Cloudflare Zero-day: Accessing Any Host Globally Or, when .well‑known went well past the WAF》:https://fearsoff.org/research/cloudflare-acme  
[2]  
Jason Lau, CISO:https://www.linkedin.com/in/jasonciso/  
[3]  
Matthew Prince, CEO:https://www.linkedin.com/in/mprince/  
[4]  
Cloudflare 博客:https://blog.cloudflare.com/acme-path-vulnerability/  
[5]  
FearsOff:https://fearsoff.org/  
[6]  
WAF:https://developers.cloudflare.com/waf/  
[7]  
漏洞赏金计划:https://hackerone.com/cloudflare?type=team  
[8]  
SSL/TLS证书:https://www.cloudflare.com/learning/ssl/what-is-an-ssl-certificate/  
  
   
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_gif/d7OsfYudM4bIRwkkEmouqvgEol7BkXrQmxyKn5K5iaoicneo6AeolKtqFELBOnmvMLhwdibBDLBKsoAK9XVJmLBEg/640?wx_fmt=gif&from=appmsg "")  
  
  
  
**交流群**  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/d7OsfYudM4bIRwkkEmouqvgEol7BkXrQJH7oybackjFVKYtmbrhicE6V505KU56vjwA3j6FKuCvRLAuTaqjzCKQ/640?wx_fmt=png&from=appmsg "")  
  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
