---
cve: "CVE-2026-67401"
source: "gelusus/wxvl 公众号漏洞文库"
title: "漏洞预警 | cPanel&WHM SQL注入漏洞"
product: "cPanel/WHM/WP2"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "active"
primary_identifiers: "CVE-2026-67401"
referenced_identifiers: ""
identifier_role: "primary"
prerequisites: "Authenticated cPanel account with mailpermissions;branch-specific build thresholds listed"
source_status: "unknown"
side_effects: "原文未完整记录副作用、清理步骤或运行验证；阅读样例不等于获准在真实系统执行。"
id: "vw-e8ae9067745c3fea115c95fd"
entity_id: "ve-e8ae9067745c3fea115c95fd"
schema_version: "1"
---

# 漏洞预警 | cPanel&WHM SQL注入漏洞

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 适用前提：Authenticated cPanel account with mailpermissions;branch-specific build thresholds listed
- 证据范围：SQLi->filecreate->rootRCE asserted, no endpoint/PoC link despite publicPoC status

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- Flat < version list makes allbranches ambiguous;use branchbounds and separateWP2product
- Impact field says sensitiveinfo but narrative claimsrootRCE;represent chain and necessaryconditions
- No primary advisory/patch/PoC link for exactbuilds
- Correct version 'cPanel&WHM<WP2' type mixing

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

浅安
                    浅安  浅安安全   2026-09-17 00:00  
  
**0x00 漏洞编号**  
- # CVE-2026-67401  
  
**0x01 危险等级**  
- 高危  
  
**0x02 漏洞概述**  
  
cPanel&WHM是全球主流的LinuxWeb托管控制面板。  
  
![图片](../../.resource/remote/eda23b428d1d20006e304422dcc321c8ab5abcd05a24a4a7a695f5e9849984d4.webp "")  
  
**0x03 漏洞详情**  
  
**CVE-2026-67401**  
  
**漏洞类型：**  
SQL注入  
  
**影响：**  
获取敏感信息  
  
**简述：**  
cPanel&WHM存在SQL注入漏洞，持有邮件相关权限的已认证cPanel账户可注入恶意SQL语句，在服务器上创建任意文件，该任意文件创建能力可进一步导致以root身份执行代码，攻击者最终获得服务器完全控制权。  
  
**0x04 影响版本**  
- cPanel&WHM < v11.110.0.143  
  
- cPanel&WHM < v11.134.0.55  
  
- cPanel&WHM < v11.136.0.39  
  
- cPanel&WHM < v11.138.0.4  
  
- cPanel&WHM < WP2: v11.138.1.9  
  
**0x05****POC状态**  
- 已公开  
  
**0x06****修复建议**  
  
**目前官方已发布漏洞修复版本，建议用户升级到安全版本****：**  
  
https://www.cpanel.net/  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
