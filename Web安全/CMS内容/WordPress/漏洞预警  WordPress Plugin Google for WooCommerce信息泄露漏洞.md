---
cve: "CVE-2024-10486"
source: "gelusus/wxvl 公众号漏洞文库"
product: "WordPress Google for WooCommerce / bundled google-ads-php script"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "CVE-2024-10486"
referenced_identifiers: ""
identifier_role: "primary"
identifier_status: "unknown"
title: "漏洞预警  WordPress Plugin Google for WooCommerce信息泄露漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：<2.8.6 claimed; directly reachable print_php_information.php"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-2e54c6a30c15c8c489a803f9"
entity_id: "ve-2e54c6a30c15c8c489a803f9"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：&lt;2.8.6 claimed; directly reachable print_php_information.php

- **适用与权限边界（1）**：漏洞类型填SSRF但全文机制为phpinfo/服务器PHP配置泄漏，明确类型错配。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **结论使用边界（2）**：嵌套vendor脚本路径是关键组件定位，应保留而非泛称WP核心。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **事实待核（3）**：声称PoC公开但只给路径摘要无响应样本，修复仅插件主页缺精确公告。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **凭据与会话边界（4）**：需列哪些配置可能敏感，不能把普通PHP版本信息一概等同凭据泄漏。抓包中的会话不能视为未认证访问证明。需重新取得授权测试会话，不能复用文中值。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

#  漏洞预警 | WordPress Plugin Google for WooCommerce信息泄露漏洞   
浅安  浅安安全   2025-04-24 00:00  
  
**0x00 漏洞编号**  
- # CVE-2024-10486  
  
**0x01 危险等级**  
- 中危  
  
**0x02 漏洞概述**  
  
Google for WooCommerce是一款WordPress插件，能将WooCommerce商店与Google Merchant Center无缝对接，自动同步产品信息，通过Google平台展示产品，利用Google AI优化广告，并提供分析与跟踪功能以助力电商业务增长。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/7stTqD182SUlKyAEbo36eib9nc0VoS9h2YUlepDAXnXj2CW0qYr23ia2KByOYKJQX0De99la7tfTBXRwyMbbzavg/640?wx_fmt=png&from=appmsg "")  
  
  
**0x03 漏洞详情**  
###   
  
**CVE-2024-10486**  
  
**漏洞类型：**  
SSRF****  
  
**影响：**  
  
获取敏感信息  
  
  
****  
  
**简述：**  
Google for WooCommerce的/wp-content/plugins/google-listings-and-ads/vendor/googleads/google-ads-php/scripts/print_php_information.php接口存在信息泄露漏洞，未经身份验证的攻击者通过该漏洞可获取有关Web服务器和PHP配置的信息。  
  
**0x04 影响版本**  
- Google for WooCommerce < 2.8.6  
  
**0x05****POC状态**  
- 已公开  
  
**0x06****修复建议**  
  
**目前官方已发布漏洞修复版本，建议用户升级到安全版本****：**  
  
https://cn.wordpress.org/plugins/google-listings-and-ads/  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
