---
cve: "CVE-2026-0229"
source: "gelusus/wxvl 公众号漏洞文库"
id: "vw-cc66cf63ac8aca8b0a22da06"
entity_id: "ve-cc66cf63ac8aca8b0a22da06"
schema_version: "1"
title: "Palo Alto Networks 防火墙漏洞允许攻击者强制防火墙进入重启循环"
product: "PAN-OS Advanced DNS Security"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "primary"
primary_identifiers: "CVE-2026-0229"
referenced_identifiers: ""
prerequisites: "ADNS及匹配Anti-Spyware策略；列12.1.2–3和11.2.0–9，修复12.1.4/11.2.10"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/Palo%20Alto/Palo%20Alto%20Networks%20%E9%98%B2%E7%81%AB%E5%A2%99%E6%BC%8F%E6%B4%9E%E5%85%81%E8%AE%B8%E6%94%BB%E5%87%BB%E8%80%85%E5%BC%BA%E5%88%B6%E9%98%B2%E7%81%AB%E5%A2%99%E8%BF%9B%E5%85%A5%E9%87%8D%E5%90%AF%E5%BE%AA%E7%8E%AF.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_status: "unknown"
---

#  Palo Alto Networks 防火墙漏洞允许攻击者强制防火墙进入重启循环  

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：PAN-OS Advanced DNS Security
- 本文讨论：CVE-2026-0229
- 版本、权限与配置前提：ADNS及匹配Anti-Spyware策略；列12.1.2–3和11.2.0–9，修复12.1.4/11.2.10
- 资料类型：DoS新闻预警；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 12.1受影响&lt;12.1.4与括注特定12.1.2–3的下界表达不清
- 无厂商直链、专家引述来源；维护模式与停止检查表述未交代是断流还是绕行

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- 版本矩阵、无缓解/无签名和无已知利用均待官方确认
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->

原创 网络安全9527
                    网络安全9527  安全圈的那点事儿   2026-02-13 02:01  
  
Palo Alto Networks 的 PAN-OS 软件中存在一个严重的拒绝服务 (DoS) 漏洞，未经身份验证的攻击者可以使防火墙陷入无休止的重启循环，从而可能瘫痪企业网络。  
  
该漏洞编号为 CVE-2026-0229，存在于高级 DNS 安全 (ADNS) 功能中。攻击者可以发送恶意构造的数据包来触发系统重启。  
  
反复的攻击会迫使防火墙进入维护模式，停止流量检查，并使组织面临服务中断的风险。云端下一代防火墙 (NGFW) 和 Prisma Access 不受影响。  
  
Palo Alto Networks 在一份安全公告中详细介绍了该问题，并确认当启用 ADNS 并同时启用间谍软件配置文件以阻止、拦截或发出警报流量时，该问题仅影响特定的 PAN-OS 版本。  
## 受影响版本及修复方案  
  
<table><thead style="box-sizing: border-box;border-bottom-width: 3px;border-bottom-style: solid;border-bottom-color: currentcolor;"><tr style="box-sizing: border-box;"><th style="box-sizing: border-box;padding: 2px 8px;text-align: left;border: 1px solid;word-break: break-word;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;">产品</font></font></th><th style="box-sizing: border-box;padding: 2px 8px;text-align: left;border: 1px solid;word-break: break-word;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;">受影响版本</font></font></th><th style="box-sizing: border-box;padding: 2px 8px;text-align: left;border: 1px solid;word-break: break-word;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;">修复版本</font></font></th></tr></thead><tbody style="box-sizing: border-box;"><tr style="box-sizing: border-box;"><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;">PAN-OS 12.1</font></font></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;">&lt; 12.1.4（特别是 12.1.2–12.1.3）</font></font></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;">≥ 12.1.4</font></font></td></tr><tr style="box-sizing: border-box;"><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;">PAN-OS 11.2</font></font></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;">&lt; 11.2.10 (11.2.0–11.2.9)</font></font></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;">≥ 11.2.10</font></font></td></tr><tr style="box-sizing: border-box;"><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;">PAN-OS 11.1</font></font></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;">None</td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;">all</td></tr><tr style="box-sizing: border-box;"><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;">PAN-OS 10.2</font></font></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;">None</td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;">all<br/></td></tr><tr style="box-sizing: border-box;"><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;">云下一代防火墙</font></font></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;">None</td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;">all</td></tr><tr style="box-sizing: border-box;"><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;">Prisma Access</font></font></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;">None</td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;">all</td></tr></tbody></table>  


该公司敦促管理员立即升级存在漏洞的系统。较旧且不受支持的 PAN-OS 版本应迁移到已修复的版本。目前没有变通方法，而且由于漏洞的设计原因，威胁防御签名也无法检测到利用该漏洞的情况。  
  
Palo Alto Networks 报告称，目前尚未发现任何利用此漏洞的案例。尽管如此，安全专家仍警告称，在高流量环境中存在风险。“此类 DoS 漏洞可能会引发严重的连锁反应，尤其是在与其他攻击叠加的情况下。依赖 Palo Alto Networks 进行边界防御的组织必须优先考虑漏洞修补。”  
  
启用 ADNS 的防火墙是抵御基于 DNS 威胁的关键防线，因此，对于拦截恶意域名的企业而言，这种风险尤其令人担忧。管理员应通过 Palo Alto Networks 的支持门户验证配置并扫描未打补丁的系统。  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
