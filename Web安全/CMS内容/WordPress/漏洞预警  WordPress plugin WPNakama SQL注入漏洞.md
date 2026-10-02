---
cve: "CVE-2025-14068"
source: "gelusus/wxvl 公众号漏洞文库"
product: "WordPress WPNakama"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "CVE-2025-14068"
referenced_identifiers: ""
identifier_role: "primary"
identifier_status: "unknown"
title: "漏洞预警  WordPress plugin WPNakama SQL注入漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：<=0.6.3; order_by injection; caller role/authentication absent"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-2d563716b0fcd2e2c013880e"
entity_id: "ve-2d563716b0fcd2e2c013880e"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：&lt;=0.6.3; order_by injection; caller role/authentication absent

- **适用与权限边界（1）**：虽然给order_by但无路由/角色，不能默认为未经认证。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **证据待核（2）**：声明PoC未公开应保留，不补造请求；需给原始漏洞来源支持。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

- **事实待核（3）**：修复已发布却无具体安全版，只有插件主页。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **结论使用边界（4）**：附加额外SQL查询应区别ORDER BY表达式注入与堆叠多语句。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

#  漏洞预警 | WordPress plugin WPNakama SQL注入漏洞  
浅安
                    浅安  浅安安全   2026-03-05 23:50  
  
**0x00 漏洞编号**  
- # CVE-2025-14068  
  
**0x01 危险等级**  
- 高危  
  
**0x02 漏洞概述**  
  
WPNakama是一款原生集成在WordPress仪表盘内的项目和团队协作插件。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/NQlfTO30MhzVwamuvjE4H90cPvw6SG0FFqPTQo2tNh3GBZFcbS8JlrKpQ8cab0pfhK4uTicYmyfBibWAXQh2z9VaPgYPI2QLibJgCSBp5qs5PE/640?wx_fmt=png&from=appmsg "")  
  
**0x03 漏洞详情**  
###   
  
**CVE-2025-14068**  
  
**漏洞类型：**  
SQL注入****  
  
**影响：**  
  
获取敏感信息  
  
  
****  
  
**简述：**  
WPNakama存在SQL注入漏洞，由于对用户提供参数清理不当，且对现有SQL预处理不足，攻击者可利用该漏洞通过order_by参数注入SQL，在现有查询中附加额外的SQL查询，并从数据库中提取敏感信息。  
  
**0x04 影响版本**  
- WordPress WPNakama plugin <= 0.6.3  
  
**0x05****POC状态**  
- 未公开  
  
**0x06****修复建议**  
  
**目前官方已发布漏洞修复版本，建议用户升级到安全版本****：**  
  
https://cn.wordpress.org/plugins/wpnakama/  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
