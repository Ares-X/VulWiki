---
cve: "CVE-2025-52436"
source: "gelusus/wxvl 公众号漏洞文库"
id: "vw-9585449afe84ffc9bf272892"
entity_id: "ve-9585449afe84ffc9bf272892"
schema_version: "1"
title: "飞塔 FortiSandbox XSS漏洞允许攻击者执行任意命令"
product: "FortiSandbox GUI/PaaS"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "primary"
primary_identifiers: "CVE-2025-52436"
referenced_identifiers: ""
prerequisites: "需要受害者交互；列5.0.0–1、4.4.0–7等"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/%E9%A3%9E%E5%A1%94%20FortiSandbox/%E9%A3%9E%E5%A1%94%20FortiSandbox%20XSS%E6%BC%8F%E6%B4%9E%E5%85%81%E8%AE%B8%E6%94%BB%E5%87%BB%E8%80%85%E6%89%A7%E8%A1%8C%E4%BB%BB%E6%84%8F%E5%91%BD%E4%BB%A4.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_status: "unknown"
---

#  飞塔 FortiSandbox XSS漏洞允许攻击者执行任意命令  

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：FortiSandbox GUI/PaaS
- 本文讨论：CVE-2025-52436 / FG-IR-25-093
- 版本、权限与配置前提：需要受害者交互；列5.0.0–1、4.4.0–7等
- 资料类型：XSS新闻预警；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 从反射XSS直接推出系统RCE/完整命令行控制，没有任何利用链证据
- 表修复5.0.2，后文PaaS5.0.5，部署类型/版本关系未交代
- 无官方PSIRT链接，攻者未认证不等于无需受害者认证/交互

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- 官方影响是脚本或OS命令、PaaS固定版本和CVSS待核验
- 引用图片未查看，截图内容及有效性待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->

 暗镜   2026-02-11 00:44  
  
Fortinet 披露了其 FortiSandbox 平台中一个高危跨站脚本 (XSS) 漏洞，编号为 CVE-2025-52436 (FG-IR-25-093)，该漏洞允许未经身份验证的攻击者在受影响的系统上执行任意命令。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/zdwoicOrrJb0o2RayGJr8tqphXDoGZCH8zWfeOUkcs6Pbnyiakx9Gl4nhrMOUBSxNMhicYGNm1KJBONKzibeLiaOYj3iaNua9GTx0sqF4oZBF4gWI/640?wx_fmt=png&from=appmsg "")  
  
  
该缺陷被称为“网页生成过程中输入的不当中和”问题（CWE-79），存在于图形用户界面（GUI）组件中，得分为 7.9。  
  
从本质上讲，这种反射型跨站脚本攻击漏洞源于网页生成过程中输入过滤不足。攻击者通常通过浏览器的后退按钮或篡改参数来构造恶意请求，从而将可执行的 JavaScript 代码注入到图形用户界面 (GUI) 中。  
  
一旦受害者（例如管理员）与受感染的页面交互，脚本就会触发，从而升级到远程代码执行 (RCE) 权限。这将授予攻击者完全的命令行访问权限，可能导致数据泄露、横向移动或绕过恶意软件分析环境中的沙箱。  
## 受影响的版本和补丁  
  
FortiSandbox PaaS 部署首当其冲：  
  
<table><thead><tr style="box-sizing: border-box;"><th style="box-sizing: border-box;padding: 2px 8px;text-align: left;border: 1px solid;word-break: break-word;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><span leaf="">版本系列</span></font></font></th><th style="box-sizing: border-box;padding: 2px 8px;text-align: left;border: 1px solid;word-break: break-word;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><span leaf="">受影响的版本</span></font></font></th><th style="box-sizing: border-box;padding: 2px 8px;text-align: left;border: 1px solid;word-break: break-word;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><span leaf="">建议采取的措施</span></font></font></th></tr></thead><tbody><tr style="box-sizing: border-box;"><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><span leaf="">5.0</span></font></font></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><span leaf="">5.0.0 至 5.0.1</span></font></font></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><span leaf="">升级到 5.0.2 或更高版本</span></font></font></td></tr><tr style="box-sizing: border-box;"><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><span leaf="">4.4</span></font></font></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><span leaf="">4.4.0 至 4.4.7</span></font></font></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><span leaf="">升级到 4.4.8 或更高版本</span></font></font></td></tr><tr style="box-sizing: border-box;"><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><span leaf="">4.2</span></font></font></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><span leaf="">所有版本</span></font></font></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><span leaf="">迁移到固定版本</span></font></font></td></tr><tr style="box-sizing: border-box;"><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><span leaf="">4.0</span></font></font></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><span leaf="">所有版本</span></font></font></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><span leaf="">迁移到固定版本</span></font></font></td></tr></tbody></table>  
补丁已发布到 PaaS 版本 4.4.8 和 5.0.5 中。Fortinet敦促立即升级，并强调在打补丁之前，应通过网络分段和 GUI 访问限制来降低风险。  
  
Fortinet 伯纳比信息安全团队的 Jaguar Perlas 的内部发现。此次事件凸显了企业工具中持续存在的跨站脚本攻击 (XSS) 风险，即使是旨在隔离威胁的沙箱也不例外。  
  
负责扫描恶意软件或处理敏感情报的组织应优先修补未打补丁的系统，因为未打补丁的系统容易遭受命令与控制攻击。Fortinet 报告称目前尚未发现利用该漏洞的案例，但由于存在未经身份验证的攻击途径，因此仍需保持警惕。  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
