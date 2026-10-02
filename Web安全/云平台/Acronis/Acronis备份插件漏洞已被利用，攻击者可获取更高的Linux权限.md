---
cve: "CVE-2026-87886"
source: "gelusus/wxvl 公众号漏洞文库"
title: "Acronis备份插件漏洞已被利用，攻击者可获取更高的Linux权限"
product: "Acronis Backup cPanel WHM/Plesk插件"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "active"
primary_identifiers: "CVE-2026-87886"
referenced_identifiers: ""
identifier_role: "primary"
source_status: "unknown"
prerequisites: "原文未完整说明身份权限、部署配置和可达性；不能假定匿名、默认开启或所有版本适用。"
side_effects: "原文未完整记录副作用、清理步骤或运行验证；阅读样例不等于获准在真实系统执行。"
id: "vw-10fabc6dc97d7c9d38698ab9"
entity_id: "ve-10fabc6dc97d7c9d38698ab9"
schema_version: "1"
---

# Acronis备份插件漏洞已被利用，攻击者可获取更高的Linux权限

<!-- vulwiki-editorial:start -->
## 校订与适用边界


### 本次正文校订

- 按该篇完整正文及逐篇审阅区分主问题与背景编号，补全结构化主标识；不把标识归属校订等同运行复现。

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- 缺影响/修复版本以及SEC10986原始链接，正文结尾可能截取未全
- 本地低权限条件明确应保留
- cPanel已利用和Plesk未观察须分产品/时间，不能推断所有云服务受影响
- 需要厂商核验CVE和状态

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

原创 ZM
                    ZM  暗镜   2026-09-22 22:00  
  
Acronis 发布了一项紧急安全更新，修复其 Linux 版 cPanel & WHM 备份插件中存在的高危本地权限提升漏洞。该公司确认，攻击者已利用此漏洞对存在漏洞的部署发起了有限的定向攻击。  
  
该漏洞编号为 CVE-2026-87886，被描述为文件权限不安全问题，可能允许本地低权限攻击者在受影响的 Linux 服务器上获得提升的权限。Acronis 已将此漏洞的 CVSS 评分定为 7.8 分（满分 10 分），将其归类为高危漏洞。  
  
该漏洞在 Acronis 安全公告 SEC-10986 中有详细说明，并与 CWE-276 相关，后者指的是不正确的默认权限。文件权限管理不善可能会将敏感文件、脚本、二进制文件或配置数据暴露给不应有权修改或执行这些文件的用户。  
  
根据 CVSS 向量，该漏洞利用需要本地访问权限和低权限，但无需用户交互。成功利用该漏洞会影响机密性、完整性和可用性，并可能使攻击者获得对受感染托管环境的广泛控制权。  
  
CVSS 3.0 向量如下：CVSS:3.0/AV:L/AC:L/PR:L/UI:N/S:U/C:H/I:H/A:H  
  
这表明攻击者一定已经对服务器有了立足之地，可能是通过被入侵的 cPanel 帐户、被盗的凭据、易受攻击的 Web 应用程序或其他本地访问方式。  
  
然而，由于攻击复杂度低且无需用户交互，这种漏洞在共享主机和多租户 Linux 环境中尤其令人担忧。  
  
然该公司已注意到针对 cPanel 和 WHM 部署的 Acronis Backup 插件的漏洞利用，但尚未发现针对 Plesk 环境的任何漏洞利用，尽管底层权限提升问题也影响了其扩展程序。  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
