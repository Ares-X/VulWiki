---
cve: "CVE-2024-11728"
source: "gelusus/wxvl 公众号漏洞文库"
product: "WordPress KiviCare Clinic & Patient Management System"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "CVE-2024-11728"
referenced_identifiers: ""
identifier_role: "primary"
identifier_status: "unknown"
title: "漏洞预警  WordPress Plugin KiviCare SQL注入漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：<=3.6.4 claimed; anonymous AJAX stated without action/role evidence"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-dac7c1fdba13c47e688ad346"
entity_id: "ve-dac7c1fdba13c47e688ad346"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：&lt;=3.6.4 claimed; anonymous AJAX stated without action/role evidence

- **适用与权限边界（1）**：只写通用admin-ajax.php，缺action/参数/源码/响应，无法独立判断匿名条件。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **证据待核（2）**：任意SQL语句范围超过未给原语证据；PoC已公开未给链接。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

- **事实待核（3）**：无安全版本及精确公告，插件主页不能定位漏洞补丁。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **事实待核（4）**：医疗系统产品归属明确，但不要据此推断实际病患信息已泄露。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

#  漏洞预警 | WordPress Plugin KiviCare SQL注入漏洞   
浅安  浅安安全   2025-01-01 00:01  
  
**0x00 漏洞编号**  
- # CVE-2024-11728  
  
**0x01 危险等级**  
- 高危  
  
**0x02 漏洞概述**  
  
KiviCare是一个专为WordPress网站设计的诊所和患者管理系统插件，主要功能是帮助医疗服务提供者、诊所、医院及独立医生管理预约、患者记录和相关的医疗业务流程。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/7stTqD182SXagGVrjeAQBZvUPrDzGLkxhgqj2UXQDuRbol8SiaOjstLFOarapISRsrT0CmO0q7xFyNZ3R3aUJTA/640?wx_fmt=png&from=appmsg "")  
  
**0x03 漏洞详情**  
###   
  
**CVE-2024-11728**  
  
**漏洞类型：**  
SQL注入****  
  
**影响：**  
  
获取敏感信息  
  
  
****  
  
**简述：**  
KiviCare的/wp-admin/admin-ajax.php接口存在SQL注入漏洞，未经身份验证的攻击者可以通过该漏洞执行任意SQL语句，从而获取数据库敏感信息。  
  
**0x04 影响版本**  
- KiviCare Clinic & Patient Management System (EHR) <= 3.6.4  
  
**0x05****POC状态**  
- 已公开  
  
**0x06****修复建议**  
  
**目前官方已发布漏洞修复版本，建议用户升级到安全版本****：**  
  
https://cn.wordpress.org/plugins/kivicare-clinic-management-system/  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
