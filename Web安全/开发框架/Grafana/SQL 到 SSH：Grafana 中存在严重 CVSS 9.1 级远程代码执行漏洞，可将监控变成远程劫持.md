---
source: "gelusus/wxvl 公众号漏洞文库"
product: "Grafana/SQL文件写入链与OpenFeature DoS"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "CVE-2026-27876; CVE-2026-27880"
referenced_identifiers: ""
identifier_role: "primary"
identifier_status: "unknown"
title: "SQL 到 SSH：Grafana 中存在严重 CVSS 9.1 级远程代码执行漏洞，可将监控变成远程劫持"
prerequisites: "来源所述条件，未列明部分仍待核：列12.4.2及12.3/12.2/12.1/11.6分支补丁但未给分支固定小版本；DoS起点12.1.0"
side_effects: "未执行；本文需注意的操作影响：功能开关与攻击者能力混淆；写攻击者通过启用sqlExpressions，未证明Viewer能启用管理员功能；完整SSH连接并非任意文件写入或RCE必然结果；修复矩阵与缓解边界不足；只给12.4.2完整版本；高可用自动重启是恢复能力不是防止内存耗尽；禁插件与关闭功能是替代/组合关系应核实"
source_status: "unknown"
id: "vw-77d4bdb49b99de5ff197cad5"
entity_id: "ve-77d4bdb49b99de5ff197cad5"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：列12.4.2及12.3/12.2/12.1/11.6分支补丁但未给分支固定小版本；DoS起点12.1.0

代码与实验材料：无PoC；RCE需Viewer查询、sqlExpressions开启及Sqlyze/AWS相关链，DoS无认证无限输入

来源证据范围：链接Grafana官方双漏洞安全发布，2026-03-30转述

- **操作与副作用边界（1）**：功能开关与攻击者能力混淆；依据：写攻击者通过启用sqlExpressions，未证明Viewer能启用管理员功能；完整SSH连接并非任意文件写入或RCE必然结果。保留原步骤及请求方法。执行条件包括隔离且获授权的可恢复环境、预先记录相关文件/账号/配置/业务记录状态；响应完成不能等同无副作用，恢复时须核对该操作涉及的实际对象。

- **操作与副作用边界（2）**：修复矩阵与缓解边界不足；依据：只给12.4.2完整版本；高可用自动重启是恢复能力不是防止内存耗尽；禁插件与关闭功能是替代/组合关系应核实。保留原步骤及请求方法。执行条件包括隔离且获授权的可恢复环境、预先记录相关文件/账号/配置/业务记录状态；响应完成不能等同无副作用，恢复时须核对该操作涉及的实际对象。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

#  SQL 到 SSH：Grafana 中存在严重 CVSS 9.1 级远程代码执行漏洞，可将监控变成远程劫持  
sec随谈
                    sec随谈  sec随谈   2026-03-30 01:10  
  
Grafana 团队发布紧急安全公告，披露了两个重大**漏洞**，攻击者可利用这些漏洞劫持服务器或导致实例崩溃。此次发布的 Grafana 12.4.2版本，以及针对12.3、12.2、12.1和11.6版本的补丁，修复了一个严重的远程代码执行 (RCE) 漏洞和一个高危拒绝服务 (DoS) 漏洞。  
  
建议安全团队“尽快安装新发布的版本”，以保护其监控基础设施。  
  
最严重的威胁，编号为CVE-2026-27876 (CVSS 9.1)，存在于 Grafana 的 SQL 表达式功能中。该工具旨在帮助用户使用熟悉的 SQL 语法转换查询数据，但其处理文件写入的方式存在**缺陷**，使其成为一个危险的入口点。  
  
根据该公告：  
> “然而，这种语法也允许向文件系统写入任意文件，从而可以将多个攻击向量串联起来，实现远程代码执行。”  
  
  
攻击原理：  
- 要求：攻击者只需要查看者权限或更高权限即可执行数据源查询。  
- 漏洞利用：通过启用 sqlExpressions 功能开关，攻击者可以覆盖 Sqlyze 驱动程序或创建恶意 AWS 数据源配置文件。  
- 结果：成功利用该漏洞可以建立与 Grafana 主机的完整 SSH 连接。  
第二个漏洞CVE-2026-27880（CVSS 7.5）针对 Grafana 的 OpenFeature 端点。这些端点目前不需要身份验证，更重要的是，它们接受“无限制的用户输入”。  
  
由于此输入直接读取到内存中，未经身份验证的攻击者可以通过发送大量请求耗尽所有可用系统内存，从而使服务器崩溃。此**漏洞**影响 v12.1.0 及更高版本。  
  
对所有管理员的首要建议是完全升级到最新的补丁版本。但是，对于无法立即更新的用户，我们提供以下几种替代方案：  
<table><thead><tr style="box-sizing: inherit;"><td style="box-sizing: inherit;padding: 10px;border-top-width: 1px;border-top-style: solid;border-left-width: 1px;border-left-style: solid;border-bottom-width: 1px;border-bottom-style: solid;"><strong style="box-sizing: inherit;font-weight: bold;"><font dir="auto" style="box-sizing: inherit;vertical-align: inherit;"><font dir="auto" style="box-sizing: inherit;vertical-align: inherit;"><span leaf=""><span textstyle="" style="font-size: 15px;">漏洞</span></span></font></font></strong></td><td style="box-sizing: inherit;padding: 10px;border-width: 1px;border-style: solid;"><strong style="box-sizing: inherit;font-weight: bold;"><font dir="auto" style="box-sizing: inherit;vertical-align: inherit;"><font dir="auto" style="box-sizing: inherit;vertical-align: inherit;"><span leaf=""><span textstyle="" style="font-size: 15px;">缓解方案</span></span></font></font></strong></td></tr></thead><tbody><tr style="box-sizing: inherit;"><td style="box-sizing: inherit;padding: 10px;border-top-width: 1px;border-top-style: solid;border-left-width: 1px;border-left-style: solid;"><span data-path-to-node="17,1,0,0" style="box-sizing: inherit;"><b data-path-to-node="17,1,0,0" data-index-in-node="0" style="box-sizing: inherit;font-weight: bold;"><font dir="auto" style="box-sizing: inherit;vertical-align: inherit;"><font dir="auto" style="box-sizing: inherit;vertical-align: inherit;"><span leaf=""><span textstyle="" style="font-size: 15px;">CVE-2026-27876</span></span></font></font></b><font dir="auto" style="box-sizing: inherit;vertical-align: inherit;"><font dir="auto" style="box-sizing: inherit;vertical-align: inherit;"><span leaf=""><span textstyle="" style="font-size: 15px;">（远程代码执行）</span></span></font></font></span></td><td style="box-sizing: inherit;padding: 10px;border-top-width: 1px;border-top-style: solid;border-left-width: 1px;border-left-style: solid;border-right-width: 1px;border-right-style: solid;"><p data-path-to-node="17,1,1,0" style="box-sizing: inherit;margin: 0px 0px 30px;"><span data-path-to-node="17,1,1,0,1" style="box-sizing: inherit;"><span style="box-sizing: inherit;"><font dir="auto" style="box-sizing: inherit;vertical-align: inherit;"><font dir="auto" style="box-sizing: inherit;vertical-align: inherit;"><span leaf=""><span textstyle="" style="font-size: 15px;">• 关闭</span></span></font></font></span><code data-path-to-node="17,1,1,0,1" data-index-in-node="14" style="box-sizing: inherit;font-family: monospace, monospace;font-size: 1em;padding: 2px 4px;color: rgb(199, 37, 78);background-color: rgb(249, 242, 244);border-radius: 4px;"><span style="box-sizing: inherit;"><span leaf=""><span textstyle="" style="font-size: 15px;">sqlExpressions</span></span></span></code><span style="box-sizing: inherit;"><font dir="auto" style="box-sizing: inherit;vertical-align: inherit;"><font dir="auto" style="box-sizing: inherit;vertical-align: inherit;"><span leaf=""><span textstyle="" style="font-size: 15px;">功能开关</span></span></font></font></span></span><span data-path-to-node="17,1,1,0,4" style="box-sizing: inherit;"><span style="box-sizing: inherit;"><font dir="auto" style="box-sizing: inherit;vertical-align: inherit;"><font dir="auto" style="box-sizing: inherit;vertical-align: inherit;"><span leaf=""><span textstyle="" style="font-size: 15px;">。</span></span></font></font></span></span></p><p data-path-to-node="17,1,1,2" style="box-sizing: inherit;margin: 0px 0px 30px;"><span data-path-to-node="17,1,1,2,0" style="box-sizing: inherit;"><span style="box-sizing: inherit;"><font dir="auto" style="box-sizing: inherit;vertical-align: inherit;"><font dir="auto" style="box-sizing: inherit;vertical-align: inherit;"><span leaf=""><span textstyle="" style="font-size: 15px;">• 将 Sqlyze 更新到 v1.5.0 或禁用它</span></span></font></font></span></span><span data-path-to-node="17,1,1,2,3" style="box-sizing: inherit;"><span style="box-sizing: inherit;"><font dir="auto" style="box-sizing: inherit;vertical-align: inherit;"><font dir="auto" style="box-sizing: inherit;vertical-align: inherit;"><span leaf=""><span textstyle="" style="font-size: 15px;">。</span></span></font></font></span></span></p><p data-path-to-node="17,1,1,4" style="box-sizing: inherit;margin: 0px;"><span data-path-to-node="17,1,1,4,0" style="box-sizing: inherit;"><span style="box-sizing: inherit;"><font dir="auto" style="box-sizing: inherit;vertical-align: inherit;"><font dir="auto" style="box-sizing: inherit;vertical-align: inherit;"><span leaf=""><span textstyle="" style="font-size: 15px;">• 禁用所有已安装的 AWS 数据源</span></span></font></font></span></span><span data-path-to-node="17,1,1,4,2" style="box-sizing: inherit;"><font dir="auto" style="box-sizing: inherit;vertical-align: inherit;"><font dir="auto" style="box-sizing: inherit;vertical-align: inherit;"><span leaf=""><span textstyle="" style="font-size: 15px;">。</span></span></font></font></span></p></td></tr><tr style="box-sizing: inherit;"><td style="box-sizing: inherit;padding: 10px;border-top-width: 1px;border-top-style: solid;border-left-width: 1px;border-left-style: solid;border-bottom-width: 1px;border-bottom-style: solid;"><span data-path-to-node="17,2,0,0" style="box-sizing: inherit;"><b data-path-to-node="17,2,0,0" data-index-in-node="0" style="box-sizing: inherit;font-weight: bold;"><font dir="auto" style="box-sizing: inherit;vertical-align: inherit;"><font dir="auto" style="box-sizing: inherit;vertical-align: inherit;"><span leaf=""><span textstyle="" style="font-size: 15px;">CVE-2026-27880</span></span></font></font></b><font dir="auto" style="box-sizing: inherit;vertical-align: inherit;"><font dir="auto" style="box-sizing: inherit;vertical-align: inherit;"><span leaf=""><span textstyle="" style="font-size: 15px;">（拒绝服务攻击）</span></span></font></font></span></td><td style="box-sizing: inherit;padding: 10px;border-width: 1px;border-style: solid;"><p data-path-to-node="17,2,1,0" style="box-sizing: inherit;margin: 0px 0px 30px;"><span data-path-to-node="17,2,1,0,1" style="box-sizing: inherit;"><span style="box-sizing: inherit;"><font dir="auto" style="box-sizing: inherit;vertical-align: inherit;"><font dir="auto" style="box-sizing: inherit;vertical-align: inherit;"><span leaf=""><span textstyle="" style="font-size: 15px;">• 在具有自动重启功能的高可用性环境中部署 Grafana </span></span></font></font></span></span><span data-path-to-node="17,2,1,0,4" style="box-sizing: inherit;"><span style="box-sizing: inherit;"><font dir="auto" style="box-sizing: inherit;vertical-align: inherit;"><font dir="auto" style="box-sizing: inherit;vertical-align: inherit;"><span leaf=""><span textstyle="" style="font-size: 15px;">。</span></span></font></font></span></span></p><p data-path-to-node="17,2,1,2" style="box-sizing: inherit;margin: 0px;"><span data-path-to-node="17,2,1,2,0" style="box-sizing: inherit;"><span style="box-sizing: inherit;"><font dir="auto" style="box-sizing: inherit;vertical-align: inherit;"><font dir="auto" style="box-sizing: inherit;vertical-align: inherit;"><span leaf=""><span textstyle="" style="font-size: 15px;">• 使用反向代理（如 Nginx 或 Cloudflare）来限制输入有效负载的大小</span></span></font></font></span></span><span data-path-to-node="17,2,1,2,2" style="box-sizing: inherit;"><font dir="auto" style="box-sizing: inherit;vertical-align: inherit;"><font dir="auto" style="box-sizing: inherit;vertical-align: inherit;"><span leaf=""><span textstyle="" style="font-size: 15px;">。</span></span></font></font></span></p></td></tr></tbody></table>  
管理员应注意，虽然这些变通方法可以降低风险，“但它们可能会对 Grafana 用户造成干扰，并且不能完全修复漏洞”。  
  
参考链接:  
  
https://grafana.com/blog/grafana-security-release-critical-and-high-severity-security-fixes-for-cve-2026-27876-and-cve-2026-27880/  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
