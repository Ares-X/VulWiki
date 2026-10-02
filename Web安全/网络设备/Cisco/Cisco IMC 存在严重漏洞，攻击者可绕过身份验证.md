---
cve: "CVE-2026-20093"
source: "gelusus/wxvl 公众号漏洞文库"
id: "vw-e5cbcf430166c1422b70dcf8"
entity_id: "ve-e5cbcf430166c1422b70dcf8"
schema_version: "1"
title: "Cisco IMC 存在严重漏洞，攻击者可绕过身份验证"
product: "Cisco Integrated Management Controller"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "primary"
primary_identifiers: "CVE-2026-20093"
referenced_identifiers: ""
prerequisites: "未认证HTTP改现有用户密码；多个硬件需暴露IMC UI"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/Cisco/Cisco%20IMC%20%E5%AD%98%E5%9C%A8%E4%B8%A5%E9%87%8D%E6%BC%8F%E6%B4%9E%EF%BC%8C%E6%94%BB%E5%87%BB%E8%80%85%E5%8F%AF%E7%BB%95%E8%BF%87%E8%BA%AB%E4%BB%BD%E9%AA%8C%E8%AF%81.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_status: "unknown"
---

#  Cisco IMC 存在严重漏洞，攻击者可绕过身份验证  

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Cisco Integrated Management Controller
- 本文讨论：CVE-2026-20093
- 版本、权限与配置前提：未认证HTTP改现有用户密码；多个硬件需暴露IMC UI
- 资料类型：新闻通告；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 列硬件型号但没有IMC受影响和修复软件版本
- 没有厂商公告直链和原文URL；无法追溯评分及排除型号
- 无缓解措施、唯一有效方案等绝对表述需厂商原文确认

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- 硬件排除范围和修复版未验证
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->

原创 网络安全9527
                    网络安全9527  安全圈的那点事儿   2026-04-02 11:05  
  
思科最近披露了一个影响其集成管理控制器 (IMC)的严重安全漏洞，促使其发布了紧急软件更新。  
  
该漏洞的官方编号为 CVE-2026-20093，其 CVSS 基本评分为 9.8，属于严重级别。  
  
此安全漏洞存在于思科IMC软件的密码更改功能中。核心问题在于系统对传入的密码更改请求处理不当。  
  
利用此漏洞，远程未经身份验证的攻击者可以直接向受影响的设备发送 恶意  
构造的 HTTP请求。  
  
如果攻击成功，攻击者可以完全绕过标准身份验证检查。一旦身份验证被绕过，攻击者就可以修改系统中任何现有用户的密码。  
  
这包括主管理员帐户，该帐户实际上允许攻击者劫持系统并以该用户的身份获得完全的管理权限。  
## 受影响的系统和硬件  
  
如果思科硬件产品运行的思科 IMC 软件存在漏洞，则该漏洞会影响多个思科硬件产品。  
  
受影响的独立产品包括：  
- 5000系列企业网络计算系统（ENCS）  
- Catalyst 8300 系列边缘 uCPE  
- UCS C系列M5和M6机架式服务器（独立模式）  
- UCS E系列服务器M3和M6  
此外，许多依赖于预配置的受影响UCS C系列服务器的思科设备也面临风险。如果这些设备暴露了思科IMC用户界面，它们就会受到攻击。  
  
该广泛列表包括应用程序策略基础架构控制器 (APIC) 服务器、Catalyst Center 设备、安全防火墙管理中心设备和安全网络分析设备。  
  
思科已确认，某些较新且配置不同的产品，例如 UCS B 系列刀片服务器、UCS X 系列模块化系统以及 UCS C 系列 M7 和 M8 机架服务器，不受此缺陷的影响。  
  
目前，尚无任何临时性变通方案或缓解措施可以阻止此漏洞。唯一有效的解决方案是应用思科提供的官方软件更新。  
  
强烈建议管理员立即将受影响的系统升级到已修复的软件版本。  
  
更新过程因设备而异；例如，升级 5000 系列 ENCS 和 Catalyst 8300 系列上的 IMC 需要升级底层 Cisco 企业 NFV 基础设施软件 (NFVIS)。  
  
对于独立服务器，管理员通常可以使用 Cisco  
主机升级实用程序(HUU) 来安装修复后的 IMC 版本。  
  
思科公司对报告此漏洞的安全研究人员表示感谢，并指出目前没有证据表明有人正在积极利用此漏洞，也没有公开声明有人恶意使用此漏洞。  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
