---
source: "gelusus/wxvl 公众号漏洞文库"
title: "Progress Software修复了多个高严重性的LoadMaster漏洞"
product: "Progress Kemp LoadMaster/MT"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "active"
primary_identifiers: "CVE-2024-56131; CVE-2024-56132; CVE-2024-56133; CVE-2024-56134; CVE-2024-56135"
referenced_identifiers: "CVE-2024-1212"
identifier_role: "primary"
cve: "CVE-2024-56131; CVE-2024-56132; CVE-2024-56133; CVE-2024-56134; CVE-2024-56135"
prerequisites: "已认证管理接口用户；56134为文件读取，其他为OS命令注入"
source_status: "unknown"
side_effects: "原文未完整记录副作用、清理步骤或运行验证；阅读样例不等于获准在真实系统执行。"
id: "vw-435c75b0e0e98c2f4e6c9298"
entity_id: "ve-435c75b0e0e98c2f4e6c9298"
schema_version: "1"
---

# Progress Software修复了多个高严重性的LoadMaster漏洞

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 适用前提：已认证管理接口用户；56134为文件读取，其他为OS命令注入
- 证据范围：多CVE同补丁公告应多实体，1212是既往在野新闻不可混合鉴权前提。

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- 版本表产品行XML验证文件明显译错，应属LTSF分支；下一产品名空白
- 无厂商或新闻原文链接，2025-02-05修复表需追溯官方
- 未发现野外攻击仅文章当时厂商声明
- 缺任何注入点/请求，只能公告级别，HTML可转标准表

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

鹏鹏同学  黑猫安全   2025-02-12 01:29  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/8dBEfDPEceicvPuXb9EFFX3xqtQkPpsCGHjIeibTdmZomCw1lmDrqjJQGo5vfYxhE4WvgQiasFDGDFyhKLAesS01g/640?wx_fmt=png&from=appmsg "")  
  
Progress Software已修复其LoadMaster软件中的多个高严重性安全漏洞（CVE-2024-56131、CVE-2024-56132、CVE-2024-56133、CVE-2024-56134、CVE-2024-56135）。  
  
Progress Software的LoadMaster是一款高性能负载均衡器和应用交付控制器（ADC），旨在优化Web应用和服务的可用性、安全性和性能。它帮助将网络流量高效地分配到多个服务器，以确保可靠性和可扩展性。  
  
以下是这些漏洞的描述：  
- CVE-2024-56131**（CVSS评分：8.4）是一个输入验证不当漏洞，可能允许LoadMaster中的认证用户实现操作系统命令注入。  
  
- CVE-2024-56132**（CVSS评分：8.4）是一个输入验证不当漏洞，可能允许LoadMaster中的认证用户实现操作系统命令注入。  
  
- CVE-2024-56133**是一个输入验证不当漏洞，可能允许LoadMaster中的认证用户实现操作系统命令注入。  
  
- CVE-2024-56135**（CVSS评分：8.4）是一个输入验证不当漏洞，可能允许LoadMaster中的认证用户实现操作系统命令注入。  
  
一旦远程攻击者获得LoadMaster管理界面的访问权限并成功认证，就可以通过使用特制的HTTP请求执行任意系统命令。  
  
Progress修复的最后一个高严重性漏洞是**CVE-2024-56134**（CVSS评分：8.4），这是一个输入验证不当漏洞，可能允许获得管理界面访问权限并成功认证的远程攻击者下载系统上任何文件的内容。攻击者可以通过特制的HTTP请求利用该漏洞。  
  
这些漏洞影响以下版本：  
<table><thead><tr><th valign="top" style="color: rgb(var(--ds-rgb-label-1));padding-left: 0px;border-bottom: 1px solid rgb(var(--ds-rgb-label-3));border-top: 1px solid rgb(var(--ds-rgb-label-3));font-weight: 600;text-align: left;"><section><span leaf="">产品</span></section></th><th valign="top" style=" color: rgb(var(--ds-rgb-label-1)); border-bottom: 1px solid rgb(var(--ds-rgb-label-3));border-top: 1px solid rgb(var(--ds-rgb-label-3));font-weight: 600;text-align: left; "><section><span leaf="">受影响版本</span></section></th><th valign="top" style=" color: rgb(var(--ds-rgb-label-1)); border-bottom: 1px solid rgb(var(--ds-rgb-label-3));border-top: 1px solid rgb(var(--ds-rgb-label-3));font-weight: 600;text-align: left; "><section><span leaf="">修复版本</span></section></th><th valign="top" style=" color: rgb(var(--ds-rgb-label-1)); border-bottom: 1px solid rgb(var(--ds-rgb-label-3));border-top: 1px solid rgb(var(--ds-rgb-label-3));font-weight: 600;text-align: left; "><section><span leaf="">发布日期</span></section></th></tr></thead><tbody><tr><td valign="top" style="padding-left: 0px;border-bottom: 1px solid rgb(var(--ds-rgb-label-3));"><section><span leaf="">LoadMaster</span></section></td><td valign="top" style="  border-bottom: 1px solid rgb(var(--ds-rgb-label-3)); "><section><span leaf="">7.2.55.0至7.2.60.1（含）</span></section></td><td valign="top" style="  border-bottom: 1px solid rgb(var(--ds-rgb-label-3)); "><section><span leaf="">7.2.61.0（GA）</span></section></td><td valign="top" style="  border-bottom: 1px solid rgb(var(--ds-rgb-label-3)); "><section><span leaf="">2025年2月5日</span></section></td></tr><tr><td valign="top" style="padding-left: 0px;border-bottom: 1px solid rgb(var(--ds-rgb-label-3));"><section><span leaf="">XML验证文件</span></section></td><td valign="top" style="  border-bottom: 1px solid rgb(var(--ds-rgb-label-3)); "><section><span leaf="">7.2.49.0至7.2.54.12（含）</span></section></td><td valign="top" style="  border-bottom: 1px solid rgb(var(--ds-rgb-label-3)); "><section><span leaf="">7.2.54.13（LTSF）</span></section></td><td valign="top" style="  border-bottom: 1px solid rgb(var(--ds-rgb-label-3)); "><section><span leaf="">2025年2月5日</span></section></td></tr><tr><td valign="top" style="padding-left: 0px;border-bottom: 1px solid rgb(var(--ds-rgb-label-3));"><section><span leaf=""><br/></span></section></td><td valign="top" style="  border-bottom: 1px solid rgb(var(--ds-rgb-label-3)); "><section><span leaf="">7.2.48.12及之前所有版本</span></section></td><td valign="top" style="  border-bottom: 1px solid rgb(var(--ds-rgb-label-3)); "><section><span leaf="">升级至LTSF或GA</span></section></td><td valign="top" style="  border-bottom: 1px solid rgb(var(--ds-rgb-label-3)); "><section><span leaf="">2025年2月5日</span></section></td></tr><tr><td valign="top" style="padding-left: 0px;border-bottom: 1px solid rgb(var(--ds-rgb-label-3));"><section><span leaf="">多租户LoadMaster</span></section></td><td valign="top" style="  border-bottom: 1px solid rgb(var(--ds-rgb-label-3)); "><section><span leaf="">7.1.35.12及之前所有版本</span></section></td><td valign="top" style="  border-bottom: 1px solid rgb(var(--ds-rgb-label-3)); "><section><span leaf="">7.1.35.13（GA）</span></section></td><td valign="top" style="  border-bottom: 1px solid rgb(var(--ds-rgb-label-3)); "><section><span leaf="">2025年2月5日</span></section></td></tr></tbody></table>  
  
该公司尚未发现利用上述漏洞的野外攻击。  
  
2024年11月，美国网络安全和基础设施安全局（CISA）将CVE-2024-1212 Progress Kemp LoadMaster问题添加到其已知被利用漏洞（KEV）目录中。  
  
CVE-2024-1212是一个Progress Kemp LoadMaster操作系统命令注入问题，未经认证的远程攻击者可以利用该漏洞执行任意系统命令，带来重大安全风险。  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
