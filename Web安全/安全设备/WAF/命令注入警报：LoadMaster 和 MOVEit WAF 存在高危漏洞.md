---
cve: "CVE-2025-13444"
source: "gelusus/wxvl 公众号漏洞文库"
id: "vw-a87fe0c5398a51632e86717c"
entity_id: "ve-a87fe0c5398a51632e86717c"
schema_version: "1"
title: "命令注入警报：LoadMaster 和 MOVEit WAF 存在高危漏洞"
product: "Progress Kemp LoadMaster/MOVEit WAF"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "primary"
primary_identifiers: "CVE-2025-13444"
referenced_identifiers: ""
prerequisites: "UI/API管理权限未写；GA/LTSF/MT/VNF与MOVEit分支矩阵"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%AE%89%E5%85%A8%E8%AE%BE%E5%A4%87/WAF/%E5%91%BD%E4%BB%A4%E6%B3%A8%E5%85%A5%E8%AD%A6%E6%8A%A5%EF%BC%9ALoadMaster%20%E5%92%8C%20MOVEit%20WAF%20%E5%AD%98%E5%9C%A8%E9%AB%98%E5%8D%B1%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "执行文中载荷可能以目标进程权限启动命令或加载代码；权限受认证角色、操作系统账户及依赖版本约束，不能把 root/200 等通用字符串当成功证据"
source_status: "unknown"
---

#  命令注入警报：LoadMaster 和 MOVEit WAF 存在高危漏洞  

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Progress Kemp LoadMaster/MOVEit WAF
- 本文讨论：CVE-2025-13444 getcipherset；13447其他管理命令
- 版本、权限与配置前提：UI/API管理权限未写；GA/LTSF/MT/VNF与MOVEit分支矩阵
- 资料类型：双命令注入补丁公告；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 缺最重要鉴权/管理角色前提，远程不等于未认证
- GA≤7.2.62.0与MOVEit7.2.62.1范围需按产品拆分，不能共用上界
- 元数据只收一个主CVE

### 操作风险与恢复

- 执行文中载荷可能以目标进程权限启动命令或加载代码；权限受认证角色、操作系统账户及依赖版本约束，不能把 root/200 等通用字符串当成功证据

### 待核与来源

- 官方角色、版本矩阵及各命令影响待核
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->

sec随谈  sec随谈   2026-01-15 00:56  
  
Progress Software Corporation 于 2026 年 1 月 12 日发布补丁，对其网络基础设施产品进行了一项重要更新，拉开了 2026 年安全计划的序幕。该补丁修复了两个高危命令注入漏洞，这些漏洞可能允许远程攻击者在LoadMaster负载均衡器和MOVEit Web 应用程序防火墙(WAF)上执行恶意代码。  
  
这两个漏洞分别被追踪为 CVE-2025-13444 和 CVE-2025-13447，它们的 CVSS 评分均为 8.4，这表明对于依赖这些工具进行应用程序交付和安全的组织而言，存在重大风险。  
  
受影响产品的用户界面 (UI) 和应用程序编程接口 (API) 存在漏洞。攻击者可以通过向特定端点发送精心构造的请求，注入任意系统命令。  
- CVE-2025-13444：此漏洞针对 UI/API 中的 getcipherset 命令。  
- CVE-2025-13447：此漏洞影响范围更广的管理命令，包括 addapikey、delapikey、delcert、dmidecode、listapikeys 和 ssodomain。  
如果被利用，这些“UI/API 命令注入远程代码执行”漏洞可能会使攻击者完全控制设备。  
  
Progress Software 已确认，截至发布之日，尚无证据表明这些漏洞已被实际利用。  
  
“我们尚未收到任何关于这些漏洞已被利用的报告，也未发现对客户运营造成任何直接影响，”该公告指出。  
  
然而，供应商明确建议：“尽管如此，所有易受攻击的系统都应该进行适当的修补，以避免这些漏洞被利用”。  
  
此次安全更新涵盖了广泛的部署，包括标准 LoadMaster 设备、长期支持固件 (LTSF) 和多租户环境。  
  
强烈建议管理员立即升级到以下版本：  
- LoadMaster GA：升级到 7.2.62.2（修复 7.2.62.0 及更早版本的问题）。  
- LoadMaster LTSF：升级到 7.2.54.16（修复 7.2.54.15 及更早版本的问题）。  
- 多租户虚拟机管理程序：升级到 7.1.35.15（修复 7.1.35.11 及更早版本的问题）。  
- MOVEit WAF：升级到 7.2.62.2（修复 7.2.62.1 的问题）。  
对于运行多租户 LoadMaster (LoadMaster MT) 的组织，补丁流程需要分两步进行。该公告特别指出受影响组件之间的区别：“MT 管理程序或管理器节点（仅）易受 CVE-2025-13444 漏洞的影响，必须尽快使用上述更新进行修补”。  
  
然而，环境中运行的各个虚拟网络功能 (VNF) 都容易受到 CVE 的影响，必须使用相应的 GA 或 LTSF 版本单独进行修补。  
  
参考链接：  
  
https://community.progress.com/s/article/LoadMaster-Vulnerabilities-CVE-2025-13444-CVE-2025-13447  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
