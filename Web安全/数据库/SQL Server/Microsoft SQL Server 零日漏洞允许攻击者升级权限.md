---
cve: "CVE-2026-21262"
source: "gelusus/wxvl 公众号漏洞文库"
title: "Microsoft SQL Server 零日漏洞允许攻击者升级权限"
product: "Microsoft SQL Server"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "active"
primary_identifiers: "CVE-2026-21262"
referenced_identifiers: ""
identifier_role: "primary"
prerequisites: "低权限已认证网络用户；文列2016至2025不同CU/GDR分支"
source_status: "unknown"
side_effects: "原文未完整记录副作用、清理步骤或运行验证；阅读样例不等于获准在真实系统执行。"
id: "vw-e223a9fe4f58a7942369f2db"
entity_id: "ve-e223a9fe4f58a7942369f2db"
schema_version: "1"
---

# Microsoft SQL Server 零日漏洞允许攻击者升级权限

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 适用前提：低权限已认证网络用户；文列2016至2025不同CU/GDR分支
- 证据范围：给出版本KB与MSRC链接，属于公告摘要，未提供PoC；零日、公开披露、不在野利用应保持区分

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- 零日称谓应注明所依据的公开披露/补丁时间，不应推定已有野外攻击
- KB逐项缺可点击原始补丁链接
- 未具体说明必要的显式权限

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

sec随谈
                    sec随谈  sec随谈   2026-03-12 01:36  
  
Microsoft披露了SQL Server中的一个关键零日漏洞，允许经过认证的攻击者将其权限升级到受影响数据库系统的最高管理级别。  
  
该漏洞编号为CVE-2026-21262，于2026年3月10日正式发布，并已公开披露，这对在企业环境中运行SQL Server的组织提出了紧迫的担忧。  
  
该漏洞源于  
Microsoft SQL Server内部  
的不当访问控制（CWE-284），使授权攻击者能够通过网络提升权限。  
  
根据Microsoft的建议，成功利用该漏洞的威胁行为者可能会获得SQL系统管理员权限，这是SQL Server环境中的最高访问权限，从而完全控制数据库实例。  
  
该缺陷的基础评分为8.8，属于重要严重性。攻击向量基于网络，复杂度低，发起时只需低级别权限，且无需用户交互。  
  
其影响涵盖了机密性、完整性和可用性这三个关键安全维度，均被评为高，使该漏洞在数据敏感环境中尤为危险。  
## Microsoft SQL Server 零日漏洞  
  
Microsoft确认该漏洞  
已公开披露，但尚未在实际中被积极利用，可利用性评估为“利用可能性较低”。然而，公开披露的状态显著降低了威胁行为者开发有效利用的门槛。  
  
带有明确权限的认证攻击者可以通过登录 SQL Server 实例，利用不当的访问控制漏洞将会话升级到系统管理员级别来利用漏洞。  
  
这种权限升级攻击在多租户或共享数据库环境中尤其危险，因为低权限用户可能已经拥有合法访问权限。  
  
Microsoft已发布  
涵盖SQL Server 2016至新发布SQL Server 2025的安全更新。管理员应确认当前版本，并相应应用相应的GDR或累积更新（CU）补丁。主要更新包括：  
- **SQL Server 2025**  
：KB 更新 5077466（CU2+GDR）和 5077468（RTM+GDR）  
  
- **SQL Server 2022**  
：KB更新 5077464（CU23+GDR）和5077465（RTM+GDR）  
  
- **SQL Server 2019**  
：KB 更新 5077469（CU32+GDR）和 5077470（RTM+GDR）  
  
- **SQL Server 2017**  
：KB更新5077471和 5077472  
  
- **SQL Server 2016**  
：KB更新 5077473 和 5077474  
  
托管在 Windows Azure（IaaS）上的 SQL Server 实例可以通过 Microsoft Update 或从 Microsoft 下载中心手动下载来接收更新。  
  
鉴于该漏洞已公开披露，安全团队应立即优先进行修补。组织应审计SQL Server用户权限，仅将显式权限限制为受信任账户，并监控数据库日志中的异常权限升级活动。  
  
Microsoft不再支持的版本应升级到支持版本，以便接收此次及未来的安全补丁。  
  
参考链接：  
  
https://msrc.microsoft.com/update-guide/en-US/advisory/CVE-2026-21262  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
