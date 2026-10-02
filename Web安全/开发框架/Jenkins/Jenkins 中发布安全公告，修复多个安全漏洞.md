---
source: "gelusus/wxvl 公众号漏洞文库"
product: "Jenkins core、Credentials与OpenID Connect插件"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "CVE-2024-47803; CVE-2024-47804; CVE-2024-47805; CVE-2024-47806; CVE-2024-47807"
referenced_identifiers: ""
identifier_role: "primary"
identifier_status: "unknown"
title: "Jenkins 中发布安全公告，修复多个安全漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：仅给固定core2.479/LTS2.462.3、Credentials1381.v2c3a_12074da_b_、OIDC4.355.v3a_fb_fca_b_96d4，缺各受影响起点/边界"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-8808c14da138d628099c8c0a"
entity_id: "ve-8808c14da138d628099c8c0a"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：仅给固定core2.479/LTS2.462.3、Credentials1381.v2c3a_12074da_b_、OIDC4.355.v3a_fb_fca_b_96d4，缺各受影响起点/边界

代码与实验材料：无PoC；信息泄漏/权限项目创建/ID token校验三类应分开

来源证据范围：2024-10-04，直接链接官方10月2日安全公告

- **适用与权限边界（1）**：权限及密文泄漏后果概括不足；依据：47805仅称查看加密值即暴露证书/秘密，未说明可解密条件；两个OIDC声明校验缺陷没区分具体claim与配置，管理员接管并非必然。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **事实待核（2）**：结构化映射缺失；依据：五CVE未进frontmatter，四固定版本列表未逐项指向相关CVE。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

#  Jenkins 中发布安全公告，修复多个安全漏洞   
 独眼情报   2024-10-04 09:58  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/KgxDGkACWnQ0UL7gborIjpet3fLGB2ibbt23xO93gP6FFcpN4KFUUPww2EYlgY102DEjePibYZCibMrjcU4Roq43Q/640?wx_fmt=other&from=appmsg "")  
  
Jenkins 项目发布了安全公告，敦促用户立即更新其安装，因为发现了多个漏洞。这些漏洞可能允许攻击者窃取敏感数据、绕过安全限制，甚至完全控制 Jenkins 服务器。  
  
最严重的漏洞包括：  
- CVE-2024-47803：  
此漏洞通过错误消息泄露多行机密信息，例如 API 密钥和密码。这些信息可通过系统日志访问，从而可能让攻击者获得敏感凭据。  
  
- CVE-2024-47804：  
攻击者可以利用此漏洞绕过项目创建限制，从而使他们能够创建临时项目，并在获得进一步的权限后保留这些项目以获得未经授权的访问。  
  
- CVE-2024-47805：  
此漏洞允许具有“扩展读取”权限的用户查看加密凭证值，从而可能暴露证书和秘密文件等敏感信息。  
  
- CVE-2024-47806 和 CVE-2024-47807：  
 OpenID Connect 身份验证插件中的这些漏洞未能验证 ID 令牌中的关键声明。此疏忽可能允许攻击者绕过身份验证，从而可能获得 Jenkins 服务器的管理员访问权限。  
  
Jenkins项目已发布更新以解决这些漏洞。强烈建议用户更新至以下版本：  
- 詹金斯周度：2.479  
  
- Jenkins LTS：2.462.3  
  
- 凭证插件：1381.v2c3a_12074da_b_  
  
- OpenID Connect 身份验证插件：4.355.v3a_fb_fca_b_96d4  
  
这些漏洞带来了严重的安全风险，包括未经授权的访问、敏感数据的泄露以及对 Jenkins 实例的潜在接管。需要立即采取行动，保护您的 Jenkins 环境免受这些威胁。  
  
有关更多详细信息，请参阅官方  
Jenkins 安全公告  
并相应地更新您的系统。  
> https://www.jenkins.io/security/advisory/2024-10-02/#jenkins-security-advisory-2024-10-02  
  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
