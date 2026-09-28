---
source: "gelusus/wxvl 公众号漏洞文库"
---

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
