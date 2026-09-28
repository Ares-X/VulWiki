---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  Microsoft SQL Server 存在允许攻击者通过网络提升权限漏洞  
 网安百色   2026-01-15 11:47  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/1QIbxKfhZo4tv2I8icIGyC9JYH01gxjPlnGj5LEUpN0QMUayYo53qFuz9vYdiachkyC9wjE1IIpsDYkKSSib10dgQ/640?wx_fmt=jpeg&from=appmsg "")  
  
微软于2026年1月13日发布安全更新，修复SQL Server中的一个关键权限提升漏洞。该漏洞允许已授权的攻击者绕过身份验证控制，远程获取更高的系统权限。  
  
该漏洞被追踪为CVE-2026-20803，其根本原因是数据库引擎关键功能缺少身份验证机制。漏洞影响多个SQL Server版本，包括SQL Server 2022和最新发布的SQL Server 2025。该漏洞CVSS评分为7.2，微软将其严重等级定为"Important"。  
  
攻击需具备高权限账户和网络访问权限，但一旦利用成功，攻击者可获得内存转储、调试访问等高危能力，可能进一步导致系统被完全控制。  
<table><thead><tr style=" -webkit-font-smoothing: antialiased; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; "><th style=" -webkit-font-smoothing: antialiased; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; "><span style=" -webkit-font-smoothing: antialiased; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; "><span leaf="">CVE编号</span></span></th><th style=" -webkit-font-smoothing: antialiased; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; "><span style=" -webkit-font-smoothing: antialiased; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; "><span leaf="">严重等级</span></span></th><th style=" -webkit-font-smoothing: antialiased; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; "><span style=" -webkit-font-smoothing: antialiased; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; "><span leaf="">CVSS评分</span></span></th><th style=" -webkit-font-smoothing: antialiased; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; "><span data-spm-anchor-id="5176.28103460.0.i11.96a075510r0fxS" style=" -webkit-font-smoothing: antialiased; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; "><span leaf="">攻击向量</span></span></th></tr></thead><tbody><tr style=" -webkit-font-smoothing: antialiased; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; "><td style=" -webkit-font-smoothing: antialiased; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; "><span style=" -webkit-font-smoothing: antialiased; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; "><span leaf="">CVE-2026-20803</span></span></td><td style=" -webkit-font-smoothing: antialiased; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; "><span style=" -webkit-font-smoothing: antialiased; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; "><span leaf="">Important</span></span></td><td style=" -webkit-font-smoothing: antialiased; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; "><span style=" -webkit-font-smoothing: antialiased; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; "><span leaf="">7.2</span></span></td><td style=" -webkit-font-smoothing: antialiased; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; "><span style=" -webkit-font-smoothing: antialiased; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; "><span leaf="">网络</span></span></td></tr></tbody></table>  
漏洞细节与影响  
  
CVE-2026-20803利用了CWE-306（关键功能缺失身份验证）漏洞，允许具备高权限的认证用户突破权限边界。攻击者可借此获取调试权限、转储敏感内存内容，甚至访问加密数据或内存中的数据库凭证。  
  
漏洞发布时被评估为"较低可能性"被利用，因其需要特定前置条件，短期内大规模利用的可能性较低。微软目前未收到在野利用报告或公开披露尝试。  
  
微软通过常规分发版（GDR）和累积更新（CU）路径为受影响的SQL Server版本提供安全更新。运行SQL Server 2022的组织应安装CU22（版本16.0.4230.2）或RTM GDR（版本16.0.1165.1）。SQL Server 2025用户需安装2026年1月GDR更新（版本17.0.1050.2）。  
  
建议优先修补面向公网的系统或处理敏感数据的系统。微软建议审查部署架构并限制管理员访问权限，以在更新窗口期间降低利用风险。  
  
本公众号所载文章为本公众号原创或根据网络搜索下载编辑整理，文章版权归原作者所有，仅供读者学习、参考，禁止用于商业用途。因转载众多，无法找到真正来源，如标错来源，或对于文中所使用的图片、文字、链接中所包含的软件/资料等，如有侵权，请跟我们联系删除，谢谢！  
  
![图片](https://mmbiz.qpic.cn/mmbiz_jpg/1QIbxKfhZo5lNbibXUkeIxDGJmD2Md5vKicbNtIkdNvibicL87FjAOqGicuxcgBuRjjolLcGDOnfhMdykXibWuH6DV1g/640?wx_fmt=other&from=appmsg&wxfrom=5&wx_lazy=1&wx_co=1&randomid=p6hk1x4r&tp=webp#imgIndex=1 "")  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
