---
source: "gelusus/wxvl 公众号漏洞文库"
cve: "CVE-2024-8811;CVE-2024-11477"
identifier_role: "primary"
primary_identifiers: "CVE-2024-8811;CVE-2024-11477"
referenced_identifiers: ""
identifier_status: "unknown"
title: "winzip、7z 压缩软件存在漏洞需以及一条不可信的 Linux 0day 漏洞预警"
product: "WinZip与7-Zip"
record_type: "vulnerability"
document_type: "多产品漏洞简报及未证实传闻"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
prerequisites: "WinZip文中76.8修复；7-Zip24.07修复Zstandard整数下溢；各自需处理不可信归档"
side_effects: "原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E6%A1%8C%E9%9D%A2%E8%BD%AF%E4%BB%B6/WinZip/winzip%E3%80%817z%20%E5%8E%8B%E7%BC%A9%E8%BD%AF%E4%BB%B6%E5%AD%98%E5%9C%A8%E6%BC%8F%E6%B4%9E%E9%9C%80%E4%BB%A5%E5%8F%8A%E4%B8%80%E6%9D%A1%E4%B8%8D%E5%8F%AF%E4%BF%A1%E7%9A%84%20Linux%200day%20%E6%BC%8F%E6%B4%9E%E9%A2%84%E8%AD%A6.md"
archive_commit: "41940cb0038d09ca5aaddbe5bffb923e423d210f"
source_status: "missing"
source_note: "原始出处待补；仓库归档不等同原始披露"
id: "vw-9de89083d17c2736d48fd8ac"
entity_id: "ve-9de89083d17c2736d48fd8ac"
schema_version: "1"
---

# winzip、7z 压缩软件存在漏洞需以及一条不可信的 Linux 0day 漏洞预警

<!-- vulwiki-editorial-rebuild:system-misc -->
## 条目范围与校订

- 本文对象：WinZip与7-Zip
- 文献类型：多产品漏洞简报及未证实传闻
- 版本、权限及部署边界：WinZip文中76.8修复；7-Zip24.07修复Zstandard整数下溢；各自需处理不可信归档
- 核验状态：仅重建文本校订；未执行文中代码、PoC 或扫描，未把截图或转载声明记为本站复现

### 具体结论与待核项

以下为原归档的逐项勘误与证据缺口；可由文本确定的问题已在下文订正，仍缺来源的事实保持待核。

1. 两独立产品CVE无元数据且放同一WinZip目录，应拆实体保留简报
2. WinZip76.8与常见发行版本体系关系需核验，不可凭常识直接改数字；缺两份ZDI原始链接
3. 7-Zip为Zstandard解析内存缺陷，不应按同文WinZip MotW归类；使用者调用库与GUI交互条件不同
4. Linux0day售卖只是无PoC低信誉账号传闻，作者已明确不可信，不得生成确定漏洞实体
5. 保留各表时间线/作者，清理内联样式与重复叙述；关联既有7-Zip11477文章

### 操作风险

原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响

技术请求、代码与实验方法按原文保留；其中的破坏性动作仅限授权、可恢复的隔离环境。缺失代码、参数或版本事实不猜补。

### 来源追溯

- 原始披露 URL 未确认；既有归档来源标签保留，不能替代原始公告

### 归档技术正文

 独眼情报   2024-11-23 07:09  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/KgxDGkACWnTNNicdRDCjuRO46761bVq60uyWOvYxspDyt1lHzDdGw8RA63e84jGRo2LibdySVg73G9tnfg1zvkTw/640?wx_fmt=png&from=appmsg "")  
  
安全研究人员发现了广泛使用的文件归档工具 WinZip 中的一个严重漏洞，该漏洞可能允许攻击者绕过关键的安全措施并可能在用户的系统上执行恶意代码。  
  
该漏洞被标记为 CVE-2024-8811，CVSS 评分为 7.8（高），影响 WinZip 76.8 版之前的所有版本。它利用了 WinZip 处理“Web 标记”的漏洞，这是 Windows 用来标记从互联网下载的文件的安全功能。此标记警告用户文件可能存在潜在危险，并触发额外的安全预防措施。  
  
然而，由 Peter Girnus (@gothburz) 领导的趋势科技零日计划的研究人员发现，WinZip 在处理下载的存档文件时无意中删除了这个至关重要的 Mark-of-the-Web 标志。这意味着，即使从互联网上下载了恶意文件并对其进行了压缩，WinZip 也会删除警告标志，从而可能欺骗用户认为它是安全的。  
### 攻击如何进行：  
1. 恶意档案：攻击者制作一个包含恶意文件（例如恶意软件或脚本）的 zip 档案。  
  
1. 引诱受害者：攻击者诱骗用户下载此恶意档案，可能是通过网络钓鱼电子邮件或受感染的网站。  
  
1. WinZip 删除标记：当用户使用 WinZip 打开下载的档案时，该软件会删除 Web 标记，从而有效地隐藏文件的潜在有害来源。  
  
1. 漏洞利用：用户在不了解危险的情况下提取文件。如果没有 Web 标记，Windows 可能无法实施适当的安全措施，从而可能允许恶意代码执行。  
  
### 影响：  
  
成功利用此漏洞可能导致严重后果，包括：  
1. 恶意软件执行：攻击者可以传递和执行恶意软件，例如勒索软件、间谍软件或木马，从而危害用户的系统和数据。  
  
1. 数据盗窃：敏感信息可能被盗，导致身份盗窃或财务损失。  
  
1. 系统接管：攻击者可以控制用户的系统，并可能利用它进行进一步的恶意活动。  
  
### 需要采取紧急行动：  
  
强烈建议 WinZip 用户立即将其软件更新至76.8或更高版本。此更新解决了漏洞并确保保留了 Mark-of-the-Web，从而为恶意文件提供了关键的保护层。  
  
<table><thead><tr><th style="line-height: 1.5em;letter-spacing: 0em;background: none 0% 0% / auto no-repeat scroll padding-box border-box rgb(240, 240, 240);width: auto;height: auto;border-top-width: 1px;border-color: rgba(204, 204, 204, 0.4);border-radius: 0px;min-width: 85px;text-align: left;" width="115">CVE 编号</th><th style="line-height: 1.5em;letter-spacing: 0em;text-align: left;background: none 0% 0% / auto no-repeat scroll padding-box border-box rgb(240, 240, 240);width: auto;height: auto;border-top-width: 1px;border-color: rgba(204, 204, 204, 0.4);border-radius: 0px;min-width: 85px;" width="318">CVE-2024-11477</th></tr></thead><tbody style="line-height: 1.5em;letter-spacing: 0em;border-width: 0px;border-style: initial;border-color: initial;"><tr style="background: none 0% 0% / auto no-repeat scroll padding-box border-box rgb(255, 255, 255);width: auto;height: auto;"><td style="min-width: 85px;border-color: rgba(204, 204, 204, 0.4);border-radius: 0px;" width="135">CVSS 分数</td><td style="min-width: 85px;border-color: rgba(204, 204, 204, 0.4);border-radius: 0px;" width="338">7.8</td></tr><tr style="background: none 0% 0% / auto no-repeat scroll padding-box border-box rgb(248, 248, 248);width: auto;height: auto;"><td style="min-width: 85px;border-color: rgba(204, 204, 204, 0.4);border-radius: 0px;" width="135">受影响的供应商</td><td style="min-width: 85px;border-color: rgba(204, 204, 204, 0.4);border-radius: 0px;" width="318">7-Zip</td></tr><tr style="background: none 0% 0% / auto no-repeat scroll padding-box border-box rgb(255, 255, 255);width: auto;height: auto;"><td style="min-width: 85px;border-color: rgba(204, 204, 204, 0.4);border-radius: 0px;" width="135">受影响的产品</td><td style="min-width: 85px;border-color: rgba(204, 204, 204, 0.4);border-radius: 0px;" width="318">7-Zip</td></tr><tr style="background: none 0% 0% / auto no-repeat scroll padding-box border-box rgb(248, 248, 248);width: auto;height: auto;"><td style="min-width: 85px;border-color: rgba(204, 204, 204, 0.4);border-radius: 0px;" width="135">漏洞详细信息</td><td style="min-width: 85px;border-color: rgba(204, 204, 204, 0.4);border-radius: 0px;" width="318">此漏洞允许远程攻击者在受影响的 7-Zip 安装上执行任意代码。要利用此漏洞，需要与此库进行交互，但攻击媒介可能因实施情况而异。该特定缺陷存在于 Zstandard 解压缩的实现中。该问题是由于缺乏对用户提供的数据的适当验证而导致的，这可能导致在写入内存之前出现整数下溢。攻击者可以利用此漏洞在当前进程的上下文中执行代码。</td></tr><tr style="background: none 0% 0% / auto no-repeat scroll padding-box border-box rgb(255, 255, 255);width: auto;height: auto;"><td style="min-width: 85px;border-color: rgba(204, 204, 204, 0.4);border-radius: 0px;" width="135">更多详细信息</td><td style="min-width: 85px;border-color: rgba(204, 204, 204, 0.4);border-radius: 0px;" width="318">已在 7-Zip 24.07 中修复</td></tr><tr style="background: none 0% 0% / auto no-repeat scroll padding-box border-box rgb(248, 248, 248);width: auto;height: auto;"><td style="min-width: 85px;border-color: rgba(204, 204, 204, 0.4);border-radius: 0px;" width="135">披露时间表</td><td style="min-width: 85px;border-color: rgba(204, 204, 204, 0.4);border-radius: 0px;" width="318">2024-06-12 - 向供应商报告漏洞2024-11-20 - 协调公开发布咨询报告2024-11-20 - 通报已更新</td></tr><tr style="background: none 0% 0% / auto no-repeat scroll padding-box border-box rgb(255, 255, 255);width: auto;height: auto;"><td style="min-width: 85px;border-color: rgba(204, 204, 204, 0.4);border-radius: 0px;" width="135">CREDIT</td><td style="min-width: 85px;border-color: rgba(204, 204, 204, 0.4);border-radius: 0px;" width="318">趋势科技安全研究部门的 Nicholas Zubrisky (@NZubrisky)</td></tr></tbody></table>  
  
<table><thead><tr><th style="line-height: 1.5em;letter-spacing: 0em;text-align: left;background: none 0% 0% / auto no-repeat scroll padding-box border-box rgb(240, 240, 240);width: auto;height: auto;border-top-width: 1px;border-color: rgba(204, 204, 204, 0.4);border-radius: 0px;min-width: 85px;" width="157">CVE 编号</th><th style="line-height: 1.5em;letter-spacing: 0em;text-align: left;background: none 0% 0% / auto no-repeat scroll padding-box border-box rgb(240, 240, 240);width: auto;height: auto;border-top-width: 1px;border-color: rgba(204, 204, 204, 0.4);border-radius: 0px;min-width: 85px;" width="318">CVE-2024-8811</th></tr></thead><tbody style="line-height: 1.5em;letter-spacing: 0em;border-width: 0px;border-style: initial;border-color: initial;"><tr style="background: none 0% 0% / auto no-repeat scroll padding-box border-box rgb(255, 255, 255);width: auto;height: auto;"><td style="min-width: 85px;border-color: rgba(204, 204, 204, 0.4);border-radius: 0px;" width="135">CVSS 分数</td><td style="min-width: 85px;border-color: rgba(204, 204, 204, 0.4);border-radius: 0px;" width="338">7.8</td></tr><tr style="background: none 0% 0% / auto no-repeat scroll padding-box border-box rgb(248, 248, 248);width: auto;height: auto;"><td style="min-width: 85px;border-color: rgba(204, 204, 204, 0.4);border-radius: 0px;" width="135">受影响的供应商</td><td style="min-width: 85px;border-color: rgba(204, 204, 204, 0.4);border-radius: 0px;" width="318">WinZip</td></tr><tr style="background: none 0% 0% / auto no-repeat scroll padding-box border-box rgb(255, 255, 255);width: auto;height: auto;"><td style="min-width: 85px;border-color: rgba(204, 204, 204, 0.4);border-radius: 0px;" width="135">受影响的产品</td><td style="min-width: 85px;border-color: rgba(204, 204, 204, 0.4);border-radius: 0px;" width="318">WinZip</td></tr><tr style="background: none 0% 0% / auto no-repeat scroll padding-box border-box rgb(248, 248, 248);width: auto;height: auto;"><td style="min-width: 85px;border-color: rgba(204, 204, 204, 0.4);border-radius: 0px;" width="135">漏洞详细信息</td><td style="min-width: 85px;border-color: rgba(204, 204, 204, 0.4);border-radius: 0px;" width="318">此漏洞允许远程攻击者绕过受影响的 WinZip 安装上的 Mark-of-the-Web 保护机制。要利用此漏洞，需要用户交互，即目标必须访问恶意页面或打开恶意文件。该特定漏洞存在于存档文件的处理中。当打开带有 Mark-of-the-Web 的存档时，WinZip 会从存档文件中删除 Mark-of-the-Web。提取后，提取的文件也会缺少 Mark-of-the-Web。攻击者可以利用此漏洞在当前用户的上下文中执行任意代码。</td></tr><tr style="background: none 0% 0% / auto no-repeat scroll padding-box border-box rgb(255, 255, 255);width: auto;height: auto;"><td style="min-width: 85px;border-color: rgba(204, 204, 204, 0.4);border-radius: 0px;" width="135">更多详细信息</td><td style="min-width: 85px;border-color: rgba(204, 204, 204, 0.4);border-radius: 0px;" width="318">在 WinZip 76.8 中已修复</td></tr><tr style="background: none 0% 0% / auto no-repeat scroll padding-box border-box rgb(248, 248, 248);width: auto;height: auto;"><td style="min-width: 85px;border-color: rgba(204, 204, 204, 0.4);border-radius: 0px;" width="135">披露时间表</td><td style="min-width: 85px;border-color: rgba(204, 204, 204, 0.4);border-radius: 0px;" width="318">2024-05-03 - 向供应商报告漏洞2024-09-17 - 协调公开发布咨询报告2024-09-17 - 通报已更新</td></tr><tr style="background: none 0% 0% / auto no-repeat scroll padding-box border-box rgb(255, 255, 255);width: auto;height: auto;"><td style="min-width: 85px;border-color: rgba(204, 204, 204, 0.4);border-radius: 0px;" width="135">CREDIT</td><td style="min-width: 85px;border-color: rgba(204, 204, 204, 0.4);border-radius: 0px;" width="318">趋势科技零日计划的 Peter Girnus (@gothburz)</td></tr></tbody></table>  
  
  
# Linux 0day售卖预警  
  
  
  
卖家是 0 贴用户，也未提供 poc 不可信。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/KgxDGkACWnTNNicdRDCjuRO46761bVq60pzsslGgciba1LuNG346CRDevdSDhcvFYIRflueoq6DxQtgicy3y8gKTQ/640?wx_fmt=other&from=appmsg "")  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原始披露 URL 尚未确认，现有链接按来源追溯区分别标注）
