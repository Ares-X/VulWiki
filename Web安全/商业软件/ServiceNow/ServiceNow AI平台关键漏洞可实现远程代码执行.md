---
cve: "CVE-2026-0542"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  ServiceNow AI平台关键漏洞可实现远程代码执行  
原创 网络安全9527
                    网络安全9527  安全圈的那点事儿   2026-02-27 00:30  
  
企业级人工智能平台的一个关键漏洞已得到修复，该漏洞可能导致未经身份验证的远程代码执行。此安全漏洞编号为 CVE-2026-0542，对使用 ServiceNow 人工智能平台的组织构成重大风险。  
  
该漏洞存在于平台的沙箱环境中。在特定条件下，该漏洞可被利用以实现远程代码执行（RCE）。  
  
该漏洞（CVE-2026-0542）被归类为远程代码执行 (RCE) 漏洞。这意味着攻击者无需事先进行身份验证或获取凭据，即可在受影响的系统上执行恶意代码。  
  
该操作在 ServiceNow 沙箱中执行，这是一个旨在隔离不受信任代码的受限环境。  
  
<table><thead style="box-sizing: border-box;border-bottom-width: 3px;border-bottom-style: solid;border-bottom-color: currentcolor;"><tr style="box-sizing: border-box;"><th style="box-sizing: border-box;padding: 2px 8px;text-align: left;border: 1px solid rgba(0, 0, 0, 0);word-break: break-word;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;">指标</font></font></th><th style="box-sizing: border-box;padding: 2px 8px;text-align: left;border: 1px solid rgba(0, 0, 0, 0);word-break: break-word;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;">细节</font></font></th></tr></thead><tbody style="box-sizing: border-box;"><tr style="box-sizing: border-box;background-color: rgb(240, 240, 240);"><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);word-break: break-word;"><strong style="box-sizing: border-box;font-weight: bold;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;">CVE ID</font></font></strong></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);word-break: break-word;"><strong style="box-sizing: border-box;font-weight: bold;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;">CVE-2026-0542</font></font></strong></td></tr><tr style="box-sizing: border-box;"><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);word-break: break-word;"><strong style="box-sizing: border-box;font-weight: bold;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;">漏洞类型</font></font></strong></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);word-break: break-word;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;">远程代码执行 (RCE)</font></font></td></tr><tr style="box-sizing: border-box;background-color: rgb(240, 240, 240);"><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);word-break: break-word;"><strong style="box-sizing: border-box;font-weight: bold;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;">受影响的组件</font></font></strong></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);word-break: break-word;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;">人工智能平台（网页、API、自动化模块）</font></font></td></tr><tr style="box-sizing: border-box;"><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);word-break: break-word;"><strong style="box-sizing: border-box;font-weight: bold;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;">影响</font></font></strong></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);word-break: break-word;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;">系统入侵、数据窃取、工作流程篡改</font></font></td></tr><tr style="box-sizing: border-box;background-color: rgb(240, 240, 240);"><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);word-break: break-word;"><strong style="box-sizing: border-box;font-weight: bold;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;">攻击向量</font></font></strong></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);word-break: break-word;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;">远程网络访问，通常通过 HTTPS 进行。</font></font></td></tr><tr style="box-sizing: border-box;"><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);word-break: break-word;"><strong style="box-sizing: border-box;font-weight: bold;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;">严重程度</font></font></strong></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);word-break: break-word;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;">严重——CVSS 9.8</font></font></td></tr></tbody></table>  
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
