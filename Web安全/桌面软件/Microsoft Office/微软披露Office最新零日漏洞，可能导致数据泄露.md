---
source: "gelusus/wxvl 公众号漏洞文库"
cve: "CVE-2024-38200"
identifier_role: "primary"
primary_identifiers: "CVE-2024-38200"
referenced_identifiers: "CVE-2024-38202;CVE-2024-21302"
identifier_status: "unknown"
title: "微软披露Office最新零日漏洞，可能导致数据泄露"
product: "Microsoft Office NTLM凭据泄露"
record_type: "advisory"
document_type: "Office零日及同期安全新闻"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
prerequisites: "诱导用户访问网页并打开文档；NTLM外发；2024-07-30 Feature Flighting与8月13正式补丁分阶段"
side_effects: "NTLM策略罗列允许/阻止/审计却未明确防御需限制/阻止，审计或允许不是修复；Protected Users兼容性和SMB445只覆盖部分路径需说明；只有THN二手链接，缺MSRC、官方修复KB与Feature Flight覆盖验证；FreeBuf转载归属需明确"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E6%A1%8C%E9%9D%A2%E8%BD%AF%E4%BB%B6/Microsoft%20Office/%E5%BE%AE%E8%BD%AF%E6%8A%AB%E9%9C%B2Office%E6%9C%80%E6%96%B0%E9%9B%B6%E6%97%A5%E6%BC%8F%E6%B4%9E%EF%BC%8C%E5%8F%AF%E8%83%BD%E5%AF%BC%E8%87%B4%E6%95%B0%E6%8D%AE%E6%B3%84%E9%9C%B2.md"
archive_commit: "41940cb0038d09ca5aaddbe5bffb923e423d210f"
source_status: "missing"
source_note: "原始出处待补；仓库归档不等同原始披露"
id: "vw-fa543d72142cb085fc1bbbe6"
entity_id: "ve-fa543d72142cb085fc1bbbe6"
schema_version: "1"
---

# 微软披露Office最新零日漏洞，可能导致数据泄露

<!-- vulwiki-editorial-rebuild:system-misc -->
## 条目范围与校订

- 本文对象：Microsoft Office NTLM凭据泄露
- 文献类型：Office零日及同期安全新闻
- 版本、权限及部署边界：诱导用户访问网页并打开文档；NTLM外发；2024-07-30 Feature Flighting与8月13正式补丁分阶段
- 核验状态：仅重建文本校订；未执行文中代码、PoC 或扫描，未把截图或转载声明记为本站复现

### 具体结论与待核项

以下为原归档的逐项勘误与证据缺口；可由文本确定的问题已在下文订正，仍缺来源的事实保持待核。

1. 元数据漏38200，Windows降级两CVE仅背景，SmartAppControl另一未编号设计问题不可归38200
2. 开篇未修补与后文支持版本已通过功能分发保护应分阶段，不能永久标未修补或当确认在野利用
3. NTLM策略罗列允许/阻止/审计却未明确防御需限制/阻止，审计或允许不是修复；Protected Users兼容性和SMB445只覆盖部分路径需说明
4. 只有THN二手链接，缺MSRC、官方修复KB与Feature Flight覆盖验证；FreeBuf转载归属需明确
5. 已利用自2018属于另一SmartScreen话题，不能污染Office利用状态

### 操作风险

NTLM策略罗列允许/阻止/审计却未明确防御需限制/阻止，审计或允许不是修复；Protected Users兼容性和SMB445只覆盖部分路径需说明；只有THN二手链接，缺MSRC、官方修复KB与Feature Flight覆盖验证；FreeBuf转载归属需明确

技术请求、代码与实验方法按原文保留；其中的破坏性动作仅限授权、可恢复的隔离环境。缺失代码、参数或版本事实不猜补。

### 来源追溯

- 原文参考链接（未重新核验）：<https://thehackernews.com/2024/08/microsoft-warns-of-unpatched-office.html>
- 原始披露 URL 未确认；既有归档来源标签保留，不能替代原始公告

### 归档技术正文

 关键基础设施安全应急响应中心   2024-08-13 15:22  
  
近日，微软披露了 Office 中一个未修补的零日漏洞，如果被成功利用，可能导致敏感信息在未经授权的情况下泄露给恶意行为者。  
  
![](../../.resource/remote/1f65102db753b097d00b156d0730489ad78019cf84187e83a975f073420791f6.png "")  
  
该漏洞被追踪为 CVE-2024-38200（CVSS 得分：7.5），被描述为一个欺骗漏洞，影响以下版本的 Office：  
- 32 位版本和 64 位版本的 Microsoft Office 2016  
  
- 32 位版本和 64 位版本的 Microsoft Office LTSC 2021  
  
- 适用于 32 位和 64 位系统的 Microsoft 365 企业应用程序  
  
- 适用于 32 位和 64 位系统的 Microsoft Office 2019  
  
微软在一份公告中提到：在基于网络的攻击场景中，攻击者可以托管一个网站，或利用一个接受或托管用户提供内容的受攻击网站，该网站包含一个特制文件专门利用该漏洞。  
  
但是，攻击者无法强迫用户访问该网站。相反，攻击者必须诱导用户点击一个链接，通常是通过电子邮件或即时通信信息中的诱导方式，然后说服用户打开特制文件。  
  
CVE-2024-38200的正式补丁预计将于8月13日正式发布。不过微软公司表示，他们已经确定了一种替代修复的方法，并已从2024年7月30日起通过「功能飞行」（Feature Flighting）启用了该修复方法。  
  
该公司还指出，虽然客户已经在所有支持版本的微软Office和微软365上得到了保护，但为了最大程度的规避安全风险，用户应在最终版本的补丁发布后立即更新。  
  
微软对该漏洞进行了「不太可能被利用」的评估，并进一步概述了三种缓解策略：  
- 配置「网络安全：配置」限制 NTLM：向远程服务器发出 NTLM 流量策略设置，允许、阻止或审计从运行 Windows 7、Windows Server 2008 或更高版本的计算机向任何运行 Windows 操作系统的远程服务器发出的 NTLM 流量  
  
- 将用户添加到受保护用户安全组，防止将 NTLM 用作身份验证机制  
  
- 使用外围防火墙、本地防火墙并通过 VPN 设置阻止 TCP 445/SMB 从网络向外发送，以防止向远程文件共享发送 NTLM 身份验证信息  
  
在披露该漏洞的同时，微软还表示其正在努力解决CVE-2024-38202 和 CVE-2024-21302两个零日漏洞，这些漏洞可能被利用来「解除」最新 Windows 系统的补丁，并重新引入旧漏洞。  
  
上周，Elastic 安全实验室披露Windows智能应用控制（Smart App Control）和智能屏幕（SmartScreen）存在一个设计漏洞，该缺陷允许攻击者在不触发安全警告的情况下启动程序，至少自2018年以来一直在被利用。  
  
智能应用控制是一项基于信任的安全功能，它使用微软的应用智能服务进行安全预测，并利用Windows的代码完整性功能来识别和阻止不受信任的（未签名的）或潜在危险的二进制文件和应用程序。  
  
Elastic安全实验室认为，这一漏洞多年来一直被滥用，因为他们在VirusTotal中发现了多个利用此漏洞的样本，其中最早的提交时间超过六年。  
  
**参考资料：**  
  
https://thehackernews.com/2024/08/microsoft-warns-of-unpatched-office.html  
  
  
  
原文来源：FreeBuf  
  
“投稿联系方式：010-82992251   sunzhonghao@cert.org.cn”  
  
![](../../.resource/remote/4ee926918a01b41e6eb8b00ff473dfe6a11ee91a5f8d7e7b0e58cf6962b20514.webp "")  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原始披露 URL 尚未确认，现有链接按来源追溯区分别标注）
