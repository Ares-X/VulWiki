---
cve: "CVE-2025-3125"
source: "gelusus/wxvl 公众号漏洞文库"
title: "漏洞预警 | WSO2任意文件上传漏洞"
product: "WSO2 CarbonAppUploader and affected WSO2 product families"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "active"
primary_identifiers: "CVE-2025-3125"
referenced_identifiers: ""
identifier_role: "primary"
prerequisites: "CarbonAppUploader management-service access; authentication/role requirements absent"
source_status: "unknown"
side_effects: "原文未完整记录副作用、清理步骤或运行验证；阅读样例不等于获准在真实系统执行。"
id: "vw-03a2e51decbcf2e531484b4c"
entity_id: "ve-03a2e51decbcf2e531484b4c"
schema_version: "1"
---

# 漏洞预警 | WSO2任意文件上传漏洞

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 适用前提：CarbonAppUploader management-service access; authentication/role requirements absent
- 证据范围：Brief advisory shell names eight product families and an upload-to-code-execution impact, but provides no reproducer or version boundaries.

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- Affected products have no versions or patch levels
- Authentication and required privileges omitted
- Claims public PoC without linking it
- Generic vendor homepage is not a vulnerability advisory or patch reference
- Do not merge with CVE-2022-29464: different upload component and identity

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

浅安
                    浅安  浅安安全   2026-01-27 00:00  
  
**0x00 漏洞编号**  
- # CVE-2025-3125  
  
**0x01 危险等级**  
- 高危  
  
**0x02 漏洞概述**  
  
WSO2 API Manager是一套API生命周期管理解决方案，WSO2 Identity Server是一款身份认证服务器，WSO2 API Control Plane是一个控制面板。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/7stTqD182SX3cS10b2cf8361nD7jcY7EATLvkLyzRdBDvAibvJ9EWSjUKRFhrcoJwsELnfmLXBRt3zDwu8T85yA/640?wx_fmt=png&from=appmsg "")  
  
**0x03 漏洞详情**  
###   
  
**CVE-2025-3125**  
  
**漏洞类型：**  
文件上传****  
  
**影响：**  
上传恶意文件  
  
  
****  
  
**简述：**  
WSO2多款产品存在任意文件上传漏洞，由于其CarbonAppUploader管理服务端点输入验证不当，攻击者可利用该漏洞进行远程代码执行。  
  
**0x04 影响版本**  
- WSO2 API Manager  
  
- WSO2 Identity Server  
  
- WSO2 Identity Server as Key Manager  
  
- WSO2 Open Banking IAM  
  
- WSO2 Traffic Manager  
  
- WSO2 Universal Gateway  
  
- WSO2 API Control Plane  
  
- WSO2 Enterprise Integrator  
  
**0x05****POC状态**  
- 已公开  
  
**0x06****修复建议**  
  
**目前官方已发布漏洞修复版本，建议用户升级到安全版本****：**  
  
https://wso2.com/  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
