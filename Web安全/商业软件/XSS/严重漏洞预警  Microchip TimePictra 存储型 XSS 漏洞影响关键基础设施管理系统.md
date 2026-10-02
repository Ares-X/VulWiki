---
source: "gelusus/wxvl 公众号漏洞文库"
title: "Microchip TimePictra 3010存储XSS及2844认证缺失关联"
product: "Microchip TimePictra"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "CVE-2026-3010;CVE-2026-2844"
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "文称11.0–11.3 SP2；2026-03-02状态"
prerequisites: "PR:N声称；管理员查看污染页面必要"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
identifier_role: "primary"
source_status: "unknown"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/XSS/%E4%B8%A5%E9%87%8D%E6%BC%8F%E6%B4%9E%E9%A2%84%E8%AD%A6%20%20Microchip%20TimePictra%20%E5%AD%98%E5%82%A8%E5%9E%8B%20XSS%20%E6%BC%8F%E6%B4%9E%E5%BD%B1%E5%93%8D%E5%85%B3%E9%94%AE%E5%9F%BA%E7%A1%80%E8%AE%BE%E6%96%BD%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9F.md"
id: "vw-41c380f8558216e6febc1a62"
entity_id: "ve-41c380f8558216e6febc1a62"
schema_version: "1"
---

# Microchip TimePictra 3010存储XSS及2844认证缺失关联

## 条目说明

- 对象与具体问题：Microchip TimePictra；3010存储XSS及2844认证缺失关联
- 版本、配置及部署条件：文称11.0–11.3 SP2；2026-03-02状态
- 认证与权限前提：PR:N声称；管理员查看污染页面必要
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 目录XSS是类型非产品，迁TimePictra/网络管理；标题重复
- UI:N解释成植入阶段无交互错误，CVSS应评价完整攻击链所需用户交互；正文明确等待管理员查看
- 两个同产品漏洞不能仅凭分类就断言可组合，缺具体接口/参数或供应商链路证据
- XSS不保证获取HttpOnly Session，更不自动完全控制设备；影响场景应标推演
- 无补丁/在野/KEV仅限定历史日期；Microchip链接为通用报告入口非本漏洞公告
- 合法原始CNA/NVD记录需核评分向量与补丁，泛WAF/CSP/MFA需兼容性评估

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

原创 CVE-SEC
                    CVE-SEC  CVE-SEC   2026-03-03 00:00  
  
## 严重漏洞预警 | Microchip TimePictra 存储型 XSS 漏洞影响关键基础设施管理系统  
  
CVE 编号：CVE-2026-3010   
  
披露日期：2026-02-28 CVSS 4.0   评分：9.3（严重）   
  
关联漏洞：CVE-2026-2844（同产品，CVSS 4.0 评分 9.3）   
  
补丁状态：截至 2026-03-02，官方尚未发布修复版本  
### 漏洞概述  
  
2026 年 2 月 28 日，Microchip Technology 作为 CVE 编号授权机构（CNA）正式披露了旗下 TimePictra 网络时间同步管理系统中存在的一个存储型跨站脚本漏洞（Stored XSS，CWE-79），编号 CVE-2026-3010。  
  
该漏洞由 Bastion Security 安全研究员 Steve Lin 发现并报告。受影响版本为 TimePictra 11.0 至 11.3 SP2。  
### TimePictra 是什么  
  
TimePictra 是 Microchip Technology 旗下一款基于 Web 的企业级网络时间同步管理与监控系统（NMS），运行于 Red Hat Enterprise Linux 8 之上，采用 Java Web 三层架构，通过浏览器进行管理访问，无需客户端安装。  
  
它不是普通的 IT 管理软件。TimePictra 的客户群体包括：  
- 电信运营商（5G 前传/中传网络时间同步）  
  
- 电力公用事业单位（智能电网频率同步）  
  
- 铁路和城市轨道交通运营商  
  
- 对时间戳精度有监管合规要求的金融机构  
  
该系统单套部署最多可管理 6,000 台网络同步设备和 100,000 个 PTP 客户端，是上述行业时间同步基础设施的核心管理入口。  
### 漏洞技术要点  
  
CVE-2026-3010 的根本成因是 TimePictra Web 应用程序未对用户提交的输入数据进行充分的输出编码处理，导致攻击者可将包含恶意 JavaScript 的内容写入服务器数据库，并在其他用户访问受污染页面时自动触发执行。  
  
这是存储型 XSS，而非反射型。两者的关键区别在于：反射型 XSS 需要诱骗受害者点击一条特制链接，而存储型 XSS 一旦完成注入，所有后续访问被污染页面的合法用户均会在无感知的情况下触发执行，无需任何额外的社会工程手段。  
  
CVSS 4.0 完整向量：  
```
CVSS:4.0/AV:N/AC:L/AT:N/PR:N/UI:N/VC:H/VI:H/VA:N/SC:L/SI:L/SA:N

```  
  
逐项解读：  
- AV:N，攻击向量为网络，可远程利用  
  
- AC:L，攻击复杂度低，无需特殊前置条件  
  
- PR:N，无需任何身份认证  
  
- UI:N，植入载荷阶段无需用户交互  
  
- VC:H / VI:H，对受影响系统的机密性和完整性均造成高度影响  
  
### 关联漏洞与链式攻击  
  
同日，Microchip 同时披露了 CVE-2026-2844，同样影响 TimePictra 11.0 至 11.3 SP2，CWE 分类为 CWE-306（对关键功能缺少身份验证），CVSS 4.0 评分同为 9.3。  
  
CVE-2026-2844 意味着 TimePictra 中存在无需认证即可调用的关键功能接口。  
  
两个漏洞的组合构成了一条完整的未授权攻击链：  
  
第一步，攻击者利用 CVE-2026-2844，在无需任何账户凭据的情况下，通过未受认证保护的接口向 TimePictra 写入持久化 XSS 载荷。  
  
第二步，等待合法管理员正常登录并访问受污染页面，CVE-2026-3010 触发，管理员浏览器执行注入的 JavaScript，攻击者获取 Session 凭据。  
  
第三步，攻击者使用劫持的管理员会话，完全控制 TimePictra 管理平台，可篡改时间同步设备配置、关闭告警规则、修改系统账户。  
  
整个攻击链对攻击者的要求仅为：能够通过网络访问 TimePictra 的 Web 服务端口。  
### 潜在影响范围  
  
由于 TimePictra 所处的位置是关键基础设施管理层，该漏洞的业务影响超出了常规 Web 应用安全事件的范畴：  
  
5G 网络方面，前传网络时间同步精度要求在微秒级，管理系统被攻陷导致配置篡改可能影响基站协调。  
  
电力系统方面，数字继电器保护和相量测量单元（PMU）依赖时间同步，时间基准被人为干扰可能影响电网稳定性的判断。  
  
金融合规方面，受 MiFID II 等监管框架约束的机构需要维持精确的交易时间戳，管理系统数据被篡改将影响合规审计的可信度。  
  
受 NERC CIP、NIS2 等关键基础设施保护法规约束的组织，若发生相关安全事件，还面临合规处罚风险。  
### 当前状态  
  
截至 2026 年 3 月 2 日：  
- 官方修复补丁：未发布  
  
- 公开 PoC 代码：无  
  
- 在野利用记录：无  
  
- CISA KEV 收录：未收录  
  
- CISA ICSA 格式 ICS 专项公告：未发布  
  
漏洞于 2026-02-28 公开披露，目前处于窗口期。无公开 PoC 是当前阶段降低利用概率的主要因素，但补丁缺席和系统的关键性使该漏洞不宜以"低优先级"处置。  
### 检测建议  
  
对 TimePictra Web 服务的 HTTP/HTTPS 流量进行检测，以下特征出现于请求参数中时应触发告警：  
  
原始特征：`<script`  
、javascript:  
、onerror=  
、onload=  
、document.cookie  
、eval(  
  
URL 编码变体：%3Cscript%3E  
、javascript%3A  
  
HTML 实体编码变体：&#x3C;script&#x3E;  
  
Unicode 转义变体：\u003cscript\u003e  
  
同时关注：访问 TimePictra 仪表板期间，浏览器向非 TimePictra 域名发出的异常出站请求，这是 XSS 载荷回调的典型表现。  
### 临时缓解措施  
  
在官方补丁发布前，建议按以下优先级落实临时措施：  
  
立即执行：核查 TimePictra Web 管理界面是否存在来自不可信网络的访问路径，若存在则立即通过防火墙 ACL 或 VLAN 实施网络隔离，仅允许专用管理网络或 VPN 后的主机访问。  
  
24-48 小时内：在 TimePictra 前端部署 WAF，启用 OWASP CRS 规则集中的 XSS 防护规则；在 Web 服务器配置中添加 Content-Security-Policy 响应头，禁止内联脚本执行；审查并精简管理员账户，启用多因素认证（MFA）。  
  
一周内：部署 IDS 规则，监控 TimePictra 访问流量；对访问日志实施自动化告警；同步评估 CVE-2026-2844 的影响范围并实施对应防护。  
### 官方信息来源  
- NVD CVE-2026-3010：https://nvd.nist.gov/vuln/detail/CVE-2026-3010  
  
- NVD CVE-2026-2844：https://nvd.nist.gov/vuln/detail/CVE-2026-2844  
  
- Microchip 安全公告：https://www.microchip.com/en-us/solutions/technologies/embedded-security/how-to-report-potential-product-security-vulnerabilities  
  
- CISA ICS 安全公告（持续关注）：https://www.cisa.gov/news-events/ics-advisories  
  
### 小结  
  
CVE-2026-3010 是一个无需认证、可远程利用、具备关键基础设施影响背景的存储型 XSS 漏洞。与同日披露的 CVE-2026-2844 组合后，攻击门槛进一步降低，构成完整的未授权攻击链。  
  
当前补丁缺席是最突出的风险因素。运营 Microchip TimePictra 11.0 至 11.3 SP2 的组织应立即排查网络暴露情况，落实临时缓解措施，并持续关注 Microchip 官方安全公告的后续更新。  
  
本文信息来源于 NVD、CIRCL、Microchip 官方产品文档及相关公开漏洞数据库，所有技术细节均来自已公开披露的信息，不涉及任何未公开的技术内容。  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
