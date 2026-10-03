---
source: "gelusus/wxvl 公众号漏洞文库"
title: "破解云端加密：亚马逊 AWS-LC 库中发现未经身份验证的绕过漏洞"
product: "AWS-LC加密库"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
source_status: "unknown"
prerequisites: "原文未完整说明身份权限、部署配置和可达性；不能假定匿名、默认开启或所有版本适用。"
side_effects: "原文未完整记录副作用、清理步骤或运行验证；阅读样例不等于获准在真实系统执行。"
id: "vw-8304c531142e8614e1580fe8"
entity_id: "ve-8304c531142e8614e1580fe8"
schema_version: "1"
---

# 破解云端加密：亚马逊 AWS-LC 库中发现未经身份验证的绕过漏洞

<!-- vulwiki-editorial:start -->
## 校订与适用边界


### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- 3336/3337/3338均缺元数据，3337正文编号夹空格
- 密码学消息/标签验证问题不等于云账户认证绕过或破解所有AWS加密
- 可利用性依应用使用PKCS7_verify/AES-CCM等前提
- authenticated attributes译已验证属性易混签名结果
- FIPS绑定包名和版本待AWS原始公告核
- HTML样式大量噪声但表格值需保留

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

sec随谈
                    sec随谈  sec随谈   2026-03-06 01:08  
  
网络安全研究人员在亚马逊的开源加密库 AWS-LC 中发现了三个重大漏洞。AWS-LC 被广泛应用于亚马逊的云基础设施和全球服务中。这些漏洞包括高危验证绕过漏洞和微妙的时序侧信道攻击，可能允许未经身份验证的攻击者破坏加密通信或验证伪造的数字签名。  
  
AWS-LC 是一个基于 Google 的 BoringSSL 和 OpenSSL 项目的通用库，是亚马逊 FIPS 验证产品和服务以及许多第三方应用程序的加密骨干。  
  
三个漏洞中有两个，即CVE-2026-3336和CVE-2026-3338，针对的是 PKCS7_verify() 函数，该函数负责验证加密消息语法 (CMS) 中的数字签名和证书链。  
- CVE-2026-3336 (CVSS 7.5)：此“证书链验证绕过”漏洞尤其危险。当处理具有多个签名者的 PKCS7 对象时，该库对证书的验证不正确。正如安全报告所述，此漏洞“允许未经身份验证的用户在处理具有多个签名者的 PKCS7 对象时绕过证书链验证，但最后一个签名者除外”。攻击者可以构造一个文件，其中较早的签名者验证失败，但如果最后一个签名者看起来合法，则整个软件包都会被接受。  
- CVE-2026-3338 (CVSS 7.5)：在处理具有“已验证属性”的对象时，存在相关的“签名验证绕过”漏洞。此漏洞“允许未经身份验证的用户在处理具有已验证属性的 PKCS7 对象时绕过签名验证”。  
第三个漏洞CVE -2026-3337 (CVSS 5.9) 是 AES-CCM 标签验证过程中的“时序侧信道”漏洞。与直接代码执行不同，时序攻击依赖于测量处理器执行操作所需时间的微小变化。  
  
在这种情况下，该库的 AES-CCM 解密使用了非恒定时间的身份验证标签比较。正如报告警告的那样，这“可能允许未经身份验证的用户通过时间分析来确定身份验证标签的有效性”。通过观察这些差异，攻击者理论上可以通过重复的、精确计时的查询来推断敏感数据或识别有效的标签。  
  
这些漏洞会影响多个版本的 AWS-LC 核心及其相关的系统绑定。  
<table><thead><tr style="box-sizing: inherit;"><td style="box-sizing: inherit;padding: 10px;border-top-width: 1px;border-top-style: solid;border-left-width: 1px;border-left-style: solid;border-bottom-width: 1px;border-bottom-style: solid;"><strong style="box-sizing: inherit;font-weight: bold;"><font dir="auto" style="box-sizing: inherit;vertical-align: inherit;"><font dir="auto" style="box-sizing: inherit;vertical-align: inherit;"><span leaf=""><span textstyle="" style="font-size: 15px;">漏洞</span></span></font></font></strong></td><td style="box-sizing: inherit;padding: 10px;border-top-width: 1px;border-top-style: solid;border-left-width: 1px;border-left-style: solid;border-bottom-width: 1px;border-bottom-style: solid;"><strong style="box-sizing: inherit;font-weight: bold;"><font dir="auto" style="box-sizing: inherit;vertical-align: inherit;"><font dir="auto" style="box-sizing: inherit;vertical-align: inherit;"><span leaf=""><span textstyle="" style="font-size: 15px;">受影响版本</span></span></font></font></strong></td><td style="box-sizing: inherit;padding: 10px;border-width: 1px;border-style: solid;"><strong style="box-sizing: inherit;font-weight: bold;"><font dir="auto" style="box-sizing: inherit;vertical-align: inherit;"><font dir="auto" style="box-sizing: inherit;vertical-align: inherit;"><span leaf=""><span textstyle="" style="font-size: 15px;">修复版本</span></span></font></font></strong></td></tr></thead><tbody><tr style="box-sizing: inherit;"><td style="box-sizing: inherit;padding: 10px;border-top-width: 1px;border-top-style: solid;border-left-width: 1px;border-left-style: solid;"><span data-path-to-node="14,1,0,0" style="box-sizing: inherit;"><b data-path-to-node="14,1,0,0" data-index-in-node="0" style="box-sizing: inherit;font-weight: bold;"><font dir="auto" style="box-sizing: inherit;vertical-align: inherit;"><font dir="auto" style="box-sizing: inherit;vertical-align: inherit;"><span leaf=""><span textstyle="" style="font-size: 15px;">CVE-2026-3336</span></span></font></font></b></span></td><td style="box-sizing: inherit;padding: 10px;border-top-width: 1px;border-top-style: solid;border-left-width: 1px;border-left-style: solid;"><span data-path-to-node="14,1,1,0" style="box-sizing: inherit;"><b data-path-to-node="14,1,1,0" data-index-in-node="0" style="box-sizing: inherit;font-weight: bold;"><font dir="auto" style="box-sizing: inherit;vertical-align: inherit;"><font dir="auto" style="box-sizing: inherit;vertical-align: inherit;"><span leaf=""><span textstyle="" style="font-size: 15px;">AWS-LC：</span></span></font></font></b><font dir="auto" style="box-sizing: inherit;vertical-align: inherit;"><font dir="auto" style="box-sizing: inherit;vertical-align: inherit;"><span leaf=""><span textstyle="" style="font-size: 15px;"> &lt; v1.69.0；</span></span></font></font><b data-path-to-node="14,1,1,0" data-index-in-node="19" style="box-sizing: inherit;font-weight: bold;"><font dir="auto" style="box-sizing: inherit;vertical-align: inherit;"><font dir="auto" style="box-sizing: inherit;vertical-align: inherit;"><span leaf=""><span textstyle="" style="font-size: 15px;">aws-lc-sys：</span></span></font></font></b><font dir="auto" style="box-sizing: inherit;vertical-align: inherit;"><font dir="auto" style="box-sizing: inherit;vertical-align: inherit;"><span leaf=""><span textstyle="" style="font-size: 15px;"> &lt; v0.38.0</span></span></font></font></span></td><td style="box-sizing: inherit;padding: 10px;border-top-width: 1px;border-top-style: solid;border-left-width: 1px;border-left-style: solid;border-right-width: 1px;border-right-style: solid;"><span data-path-to-node="14,1,2,0" style="box-sizing: inherit;"><b data-path-to-node="14,1,2,0" data-index-in-node="0" style="box-sizing: inherit;font-weight: bold;"><font dir="auto" style="box-sizing: inherit;vertical-align: inherit;"><font dir="auto" style="box-sizing: inherit;vertical-align: inherit;"><span leaf=""><span textstyle="" style="font-size: 15px;">v1.69.0 / v0.38.0</span></span></font></font></b></span></td></tr><tr style="box-sizing: inherit;"><td style="box-sizing: inherit;padding: 10px;border-top-width: 1px;border-top-style: solid;border-left-width: 1px;border-left-style: solid;"><span data-path-to-node="14,2,0,0" style="box-sizing: inherit;"><b data-path-to-node="14,2,0,0" data-index-in-node="0" style="box-sizing: inherit;font-weight: bold;"><font dir="auto" style="box-sizing: inherit;vertical-align: inherit;"><font dir="auto" style="box-sizing: inherit;vertical-align: inherit;"><span leaf=""><span textstyle="" style="font-size: 15px;">CVE-2026-3337</span></span></font></font></b></span></td><td style="box-sizing: inherit;padding: 10px;border-top-width: 1px;border-top-style: solid;border-left-width: 1px;border-left-style: solid;"><span data-path-to-node="14,2,1,0" style="box-sizing: inherit;"><b data-path-to-node="14,2,1,0" data-index-in-node="0" style="box-sizing: inherit;font-weight: bold;"><font dir="auto" style="box-sizing: inherit;vertical-align: inherit;"><font dir="auto" style="box-sizing: inherit;vertical-align: inherit;"><span leaf=""><span textstyle="" style="font-size: 15px;">AWS-LC：</span></span></font></font></b><font dir="auto" style="box-sizing: inherit;vertical-align: inherit;"><font dir="auto" style="box-sizing: inherit;vertical-align: inherit;"><span leaf=""><span textstyle="" style="font-size: 15px;"> &lt; v1.69.0；</span></span></font></font><b data-path-to-node="14,2,1,0" data-index-in-node="19" style="box-sizing: inherit;font-weight: bold;"><font dir="auto" style="box-sizing: inherit;vertical-align: inherit;"><font dir="auto" style="box-sizing: inherit;vertical-align: inherit;"><span leaf=""><span textstyle="" style="font-size: 15px;">aws-lc-sys：</span></span></font></font></b><font dir="auto" style="box-sizing: inherit;vertical-align: inherit;"><font dir="auto" style="box-sizing: inherit;vertical-align: inherit;"><span leaf=""><span textstyle="" style="font-size: 15px;"> &lt; v0.38.0</span></span></font></font></span></td><td style="box-sizing: inherit;padding: 10px;border-top-width: 1px;border-top-style: solid;border-left-width: 1px;border-left-style: solid;border-right-width: 1px;border-right-style: solid;"><span data-path-to-node="14,2,2,0" style="box-sizing: inherit;"><b data-path-to-node="14,2,2,0" data-index-in-node="0" style="box-sizing: inherit;font-weight: bold;"><font dir="auto" style="box-sizing: inherit;vertical-align: inherit;"><font dir="auto" style="box-sizing: inherit;vertical-align: inherit;"><span leaf=""><span textstyle="" style="font-size: 15px;">v1.69.0 / v0.38.0</span></span></font></font></b></span></td></tr><tr style="box-sizing: inherit;"><td style="box-sizing: inherit;padding: 10px;border-top-width: 1px;border-top-style: solid;border-left-width: 1px;border-left-style: solid;border-bottom-width: 1px;border-bottom-style: solid;"><span data-path-to-node="14,3,0,0" style="box-sizing: inherit;"><b data-path-to-node="14,3,0,0" data-index-in-node="0" style="box-sizing: inherit;font-weight: bold;"><font dir="auto" style="box-sizing: inherit;vertical-align: inherit;"><font dir="auto" style="box-sizing: inherit;vertical-align: inherit;"><span leaf=""><span textstyle="" style="font-size: 15px;">CVE-2026-3338</span></span></font></font></b></span></td><td style="box-sizing: inherit;padding: 10px;border-top-width: 1px;border-top-style: solid;border-left-width: 1px;border-left-style: solid;border-bottom-width: 1px;border-bottom-style: solid;"><span data-path-to-node="14,3,1,0" style="box-sizing: inherit;"><b data-path-to-node="14,3,1,0" data-index-in-node="0" style="box-sizing: inherit;font-weight: bold;"><font dir="auto" style="box-sizing: inherit;vertical-align: inherit;"><font dir="auto" style="box-sizing: inherit;vertical-align: inherit;"><span leaf=""><span textstyle="" style="font-size: 15px;">AWS-LC：</span></span></font></font></b><font dir="auto" style="box-sizing: inherit;vertical-align: inherit;"><font dir="auto" style="box-sizing: inherit;vertical-align: inherit;"><span leaf=""><span textstyle="" style="font-size: 15px;"> &lt; v1.69.0；</span></span></font></font><b data-path-to-node="14,3,1,0" data-index-in-node="19" style="box-sizing: inherit;font-weight: bold;"><font dir="auto" style="box-sizing: inherit;vertical-align: inherit;"><font dir="auto" style="box-sizing: inherit;vertical-align: inherit;"><span leaf=""><span textstyle="" style="font-size: 15px;">aws-lc-sys：</span></span></font></font></b><font dir="auto" style="box-sizing: inherit;vertical-align: inherit;"><font dir="auto" style="box-sizing: inherit;vertical-align: inherit;"><span leaf=""><span textstyle="" style="font-size: 15px;"> &lt; v0.38.0</span></span></font></font></span></td><td style="box-sizing: inherit;padding: 10px;border-width: 1px;border-style: solid;"><span data-path-to-node="14,3,2,0" style="box-sizing: inherit;"><b data-path-to-node="14,3,2,0" data-index-in-node="0" style="box-sizing: inherit;font-weight: bold;"><font dir="auto" style="box-sizing: inherit;vertical-align: inherit;"><font dir="auto" style="box-sizing: inherit;vertical-align: inherit;"><span leaf=""><span textstyle="" style="font-size: 15px;">v1.69.0 / v0.38.0</span></span></font></font></b></span></td></tr></tbody></table>  


对于使用 FIPS 验证模块的用户，AWS-LC-FIPS v3.2.0 和 aws-lc-sys-fips v0.13.12 解决了定时侧信道 ( CVE-2026-3337 ) 问题。  
  
目前尚无针对这些问题的已知解决方法。使用 AWS-LC 库或 aws-lc-rs Rust 绑定的开发人员应立即将其依赖项升级到最新版本，以确保其应用程序免受这些未经身份验证的网络攻击。  
  
参考链接：  
  
https://aws.amazon.com/cn/security/security-bulletins/rss/2026-005-aws/  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
