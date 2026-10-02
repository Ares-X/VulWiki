---
source: "hatch 补库批 20260928"
product: "Joomla GMapFP component"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "Joomla! component GMapFP 3.30 任意文件上传"
prerequisites: "来源所述条件，未列明部分仍待核：组件图片上传入口可达，双扩展被解析取决服务器配置"
side_effects: "未执行；本文需注意的操作影响：上传file.php.png却同时给file.php及file.php.png路径，无重命名/解析证据"
source_status: "unknown"
id: "vw-12468e2bf9e7638c6984fa22"
entity_id: "ve-12468e2bf9e7638c6984fa22"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：组件图片上传入口可达，双扩展被解析取决服务器配置

- **事实待核（1）**：标题3.30与影响3.x冲突，组件/核心版本未分；URL option=comgmapfp缺下划线与指纹不一致。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **证据待核（2）**：上传file.php.png却同时给file.php及file.php.png路径，无重命名/解析证据。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

- **证据待核（3）**：无multipart请求、鉴权、结果及来源；双后缀文件存在不等于代码执行。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# Joomla component GMapFP 3.30 任意文件上传

一、漏洞简介
------------

关键字:inurl:\'\'com\_gmapfp\'\'

二、漏洞影响
------------

Joomla Gmapfp Components 3.x

三、复现过程
------------

    http://www.0-sec.org/index.php?option=comgmapfp&controller=editlieux&tmpl=component&task=upload_image
    file.php.png , file2.php.jpeg , file3.html.jpg ,file3.txt.jpg

目录文件路径

    http://www.0-sec.org/images/gmapfp/file.php
    http://www.0-sec.org/images/gmapfp/file.php.png
