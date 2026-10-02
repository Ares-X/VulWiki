---
source: "hatch 补库批 20260928"
product: "S-CMS unspecified version"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "S-CMS sql注入漏洞（一）"
prerequisites: "来源所述条件，未列明部分仍待核：未知，只有根据文章注入文字"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-3b68c6e951fc3b9e4be1e130"
entity_id: "ve-3b68c6e951fc3b9e4be1e130"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：未知，只有根据文章注入文字

- **适用与权限边界（1）**：两图外无端点/参数/版本/类型/权限/载荷，无法语义判断具体SQLi；图片尾片污染。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **证据待核（2）**：原始博客URL存在可回源，不能把截图未查看等同验证完成。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# S-CMS sql注入漏洞（一）

一、漏洞简介
------------

二、漏洞影响
------------

三、复现过程
------------

![](./.resource/S-CMSsql注入漏洞一/media/rId24.jpg)/media/rId24.jpg)

根据文章注入

![](./.resource/S-CMSsql注入漏洞一/media/rId25.jpg)/media/rId25.jpg)

参考链接
--------

> http://pines404.online/2019/10/31/%E4%BB%A3%E7%A0%81%E5%AE%A1%E8%AE%A1/S-CMS%E5%AE%A1%E8%AE%A1%E5%A4%8D%E7%8E%B0/
