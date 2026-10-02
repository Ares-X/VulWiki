---
cve: "CVE-2025-61937"
source: "gelusus/wxvl 公众号漏洞文库"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
title: "工业警报：AVEVA 软件中存在严重远程代码执行漏洞，CVSS 评级为 10"
product: "AVEVA Process Optimization"
record_type: "unknown"
document_type: "技术文章（细分类待核）"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
prerequisites: "认证/本地权限/恶意文件各前提不同不能统称无登录全控；SQLServer管理员权限与OS SYSTEM分清；一份版本2024.1<=/2025修复需按每CVE厂商PDF矩阵核"
side_effects: "原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%85%B6%E4%BB%96%E8%BD%AF%E4%BB%B6/%E6%9D%82%E9%A1%B9/%E5%B7%A5%E4%B8%9A%E8%AD%A6%E6%8A%A5%EF%BC%9AAVEVA%20%E8%BD%AF%E4%BB%B6%E4%B8%AD%E5%AD%98%E5%9C%A8%E4%B8%A5%E9%87%8D%E8%BF%9C%E7%A8%8B%E4%BB%A3%E7%A0%81%E6%89%A7%E8%A1%8C%E6%BC%8F%E6%B4%9E%EF%BC%8CCVSS%20%E8%AF%84%E7%BA%A7%E4%B8%BA%2010.md"
archive_commit: "41940cb0038d09ca5aaddbe5bffb923e423d210f"
source_status: "missing"
source_note: "原始出处待补；仓库归档不等同原始披露"
id: "vw-04ed6902ffe165732ab58556"
entity_id: "ve-04ed6902ffe165732ab58556"
schema_version: "1"
---

# 工业警报：AVEVA 软件中存在严重远程代码执行漏洞，CVSS 评级为 10

<!-- vulwiki-editorial-rebuild:system-misc -->
## 条目范围与校订

- 本文对象：AVEVA Process Optimization
- 文献类型：技术文章（细分类待核）
- 版本、权限及部署边界：认证/本地权限/恶意文件各前提不同不能统称无登录全控；SQLServer管理员权限与OS SYSTEM分清；一份版本2024.1<=/2025修复需按每CVE厂商PDF矩阵核
- 核验状态：仅重建文本校订；未执行文中代码、PoC 或扫描，未把截图或转载声明记为本站复现

### 具体结论与待核项

以下为原归档的逐项勘误与证据缺口；可由文本确定的问题已在下文订正，仍缺来源的事实保持待核。

1. 元数据只有61937缺64691/61943/65118/64769/65117/64729
2. 认证/本地权限/恶意文件各前提不同不能统称无登录全控
3. SQLServer管理员权限与OS SYSTEM分清
4. 一份版本2024.1<=/2025修复需按每CVE厂商PDF矩阵核
5. 无PoC应标公告，保留AVEVA原始PDF

### 操作风险

原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响

技术请求、代码与实验方法按原文保留；其中的破坏性动作仅限授权、可恢复的隔离环境。缺失代码、参数或版本事实不猜补。

### 来源追溯

- 原始披露 URL 未确认；既有归档来源标签保留，不能替代原始公告

### 归档技术正文

sec随谈
                    sec随谈  sec随谈   2026-01-20 00:57  
  
全球工业软件领导者AVEVA发布了一份关于其旗舰产品流程优化软件（原名ROMeo）的严重安全公告。该公告详细列出了多个漏洞，其中包括一个最高级别为10级的漏洞，该漏洞可能允许攻击者在无需登录的情况下完全控制工业建模服务器。  
  
公告中最令人担忧的发现是 CVE-2025-61937，这是一个远程代码执行 (RCE)漏洞，其 CVSS v4.0 评分最高，为 10.0 分。该漏洞存在于应用程序的 API 中，对运行“AVEVA Process Optimization (formerly ROMeo) 2024.1 and all previous version”的组织构成严重威胁。  
  
与许多需要攻击者先欺骗用户或窃取凭据才能利用的漏洞不同，此漏洞为任何拥有网络访问权限的攻击者敞开了大门。根据安全  
 公告：  
  
“如果该漏洞被利用，未经身份验证的恶意人员可能以‘taoimr’服务的操作系统系统权限执行远程代码，从而可能导致模型应用服务器完全被攻陷。”  
  
该公告重点指出了几个漏洞，这些漏洞允许“普通用户”（例如具有低级别访问权限的员工）提升其权限并接管系统。  
1. 宏操作漏洞 (CVE-2025-64691) 此严重漏洞 (CVSS 9.3) 允许已认证用户篡改 TCL 宏脚本。“如果此漏洞被利用，已认证的恶意用户（操作系统标准用户）可以篡改 TCL 宏脚本并将权限提升至操作系统系统权限，从而可能导致模型应用服务器完全被攻陷。”  
1. SQL注入漏洞（CVE-2025-61943，CVSS 9.3）：攻击者还可以利用Captive Historian组件获取对SQL Server的管理权限。“如果该漏洞被利用，经过身份验证的恶意攻击者可以篡改Captive Historian中的查询，并以SQL Server管理员权限执行代码。”  
1. DLL劫持（CVE-2025-65118，CVSS 9.3）攻击者通过诱骗服务加载恶意代码库，可以将访问权限提升至系统级别。“如果该漏洞被利用，经过身份验证的恶意攻击者可以诱骗进程优化服务加载任意代码，并将权限提升至操作系统级别。”  
该报告还警告了明文传输风险（CVE-2025-64769），未加密通道可能允许攻击者通过中间人攻击拦截敏感数据。此外，涉及 OLE 对象（CVE-2025-65117）和缺失访问控制（CVE-2025-64729）的漏洞允许攻击者将恶意内容嵌入项目文件或图形中，从而有效地为其他用户设置陷阱。  
  
这些漏洞影响 AVEVA Process Optimization 2024.1 及所有早期版本。AVEVA 建议客户立即升级到 AVEVA Process Optimization 2025 或更高版本以解决这些问题。  
  
对于无法立即进行补丁修复的组织，AVEVA 建议采取严格的临时防御措施：  
- 限制流量：应用防火墙规则，将“taoimr”服务限制为仅对受信任的来源开放。  
- 锁定文件夹：对安装文件夹和数据文件夹应用访问控制列表 (ACL)，以防止未经授权的写入访问。  
- 确保项目文件安全：对所有项目文件保持可信的“监管链”，以防止篡改。  
参考链接：  
  
https://www.aveva.com/content/dam/aveva/documents/support/cyber-security-updates/SecurityBulletin_AVEVA-2026-001.pdf  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原始披露 URL 尚未确认，现有链接按来源追溯区分别标注）
