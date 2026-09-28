---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  NVIDIA NSIGHT Graphics for Linux 漏洞允许代码执行攻击  
 网安百色   2026-01-22 11:23  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/1QIbxKfhZo6UUCdfv40c21Kiakibex2zrEdkJVHWfyfoib7IkLxQvCEBUHUmP18sLSUrI7GQjh8VvlQY3bPEWicv1g/640?wx_fmt=jpeg&from=appmsg "")  
  
NVIDIA NSIGHT Graphics Linux 漏洞  
  
针对 NSIGHT Graphics for Linux 中一个关键漏洞的紧急安全更新，该漏洞可能允许攻击者在受影响系统上执行任意代码。  
  
该漏洞编号为 CVE-2025-33206，被评定为高危（High）级别，CVSS 评分为 7.8。  
  
NVIDIA NSIGHT Graphics for Linux 中的漏洞允许攻击者注入命令。成功利用该漏洞可能导致未经授权的代码执行、权限提升、数据篡改或拒绝服务攻击。  
  
该漏洞需要本地访问和用户交互才能触发。然而，它对开发和图形相关的工作负载构成了重大风险。  
  
<table><thead><tr style="-webkit-font-smoothing: antialiased;"><th style="-webkit-font-smoothing: antialiased;"><span style="-webkit-font-smoothing: antialiased;"><span leaf="">CVE ID</span></span></th><th style="-webkit-font-smoothing: antialiased;"><span style="-webkit-font-smoothing: antialiased;"><span leaf="">CVSS</span></span></th><th style="-webkit-font-smoothing: antialiased;"><span style="-webkit-font-smoothing: antialiased;"><span leaf="">攻击向量</span></span></th><th style="-webkit-font-smoothing: antialiased;"><span style="-webkit-font-smoothing: antialiased;"><span leaf="">影响</span></span></th><th style="-webkit-font-smoothing: antialiased;"><span style="-webkit-font-smoothing: antialiased;"><span leaf="">受影响平台</span></span></th><th style="-webkit-font-smoothing: antialiased;"><span style="-webkit-font-smoothing: antialiased;"><span leaf="">受影响版本</span></span></th></tr></thead><tbody><tr style="-webkit-font-smoothing: antialiased;"><td style="-webkit-font-smoothing: antialiased;"><span style="-webkit-font-smoothing: antialiased;"><span leaf="">CVE-2025-33206</span></span></td><td style="-webkit-font-smoothing: antialiased;"><span style="-webkit-font-smoothing: antialiased;"><span leaf="">7.8</span></span></td><td style="-webkit-font-smoothing: antialiased;"><span style="-webkit-font-smoothing: antialiased;"><span leaf="">本地（Local）</span></span></td><td style="-webkit-font-smoothing: antialiased;"><span style="-webkit-font-smoothing: antialiased;"><span leaf="">代码执行、权限提升、数据篡改、拒绝服务</span></span></td><td style="-webkit-font-smoothing: antialiased;"><span style="-webkit-font-smoothing: antialiased;"><span leaf="">Linux</span></span></td><td style="-webkit-font-smoothing: antialiased;"><span style="-webkit-font-smoothing: antialiased;"><span leaf="">2025.5 之前的所有版本</span></span></td></tr></tbody></table>  
该漏洞源于命令处理中的输入验证不当，归类于 CWE-78（操作系统命令中特殊元素的不当中和）。  
  
拥有本地系统访问权限的攻击者可以构造恶意输入，以逃离预期的命令上下文，并以提升的权限执行任意系统命令。  
  
该攻击需要本地访问和用户交互（UI: R），这意味着攻击者必须诱骗用户执行特定操作。  
  
然而，一旦触发，该漏洞将对机密性、完整性和可用性产生严重影响。  
  
**受影响系统与修复方案**  
  
所有版本低于 2025.5 的 NVIDIA NSIGHT Graphics for Linux 均受影响。运行 NSIGHT Graphics 的组织必须立即升级至 2025.5 或更高版本以修复该漏洞。  
  
用户应立即从 NVIDIA 官方开发者门户下载并安装 NVIDIA NSIGHT Graphics 2025.5。  
  
在部署补丁之前，组织应限制对运行易受攻击版本的系统的本地访问，并实施最小权限原则。  
  
更多详细信息和最新安全公告可在 NVIDIA 官方产品安全页面获取，该页面还提供安全通知的订阅选项。  
  
本公众号所载文章为本公众号原创或根据网络搜索下载编辑整理，文章版权归原作者所有，仅供读者学习、参考，禁止用于商业用途。因转载众多，无法找到真正来源，如标错来源，或对于文中所使用的图片、文字、链接中所包含的软件/资料等，如有侵权，请跟我们联系删除，谢谢！  
  
![图片](https://mmbiz.qpic.cn/mmbiz_jpg/1QIbxKfhZo5lNbibXUkeIxDGJmD2Md5vKicbNtIkdNvibicL87FjAOqGicuxcgBuRjjolLcGDOnfhMdykXibWuH6DV1g/640?wx_fmt=other&from=appmsg&wxfrom=5&wx_lazy=1&wx_co=1&randomid=p6hk1x4r&tp=webp#imgIndex=1 "")  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
