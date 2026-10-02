---
cve: "CVE-2026-20163"
source: "gelusus/wxvl 公众号漏洞文库"
title: "Splunk远程代码执行漏洞使系统易受攻击者任意执行shell命令的攻击"
product: "Splunk Enterprise/Cloud upload indexing preview"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "active"
primary_identifiers: "CVE-2026-20163"
referenced_identifiers: ""
identifier_role: "primary"
prerequisites: "edit_cmd能力而非任何普通账号，unarchive_cmd处理路径可达；文列10.0/9.4/9.3分支"
source_status: "unknown"
side_effects: "原文未完整记录副作用、清理步骤或运行验证；阅读样例不等于获准在真实系统执行。"
id: "vw-c0e6c74630373f86f89cbb29"
entity_id: "ve-c0e6c74630373f86f89cbb29"
schema_version: "1"
---

# Splunk远程代码执行漏洞使系统易受攻击者任意执行shell命令的攻击

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 适用前提：edit_cmd能力而非任何普通账号，unarchive_cmd处理路径可达；文列10.0/9.4/9.3分支
- 证据范围：给端点/参数及能力前提但无请求与响应，属于公告摘要

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- edit_cmd是能力不是账户名，也未必仅内置admin
- 完全接管服务器应限服务账号权限
- 列受影响最高版本但无完整修复建议/官方依据；10.2不受影响需验证

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

原创 网络安全9527
                    网络安全9527  安全圈的那点事儿   2026-03-12 11:15  
  
Splunk Enterprise 和 Splunk Cloud Platform 中发现了一个高危远程命令执行 (RCE) 漏洞，使系统面临严重的安全风险。  
  
该严重漏洞被官方追踪为 CVE-2026-20163，CVSS 评分为 8.0，它允许恶意攻击者直接在主机操作系统上执行任意 shell 命令。  
  
该漏洞被归类为 CWE-77，它凸显了企业软件中输入中和不当的危险性。  
## 技术利用细节  
  
该漏洞的核心在于平台的 REST API，具体来说，在于该 /splunkd/__upload/indexing/preview 端点。  
  
当用户将文件上传到 Splunk 时，系统会在将这些文件索引到数据库之前对其进行预览。在此预览阶段，软件会使用一个名为 的参数 unarchive_cmd。  
  
由于 Splunk 未能正确清理输入到此参数中的数据，攻击者可以注入隐藏的 shell 命令。  
  
当系统处理文件预览时，会在不知不觉中执行攻击者的恶意指令。  
  
然而，有一个重要的限制因素降低了当前的威胁级别。要成功利用此漏洞，攻击者必须已经拥有具有高权限的用户账户 edit_cmd 。  
  
虽然这意味着普通用户无法触发该漏洞，但如果管理员账户被盗用，则会带来巨大的风险，使攻击者能够从应用程序访问转向完全接管服务器。  
  
此漏洞影响本地部署和云部署的多个版本。系统管理员必须对照以下受影响版本检查当前版本：  
- Splunk Enterprise 10.0：版本 10.0.0 至 10.0.3  
- Splunk Enterprise 9.4：版本 9.4.0 至 9.4.8  
- Splunk Enterprise 9.3：版本 9.3.0 至 9.3.9  
- Splunk 云平台：版本低于 10.2.2510.5、10.0.2503.12、10.1.2507.16 和 9.3.2411.24  
幸运的是，Splunk Enterprise 10.2 的基础组件不受此特定 REST API 缺陷的影响。  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
