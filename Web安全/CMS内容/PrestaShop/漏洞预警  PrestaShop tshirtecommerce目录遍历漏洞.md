---
cve: "CVE-2023-27639"
source: "gelusus/wxvl 公众号漏洞文库"
product: "PrestaShop tshirtecommerce2.1.4 module"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "CVE-2023-27639"
referenced_identifiers: ""
identifier_role: "primary"
identifier_status: "unknown"
title: "漏洞预警  PrestaShop tshirtecommerce目录遍历漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：安装ajax.php?type=svg组件；认证未详述"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-f273c43dc0a5a113d74391c3"
entity_id: "ve-f273c43dc0a5a113d74391c3"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：安装ajax.php?type=svg组件；认证未详述

- **事实待核（1）**：同364背景模板重复但不同漏洞，保留独立CVE不能同文去重。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **适用与权限边界（2）**：仅type=svg无真正路径参数/响应，未授权不自动等于未认证。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **事实待核（3）**：修复主页无具体版，POC公开未提供出处。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

#  漏洞预警 | PrestaShop tshirtecommerce目录遍历漏洞   
浅安  浅安安全   2025-06-04 00:00  
  
**0x00 漏洞编号**  
- # CVE-2023-27639  
  
**0x01 危险等级**  
- 高危  
  
**0x02 漏洞概述**  
  
PrestaShop是一款功能丰富、基于PHP和MySQL的开源电子商务平台，而PrestaShop tshirtecommerce是基于PrestaShop搭建的，专注于T恤销售的在线商店系统，具有界面友好、易于上手、支持多语言多货币等特点，能帮助商家快速创建和管理T恤销售的在线业务。  
  
![图片](../../.resource/remote/2499ca87208230d126824f49b22aeed82c0f50c6c5d78a2132afa82efbca2300.png "")  
  
**0x03 漏洞详情**  
  
CVE-2023-27639  
  
漏洞类型：  
目录遍历  
  
**影响：**  
窃取敏感信息  
  
**简述：**  
PrestaShop tshirtecommerce的/tshirtecommerce/ajax.php?type=svg接口存在目录遍历漏洞，未授权的攻击者可以通过该漏洞获取敏感信息。  
  
**0x04 影响版本**  
- PrestaShop tshirtecommerce 2.1.4  
  
**0x05****POC状态**  
- 已公开  
  
**0x06****修复建议**  
  
**目前官方已发布漏洞修复版本，建议用户升级到安全版本****：**  
  
https://tshirtecommerce.com/  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
