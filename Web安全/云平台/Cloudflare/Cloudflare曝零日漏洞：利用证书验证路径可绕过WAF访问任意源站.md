---
source: "gelusus/wxvl 公众号漏洞文库"
title: "Cloudflare曝零日漏洞：利用证书验证路径可绕过WAF访问任意源站"
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
id: "vw-1d12233572bb44eedb8ea7eb"
entity_id: "ve-1d12233572bb44eedb8ea7eb"
schema_version: "1"
---

# Cloudflare曝零日漏洞：利用证书验证路径可绕过WAF访问任意源站

<!-- vulwiki-editorial:start -->
## 校订与适用边界


### 本次正文校订

- 修正正文中的 /.wel-known → /.well-known 转录错误，资源路径保持原样。

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- 有原始FearsOff和Cloudflare链接及自定义主机名token细节应保留
- 不是随便无效token，须区分他区有效token与本机不匹配
- /.wel-known拼写错误
- 示例token省略不可运行
- 2026报道用零日标题需突出2025已修复
- 90天证书概括过宽
- 路径绕过是否适用取决于源站及规范化，不泛化任意敏感文件

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

原创 开发小鸡娃
                        开发小鸡娃  安全随心录   2026-01-28 14:10  
  
# ACME介绍  
  
ACME（Automatic Certificate Management Environment）是一种自动化申请、续期和管理 HTTPS 证书的标准协议。  
  
ACME是一种通信协议(RFC 8555)，它促进SSL/TLS证书的自动签发、续期和撤销。证书颁发机构(CA)为网站配置的每个证书都通过challenge 验证来证明域名所有权。  
# ACME的必要性  
## 1. HTTPS 证书生命周期短  
  
当前主流证书有效期仅为 90 天  
  
证书过期将导致 HTTPS 服务不可用  
  
频繁的人工证书操作不可行，自动化管理成为必需。  
## 2. 规模化证书管理挑战  
  
假设拥有 100 个域名，每 90 天需要更换证书：  
  
人工成本高  
  
易遗忘续期，风险极大  
  
证书过期会造成重大生产事故  
  
ACME 的本质价值：  
  
将证书管理从“人工运维”升级为“基础设施自动化”。  
# ACME的认证方式  
## 1. HTTP-01 Challenge（最常用）  
  
流程：  
  
CA 要求在 /.well-known/acme-challenge/xxx 路径下放置 token  
  
ACME Client 完成操作，CA 访问指定 URL，验证 token 内容，验证通过后签发证书  
  
适用场景：  
1. 普通网站  
  
1. 公网 HTTP 服务，80/443 端口可访问  
  
1. Cloudflare、Nginx、Apache 支持良好  
  
局限性：  
1. 不支持泛域名证书（*.example.com）  
  
1. 必须公网可访问  
  
1. 对 WAF/反向代理敏感  
  
## 2. DNS-01 Challenge  
  
验证方式：  
1. CA 要求在 DNS 添加 TXT 记录，例如：_acme-challenge.example.com = "token"  
  
1. CA 查询 DNS 记录，验证通过后签发证书。  
  
适用场景：  
1. 泛域名证书  
  
1. 内网服务或无 HTTP 服务  
  
1. 多子域名、Kubernetes、自动化环境  
  
局限性：  
1. 需 DNS API 权限  
  
1. 实现复杂  
  
1. DNS 传播有延迟  
  
## 3. TLS-ALPN-01 Challenge  
  
验证方式：  
1. CA 连接服务器 443 端口  
  
1. 使用特殊 ALPN 协议 acme-tls/1  
  
1. 服务端返回临时证书进行验证  
  
适用场景：  
1. 无 HTTP 服务但可控制 TLS 终止  
  
1. 底层部署场景  
  
局限性：  
1. 实现复杂，调试难度高  
  
1. 生态支持有限  
  
# Cloudflare漏洞利用细节  
## 漏洞原因  
##      当请求指向 `/.well-known/acme-challenge/` 目录时，即使客户配置的WAF规则明确阻止了所有其他流量，请求仍可抵达源站。这一路径普遍存在于现代网站中，用于自动化证书管理环境（ACME）协议执行SSL/TLS证书验证。其设计初衷仅限于证书颁发机构（CA）的验证机器人访问特定令牌文件，而非作为通往源站的开放通道。  
  
      
Cloudflare中，  
漏洞根源在于Cloudflare边缘网络处理ACME HTTP-01挑战路径的逻辑缺陷。当Cloudflare为其自身管理的证书订单提供挑战令牌时，系统会禁用WAF功能以防止干扰CA验证流程。  
然而，当请求的令牌与Cloudflare管理的证书订单不匹配时，请求竟会完全跳过WAF评估，直接转发至客户源站。这一逻辑错误使得原本狭窄的证书验证例外情况，演变为影响所有受Cloudflare保护主机的广泛安全绕过。    
  
![0](https://mmbiz.qpic.cn/sz_mmbiz_png/9MnpyqibuMRYzGsXXwKAyT5UibiadTHeKqlzcdiaGO3qGxBxHttt7P99ohUupPiaNxQwrxvO6ZgS1Wr22SphKhFE6OA/640?wx_fmt=png&from=appmsg "")  
## 利用细节  
  
如下是被wafl拦截的正常页面Block page (normal request)  
  
![0](https://mmbiz.qpic.cn/sz_mmbiz_png/9MnpyqibuMRYzGsXXwKAyT5UibiadTHeKqlLuVaKdTPYPiaich0ongegV3kmYHoomjFib81V3eRunn3oiaAxQsYsV7oFg/640?wx_fmt=png&from=appmsg "")  
  
在实验中，在waf中配置了拒绝一切主机名包含cf的请求  
  
![0](https://mmbiz.qpic.cn/sz_mmbiz_png/9MnpyqibuMRYzGsXXwKAyT5UibiadTHeKqlSP2RLKu1ZBDHwgI3Ha2RYPWqJAcczPvPtSHAbS16XPvrmGbL6pJmyA/640?wx_fmt=png&from=appmsg "")  
  
但是通过 /.well-known 绕过了waf的限制而直接到了源站，按照策略应该是被block的  
  
![0](https://mmbiz.qpic.cn/sz_mmbiz_png/9MnpyqibuMRYzGsXXwKAyT5UibiadTHeKqlpZB1CM2iaqPEicnM5KicryuNibKJqKzLoUqnpHFBfZwSJyFjBK6VK66NUQ/640?wx_fmt=png&from=appmsg "")  
## 如何获取一个Challenge Token  
  
    Cloudflare的SSL/TLS自定义主机名功能允许您管理指向您域名的第三方CNAME记录及其证书。我们添加了名为cf-well-known.fearsoff.org的自定义主机名，并明确选择了HTTP验证方式。下图展示了添加流程及最终呈现的"验证待处理"状态。  
  
![0](https://mmbiz.qpic.cn/sz_mmbiz_png/9MnpyqibuMRYzGsXXwKAyT5UibiadTHeKqlQ6iaSeyj6aHDn1g3x0Fbkmib4RJJl9cibL9AdHEVTHqI8h1QJ3qh1tsrQ/640?wx_fmt=png&from=appmsg "")  
  
![0](https://mmbiz.qpic.cn/sz_mmbiz_png/9MnpyqibuMRYzGsXXwKAyT5UibiadTHeKqleTrYek4Y3lyudLrial07sv5x1Dd2YZFKeKZr8NjkyCNpJA7xG2hgcfg/640?wx_fmt=png&from=appmsg "")  
  
    未为 cf-well-known.fearsoff.org 创建 DNS 记录，因此证书签发状态将无限期保持待处理状态。在此待处理状态下，Cloudflare 会显示验证机器人最终将请求的 HTTP‑01 网址，例如：  
  
http://cf-well-known.fearsoff.org/.well-known/acme-challenge/yMnWOcR2yv0yW-...Jm5QksreNRDUmqKfKPTk  
  
    可以使用  
/.well-known/acme-challenge/yMnWOcR2yv0yW-...Jm5QksreNRDUmqKfKPTk ，对目标域名进行探测。  
## 漏洞危害  
  
1、通过 ../../../的方式可以绕过waf做一些探测  
  
![0](https://mmbiz.qpic.cn/sz_mmbiz_png/9MnpyqibuMRYzGsXXwKAyT5UibiadTHeKqlqfLBdo4JsPVPtM21S0kPIOhntL8RtEmsMPElLicr3eDggY9qFtz22Hg/640?wx_fmt=png&from=appmsg "")  
  
2、通过http header设置的waf规则将会失效  
  
![0](https://mmbiz.qpic.cn/sz_mmbiz_png/9MnpyqibuMRYzGsXXwKAyT5UibiadTHeKqlUy9jFX5kgSqAtZ4QBw49GBH9dDiccmZqicQlvBxCwcw823unQrVvv2vQ/640?wx_fmt=png&from=appmsg "")  
## 官方修复方式  
  
    为缓解此问题，已发布代码变更。该变更仅允许在请求匹配主机名的有效ACME HTTP-01挑战令牌时禁用安全功能集。此时，Cloudflare将返回相应的挑战响应。也就是不是随便一个token都可以让waf失效了  
## 参考文章  
  
https://fearsoff.org/research/cloudflare-acme  
  
https://blog.cloudflare.com/acme-path-vulnerability/  
  
  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
