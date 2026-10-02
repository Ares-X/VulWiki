---
source: "gelusus/wxvl 公众号漏洞文库"
cve: "CVE-2023-35639"
identifier_role: "primary"
primary_identifiers: "CVE-2023-35639"
referenced_identifiers: ""
identifier_status: "unknown"
title: "漏洞预警  Microsoft ODBC Driver远程代码执行漏洞"
product: "Microsoft ODBC Driver客户端"
record_type: "advisory"
document_type: "安全通告"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
prerequisites: "受害者SQL客户端连接恶意数据库并处理恶意响应；应用用户上下文，系统/驱动补丁决定影响"
side_effects: "原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E6%A1%8C%E9%9D%A2%E8%BD%AF%E4%BB%B6/Windows/%E6%BC%8F%E6%B4%9E%E9%A2%84%E8%AD%A6%20%20Microsoft%20ODBC%20Driver%E8%BF%9C%E7%A8%8B%E4%BB%A3%E7%A0%81%E6%89%A7%E8%A1%8C%E6%BC%8F%E6%B4%9E.md"
archive_commit: "41940cb0038d09ca5aaddbe5bffb923e423d210f"
source_status: "missing"
source_note: "原始出处待补；仓库归档不等同原始披露"
id: "vw-67a0e2474114f760353d3b59"
entity_id: "ve-67a0e2474114f760353d3b59"
schema_version: "1"
---

# 漏洞预警  Microsoft ODBC Driver远程代码执行漏洞

<!-- vulwiki-editorial-rebuild:system-misc -->
## 条目范围与校订

- 本文对象：Microsoft ODBC Driver客户端
- 文献类型：安全通告
- 版本、权限及部署边界：受害者SQL客户端连接恶意数据库并处理恶意响应；应用用户上下文，系统/驱动补丁决定影响
- 核验状态：仅重建文本校订；未执行文中代码、PoC 或扫描，未把截图或转载声明记为本站复现

### 具体结论与待核项

以下为原归档的逐项勘误与证据缺口；可由文本确定的问题已在下文订正，仍缺来源的事实保持待核。

1. 重点是客户端被恶意服务器响应攻击，不是远程入侵数据库服务；经过身份验证的是受害者，不能误设攻击者必须已有目标账号
2. 简介把ODBC通用标准支持与某微软驱动产品范围混为一谈，需明确驱动组件
3. 版本列表多项重复，只列OS无KB/驱动构建，无法判断是否已修复
4. MSRC原始链接有价值，需提炼各支持分支修复表；新闻无需补造PoC

### 操作风险

原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响

技术请求、代码与实验方法按原文保留；其中的破坏性动作仅限授权、可恢复的隔离环境。缺失代码、参数或版本事实不猜补。

### 来源追溯

- 原文参考链接（未重新核验）：<https://msrc.microsoft.com/update-guide/vulnerability/CVE-2023-35639>
- 原始披露 URL 未确认；既有归档来源标签保留，不能替代原始公告

### 归档技术正文

浅安  浅安安全   2023-12-16 08:00  
  
**0x00 漏洞编号**  
- # CVE-2023-35639  
  
**0x01 危险等级**  
- 高危  
  
**0x02 漏洞概述**  
  
Microsoft ODBC Driver是由微软提供的一种数据库连接工具，它允许应用程序在Windows操作系统上与各种数据源进行交互，包括SQL Server、Microsoft Access、Oracle、MySQL等主流数据库系统。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/7stTqD182SVleaDeU1ibPickZJzpKIF4Mcm9iaHXXSDJfzdooHoG4ZA4iaHupxCYLp8HtE2qPLEqYibUd5u3E3Nmiczw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1 "")  
  
**0x03 漏洞详情**  
  
**CVE-2023-35639**  
  
**漏洞类型：**  
远程代码执行  
  
**影响：**  
执  
行任意代码  
  
**简述：**  
Microsoft ODBC Driver中存在远程代码执行漏洞，攻击者诱使经过身份验证的受害者使用SQL客户端应用程序连接恶意SQL数据库，恶意数据库会返回特制的消息，从而导致客户端程序上下中执行任意代码。   
###   
  
**0x04 影响版本**  
- Windows Server 2012 R2 (Server Core installation)  
  
- Windows Server 2012 R2  
  
- Windows Server 2012 (Server Core installation)  
  
- Windows Server 2012  
  
- Windows Server 2008 R2 for x64-based Systems Service Pack 1  
  
- Windows Server 2008 R2 for x64-based Systems Service Pack 1  
  
- Windows Server 2008 for x64-based Systems Service Pack 2 (Server Core installation)  
  
- Windows Server 2008 for x64-based Systems Service Pack 2 (Server Core installation)  
  
- Windows Server 2008 for x64-based Systems Service Pack 2  
  
- Windows Server 2008 for x64-based Systems Service Pack 2  
  
- Windows Server 2008 for 32-bit Systems Service Pack 2 (Server Core installation)  
  
- Windows Server 2008 for 32-bit Systems Service Pack 2 (Server Core installation)  
  
- Windows Server 2008 for 32-bit Systems Service Pack 2  
  
- Windows Server 2008 for 32-bit Systems Service Pack 2  
  
- Windows Server 2016 (Server Core installation)  
  
- Windows Server 2016  
  
- Windows 10 Version 1607 for x64-based Systems  
  
- Windows 10 Version 1607 for 32-bit Systems  
  
- Windows 10 for x64-based Systems  
  
- Windows 10 for 32-bit Systems  
  
- Windows Server 2022, 23H2 Edition (Server Core installation)  
  
- Windows 11 Version 23H2 for x64-based Systems  
  
- Windows 11 Version 23H2 for ARM64-based Systems  
  
- Windows 10 Version 22H2 for 32-bit Systems  
  
- Windows 10 Version 22H2 for ARM64-based Systems  
  
- Windows 10 Version 22H2 for x64-based Systems  
  
- Windows 11 Version 22H2 for x64-based Systems  
  
- Windows 11 Version 22H2 for ARM64-based Systems  
  
- Windows 10 Version 21H2 for x64-based Systems  
  
- Windows 10 Version 21H2 for ARM64-based Systems  
  
- Windows 10 Version 21H2 for 32-bit Systems  
  
- Windows 11 version 21H2 for ARM64-based Systems  
  
- Windows 11 version 21H2 for x64-based Systems  
  
- Windows Server 2022 (Server Core installation)  
  
- Windows Server 2022 (Server Core installation)  
  
- Windows Server 2022  
  
- Windows Server 2022  
  
- Windows Server 2019 (Server Core installation)  
  
- Windows Server 2019  
  
- Windows 10 Version 1809 for ARM64-based Systems  
  
- Windows 10 Version 1809 for x64-based Systems  
  
- Windows 10 Version 1809 for 32-bit Systems  
  
**0x05****修复建议**  
  
**目前官方已发布漏洞修复版本，建议用户升级到安全版本****：**  
  
https://msrc.microsoft.com/update-guide/vulnerability/CVE-2023-35639  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原始披露 URL 尚未确认，现有链接按来源追溯区分别标注）
