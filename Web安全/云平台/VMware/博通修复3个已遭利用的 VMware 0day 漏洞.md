---
source: "gelusus/wxvl 公众号漏洞文库"
title: "博通修复3个已遭利用的 VMware 0day 漏洞"
product: "VMware ESXi Workstation Fusion"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
source_status: "unknown"
prerequisites: "原文未完整说明身份权限、部署配置和可达性；不能假定匿名、默认开启或所有版本适用。"
side_effects: "原文未完整记录副作用、清理步骤或运行验证；阅读样例不等于获准在真实系统执行。"
id: "vw-f2798b994f0850574cd5c37a"
entity_id: "ve-f2798b994f0850574cd5c37a"
schema_version: "1"
---

# 博通修复3个已遭利用的 VMware 0day 漏洞

<!-- vulwiki-editorial:start -->
## 校订与适用边界


### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- 三个主CVE未提取
- 22225任意内核写被写成任意文件写，类型明确错
- 已经在野与无攻击信息应指无公开细节非无利用
- 原文链接指向Windows/Cisco新闻与本文不符
- 缺版本补丁矩阵

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

Sergiu Gatlan  代码卫士   2025-03-05 18:15  
  
![](../../.resource/remote/afc2fa5611a63e89ebec625ecc33d28c5dcdb706b6fbdabb79f7c1e8982068c0.gif "")  
  
   
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
**今天，博通发布安全公告提醒称 VMware 的三个0day 漏洞已遭在野利用。**  
  
这些漏洞是CVE-2025-22224、CVE-2025-22225和CVE-2025-22226，影响 VMware ESXi、Workstation 和 Fusion。受影响产品已获得补丁，但不存在应变措施。  
  
CVE-2025-22224 是一个严重的VMCI 堆溢出漏洞，影响 VMware ESXi 和 Worksation，可导致在虚拟机上拥有本地管理员权限的攻击者“作为在主机上运行的虚拟机的VMX进程执行代码”。  
  
CVE-2025-22225影响VMware ESXi，是一个高危的任意文件写漏洞，可导致在VMX 进程中拥有权限的攻击者“触发任意内核写，导致沙箱逃逸”。  
  
CVE-2025-22226影响VMware ESXi、Workstation 和 Fusion，是因HGFS 组件中界外读漏洞引起的高危信息泄露漏洞，可导致拥有虚拟机管理员权限的攻击者泄露VMX 进程中的内存。  
  
截至本文发布前，不存在利用这些0day漏洞的攻击的信息。  
  
博通在2023年收购VMware，该公司提到利用这些漏洞要求权限提升，也就是说攻击者获得对受害者系统的初始访问权限后，可能会利用这些漏洞发动更具针对性的攻击活动。这一理论在问答文档中得到佐证，博通提到这些0day漏洞可导致虚拟机逃逸。  
  
博通解释称，“当攻击者已经攻陷了虚拟机的guest OS 并获得提升后的访问权限（管理员或root）时，可转移到管理程序本身。”这些漏洞由微软威胁情报中心报送，不过微软目前尚未对此置评。  
  
威胁行动者利用VMware 产品漏洞的情况并不鲜见。CISA 发布的必须清单中包含了26个VMware 漏洞，不过今天公布的这三个0day漏洞并不包含在内。必修清单公认是不完整的，因此实际的漏洞数量可能会更多。  
  
  
  
代码卫士试用地址：  
https://codesafe.qianxin.com  
  
开源卫士试用地址：https://oss.qianxin.com  
  
  
  
  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[VMware 修复 Aria Operations 中的多个高危漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247521645&idx=2&sn=3a85491541969226b45d2bca18f4373b&scene=21#wechat_redirect)  
  
  
[补丁不给力，VMware vCenter 严重RCE漏洞遭利用](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247521523&idx=1&sn=286f99df03f25ebd1cb1fb497f991b21&scene=21#wechat_redirect)  
  
  
[关于VMware vCenter Server存在堆溢出漏洞的安全公告](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247521255&idx=2&sn=96000770c62b8decfa9e07a493e63e88&scene=21#wechat_redirect)  
  
  
[VMware 修复HCX 平台上可导致RCE的高危SQLi 漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247521136&idx=2&sn=092bf2813ecefa63156a83b9d8eab160&scene=21#wechat_redirect)  
  
  
[博通修复 VMware vCenter Server 中的严重RCE漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247520848&idx=2&sn=d95814f9037c7711dfcb09cd0e590f0c&scene=21#wechat_redirect)  
  
  
  
  
  
**原文链接**  
  
https://www.bleepingcomputer.com/news/security/cisa-tags-windows-and-cisco-vulnerabilities-as-actively-exploited/  
  
  
题图：  
Pixabay   
License  
  
****  
**本文由奇安信编译，不代表奇安信观点。转载请注明“转自奇安信代码卫士 https://codesafe.qianxin.com”。**  
  
  
  
  
![](../../.resource/remote/2c03ce3cc6bb81bca85bd412ed60e93c4bc0a295a1fc9d3739d8aca43497fbb4.jpg "")  
  
![](../../.resource/remote/b33054170f5acbf0023711f517b5bee9799a2f57b155a774d3945e6d78184e63.jpg "")  
  
**奇安信代码卫士 (codesafe)**  
  
国内首个专注于软件开发安全的产品线。  
  
   ![](../../.resource/remote/8a5c84b98d9b52b1d4f4306180ec26c9aa65342b326b5b98ad2f097b488152f4.gif "")  
  
   
觉得不错，就点个 “  
在看  
” 或 "  
赞  
” 吧~  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
