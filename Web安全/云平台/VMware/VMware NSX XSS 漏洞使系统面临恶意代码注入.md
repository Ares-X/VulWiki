---
cve: "CVE-2025-22243; CVE-2025-22244; CVE-2025-22245"
source: "gelusus/wxvl 公众号漏洞文库"
title: "VMware NSX XSS 漏洞使系统面临恶意代码注入"
product: "VMware NSX"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "active"
primary_identifiers: "CVE-2025-22243; CVE-2025-22244; CVE-2025-22245"
referenced_identifiers: ""
identifier_role: "primary"
source_status: "unknown"
prerequisites: "原文未完整说明身份权限、部署配置和可达性；不能假定匿名、默认开启或所有版本适用。"
side_effects: "原文未完整记录副作用、清理步骤或运行验证；阅读样例不等于获准在真实系统执行。"
id: "vw-d10c3542fb86ee7ac6a7ef36"
entity_id: "ve-d10c3542fb86ee7ac6a7ef36"
schema_version: "1"
---

# VMware NSX XSS 漏洞使系统面临恶意代码注入

<!-- vulwiki-editorial:start -->
## 校订与适用边界


### 本次正文校订

- 按该篇完整正文及逐篇审阅区分主问题与背景编号，补全结构化主标识；不把标识归属校订等同运行复现。

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- 只记录22243漏22244/22245
- 各权限/入口不同不能通用alert当完整PoC
- 浏览器JS执行不等于主机恶意代码注入或必然横向移动
- VMSA与KB只有编号无链接
- 版本表各分支应明确上界，4.2.x与4.2.1.x重叠需按厂商矩阵
- CVE证书/固定版本等机翻术语修订

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

 网安百色   2025-06-06 11:44  
  
Broadcom 发布了针对 VMware NSX 的高严重性安全公告 （VMSA-2025-0012），解决了三个新发现的存储跨站点脚本 （XSS） 漏洞：CVE-2025-22243、CVE-2025-22244 和 CVE-2025-22245。  
  
这些漏洞会影响 NSX Manager UI、网关防火墙和路由器端口组件，如果不进行修补，组织可能会面临潜在的代码注入攻击。  
  
这些漏洞都是由不正确的输入验证引起的，允许经过身份验证的攻击者注入恶意脚本，这些脚本会在其他用户查看受影响的界面时执行。  
  
这些缺陷被归类为“重要”，CVSSv3 基本分数从 5.9 到 7.5 不等，目前没有可用的解决方法。  
## 技术细节和漏洞利用场景  
  
**CVE-2025-22243**  
 会影响 NSX Manager UI，其中具有更改网络设置权限的攻击者可以注入持久性脚本。  
  
当另一个用户访问受损的设置时，恶意代码会在他们的浏览器上下文中执行，这可能会导致会话劫持或数据泄露。  
  
**CVE-2025-22244**  
 以网关防火墙为目标，使攻击者能够修改响应页面以进行 URL 过滤。  
  
每当用户访问过滤的网站时，都可以利用此漏洞执行注入的脚本。  
  
其 CVSSv3 评分为 6.9，反映出在多用户环境中存在中等严重性但存在重大风险。  
  
**CVE-2025-22245**  
会影响路由器端口，特权攻击者可以将脚本注入路由器端口配置。  
  
毫无戒心的管理员或访问这些端口的用户可能会触发恶意负载，CVSSv3 评分为 5.9。  
  
所有三个漏洞都归类为 CWE-79（网页生成期间输入的不当中和），这是 XSS 缺陷的常见类别。  
  
**XSS 有效负载示例：**  
```
<script>alert('XSS Exploit');</script>
```  
  
如果将此类有效负载注入到易受攻击的字段中，它将在查看受影响配置页面的任何用户的浏览器中执行。  
## 补丁矩阵和修复步骤  
  
Broadcom 建议立即修补，因为没有有效的解决方法。  
  
下表总结了受影响的产品、CVE、严重性和修复版本：  
  
<table><thead><tr style="box-sizing: border-box;"><th style="box-sizing: border-box;padding: 2px 8px;text-align: left;border: 1px solid;word-break: break-word;"><section><span leaf="">产品/平台</span></section></th><th style="box-sizing: border-box;padding: 2px 8px;text-align: left;border: 1px solid;word-break: break-word;"><section><span leaf="">受影响的版本</span></section></th><th style="box-sizing: border-box;padding: 2px 8px;text-align: left;border: 1px solid;word-break: break-word;"><section><span leaf="">CVE 证书</span></section></th><th style="box-sizing: border-box;padding: 2px 8px;text-align: left;border: 1px solid;word-break: break-word;"><section><span leaf="">CVSSv3 分数</span></section></th><th style="box-sizing: border-box;padding: 2px 8px;text-align: left;border: 1px solid;word-break: break-word;"><section><span leaf="">固定版本/补丁</span></section></th></tr></thead><tbody><tr style="box-sizing: border-box;"><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;"><section><span leaf="">VMware NSX</span></section></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;"><section><span leaf="">4.2.x 版本</span></section></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;"><section><span leaf="">22243, 22244, 22245</span></section></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;"><section><span leaf="">7.5, 6.9, 5.9</span></section></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;"><section><span leaf="">4.2.2.1</span></section></td></tr><tr style="box-sizing: border-box;"><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;"><section><span leaf="">VMware NSX</span></section></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;"><section><span leaf="">4.2.1.x</span></section></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;"><section><span leaf="">22243, 22244, 22245</span></section></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;"><section><span leaf="">7.5, 6.9, 5.9</span></section></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;"><section><span leaf="">4.2.1.4</span></section></td></tr><tr style="box-sizing: border-box;"><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;"><section><span leaf="">VMware NSX</span></section></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;"><section><span leaf="">4.1.x 和 4.0.x</span></section></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;"><section><span leaf="">22243, 22244, 22245</span></section></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;"><section><span leaf="">7.5, 6.9, 5.9</span></section></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;"><section><span leaf="">4.1.2.6</span></section></td></tr><tr style="box-sizing: border-box;"><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;"><section><span leaf="">VMware 云基础</span></section></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;"><section><span leaf="">5.2.x 版</span></section></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;"><section><span leaf="">22243, 22244, 22245</span></section></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;"><section><span leaf="">7.5, 6.9, 5.9</span></section></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;"><section><span leaf="">NSX 4.2.2.1 的异步修补程序</span></section></td></tr><tr style="box-sizing: border-box;"><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;"><section><span leaf="">VMware 云基础</span></section></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;"><section><span leaf="">5.1.x、5.0.x</span></section></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;"><section><span leaf="">22243, 22244, 22245</span></section></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;"><section><span leaf="">7.5, 6.9, 5.9</span></section></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;"><section><span leaf="">NSX 4.1.2.6 的异步修补程序</span></section></td></tr><tr style="box-sizing: border-box;"><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;"><section><span leaf="">VMware Telco Cloud Infrastructure</span></section></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;"><section><span leaf="">3.x、2.x</span></section></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;"><section><span leaf="">22243, 22244, 22245</span></section></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;"><section><span leaf="">7.5, 6.9, 5.9</span></section></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;"><section><span leaf="">KB396986</span></section></td></tr><tr style="box-sizing: border-box;"><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;"><section><span leaf="">VMware Telco 云平台</span></section></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;"><section><span leaf="">5.x、4.x、3.x</span></section></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;"><section><span leaf="">22243, 22244, 22245</span></section></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;"><section><span leaf="">7.5, 6.9, 5.9</span></section></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;"><section><span leaf="">KB396986</span></section></td></tr></tbody></table>  


要进行修复，管理员必须升级到上面列出的修复版本。  
  
对于 VMware Cloud Foundation 和 Telco Cloud Platform，Broadcom 知识库中提供了异步修补指南。  
## 行业响应和最佳实践  
  
安全研究人员 Dawid Jonienc 和 Łukasz Rupala 因负责任地披露这些漏洞而受到赞誉。  
  
该公告强调了及时补丁管理的重要性，尤其是对于 NSX 等关键基础设施组件，它们支撑着企业环境中的网络虚拟化和安全性。  
  
运行受影响版本的组织应优先考虑补丁部署并审查访问控制，以最大限度地降低被利用的风险。  
  
由于没有解决方法，延迟更新会使系统容易受到 XSS 攻击，这些攻击可能会危及管理会话或促进网络内的横向移动。  
  
有关更多详细信息，管理员可以查阅 VMware 的官方公告 （VMSA-2025-0012） 和引用的 CVE 条目，了解技术故障和补丁说明。  
  
**免责声明**  
：  
  
本公众号所载文章为本公众号原创或根据网络搜索下载编辑整理，文章版权归原作者所有，仅供读者学习、参考，禁止用于商业用途。因转载众多，无法找到真正来源，如标错来源，或对于文中所使用的图片、文字、链接中所包含的软件/资料等，如有侵权，请跟我们联系删除，谢谢！  
  
![图片](../../.resource/remote/cc9dd7fb5b24fc27ce16bb1e9985b3b85c989e00551dbfad66f86d1e7499d3f3.webp "")  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
