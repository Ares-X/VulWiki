---
cve: "CVE-2026-21643"
source: "gelusus/wxvl 公众号漏洞文库"
id: "vw-7623fac6c507bfcf1ca59762"
entity_id: "ve-7623fac6c507bfcf1ca59762"
schema_version: "1"
title: "Fortinet FortiClientEMS 存在严重漏洞，可远程执行代码"
product: "Fortinet FortiClientEMS"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "primary"
primary_identifiers: "CVE-2026-21643"
referenced_identifiers: ""
prerequisites: "仅7.4.4，7.4.5修复；7.2/8.0未受影响；匿名HTTP"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%AE%89%E5%85%A8%E8%AE%BE%E5%A4%87/FortiClientEMS/Fortinet%20FortiClientEMS%20%E5%AD%98%E5%9C%A8%E4%B8%A5%E9%87%8D%E6%BC%8F%E6%B4%9E%EF%BC%8C%E5%8F%AF%E8%BF%9C%E7%A8%8B%E6%89%A7%E8%A1%8C%E4%BB%A3%E7%A0%81.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_status: "unknown"
---

#  Fortinet FortiClientEMS 存在严重漏洞，可远程执行代码  

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Fortinet FortiClientEMS
- 本文讨论：CVE-2026-21643
- 版本、权限与配置前提：仅7.4.4，7.4.5修复；7.2/8.0未受影响；匿名HTTP
- 资料类型：EMS SQL注入公告新闻；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 表头Affected错译做作的，版本条件应保留为特定7.4.4而非全旧版
- 无PSIRT直链，SQL到代码的具体机制未展开，适合作公告
- 未知在野状态应保留，不自动标无利用

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- PSIRT版本/HTTP入口及CVSS来源待核
- 引用图片未查看，截图内容及有效性待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->

原创 ZM
                    ZM  暗镜   2026-02-10 01:01  
  
Fortinet 发布紧急公告，以解决 FortiClientEMS 的一个严重漏洞，该漏洞编号为 CVE-2026-21643（CVSS 评分为 9.1）。  
  
![](../../.resource/remote/709da93ea72906eaaca9a0a8090bbe2e9f83e1e5ea6339098385ab6b7a7adf2b.png "")  
  
  
该漏洞是 FortiClientEMS 中 SQL 命令（“SQL 注入”）问题的特殊元素未得到妥善处理。未经身份验证的攻击者可以通过精心构造的 HTTP 请求触发此漏洞，执行未经授权的代码或命令。  
  
该安全公告指出：“FortiClientEMS 中 SQL 命令（‘SQL 注入’）漏洞 [CWE-89] 中使用的特殊元素处理不当，可能允许未经身份验证的攻击者通过精心构造的 HTTP 请求执行未经授权的代码或命令。”  
  
一次成功的攻击可能会让攻击者在目标网络中获得初步立足点，从而实现横向移动或恶意软件部署。  
  
该漏洞是由 Fortinet 产品安全团队的 Gwendal Guégniaud 在内部发现并报告的。  
  
受影响的版本如下：  
  
<table><thead><tr style="box-sizing: border-box;margin: 0px;padding: 0px;border: 0px;font: inherit;vertical-align: baseline;"><th style="box-sizing: border-box;margin: 0px;padding: 0.5em;text-align: -webkit-match-parent;border: 1px solid;font: inherit;vertical-align: baseline;word-break: break-word;"><font dir="auto" style="box-sizing: border-box;margin: 0px;padding: 0px;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;margin: 0px;padding: 0px;vertical-align: inherit;"><span leaf="">版本</span></font></font></th><th style="box-sizing: border-box;margin: 0px;padding: 0.5em;text-align: -webkit-match-parent;border: 1px solid;font: inherit;vertical-align: baseline;word-break: break-word;"><font dir="auto" style="box-sizing: border-box;margin: 0px;padding: 0px;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;margin: 0px;padding: 0px;vertical-align: inherit;"><span leaf="">做作的</span></font></font></th><th style="box-sizing: border-box;margin: 0px;padding: 0.5em;text-align: -webkit-match-parent;border: 1px solid;font: inherit;vertical-align: baseline;word-break: break-word;"><font dir="auto" style="box-sizing: border-box;margin: 0px;padding: 0px;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;margin: 0px;padding: 0px;vertical-align: inherit;"><span leaf="">解决方案</span></font></font></th></tr></thead><tbody><tr style="box-sizing: border-box;margin: 0px;padding: 0px;border: 0px;font: inherit;vertical-align: baseline;"><td style="box-sizing: border-box;margin: 0px;padding: 0.5em;border: 1px solid;font: inherit;vertical-align: baseline;word-break: break-word;"><font dir="auto" style="box-sizing: border-box;margin: 0px;padding: 0px;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;margin: 0px;padding: 0px;vertical-align: inherit;"><span leaf="">FortiClientEMS 8.0</span></font></font></td><td style="box-sizing: border-box;margin: 0px;padding: 0.5em;border: 1px solid;font: inherit;vertical-align: baseline;word-break: break-word;"><font dir="auto" style="box-sizing: border-box;margin: 0px;padding: 0px;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;margin: 0px;padding: 0px;vertical-align: inherit;"><span leaf="">未受影响</span></font></font></td><td style="box-sizing: border-box;margin: 0px;padding: 0.5em;border: 1px solid;font: inherit;vertical-align: baseline;word-break: break-word;"><font dir="auto" style="box-sizing: border-box;margin: 0px;padding: 0px;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;margin: 0px;padding: 0px;vertical-align: inherit;"><span leaf="">不适用</span></font></font></td></tr><tr style="box-sizing: border-box;margin: 0px;padding: 0px;border: 0px;font: inherit;vertical-align: baseline;"><td style="box-sizing: border-box;margin: 0px;padding: 0.5em;border: 1px solid;font: inherit;vertical-align: baseline;word-break: break-word;"><font dir="auto" style="box-sizing: border-box;margin: 0px;padding: 0px;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;margin: 0px;padding: 0px;vertical-align: inherit;"><span leaf="">FortiClientEMS 7.4</span></font></font></td><td style="box-sizing: border-box;margin: 0px;padding: 0.5em;border: 1px solid;font: inherit;vertical-align: baseline;word-break: break-word;"><font dir="auto" style="box-sizing: border-box;margin: 0px;padding: 0px;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;margin: 0px;padding: 0px;vertical-align: inherit;"><span leaf="">7.4.4</span></font></font></td><td style="box-sizing: border-box;margin: 0px;padding: 0.5em;border: 1px solid;font: inherit;vertical-align: baseline;word-break: break-word;"><font dir="auto" style="box-sizing: border-box;margin: 0px;padding: 0px;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;margin: 0px;padding: 0px;vertical-align: inherit;"><span leaf="">升级到 7.4.5 或更高版本</span></font></font></td></tr><tr style="box-sizing: border-box;margin: 0px;padding: 0px;border: 0px;font: inherit;vertical-align: baseline;"><td style="box-sizing: border-box;margin: 0px;padding: 0.5em;border: 1px solid;font: inherit;vertical-align: baseline;word-break: break-word;"><font dir="auto" style="box-sizing: border-box;margin: 0px;padding: 0px;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;margin: 0px;padding: 0px;vertical-align: inherit;"><span leaf="">FortiClientEMS 7.2</span></font></font></td><td style="box-sizing: border-box;margin: 0px;padding: 0.5em;border: 1px solid;font: inherit;vertical-align: baseline;word-break: break-word;"><font dir="auto" style="box-sizing: border-box;margin: 0px;padding: 0px;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;margin: 0px;padding: 0px;vertical-align: inherit;"><span leaf="">未受影响</span></font></font></td><td style="box-sizing: border-box;margin: 0px;padding: 0.5em;border: 1px solid;font: inherit;vertical-align: baseline;word-break: break-word;"><font dir="auto" style="box-sizing: border-box;margin: 0px;padding: 0px;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;margin: 0px;padding: 0px;vertical-align: inherit;"><span leaf="">不适用</span></font></font></td></tr></tbody></table>  


该公司并未透露该漏洞目前是否已被实际利用。  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
