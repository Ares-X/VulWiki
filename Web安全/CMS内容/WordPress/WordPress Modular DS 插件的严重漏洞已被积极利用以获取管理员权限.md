---
source: "gelusus/wxvl 公众号漏洞文库"
product: "WordPress Modular DS"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "CVE-2026-23550"
referenced_identifiers: ""
identifier_role: "primary"
identifier_status: "unknown"
title: "WordPress Modular DS 插件的严重漏洞已被积极利用以获取管理员权限"
prerequisites: "来源所述条件，未列明部分仍待核：<=2.5.1; site linked to Modular with existing/renewable token; direct-request route; fixed2.5.2 claimed"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-5f5b0a824cc5534175c0f99f"
entity_id: "ve-5f5b0a824cc5534175c0f99f"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：&lt;=2.5.1; site linked to Modular with existing/renewable token; direct-request route; fixed2.5.2 claimed

- **事实待核（1）**：正文有CVE但frontmatter遗漏。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **凭据与会话边界（2）**：文章保留站点已连接及令牌存在条件，应进入结构化前提，不能写任意安装均可直接接管。抓包中的会话不能视为未认证访问证明；可识别的真实会话值按中段星号遮罩处理，默认演示值和攻击语法保留。需重新取得授权测试会话，不能复用文中值。

- **事实待核（3）**：Patchstack引述、安装量/活跃利用时间/IP均未附原始链接。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **事实待核（4）**：无完整请求或成功响应，新闻不能标作已验证PoC；IOC应保留观察时间和来源。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

#  WordPress Modular DS 插件的严重漏洞已被积极利用以获取管理员权限  
 TtTeam   2026-02-02 07:24  
  
WordPress 插件Modular DS中存在一个最高级别的安全漏洞，目前已被攻击者积极利用。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/0HlywncJbB1c6r88j06ERjcnuKbAibWZ8kYfwUxwj8CV3uL67TTMCCI1r7aO7RTiblemePEdDoJ67rGUwqb6efkw/640?wx_fmt=png&from=appmsg "")  
  
该漏洞编号为 CVE-2026-23550（CVSS 评分：10.0），被描述为未经身份验证的权限提升漏洞，影响插件 2.5.1 及之前的所有版本。该漏洞已在2.5.2 版本中修复。该插件的活跃安装量超过 40,000 次。  
  
Patchstack表示： “在 2.5.1 及以下版本中，该插件容易受到权限提升攻击，这是由于多种因素共同作用的结果，包括直接路由选择、绕过身份验证机制以及以管理员身份自动登录。 ”  
  
问题根源在于其路由机制，该机制旨在将某些敏感路由置于身份验证屏障之后。该插件将其路由暴露在“/api/modular-connector/”前缀下。  
  
然而，研究发现，只要启用“直接请求”模式，并将“origin”参数设置为“mo”，将“type”参数设置为任意值（例如，“origin=mo&type=xxx”），即可绕过此安全层。这会导致请求被视为模块化直接请求。  
  
Patchstack解释说：“因此，一旦网站已经连接到Modular（令牌存在/可续订），任何人都可以绕过身份验证中间件：传入的请求和Modular本身之间没有加密链接。”  
  
“这暴露了多个路由，包括 /login/、/server-information/、/manager/ 和 /backup/，允许执行各种操作，从远程登录到获取敏感的系统或用户数据。”  
  
由于存在此漏洞，未经身份验证的攻击者可以利用“/login/{modular_request}”路由获取管理员权限，从而提升权限。这可能为全面攻陷网站铺平道路，使攻击者能够植入恶意代码、部署恶意软件或将用户重定向到诈骗网站。  
  
根据 WordPress 安全公司分享的细节，利用该漏洞的攻击据称于 2026 年 1 月 13 日凌晨 2 点左右（UTC 时间）首次被检测到，攻击者通过 HTTP GET 请求访问端点“/api/modular-connector/login/”，然后尝试创建管理员用户。  
  
攻击源自以下IP地址  
  
```
45.11.89[.]19
185.196.0[.]11
```  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
