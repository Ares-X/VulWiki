---
source: "hatch 补库批 20260928"
product: "CatfishCMS"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "CatfishCMS后台储存型xss"
prerequisites: "来源所述条件，未列明部分仍待核：Admin publishes article; reader views article; version absent"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-8e0ef2ff91a5a75ba497e4e0"
entity_id: "ve-8e0ef2ff91a5a75ba497e4e0"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：Admin publishes article; reader views article; version absent

- **证据待核（1）**：Only neiron parameter payload and images; endpoint/response/context omitted。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

- **结论使用边界（2）**：Article calls title parameter but payload uses body-like neiron; verify field。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **适用与权限边界（3）**：Admin-authored active content must be distinguished from security boundary bypass。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **证据待核（4）**：No original source。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# CatfishCMS后台储存型xss

一、漏洞简介
------------

网站背景中的管理员可以发布包含存储XSS漏洞的文章 提交标题以抓取数据包
使用burp修改参数 浏览文章可以触发XSS

二、漏洞影响
------------

三、复现过程
------------

![](./.resource/CatfishCMS后台储存型xss/media/rId24.png)

    neiron=<img src=x onerror=alert(123)>

![](./.resource/CatfishCMS后台储存型xss/media/rId25.png)

![](./.resource/CatfishCMS后台储存型xss/media/rId26.png)
