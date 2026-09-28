---
cve: "CVE-2024-39864"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【漏洞预警】Apache CloudStack初始化不当漏洞 (CVE-2024-39864)   
cexlife  飓风网络安全   2024-07-09 23:08  
  
![](https://mmbiz.qpic.cn/mmbiz_png/ibhQpAia4xu000d29wpBLfEA18u2kQBv17jibiaoNsPeXBLWREiacqL2hovG36Jka012etHRcObMKNcCSGNHE6ia3rvg/640?wx_fmt=png&from=appmsg "")  
  
**漏洞详情:**  
Apache CloudStack是一个开源的具有高可用性及扩展性的云计算平台,同时是一个开源云计算解决方案,Apache CloudStack集成API服务允许运行其未经身份验证的API服务器（通常在通过integration.api.port全局设置配置和启用时使用8096端口）进行内部门户集成和测试。默认情况下,集成API服务端口处于禁用状态,并且当integration.api.port设置为0或负数时,认为该端口处于禁用状态。由于不正确的初始化逻辑,当其端口值设置为0（默认值）时，集成API服务将侦听随机端口,能够访问CloudStack管理网络的攻击者可以扫描并找到随机化的集成API服务端口,并利用它执行未经授权的管理操作,在CloudStack托管主机上执行远程代码执行,导致CloudStack托管基础设施的机密性、完整性和可用性完全受到破坏。**修复方案:**厂商已发布补丁修复漏洞,用户请尽快更新至安全版本:Apache CloudStack >= 4.18.2.1Apache CloudStack >= 4.19.0.2与此同时,请做好资产自查以及预防工作,以免遭受黑客攻击。**参考链接:**https://lists.apache.org/thread/6l51r00csrct61plkyd3qg3fj99215d1https://cloudstack.apache.org/blog/security-release-advisory-4.19.0.2-4.18.2.1  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
