---
cve: "CVE-2026-40542"
source: "gelusus/wxvl 公众号漏洞文库"
title: "Apache HttpClient 5.6 中存在严重的身份验证绕过漏洞"
product: "Apache HttpClient"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "active"
primary_identifiers: "CVE-2026-40542"
referenced_identifiers: ""
identifier_role: "primary"
prerequisites: "文章称仅5.6，使用 SCRAM-SHA-256，攻击者能够冒充服务端；需官方确认实际连接/信任条件"
source_status: "unknown"
side_effects: "原文未完整记录副作用、清理步骤或运行验证；阅读样例不等于获准在真实系统执行。"
id: "vw-e0023f0ca65507a179dbaf00"
entity_id: "ve-e0023f0ca65507a179dbaf00"
schema_version: "1"
---

# Apache HttpClient 5.6 中存在严重的身份验证绕过漏洞

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 适用前提：文章称仅5.6，使用 SCRAM-SHA-256，攻击者能够冒充服务端；需官方确认实际连接/信任条件
- 证据范围：描述缺少服务端认证响应校验、5.6.1修复；无PoC，适合作为公告摘要。

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- HttpClient 是客户端库，描述为HTTP代理不准确
- 服务端身份验证绕过不等同任意目标服务器登录绕过，标题须明确方向
- 版本5.6放在产品目录中会制造产品实体碎片，应归Apache HttpClient并把版本结构化
- 紧急/严重用语与正文 Important 等级应分清，风险传播推测不能当已验证影响

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

sec随谈
                    sec随谈  sec随谈   2026-04-24 00:57  
  
Apache 软件基金会发布紧急公告，指出其广泛使用的 HttpClient 库存在**漏洞**。HttpClient 是基于 Java 的 HTTP 通信的基石。该漏洞编号为CVE-2026-40542，针对 SCRAM-SHA-256 身份验证协议，攻击者可以利用该漏洞诱骗客户端建立不安全的连接。  
  
HttpClient 是传统 Commons HttpClient 的继任者，它是一款高性能、符合 HTTP/1.1 标准的代理，可用于从云端身份验证到状态管理的一切功能。  
  
该漏洞已被评为“重要”严重级别，并且专门影响 Apache HttpClient 版本 5.6。  
  
问题的核心在于身份验证过程中缺少一个关键的验证步骤。当客户端尝试使用 SCRAM-SHA-256（加盐质询响应身份验证机制）登录服务器时，双方都需要向对方证明自己的身份——这个过程称为相互身份验证。  
  
由于缺少这一步骤，攻击者可以使客户端在未正确验证服务器响应的情况下接受身份验证“成功”。这种绕过方法允许攻击者有效地冒充合法服务器，使客户端误以为正在与可信来源通信，而实际上并非如此。  
  
由于 HttpClient 通常深深嵌入到其他 Java 应用程序和微服务中，这种绕过行为可能会对企业数据管道的安全性产生连锁反应。  
  
Apache HttpComponents 项目已发布修复程序，以解决缺失的验证逻辑问题。强烈建议用户和开发人员立即升级到 Apache HttpClient 5.6.1，以恢复正确的双向身份验证验证。  
  
参考链接：  
  
https://lists.apache.org/thread/tfmgv86xr0z1y096vs3z0y315t1v3o97  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
