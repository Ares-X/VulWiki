---
cve: "CVE-2025-40552; CVE-2025-40554; CVE-2025-40553; CVE-2025-40551; CVE-2025-40537"
source: "gelusus/wxvl 公众号漏洞文库"
title: "太阳风 SolarWinds警告称Web帮助台存在严重的远程代码执行和身份验证绕过漏洞"
product: "SolarWinds Web Help Desk"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "active"
primary_identifiers: "CVE-2025-40552; CVE-2025-40554; CVE-2025-40553; CVE-2025-40551; CVE-2025-40537"
referenced_identifiers: "CVE-2025-26399; CVE-2024-28988; CVE-2024-28986"
identifier_role: "primary"
prerequisites: "按各漏洞区分，文列2026.1修复"
source_status: "unknown"
side_effects: "原文未完整记录副作用、清理步骤或运行验证；阅读样例不等于获准在真实系统执行。"
id: "vw-af55f7c9dd940b8465767d6c"
entity_id: "ve-af55f7c9dd940b8465767d6c"
schema_version: "1"
---

# 太阳风 SolarWinds警告称Web帮助台存在严重的远程代码执行和身份验证绕过漏洞

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 适用前提：按各漏洞区分，文列2026.1修复
- 证据范围：与141报道同批补丁但不同来源；缺40536且缺任何出处链接，补丁历史翻译混乱

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- 元数据仅40552漏其余主漏洞
- 把28986说成补丁绕过，方向与上下文相反，应为28988绕过28986、26399绕过28988
- KEV句子指代模糊，易误认为26399在一年多前已被利用；应明确历史28986
- 今天/9月须绑定2026-01-29报道时点

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

原创 Sergiu Gatlan
                    Sergiu Gatlan  暗镜   2026-01-29 16:00  
  
SolarWinds 发布了安全更新，以修复其 Web Help Desk IT 服务台软件中的关键身份验证绕过和远程命令执行漏洞。  
  
SolarWinds 今天修复的身份验证绕过安全漏洞（追踪编号为CVE-2025-40552和CVE-2025-40554）是由 watchTowr 的 Piotr Bazydlo 报告的，远程未经身份验证的威胁行为者可以利用这些漏洞进行低复杂度的攻击。  
  
Bazydlo 还发现并报告了一个严重的远程代码执行 (RCE) 漏洞 ( CVE-2025-40553 )，该漏洞源于不受信任的数据反序列化弱点，这使得没有权限的攻击者能够在易受攻击的主机上运行命令。  
  
Horizon3.ai 安全研究员 Jimi Sebree报告的第二个 RCE 漏洞（CVE-2025-40551 ）也可能使未经身份验证的攻击者能够远程执行命令。  
  
今天，SolarWinds 还修复了 Sebree 发现的一个高危硬编码凭证漏洞 ( CVE-2025-40537 )，该漏洞在未指明的情况下，可能使低权限的威胁行为者获得对管理功能的未经授权的访问权限。  
  
公司提供了将易受攻击的服务器升级到 Web Help Desk 2026.1 的详细说明，该版本解决了这些安全漏洞。  
  
建议管理员尽快修补设备漏洞，因为黑客经常利用 Web 帮助台的安全漏洞进行攻击。  
  
例如，9 月份，SolarWinds解决了WHD RCE 漏洞的第二个补丁绕过（CVE-2025-26399），该漏洞在一年多前就被CISA标记为在攻击中被积极利用，CISA 将其添加到其被利用的安全漏洞目录中，并命令联邦机构在三周内保护其系统。  
  
当时，SolarWinds 表示，该漏洞是“CVE-2024-28988 的补丁绕过，而 CVE-2024-28986 又是补丁绕过”。  
  
CISA 还指出，Web Help Desk 的一个关键硬编码凭证漏洞在 2024 年 10 月被积极利用，并再次要求政府机构修补其设备。  
  
Web Help Desk (WHD) 被大型企业、医疗机构、教育机构和政府机构广泛用于服务台管理。SolarWinds 表示，其 IT 管理产品在全球拥有超过 30 万客户。  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
