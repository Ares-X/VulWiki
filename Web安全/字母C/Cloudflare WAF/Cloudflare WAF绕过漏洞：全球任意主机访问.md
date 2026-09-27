---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  Cloudflare WAF绕过漏洞：全球任意主机访问  
fearsoff
                    fearsoff  赛博知识驿站   2026-01-21 02:00  
  
   
## 要点速览  
  
本文披露了一个 Cloudflare WAF 的 **zero-day 绕过漏洞**  
，攻击者可通过 /.well-known/acme-challenge/  
 路径直接访问受 WAF 保护的源站，**无视所有客户自定义规则**  
。  
### 核心技术点  
  
**漏洞成因**  
：Cloudflare 为支持 ACME HTTP-01 证书验证，在处理 /.well-known/acme-challenge/*  
 路径时使用了独立代码路径，该路径在 WAF 规则评估**之前**  
执行，导致客户配置的阻断规则失效。  
  
**攻击向量**  
：  
- • 任意请求只要路径以 /.well-known/acme-challenge/{token}  
 开头即可绕过 WAF  
  
- • 无需真实 ACME 文件存在  
  
- • 甚至可在 token 后追加任意后缀（如 /ae  
）仍然生效  
  
**实战利用场景**  
：  
1. 1. **Spring/Tomcat 框架**  
：结合 Servlet 路径穿越特性 ..;/  
，访问敏感 actuator 端点```
/.well-known/acme-challenge/{token}/..;/actuator/env
```  
  
可泄露数据库凭据、API 密钥等环境变量  
  
1. 2. **Next.js SSR 应用**  
：直接访问服务端渲染页面，获取本应受保护的运维信息  
  
1. 3. **PHP 应用**  
：利用 index.php  
 路由机制触发 LFI 漏洞```
/.well-known/acme-challenge/{token}/../../../../etc/hosts
```  
  
  
### 验证技巧  
  
研究者通过 Cloudflare **SSL/TLS Custom Hostnames**  
 功能获取稳定的 challenge token：  
- • 添加自定义主机名但**不创建 DNS 记录**  
  
- • 保持证书验证处于 Pending Validation  
 状态  
  
- • 获得长期有效的测试 token，避免真实 CA 验证竞争  
  
### 影响范围  
- • 所有依赖 Cloudflare WAF 做访问控制的应用  
  
- • **账户级 WAF 规则**  
同样被绕过（包括基于 Header 的安全策略）  
  
- • 暴露了原本受信任边界保护的代码缺陷（SQL 注入、SSRF、缓存投毒等）  
  
**时间线**  
：  
- • 2025-10-09 提交漏洞  
  
- • 2025-10-27 Cloudflare 部署修复  
  
- • 现已修复，WAF 规则对 ACME 路径正常生效  
  
**AI 安全启示**  
：该漏洞凸显了 AI 驱动攻击的新威胁——机器学习模型可自动枚举此类隐蔽路径并链式利用框架特定漏洞，防御方需要 AI 工具进行攻击模拟验证。  
# Cloudflare 零日漏洞：全球任意主机访问  
## 当 .well-known 路径绕过了 WAF  
  
几乎每个现代网站上都存在一个专为机器而非人类设计的 URL。它位于 /.well-known/acme-challenge/  
 路径下，在证书签发的几秒钟内，会有一个机器人访问它来验证你确实控制着该域名。这次访问本应平淡无奇，只是一个例行的静默任务。但这一次，这条安静的路径却引发了巨大的安全问题！  
  
本文讲述了一个完整的漏洞发现故事：针对证书验证路径的流量如何能够绕过客户配置的规则直达 Cloudflare 背后的源站，为什么这个问题如此重要，我们如何谨慎地证明它的存在，以及这个问题现在是如何被修复的。本文既适合需要技术细节的安全研究人员，也适合需要全局视角的安全负责人。  
## ACME 协议 60 秒速览  
  
ACME 是证书颁发机构（CA）用来验证域名控制权的协议。在 HTTP-01 验证方法中，CA 期望你的站点在 /.well-known/acme-challenge/{token}  
 路径下提供一个一次性令牌。CA 像普通客户端一样通过 HTTPS 获取该令牌；如果内容匹配，证书就会被签发。这个机制的设计初衷严格且最小化：让机器人读取一个特定路径下的小文件，仅此而已。ACME 通道本应只允许一个拿着验证清单的机器人通过，而不是让一群人绕过安全检查溜进来。  
## 不符合预期的观察  
  
我们在审查一组应用的访问控制策略时，这些应用的 WAF 配置为阻止所有流量，仅允许特定来源访问。在其他所有地方，WAF 都完全按照配置工作。但当我们向 /.well-known/acme-challenge/{token}  
 发送请求时，WAF 却退到了一边，源站用自己的声音做出了响应。这个微妙的变化——从 Cloudflare 拦截页面变为源站框架响应——就是关键线索。  
  
为了确保这不是某个租户特定的错误配置，我们搭建了受控的演示主机，放在 Cloudflare 后面，默认阻止正常流量：  
- • https://cf-php.fearsoff.org/  
  
- • https://cf-spring.fearsoff.org/  
  
- • https://cf-nextjs.fearsoff.org/  
  
在普通路径下，你会看到阻止页面。但将同样的主机指向 ACME 挑战路径（使用任意真实令牌），你会得到源站生成的响应，通常是框架的 404 页面。这个差异即使不看响应头也清晰可见：一个页面来自 Cloudflare，另一个明显来自应用本身。  
## 我们信任的信号  
  
在演示主机上，我们使用小型幂等请求，并在令牌后附加一个无害的后缀（例如在令牌后添加 /ae  
），以证明即使没有真实的 ACME 文件，这种行为也会出现。在每种情况下，我们都在本应遇到 WAF 的地方收到了源站响应。  
  
以下是来自演示环境的代表性截图。第一张图显示正常请求在 Cloudflare 阻止页面处终止。第二张显示我们用来阻止 cf-*  
 主机名的自定义规则。接下来三张显示每个演示主机在请求 ACME 路径时返回源站生成的 404。  
#### 阻止页面（正常请求）  
  
![阻止页面](https://mmbiz.qpic.cn/mmbiz_jpg/MuPQsYZPics7jtx4hTW4yTdpyyhCyU2t7EgP9nqCnSdBicEJQ39MqX64AQ43duUJA0jOsibGnyTQwfP0Oiaj6wQjug/640?wx_fmt=webp&from=appmsg "null")  
  
阻止页面  
#### 自定义规则 - 阻止 cf-* 主机名  
  
在演示中，我们创建了一条规则来阻止任何包含 cf-  
 的主机名。在生产环境中，许多团队会阻止公共互联网，仅允许企业 VPN 出口。这条规则模拟了我们演示中的这种安全策略。  
  
![自定义规则](https://mmbiz.qpic.cn/mmbiz_jpg/MuPQsYZPics7jtx4hTW4yTdpyyhCyU2t7wtL4IZrTeh86YiaWejicJwgPk4nLibLYZMcvXD2ooJ4rH4TV23Q2zpfsw/640?wx_fmt=webp&from=appmsg "null")  
  
自定义规则  
#### 源站 404（Next.js）  
  
![Next.js 404](https://mmbiz.qpic.cn/mmbiz_jpg/MuPQsYZPics7jtx4hTW4yTdpyyhCyU2t7eDFseVswJmuGve4DibprjrctZmzIEsrUlIcian1qenS06rFnmleUriaOA/640?wx_fmt=webp&from=appmsg "null")  
  
Next.js 404  
#### 源站 404（Spring）  
  
![Spring 404](https://mmbiz.qpic.cn/mmbiz_jpg/MuPQsYZPics7jtx4hTW4yTdpyyhCyU2t7CSEXoy4kkMibwcP2UrsFqkGoFj0IicSPWGzCcILVjukfb7GrmdEGWSQw/640?wx_fmt=webp&from=appmsg "null")  
  
Spring 404  
#### 源站 404（PHP）  
  
![PHP 404](https://mmbiz.qpic.cn/mmbiz_jpg/MuPQsYZPics7jtx4hTW4yTdpyyhCyU2t7A8icbvtZorHhUGQibzuJBk7x8KfQGbqw7HKMLV2FAITc97IwIp8Vr7Xw/640?wx_fmt=webp&from=appmsg "null")  
  
PHP 404  
## 如何获取稳定的挑战令牌  
  
为了进行可重复的演示，我们需要一个不会在测试中途消失的挑战令牌。Cloudflare 的 SSL/TLS Custom Hostnames  
 功能允许你为 CNAME 到你域名的第三方管理主机名和证书。我们添加了一个名为 cf-well-known.fearsoff.org  
 的自定义主机名，并明确选择了 HTTP 验证。下面的截图显示了添加流程和生成的待验证状态。  
  
![添加自定义主机名](https://mmbiz.qpic.cn/mmbiz_jpg/MuPQsYZPics7jtx4hTW4yTdpyyhCyU2t7vSvIF7wdkHUiciaIje9cIUHutrAFnoDUPItQDsDaibS8ET4RMrZdqeicsA/640?wx_fmt=webp&from=appmsg "null")  
  
添加自定义主机名  
  
  
![待验证状态](https://mmbiz.qpic.cn/mmbiz_jpg/MuPQsYZPics7jtx4hTW4yTdpyyhCyU2t7CKQUYXb7vUMQ6IhMwz1vUfbOdk4K2ZIRrGib8d1H9g7ia8ZEzW8Pazow/640?wx_fmt=webp&from=appmsg "null")  
  
待验证状态  
  
我们故意没有为 cf-well-known.fearsoff.org  
 创建 DNS 记录，因此签发过程无限期地保持在待验证状态。在这种待验证状态下，Cloudflare 会显示验证机器人最终会请求的 HTTP-01 URL，例如：  
  
http://cf-well-known.fearsoff.org/.well-known/acme-challenge/yMnWOcR2yv0yW-...Jm5QksreNRDUmqKfKPTk  
  
我们没有完成验证，也没有在该路径下放置任何挑战文件。目标是获得一个确定性的、长期有效的令牌格式，以便在不与真实 CA 竞争的情况下锚定我们的 WAF 行为测试。有了这个令牌，我们可以在全球所有 Cloudflare 主机上测试 /.well-known/acme-challenge/{token}  
 路由。  
## 为什么这在实践中很重要  
  
WAF 控制本应是前门守卫。当单个维护路径绕过这道门时，"内部"的定义就发生了改变。实际上，/.well-known/acme-challenge/...  
 的信任边界从 WAF 滑向了源站。一旦源站可以从互联网直接访问——即使只是一个路由——普通的漏洞就获得了网络路径，普通的页面就变成了侦察工具。  
  
以下是这种转变在我们演示中的表现。  
#### Spring / Tomcat  
  
在正常的安全策略下，actuator  
 端点位于 WAF 和内部网络控制之后。通过 ACME 路径访问应用改变了这个边界。利用某些 servlet 栈中众所周知的路径遍历技巧（..;/  
），请求可以到达 /actuator/env  
 并返回进程环境和配置信息。这些数据通常包含敏感值——数据库 URL、API 令牌、云密钥——这大大扩大了源站任何错误的影响范围。  
  
![Spring actuator 泄露](https://mmbiz.qpic.cn/mmbiz_jpg/MuPQsYZPics7jtx4hTW4yTdpyyhCyU2t7gPmYaGPgv82zTMcFyHGmbibPstr7k2kze47sXqK63U90We616moyGRw/640?wx_fmt=webp&from=appmsg "null")  
  
Spring actuator 泄露  
#### Next.js  
  
服务器端渲染框架通常会将服务器派生的值传递给客户端以水合页面。当 WAF 控制前门时这没问题。但当源站直接响应时，同一页面可能会暴露从未打算从公共互联网访问的操作细节。  
  
![Next.js 信息泄露](https://mmbiz.qpic.cn/mmbiz_jpg/MuPQsYZPics7jtx4hTW4yTdpyyhCyU2t7eHqNtFpsWmKbWBLwxzJNRAzgmAqlmDTjJT3uWYZ5ltclbcdsZ6aFKA/640?wx_fmt=webp&from=appmsg "null")  
  
Next.js 信息泄露  
#### PHP 路由  
  
许多 PHP 应用将所有请求路由到 index.php  
，并使用查询参数选择视图。当这种模式存在本地文件包含（LFI）漏洞时，公共可达性会将其转变为文件读取。请求 ../../../../etc/hosts  
 足以证明影响。在我们的演示中，即使是 404 流程也通过 index.php  
 路由，这就是为什么一旦源站开始直接响应，它就会暴露额外的页面。  
  
![PHP LFI 演示 1](https://mmbiz.qpic.cn/mmbiz_jpg/MuPQsYZPics7jtx4hTW4yTdpyyhCyU2t7fExicWxBKRLfrRpjiaIkEspPl2VkrCxichPC4fSPTs8PoW11ANuhibIoqg/640?wx_fmt=webp&from=appmsg "null")  
  
PHP LFI 演示 1  
  
  
![PHP LFI 演示 2](https://mmbiz.qpic.cn/mmbiz_jpg/MuPQsYZPics7jtx4hTW4yTdpyyhCyU2t7jicNoCODFHTwEOGQYViaNmMnES9epjPfoItMLSONribXAlVAXiba1TNDzg/640?wx_fmt=webp&from=appmsg "null")  
  
PHP LFI 演示 2  
  
这些演示是后果，而非原因。根本问题是 WAF 在特殊路径上的决策。一旦这扇门打开，源站内部任何脆弱的东西都突然只有一个请求的距离。  
## 不仅仅是 404 - 账户级 WAF 规则被忽略  
  
为了证明这不仅仅是通往框架 404 的绕路，我们配置了账户级 WAF 规则来阻止携带哨兵标头的请求。在根路径上，携带 X-middleware-subrequest:  
 的请求按预期被阻止。完全相同的请求指向 ACME 路径时却被允许并由应用提供服务。换句话说，本应阻止请求的账户规则在该路径上根本没有被评估。  
  
为什么这个区别很重要？许多真实应用基于标头做出决策或将标头值传递到下游代码。当监管标头的 WAF 规则被跳过时，整类问题重新获得了到达源站的路由：遗留代码中基于标头驱动的 SQL 拼接、通过 X-Forwarded-Host  
 或 X-Original-URL  
 的 SSRF 和主机混淆、当缓存根据标头变化时的缓存键投毒、使用 X-HTTP-Method-Override  
 的方法覆盖技巧，以及连接到自定义标头的调试开关。显而易见的问题随之而来——有多少应用仍然过度信任标头，又有多少依赖 WAF 来阻隔这种信任与互联网之间的距离？  
## 可能发生了什么以及修复  
  
我们在调查期间的工作假设是，/.well-known/acme-challenge/  
 下的请求在不同的代码路径上被评估——这是一个隐式异常，旨在帮助证书验证，在客户阻止控制之前执行。这可以解释为什么在 ACME 路径下始终返回源站响应，而在其他地方都是阻止页面。  
  
2025 年 10 月 27 日，Cloudflare 部署了修复。我们重新测试了相同的模式，观察到了预期的行为：WAF 统一应用客户规则，包括在 /.well-known/acme-challenge/*  
 上。这条无聊的路径再次变得无聊。  
## AI 与新的攻击面  
  
随着 AI 驱动攻击的演进，像这种 WAF 绕过的漏洞变得更加紧迫。由机器学习驱动的自动化工具可以快速枚举和利用像 /.well-known/acme-challenge/  
 这样的暴露路径，大规模探测框架特定的弱点或错误配置。  
  
例如，一个经过训练以识别 servlet 遍历技巧或 PHP 路由漏洞的 AI 模型可以将这种绕过与针对性载荷链接起来，将狭窄的维护路径转变为广泛的攻击向量。相反，AI 驱动的安全工具可以通过模拟这些攻击场景来帮助防御者，正如我们与 Crypto.com 安全团队的合作所展示的，他们使用 AI 分析来验证这个问题。随着源站变得可直接访问，AI 攻击者和防御者之间的竞赛加剧，使得强大的 WAF 控制比以往任何时候都更加关键。  
## 时间线  
- • **2025 年 10 月 9 日**  
 - 通过 HackerOne 提交  
  
- • **2025 年 10 月 13 日**  
 - 供应商开始验证  
  
- • **2025 年 10 月 14 日**  
 - HackerOne 分类  
  
- • **2025 年 10 月 27 日**  
 - 部署最终修复；重新测试确认已修复  
  
## 致谢  
  
我们要向   
Jason Lau, CISO[1]  
 和 **Crypto.com 安全团队**  
表示深深的感谢，我们首先联系他们帮助独立验证这个零日漏洞。他们的技术专长、AI 安全能力、速度和响应能力使我们能够与   
Matthew Prince, CEO[2]  
 和 **Cloudflare**  
 团队密切合作，加快补丁的开发和测试。多亏了我们的共同努力，全球的组织今天更加安全。  
## 结语  
  
最危险的漏洞往往始于例行细节。证书机器人的通道永远不应该成为后门。我们感谢从调查到修复的快速响应，以及整个过程中的协作。  
  
你可以在   
Cloudflare 博客[3]  
上阅读关于这个漏洞的更多信息。  
  
****> 原文:https://fearsoff.org/research/cloudflare-acme  
  
#### 引用链接  
  
[1]  
 Jason Lau, CISO: https://www.linkedin.com/in/jasonciso/  
[2]  
 Matthew Prince, CEO: https://www.linkedin.com/in/mprince/  
[3]  
 Cloudflare 博客: https://blog.cloudflare.com/acme-path-vulnerability/  
[4]  
 X: https://x.com/k_firsov/status/2013253875512582261  
[5]  
 @k_firsov: https://x.com/k_firsov  
[6]  
 @FearsOff: https://x.com/FearsOff  
  
  
   
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
