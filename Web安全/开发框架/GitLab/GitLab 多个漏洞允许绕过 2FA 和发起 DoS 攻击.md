---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  GitLab 多个漏洞允许绕过 2FA 和发起 DoS 攻击  
 网安百色   2026-01-22 11:23  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/1QIbxKfhZo6UUCdfv40c21Kiakibex2zrEyXokegHREyWOnyDibzkfHUFNPic2NK7lsrDQ2yVficibwY71dOpgxGfx9g/640?wx_fmt=jpeg&from=appmsg "")  
  
GitLab 漏洞允许绕过 2FA 和 DoS 攻击  
  
针对社区版 (CE) 和企业版 (EE) 的 18.8.2、18.7.2 和 18.6.4 版本中的五个漏洞发布了紧急安全补丁。  
  
这些补丁解决了从高危认证缺陷到影响核心平台功能的拒绝服务条件等一系列问题。  
  
**关键 2FA 绕过漏洞**  
  
最严重的漏洞是 CVE-2026-0723，这是认证服务中的一个未检查返回值问题，允许绕过双重身份验证 (2FA)。  
  
攻击者若知晓受害者的凭据 ID，可通过提交伪造的设备响应绕过 2FA 保护，从而可能未经授权访问用户账户。  
  
此漏洞影响 18.6 至 18.8 版本，CVSS 评分为 7.4，表明对机密性和完整性存在高风险。  
<table><thead><tr style="-webkit-font-smoothing: antialiased;"><th style="-webkit-font-smoothing: antialiased;"><span data-spm-anchor-id="5176.28103460.0.i19.96a07551qmNCMv" style="-webkit-font-smoothing: antialiased;"><span leaf="">CVE ID</span></span></th><th style="-webkit-font-smoothing: antialiased;"><span style="-webkit-font-smoothing: antialiased;"><span leaf="">漏洞类型</span></span></th><th style="-webkit-font-smoothing: antialiased;"><span style="-webkit-font-smoothing: antialiased;"><span leaf="">严重程度</span></span></th><th style="-webkit-font-smoothing: antialiased;"><span style="-webkit-font-smoothing: antialiased;"><span leaf="">CVSS 评分</span></span></th><th style="-webkit-font-smoothing: antialiased;"><span style="-webkit-font-smoothing: antialiased;"><span leaf="">受影响版本</span></span></th><th style="-webkit-font-smoothing: antialiased;"><span style="-webkit-font-smoothing: antialiased;"><span leaf="">影响</span></span></th></tr></thead><tbody><tr style="-webkit-font-smoothing: antialiased;"><td style="-webkit-font-smoothing: antialiased;"><span style="-webkit-font-smoothing: antialiased;"><span leaf="">CVE-2026-0723</span></span></td><td style="-webkit-font-smoothing: antialiased;"><span style="-webkit-font-smoothing: antialiased;"><span leaf="">认证中的未检查返回值</span></span></td><td style="-webkit-font-smoothing: antialiased;"><span style="-webkit-font-smoothing: antialiased;"><span leaf="">高危</span></span></td><td style="-webkit-font-smoothing: antialiased;"><span style="-webkit-font-smoothing: antialiased;"><span leaf="">7.4</span></span></td><td style="-webkit-font-smoothing: antialiased;"><span style="-webkit-font-smoothing: antialiased;"><span leaf="">18.6–18.8.x</span></span></td><td style="-webkit-font-smoothing: antialiased;"><span style="-webkit-font-smoothing: antialiased;"><span leaf="">通过伪造设备响应绕过 2FA</span></span></td></tr><tr style="-webkit-font-smoothing: antialiased;"><td style="-webkit-font-smoothing: antialiased;"><span style="-webkit-font-smoothing: antialiased;"><span leaf="">CVE-2025-13927</span></span></td><td style="-webkit-font-smoothing: antialiased;"><span style="-webkit-font-smoothing: antialiased;"><span leaf="">Jira Connect 集成中的 DoS</span></span></td><td style="-webkit-font-smoothing: antialiased;"><span style="-webkit-font-smoothing: antialiased;"><span leaf="">高危</span></span></td><td style="-webkit-font-smoothing: antialiased;"><span style="-webkit-font-smoothing: antialiased;"><span leaf="">7.5</span></span></td><td style="-webkit-font-smoothing: antialiased;"><span style="-webkit-font-smoothing: antialiased;"><span leaf="">11.9–18.8.x</span></span></td><td style="-webkit-font-smoothing: antialiased;"><span style="-webkit-font-smoothing: antialiased;"><span leaf="">未经身份验证的服务中断</span></span></td></tr><tr style="-webkit-font-smoothing: antialiased;"><td style="-webkit-font-smoothing: antialiased;"><span style="-webkit-font-smoothing: antialiased;"><span leaf="">CVE-2025-13928</span></span></td><td style="-webkit-font-smoothing: antialiased;"><span style="-webkit-font-smoothing: antialiased;"><span leaf="">Releases API 中的授权不当</span></span></td><td style="-webkit-font-smoothing: antialiased;"><span style="-webkit-font-smoothing: antialiased;"><span leaf="">高危</span></span></td><td style="-webkit-font-smoothing: antialiased;"><span style="-webkit-font-smoothing: antialiased;"><span leaf="">7.5</span></span></td><td style="-webkit-font-smoothing: antialiased;"><span style="-webkit-font-smoothing: antialiased;"><span leaf="">17.7–18.8.x</span></span></td><td style="-webkit-font-smoothing: antialiased;"><span style="-webkit-font-smoothing: antialiased;"><span leaf="">通过 API 端点未经授权发起 DoS</span></span></td></tr><tr style="-webkit-font-smoothing: antialiased;"><td style="-webkit-font-smoothing: antialiased;"><span style="-webkit-font-smoothing: antialiased;"><span leaf="">CVE-2025-13335</span></span></td><td style="-webkit-font-smoothing: antialiased;"><span style="-webkit-font-smoothing: antialiased;"><span leaf="">Wiki 重定向中的无限循环</span></span></td><td style="-webkit-font-smoothing: antialiased;"><span style="-webkit-font-smoothing: antialiased;"><span leaf="">中危</span></span></td><td style="-webkit-font-smoothing: antialiased;"><span style="-webkit-font-smoothing: antialiased;"><span leaf="">6.5</span></span></td><td style="-webkit-font-smoothing: antialiased;"><span style="-webkit-font-smoothing: antialiased;"><span leaf="">17.1–18.8.x</span></span></td><td style="-webkit-font-smoothing: antialiased;"><span style="-webkit-font-smoothing: antialiased;"><span leaf="">经认证用户通过畸形 Wiki 文档发起 DoS</span></span></td></tr><tr style="-webkit-font-smoothing: antialiased;"><td style="-webkit-font-smoothing: antialiased;"><span style="-webkit-font-smoothing: antialiased;"><span leaf="">CVE-2026-1102</span></span></td><td style="-webkit-font-smoothing: antialiased;"><span style="-webkit-font-smoothing: antialiased;"><span leaf="">API 端点中的 DoS</span></span></td><td style="-webkit-font-smoothing: antialiased;"><span style="-webkit-font-smoothing: antialiased;"><span leaf="">中危</span></span></td><td style="-webkit-font-smoothing: antialiased;"><span style="-webkit-font-smoothing: antialiased;"><span leaf="">5.3</span></span></td><td style="-webkit-font-smoothing: antialiased;"><span style="-webkit-font-smoothing: antialiased;"><span leaf="">12.3–18.8.x</span></span></td><td style="-webkit-font-smoothing: antialiased;"><span style="-webkit-font-smoothing: antialiased;"><span leaf="">通过 SSH 认证未经身份验证的 DoS</span></span></td></tr></tbody></table>  
**授权与 DoS 漏洞**  
  
CVE-2025-13927 和 CVE-2025-13928 代表了关键的拒绝服务威胁。  
  
CVE-2025-13927 利用了 Jira Connect 集成，允许未经身份验证的用户构造畸形认证请求以中断服务。  
  
CVE-2025-13928 涉及 Releases API 中的授权验证不当，允许未经授权的 DoS 条件。  
  
这两个漏洞的 CVSS 评分均为 7.5，分别影响从 11.9 到 17.7 的广泛版本范围。  
  
CVE-2025-13335 涉及 Wiki 重定向中的无限循环漏洞，经认证的用户可通过提交绕过循环检测的畸形 Wiki 文档进行利用。  
  
CVE-2026-1102 针对 API 端点，通过来自未经身份验证源的重复畸形 SSH 认证请求发起攻击，CVSS 评分较低（5.3），但受影响版本范围更广（从 12.3 开始）。  
  
GitLab 强烈建议所有自托管安装立即升级。GitLab.com 用户已受到保护，Dedicated 客户无需采取任何措施。  
  
数据库迁移可能导致单节点实例停机，尽管多节点部署可实施零停机程序。18.7.2 版本提供了部署后迁移。  
  
组织应优先升级以解决 2FA 绕过漏洞，并防止潜在的账户被攻陷。可通过 RSS 订阅 GitLab 的安全发布频道获取补丁通知。  
  
本公众号所载文章为本公众号原创或根据网络搜索下载编辑整理，文章版权归原作者所有，仅供读者学习、参考，禁止用于商业用途。因转载众多，无法找到真正来源，如标错来源，或对于文中所使用的图片、文字、链接中所包含的软件/资料等，如有侵权，请跟我们联系删除，谢谢！  
  
![图片](https://mmbiz.qpic.cn/mmbiz_jpg/1QIbxKfhZo5lNbibXUkeIxDGJmD2Md5vKicbNtIkdNvibicL87FjAOqGicuxcgBuRjjolLcGDOnfhMdykXibWuH6DV1g/640?wx_fmt=other&from=appmsg&wxfrom=5&wx_lazy=1&wx_co=1&randomid=p6hk1x4r&tp=webp#imgIndex=1 "")  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
