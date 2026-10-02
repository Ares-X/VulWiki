---
source: "gelusus/wxvl 公众号漏洞文库"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
title: "XSS 漏洞练习靶场，覆盖反射型、存储型、DOM 型、SVG、CSP、框架注入、协议绕过等多种场景"
product: "XSS-Sec"
record_type: "vulnerability"
document_type: "靶场工具介绍"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
prerequisites: "50关教学环境，浏览器/Angular/jQuery版本和CSP配置依各题"
side_effects: "原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%85%B6%E4%BB%96%E8%BD%AF%E4%BB%B6/%E6%9D%82%E9%A1%B9/XSS%20%E6%BC%8F%E6%B4%9E%E7%BB%83%E4%B9%A0%E9%9D%B6%E5%9C%BA%EF%BC%8C%E8%A6%86%E7%9B%96%E5%8F%8D%E5%B0%84%E5%9E%8B%E3%80%81%E5%AD%98%E5%82%A8%E5%9E%8B%E3%80%81DOM%20%E5%9E%8B%E3%80%81SVG%E3%80%81CSP%E3%80%81%E6%A1%86%E6%9E%B6%E6%B3%A8%E5%85%A5%E3%80%81%E5%8D%8F%E8%AE%AE%E7%BB%95%E8%BF%87%E7%AD%89%E5%A4%9A%E7%A7%8D%E5%9C%BA%E6%99%AF.md"
archive_commit: "41940cb0038d09ca5aaddbe5bffb923e423d210f"
source_status: "missing"
source_note: "原始出处待补；仓库归档不等同原始披露"
id: "vw-43da7cbd03bb9da2dcf81b09"
entity_id: "ve-43da7cbd03bb9da2dcf81b09"
schema_version: "1"
---

# XSS 漏洞练习靶场，覆盖反射型、存储型、DOM 型、SVG、CSP、框架注入、协议绕过等多种场景

<!-- vulwiki-editorial-rebuild:system-misc -->
## 条目范围与校订

- 本文对象：XSS-Sec
- 文献类型：靶场工具介绍
- 版本、权限及部署边界：50关教学环境，浏览器/Angular/jQuery版本和CSP配置依各题
- 核验状态：仅重建文本校订；未执行文中代码、PoC 或扫描，未把截图或转载声明记为本站复现

### 具体结论与待核项

以下为原归档的逐项勘误与证据缺口；可由文本确定的问题已在下文订正，仍缺来源的事实保持待核。

1. 此文是靶场关卡目录不是50个真实产品漏洞，勿把Angular/Bootstrap全部列受影响产品
2. Level5 No allowed疑HTML标签被吞，空列表项和关卡描述需与固定commit核对
3. PDF内HTML、dataURL、Cookie窃取等依MIME/CSP/HttpOnly与浏览器策略，标题强WAF/唯一解是题目限制不能泛化通用绕过
4. 仓库源码链接明确但无部署文档/版本，需限定受控隔离环境，截图未视检

### 操作风险

原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响

技术请求、代码与实验方法按原文保留；其中的破坏性动作仅限授权、可恢复的隔离环境。缺失代码、参数或版本事实不猜补。

### 来源追溯

- 原文参考链接（未重新核验）：<https://github.com/duckpigdog/XSS-Sec>
- 原始披露 URL 未确认；既有归档来源标签保留，不能替代原始公告

### 归档技术正文

 黑白之道   2026-01-24 01:18  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/3xxicXNlTXLicwgPqvK8QgwnCr09iaSllrsXJLMkThiaHibEntZKkJiaicEd4ibWQxyn3gtAWbyGqtHVb0qqsHFC9jW3oQ/640?wx_fmt=gif "")  
  
## 工具介绍  
  
XSS-Sec 靶场项目是一个以“实战为导向”的 XSS 漏洞练习靶场，覆盖反射型、存储型、DOM 型、SVG、CSP、框架注入、协议绕过等多种场景。页面样式统一，逻辑清晰，适合系统化学习与教学演示。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/icZ1W9s2Jp2XXErq77fVGmdFe8daOm3SIsvZCCuCQ0ib8IsJCS3S2hKQlaoytomlHPc1ibmzlX7LVe6pdHMSGavKw/640?wx_fmt=png&from=appmsg&watermark=1 "")  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/icZ1W9s2Jp2XXErq77fVGmdFe8daOm3SI4LBTuibHfFzjoKSVicj3fSH6R6AUr0ePdmIpzZaRoiaZT0g0CsyrI9njg/640?wx_fmt=png&from=appmsg&watermark=1 "")  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/icZ1W9s2Jp2XXErq77fVGmdFe8daOm3SIkPfhRp0ldQkXfAUib6ia7kkrSYbuHBHChEGAPI2sWLaZib9Id27xzcFibA/640?wx_fmt=png&from=appmsg&watermark=1 "")  
## 关卡总览（名称与简介）  
- Level 1: Reflected XSS — The basics.  
  
-   
- Level 2: DOM-based XSS — Client-side manipulation.  
  
- Level 3: Stored XSS — Persistent payloads.  
  
- Level 4: Attribute Breakout — Escape the attribute.  
  
- Level 5: Filter Bypass — No allowed.  
  
- Level 6: Quote Filtering — Break out of single quotes.  
  
- Level 7: Keyword Removal — Double write bypass.  
  
- Level 8: Encoding Bypass — HTML entities are your friend.  
  
- Level 9: URL Validation — Must contain http://  
  
- Level 10: Protocol Bypass — Case sensitivity matters.  
  
- Level 11: JS Context — Break out of JS string.  
  
- Level 12: DOM XSS via Hash — The server sees nothing.  
  
- Level 13: Frontend Filter — Bypass the regex.  
  
- Level 14: Double Encoding — Double the trouble.  
  
- Level 15: Framework Injection — AngularJS Template Injection.  
  
- Level 16: PostMessage XSS — Talk to the parent.  
  
- Level 17: CSP Bypass — Strict CSP? Find a gadget.  
  
- Level 18: Anchor Href XSS — Stored XSS in href.  
  
- Level 19: DOM XSS in Select — Break out of select.  
  
- Level 20: jQuery Anchor XSS — DOM XSS in jQuery attr().  
  
- Level 21: JS String Reflection — Reflected XSS in JS string.  
  
- Level 22: Reflected DOM XSS — Server reflection + Client sink.  
  
- Level 23: Stored DOM XSS — Replace only once.  
  
- Level 24: WAF Bypass (Tags/Attrs) — Reflected XSS with strict WAF.  
  
- Level 25: SVG Animate XSS — SVG-specific vector bypass.  
  
- Level 26: Canonical Link XSS — Escaping single quotes issue.  
  
- Level 27: Stored XSS in onclick — Entities vs escaping pitfall.  
  
- Level 28: Template Literal XSS — Reflected into JS template string.  
  
- Level 29: Cookie Exfiltration — Stored XSS steals session cookie.  
  
- Level 30: Angular Sandbox Escape — No strings, escape Angular sandbox.  
  
- Level 31: AngularJS CSP Escape — Bypass CSP and escape Angular sandbox.  
  
- Level 32: Reflected XSS (href/events blocked) — Bypass via SVG animate to set href.  
  
- Level 33: JS URL XSS (chars blocked) — Reflected XSS in javascript: URL with chars blocked.  
  
- Level 34: CSP Bypass (report-uri token) — Chrome-only CSP directive injection via report-uri.  
  
- Level 35: Upload Path URL XSS — Independent lab: upload HTML, random rename, URL concat XSS.  
  
- Level 36: Hidden Adurl Reflected XSS — Independent lab: hidden ad anchor reflects adurl/adid.  
  
- Level 37: Data URL Base64 XSS — Blacklist filter; must use data:text/html;base64 in object.  
  
- Level 38: PDF Upload XSS — Independent lab: upload PDF, view opens HTML-in-PDF causing XSS.  
  
- Level 39: Regex WAF Bypass — src/="data:..." bypasses WAF regex.  
  
- Level 40: Bracket String Bypass — href reflects; use window["al"+"ert"] to evade WAF.  
  
- Level 41: Fragment Eval/Window Bypass — Echo HTML; split strings then eval or window[a+b].  
  
- Level 42: Login DB Error XSS — Independent lab: invalid DB shows error, SQL reflects username.  
  
- Level 43: Chat Agent Link XSS — Independent lab: chat echoes, agent clicks user link executes.  
  
- Level 44: CSS Animation Event XSS — Strong WAF: only @keyframes+xss onanimationend allowed.  
  
- Level 45: RCDATA Textarea Breakout XSS — Strong WAF: only textarea/title RCDATA breakout works.  
  
- Level 46: JS String Escape (eval) — theme string injection; escape with eval(myUndefVar); alert(1);  
  
- Level 47: Throw onerror comma XSS — Strong WAF: only throw onerror=alert,cookie  
  
- Level 48: Symbol.hasInstance Bypass — Strong WAF: only instanceof+eval chain  
  
- Level 49: Video Source onerror XSS — Strong WAF: only video source onerror  
  
- Level 50: Bootstrap RealSite XSS — Independent site: only xss onanimationstart  
  
  
  
## 工具获取  
  
  
https://github.com/duckpigdog/XSS-Sec  
  
> **文章来源：夜组安全**  
  
  
  
黑白之道发布、转载的文章中所涉及的技术、思路和工具仅供以安全为目的的学习交流使用，任何人不得将其用于非法用途及盈利等目的，否则后果自行承担！  
  
如侵权请私聊我们删文  
  
  
**END**  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原始披露 URL 尚未确认，现有链接按来源追溯区分别标注）
