---
cve: "CVE-2024-26304"
source: "gelusus/wxvl 公众号漏洞文库"
id: "vw-9c08390221b82a487618f17c"
entity_id: "ve-9c08390221b82a487618f17c"
schema_version: "1"
title: "四个关键漏洞使 HPE Aruba 设备面临 RCE 攻击"
product: "HPE ArubaOS Mobility控制器/网关"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "primary"
primary_identifiers: "CVE-2024-26304; CVE-2024-26305; CVE-2024-33511; CVE-2024-33512"
referenced_identifiers: ""
prerequisites: "未认证PAPI UDP8211，多个8/10分支和EOL；8.x可增强PAPI非默认key"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/HPE/%E5%9B%9B%E4%B8%AA%E5%85%B3%E9%94%AE%E6%BC%8F%E6%B4%9E%E4%BD%BF%20HPE%20Aruba%20%E8%AE%BE%E5%A4%87%E9%9D%A2%E4%B8%B4%20RCE%20%E6%94%BB%E5%87%BB.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_status: "unknown"
---

#  四个关键漏洞使 HPE Aruba 设备面临 RCE 攻击   

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：HPE ArubaOS Mobility控制器/网关
- 本文讨论：CVE-2024-26304；CVE-2024-26305；CVE-2024-33511；CVE-2024-33512
- 版本、权限与配置前提：未认证PAPI UDP8211，多个8/10分支和EOL；8.x可增强PAPI非默认key
- 资料类型：四漏洞通告；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 元数据只26304，遗漏三并列主漏洞
- 仅黑客新闻名称无URL，无首修版本清单
- 多个&lt;=版本须按分支限定；不能所有Aruba设备泛化

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- 各CVE与版本/型号对应、增强PAPI适用范围待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->

 船山信安   2024-05-06 00:00  
  
HPE Aruba Networking（以前称为 Aruba Networks）已发布安全更新，以解决影响 ArubaOS 的严重缺陷，这些缺陷可能导致受影响系统上的远程代码执行 （RCE）。  
  
在 10 个安全缺陷中，有 4 个严重程度被评为严重性严重 -  
- CVE-2024-26304（CVSS 评分：9.8） - 通过 PAPI 协议访问的 L2/L3 管理服务中未经身份验证的缓冲区溢出漏洞  
  
- CVE-2024-26305（CVSS 评分：9.8） - 通过 PAPI 协议访问的实用程序守护程序中未经身份验证的缓冲区溢出漏洞  
  
- CVE-2024-33511（CVSS 评分：9.8） - 通过 PAPI 协议访问的自动报告服务中存在未经身份验证的缓冲区溢出漏洞  
  
- CVE-2024-33512（CVSS 评分：9.8） - 通过 PAPI 协议访问的本地用户身份验证数据库中未经身份验证的缓冲区溢出漏洞  
  
威胁参与者可以通过发送发往进程应用程序编程接口 （PAPI） UDP 端口 （8211） 的特制数据包来利用上述缓冲区溢出错误，从而获得在底层操作系统上以特权用户身份执行任意代码的能力。  
  
这些漏洞会影响 Mobility Conductor（以前称为 Mobility Master）、Mobility Controllers 以及由 Aruba Central 管理的 WLAN 网关和 SD-WAN 网关，这些漏洞存在于以下软件版本中：  
- ArubaOS 10.5.1.0 及更低版本  
  
- ArubaOS 10.4.1.0 及更低版本  
  
- ArubaOS 8.11.2.1 及更低版本，以及  
  
- ArubaOS 8.10.0.10 及更低版本  
  
它们还会影响已达到维护结束状态的 ArubaOS 和 SD-WAN 软件版本 -  
- ArubaOS 10.3.x.x  
  
- ArubaOS 8.9.x.x 操作系统  
  
- ArubaOS 8.8.x.x 操作系统  
  
- ArubaOS 8.7.x.x  
  
- ArubaOS 8.6.x.x  
  
- ArubaOS 6.5.4.x  
  
- SD-WAN 8.7.0.0-2.3.0.x 和  
  
- SD-广域网 8.6.0.4-2.2.x.x  
  
一位名叫 Chancen 的安全研究人员发现并报告了 10 个问题中的 7 个，包括 4 个关键的缓冲区溢出漏洞。  
  
建议用户应用最新的修复程序来缓解潜在威胁。作为 ArubaOS 8.x 的临时解决方法，该公司建议用户使用非默认密钥启用增强型 PAPI 安全功能。  
  
来源：【黑客新闻】  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
