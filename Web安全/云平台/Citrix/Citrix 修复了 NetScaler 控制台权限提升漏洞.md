---
cve: "CVE-2024-12284"
source: "gelusus/wxvl 公众号漏洞文库"
title: "Citrix 修复了 NetScaler 控制台权限提升漏洞"
product: "NetScaler Console/Agent"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "active"
primary_identifiers: "CVE-2024-12284"
referenced_identifiers: ""
identifier_role: "primary"
source_status: "unknown"
prerequisites: "原文未完整说明身份权限、部署配置和可达性；不能假定匿名、默认开启或所有版本适用。"
side_effects: "原文未完整记录副作用、清理步骤或运行验证；阅读样例不等于获准在真实系统执行。"
id: "vw-51f838b8da8d92454dbe7864"
entity_id: "ve-51f838b8da8d92454dbe7864"
schema_version: "1"
---

# Citrix 修复了 NetScaler 控制台权限提升漏洞

<!-- vulwiki-editorial:start -->
## 校订与适用边界


### 本次正文校订

- 按该篇完整正文及逐篇审阅区分主问题与背景编号，补全结构化主标识；不把标识归属校订等同运行复现。

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- 四产品分支修复范围清晰但未提取元数据
- 认证前提明确，不能归ADC/Gateway默认远程无认证
- 无原始公告URL/具体利用方法
- 自托管影响最小等原文条件解释不清需回源

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

鹏鹏同学  黑猫安全   2025-02-21 06:05  
  
![](../../.resource/remote/2c11dcd461903f8bb54ac407eea8b7836fe206a3517b37f2e5c40cf0009694fb.png "")  
  
Citrix发布了安全更新，以解决一个高危安全漏洞（CVE-2024-12284，CVSS评分8.8），该漏洞影响NetScaler Console（前身为NetScaler ADM）和NetScaler Agent。  
  
此漏洞是权限管理不当，可能在特定条件下允许攻击者提升权限。安全公告指出：“在NetScaler Console（前身为NetScaler ADM）和NetScaler Agent中发现了一个漏洞。” 受影响的版本包括：NetScaler Agent 13.1（低于13.1-56.18）、NetScaler Console 14.1（低于14.1-38.53）、NetScaler Console 13.1（低于13.1-56.18）、NetScaler Agent 14.1（低于14.1-38.53）。  
  
Citrix指出，只有已认证并拥有NetScaler Console访问权限的用户才能利用此漏洞。“该问题源于权限管理不足，可能被已认证的恶意攻击者利用来执行未经授权的命令。但是，只有已认证并拥有NetScaler Console访问权限的用户才能利用此漏洞，因此威胁面仅限于已认证的用户。Cloud Software Group建议将外部身份验证配置为NetScaler Console的最佳实践。”NetScaler发布的安全公告中写道。“此外，对自托管NetScaler Console的潜在影响最小，因为NetScaler Agent已部署的当前前提条件显著降低了影响范围。”   
  
Cloud Software Group通过发布以下版本解决了此漏洞：NetScaler Console 14.1-38.53及更高版本；NetScaler Console 13.1-56.18及13.1的更高版本；NetScaler Agent 14.1-38.53及更高版本；NetScaler Agent 13.1-56.18及13.1的更高版本。建议客户尽快更新其版本，因为没有解决此漏洞的变通方法。  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
