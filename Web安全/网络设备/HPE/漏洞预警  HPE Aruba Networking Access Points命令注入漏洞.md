---
cve: "CVE-2024-42509"
source: "gelusus/wxvl 公众号漏洞文库"
id: "vw-bc1729990e606c3f919c4e10"
entity_id: "ve-bc1729990e606c3f919c4e10"
schema_version: "1"
title: "漏洞预警 | HPE Aruba Networking Access Points命令注入漏洞"
product: "HPE Aruba AOS10/Instant AP"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "primary"
primary_identifiers: "CVE-2024-42509"
referenced_identifiers: ""
prerequisites: "未认证PAPI UDP命令注入；10.4≤.1.4/8.12≤.0.2/8.10≤.0.13"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/HPE/%E6%BC%8F%E6%B4%9E%E9%A2%84%E8%AD%A6%20%20HPE%20Aruba%20Networking%20Access%20Points%E5%91%BD%E4%BB%A4%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_status: "unknown"
---

#  漏洞预警 | HPE Aruba Networking Access Points命令注入漏洞   

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：HPE Aruba AOS10/Instant AP
- 本文讨论：CVE-2024-42509
- 版本、权限与配置前提：未认证PAPI UDP命令注入；10.4≤.1.4/8.12≤.0.2/8.10≤.0.13
- 资料类型：简短通告；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 修复只给HPE主页，不给公告/首修版；无具体AP型号
- 需保留PAPI网络可达条件，不等同HTTP Web RCE

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- 型号、PAPI安全配置与版本待核验
- 引用图片未查看，截图内容及有效性待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->

浅安  浅安安全   2024-11-16 00:01  
  
**0x00 漏洞编号**  
- # CVE-2024-42509  
  
**0x01 危险等级**  
- 高危  
  
**0x02 漏洞概述**  
  
HPE Aruba Networking Access Points是HPE旗下的Aruba Networking推出的一系列高性能无线接入点产品，旨在为企业提供稳定、高效、安全的无线网络连接，被广泛应用于企业、教育、商业等各种场景。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/7stTqD182SWpsmBToJ1PmvpWYLUqE5SKz2VpYvZKCBWZTYuxqkuZY3766tMibict8WacvbYoOCibO8QYTUvhMQgpw/640?wx_fmt=png&from=appmsg "")  
  
**0x03 漏洞详情**  
###   
###   
  
**CVE-2024-42509**  
  
**漏洞类型：**  
命令注入  
  
**影响：**  
执行任意命令  
  
**简述：**  
由于HPE Aruba Networking Access Points底层CLI服务中存在命令注入漏洞，可能导致未经身份验证的威胁者通过向PAPI UDP端口发送特制数据包导致远程命令执行，成功利用该漏洞可能导致在底层操作系统上以特权用户身份执行任意命令或代码。  
###   
  
**0x04 影响版本**  
- AOS-10.4.x.x <= 10.4.1.4  
  
- Instant AOS-8.12.x.x <= 8.12.0.2  
  
- Instant AOS-8.10.x.x <= 8.10.0.13  
  
**0x05****POC状态**  
- 未公开  
  
**0x06****修复建议**  
  
**目前官方已发布漏洞修复版本，建议用户升级到安全版本****：**  
  
https://www.hpe.com/  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
