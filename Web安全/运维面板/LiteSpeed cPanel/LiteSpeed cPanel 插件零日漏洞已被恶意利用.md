---
cve: "CVE-2026-54420"
source: "gelusus/wxvl 公众号漏洞文库"
title: "LiteSpeed cPanel 插件零日漏洞已被恶意利用"
product: "LiteSpeed user-end cPanel plugin"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "active"
primary_identifiers: "CVE-2026-54420"
referenced_identifiers: ""
identifier_role: "primary"
prerequisites: "Limited tenant access/FTP/webshell;API chaining/CageFS conditions;fixedplugin2.4.8 bundledWHM5.3.2.1"
source_status: "unknown"
side_effects: "原文未完整记录副作用、清理步骤或运行验证；阅读样例不等于获准在真实系统执行。"
id: "vw-03f68dee741bdf654046408f"
entity_id: "ve-03f68dee741bdf654046408f"
schema_version: "1"
---

# LiteSpeed cPanel 插件零日漏洞已被恶意利用

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 适用前提：Limited tenant access/FTP/webshell;API chaining/CageFS conditions;fixedplugin2.4.8 bundledWHM5.3.2.1
- 证据范围：Distinct generateEcCert/packageUserSize chain and exploitation timeline, not same48172

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- No affected lower/range or primary advisory link
- 7-10 concurrent requests described as detection heuristic without evidence/specific log source
- Preserve tenant isolation/config prerequisites and distinguish plugin from WHM packaging
- Do not merge with48172 based product/root impact alone

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

原创 网络安全9527
                    网络安全9527  安全圈的那点事儿   2026-06-16 11:10  
  
LiteSpeed cPanel 用户端插件中的一个严重零日漏洞正在被积极利用，对全球共享主机环境构成严重威胁。  
  
该漏洞编号为 CVE-2026-54420，允许攻击者在特定条件下将权限提升至 root 级别，从而完全控制受影响的服务器。  
## LiteSpeed cPanel 插件零日漏洞  
  
据 LiteSpeed Technologies 称，该漏洞仅影响用户端的 cPanel 插件，不会影响 WHM 插件本身。  
  
但是，由于用户端插件与 WHM 插件捆绑在一起，如果不进行更新，许多环境可能仍然会暴露出来。  
  
Namecheap 的研究人员负责任地披露了这个问题，他们在向供应商报告之前，观察到了与漏洞利用尝试相关的可疑行为。  
  
该漏洞的核心在于，攻击者可以利用有限的初始访问权限（例如 FTP 凭据或对已入侵的 Web Shell 的访问权限）滥用 cPanel 插件中的内部 API 调用。  
  
通过以非预期的方式链接特定函数，攻击者可以绕过CloudLinux 的 CageFS 隔离所强制执行的权限边界，并最终将其权限提升到 root。  
  
这实际上破坏了共享主机设置中的租户隔离，可能会使托管在同一服务器上的其他用户面临风险。  
  
对攻击模式的分析表明，攻击者正在利用异常的内部 API 请求序列，特别是涉及 generateEcCert 和 packageUserSize 函数的请求。  
  
正常情况下，这些操作不会立即连续执行。然而，在观察到的攻击中，这些调用会被故意快速串联起来，并且通常会在多个线程上并发执行。  
  
这种行为表明使用了旨在提高权限提升成功率的自动化攻击脚本。  
  
进一步的取证指标表明，攻击者通常来自同一个源 IP 地址，该 IP 地址会反复攻击两个易受攻击的端点。  
  
与正常的顺序用户活动不同，同时发生的 7-10 个并发请求会在服务器日志中产生可检测的异常，防御者可以利用这些异常来识别攻击。  
  
LiteSpeed 在 cPanel 插件版本 2.4.8 中发布了一个补丁，该补丁与 WHM 插件版本 5.3.2.1 捆绑在一起，通过纠正不正确的访问控制和加强 API 处理来解决该漏洞。  
  
强烈建议管理员立即应用此更新，因为未打补丁的系统仍然存在很高的被入侵风险。  
  
对于无法立即更新的系统，建议移除用户端插件作为临时缓解措施，以消除攻击面。  
  
该漏洞于 2026 年 5 月 31 日被报告，促使 LiteSpeed 和 cPanel 迅速采取行动，快速缓解并移除了存在漏洞的组件。  
  
2026 年 6 月 1 日发布了修复版本，2026 年 6 月 14 日正式分配了 CVE 标识符。  
  
安全专家警告说，这种漏洞在现实世界中的影响可能非常严重，尤其是在多租户环境中，一个被攻破的账户就可能导致整个服务器被完全接管。  
  
建议管理员不仅要打补丁，还要进行彻底的日志分析，以识别任何先前被利用的迹象，包括未经授权的权限更改、可疑的命令执行或对系统文件的意外修改。  
  
LiteSpeed 已认可 Namecheap对发现该问题所做的贡献，并赞扬 cPanel 团队迅速采取的缓解措施。  
  
鉴于该漏洞目前正处于活跃利用状态，及时修补漏洞和主动监控对于防止进一步事件发生仍然至关重要。  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
