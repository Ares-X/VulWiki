---
source: "gelusus/wxvl 公众号漏洞文库"
cve: "CVE-2024-20154;CVE-2025-22395;CVE-2024-52316"
identifier_role: "primary"
primary_identifiers: "CVE-2024-20154;CVE-2025-22395;CVE-2024-52316"
referenced_identifiers: ""
identifier_status: "unknown"
title: "戴尔、HPE、联发科修补其产品中的漏洞"
product: "MediaTek调制解调器/Dell DUP/集成Tomcat/HPE Brocade FOS"
record_type: "advisory"
document_type: "多厂商补丁新闻"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
prerequisites: "MediaTek连接恶意基站无需交互；DUP本地；FOS多个第三方组件未列编号"
side_effects: "原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/%E7%B3%BB%E7%BB%9F%E5%AE%89%E5%85%A8/Linux/%E6%88%B4%E5%B0%94%E3%80%81HPE%E3%80%81%E8%81%94%E5%8F%91%E7%A7%91%E4%BF%AE%E8%A1%A5%E5%85%B6%E4%BA%A7%E5%93%81%E4%B8%AD%E7%9A%84%E6%BC%8F%E6%B4%9E.md"
archive_commit: "41940cb0038d09ca5aaddbe5bffb923e423d210f"
source_status: "missing"
source_note: "原始出处待补；仓库归档不等同原始披露"
id: "vw-bc266182ad0863b0ce88db43"
entity_id: "ve-bc266182ad0863b0ce88db43"
schema_version: "1"
---

# 戴尔、HPE、联发科修补其产品中的漏洞

<!-- vulwiki-editorial-rebuild:system-misc -->
## 条目范围与校订

- 本文对象：MediaTek调制解调器/Dell DUP/集成Tomcat/HPE Brocade FOS
- 文献类型：多厂商补丁新闻
- 版本、权限及部署边界：MediaTek连接恶意基站无需交互；DUP本地；FOS多个第三方组件未列编号
- 核验状态：仅重建文本校订；未执行文中代码、PoC 或扫描，未把截图或转载声明记为本站复现

### 具体结论与待核项

以下为原归档的逐项勘误与证据缺口；可由文本确定的问题已在下文订正，仍缺来源的事实保持待核。

1. frontmatter仅第一CVE，正文四产品多漏洞且不是Linux专属，应拆主实体/集成关系
2. MediaTek七个其他洞和HPE十个洞无编号，不可从一句摘要补造漏洞记录
3. DUP执行任意脚本与DoS关系表述混乱；FOS9.2.2/9.2.1a1/9.2.0c需按分支，不是全版本比较
4. 公告/建议文本未保留链接，来源链缺失；公开修复与在野未报告需绑定2025-01-08
5. 应保留新闻文类，不按无PoC判定资料缺损

### 操作风险

原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响

技术请求、代码与实验方法按原文保留；其中的破坏性动作仅限授权、可恢复的隔离环境。缺失代码、参数或版本事实不猜补。

### 来源追溯

- 原始披露 URL 未确认；既有归档来源标签保留，不能替代原始公告

### 归档技术正文

铸盾安全  河南等级保护测评   2025-01-08 23:58  
  
**硬件制造商联发科、HPE 和戴尔周一发布公告，告知客户其产品中发现并修补的潜在严重漏洞。**  
  
台湾半导体公司联发科宣布修补十几个漏洞，其中包括数十个芯片组的调制解调器组件中一个严重漏洞，该漏洞可能导致远程代码执行 (RCE)。  
  
该问题被标记为 CVE-2024-20154，是一种越界写入漏洞，当设备连接到攻击者控制的恶意基站时，无需用户交互即可利用该漏洞。  
  
联发科的建议  
还详细介绍了七个高严重性漏洞，这些漏洞可能会导致本地权限提升，如果攻击者靠近易受攻击的设备，则会导致 RCE。  
  
Dell  
发布了  
针对其更新包 (DUP) 框架中高严重性缺陷的补丁，该缺陷被跟踪为 CVE-2025-22395，并被描述为本地特权升级问题，该问题可能导致任意脚本的执行，从而导致拒绝服务 (DoS) 情况。DUP 框架版本 22.01.02 解决了此漏洞。  
  
此外，该科技公司  
还发布了针对受 CVE-2024-52316 影响的多种产品的修复程序  
，CVE-2024-52316 是 2024 年 11 月披露的 Apache Tomcat 漏洞，可能导致身份验证绕过。  
  
HPE 宣布修复其运行 Brocade Fabric OS (FOS) 的 SAN 交换机中使用的第三方组件中的多个缺陷，包括可能导致权限提升、远程命令执行、身份验证绕过、DoS 和任意文件创建或删除的高中严重性问题。  
  
该公司的  
建议  
中提到了十个安全缺陷：两个于 2022 年公开披露，四个于 2023 年披露，四个于 2024 年发现。所有漏洞均已在 HPE B 系列产品的 FOS 固件 9.2.2、9.2.1a1 和 9.2.0c 版本中修复。  
  
尽管没有任何供应商提及这些漏洞被利用进行攻击，但建议用户尽快应用这些补丁。  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原始披露 URL 尚未确认，现有链接按来源追溯区分别标注）
