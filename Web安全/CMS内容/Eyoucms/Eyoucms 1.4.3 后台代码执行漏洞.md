---
source: "hatch 补库批 20260928"
product: "EyouCMS1.4.3"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "Eyoucms 1.4.3 后台代码执行漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：管理员模板管理编辑权限及前台渲染"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-dc94b2c5b3270cb3719cc638"
entity_id: "ve-dc94b2c5b3270cb3719cc638"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：管理员模板管理编辑权限及前台渲染

- **证据待核（1）**：只有操作叙述，无payload/源码；全部三图引用1.0前台getshell资源，需核对图文。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

- **适用与权限边界（2）**：最新版暂未修复缺采样日期/构建；管理员模板设计能力边界未论证。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# Eyoucms 1.4.3 后台代码执行漏洞

一、漏洞简介
------------

Eyoucms v1.4.3 版本后台修改模板文件可代码执行

二、漏洞影响
------------

Eyoucms 1.4.3

三、复现过程
------------

从官网下载最新版反复确认v1.4.3暂未修复。利用也很简单直接在高级选项 -\>
模板管理 -\> 修改pc模板。修改index.htm为例。

![](./.resource/Eyoucms1.0前台getshell/media/rId24.png)

![](./.resource/Eyoucms1.0前台getshell/media/rId25.png)

回到index页面刷新

![](./.resource/Eyoucms1.0前台getshell/media/rId26.png)
