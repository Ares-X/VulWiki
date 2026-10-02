---
cve: "CVE-2025-57516"
source: "gelusus/wxvl 公众号漏洞文库"
product: "PublicCMS5.202506.a/b"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "CVE-2025-57516"
referenced_identifiers: ""
identifier_role: "primary"
identifier_status: "unknown"
title: "漏洞预警  PublicCMS命令注入漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：admin sysSite execScript权限，Windows backupDB.bat接收配置变量；鉴权未述"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-c4462a29c119648d6c0d8cb7"
entity_id: "ve-c4462a29c119648d6c0d8cb7"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：admin sysSite execScript权限，Windows backupDB.bat接收配置变量；鉴权未述

- **适用与权限边界（1）**：后台脚本管理URL与.bat说明权限/平台限制，简介却泛称攻击者可任意命令。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **证据待核（2）**：无payload/源码/响应，POC已公开未链接；厂商主页不提供具体安全版。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

- **凭据与会话边界（3）**：DATABASE/USERNAME/PASSWORD敏感变量应说明为参数名非泄露凭据。抓包中的会话不能视为未认证访问证明。需重新取得授权测试会话，不能复用文中值。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

#  漏洞预警 | PublicCMS命令注入漏洞  
浅安  浅安安全   2026-01-08 00:00  
  
**0x00 漏洞编号**  
- # CVE-2025-57516  
  
**0x01 危险等级**  
- 高危  
  
**0x02 漏洞概述**  
  
PublicCMS是天津黑核科技有限公司开发的开源JAVACMS系统。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/7stTqD182SVfRgZ6ibfom9PVU6ppu085FgGTDfI4jqMlQgkza90h44m8Y0Mm54RLibRicN4vgGEFJ0UbjazX1kcrg/640?wx_fmt=png&from=appmsg "")  
  
**0x03 漏洞详情**  
  
**CVE-2025-57516**  
  
**漏洞类型：**  
命令注入  
  
**影响：**  
任意代码执行  
  
**简述：**  
PublicCMS的/admin/sysSite/execScript?navTabId=sysSite/script接口存在命令注入漏洞，攻击者可利用此漏洞通过向backupDB.bat文件发送经过精心设计的DATABASE、USERNAME或PASSWORD变量来执行任意命令。  
  
**0x04 影响版本**  
- PublicCMS V5.202506.a  
  
- PublicCMS V5.202506.b  
  
**0x05****POC状态**  
- 已公开  
  
**0x06****修复建议**  
  
**目前官方已发布漏洞修复版本，建议用户升级到安全版本****：**  
  
https://www.publiccms.com/  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
