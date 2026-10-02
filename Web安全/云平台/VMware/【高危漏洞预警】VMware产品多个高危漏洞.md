---
cve: "CVE-2025-41236; CVE-2025-41237; CVE-2025-41238"
source: "gelusus/wxvl 公众号漏洞文库"
title: "【高危漏洞预警】VMware产品多个高危漏洞"
product: "VMware ESXi/Workstation/Fusion"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "active"
primary_identifiers: "CVE-2025-41236; CVE-2025-41237; CVE-2025-41238"
referenced_identifiers: ""
identifier_role: "primary"
source_status: "unknown"
prerequisites: "原文未完整说明身份权限、部署配置和可达性；不能假定匿名、默认开启或所有版本适用。"
side_effects: "原文未完整记录副作用、清理步骤或运行验证；阅读样例不等于获准在真实系统执行。"
id: "vw-c68f750de20a4d560f8135ed"
entity_id: "ve-c68f750de20a4d560f8135ed"
schema_version: "1"
---

# 【高危漏洞预警】VMware产品多个高危漏洞

<!-- vulwiki-editorial:start -->
## 校订与适用边界


### 本次正文校订

- 按该篇完整正文及逐篇审阅区分主问题与背景编号，补全结构化主标识；不把标识归属校订等同运行复现。

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- 元数据只有41236漏41237/41238
- ESXi7.0U3n/U3b及Workstation17/16与2025修复公告映射高度可疑，须对VMSA2025-0013矩阵核实
- VMware拼写混西里尔同形字符影响搜索
- 监视资源异常不能作为漏洞存在性检测
- 缺各CVE具体固定版本与来宾管理员前提

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

cexlife  飓风网络安全   2025-07-17 12:44  
  
![](https://mmbiz.qpic.cn/mmbiz_png/ibhQpAia4xu01SK4zK61JZc8IMZsTsmbj6o5aM6Ag42ymzE7FckgbsLDDTZaZ9FSoiaKh2Dra9XspHMjP1RzdSHfw/640?wx_fmt=png&from=appmsg "")  
  
1.VMware ESXi、Workstation和Fusion VMXNET3虚拟网络适配器整数溢出漏洞(CVE-2025-41236)   
  
漏洞描述:  
  
VMԝаrе ESXi、Wоrkѕtаtiоn和Fuѕiоn是VMԝаrе公司提供的虚拟化软件平台,它们允许用户在单一物理机器上创建和运行多个虚拟机,VMXNET3 是这些虚拟化软件中使用的虚拟网络适配器,该漏洞存在于VMXNET3虚拟网络适配器中,由于整数溢出问题使得具有本地管理权限的恶意行为者可能在主机上执行代码。  
  
影响产品:  
  
VMware ESXi < 7.0 U3n,VMware Workstation < 17.x,VMware Fusion < 13.x   
  
检测方法:  
  
检查 VMware ESXi、Workstation 和 Fusion 的版本，确认是否使用了受影响的 VMXNET3 虚拟网络适配器  
  
修复建议:  
  
补丁名称:  
  
VMSA-2025-0013：VMԝаｒе ESXi、Wоrkѕtаtiоn、Fuѕiоn和Tооlѕ更新解决了多个漏洞-登录官方门户更新对应产品的修复版本  
  
文件链接:  
  
https://support.broadcom.com/group/ecx/productfiles?displayGroup=VMware%20Cloud%20Foundation%209&release=9.0.0.0&os=&servicePk=&language=EN&groupId=529537&viewGroup=true  
  
https://support.broadcom.com/group/ecx/productfiles?displayGroup=VMware%20vSphere%20Foundation%209&release=9.0.0.0&os=&servicePk=&language=EN&groupId=529542&viewGroup=true  
  
https://support.broadcom.com/web/ecx/solutiondetails?patchId=15938  
  
https://support.broadcom.com/web/ecx/solutiondetails?patchId=15940  
  
https://support.broadcom.com/group/ecx/productdownloads?subfamily=VMware%20Fusion&freeDownloads=true  
  
https://knowledge.broadcom.com/external/article?legacyId=88287  
  
https://support.broadcom.com/group/ecx/productfiles?subFamily=VMware%20Tools&displayGroup=VMware%20Tools%2013.x&release=13.0.1.0&os=&servicePk=&language=EN&freeDownloads=true   
  
  
2.VMware ESXi、Workstation和Fusion VMCI越界写入漏洞(CVE-2025-41237)   
  
漏洞描述:  
  
VMԝаrе ESXi、Wоrkѕtаtiоn和Fuѕiоn是VMԝаrе 公司提供的虚拟化软件产品,它们允许用户在单一物理机器上创建和运行多个虚拟机,VMCI（虚拟机通信接口）是这些产品中用于虚拟机之间通信的关键组件,该漏洞存在于VMCI 中由于整数下溢问题恶意行为者可能利用此漏洞在宿主机上执行任意代码。  
  
检测方法:  
  
检查虚拟机是否有异常行为，如异常的网络流量或系统资源使用情况，以及是否有未授权的代码执行迹象。   
  
修复建议:  
  
补丁名称:  
  
VMSA-2025-0013：VMԝаｒе ESXi、Wоrkѕtаtiоn、Fuѕｉоn 和 Tооlѕ 更新解决了多个漏洞— 登录官方门户更新对应产品的修复版本  
  
文件链接:  
  
https://support.broadcom.com/group/ecx/productfiles?displayGroup=VMware%20Cloud%20Foundation%209&release=9.0.0.0&os=&servicePk=&language=EN&groupId=529537&viewGroup=true  
  
https://support.broadcom.com/group/ecx/productfiles?displayGroup=VMware%20vSphere%20Foundation%209&release=9.0.0.0&os=&servicePk=&language=EN&groupId=529542&viewGroup=true  
  
https://support.broadcom.com/web/ecx/solutiondetails?patchId=15938  
  
https://support.broadcom.com/web/ecx/solutiondetails?patchId=15940  
  
https://support.broadcom.com/group/ecx/productdownloads?subfamily=VMware%20Fusion&freeDownloads=true  
  
https://knowledge.broadcom.com/external/article?legacyId=88287  
  
https://support.broadcom.com/group/ecx/productfiles?subFamily=VMware%20Tools&displayGroup=VMware%20Tools%2013.x&release=13.0.1.0&os=&servicePk=&language=EN&freeDownloads=true   
  
  
3.VMware|ESXi|PVSCSI控制器堆溢出漏洞(CVE-2025-41238)   
  
漏洞描述:  
  
VMԝаrе ESXi、Wоrkѕtаtiоn和Fuѕiоn是VMԝаrе公司提供的虚拟化软件用于在单一物理服务器上创建和运行多个虚拟机这些软件的PVSCSI 控制器存在一个堆溢出漏洞,该漏洞可能允许具有虚拟机管理权限的恶意行为者利用此漏洞,在宿主机上以虚拟机运行的VMX进程的形式执行代码。  
  
影响产品:  
  
VMware ESXi < 7.0 U3b,VMware Workstation < 16.x.x,VMware Fusion < 12.x.x   
  
检测方法:  
  
检查系统日志,寻找异常的内存访问或越界访问行为,监控宿主机上的异常进程活动  
  
修复建议:  
  
补丁名称:  
  
VMSA-2025-0013：VMԝаｒе ESXi、Wоrkѕtаtiоn、Fuѕｉоn 和 Tооlѕ 更新解决了多个漏洞— 登录官方门户更新对应产品的修复版本  
  
文件链接:  
  
https://support.broadcom.com/group/ecx/productfiles?displayGroup=VMware%20Cloud%20Foundation%209&release=9.0.0.0&os=&servicePk=&language=EN&groupId=529537&viewGroup=true  
  
https://support.broadcom.com/group/ecx/productfiles?displayGroup=VMware%20vSphere%20Foundation%209&release=9.0.0.0&os=&servicePk=&language=EN&groupId=529542&viewGroup=true  
  
https://support.broadcom.com/web/ecx/solutiondetails?patchId=15938  
  
https://support.broadcom.com/web/ecx/solutiondetails?patchId=15940  
  
https://support.broadcom.com/group/ecx/productdownloads?subfamily=VMware%20Fusion&freeDownloads=true  
  
https://knowledge.broadcom.com/external/article?legacyId=88287  
  
https://support.broadcom.com/group/ecx/productfiles?subFamily=VMware%20Tools&displayGroup=VMware%20Tools%2013.x&release=13.0.1.0&os=&servicePk=&language=EN&freeDownloads=true   
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
