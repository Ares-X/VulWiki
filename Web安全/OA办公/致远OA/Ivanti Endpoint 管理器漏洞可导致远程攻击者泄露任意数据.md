---
source: "gelusus/wxvl 公众号漏洞文库"
title: "Ivanti Endpoint Manager (EPM) 认证绕过凭据泄漏与认证SQL注入通告"
product: "Ivanti Endpoint Manager (EPM)"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "CVE-2026-1603;CVE-2026-1602"
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "EPM2024 SU4 SR1及以前；声称SU5修复"
prerequisites: "1603未认证；1602需认证"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
identifier_role: "primary"
source_status: "unknown"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/OA%E5%8A%9E%E5%85%AC/%E8%87%B4%E8%BF%9COA/Ivanti%20Endpoint%20%E7%AE%A1%E7%90%86%E5%99%A8%E6%BC%8F%E6%B4%9E%E5%8F%AF%E5%AF%BC%E8%87%B4%E8%BF%9C%E7%A8%8B%E6%94%BB%E5%87%BB%E8%80%85%E6%B3%84%E9%9C%B2%E4%BB%BB%E6%84%8F%E6%95%B0%E6%8D%AE.md"
id: "vw-c2fc1b964aac359e5a0c4c35"
entity_id: "ve-c2fc1b964aac359e5a0c4c35"
schema_version: "1"
---

# Ivanti Endpoint Manager (EPM) 认证绕过凭据泄漏与认证SQL注入通告

## 条目说明

- 对象与具体问题：Ivanti Endpoint Manager (EPM)；认证绕过凭据泄漏与认证SQL注入通告
- 版本、配置及部署条件：EPM2024 SU4 SR1及以前；声称SU5修复
- 认证与权限前提：1603未认证；1602需认证
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 错分致远OA；不是EPMM、Workspace Control、Connect Secure等推荐链接产品
- 两个独立CVE应拆实体，保留各自权限与CVSS，不以通用任意数据标题合并
- 新闻无PoC属正常；缺Ivanti原始公告链接而仅二次新闻，需要事实核验
- 在野未发现应带2026-02时点；版本SU5名称不同于发布日期年份

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

 代码卫士   2026-02-12 10:13  
  
![](../../.resource/remote/afc2fa5611a63e89ebec625ecc33d28c5dcdb706b6fbdabb79f7c1e8982068c0.gif "")  
    
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
**Ivanti****公司发布 EPM 平台安全更新，修复了可导致未授权访问敏感数据库信息和攻陷用户凭据的两个新漏洞CVE-2026-1603和CVE-2026-1602。**  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
这些安全更新在2024 SU5版本中发布，同时修复了此前在2025年10月披露的11个中危漏洞。CVE-2026-1603的CVSS评分为8.6（高危），是一个认证绕过漏洞，可导致远程未认证攻击者泄露特定的存储凭据数据。无需用户交互，可在未经身份验证的情况下通过网络利用该漏洞。  
  
第二个漏洞CVE-2026-1602的CVSS评分为6.5（中危），和SQL注入缺陷有关。远程认证攻击者可利用该漏洞从数据库读取任意数据，暴露敏感的组织机构信息。该漏洞虽然影响数据的机密性到哪并不影响系统完整性或可用性。  
  
运行 Ivanti Endpoint Manager 2024 SU4 SR1和更早版本的组织机构易受影响。这些漏洞影响核心的身份验证和数据库查询机制，对于管理多个端点的企业环境而言尤为令人担心。  
  
Ivanti 公司已通过 Ivanti 许可系统 (ILS) 发布已修复版本 EPM 2024 SU5。强烈建议管理员立即应用该更新，缓解潜在风险。Ivanti 公司证实称公开披露这些漏洞前并未发现在野利用迹象，这两个漏洞都是通过 Ivanti 公司的负责任披露计划披露的。它们均由与趋势科技的ZDI计划合作披露。Ivanti 公司公开致谢研究员并强调一直与安全社区共同维护产品的完整性。  
  
这些漏洞说明了企业软件安全所面临的挑战，尤其是在处理特权访问和敏感组织机构数据的端点管理解决方案方面更是如此。其中认证绕过漏洞无需提前获得身份验证，可导致攻击者获得对凭据存储的初始访问权限，因此更令人担忧。目前尚不存在与这些漏洞相关的妥协指标。Ivanti 表示并未发现在野利用迹象。不过由于这两个漏洞的技术详情已发布，因此组织机构应尽快部署可用补丁。用户应优先更新至版本2024 SU5 并开展安全审计，确保在打补丁前没有发生未授权访问的情况。  
  
  
 开源  
卫士试用地址：  
https://oss.qianxin.com/#/login  
  
  
 代码卫士试用地址：https://sast.qianxin.com/#/login  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[Ivanti 提醒注意已遭利用的两个 EPMM 漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247525028&idx=2&sn=762ebd580b93c85ca6f361c47033a215&scene=21#wechat_redirect)  
  
  
[Ivanti提醒注意 EPM 中严重的代码执行漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247524630&idx=1&sn=f3a9316989486371722d9656c43f333e&scene=21#wechat_redirect)  
  
  
[Ivanti Workspace Control硬编码密钥漏洞暴露 SQL 凭据](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247523260&idx=2&sn=ea145b27a636bc95e9cf0045e0f89d03&scene=21#wechat_redirect)  
  
  
[Ivanti 修复已用于代码执行攻击中的两个 EPMM 0day 漏洞，与开源库有关](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247523008&idx=1&sn=12a019a9d94970b49208b306f026f931&scene=21#wechat_redirect)  
  
  
[Ivanti 修复 Connect Secure & Policy Secure 中的三个严重漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247522224&idx=1&sn=671c73813c868c4819c48a9b54ab1b8c&scene=21#wechat_redirect)  
  
  
  
  
  
**原文链接**  
  
https://cybersecuritynews.com/multiple-ivanti-endpoint-manager-vulnerability/  
  
  
题图：Pixa  
bay Licens  
e  
  
  
**本文由奇安信编译，不代表奇安信观点。转载请注明“转自奇安信代码卫士 https://codesafe.qianxin.com”。**  
  
  
  
  
![](../../.resource/remote/2c03ce3cc6bb81bca85bd412ed60e93c4bc0a295a1fc9d3739d8aca43497fbb4.jpg "")  
  
![](../../.resource/remote/b33054170f5acbf0023711f517b5bee9799a2f57b155a774d3945e6d78184e63.jpg "")  
  
**奇安信代码卫士 (codesafe)**  
  
国内首个专注于软件开发安全的产品线。  
  
   ![](../../.resource/remote/8a5c84b98d9b52b1d4f4306180ec26c9aa65342b326b5b98ad2f097b488152f4.gif "")  
  
   
觉得不错，就点个 “  
在看  
” 或 "  
赞  
” 吧~  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
