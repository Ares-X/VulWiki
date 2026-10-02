---
source: "hatch 补库批 20260928"
product: "Emlog"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "Emlog phpinfo 泄漏"
prerequisites: "来源所述条件，未列明部分仍待核：至少会员/作者登录；admin/index.php?action=phpinfo"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-d2b411db542361c59e99ed23"
entity_id: "ve-d2b411db542361c59e99ed23"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：至少会员/作者登录；admin/index.php?action=phpinfo

- **适用与权限边界（1）**：版本空白；登录前提应入元数据。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **适用与权限边界（2）**：需区分管理诊断与低权限越权；图外无响应/敏感字段。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# Emlog phpinfo 泄漏

一、漏洞简介
------------

需要登陆（至少是网站的会员/作者权限）

二、漏洞影响
------------

三、复现过程
------------

首先看看漏洞出现的位置：

![](./.resource/Emlogphpinfo泄漏/media/rId24.png)

如上图，我们只要构造如下的URL：

    http://www.0-sec.org:81/admin/index.php?action=phpinfo

直接访问：

![](./.resource/Emlogphpinfo泄漏/media/rId25.png)

四、参考链接
------------

> http://www.jeepxie.net/article/687123.html
