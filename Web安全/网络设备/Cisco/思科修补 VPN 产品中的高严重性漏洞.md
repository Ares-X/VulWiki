---
cve: "CVE-2024-20337"
source: "gelusus/wxvl 公众号漏洞文库"
id: "vw-0749959de8d4ae968a7bb81f"
entity_id: "ve-0749959de8d4ae968a7bb81f"
schema_version: "1"
title: "思科修补 VPN 产品中的高严重性漏洞"
product: "Cisco Secure Client"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "primary"
primary_identifiers: "CVE-2024-20337; CVE-2024-20338"
referenced_identifiers: ""
prerequisites: "20337需SAML外部浏览器及用户点击；20338 Linux已认证写库并诱导管理员重启；4.10.08025/5.1.2.42修复"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/Cisco/%E6%80%9D%E7%A7%91%E4%BF%AE%E8%A1%A5%20VPN%20%E4%BA%A7%E5%93%81%E4%B8%AD%E7%9A%84%E9%AB%98%E4%B8%A5%E9%87%8D%E6%80%A7%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_status: "unknown"
---

#  思科修补 VPN 产品中的高严重性漏洞   

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Cisco Secure Client
- 本文讨论：CVE-2024-20337；CVE-2024-20338
- 版本、权限与配置前提：20337需SAML外部浏览器及用户点击；20338 Linux已认证写库并诱导管理员重启；4.10.08025/5.1.2.42修复
- 资料类型：双漏洞通告；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- frontmatter遗漏第二主CVE；客户端误归网络设备
- 文中公告链接丢失，无可追溯参考URL
- 需保留两漏洞不同平台/交互/权限前提，不能归一为未认证RCE

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- 版本矩阵与配置前提待官方核验
- 引用图片未查看，截图内容及有效性待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->

 安全客   2024-03-08 11:54  
  
思科发布了针对 Secure Client 中两个高严重性漏洞的补丁，Secure Client 是一款企业 VPN 应用程序，还包含安全和监控功能。  
  
第一个漏洞被追踪为 CVE-2024-20337，影响 Secure Client 的 Linux、macOS 和 Windows 版本，并且可以在不进行身份验证的情况下在回车换行 (CRLF) 注入攻击中被远程利用。  
  
由于用户提供的输入未得到充分验证，攻击者在建立 VPN 会话时诱骗用户单击精心设计的链接，从而可以在受害者的浏览器中执行任意脚本或访问敏感信息，例如 SAML 令牌。  
  
“然后，攻击者可以使用该令牌以受影响用户的权限建立远程访问 VPN 会话。  
VPN 头端背后的各个主机和服务仍然需要额外的凭据才能成功访问，”思科在其  
公告  
中解释道。  
  
根据思科的说法，只有 VPN 头端配置了 SAML 外部浏览器功能的安全客户端实例才容易受到攻击。  
  
这家科技巨头通过发布 Secure Client 版本 4.10.08025 和 5.1.2.42 解决了该缺陷。  
版本 4.10.04065 之前的迭代不易受到攻击，并且没有适用于版本 5.0 的补丁。  
  
第二个高严重性漏洞被追踪为 CVE-2024-20338，仅影响 Linux 安全客户端，并且需要身份验证才能成功利用。  
VPN 应用程序版本 5.1.2.42 解决了该错误。  
  
“攻击者可以通过将恶意库文件复制到文件系统中的特定目录并说服管理员重新启动特定进程来利用此漏洞。  
成功利用该漏洞可能允许攻击者以 root 权限在受影响的设备上执行任意代码。”思科解释道。  
  
  
**来**  
  
**领**  
  
**资**  
  
**料**  
  
**【免费领】**  
**网络安全专业入门与进阶学习资料，轻松掌握网络安全技能！**  
  
****![](../../.resource/remote/c111db1ddb2e99aa6dcd0ab0df9db15f65c851b652eea6c8849bdb1c803129d9.png "")  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
