---
source: "gelusus/wxvl 公众号漏洞文库"
cve: "CVE-2026-0386"
identifier_role: "primary"
primary_identifiers: "CVE-2026-0386"
referenced_identifiers: ""
identifier_status: "unknown"
title: "微软将在发现严重远程代码执行漏洞后阻止 Windows 11 和 Server 2025 的自动安装"
product: "Windows Deployment Services WDS"
record_type: "advisory"
document_type: "WDS漏洞及产品加固计划新闻"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
prerequisites: "相邻网络、WDS角色启用并使用Unattend.xml免人工部署；声称2026-01起两阶段到04默认禁用"
side_effects: "未认证读取应答文件到注入代码/污染映像缺权限和流程证据，需区别凭证泄露与写入能力"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/%E7%B3%BB%E7%BB%9F%E5%AE%89%E5%85%A8/Windows/%E5%BE%AE%E8%BD%AF%E5%B0%86%E5%9C%A8%E5%8F%91%E7%8E%B0%E4%B8%A5%E9%87%8D%E8%BF%9C%E7%A8%8B%E4%BB%A3%E7%A0%81%E6%89%A7%E8%A1%8C%E6%BC%8F%E6%B4%9E%E5%90%8E%E9%98%BB%E6%AD%A2%20Windows%2011%20%E5%92%8C%20Server%202025%20%E7%9A%84%E8%87%AA%E5%8A%A8%E5%AE%89%E8%A3%85.md"
archive_commit: "41940cb0038d09ca5aaddbe5bffb923e423d210f"
source_status: "missing"
source_note: "原始出处待补；仓库归档不等同原始披露"
id: "vw-77e0c8b7c3467077962b74a6"
entity_id: "ve-77e0c8b7c3467077962b74a6"
schema_version: "1"
---

# 微软将在发现严重远程代码执行漏洞后阻止 Windows 11 和 Server 2025 的自动安装

<!-- vulwiki-editorial-rebuild:system-misc -->
## 条目范围与校订

- 本文对象：Windows Deployment Services WDS
- 文献类型：WDS漏洞及产品加固计划新闻
- 版本、权限及部署边界：相邻网络、WDS角色启用并使用Unattend.xml免人工部署；声称2026-01起两阶段到04默认禁用
- 核验状态：仅重建文本校订；未执行文中代码、PoC 或扫描，未把截图或转载声明记为本站复现

### 具体结论与待核项

以下为原归档的逐项勘误与证据缺口；可由文本确定的问题已在下文订正，仍缺来源的事实保持待核。

1. 标题阻止Windows11/Server2025自动安装过宽，实际是WDS特定hands-free部署路径，不是所有安装或更新
2. 未认证读取应答文件到注入代码/污染映像缺权限和流程证据，需区别凭证泄露与写入能力
3. KB5074952只有编号无链接，MSRC、官方阶段计划、注册表类型/作用域未链接，日期和影响范围需核
4. 向量只列AV/AC/PR/UI未列Scope和总分，不能完整复核CVSS；Server范围与标题两个OS不一致应规范
5. 路径和值被译文粘连，可重新启用=1为不安全例外应保留风险说明；Intune/Autopilot并非所有场景直接替代需限定
6. 当时未来4月计划现已过，需保留报道日期而非当前承诺；无PoC不补造

### 操作风险

未认证读取应答文件到注入代码/污染映像缺权限和流程证据，需区别凭证泄露与写入能力

技术请求、代码与实验方法按原文保留；其中的破坏性动作仅限授权、可恢复的隔离环境。缺失代码、参数或版本事实不猜补。

### 来源追溯

- 原始披露 URL 未确认；既有归档来源标签保留，不能替代原始公告

### 归档技术正文

原创 网络安全9527
                    网络安全9527  安全圈的那点事儿   2026-03-16 04:37  
  
微软宣布了一项分两阶段的计划，在发现编号为CVE-2026-0386的严重远程代码执行 (RCE) 漏洞后，将禁用 Windows 部署服务 (WDS) 中的免手动部署功能。  
  
该漏洞源于访问控制不当，允许相邻网络上的未经身份验证的攻击者拦截敏感配置文件，并在基于网络的操作系统部署期间执行任意代码。  
  
Windows 部署服务是一个服务器角色，它使 IT 管理员能够通过网络远程部署 Windows 操作系统，通常使用 PXE（预启动执行环境）启动。  
  
该服务的核心功能之一是免人工部署，它利用 Unattend.xml 应答文件自动完成安装界面（包括凭据输入），无需人工干预。此功能广泛应用于企业环境中，可高效配置大量机器。  
## Windows部署服务漏洞  
  
2026 年 1 月 13 日发布的 CVE-2026-0386 描述了 WDS 中不正确的访问控制情况 (CWE-284)，该情况源于 Unattend.xml 文件通过未经身份验证的 RPC 通道传输。  
  
由于应答文件通过 RemoteInstall 共享暴露出来而无需身份验证，因此位于同一网段的攻击者可以拦截该文件，窃取嵌入的凭据，或注入在部署过程中执行的恶意代码。  
  
安全研究人员指出，成功的利用可能会授予系统级权限，实现跨域横向移动，甚至允许攻击者污染操作系统部署映像，这使得企业数据中心面临供应链级别的风险。  
  
微软确认该漏洞的 CVSS v3.1 向量为 AV:A/AC:H/PR:N/UI:N，在机密性、完整性和可用性方面均具有高影响评级。  
  
该漏洞影响从 Server 2008 到 Server 2025 的Windows Server 版本，包括 Windows Server 2016、2019、2022 和版本 23H2。  
## 两相硬化时间表  
  
微软分两个阶段推出缓解措施：  
- **第一阶段 — 2026 年 1 月 13 日：**免手动部署功能仍然可用，但可以显式禁用。引入了新的事件日志警报和注册表项控制，允许管理员通过设置来强制执行安全AllowHandsFreeFunctionality = 0行为HKLM\SYSTEM\CurrentControlSet\Services\WdsServer\Providers\WdsImgSrv\Unattend。  
- **第二阶段 — 2026 年 4 月：**默认情况下将完全禁用免手动部署功能。在 2026 年 1 月至 4 月期间未进行任何注册表配置的管理员，将在 4 月安全更新后发现该功能已被自动禁用。  
确实需要此功能的管理员可以通过设置来暂时重新启用它AllowHandsFreeFunctionality = 1，但微软明确警告说，这不是一个安全的配置，应该只将其视为短期过渡方案。  
- 立即检查所有 WDS 配置中 Unattend.xml 的使用情况。  
- 请安装 2026 年 1 月 13 日或之后的 Windows 安全更新。  
- 计划AllowHandsFreeFunctionality = 0在 2026 年 4 月之前强制执行安全行为。  
- 监控事件查看器，查找有关不安全的 unattend.xml 访问的警告。  
- 迁移到其他部署方法，例如 Microsoft Intune、Windows Autopilot 或 Microsoft Configuration Manager，这些方法不受此漏洞的影响。  
微软知识库文章 5074952 为受影响的组织提供了完整的指导和注册表详细信息。强烈建议管理员在 2026 年 4 月之前采取行动，以避免部署管道中断。  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原始披露 URL 尚未确认，现有链接按来源追溯区分别标注）
