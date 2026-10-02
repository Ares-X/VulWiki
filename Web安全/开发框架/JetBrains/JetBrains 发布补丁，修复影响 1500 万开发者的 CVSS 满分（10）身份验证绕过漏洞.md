---
cve: "CVE-2026-50242"
source: "gelusus/wxvl 公众号漏洞文库"
product: "Hub/YouTrack Server与GoLand"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "CVE-2026-50242; CVE-2026-56142; CVE-2026-53915"
referenced_identifiers: ""
identifier_role: "primary"
identifier_status: "unknown"
title: "JetBrains 发布补丁，修复影响 1500 万开发者的 CVSS 满分（10）身份验证绕过漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：列Hub六分支固定build，YouTrack捆绑版本无独立表；GoLand<2026.1.3"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-3b08f9496c55d783e10d68e0"
entity_id: "ve-3b08f9496c55d783e10d68e0"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：列Hub六分支固定build，YouTrack捆绑版本无独立表；GoLand&lt;2026.1.3

代码与实验材料：无PoC；50242需直接数据库访问、56142低权限账号、53915不可信项目配置，三种前提不同

来源证据范围：JetBrains官方issues-fixed总页，无逐编号链接；利用未发现/PoC未公开是2026-07-02时点

- **适用与权限边界（1）**：攻击前提前后矛盾；依据：先称无需任何预先权限，后明确50242攻击者拥有数据库直接访问权限。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **结论使用边界（2）**：标题夸大暴露量；依据：1500万是全部JetBrains工具用户，正文承认真实暴露为自托管Hub/YouTrack；不能当漏洞影响人数。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **适用与权限边界（3）**：分支和产品版本未准确拆分；依据：早于六个Hub build必须按分支限定，不能统一数值比较；GoLand本地项目执行不能同SSO认证漏洞归一。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

#  JetBrains 发布补丁，修复影响 1500 万开发者的 CVSS 满分（10）身份验证绕过漏洞  
sec随谈
                    sec随谈  sec随谈   2026-07-02 01:23  
  
**摘要**  
  
JetBrains 修复了 Hub、YouTrack 和 GoLand 中的三个安全漏洞。其中最严重的是一个 CVSS 评分为 10 的 JetBrains 身份验证绕过漏洞（CVE-2026-50242）。该公司未发现任何现实世界中被滥用的迹象。  
  
**为何值得关注**  
  
据 JetBrains 自己统计，其工具触及超过 1500 万开发者。这一数字体现了其装机规模，不过此次漏洞的直接暴露范围要更窄一些。Hub 为许多团队提供单点登录（SSO）和账户管理功能。因此，一个账户漏洞就可能解锁所有相连的服务。CVSS 10 分标志着最高级别的严重性，而且该漏洞的利用无需任何预先权限。  
  
真正面临风险的是自行托管（self-managed）的 Hub 和 YouTrack Server 实例。JetBrains 云服务的客户已由厂商完成修补。  
  
**攻击如何运作**  
  
最严重的漏洞 CVE-2026-50242 是一个 JetBrains 身份验证绕过漏洞。拥有数据库直接访问权限的攻击者可借此获得管理员控制权。其次，CVE-2026-56142（CVSS 9.9）允许低权限用户通过向账户附加认证详情来提升权限。第三个漏洞 CVE-2026-53915（CVSS 7.1）则允许通过不受信任的项目配置在 GoLand 中实现远程代码执行。  
  
独立研究人员与 JetBrains 于 2026 年 5 月通过协同披露（coordinated disclosure）发现了这些问题。随后，厂商为其分配了 CVE 编号并发布了修复程序。  
  
**受影响的版本**  
  
Hub 相关漏洞影响早于 2026.1.13757、2025.3.148033、2025.2.148048、2025.1.148120、2024.3.148430 和 2024.2.148429 的构建版本。捆绑了 Hub 的 YouTrack Server 同样受影响。与此同时，GoLand 漏洞影响早于 2026.1.3 的版本。  
  
**利用状况**  
  
JetBrains 表示，未发现在测试环境之外存在被利用的证据。此外，目前也尚不存在公开的概念验证（PoC）代码。  
  
**补丁与缓解措施**  
  
请立即更新。JetBrains 已修补 YouTrack Cloud，并为 Hub、YouTrack Server 和 GoLand 发布了已修复的构建版本。自行托管环境的管理员应尽快升级至所列出的版本。完整清单请参阅 JetBrains 的"已修复安全问题"页面。  
  
参考链接：  
  
https://www.jetbrains.com/privacy-security/issues-fixed/  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
