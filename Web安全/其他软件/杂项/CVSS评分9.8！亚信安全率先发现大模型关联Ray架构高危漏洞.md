---
source: "gelusus/wxvl 公众号漏洞文库"
cve: "CVE-2024-57000"
identifier_role: "primary"
primary_identifiers: "CVE-2024-57000"
referenced_identifiers: ""
identifier_status: "unknown"
title: "CVSS评分9.8！亚信安全率先发现大模型关联Ray架构高危漏洞"
product: "Ray"
record_type: "advisory"
document_type: "厂商发现新闻"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
prerequisites: "文称2.9.3–2.40.0；未描述组件端口、部署信任边界及鉴权配置"
side_effects: "原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%85%B6%E4%BB%96%E8%BD%AF%E4%BB%B6/%E6%9D%82%E9%A1%B9/CVSS%E8%AF%84%E5%88%869.8%EF%BC%81%E4%BA%9A%E4%BF%A1%E5%AE%89%E5%85%A8%E7%8E%87%E5%85%88%E5%8F%91%E7%8E%B0%E5%A4%A7%E6%A8%A1%E5%9E%8B%E5%85%B3%E8%81%94Ray%E6%9E%B6%E6%9E%84%E9%AB%98%E5%8D%B1%E6%BC%8F%E6%B4%9E.md"
archive_commit: "41940cb0038d09ca5aaddbe5bffb923e423d210f"
source_status: "missing"
source_note: "原始出处待补；仓库归档不等同原始披露"
id: "vw-0c767826b884cacb9633981c"
entity_id: "ve-0c767826b884cacb9633981c"
schema_version: "1"
---

# CVSS评分9.8！亚信安全率先发现大模型关联Ray架构高危漏洞

<!-- vulwiki-editorial-rebuild:system-misc -->
## 条目范围与校订

- 本文对象：Ray
- 文献类型：厂商发现新闻
- 版本、权限及部署边界：文称2.9.3–2.40.0；未描述组件端口、部署信任边界及鉴权配置
- 核验状态：仅重建文本校订；未执行文中代码、PoC 或扫描，未把截图或转载声明记为本站复现

### 具体结论与待核项

以下为原归档的逐项勘误与证据缺口；可由文本确定的问题已在下文订正，仍缺来源的事实保持待核。

1. CNVD-2024-47463需补主标识；既称未授权又鉴权绕过未给现有鉴权机制，需核验Ray受信网络设计与具体漏洞边界
2. CVSS9.8、首发现、近年来评分最高等无可追溯证据；没有CVE/厂商公告/原研究链接或PoC
3. TensorFlow/PyTorch/scikit-learn只是生态关联不得列为直接受影响产品；修复建议只有泛化防护无版本
4. 截至2025-02-08最新2.40.0须历史校验；隔离品牌营销部分

### 操作风险

原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响

技术请求、代码与实验方法按原文保留；其中的破坏性动作仅限授权、可恢复的隔离环境。缺失代码、参数或版本事实不猜补。

### 来源追溯

- 原始披露 URL 未确认；既有归档来源标签保留，不能替代原始公告

### 归档技术正文

亚信安全  亚信安全   2025-02-18 08:18  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/iczzp36h0nbF0QvDzdzMDZyINtpH6LfXIXKH3GAK74ibX2R3M9uReSPiaYe25zGwMSBHiaHOEsMEbo4CribT3NchWpQ/640?wx_fmt=jpeg "")  
  
  
近日，亚信安全人工智能实验室率先发现，广泛应用的大模型分布式部署的架构Ray，存在未授权命令执行漏洞，并第一时间上报国家信息安全漏洞共享平台（CNVD-2024-47463），及通用漏洞披露平台（CVE-2024-57000）。CVE官方对该漏洞进行了通用漏洞评分系统（CVSS）评分，高达9.8分，是近年来评分最高的漏洞之一。其危害程度极高，一旦被利用可能对企业和组织造成严重危害。  
  
  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/iczzp36h0nbF0QvDzdzMDZyINtpH6LfXIGibp6MogDnYLsD3QveribWsSyXRe2BhCibibZib4SlL8oic80u1lFAOo4GLw/640?wx_fmt=jpeg "")  
  
  
Ray是一款强大且易用的分布式计算框架，在大模型高性能计算与分布式部署中扮演着关键角色。其被深度集成到 TensorFlow、PyTorch、Scikit-learn 等主流机器学习和深度学习的框架中，广泛应用于数据预处理、分布式训练、超参数调优、模型服务和强化学习等领域。  
  
  
此次亚信安全人工智能实验室发现的Ray框架漏洞，影响版本范围为2.9.3至2.40.0（截至2025年2月8日，最新版本为2.40.0）。经亚信安全人工智能实验室分析，该漏洞（CVE-2024-57000）属于高危未授权代码执行漏洞，导致了身份验证绕过和未授权代码执行。  
  
  
**该漏洞的潜在危害高，可能造成严重安全风险：**  
  
  
1  
  
攻击者可利用该漏洞，窃取Ray集群中的敏感信息，包括：模型训练数据、模型参数等；  
  
  
2  
  
攻击者可利用该漏洞，在Ray集群中执行任意恶意指令，如：设置后门、删除业务数据等。  
  
  
  
亚信安全建议，使用了Ray框架的企业，及时采取必要的安全防护措施，避免因漏洞造成损失。如需技术支持，可联系亚信安全人工智能实验室。  
  
  
**关于亚信安全人工智能实验室**  
  
亚信安全人工智能实验室，是亚信安全专注于网络安全领域的人工智能研究机构。围绕“AI for Security, Security for AI”的理念，实验室致力于探索和开发先进的AI技术，以人工智能的前沿技术强化亚信安全的产品技术能力，同时赋能大模型及AI技术的安全发展。  
  
  
  
  
了解亚信安全，请点击  
**“阅读原文”**  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原始披露 URL 尚未确认，现有链接按来源追溯区分别标注）
