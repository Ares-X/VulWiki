---
source: "gelusus/wxvl 公众号漏洞文库"
title: "Zoom Workplace/Client/SDK/VDI 五漏洞补丁新闻"
product: "Zoom Workplace/Client/SDK/VDI"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "CVE-2025-27440;CVE-2025-27439;CVE-2025-0151;CVE-2025-0150;CVE-2025-0149"
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "5.15.5/6.2.0/5.14.12混合无CVE平台对应表"
prerequisites: "每漏洞鉴权/向量未列"
side_effects: "在线解密或外部服务可能收到凭据及敏感内容"
review_date: "2026-10-02"
identifier_role: "primary"
source_status: "unknown"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/Zoom/Zoom%E5%AE%A2%E6%88%B7%E7%AB%AF%E6%83%8A%E7%8E%B0%E9%AB%98%E5%8D%B1%E6%BC%8F%E6%B4%9E%EF%BC%8C%E6%95%B0%E7%99%BE%E4%B8%87%E7%94%A8%E6%88%B7%E6%95%B0%E6%8D%AE%E6%88%96%E6%B3%84%E9%9C%B2%EF%BC%81.md"
id: "vw-bfdf0f59069aaae0c0aa9c1f"
entity_id: "ve-bfdf0f59069aaae0c0aa9c1f"
schema_version: "1"
---

# Zoom Workplace/Client/SDK/VDI 五漏洞补丁新闻

## 条目说明

- 对象与具体问题：Zoom Workplace/Client/SDK/VDI；五漏洞补丁新闻
- 版本、配置及部署条件：5.15.5/6.2.0/5.14.12混合无CVE平台对应表
- 认证与权限前提：每漏洞鉴权/向量未列
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 五个实述主CVE应多实体记录；仅27440元数据不完整，12漏洞说法未列全
- 缓冲区下溢描述成超容量读取可能混淆边界方向；任意代码/密钥窃取/令牌拦截场景没有原始公告支持
- Zoom本身不支持E2EE断言高度可疑，必须核官方支持文档后纠正，不应建议第三方工具代替漏洞修补
- 所有平台统一升级6.2.0忽略SDK/VDI独立分支，需官方逐项版本矩阵
- 资讯只网站名无链接；标题数百万数据或泄露未给实际事件证据

## 操作风险

在线解密或外部服务可能收到凭据及敏感内容。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

看雪学苑  看雪学苑   2025-03-13 17:59  
  
近日，Zoom客户端软件被曝出多个高危安全漏洞，  
这些漏洞涉及Zoom的桌面端、移动端以及Workplace应用程序，可能使数百万用户面临数据泄露、权限提升和未授权访问的风险。  
  
  
根据Zoom在2025年3月11日发布的安全公告，此次修复的漏洞包括CVE-2025-27440（堆缓冲区溢出）、CVE-2025-27439（缓冲区下溢）、CVE-2025-0151（释放后使用）和CVE-2025-0150（iOS Workplace应用行为顺序错误），  
这些漏洞的CVSS评分均在7.1到8.5之间，属于高危漏洞。  
  
  
漏洞概述  
  
CVE-2025-27440  
  
该漏洞是由于Zoom应用程序在写入内存缓冲区时超出其容量，导致相邻内存区域被覆盖。攻击者可以利用这一漏洞向运行Zoom Workplace应用程序的系统注入恶意代码，尤其是Windows和macOS系统。例如，通过精心构造的网络数据包，攻击者可以在标准用户权限下提升至管理员权限。  
  
  
CVE-2025-27439  
  
当Zoom应用程序从缓冲区读取的数据超出其实际容量时，就会出现缓冲区下溢。这可能导致应用程序崩溃或暴露敏感内存内容，从而引发拒绝服务（DoS）攻击或会议数据泄露，尤其是在使用过时客户端的会议中。  
  
  
CVE-2025-0151）  
  
这是一种内存损坏漏洞，当Zoom应用程序在释放内存后仍引用该内存地址时发生。攻击者可以利用这一漏洞操纵已释放的内存，执行代码、窃取会议加密密钥或访问用户凭据。  
  
  
CVE-2025-0150  
  
Zoom Workplace应用在iOS上存在安全检查顺序不当的问题，攻击者可以在验证完成前拦截身份验证令牌或会议元数据。这一漏洞可能导致企业级数据在混合办公环境中被泄露。  
  
  
此外，还有一个中危漏洞CVE-2025-0149（CVSS评分6.5），允许未经授权的用户发送格式错误的网络数据包，绕过真实性检查，触发DoS条件。这一漏洞凸显了Zoom数据验证协议的系统性弱点，影响了所有平台的Workplace应用。  
  
  
受影响的软件包括：Windows、macOS和Linux的Zoom桌面客户端（版本低于5.15.5和6.2.0）、Android和iOS的Zoom移动应用（版本低于5.15.5），以及版本低于5.14.12的Zoom会议SDK和VDI客户端。Zoom安全团队已经发布了补丁，但并未详细说明具体攻击场景或对客户的影响。公司建议所有用户升级到Zoom客户端6.2.0或更高版本，该版本修复了2025年3月披露的12个漏洞。  
  
  
建议  
  
- 优先更新Zoom Workplace、会议SDK和VDI客户端。  
  
- 限制Zoom流量仅对认证用户开放，减少网络攻击的风险。  
  
- 审查日志以查找异常活动，如意外的权限变更或会议反复崩溃。  
  
- 对于高风险环境，考虑使用第三方工具强制实施端到端加密（E2EE），因为Zoom本身不支持。  
  
  
  
  
资讯来源：  
cybersecuritynews  
  
转载请注明出处和本文链接  
  
  
  
﹀  
  
﹀  
  
﹀  
  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/Uia4617poZXP96fGaMPXib13V1bJ52yHq9ycD9Zv3WhiaRb2rKV6wghrNa4VyFR2wibBVNfZt3M5IuUiauQGHvxhQrA/640?wx_fmt=jpeg "")  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_gif/1UG7KPNHN8Fjcl6q2ORwibt8PXPU5bLibE1yC1VFg5b1Fw8RncvZh2CWWiazpL6gPXp0lXED2x1ODLVNicsagibuxRw/640?wx_fmt=gif&from=appmsg "")  
  
**球分享**  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_gif/1UG7KPNHN8Fjcl6q2ORwibt8PXPU5bLibE1yC1VFg5b1Fw8RncvZh2CWWiazpL6gPXp0lXED2x1ODLVNicsagibuxRw/640?wx_fmt=gif&from=appmsg "")  
  
**球点赞**  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_gif/1UG7KPNHN8Fjcl6q2ORwibt8PXPU5bLibE1yC1VFg5b1Fw8RncvZh2CWWiazpL6gPXp0lXED2x1ODLVNicsagibuxRw/640?wx_fmt=gif&from=appmsg "")  
  
**球在看**  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_gif/1UG7KPNHN8Fjcl6q2ORwibt8PXPU5bLibExiboJzOiafqGLvlOkrmU6NIr3qSr7ibpkIo2N5mhCTNXoMl37s2oRSIDw/640?wx_fmt=gif&from=appmsg "")  
  
点击阅读原文查看更多  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
