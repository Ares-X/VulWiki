---
cve: "CVE-2026-24733"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  Tomcat漏洞允许攻击者通过HTTP/0.9请求绕过安全限制  
原创 ZM
                    ZM  暗镜   2026-02-20 22:58  
  
pache Tomcat 已披露 CVE-2026-24733，这是一个低危安全约束绕过漏洞，当某些访问控制规则以特定方式配置时，可通过 HTTP/0.9 请求触发该漏洞。  
  
![](https://mmbiz.qpic.cn/mmbiz_png/zdwoicOrrJb1p92I9icD3icv3m5d6cPm7KLIwibXYBz2nftHhLOqbDxuOSibs1lWw4YrUrLiaOTRqUJy8DSYIrMichwxA03iaWHBoNdibaicQ4kNpLrUc/640?wx_fmt=png&from=appmsg "")  
  
  
Apache Tomcat 安全团队发现了该问题，最初的安全公告于 2026 年 2 月 17 日发布。  
  
根本上讲，该漏洞源于 Tomcat 没有将 HTTP/0.9 请求限制为 GET 方法。HTTP/0.9 是一种过时的、功能最简化的协议变体，它早于现代的方法和头部处理规范，如今很少被有意使用。  
  
但是，如果攻击者能够访问 Tomcat 实例并发送精心构造的 HTTP/0.9 风格的流量，Tomcat 的方法处理可能会在安全约束的执行方面造成意想不到的漏洞。  
  
当 Tomcat 安全约束配置为允许对特定 URI 发送 HEAD 请求，同时拒绝对同一 URI 发送 GET 请求时，就会发生绕过。在正常的 HTTP 版本中，该规则集会阻止通过 GET 请求获取资源主体。  
  
利用 CVE-2026-24733，攻击者可以使用 HTTP/0.9 发送不符合规范的 HEAD 请求，从而绕过 GET 请求的配置约束。  
  
这个问题是设计上的特殊情况：它需要特定的约束配置（允许 HEAD，拒绝 GET）以及一个端到端接受 HTTP/0.9 解析的攻击路径。  
  
即便如此，它仍然与传统集成、特殊客户端以及某些代理/拓扑组合相关，在这些情况下，协议规范化可能不会按预期发生。  
## 受影响版本及缓解措施  
  
受影响的范围涵盖了当前维护的 Tomcat 分支以及已停止维护的旧版本。运行已停止维护版本的组织应将此视为迁移到受支持分支的提醒，因为安全修复程序可能无法安全地移植到旧版本。  
  
<table><thead><tr style="box-sizing: border-box;"><th style="box-sizing: border-box;padding: 2px 8px;text-align: left;border: 1px solid;word-break: break-word;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><span leaf="">Tomcat分支</span></font></font></th><th style="box-sizing: border-box;padding: 2px 8px;text-align: left;border: 1px solid;word-break: break-word;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><span leaf="">受影响的版本</span></font></font></th><th style="box-sizing: border-box;padding: 2px 8px;text-align: left;border: 1px solid;word-break: break-word;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><span leaf="">修复版本</span></font></font></th></tr></thead><tbody><tr style="box-sizing: border-box;"><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><span leaf="">11</span></font></font></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><span leaf="">11.0.0-M1 至 11.0.14</span></font></font></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><span leaf="">11.0.15+</span></font></font></td></tr><tr style="box-sizing: border-box;"><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><span leaf="">10.1</span></font></font></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><span leaf="">10.1.0-M1 至 10.1.49</span></font></font></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><span leaf="">10.1.50+</span></font></font></td></tr><tr style="box-sizing: border-box;"><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><span leaf="">9.0</span></font></font></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><span leaf="">9.0.0.M1 至 9.0.112</span></font></font></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><span leaf="">9.0.113+</span></font></font></td></tr><tr style="box-sizing: border-box;"><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><span leaf="">较老（EOL）</span></font></font></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><span leaf="">也受到影响</span></font></font></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><span leaf="">升级到受支持的分支</span></font></font></td></tr></tbody></table>  
Apache 建议升级到上述已修复的版本。作为一项切实可行的安全加固措施，团队还应审查受保护端点上 HEAD 和 GET 请求的访问控制意图，并验证任何前端反向代理或负载均衡器是否允许意外的协议降级行为。  
  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
