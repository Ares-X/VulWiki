---
source: "hatch 补库批 20260928"
product: "FineCMS5.0.10"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "Finecms 5.0.10 sql注入漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：需按站点会话Cookie前缀推导auth，正文称未登录可得"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-d9b4b46a6b5629d661c96204"
entity_id: "ve-d9b4b46a6b5629d661c96204"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：需按站点会话Cookie前缀推导auth，正文称未登录可得

- **结论使用边界（1）**：URL把目标站点的值放m位置，未列auth参数，与简介auth推导不匹配。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **适用与权限边界（2）**：param内空格未编码且无完整函数/源码；只是select version语句未证实注入与接口设计边界。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **证据待核（3）**：唯一证据在图，缺精确出处与补丁。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# Finecms 5.0.10 sql注入漏洞

一、漏洞简介
------------

> auth值是由`zero_ci_session`中zero进行md5加密获取到的，无需登陆便有，且每个站点的站长会进行不同的自定义

二、漏洞影响
------------

Finecms 5.0.10

三、复现过程
------------

    http://0-sec.org/index.php?c=api&m=目标站点的值&param=action=sql%20sql=%27select%20version();%27

![](./.resource/Finecms5.0.10sql注入漏洞/media/rId24.png)
