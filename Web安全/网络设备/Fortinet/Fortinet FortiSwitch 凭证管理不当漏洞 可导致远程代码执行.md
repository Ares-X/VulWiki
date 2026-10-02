---
cve: "CVE-2023-37936"
source: "gelusus/wxvl 公众号漏洞文库"
id: "vw-96264b5cd2e2b01451e87ba9"
entity_id: "ve-96264b5cd2e2b01451e87ba9"
schema_version: "1"
title: "Fortinet FortiSwitch 凭证管理不当漏洞 可导致远程代码执行"
product: "FortiSwitch"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "primary"
primary_identifiers: "CVE-2023-37936"
referenced_identifiers: ""
prerequisites: "硬编码密钥远程请求；列多个维护分支范围/修复号"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/Fortinet/Fortinet%20FortiSwitch%20%E5%87%AD%E8%AF%81%E7%AE%A1%E7%90%86%E4%B8%8D%E5%BD%93%E6%BC%8F%E6%B4%9E%20%E5%8F%AF%E5%AF%BC%E8%87%B4%E8%BF%9C%E7%A8%8B%E4%BB%A3%E7%A0%81%E6%89%A7%E8%A1%8C.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_status: "unknown"
---

#  Fortinet FortiSwitch 凭证管理不当漏洞 可导致远程代码执行   

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：FortiSwitch
- 本文讨论：CVE-2023-37936
- 版本、权限与配置前提：硬编码密钥远程请求；列多个维护分支范围/修复号
- 资料类型：简短通告；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 无Fortinet公告直链/触发服务及可达性条件
- 影响表HTML转义符密集难读，修复多条&gt;=需限定各分支

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- 密钥用途、所需服务/权限及版本待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->

 上汽集团网络安全应急响应中心   2025-02-15 15:56  
  
**漏洞情报**  
  
  
  
  
  
**Fortinet FortiSwitch 凭证管理不当漏洞 可导致远程代码执行**  
  
  
**【 漏洞编号 】**  
  
CVE-2023-37936  
  
  
**【 情报等级 】**  
  
**高危**  
  
  
**【 漏洞描述 】**  
  
360漏洞云监测到Fortinet 针对影响 FortiSwitch 产品线的严重安全漏洞（CVE-2023-37936，CVSS 9.6）发布了补丁。该漏洞可能使远程未授权攻击者在易受攻击的设备上执行任意代码，从而可能导致整个网络被攻陷。漏洞源于受影响版本的 FortiSwitch 中使用了硬编码加密密钥。攻击者可以利用密钥构造恶意请求来完全控制设备。受影响的版本包括多个特定版本范围的 FortiSwitch。Fortinet 已为所有受支持的 FortiSwitch 版本发布了补丁，并强烈敦促用户将设备更新到特定版本或更高版本。  
  
  
**【 影响产品 】**  
  
<table><tbody><tr><td colspan="1" rowspan="1" style="border-color: rgb(255, 255, 255);background-color: rgb(231, 231, 231);padding: 6px;" width="99.0000%"><section style="text-align: center;font-size: 14px;"><p>Fortinet FortiSwitch,fortinet fortiswitch&gt;=6.2.0&amp;&amp;&lt;=6.2.7,=7.4.0,&gt;=6.0.0&amp;&amp;&lt;=6.0.7,&gt;=7.0.0&amp;&amp;&lt;=7.0.7,&gt;=6.4.0&amp;&amp;&lt;=6.4.13,&gt;=7.2.0&amp;&amp;&lt;=7.2.5</p></section></td></tr></tbody></table>  
  
**【 解决方案与修复建议 】**  
  
针对此漏洞，官方已经发布了漏洞修复版本，请立即更新到**安全版本****：**  
  
Fortinet  FortiSwitch >= 7.4.1   
  
Fortinet  FortiSwitch >= 7.2.6   
  
Fortinet  FortiSwitch >= 7.0.8   
  
Fortinet  FortiSwitch >= 6.4.14   
  
Fortinet  FortiSwitch >= 6.2.8   
  
Fortinet  FortiSwitch 6.0.x 版本用户请迁移到以上版本   
  
安装前，请确保备份所有关键数据，并按照官方指南进行操作。安装后，进行全面测试以验证漏洞已被彻底修复，并确保系统其他功能正常运行。  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
