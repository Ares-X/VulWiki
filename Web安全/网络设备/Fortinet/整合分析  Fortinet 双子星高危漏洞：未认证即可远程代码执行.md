---
source: "gelusus/wxvl 公众号漏洞文库"
id: "vw-ad7fba5ead2a19ae427a5c2d"
entity_id: "ve-ad7fba5ead2a19ae427a5c2d"
schema_version: "1"
title: "整合分析 | Fortinet 双子星高危漏洞：未认证即可远程代码执行"
product: "FortiSandbox / FortiAuthenticator"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "primary"
primary_identifiers: "CVE-2026-26083; CVE-2026-44277"
referenced_identifiers: "CVE-2026-21643; CVE-2026-35616"
prerequisites: "称匿名Web API RCE；Sandbox4.4/5.0、Authenticator6.5/6.6/8.0修复表"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/Fortinet/%E6%95%B4%E5%90%88%E5%88%86%E6%9E%90%20%20Fortinet%20%E5%8F%8C%E5%AD%90%E6%98%9F%E9%AB%98%E5%8D%B1%E6%BC%8F%E6%B4%9E%EF%BC%9A%E6%9C%AA%E8%AE%A4%E8%AF%81%E5%8D%B3%E5%8F%AF%E8%BF%9C%E7%A8%8B%E4%BB%A3%E7%A0%81%E6%89%A7%E8%A1%8C.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_status: "unknown"
---

#  整合分析 | Fortinet 双子星高危漏洞：未认证即可远程代码执行  

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：FortiSandbox / FortiAuthenticator
- 本文讨论：CVE-2026-26083；CVE-2026-44277
- 版本、权限与配置前提：称匿名Web API RCE；Sandbox4.4/5.0、Authenticator6.5/6.6/8.0修复表
- 资料类型：双漏洞风险分析；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 同文CVE2026-21643先称FortiSandbox旧洞，后称FortiClient EMS，明确产品归属冲突
- 无官方公告直链，参考含聚合站；所谓深度解析无真实端点/代码证据
- 云多租户横向污染、所有2FA失效、APT技巧表与注册表项属于推测/通用模板却无证据标记
- 24/13 KEV计数、2–4周武器化、72小时期限无具体分析依据；不能归官方要求

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- 两个官方PSIRT、所有范围/云行为/统计待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->

 奇安信 CERT   2026-05-13 08:10  
  
## 执行摘要  
  
Fortinet 于 2026 年 5 月 13 日发布安全公告，披露两个 CVSS 评分高达 **9.1**  
 的关键未认证远程代码执行漏洞，分别影响 **FortiSandbox 沙箱分析平台**  
和 **FortiAuthenticator 身份认证系统**  
，作为企业安全架构的两大核心组件，上述产品被攻陷将导致整个威胁检测和身份管控体系陷入瘫痪。  
  
关键发现  
- **CVE-2026-26083**  
（FortiSandbox）：缺失授权检查漏洞（CWE-862），影响 Web UI 所有部署变体。  
  
- **CVE-2026-44277**  
（FortiAuthenticator）：不当访问控制漏洞（CWE-284），影响 6.5.x 至 8.0.x 全版本线。  
  
- CISA KEV 目录已收录 **24 个 Fortinet 漏洞**  
被在野利用，其中 **13 个与勒索软件攻击直接关联。**  
  
- Fortinet 设备历来是 APT 组织和经济利益驱动威胁行为体的首选目标，漏洞从披露到武器化的时间窗口极短。  
  
虽然暂无在野利用报告，但鉴于历史攻击模式，建议组织 **立即执行紧急修复**  
，而非等待完整评估。  
## 一、漏洞技术深度解析  
### 1.1 CVE-2026-26083：FortiSandbox 缺失授权远程代码执行  
  
CVSS 9.1  
未认证RCE  
CWE-862  
FortiSandbox  
<table><thead><tr style="background:#1e3a5f;color:#fff;"><th style="padding:8px 12px;border:1px solid #e8e8e8;text-align:left;font-weight:bold;"><section><span leaf=""><span textstyle="" style="color: #000000;">属性</span></span></section></th><th style="padding:8px 12px;border:1px solid #e8e8e8;text-align:left;font-weight:bold;"><section><span leaf=""><span textstyle="" style="color: #000000;">详情</span></span></section></th></tr></thead><tbody><tr><td style="padding: 7px 12px;border: 1px solid rgb(232, 232, 232);color: rgb(51, 51, 51);font-weight: bold;background: rgb(248, 251, 255);"><section><span leaf="">CVE 编号</span></section></td><td style="padding:7px 12px;border:1px solid #e8e8e8;color:#c0392b;font-weight:bold;"><section><span leaf="">CVE-2026-26083</span></section></td></tr><tr style="background:#f9f9f9;"><td style="padding:7px 12px;border:1px solid #e8e8e8;color:#333;font-weight:bold;"><section><span leaf="">CVSSv3 评分</span></section></td><td style="padding:7px 12px;border:1px solid #e8e8e8;color:#c0392b;font-weight:bold;"><section><span leaf="">9.1（严重）</span></section></td></tr><tr><td style="padding:7px 12px;border:1px solid #e8e8e8;color:#333;font-weight:bold;"><section><span leaf="">CWE 分类</span></section></td><td style="padding:7px 12px;border:1px solid #e8e8e8;color:#555;"><section><span leaf="">CWE-862（缺失授权检查）</span></section></td></tr><tr style="background:#f9f9f9;"><td style="padding:7px 12px;border:1px solid #e8e8e8;color:#333;font-weight:bold;"><section><span leaf="">影响产品</span></section></td><td style="padding:7px 12px;border:1px solid #e8e8e8;color:#555;"><section><span leaf="">FortiSandbox、FortiSandbox Cloud、FortiSandbox PaaS</span></section></td></tr><tr><td style="padding:7px 12px;border:1px solid #e8e8e8;color:#333;font-weight:bold;"><section><span leaf="">受影响版本</span></section></td><td style="padding:7px 12px;border:1px solid #e8e8e8;color:#555;"><section><span leaf="">5.0.x ≤ 5.0.1、4.4.x ≤ 4.4.8</span></section></td></tr><tr style="background:#f9f9f9;"><td style="padding:7px 12px;border:1px solid #e8e8e8;color:#333;font-weight:bold;"><section><span leaf="">披露厂商</span></section></td><td style="padding:7px 12px;border:1px solid #e8e8e8;color:#555;"><section><span leaf="">Fortinet（公告编号 FG-IR-26-136）</span></section></td></tr></tbody></table>  
**技术分析：**  
该漏洞根因在于 FortiSandbox Web UI 组件未对特定 API 端点实施充分的授权验证机制。攻击者可通过构造恶意 HTTP 请求，绕过身份认证和会话验证，直接触发底层系统命令执行接口。  
  
**攻击向量特征：**  
- **可达性：**  
网络可达即可触发，无需任何前置凭据。  
  
- **攻击复杂度：**  
低，无需复杂前置条件或用户交互。  
  
- **权限要求：**  
无需（匿名利用）。  
  
- **影响范围：**  
Confidentiality、Integrity、Availability 三大安全属性均受严重威胁。  
  
FortiSandbox 的核心功能是对可疑文件、URL 和样本进行隔离动态分析。一旦该平台被攻陷，攻击者可：  
1. **操控检测结果：**  
伪造文件安全判定，绕过下游安全控制。  
  
1. **横向移动：**  
通过管理接口进入内网核心区域。  
  
1. **持久化部署：**  
在沙箱分析管道中植入后门，监控组织威胁情报能力。  
  
受影响部署变体：本地设备（极高风险）、Cloud（高风险，多租户横向污染）、PaaS（高风险，API接口复杂度）。这是 FortiSandbox 产品线一个多月内第二轮关键补丁，此前 CVE-2026-21643 同样为认证绕过与 RCE 组合漏洞，CVSS 9.1。  
### 1.2 CVE-2026-44277：FortiAuthenticator 不当访问控制  
  
CVSS 9.1  
未认证RCE  
CWE-284  
FortiAuthenticator  
<table><thead><tr style="background:#1e3a5f;color:#fff;"><th style="padding:8px 12px;border:1px solid #e8e8e8;text-align:left;font-weight:bold;"><section><span leaf=""><span textstyle="" style="color: #000000;">属性</span></span></section></th><th style="padding:8px 12px;border:1px solid #e8e8e8;text-align:left;font-weight:bold;"><section><span leaf=""><span textstyle="" style="color: #000000;">详情</span></span></section></th></tr></thead><tbody><tr><td style="padding: 7px 12px;border: 1px solid rgb(232, 232, 232);color: rgb(51, 51, 51);font-weight: bold;background: rgb(248, 251, 255);"><section><span leaf="">CVE 编号</span></section></td><td style="padding:7px 12px;border:1px solid #e8e8e8;color:#c0392b;font-weight:bold;"><section><span leaf="">CVE-2026-44277</span></section></td></tr><tr style="background:#f9f9f9;"><td style="padding:7px 12px;border:1px solid #e8e8e8;color:#333;font-weight:bold;"><section><span leaf="">CVSSv3 评分</span></section></td><td style="padding:7px 12px;border:1px solid #e8e8e8;color:#c0392b;font-weight:bold;"><section><span leaf="">9.1（严重）</span></section></td></tr><tr><td style="padding:7px 12px;border:1px solid #e8e8e8;color:#333;font-weight:bold;"><section><span leaf="">CWE 分类</span></section></td><td style="padding:7px 12px;border:1px solid #e8e8e8;color:#555;"><section><span leaf="">CWE-284（不当访问控制）</span></section></td></tr><tr style="background:#f9f9f9;"><td style="padding:7px 12px;border:1px solid #e8e8e8;color:#333;font-weight:bold;"><section><span leaf="">影响产品</span></section></td><td style="padding:7px 12px;border:1px solid #e8e8e8;color:#555;"><section><span leaf="">FortiAuthenticator</span></section></td></tr><tr><td style="padding:7px 12px;border:1px solid #e8e8e8;color:#333;font-weight:bold;"><section><span leaf="">受影响版本</span></section></td><td style="padding:7px 12px;border:1px solid #e8e8e8;color:#555;"><section><span leaf="">6.5.0 ~ 6.5.6、6.6.0 ~ 6.6.8、8.0.0 ~ 8.0.2</span></section></td></tr><tr style="background:#f9f9f9;"><td style="padding:7px 12px;border:1px solid #e8e8e8;color:#333;font-weight:bold;"><section><span leaf="">修复版本</span></section></td><td style="padding:7px 12px;border:1px solid #e8e8e8;color:#27ae60;font-weight:bold;"><section><span leaf="">6.5.7、6.6.9、8.0.3</span></section></td></tr><tr><td style="padding:7px 12px;border:1px solid #e8e8e8;color:#333;font-weight:bold;"><section><span leaf="">披露厂商</span></section></td><td style="padding:7px 12px;border:1px solid #e8e8e8;color:#555;"><section><span leaf="">Fortinet（公告编号 FG-IR-26-128）</span></section></td></tr></tbody></table>  
**技术分析：**  
FortiAuthenticator 作为企业级身份与访问管理（IAM）解决方案，负责双因素认证（2FA）、单点登录（SSO）和 LDAP/RADIUS 联邦身份认证。该漏洞允许未经身份认证的攻击者通过构造恶意请求，在无需任何凭据的情况下执行系统级命令。  
  
**攻击影响评估：**  
FortiAuthenticator 被攻陷的后果具有架构级破坏力——**认证体系沦陷**  
（所有依赖 2FA 的 Fortinet 设备失去保护）、**横向移动**  
（集中式认证服务器成为域管理跳板）、**凭证窃取**  
（SAML/OAuth 令牌可被伪造）、**数据泄露**  
（用户身份库可被导出）。FortiAuthenticator Cloud 不受此漏洞影响。  
## 二、威胁行为体归因与攻击态势  
### 2.1 Fortinet 漏洞威胁行为体利用历史  
  
CISA KEV 目录收录  
24个Fortinet漏洞在野被主动利用。  
  
其中  
13个漏洞与  
勒索软件攻击直接关联。  
  
Fortinet漏洞  
从披露到野外活跃利用的平均时间窗口显著短于行业均值。  
### 2.2 近期活跃利用案例  
  
**CVE-2026-21643（FortiClient EMS）：**  
威胁情报公司 Defused 在 Fortinet 修复一个月后标记为在野活跃利用，用于端点枚举和横向移动。  
  
**CVE-2026-35616（FortiClient EMS 认证绕过）：**  
2026年4月初，CISA 发布紧急指令，要求联邦机构在限定时间内修复，被归类为已主动利用漏洞，存在在野攻击活动。  
### 2.3 APT 组织攻击模式分析（MITRE ATT&CK）  
<table><thead><tr style="background:#7b2d8b;color:#fff;"><th style="padding:8px 12px;border:1px solid #e8e8e8;text-align:left;font-weight:bold;"><section><span leaf=""><span textstyle="" style="color: #000000;">ATT&amp;CK 战术</span></span></section></th><th style="padding:8px 12px;border:1px solid #e8e8e8;text-align:left;font-weight:bold;"><section><span leaf=""><span textstyle="" style="color: #000000;">关联技术</span></span></section></th><th style="padding:8px 12px;border:1px solid #e8e8e8;text-align:left;font-weight:bold;"><section><span leaf=""><span textstyle="" style="color: #000000;">利用方式</span></span></section></th></tr></thead><tbody><tr><td style="padding:7px 12px;border:1px solid #e8e8e8;color:#333;font-weight:bold;"><section><span leaf="">初始访问</span></section></td><td style="padding:7px 12px;border:1px solid #e8e8e8;color:#555;"><section><span leaf="">T1190</span></section></td><td style="padding:7px 12px;border:1px solid #e8e8e8;color:#555;"><section><span leaf="">直接利用未认证 RCE 漏洞</span></section></td></tr><tr style="background:#f9f9f9;"><td style="padding:7px 12px;border:1px solid #e8e8e8;color:#333;font-weight:bold;"><section><span leaf="">执行</span></section></td><td style="padding:7px 12px;border:1px solid #e8e8e8;color:#555;"><section><span leaf="">T1059</span></section></td><td style="padding:7px 12px;border:1px solid #e8e8e8;color:#555;"><section><span leaf="">触发系统命令执行</span></section></td></tr><tr><td style="padding:7px 12px;border:1px solid #e8e8e8;color:#333;font-weight:bold;"><section><span leaf="">持久化</span></section></td><td style="padding:7px 12px;border:1px solid #e8e8e8;color:#555;"><section><span leaf="">T1098</span></section></td><td style="padding:7px 12px;border:1px solid #e8e8e8;color:#555;"><section><span leaf="">利用 FortiAuthenticator 创建后门账户</span></section></td></tr><tr style="background:#f9f9f9;"><td style="padding:7px 12px;border:1px solid #e8e8e8;color:#333;font-weight:bold;"><section><span leaf="">防御规避</span></section></td><td style="padding:7px 12px;border:1px solid #e8e8e8;color:#555;"><section><span leaf="">T1070</span></section></td><td style="padding:7px 12px;border:1px solid #e8e8e8;color:#555;"><section><span leaf="">篡改 FortiSandbox 检测日志</span></section></td></tr><tr><td style="padding:7px 12px;border:1px solid #e8e8e8;color:#333;font-weight:bold;"><section><span leaf="">横向移动</span></section></td><td style="padding:7px 12px;border:1px solid #e8e8e8;color:#555;"><section><span leaf="">T1021</span></section></td><td style="padding:7px 12px;border:1px solid #e8e8e8;color:#555;"><section><span leaf="">通过 FortiGate VPN 扩大攻击范围</span></section></td></tr><tr style="background:#f9f9f9;"><td style="padding:7px 12px;border:1px solid #e8e8e8;color:#333;font-weight:bold;"><section><span leaf="">收集</span></section></td><td style="padding:7px 12px;border:1px solid #e8e8e8;color:#555;"><section><span leaf="">T1005</span></section></td><td style="padding:7px 12px;border:1px solid #e8e8e8;color:#555;"><section><span leaf="">导出身份认证凭证和配置数据</span></section></td></tr><tr><td style="padding:7px 12px;border:1px solid #e8e8e8;color:#333;font-weight:bold;"><section><span leaf="">命令与控制</span></section></td><td style="padding:7px 12px;border:1px solid #e8e8e8;color:#555;"><section><span leaf="">T1071</span></section></td><td style="padding:7px 12px;border:1px solid #e8e8e8;color:#555;"><section><span leaf="">利用 Fortinet 管理协议建立后门通道</span></section></td></tr></tbody></table>### 2.4 经济利益驱动威胁行为体（勒索软件）  
  
根据CISA分析数据，13个Fortinet漏洞与勒索软件攻击存在关联。攻击者典型利用链：  
  
漏洞利用 → FortiGate/FortiAuthenticator 突破 → 域控制器枚举 → 勒索软件部署 → 数据加密 + 数据外泄（双重勒索）  
  
FortiSandbox 被攻陷后，攻击者可利用其分析能力绕过其他安全控制，对高价值目标实施精准打击。  
## 三、武器化风险评估  
### 3.1 快速武器化预判  
<table><thead><tr style="background:#c0392b;color:#fff;"><th style="padding:8px 12px;border:1px solid #e8e8e8;text-align:left;font-weight:bold;"><section><span leaf=""><span textstyle="" style="color: #000000;">特征</span></span></section></th><th style="padding:8px 12px;border:1px solid #e8e8e8;text-align:left;font-weight:bold;"><section><span leaf=""><span textstyle="" style="color: #000000;">评估</span></span></section></th></tr></thead><tbody><tr><td style="padding:7px 12px;border:1px solid #e8e8e8;color:#333;font-weight:bold;"><section><span leaf="">未认证 RCE</span></section></td><td style="padding:7px 12px;border:1px solid #e8e8e8;color:#c0392b;font-weight:bold;"><section><span leaf="">最高风险，无需前置条件</span></section></td></tr><tr style="background:#f9f9f9;"><td style="padding:7px 12px;border:1px solid #e8e8e8;color:#333;font-weight:bold;"><section><span leaf="">CVSS 9.1</span></section></td><td style="padding:7px 12px;border:1px solid #e8e8e8;color:#c0392b;font-weight:bold;"><section><span leaf="">突破性评分，漏洞利用收益极高</span></section></td></tr><tr><td style="padding:7px 12px;border:1px solid #e8e8e8;color:#333;font-weight:bold;"><section><span leaf="">产品定位</span></section></td><td style="padding:7px 12px;border:1px solid #e8e8e8;color:#e67e22;font-weight:bold;"><section><span leaf="">安全架构核心组件，被攻陷影响呈级联放大</span></section></td></tr><tr style="background:#f9f9f9;"><td style="padding:7px 12px;border:1px solid #e8e8e8;color:#333;font-weight:bold;"><section><span leaf="">历史相似漏洞</span></section></td><td style="padding:7px 12px;border:1px solid #e8e8e8;color:#e67e22;font-weight:bold;"><section><span leaf="">多在披露后 2-4 周内出现 POC 或在野利用</span></section></td></tr></tbody></table>  
**利用窗口预估：**  
结合 CVE-2026-21643 的时间线（修复后一个月即被标记活跃利用），本次漏洞在野利用极可能紧随 POC 公开后出现，不排除已有攻击者处于漏洞情报收集和测试阶段。  
### 3.2 产品定位风险矩阵  
  
FortiAuthenticator（认证体系中枢）  
  
虽然影响面相对集中，但作为集中认证基础设施，被攻陷后可导致整个 Fortinet 安全生态瘫痪。**优先级：极高**  
  
FortiSandbox（检测管道核心）  
  
产品部署量相对有限，但被控后对组织威胁检测能力的破坏具有长期隐蔽性。**优先级：高**  
## 四、缓解建议与修复方案  
### 4.1 紧急修复路径  
  
CVE-2026-44277（FortiAuthenticator）：  
<table><thead><tr style="background:#1e8449;color:#fff;"><th style="padding:8px 12px;border:1px solid #e8e8e8;text-align:left;font-weight:bold;"><section><span leaf=""><span textstyle="" style="color: #000000;">当前版本</span></span></section></th><th style="padding:8px 12px;border:1px solid #e8e8e8;text-align:left;font-weight:bold;"><section><span leaf=""><span textstyle="" style="color: #000000;">修复版本</span></span></section></th><th style="padding:8px 12px;border:1px solid #e8e8e8;text-align:left;font-weight:bold;"><section><span leaf=""><span textstyle="" style="color: #000000;">升级路径</span></span></section></th></tr></thead><tbody><tr><td style="padding:7px 12px;border:1px solid #e8e8e8;color:#333;"><section><span leaf="">6.5.0 ~ 6.5.6</span></section></td><td style="padding:7px 12px;border:1px solid #e8e8e8;color:#27ae60;font-weight:bold;"><section><span leaf="">6.5.7</span></section></td><td style="padding:7px 12px;border:1px solid #e8e8e8;color:#555;"><section><span leaf="">直接升级</span></section></td></tr><tr style="background:#f9f9f9;"><td style="padding:7px 12px;border:1px solid #e8e8e8;color:#333;"><section><span leaf="">6.6.0 ~ 6.6.8</span></section></td><td style="padding:7px 12px;border:1px solid #e8e8e8;color:#27ae60;font-weight:bold;"><section><span leaf="">6.6.9</span></section></td><td style="padding:7px 12px;border:1px solid #e8e8e8;color:#555;"><section><span leaf="">直接升级</span></section></td></tr><tr><td style="padding:7px 12px;border:1px solid #e8e8e8;color:#333;"><section><span leaf="">8.0.0 ~ 8.0.2</span></section></td><td style="padding:7px 12px;border:1px solid #e8e8e8;color:#27ae60;font-weight:bold;"><section><span leaf="">8.0.3</span></section></td><td style="padding:7px 12px;border:1px solid #e8e8e8;color:#555;"><section><span leaf="">直接升级</span></section></td></tr></tbody></table>  
CVE-2026-26083（FortiSandbox）：  
<table><thead><tr style="background:#1e8449;color:#fff;"><th style="padding:8px 12px;border:1px solid #e8e8e8;text-align:left;font-weight:bold;"><section><span leaf=""><span textstyle="" style="color: #000000;">当前版本</span></span></section></th><th style="padding:8px 12px;border:1px solid #e8e8e8;text-align:left;font-weight:bold;"><section><span leaf=""><span textstyle="" style="color: #000000;">修复版本</span></span></section></th><th style="padding:8px 12px;border:1px solid #e8e8e8;text-align:left;font-weight:bold;"><section><span leaf=""><span textstyle="" style="color: #000000;">升级路径</span></span></section></th></tr></thead><tbody><tr><td style="padding:7px 12px;border:1px solid #e8e8e8;color:#333;"><section><span leaf="">5.0.x ≤ 5.0.1</span></section></td><td style="padding:7px 12px;border:1px solid #e8e8e8;color:#27ae60;font-weight:bold;"><section><span leaf="">5.0.2+</span></section></td><td style="padding:7px 12px;border:1px solid #e8e8e8;color:#555;"><section><span leaf="">需确认兼容性</span></section></td></tr><tr style="background:#f9f9f9;"><td style="padding:7px 12px;border:1px solid #e8e8e8;color:#333;"><section><span leaf="">4.4.x ≤ 4.4.8</span></section></td><td style="padding:7px 12px;border:1px solid #e8e8e8;color:#27ae60;font-weight:bold;"><section><span leaf="">4.4.9+</span></section></td><td style="padding:7px 12px;border:1px solid #e8e8e8;color:#555;"><section><span leaf="">需确认兼容性</span></section></td></tr><tr><td style="padding:7px 12px;border:1px solid #e8e8e8;color:#333;"><section><span leaf="">Cloud/PaaS</span></section></td><td style="padding:7px 12px;border:1px solid #e8e8e8;color:#27ae60;font-weight:bold;"><section><span leaf="">自动更新</span></section></td><td style="padding:7px 12px;border:1px solid #e8e8e8;color:#555;"><section><span leaf="">联系 Fortinet 支持</span></section></td></tr></tbody></table>### 4.2 临时缓解措施（无法立即升级时）  
1. **网络层隔离：**  
将 FortiSandbox/FortiAuthenticator Web UI 限制于管理网段，禁止互联网直接访问。  
  
1. **强访问控制：**  
对管理接口实施额外 VPN + 证书双因子认证。  
  
1. **流量监控：**  
部署 WAF 规则阻断异常 HTTP 请求模式，特别关注非标准 HTTP 方法和编码。  
  
1. **日志审计：**  
对认证日志、API 调用日志实施实时监控，设置异常阈值告警。  
  
### 4.3 威胁狩猎建议  
<table></table><table><thead><tr style="background:#7b2d8b;color:#fff;"><th style="padding:8px 12px;border:1px solid #e8e8e8;text-align:left;font-weight:bold;"><section><span leaf=""><span textstyle="" style="color: #000000;">狩猎目标</span></span></section></th><th style="padding:8px 12px;border:1px solid #e8e8e8;text-align:left;font-weight:bold;"><section><span leaf=""><span textstyle="" style="color: #000000;">特征</span></span></section></th></tr></thead><tbody><tr><td style="padding:7px 12px;border:1px solid #e8e8e8;color:#333;font-weight:bold;"><section><span leaf="">异常 API 调用</span></section></td><td style="padding:7px 12px;border:1px solid #e8e8e8;color:#555;"><section><span leaf="">来自非预期 IP 段的 Web UI API 请求</span></section></td></tr><tr style="background:#f9f9f9;"><td style="padding:7px 12px;border:1px solid #e8e8e8;color:#333;font-weight:bold;"><section><span leaf="">认证异常</span></section></td><td style="padding:7px 12px;border:1px solid #e8e8e8;color:#555;"><section><span leaf="">短时间内大量失败认证尝试，特别是针对 /api/ 端点</span></section></td></tr><tr><td style="padding:7px 12px;border:1px solid #e8e8e8;color:#333;font-weight:bold;"><section><span leaf="">横向移动</span></section></td><td style="padding:7px 12px;border:1px solid #e8e8e8;color:#555;"><section><span leaf="">FortiAuthenticator → FortiGate 的异常管理流量</span></section></td></tr><tr style="background:#f9f9f9;"><td style="padding:7px 12px;border:1px solid #e8e8e8;color:#333;font-weight:bold;"><section><span leaf="">后门特征</span></section></td><td style="padding:7px 12px;border:1px solid #e8e8e8;color:#555;"><section><span leaf="">非预期的计划任务、注册表项或 SSH 密钥</span></section></td></tr><tr><td style="padding:7px 12px;border:1px solid #e8e8e8;color:#333;font-weight:bold;"><section><span leaf="">数据外泄</span></section></td><td style="padding:7px 12px;border:1px solid #e8e8e8;color:#555;"><section><span leaf="">异常的出站流量和大规模数据打包行为</span></section></td></tr></tbody></table>## 五、结论  
  
Fortinet 本次披露的两个 CVSS 9.1 分值漏洞，直接针对企业安全架构的核心组件。FortiAuthenticator 的认证体系中枢地位和 FortiSandbox 的威胁检测管道角色，使其成为高价值攻击目标。  
  
鉴于：  
- CISA KEV 目录中 **24 个 Fortinet 漏洞**  
已被在野利用；  
  
- 近期 CVE-2026-21643 在修复后一个月即被标记为活跃利用；  
  
- 未认证 RCE 漏洞的低利用门槛特性。  
  
强烈建议组织将本次修复置于最高优先级，在 **72 小时**  
内完成关键资产的补丁部署。同时，对历史 Fortinet 设备漏洞（如 CVE-2026-35616）保持持续监控，防范供应链攻击和凭证重用。  
## 六、参考链接  
  
https://www.bleepingcomputer.com/news/security/fortinet-warns-of-critical-rce-flaws-in-fortisandbox-and-fortiauthenticator/  
  
https://www.probablypwned.com/fortinet-sandbox-and-authenticator-rce  
  
https://latest-vulnerabilities.com/cve/cve-2026-44277  
  
https://hackersradar.com/fortinet-fortisandbox-critical-vulnerability  
  
https://securityonline.info/fortinet-critical-fortisandbox-and-fortiauthenticator  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
