---
source: "gelusus/wxvl 公众号漏洞文库"
id: "vw-aec75b7b1ad0a64771ac4b7d"
entity_id: "ve-aec75b7b1ad0a64771ac4b7d"
schema_version: "1"
title: "Palo Alto Networks修复了多个权限提升漏洞"
product: "GlobalProtect macOS、PAN-OS、Prisma Access Browser、Cortex XDR Broker VM"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "primary"
primary_identifiers: "CVE-2025-4232"
referenced_identifiers: ""
prerequisites: "macOS本地非管理员；PANOS需已认证管理员Web或CLI；未列版本"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/Palo%20Alto/Palo%20Alto%20Networks%E4%BF%AE%E5%A4%8D%E4%BA%86%E5%A4%9A%E4%B8%AA%E6%9D%83%E9%99%90%E6%8F%90%E5%8D%87%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_status: "unknown"
---

#  Palo Alto Networks修复了多个权限提升漏洞  

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：GlobalProtect macOS、PAN-OS、Prisma Access Browser、Cortex XDR Broker VM
- 本文讨论：CVE-2025-4232/4231/4230/4233/4228及未编号Broker问题
- 版本、权限与配置前提：macOS本地非管理员；PANOS需已认证管理员Web或CLI；未列版本
- 资料类型：多产品补丁新闻；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 标题七项提权但正文混有浏览器缓存及加密缺陷，仅部分编号；勿将所有问题定为提权
- 无版本/官方公告链接，跨产品不能归为单一设备漏洞

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- CVE产品映射、七项计数及缺失Broker编号待回源
- 引用图片未查看，截图内容及有效性待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->

鹏鹏同学  黑猫安全   2025-06-16 01:48  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/8dBEfDPEceicbhicIuO4lYKvBV5H8vEOHwWBRmuiceCQia5YMzRqUbmCJMeTvhaUE9ZXwpT6NwU1N09PjY8gWZAAvA/640?wx_fmt=png&from=appmsg "")  
  
Palo Alto Networks修复了七项权限提升漏洞，并将最新Chrome安全补丁集成至产品中。  
  
该厂商应用了11项Chrome修复方案，修补了影响Prisma Access浏览器的缓存漏洞CVE-2025-4233。其中最严重的漏洞被标记为CVE-2025-4232（CVSS评分7.1），是通过macOS通配符实现的认证代码注入问题。  
  
"由于Palo Alto Networks GlobalProtect™应用在macOS平台的日志收集功能中存在通配符处理不当漏洞，非管理员用户可将其权限提升至root级别。"安全公告指出。  
  
公司还修复了管理Web界面中的PAN-OS认证管理员命令注入漏洞（CVE-2025-4231，CVSS评分6.1）。该漏洞允许拥有Web界面访问权限的认证管理员以root权限执行操作，但Cloud NGFW和Prisma Access不受影响。  
  
另一项已修复的漏洞是PAN-OS通过CLI的认证管理员命令注入漏洞（CVE-2025-4230，CVSS评分5.7）。"当管理员拥有PAN-OS命令行访问权限时，可利用该漏洞绕过系统限制以root用户执行任意命令。若严格限制CLI访问权限，可显著降低此漏洞的安全风险。"公告强调，"Cloud NGFW和Prisma Access不受此漏洞影响。"  
  
此外，公司还修复了会导致SD-WAN数据未加密暴露的PAN-OS漏洞（CVE-2025-4228，CVSS评分1.0），以及攻击者可借此将权限提升至root的Cortex XDR Broker VM缺陷。  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
