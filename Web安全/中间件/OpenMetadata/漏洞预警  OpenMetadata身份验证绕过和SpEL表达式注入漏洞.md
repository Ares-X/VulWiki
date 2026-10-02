---
cve: "CVE-2024-28255; CVE-2024-28253; CVE-2024-28847; CVE-2024-28254; CVE-2024-28848"
source: "gelusus/wxvl 公众号漏洞文库"
title: "漏洞预警 | OpenMetadata身份验证绕过和SpEL表达式注入漏洞"
product: "OpenMetadata JWT认证及SpEL表达式处理"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "active"
primary_identifiers: "CVE-2024-28255; CVE-2024-28253; CVE-2024-28847; CVE-2024-28254; CVE-2024-28848"
referenced_identifiers: ""
identifier_role: "primary"
verification_source: "https://securitylab.github.com/advisories/GHSL-2023-235_GHSL-2023-237_Open_Metadata/"
source_status: "unknown"
prerequisites: "原文未完整说明身份权限、部署配置和可达性；不能假定匿名、默认开启或所有版本适用。"
side_effects: "原文未完整记录副作用、清理步骤或运行验证；阅读样例不等于获准在真实系统执行。"
id: "vw-4de8d9ef18c5a59f4753dc66"
entity_id: "ve-4de8d9ef18c5a59f4753dc66"
schema_version: "1"
---

# 漏洞预警 | OpenMetadata身份验证绕过和SpEL表达式注入漏洞

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 证据范围：五个独立入口/根因均主实体，正文正确分认证绕过和四个SpEL，但meta只留首个。不能自动推定四个表达式入口都能与绕过无认证组合。

### 已有来源支持的更正

- 已核尾部五CVE入口映射；源网页标题28845为其自身笔误而正文28847，不应反改本文正确28847

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- 原始研究指出有些路径依赖getUserPrincipal，绕过后为null而NPE，不能泛称所有端点都成功执行
- 修复<1.2.4与28253<1.3.1分组有价值，但修复只仓库首页缺release直链
- 标题/粗体/空行污染需清理

### 核验来源

- https://securitylab.github.com/advisories/GHSL-2023-235_GHSL-2023-237_Open_Metadata/

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

浅安  浅安安全   2024-04-20 09:02  
  
**0x00 漏洞编号**  
- #   
  
CVE-2024-28255  
  
- CVE-2024-28253  
  
- CVE-2024-28847  
  
- CVE-2024-28254  
  
- CVE-2024-28848  
  
**0x01 危险等级**  
- 高危  
  
**0x02 漏洞概述**  
  
OpenMetadata是一个用于数据治理的一体化平台，可进行数据发现、数据沿袭、数据质量、可观察性、治理和团队协作等。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/7stTqD182SUyXyDV9WptCdlurQNfUVMET8SbGchEezialicDp2IJdkGa0uWHR04e0ibIUSrFEs1NSdGXAe3kJuEbg/640?wx_fmt=png&from=appmsg "")  
  
**0x03 漏洞详情**  
###   
###   
  
**CVE-2024-28255**  
  
**漏洞类型：**  
身份验证绕过  
  
**影响：**  
  
  
获取敏感信息  
  
  
**简述：**  
OpenMetadata中存在身份验证绕过漏洞，当请求的路径包含任何EXCLUDED_ENDPOINTS的端点时，过滤器将返回而不验证JWT，威胁者可构造恶意路径匹配排除的端点导致在没有JWT验证的情况下进行处理，从而导致绕过身份验证机制并访问任意端点。  
  
**CVE-2024-28253、CVE-2024-28847、CVE-2024-28254、CVE-2024-28848**  
  
**漏洞类型：**  
SpEL表达式注入  
  
**影响：**  
  
  
任意命令执行  
  
  
**简述：**  
OpenMetadata中存在多个SpEL表达式注入漏洞，威胁者可利用这些漏洞造成任意命令执行或远程代码执行。  
###   
  
**0x04 影响版本**  
  
CVE-2024-28847、CVE-2024-28848、CVE-2024-28254、CVE-2024-28255  
- OpenMetadata < 1.2.4  
  
CVE-2024-28253  
- OpenMetadata < 1.3.1  
  
**0x05****POC**  
  
  
https://securitylab.github.com/advisories/GHSL-2023-235_GHSL-2023-237_Open_Metadata/  
  
https://github.com/open-metadata/OpenMetadata/security/advisories/GHSA-6wx7-qw5p-wh84  
  
https://github.com/open-metadata/OpenMetadata/security/advisories/GHSA-7vf4-x5m2-r6gr  
  
**仅供安全研究与学习之用，若将工具做其他用途，由使用者承担全部法律及连带责任，作者及发布****者**  
**不承担任何法律及连带责任。**  
  
**0x06****修复建议**  
  
**目前官方已发布漏洞修复版本，建议用户升级到安全版本****：**  
  
https://github.com/open-metadata/OpenMetadata  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
