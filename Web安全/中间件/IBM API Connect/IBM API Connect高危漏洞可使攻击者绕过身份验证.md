---
cve: "CVE-2025-13915"
source: "gelusus/wxvl 公众号漏洞文库"
title: "IBM API Connect高危漏洞可使攻击者绕过身份验证"
product: "IBM API Connect"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "active"
primary_identifiers: "CVE-2025-13915"
referenced_identifiers: ""
identifier_role: "primary"
source_status: "unknown"
prerequisites: "原文未完整说明身份权限、部署配置和可达性；不能假定匿名、默认开启或所有版本适用。"
side_effects: "原文未完整记录副作用、清理步骤或运行验证；阅读样例不等于获准在真实系统执行。"
id: "vw-2cc04900c8d61400e0ba5bc2"
entity_id: "ve-2cc04900c8d61400e0ba5bc2"
schema_version: "1"
---

# IBM API Connect高危漏洞可使攻击者绕过身份验证

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 证据范围：仅风险新闻，没有根因/受影响组件级别细节或独立PoC，不能从CVSS推导所有后端全面被控制。

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- CWE-305并不意为主流身份验证机制，应为主弱点身份验证绕过语义
- 9.8属Critical但不是CVSS数值最高10.0，最高等级应区别最高分
- 影响10.0.8.0但修复步骤从.1起，.0升级路径遗漏
- 未给IBM公告、iFix编号和下载直链，门户自注册缓解是否充分待官方核对
- 数日必须完成修复及大规模自动化威胁为作者建议，非已证实利用态势
- 多余表格字样、HTML样式噪声

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

 网安百色   2026-01-02 11:04  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/1QIbxKfhZo5n7ss8dnaic2VeRZgwEficrdbOpfLIIuOnXn5c1CibQxWm9ZVSq5icAWd8pFRLbzfsUnnknLuickTbqMQ/640?wx_fmt=jpeg&from=appmsg "")  
  
IBM近日披露其API Connect平台存在严重身份验证绕过漏洞（CVE-2025-13915），该漏洞被评定为CVSS最高风险等级9.8分（Critical）。漏洞成因为主流身份验证机制缺陷（CWE-305），攻击者无需用户交互或特殊权限即可实施攻击。  
## 受影响版本  
- IBM API Connect 10.0.8.0至10.0.8.5  
- IBM API Connect 10.0.11.0  
表格  
  
<table><thead><tr style="-webkit-font-smoothing: antialiased;"><th style="-webkit-font-smoothing: antialiased;"><strong style="-webkit-font-smoothing: antialiased;"><span style="-webkit-font-smoothing: antialiased;"><span leaf="">字段</span></span></strong></th><th style="-webkit-font-smoothing: antialiased;"><strong style="-webkit-font-smoothing: antialiased;"><span style="-webkit-font-smoothing: antialiased;"><span leaf="">值</span></span></strong></th></tr></thead><tbody><tr style="-webkit-font-smoothing: antialiased;"><td style="-webkit-font-smoothing: antialiased;"><span style="-webkit-font-smoothing: antialiased;"><span leaf="">CVE编号</span></span></td><td style="-webkit-font-smoothing: antialiased;"><span style="-webkit-font-smoothing: antialiased;"><span leaf="">CVE-2025-13915</span></span></td></tr><tr style="-webkit-font-smoothing: antialiased;"><td style="-webkit-font-smoothing: antialiased;"><span style="-webkit-font-smoothing: antialiased;"><span leaf="">漏洞名称</span></span></td><td style="-webkit-font-smoothing: antialiased;"><span style="-webkit-font-smoothing: antialiased;"><span leaf="">IBM API Connect身份验证绕过漏洞</span></span></td></tr><tr style="-webkit-font-smoothing: antialiased;"><td style="-webkit-font-smoothing: antialiased;"><span style="-webkit-font-smoothing: antialiased;"><span leaf="">CVSS版本</span></span></td><td style="-webkit-font-smoothing: antialiased;"><span style="-webkit-font-smoothing: antialiased;"><span leaf="">CVSS v3.1</span></span></td></tr><tr style="-webkit-font-smoothing: antialiased;"><td style="-webkit-font-smoothing: antialiased;"><span style="-webkit-font-smoothing: antialiased;"><span leaf="">CVSS基础评分</span></span></td><td style="-webkit-font-smoothing: antialiased;"><span style="-webkit-font-smoothing: antialiased;"><span leaf="">9.8（Critical）</span></span></td></tr></tbody></table>## 漏洞风险分析  
  
远程攻击者可利用此漏洞完全绕过平台身份验证机制，在无需凭证的情况下获得未授权访问权限。攻击仅需基础网络连接，无需复杂配置或用户配合。  
  
作为企业级API管理核心组件，API Connect负责处理API流量的身份验证、访问控制和安全策略。该漏洞可能导致后端系统、敏感数据及业务逻辑暴露于未授权访问风险中，造成机密性、完整性及可用性的全面破坏。  
## 修复建议  
1. **立即升级**  
：  
1. 10.0.8版本用户：应用针对10.0.8.1至10.0.8.5的临时修复补丁（iFix）  
1. 10.0.11版本用户：部署对应安全更新  
1. **临时缓解措施**  
：  
1. 禁用开发者门户的自服务注册功能，减少攻击面（但无法彻底消除漏洞）  
## 安全响应建议  
  
鉴于漏洞的高危等级和易利用性，建议：  
- 优先修复生产环境中暴露关键业务服务的API Connect部署  
- 立即清点受影响实例清单并启动补丁管理流程  
- 在数日内完成修复（而非常规的数周周期）  
- 审核API访问日志，排查异常身份验证模式  
IBM官方支持门户已提供详细升级指南和下载链接。安全团队应视此漏洞为最高优先级处理事项，防范大规模自动化攻击风险。  
  
本公众号所载文章为本公众号原创或根据网络搜索下载编辑整理，文章版权归原作者所有，仅供读者学习、参考，禁止用于商业用途。因转载众多，无法找到真正来源，如标错来源，或对于文中所使用的图片、文字、链接中所包含的软件/资料等，如有侵权，请跟我们联系删除，谢谢！  
  
![图片](https://mmbiz.qpic.cn/mmbiz_jpg/1QIbxKfhZo5lNbibXUkeIxDGJmD2Md5vKicbNtIkdNvibicL87FjAOqGicuxcgBuRjjolLcGDOnfhMdykXibWuH6DV1g/640?wx_fmt=other&from=appmsg&wxfrom=5&wx_lazy=1&wx_co=1&randomid=p6hk1x4r&tp=webp#imgIndex=1 "")  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
