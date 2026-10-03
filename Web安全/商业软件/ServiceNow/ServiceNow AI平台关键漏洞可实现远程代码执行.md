---
source: "gelusus/wxvl 公众号漏洞文库"
title: "ServiceNow AI Platform 0542沙箱远程代码执行通告"
product: "ServiceNow AI Platform"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "CVE-2026-0542"
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "未列发行系列/补丁；称2026-01-06托管实例更新"
prerequisites: "匿名声称，特定条件未公开"
side_effects: "命令/代码执行示例可能改变主机状态"
review_date: "2026-10-02"
identifier_role: "primary"
source_status: "unknown"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/ServiceNow/ServiceNow%20AI%E5%B9%B3%E5%8F%B0%E5%85%B3%E9%94%AE%E6%BC%8F%E6%B4%9E%E5%8F%AF%E5%AE%9E%E7%8E%B0%E8%BF%9C%E7%A8%8B%E4%BB%A3%E7%A0%81%E6%89%A7%E8%A1%8C.md"
id: "vw-4d0a8220df5c328ae6428d9a"
entity_id: "ve-4d0a8220df5c328ae6428d9a"
schema_version: "1"
---

# ServiceNow AI Platform 0542沙箱远程代码执行通告

## 条目说明

- 对象与具体问题：ServiceNow AI Platform；0542沙箱RCE通告
- 版本、配置及部署条件：未列发行系列/补丁；称2026-01-06托管实例更新
- 认证与权限前提：匿名声称，特定条件未公开
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 把RCE类型直接推导无需认证是概念错误；认证应由公告单独确认
- KB2693566仅编号无链接；CVSS9.8及网页/API/自动化影响组件无原始依据
- 托管已部署与自托管需补丁分开；未见利用仅公告时点状态
- 没有复现资料，应标通告而非完整技术分析

## 操作风险

命令/代码执行示例可能改变主机状态。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

原创 网络安全9527
                    网络安全9527  安全圈的那点事儿   2026-02-27 00:30  
  
企业级人工智能平台的一个关键漏洞已得到修复，该漏洞可能导致未经身份验证的远程代码执行。此安全漏洞编号为 CVE-2026-0542，对使用 ServiceNow 人工智能平台的组织构成重大风险。  
  
该漏洞存在于平台的沙箱环境中。在特定条件下，该漏洞可被利用以实现远程代码执行（RCE）。  
  
该漏洞（CVE-2026-0542）被归类为远程代码执行 (RCE) 漏洞。这意味着攻击者无需事先进行身份验证或获取凭据，即可在受影响的系统上执行恶意代码。  
  
该操作在 ServiceNow 沙箱中执行，这是一个旨在隔离不受信任代码的受限环境。  
  
<table><thead style="box-sizing: border-box;border-bottom-width: 3px;border-bottom-style: solid;border-bottom-color: currentcolor;"><tr style="box-sizing: border-box;"><th style="box-sizing: border-box;padding: 2px 8px;text-align: left;border: 1px solid rgba(0, 0, 0, 0);word-break: break-word;">指标</th><th style="box-sizing: border-box;padding: 2px 8px;text-align: left;border: 1px solid rgba(0, 0, 0, 0);word-break: break-word;">细节</th></tr></thead><tbody style="box-sizing: border-box;"><tr style="box-sizing: border-box;background-color: rgb(240, 240, 240);"><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);word-break: break-word;"><strong style="box-sizing: border-box;font-weight: bold;">CVE ID</strong></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);word-break: break-word;"><strong style="box-sizing: border-box;font-weight: bold;">CVE-2026-0542</strong></td></tr><tr style="box-sizing: border-box;"><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);word-break: break-word;"><strong style="box-sizing: border-box;font-weight: bold;">漏洞类型</strong></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);word-break: break-word;">远程代码执行 (RCE)</td></tr><tr style="box-sizing: border-box;background-color: rgb(240, 240, 240);"><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);word-break: break-word;"><strong style="box-sizing: border-box;font-weight: bold;">受影响的组件</strong></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);word-break: break-word;">人工智能平台（网页、API、自动化模块）</td></tr><tr style="box-sizing: border-box;"><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);word-break: break-word;"><strong style="box-sizing: border-box;font-weight: bold;">影响</strong></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);word-break: break-word;">系统入侵、数据窃取、工作流程篡改</td></tr><tr style="box-sizing: border-box;background-color: rgb(240, 240, 240);"><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);word-break: break-word;"><strong style="box-sizing: border-box;font-weight: bold;">攻击向量</strong></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);word-break: break-word;">远程网络访问，通常通过 HTTPS 进行。</td></tr><tr style="box-sizing: border-box;"><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);word-break: break-word;"><strong style="box-sizing: border-box;font-weight: bold;">严重程度</strong></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);word-break: break-word;">严重——CVSS 9.8</td></tr></tbody></table>  


但是，如果攻击成功，攻击者就可以绕过这些限制，未经授权访问或控制受影响的实例。  
  
虽然为了防止被利用，该漏洞的具体技术细节仍未公开，但未经身份验证的远程代码执行漏洞的严重性不容低估。  
  
威胁行为者极力寻找此类漏洞，因为它们无需用户交互或窃取凭证即可直接入侵系统。ServiceNow 已采取积极措施应对这一关键漏洞。  
  
根据该公司发布的安全公告（KB2693566），该公司于 2026 年 1 月 6 日向受影响的托管客户实例部署了安全更新。此外，该公司还向自托管客户和合作伙伴提供了安全更新。  
  
ServiceNow 表示，在发布该安全公告时，他们并不知道有任何针对客户实例的此漏洞已被实际利用。  
  
然而，潜在的影响凸显了应用所提供更新的必要性。公司建议客户尽快应用所提供的更新或更新版本（如果尚未应用）。  
  
参与一月份补丁更新计划的客户应该已经收到相应的更新。  
  
强烈建议使用 ServiceNow 的组织查看该公告并立即应用必要的补丁，以保护其环境免受 CVE-2026-0542 的潜在利用。  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
