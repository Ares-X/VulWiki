---
cve: "CVE-2024-33575"
source: "gelusus/wxvl 公众号漏洞文库"
product: "WordPress User Meta"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "CVE-2024-33575"
referenced_identifiers: ""
identifier_role: "primary"
identifier_status: "unknown"
title: "漏洞预警  User Meta敏感信息泄露漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：<3.1 claimed; exposed views/debug.php; configuration/environment-dependent disclosed fields"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-2f8007b01c100ccdd98dd24d"
entity_id: "ve-2f8007b01c100ccdd98dd24d"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：&lt;3.1 claimed; exposed views/debug.php; configuration/environment-dependent disclosed fields

- **适用与权限边界（1）**：给明确debug.php路径但无输出样本/字段范围，敏感配置数据需具体化。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **结论使用边界（2）**：模板{{BaseURL}}不是可直接访问URL，应标PoC占位。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **事实待核（3）**：只有插件主页无原始CVE/修复diff，&lt;3.1与安全版本关系待核。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **结论使用边界（4）**：文章作为简报可保留，不应升级为已验证完整复现。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

#  漏洞预警 | User Meta敏感信息泄露漏洞   
浅安  浅安安全   2024-05-18 08:00  
  
**0x00 漏洞编号**  
- # CVE-2024-33575  
  
**0x01 危险等级**  
- 中危  
  
**0x02 漏洞概述**  
  
User Meta是一款WordPress前端注册登录与编辑资料插件，允许用户在前端页面进行注册、登录以及编辑个人资料的操作。这款插件还支持额外字段的用户注册，增加了用户注册的灵活性和个性化。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/7stTqD182SWA27o97G4gEuv1V27DowOJozLthuw0xWZW41F5eC4JH9Mjg0VIriaPGgvpQgbichxmCDH3IMAgibnDw/640?wx_fmt=png&from=appmsg "")  
  
**0x03 漏洞详情**  
###   
###   
  
**CVE-2024-33575**  
  
**漏洞类型：**  
敏感信息泄露  
  
**影响：**  
获取敏感信息  
  
****  
  
**简述：**  
User Meta存在敏感信息泄露漏洞，未授权的攻击者可以通过该漏洞获取敏感的配置数据。  
###   
  
**0x04 影响版本**  
- User Meta < 3.1  
  
**0x05****POC**  
  
```
{{BaseURL}}/wp-content/plugins/user-meta/views/debug.php
```  
  
  
**仅供安全研究与学习之用，若将工具做其他用途，由使用者承担全部法律及连带责任，作者及发布****者**  
**不承担任何法律及连带责任。**  
  
**0x06****修复建议**  
  
**目前官方已发布漏洞修复版本，建议用户升级到安全版本****：**  
  
https://wordpress.org/plugins/user-meta/  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
