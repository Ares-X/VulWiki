---
source: "hatch 补库批 20260928"
product: "OpenSNS"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "OpenSNS 后台getshell"
prerequisites: "来源所述条件，未列明部分仍待核：后台模板上传权限、Theme可执行PHP"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-798a440c28dc51988236172a"
entity_id: "ve-798a440c28dc51988236172a"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：后台模板上传权限、Theme可执行PHP

- **事实待核（1）**：全篇四条操作与image占位，无版本/接口/包结构/代码/来源。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **适用与权限边界（2）**：模板安装PHP是否突破预期权限未说明。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# OpenSNS 后台getshell

一、漏洞简介
------------

二、漏洞影响
------------

三、复现过程
------------

### 1. 打开网站后台找到模板上传位置：

### 2. 配置一个压缩包，压缩包里是一句话木马：

### 3. 选择上传：

### 4、会在./Theme目录下自动生成刚刚上传好的马尔

image
