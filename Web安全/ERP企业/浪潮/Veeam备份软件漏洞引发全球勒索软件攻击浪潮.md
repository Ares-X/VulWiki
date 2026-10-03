---
source: "gelusus/wxvl 公众号漏洞文库"
title: "Veeam Backup & Replication 凭据泄露利用与勒索事件新闻"
product: "Veeam Backup & Replication"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "CVE-2023-27532"
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "修复2023-03，build缺"
prerequisites: "源述不明；事件初始SSH不等已证漏洞入口"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
identifier_role: "primary"
identifier_note: "来源编号存在未核实/冲突，未作为确认主编号：CVE-2023-275327"
source_status: "unknown"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/ERP%E4%BC%81%E4%B8%9A/%E6%B5%AA%E6%BD%AE/Veeam%E5%A4%87%E4%BB%BD%E8%BD%AF%E4%BB%B6%E6%BC%8F%E6%B4%9E%E5%BC%95%E5%8F%91%E5%85%A8%E7%90%83%E5%8B%92%E7%B4%A2%E8%BD%AF%E4%BB%B6%E6%94%BB%E5%87%BB%E6%B5%AA%E6%BD%AE.md"
category_recommendation: "备份软件 / Veeam"
id: "vw-e77ca69db9853099a27b86ed"
entity_id: "ve-e77ca69db9853099a27b86ed"
schema_version: "1"
---

# Veeam Backup & Replication 凭据泄露利用与勒索事件新闻

## 条目说明

- 对象与具体问题：Veeam Backup & Replication；凭据泄露利用与勒索事件新闻
- 版本、配置及部署条件：修复2023-03，build缺
- 认证与权限前提：源述不明；事件初始SSH不等已证漏洞入口
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。
- 编号待核：CVE-2023-275327。未核实的编号不作为本条确认主编号。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 已按原文中的具体接口、源码或上下文直接更正产品、根因或修复说明；未知版本和未经证明的影响仍明确保留为待核实。
- Akira案例漏洞利用为专家认为，不能升级成确认因果；FIN7/Estate不同事件分开
- 缺BlackBerry/GroupIB官方来源链接，推广表格噪声多

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

 信息安全大事件   2024-07-16 22:51  
  
漏洞   
CVE-2023-27532（原首段编号多一位，按同文两处编号纠正；映射待原厂确认。CVSS 评分为 7.5）会影响 Veeam Backup & Replication 组件。攻击者可利用此问题获取存储在配置数据库中的加密凭据，从而可能导致访问备份基础结构主机。  
  
该漏洞已于   
2023 年 3 月得到解决，不久后，该问题的PoC 漏洞利用代码被公开发布。  
  
专家观察到，俄罗斯网络犯罪集团   
FIN7 自 2023 年 4 月以来一直在利用该漏洞，黑莓的研究人员报告说，2024 年 6 月，一名威胁行为者使用 Akira 勒索软件瞄准了一家拉丁美洲航空公司。对目标网络的最初访问是通过安全外壳 （SSH） 协议进行的，攻击者在第二天部署 Akira 勒索软件之前泄露了关键数据。他们滥用合法工具和生活异地二进制文件和脚本 （LOLBAS） 进行侦察和持久性。数据泄露完成后，攻击者部署勒索软件来加密受感染的系统。Akira 是一种勒索软件即服务 （RaaS），已被 Storm-1567（又名 Punk Spider 和 GOLD SAHARA）使用，该组织自 2023 年以来一直活跃。对 Remmina 相关域的 DNS 查询等指标表明攻击者可能是基于 Linux 的用户。  
  
以下是   
Akira 攻击链的第 1 天和第 2 天：  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/JqliagemfTA4jsOvP2baH7lkibOq6KzKdejd9YXC5c1iaxwOr5XXfCeZjibvL53MB8B4YGh8ibaJvMwjmibre9TNCloA/640?wx_fmt=png&from=appmsg "")  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/JqliagemfTA4jsOvP2baH7lkibOq6KzKdefyM8WZgVZkKawnic5odUn3GcsRLibFVeZTeg6xyNNIg68BsQNHPX8NibQ/640?wx_fmt=png&from=appmsg "")  
  
在对一家拉丁美洲航空公司的攻击中，攻击者首次通过路由器   
IP 地址的 SSH 对未打补丁的Veeam 备份服务器进行可见访问。专家认为，攻击者利用公开可用的漏洞漏洞CVE-2023-27532。  
  
进入网络后，攻击者创建了一个名为“backup”的用户，并将其添加到管理员组以保护提升的权限。攻击者部署了合法的网络管理工具高级 IP 扫描程序来扫描通过“路由打印”识别的本地子网。  
  
攻击者通过访问   
Veeam 备份文件夹来控制 Veeam 备份数据，并压缩和上传各种文件类型（包括文档、图像和电子表格），以收集机密和有价值的信息。攻击者使用免费的 Windows 文件管理器 WinSCP 将数据泄露到他们控制的服务器。  
  
从初始登录到数据泄露的整个操作仅用了   
133 分钟，最终命令在 UTC 时间下午 4：55 结束。  
  
“当NetScan在主Veeam备份服务器上运行时，通过防病毒用户界面（UI）和命令行在虚拟机主机上禁用了防病毒（AV）保护，”BlackBerry发布的报告写道。“现在，持久性已经完全到位，威胁行为者试图使用Veeam备份服务器作为控制点，在全网范围内部署勒索软件。我们看到文件“w.exe”（Akira 勒索软件）被部署在受感染的 Veeam 服务器的各种主机上。  
  
Group-IB研究人员还发现了一个勒索软件组织利用 Veeam Backup & Replication 实例中的漏洞。专家报告称，2024 年 4 月，EstateRansomware 团伙使用 PoC 漏洞利用代码针对漏洞 CVE-2023-27532。  
  
<table><tbody style="outline: 0px;visibility: visible;"><tr class="ue-table-interlace-color-single js_darkmode__0" data-style="outline: 0px; background-color: rgb(28, 28, 28); visibility: visible; color: rgb(205, 205, 205) !important;" style="outline: 0px;background-color: rgb(28, 28, 28);visibility: visible;color: rgb(205, 205, 205) !important;"><td width="557" valign="top" data-style="outline: 0px; word-break: break-all; hyphens: auto; border-color: rgb(76, 76, 76); background-color: rgb(255, 218, 169); visibility: visible; color: rgb(25, 25, 25) !important;" class="js_darkmode__1" style="outline: 0px;word-break: break-all;hyphens: auto;border-color: rgb(76, 76, 76);background-color: rgb(255, 218, 169);visibility: visible;color: rgb(25, 25, 25) !important;"><section style="outline: 0px;line-height: normal;visibility: visible;"><span style="outline: 0px;font-size: 12px;visibility: visible;color: rgb(0, 0, 0);">尊敬的读者：<br style="outline: 0px;visibility: visible;"/>感谢您花时间阅读我们提供的这篇文章。我们非常重视您的时间和精力，并深知信息对您的重要性。<br style="outline: 0px;visibility: visible;"/>我们希望了解您对这篇文章的看法和感受。我们真诚地想知道您是否认为这篇文章为您带来了有价值的资讯和启示，是否有助于您的个人或职业发展。<br style="outline: 0px;visibility: visible;"/>如果您认为这篇文章对您非常有价值，并且希望获得更多的相关资讯和服务，我们愿意为您提供进一步的定制化服务。请通过填写我们提供的在线表单，与我们联系并提供您的邮箱地址或其他联系方式。我们将定期向您发送相关资讯和更新，以帮助您更好地了解我们的服务和文章内容。</span></section><section style="outline: 0px;line-height: normal;visibility: visible;"><br style="outline: 0px;visibility: visible;"/></section><section style="outline: 0px;line-height: normal;text-indent: 0em;visibility: visible;"><span style="outline: 0px;color: rgb(0, 0, 0);">                       </span><img class="rich_pages wxw-img" data-backh="106" data-backw="106" data-cropselx1="0" data-cropselx2="119" data-cropsely1="0" data-cropsely2="119" data-galleryid="" data-imgfileid="100005879" data-ratio="1" data-s="300,640" data-type="png" data-w="1000" data-src="https://mmbiz.qpic.cn/sz_mmbiz_png/JqliagemfTA5N8G6ZVujodYTTD7NSaxFG5suXlkibicfoGRzCk6vHhCUBx7ST8b4AxdsFVNNAH4ltePBWX4AxKY0A/640?wx_fmt=other&amp;wxfrom=5&amp;wx_lazy=1&amp;wx_co=1&amp;tp=webp" style="outline: 0px;font-family: 宋体;font-size: 14px;letter-spacing: 0.578px;text-align: center;visibility: visible !important;width: 119px !important;"/></section><section style="outline: 0px;line-height: normal;text-indent: 0em;"><span style="outline: 0px;font-family: 宋体;font-size: 12px;letter-spacing: 0.578px;text-align: center;color: rgb(0, 0, 0);">                               扫描二维码，参与调查</span></section><section style="outline: 0px;line-height: normal;"><br style="outline: 0px;letter-spacing: 0.544px;"/></section></td></tr></tbody></table>  
  
**END**  
  
  
  
点击下方，关注公众号  
  
获取免费咨询和安全服务  
  
![](https://mmbiz.qpic.cn/mmbiz_png/JqliagemfTA5OxIlGh6IbpxrTJHkcY5DZ4O80nevX4Ev7IHvjZfPZDDMxibSVWk4IdYfaYpuhBgz2iaWS5tzXZLJw/640?wx_fmt=other&wxfrom=5&wx_lazy=1&wx_co=1&tp=webp "")  
  
  
  
  
安全咨询/安全集成/安全运营  
  
专业可信的信息安全应用服务商！  
  
http://www.jsgjxx.com  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
