---
source: "gelusus/wxvl 公众号漏洞文库"
title: "GitHub Enterprise Server SAML加密断言签名验证及信息披露更新"
product: "GitHub Enterprise Server"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "CVE-2024-9487;CVE-2024-9539"
referenced_identifiers: "CVE-2024-4985;CVE-2024-6800"
identifier_status: "unknown"
affected_scope: "修复3.14.2/3.13.5/3.12.10/3.11.16来源声明待核"
prerequisites: "SAML可选加密断言；SVG问题需点击"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
identifier_role: "primary"
source_status: "unknown"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/ERP%E4%BC%81%E4%B8%9A/GitHub%20Enterprise%20Server/GitHub%20Enterprise%20Server%E4%B8%AD%E5%AD%98%E5%9C%A8%E4%B8%A5%E9%87%8D%E6%BC%8F%E6%B4%9E%EF%BC%8C%E5%8F%AF%E8%B6%8A%E6%9D%83%E8%AE%BF%E9%97%AE%E5%AE%9E%E4%BE%8B.md"
id: "vw-b80806be20cd35545c54e2c6"
entity_id: "ve-b80806be20cd35545c54e2c6"
schema_version: "1"
---

# GitHub Enterprise Server SAML加密断言签名验证及信息披露更新

## 条目说明

- 对象与具体问题：GitHub Enterprise Server；SAML加密断言签名验证及信息披露更新
- 版本、配置及部署条件：修复3.14.2/3.13.5/3.12.10/3.11.16来源声明待核
- 认证与权限前提：SAML可选加密断言；SVG问题需点击
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 主9487与9539两实体，4985/6800是历史引用
- 维护版3.11.16等需官方release核实，未列各分支起点
- 标题宽泛不应把所有问题归认证绕过；新闻无复现但出处清楚

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

THN  代码卫士   2024-10-16 18:12  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Az5ZsrEic9ot90z9etZLlU7OTaPOdibteeibJMMmbwc29aJlDOmUicibIRoLdcuEQjtHQ2qjVtZBt0M5eVbYoQzlHiaw/640?wx_fmt=gif "")  
  
   
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
**GitHub 发布Enterprise Server (GHES) 安全更新，修复了多个问题，其中一个严重漏洞CVE-2024-9487（CVSS评分9.5）可导致越权访问实例。**  
  
  
![](https://mmbiz.qpic.cn/mmbiz_png/oBANLWYScMQUj27BlBYnXp57haTawo8TV4uyXT8e6l5CbaicIWB7EibJSLarIgJzN6ORwuicu03cxQkrhMjqGmGCQ/640?wx_fmt=png&from=appmsg "")  
  
  
GitHub 提到，“攻击者可利用可选加密断言特性，绕过SAML 单点登录 (SSO) 认证，导致越权用户利用 GitHub Enterprise Server 中存在的一个加密签名验证不当漏洞，访问该实例。”  
  
GitHub 提到该漏洞是因CVE-2024-4985 （CVSS评分10）漏洞修复而引起的，后者在2024年5月修复。  
  
GitHub 还修复了其它两个漏洞：  
  
- CVE-2024-9539（CVSS评分5.7）是信息泄露漏洞。受害者点击 SVG 资产的恶意URL时，攻击者能够检索受害者的元数据。  
  
- 管理面板中以HTML形式暴露的敏感数据（尚无CVE编号）。  
  
  
  
所有这三个漏洞已在 Enterprise Server 版本3.14.2、3.13.5、3.12.10和3.11.16中修复。  
  
8月份，GitHub 还修复了一个严重漏洞CVE-2024-6800（CVSS评分9.5），可被滥用于获取站点管理员权限。  
  
建议运行易受攻击自托管 GHES 版本的组织机构尽快更新至最新版本。  
  
  
代码卫士试用地址：  
https://codesafe.qianxin.com  
  
开源卫士试用地址：https://oss.qianxin.com  
  
  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[GitHub Enterprise Server 中存在严重的认证漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247520551&idx=2&sn=c7d2ba1175a4c946fe47679b75e3c64e&chksm=ea94a04ddde3295bb0ef7a0d6531fee1957d5a1ffa8ba19cd572a05c40449b1f4706da88b90a&scene=21#wechat_redirect)  
  
  
[GitHub 企业服务器中存在严重漏洞，可导致认证绕过](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247519550&idx=1&sn=c9df29fac4cc88482637824b11ada5e4&chksm=ea94bc54dde335421f9f83bbe6ae67441821408144a318140245acf73e69aa18472aa1fc98fc&scene=21#wechat_redirect)  
  
  
[GitHub 企业服务器被曝高危 RCE 漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247502656&idx=2&sn=e386be82e4fb8a3fb76d10976ed3ecad&chksm=ea94fa2adde3733c947c7f67cdc83372ebd8c09d1a3c23f10776d0eddfc50dfa28d12742cc8d&scene=21#wechat_redirect)  
  
  
[存疑 CVE 漏洞带来无谓压力 热门开源项目开发者归档 GitHub 仓库](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247519930&idx=2&sn=acd4b1226ac3021b5aa91433e3f657f5&chksm=ea94bfd0dde336c6a6ba483f21d5d9572e139fb0e5cd5ac1a9ccde95f91e2330823dfbc71c20&scene=21#wechat_redirect)  
  
  
  
  
  
**原文链接**  
  
  
https://thehackernews.com/2024/10/github-patches-critical-flaw-in.html  
  
  
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
