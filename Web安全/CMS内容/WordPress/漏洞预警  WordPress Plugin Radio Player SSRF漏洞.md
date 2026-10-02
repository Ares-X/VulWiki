---
cve: "CVE-2024-54385"
source: "gelusus/wxvl 公众号漏洞文库"
product: "WordPress Radio Player"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "CVE-2024-54385"
referenced_identifiers: ""
identifier_role: "primary"
identifier_status: "unknown"
title: "漏洞预警  WordPress Plugin Radio Player SSRF漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：<=2.0.82 claimed; anonymous AJAX stated; enabledplayer/fetch restrictions unspecified"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-3cae914a203a058ad8c83650"
entity_id: "ve-3cae914a203a058ad8c83650"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：&lt;=2.0.82 claimed; anonymous AJAX stated; enabledplayer/fetch restrictions unspecified

- **适用与权限边界（1）**：仅admin-ajax.php无action/参数，无法复现或确认匿名访问。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **证据待核（2）**：SSRF说可读系统重要文件没有scheme或文件读证据，需收敛后果。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

- **事实待核（3）**：PoC已公开却无链接，修复只有插件主页没有版本。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **事实待核（4）**：产品简介基本对应音频插件，可保留，但证据极简。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

#  漏洞预警 | WordPress Plugin Radio Player SSRF漏洞   
浅安  浅安安全   2025-01-18 00:01  
  
**0x00 漏洞编号**  
- # CVE-2024-54385  
  
**0x01 危险等级**  
- 高危  
  
**0x02 漏洞概述**  
  
WordPress插件Radio Player是一种简单而有效的解决方案，用于将实时流媒体音频添加到您的WordPress网站。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/7stTqD182SWialcP9Ix17EIaWIoaRFb6kWCfvicDlBDxW1CgNlqXWiaPMG8Mr6N29MRCibBEu89jwcqiaPzibxmKKkrA/640?wx_fmt=png&from=appmsg "")  
  
**0x03 漏洞详情**  
###   
  
**CVE-2024-54385**  
  
**漏洞类型：**  
SSRF****  
  
**影响：**  
  
获取敏感信息  
  
  
****  
  
**简述：**  
Radio Player的/wp-admin/admin-ajax.php接口存在服务器端请求伪造漏洞，未经身份验证攻击者可通过该漏洞读取系统重要文件，导致网站处于极度不安全状态。  
  
**0x04 影响版本**  
- Radio Player <= 2.0.82  
  
**0x05****POC状态**  
- 已公开  
  
**0x06****修复建议**  
  
**目前官方已发布漏洞修复版本，建议用户升级到安全版本****：**  
  
https://cn.wordpress.org/plugins/radio-player/  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
