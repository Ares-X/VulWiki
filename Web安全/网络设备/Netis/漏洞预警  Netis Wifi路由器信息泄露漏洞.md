---
cve: "CVE-2024-48455"
source: "gelusus/wxvl 公众号漏洞文库"
id: "vw-d41eb69188763f7b3870ef95"
entity_id: "ve-d41eb69188763f7b3870ef95"
schema_version: "1"
title: "漏洞预警 | Netis Wifi路由器信息泄露漏洞"
product: "Netis NX10/NC65/NC63/NC21/MW5360"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "primary"
primary_identifiers: "CVE-2024-48455"
referenced_identifiers: ""
prerequisites: "列各型号具体固件；未说明认证前提"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/Netis/%E6%BC%8F%E6%B4%9E%E9%A2%84%E8%AD%A6%20%20Netis%20Wifi%E8%B7%AF%E7%94%B1%E5%99%A8%E4%BF%A1%E6%81%AF%E6%B3%84%E9%9C%B2%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "读取内容可能包含配置、账户或个人数据；应只保存授权环境中最小必要的响应，不能由接口可达推定敏感内容已泄露"
source_status: "unknown"
---

#  漏洞预警 | Netis Wifi路由器信息泄露漏洞   

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Netis NX10/NC65/NC63/NC21/MW5360
- 本文讨论：CVE-2024-48455 skk_get.cgi信息泄露
- 版本、权限与配置前提：列各型号具体固件；未说明认证前提
- 资料类型：多型号预警；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 缺请求参数、响应、泄露范围；称PoC及补丁公开却仅厂商首页
- 未给固定固件版本

### 操作风险与恢复

- 读取内容可能包含配置、账户或个人数据；应只保存授权环境中最小必要的响应，不能由接口可达推定敏感内容已泄露

### 待核与来源

- 版本清单、认证边界及修复版本待核验
- 引用图片未查看，截图内容及有效性待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->

浅安  浅安安全   2025-01-17 00:03  
  
**0x00 漏洞编号**  
- # CVE-2024-48455  
  
**0x01 危险等级**  
- 高危  
  
**0x02 漏洞概述**  
  
Netis Wi-Fi路由器以其稳定的性能、易用的管理界面以及较高的性价比受到许多用户的青睐。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/7stTqD182SWQK5AoL9cDCdtkAibcBYVMwIPXV3bQOeBQ4ia1ZChhvicKDfmsia1FKCGC0dXeFnpA2e5jwVPIb1mykQ/640?wx_fmt=png&from=appmsg "")  
  
**0x03 漏洞详情**  
###   
  
**CVE-2024-48455**  
  
**漏洞类型：**  
信息泄露  
  
**影响：**  
获取敏感信息  
  
**简述：**  
Netis Wi-Fi路由器的/cgi-bin/skk_get.cgi接口存在信息泄露漏洞，攻击者可以通过该漏洞获取敏感信息。  
  
**0x04 影响版本**  
- Netis Wifi6 路由器 NX10 2.0.1.3643  
  
- Netis Wifi6 路由器 NX10 2.0.1.3582  
  
- Netis Wifi 11AC 路由器 NC65 3.0.0.3749  
  
- Netis Wifi 11AC 路由器 NC63 3.0.0.3327  
  
- Netis Wifi 11AC 路由器 NC63 3.0.0.3503  
  
- Netis Wifi 11AC 路由器 NC21 3.0.0.3800  
  
- Netis Wifi 11AC 路由器 NC21 3.0.0.3500  
  
- Netis Wifi 11AC 路由器 NC21 3.0.0.3329  
  
- Netis Wifi 路由器 MW5360 1.0.1.3442  
  
- Netis Wifi 路由器 MW5360 1.0.1.3031  
  
**0x05****POC状态**  
- 已公开  
  
**0x06****修复建议**  
  
**目前官方已发布漏洞修复版本，建议用户升级到安全版本****：**  
  
https://www.netis-systems.com/  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
