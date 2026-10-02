---
source: "hatch 补库批 20260928"
product: "XDCMS1.0 templateeditor"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "XDCMS 1.0 后台任意文件读取"
prerequisites: "来源所述条件，未列明部分仍待核：authenticatedbackendtemplatepermission; processreadableconfigpath"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-8d0348a8de1f3ebbfd8edd35"
entity_id: "ve-8d0348a8de1f3ebbfd8edd35"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：authenticatedbackendtemplatepermission; processreadableconfigpath

- **适用与权限边界（1）**：具体file穿越路径较清楚，但源码第43行仅图，角色最低权限未说明。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **结论使用边界（2）**：URL域名0-sec.orv明显错字，需统一占位。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **证据待核（3）**：与604同接口/图片但读取与预期HTML编辑不同，不能合并成单XSS。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

- **适用与权限边界（4）**：无修复/原始来源，任意读受文件权限约束。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# XDCMS 1.0 后台任意文件读取

一、漏洞简介
------------

二、漏洞影响
------------

XDCMS 1.0

三、复现过程
------------

漏洞文件漏洞文件：`system\modules\xdcms\template.php`，同上述xss漏洞相同

![](./.resource/XDCMS1.0后台任意文件读取/media/rId24.jpg)

第43行未对文件进行限制，从而导致了目录遍历，造成任意文件读取

对GET数据没有过滤

    http://www.0-sec.orv/xdcms/index.php?m=xdcms&c=template&f=edit&file=../../../data/config.inc.php

后台任意文件读取。

![](./.resource/XDCMS1.0后台任意文件读取/media/rId25.jpg)
