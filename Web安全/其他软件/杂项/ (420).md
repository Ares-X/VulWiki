---
cve: "CVE-2024-28987"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【PoC】SolarWinds Web Help Desk (CVE-2024-28987)严重漏洞的 PoC 已发布   
 独眼情报   2024-09-26 10:14  
  
有关 CVE-2024-28987 的详细信息和概念验证 (PoC) 漏洞代码现已公开，该漏洞是最近修补的 SolarWinds Web 帮助台 (WHD) 漏洞，未经身份验证的攻击者可以利用该漏洞远程读取和修改所有帮助台票证详细信息。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/KgxDGkACWnQrXPKWkjOVJJknFWor04jjbEibRbticKWOYuWBpC9OlDbrGVAhHCvEwfuvXiblVY0gUqMGic6bC0g4uw/640?wx_fmt=other&from=appmsg "")  
  
Horizon3.ai 的 Zach Hanley 发现并向 SolarWinds 报告了此漏洞，他指出：“在评估我们自己客户的暴露情况时，我们发现组织通常会泄露 IT 流程的敏感流程信息，例如用户入职、密码重置和访问共享资源。虽然此漏洞不会导致 WHD 服务器本身完全被攻陷，但我们发现通过凭证进行横向移动的风险很高。”  
### CVE-2024-28987 被利用的风险  
  
CVE-2024-28987 源自硬编码的开发人员登录凭据，可用于在特定 WHD 端点上执行创建、读取、更新和删除操作。  
  
这个用于转储易受攻击的服务器上的最新票证详细信息的 PoC 现在可以可  
在 GitHub 上  
获取。  
  
针对 CVE-2024-28987 的修补程序已于  
一个月前  
发布。  
  
Hanley 表示，他们发现互联网上大约有 827 个 SolarWinds Web Help Desk 实例。虽然有些实例可能已经更新，不再容易受到此漏洞的攻击，但肯定还有一些实例仍可能被成功攻击。  
  
他指出：“根据对那些在互联网上和我们自己的客户群中接触过 WHD 应用程序的人的简单调查，WHD 应用程序似乎在州、地方和教育 (SLED) 市场领域很受欢迎。”  
  
这可能是管理员最后一次更新其安装的呼吁，否则攻击者就会采取行动并开始翻找他们的帮助台票据 - 尤其是因为另一个最近修补的 SolarWinds WHD 漏洞 CVE-2024-28986 正被  
攻击者  
积极利用。  
  
  
**免责申明：**  
  
**信息整理于网络，风险与后果自行判断，一切后果与本公众号无关！**  
> PoC:  
  
https://github.com/horizon3ai/CVE-2024-28987  
  
  
  
> 具体分析：https://www.horizon3.ai/attack-research/cve-2024-28987-solarwinds-web-help-desk-hardcoded-credential-vulnerability-deep-dive/  
  
  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
