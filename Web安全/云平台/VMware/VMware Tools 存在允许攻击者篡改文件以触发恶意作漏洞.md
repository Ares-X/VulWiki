---
cve: "CVE-2025-22247"
source: "gelusus/wxvl 公众号漏洞文库"
title: "VMware Tools 存在允许攻击者篡改文件以触发恶意作漏洞"
product: "VMware Tools/open-vm-tools"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "active"
primary_identifiers: "CVE-2025-22247"
referenced_identifiers: ""
identifier_role: "primary"
source_status: "unknown"
prerequisites: "原文未完整说明身份权限、部署配置和可达性；不能假定匿名、默认开启或所有版本适用。"
side_effects: "原文未完整记录副作用、清理步骤或运行验证；阅读样例不等于获准在真实系统执行。"
id: "vw-ace876bd5b20686b0d1cc27a"
entity_id: "ve-ace876bd5b20686b0d1cc27a"
schema_version: "1"
---

# VMware Tools 存在允许攻击者篡改文件以触发恶意作漏洞

<!-- vulwiki-editorial:start -->
## 校订与适用边界


### 本次正文校订

- 按该篇完整正文及逐篇审阅区分主问题与背景编号，补全结构化主标识；不把标识归属校订等同运行复现。

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- 全文操字丢失并有机翻详/冲击字段
- 补Broadcom公告直链
- 按Windows64/32位和Linux发行版拆分修复范围，不能统一12.5.2
- 来宾内本地文件篡改不等于跨租户或逃逸
- 22224/43590为背景CVE勿混主条目

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

 网安百色   2025-05-13 11:36  
  
VMware Tools 中存在一个中等严重性漏洞，该漏洞可能允许具有有限权限的攻击者在虚拟机中纵文件并触发不安全的作。  
  
该漏洞被跟踪为 CVE-2025-22247，影响 VMware Tools 11.x.x 和 12.x.x 的 Windows 和 Linux 版本，其中 macOS 版本确认不受影响。  
  
由于目前没有解决方法，并且利用这些漏洞可能会损害受影响虚拟机的完整性，因此强烈建议及时修补。  
## CVE-2025-22247：VMware Tools 不安全的文件处理  
  
根据 Broadcom 公告，不安全的文件处理漏洞允许“在客户虚拟机上具有非管理权限的恶意行为者篡改本地文件，从而在该虚拟机中触发不安全的文件作”。  
  
该漏洞的 CVSSv3 基本评分为 6.1，处于中等严重性范围内。Positive Technologies 的安全研究员 Sergey Bliznyuk 因发现该漏洞并向 VMware 报告而受到赞誉。  
  
在今年早些时候解决了其他几个 VMware 漏洞之后，我们又解决了这一最新的安全问题，其中包括影响 VMware ESXi 和 Workstation 的关键 TOCTOU 漏洞 （CVE-2025-22224），该漏洞可能导致越界写入和潜在的代码执行。  
  
在多个租户共享物理基础设施的虚拟化环境中，这种类型的漏洞尤其令人担忧。  
  
即使影响包含在客户机 VM 中，它也可以用作更大的攻击链的一部分，或用于虚拟机中的特权提升。  
  
<table><tbody><tr style="box-sizing: border-box;"><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;"><strong msttexthash="14330498" msthash="68" style="box-sizing: border-box;font-weight: bold;"><span leaf="">风险因素</span></strong></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;"><strong msttexthash="3259074" msthash="69" style="box-sizing: border-box;font-weight: bold;"><span leaf="">详</span></strong></td></tr><tr style="box-sizing: border-box;"><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;"><section><span leaf="">受影响的产品</span></section></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;"><section><span leaf="">VMware Tools 11.x.x、12.x.x （Windows/Linux）</span></section></td></tr><tr style="box-sizing: border-box;"><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;"><section><span leaf="">冲击</span></section></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;"><section><span leaf="">文件篡改允许在来宾 VM 中进行恶意作</span></section></td></tr><tr style="box-sizing: border-box;"><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;"><section><span leaf="">利用先决条件</span></section></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;"><section><span leaf="">来宾 VM 上的非管理权限</span></section></td></tr><tr style="box-sizing: border-box;"><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;"><section><span leaf="">CVSS 3.1 分数</span></section></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;"><section><span leaf="">6.1 （中等）</span></section></td></tr></tbody></table>## 缓解措施  
  
Broadcom 发布了 VMware Tools 版本 12.5.2，以修复 Windows 和 Linux 系统的漏洞。特别是对于 Windows 32 位系统，12.5.2 版本中包含的 VMware Tools 12.4.7 解决了该问题。  
  
Linux 用户应注意，他们各自的 Linux 供应商将分发解决 CVE-2025-22247 的 open-vm-tools 的修复版本，版本可能因 Linux 发行版和供应商而异。  
  
该漏洞会影响企业虚拟化基础架构中通常部署的 VMware 软件。  
  
VMware Tools 是一套实用程序，可增强虚拟机客户机作系统的性能并改进 VM 的管理。  
  
它包括支持提高图形性能、时间同步、剪贴板共享以及主机和来宾计算机之间文件传输功能的驱动程序。  
  
此安全更新是在 2025 年 3 月 VMware Tools 12.5.1 发布仅两个月后发布的，该版本解决了另一个被跟踪为 CVE-2024-43590 的安全漏洞。  
  
**免责声明**  
：  
  
本公众号所载文章为本公众号原创或根据网络搜索下载编辑整理，文章版权归原作者所有，仅供读者学习、参考，禁止用于商业用途。因转载众多，无法找到真正来源，如标错来源，或对于文中所使用的图片、文字、链接中所包含的软件/资料等，如有侵权，请跟我们联系删除，谢谢！  
  
![图片](https://mmbiz.qpic.cn/mmbiz_jpg/1QIbxKfhZo5lNbibXUkeIxDGJmD2Md5vKicbNtIkdNvibicL87FjAOqGicuxcgBuRjjolLcGDOnfhMdykXibWuH6DV1g/640?wx_fmt=other&from=appmsg&wxfrom=5&wx_lazy=1&wx_co=1&tp=webp "")  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
