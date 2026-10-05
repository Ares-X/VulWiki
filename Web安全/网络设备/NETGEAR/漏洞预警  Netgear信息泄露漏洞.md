---
cve: "CVE-2024-30569"
source: "gelusus/wxvl 公众号漏洞文库"
id: "vw-be31d7274eb522a3fc7e9a35"
entity_id: "ve-be31d7274eb522a3fc7e9a35"
schema_version: "1"
title: "漏洞预警 | Netgear信息泄露漏洞"
product: "NETGEAR R6850"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "primary"
primary_identifiers: "CVE-2024-30569; CVE-2024-30570"
referenced_identifiers: ""
prerequisites: "v1.1.0.88；无需认证"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/NETGEAR/%E6%BC%8F%E6%B4%9E%E9%A2%84%E8%AD%A6%20%20Netgear%E4%BF%A1%E6%81%AF%E6%B3%84%E9%9C%B2%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_status: "unknown"
---

#  漏洞预警 | Netgear信息泄露漏洞   

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：NETGEAR R6850
- 本文讨论：CVE-2024-30569、CVE-2024-30570
- 版本、权限与配置前提：v1.1.0.88；无需认证
- 资料类型：双漏洞预警；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 元数据仅30569遗漏另一主漏洞30570
- 称PoC公开、已有补丁但无精确PoC链接和修复版本，仅厂商首页

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- currentsetting.htm及debuginfo.htm泄露范围、固定版本待官方确认
- 引用图片未查看，截图内容及有效性待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->

浅安  浅安安全   2025-04-25 00:01  
  
**0x00 漏洞编号**  
- # CVE-2024-30569  
  
- # CVE-2024-30570  
  
**0x01 危险等级**  
- 中危  
  
**0x02 漏洞概述**  
  
Netgear R6850是美国网件公司推出的一款家用无线路由器的具体型号。  
  
![图片](../../.resource/remote/d466d74bc668fb74e00b584c8c2a3975704c2a7242e2aeece802de6d5cb07698.png "")  
  
**0x03 漏洞详情**  
###   
  
**CVE-2024-30569**  
  
**漏洞类型：**  
信息  
泄露  
  
**影响：**  
获取敏感信息  
  
  
  
**简述：**  
Netgear R6850的/currentsetting.htm接口存在信息泄露漏洞，未经身份验证的攻击者可以通过该漏洞获取敏感信息。  
  
**CVE-2024-30570**  
  
**漏洞类型：**  
信息  
泄露  
  
**影响：**  
获取敏感信息  
  
  
  
**简述：**  
Netgear R6850的/debuginfo.htm接口存在信息泄露漏洞，未经身份验证的攻击者可以通过该漏洞获取敏感信息。  
  
**0x04 影响版本**  
- Netgear   
R6850  
  
- Netgear R6850 v1.1.0.88  
  
**0x05****POC状态**  
- **已公开**  
  
**0x06****修复建议**  
  
**目前官方已发布漏洞修复版本，建议用户升级到安全版本****：**  
  
https://www.netgear.com/  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
