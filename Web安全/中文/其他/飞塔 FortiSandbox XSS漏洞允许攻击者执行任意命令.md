---
cve: "CVE-2025-52436"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  飞塔 FortiSandbox XSS漏洞允许攻击者执行任意命令  
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
