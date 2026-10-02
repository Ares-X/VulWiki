---
source: "gelusus/wxvl 公众号漏洞文库"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
title: "极有可能被黑客利用，Outlook远程代码执行漏洞"
product: "Outlook CVE-2024-21413 MonikerLink 通告"
record_type: "unknown"
document_type: "技术文章（细分类待核）"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
prerequisites: "0click泄露到RCE需NTLM出站/中继目标签名等条件或密码破解，用户交互COM链也非任意COM组件都能RCE；04漏洞复现标题后无内容，后半所有节/版本/补丁URL粘连，21413后紧跟2导致URL错误"
side_effects: "原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%85%B6%E4%BB%96%E8%BD%AF%E4%BB%B6/%E6%9D%82%E9%A1%B9/%E6%9E%81%E6%9C%89%E5%8F%AF%E8%83%BD%E8%A2%AB%E9%BB%91%E5%AE%A2%E5%88%A9%E7%94%A8%EF%BC%8COutlook%E8%BF%9C%E7%A8%8B%E4%BB%A3%E7%A0%81%E6%89%A7%E8%A1%8C%E6%BC%8F%E6%B4%9E.md"
archive_commit: "41940cb0038d09ca5aaddbe5bffb923e423d210f"
source_status: "missing"
source_note: "原始出处待补；仓库归档不等同原始披露"
id: "vw-3629e3c617712dc2cb4854ac"
entity_id: "ve-3629e3c617712dc2cb4854ac"
schema_version: "1"
---

# 极有可能被黑客利用，Outlook远程代码执行漏洞

<!-- vulwiki-editorial-rebuild:system-misc -->
## 条目范围与校订

- 本文对象：Outlook CVE-2024-21413 MonikerLink 通告
- 文献类型：技术文章（细分类待核）
- 版本、权限及部署边界：0click泄露到RCE需NTLM出站/中继目标签名等条件或密码破解，用户交互COM链也非任意COM组件都能RCE；04漏洞复现标题后无内容，后半所有节/版本/补丁URL粘连，21413后紧跟2导致URL错误
- 核验状态：仅重建文本校订；未执行文中代码、PoC 或扫描，未把截图或转载声明记为本站复现

### 具体结论与待核项

以下为原归档的逐项勘误与证据缺口；可由文本确定的问题已在下文订正，仍缺来源的事实保持待核。

1. frontmatter漏21413，23397为相似历史利用不能作为21413已在野证据
2. 0click泄露到RCE需NTLM出站/中继目标签名等条件或密码破解，用户交互COM链也非任意COM组件都能RCE
3. 表暂无攻击与极可能或已经要分猜测/观测
4. 04漏洞复现标题后无内容，后半所有节/版本/补丁URL粘连，21413后紧跟2导致URL错误
5. 产品侧XVE-2023-37874与本篇XVE-2024-2628不一致疑串文
6. Office四分支缺具体KB/build，需MSRC矩阵
7. 百万影响无测量来源，保留时间点资讯

### 操作风险

原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响

技术请求、代码与实验方法按原文保留；其中的破坏性动作仅限授权、可恢复的隔离环境。缺失代码、参数或版本事实不猜补。

### 来源追溯

- 原始披露 URL 未确认；既有归档来源标签保留，不能替代原始公告

### 归档技术正文

原创 微步情报局  微步在线研究响应中心   2024-02-22 11:48  
  
![](https://mmbiz.qpic.cn/mmbiz_png/fFyp1gWjicMKNkm4Pg1Ed6nv0proxQLEKJ2CUCIficfAwKfClJ84puialc9eER0oaibMn1FDUpibeK1t1YvgZcLYl3A/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1 "")  
  
01 漏洞概况****  
  
  
  
Microsoft Outlook是微软办公软件套装的组件之一，用于收发电子邮件、日历、任务管理、联系人等功能。微步漏洞团队于近日检测到微软发布了二月份补丁，披露数个安全漏洞，其中包括Outlook远程代码执行漏洞（CVE-2024-21413）。该漏洞有两种利用场景：  
**无需用户交互**  
在该场景下，成功利用该漏洞可以造成受害者的NTLM哈希泄露，结合NTLM Relay或爆破等攻击方式可以达到RCE的效果。  
**需要用户交互**  
在该场景下，利用该漏洞可与  
任意COM组件的漏洞结合起来达到RCE的效果，例如Word的RTF解析漏洞。微步漏洞团队在对历史在野利用数据进行分析后，  
发现与本漏洞类似的Microsoft Outlook 特权提升漏洞（CVE-2023-23397）已被APT28组织大范围利用。相关IOC：https://www.trendmicro.com/content/dam/trendmicro/global/en/research/23/l/pawn-storm-uses-brute-force-and-stealth-against-high-value-targets-/iocs-pawn-storm-uses-brute-force-and-stealth-against-high-value-targets.txt  
综上所述，该漏洞利用难度低，危害大，极有可能（或已经）被攻击者利用。  
  
02 漏洞处置优先级（VPT）  
  
  
  
**综合处置优先级：**  
**高**  
  
<table><tbody style="visibility: visible;"><tr style="height: 23.3pt;visibility: visible;"><td width="128" valign="top" rowspan="1" style="padding: 0pt 5.4pt;border-width: 1pt;border-style: solid;border-color: rgb(191, 191, 191);word-break: break-all;visibility: visible;"><p style="visibility: visible;"><strong style="visibility: visible;"><span style="color: rgb(0, 0, 0);font-size: 14px;visibility: visible;">漏洞编号</span></strong></p></td><td width="127" valign="top" style="padding: 0pt 5.4pt;border-width: 1pt 1pt 1pt medium;border-style: solid solid solid none;border-color: rgb(191, 191, 191) rgb(191, 191, 191) rgb(191, 191, 191) currentcolor;visibility: visible;"><p style="visibility: visible;"><span style="font-size: 10.5pt;font-family: 微软雅黑;color: rgb(0, 0, 0);visibility: visible;">微步编号</span></p></td><td width="260" valign="top" style="padding: 0pt 5.4pt;border-width: 1pt 1pt 1pt medium;border-style: solid solid solid none;border-color: rgb(191, 191, 191) rgb(191, 191, 191) rgb(191, 191, 191) currentcolor;word-break: break-all;visibility: visible;"><p style="visibility: visible;"><span style="font-size: 10.5pt;font-family: 微软雅黑;color: rgb(0, 0, 0);visibility: visible;"></span><span style="color: rgb(0, 0, 0);font-size: 14px;letter-spacing: 0.578px;text-decoration: rgb(0, 0, 0);">XVE-2024-2628</span></p></td></tr><tr style="height:23.3000pt;"><td width="153" valign="top" rowspan="6" style="padding: 0pt 5.4pt;border-width: medium 1pt 1pt;border-style: none solid solid;border-color: currentcolor rgb(191, 191, 191) rgb(191, 191, 191);"><p><strong><span style="font-size: 10.5pt;color: rgb(0, 0, 0);font-family: 微软雅黑;">漏洞评估</span></strong></p></td><td width="127" valign="top" style="padding: 0pt 5.4pt;border-width: medium 1pt 1pt medium;border-style: none solid solid none;border-color: currentcolor rgb(191, 191, 191) rgb(191, 191, 191) currentcolor;"><p><span style="font-size: 10.5pt;font-family: 微软雅黑;color: rgb(0, 0, 0);">危害评级</span></p></td><td width="280" valign="top" style="padding: 0pt 5.4pt;border-width: medium 1pt 1pt medium;border-style: none solid solid none;border-color: currentcolor rgb(191, 191, 191) rgb(191, 191, 191) currentcolor;word-break: break-all;"><p><span style="font-size: 10.5pt;font-family: 微软雅黑;color: rgb(0, 0, 0);">高危</span></p></td></tr><tr style="height:23.3000pt;"><td width="194" valign="top" style="padding: 0pt 5.4pt;border-width: medium 1pt 1pt medium;border-style: none solid solid none;border-color: currentcolor rgb(191, 191, 191) rgb(191, 191, 191) currentcolor;"><p><span style="font-size: 10.5pt;color: rgb(0, 0, 0);font-family: 微软雅黑;">漏洞类型</span></p></td><td width="185" valign="top" style="padding: 0pt 5.4pt;border-width: medium 1pt 1pt medium;border-style: none solid solid none;border-color: currentcolor rgb(191, 191, 191) rgb(191, 191, 191) currentcolor;word-break: break-all;"><p><span style="font-size: 10.5pt;font-family: 微软雅黑;color: rgb(0, 0, 0);">RCE</span></p></td></tr><tr style="height:20.2500pt;"><td width="194" valign="top" style="padding: 0pt 5.4pt;border-width: medium 1pt 1pt medium;border-style: none solid solid none;border-color: currentcolor rgb(191, 191, 191) rgb(191, 191, 191) currentcolor;"><p><span style="font-size: 10.5pt;color: rgb(0, 0, 0);font-family: 微软雅黑;">公开程度</span></p></td><td width="185" valign="top" style="padding: 0pt 5.4pt;border-width: medium 1pt 1pt medium;border-style: none solid solid none;border-color: currentcolor rgb(191, 191, 191) rgb(191, 191, 191) currentcolor;word-break: break-all;"><p><span style="font-size: 10.5pt;font-family: 微软雅黑;color: rgb(0, 0, 0);">PoC已公开</span></p></td></tr><tr><td valign="top" colspan="1" rowspan="1" style="border-left-color: rgb(191, 191, 191);border-left-width: 1pt;border-top-color: rgb(191, 191, 191);border-top-width: 1pt;word-break: break-all;"><span style="font-size: 15px;">利用条件<br/></span></td><td valign="top" colspan="1" rowspan="1" style="border-left-color: rgb(191, 191, 191);border-left-width: 1pt;border-top-color: rgb(191, 191, 191);border-top-width: 1pt;word-break: break-all;"><span style="font-size: 15px;">无权限要求</span></td></tr><tr style="height:20.2500pt;"><td width="194" valign="top" style="padding: 0pt 5.4pt;border-width: medium 1pt 1pt medium;border-style: none solid solid none;border-color: currentcolor rgb(191, 191, 191) rgb(191, 191, 191) currentcolor;"><p><span style="font-size: 10.5pt;color: rgb(0, 0, 0);font-family: 微软雅黑;">交互要求</span></p></td><td width="185" valign="top" style="padding: 0pt 5.4pt;border-width: medium 1pt 1pt medium;border-style: none solid solid none;border-color: currentcolor rgb(191, 191, 191) rgb(191, 191, 191) currentcolor;word-break: break-all;"><p><span style="font-size: 10.5pt;font-family: 微软雅黑;color: rgb(0, 0, 0);"><span style="font-family:微软雅黑;">0-click/1-click</span></span><span style="font-size: 10.5pt;font-family: 微软雅黑;color: rgb(0, 0, 0);"></span></p></td></tr><tr style="height:20.2500pt;"><td width="194" valign="top" style="padding: 0pt 5.4pt;border-width: medium 1pt 1pt medium;border-style: none solid solid none;border-color: currentcolor rgb(191, 191, 191) rgb(191, 191, 191) currentcolor;"><p><span style="font-size: 10.5pt;color: rgb(0, 0, 0);font-family: 微软雅黑;">威胁类型</span></p></td><td width="185" valign="top" style="padding: 0pt 5.4pt;border-width: medium 1pt 1pt medium;border-style: none solid solid none;border-color: currentcolor rgb(191, 191, 191) rgb(191, 191, 191) currentcolor;"><p><span style="font-size: 10.5pt;font-family: 微软雅黑;color: rgb(0, 0, 0);">远程</span></p></td></tr><tr style="height:20.4000pt;"><td width="153" valign="top" style="padding: 0pt 5.4pt;border-width: medium 1pt 1pt;border-style: none solid solid;border-color: currentcolor rgb(191, 191, 191) rgb(191, 191, 191);"><p><strong><span style="font-size: 10.5pt;color: rgb(0, 0, 0);font-family: 微软雅黑;">利用情报</span></strong></p></td><td width="127" valign="top" style="padding: 0pt 5.4pt;border-width: medium 1pt 1pt medium;border-style: none solid solid none;border-color: currentcolor rgb(191, 191, 191) rgb(191, 191, 191) currentcolor;"><p><span style="font-size: 10.5pt;font-family: 微软雅黑;color: rgb(0, 0, 0);">微步已捕获攻击行为</span></p></td><td width="280" valign="top" style="padding: 0pt 5.4pt;border-width: medium 1pt 1pt medium;border-style: none solid solid none;border-color: currentcolor rgb(191, 191, 191) rgb(191, 191, 191) currentcolor;word-break: break-all;"><p><span style="font-size: 14px;">暂无</span></p></td></tr></tbody></table>  
  
### 03 漏洞影响范围 产品名称Microsoft Outlook受影响版本Microsoft Office 2016（32-bit/64-bit Edition)Microsoft Office LTSC 2021（32-bit/64-bit Edition)Microsoft 365 Apps for Enterprise（32-bit/64-bit Edition)Microsoft Office 2019（32-bit/64-bit Edition)影响范围百万级有无修复补丁有  
  
### 04 漏洞复现 05 修复方案1、官方修复方案：微软已发布更新补丁，请根据使用版本进行升级https://msrc.microsoft.com/update-guide/vulnerability/CVE-2024-214132、临时修复方案：1) 使用终端防护设备对终端进行防护2) 提升个人安全意识，不要轻易点击陌生邮件中的附件或链接06 微步产品侧支持情况1）微步在线威胁感知平台TDP已支持检测XVE-2023-37874 规则ID为 S3100138972、S310013897507 时间线 2024.02.14 厂商发布补丁2024.02.22 微步发布报告---End---微步漏洞情报订阅服务微步提供漏洞情报订阅服务，精准、高效助力企业漏洞运营提供高价值漏洞情报，具备及时、准确、全面和可操作性，帮助企业高效应对漏洞应急与日常运营难题；可实现对高威胁漏洞提前掌握，以最快的效率解决信息差问题，缩短漏洞运营MTTR；提供漏洞完整的技术细节，更贴近用户漏洞处置的落地；将漏洞与威胁事件库、APT组织和黑产团伙攻击大数据、网络空间测绘等结合，对漏洞的实际风险进行持续动态更新。扫码在线沟通↓↓↓点此电话咨询X 漏洞奖励计划“X漏洞奖励计划”是微步X情报社区推出的一款针对未公开漏洞的奖励计划，我们鼓励白帽子提交挖掘到的0day漏洞，并给予白帽子可观的奖励。我们期望通过该计划与白帽子共同努力，提升0day防御能力，守护数字世界安全。活动详情：https://x.threatbook.com/v5/vulReward  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原始披露 URL 尚未确认，现有链接按来源追溯区分别标注）
