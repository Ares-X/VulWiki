---
source: "gelusus/wxvl 公众号漏洞文库"
title: "GitHub Enterprise Server SAML XML签名包装认证绕过及更新新闻"
product: "GitHub Enterprise Server"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "CVE-2024-6800"
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "<3.14说法需按3.13.3/3.12.8/3.11.4/3.10.16分支修复解析"
prerequisites: "直接网络+特定IdP SAML"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
identifier_role: "primary"
source_status: "unknown"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/ERP%E4%BC%81%E4%B8%9A/GitHub%20Enterprise%20Server/GitHub%20Enterprise%20Server%20%E4%B8%AD%E5%AD%98%E5%9C%A8%E4%B8%A5%E9%87%8D%E7%9A%84%E8%AE%A4%E8%AF%81%E6%BC%8F%E6%B4%9E.md"
id: "vw-b3d8439f3bfaab4620e6440a"
entity_id: "ve-b3d8439f3bfaab4620e6440a"
schema_version: "1"
---

# GitHub Enterprise Server SAML XML签名包装认证绕过及更新新闻

## 条目说明

- 对象与具体问题：GitHub Enterprise Server；SAML XML签名包装认证绕过及更新新闻
- 版本、配置及部署条件：<3.14说法需按3.13.3/3.12.8/3.11.4/3.10.16分支修复解析
- 认证与权限前提：直接网络+特定IdP SAML
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 源代码托管不是ERP，移开发平台
- 有主6800和两个未编号中危问题，不能单实体吞并
- 版本<3.14不能把已修复旧维护版继续标漏洞；缺官方公告链接/IdP条件
- 新闻无PoC正常，但需文档类型标公告和删广告

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

Ryan Naraine  代码卫士   2024-08-22 17:58  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Az5ZsrEic9ot90z9etZLlU7OTaPOdibteeibJMMmbwc29aJlDOmUicibIRoLdcuEQjtHQ2qjVtZBt0M5eVbYoQzlHiaw/640?wx_fmt=gif "")  
  
   
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
**GitHub 紧急修复了位于 GitHub Enterprise Server 产品中的三个安全缺陷，并提醒称黑客可利用其中一个漏洞获得站点管理员权限。**  
  
其中最严重的是CVE-2024-6800，可导致攻击者操纵 SAML SSO 来提供和/或获得对拥有站点管理员权限的用户账户的访问权限。该漏洞的CVSS评分为9.5，是位于 GitHub Enterprise Server (GHES) 中的一个XML封装漏洞，在使用具有特定身份提供商的SAML认证时触发。  
  
GitHub 在安全公告中提到，”该漏洞可导致对 GitHub Enterprise Server 拥有直接网络访问权限的攻击者伪造 SAML 响应来提供和/或获得对具有站点管理员权限的用户访问权限。利用该漏洞可导致对该实例获得越权访问权限，而无需提前认证。”  
  
GitHub 提到该漏洞通过漏洞奖励计划报送，影响 GitHub Enterprise Server 3.14之前的所有版本，已在3.13.3、3.12.8、3.11.4和3.10.16版本中修复。GitHub 还提到了两个中危漏洞可导致攻击者更新任何公开仓库中任何issue的抬头、受让人和标签；以及仅通过 contents: read 和 pull requests: write权限使用 GitHub App 从私密仓库发布contents。  
  
GitHub Enterprise Server 是 GitHub Enterprise 的自托管版本，在本地或私有云上安装，提供基于云的 GitHub 版本特性，包括拉取请求、代码审计和项目管理工具等。  
  
  
  
代码卫士试用地址：  
https://codesafe.qianxin.com  
  
开源卫士试用地址：https://oss.qianxin.com  
  
  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[Netgear 提醒用户修复认证绕过和XSS漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247520065&idx=1&sn=f3f7fcc056f11a3fe8e615681e0bd033&chksm=ea94be2bdde3373dda4a969cc8e526e43e261ee0d0c1e8748a5bdd70ef70d355bcb2252ea69d&scene=21#wechat_redirect)  
  
  
[Juniper 紧急修复严重的认证绕过漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247519930&idx=1&sn=fb9fb97863d38cac47e2e8c94fdfc267&chksm=ea94bfd0dde336c6cc905b39fdfcd6192b649ef99de88faa7d5c707a3eedf44f88820ce1fbee&scene=21#wechat_redirect)  
  
  
[MOVEit Transfer 软件中存在高危的认证不当漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247519884&idx=1&sn=6407cbe53c48d873acacc653dceafd9b&chksm=ea94bfe6dde336f08a96c5768226e9e70afb02e7a0fdafe7042e062a6cd911476df4b34ebdfb&scene=21#wechat_redirect)  
  
  
[存疑 CVE 漏洞带来无谓压力 热门开源项目开发者归档 GitHub 仓库](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247519930&idx=2&sn=acd4b1226ac3021b5aa91433e3f657f5&chksm=ea94bfd0dde336c6a6ba483f21d5d9572e139fb0e5cd5ac1a9ccde95f91e2330823dfbc71c20&scene=21#wechat_redirect)  
  
  
[GitHub 评论被滥用于推送恶意软件](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247519338&idx=3&sn=ce709d5220bb6c2f682b40e739ddb45a&chksm=ea94bd00dde3341689317ffd9ae079e27052fd9394be372945e3ac51a63d809ddd7ba6f7ee53&scene=21#wechat_redirect)  
  
  
[供应链攻击滥用 GitHub 特性传播恶意软件](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247519269&idx=2&sn=d6c911a2eb50fa5c85016bfc6439be5a&chksm=ea94bd4fdde3345906eee3ee7e47e08bfd5fa5e98365e6741efdc8cffeef3e77b4f697c09d28&scene=21#wechat_redirect)  
  
  
  
  
  
**原文链接**  
  
  
https://www.securityweek.com/critical-authentication-flaw-haunts-github-enterprise-server/  
  
  
题图：  
Pixabay  
 License  
  
****  
**本文由奇安信编译，不代表奇安信观点。转载请注明“转自奇安信代码卫士 https://codesafe.qianxin.com”。**  
  
  
  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/oBANLWYScMSf7nNLWrJL6dkJp7RB8Kl4zxU9ibnQjuvo4VoZ5ic9Q91K3WshWzqEybcroVEOQpgYfx1uYgwJhlFQ/640?wx_fmt=jpeg "")  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/oBANLWYScMSN5sfviaCuvYQccJZlrr64sRlvcbdWjDic9mPQ8mBBFDCKP6VibiaNE1kDVuoIOiaIVRoTjSsSftGC8gw/640?wx_fmt=jpeg "")  
  
**奇安信代码卫士 (codesafe)**  
  
国内首个专注于软件开发安全的产品线。  
  
   ![](https://mmbiz.qpic.cn/mmbiz_gif/oBANLWYScMQ5iciaeKS21icDIWSVd0M9zEhicFK0rbCJOrgpc09iaH6nvqvsIdckDfxH2K4tu9CvPJgSf7XhGHJwVyQ/640?wx_fmt=gif "")  
  
   
觉得不错，就点个 “  
在看  
” 或 "  
赞  
” 吧~  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
