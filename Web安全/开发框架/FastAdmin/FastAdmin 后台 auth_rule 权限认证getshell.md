---
source: "hatch 补库批 20260928"
product: "FastAdmin auth_rule evaluation"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "FastAdmin 后台 auth_rule 权限认证getshell"
prerequisites: "来源所述条件，未列明部分仍待核：Unknown; superadmin modification then low-privileged login"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-c48d9b426be1f1171d3dcd96"
entity_id: "ve-c48d9b426be1f1171d3dcd96"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：Unknown; superadmin modification then low-privileged login

代码与实验材料：All actual payload/sink evidence screenshots; no literal code

来源证据范围：zhihuifly topic672

- **适用与权限边界（1）**：Needs superadmin first; must establish security boundary rather than imply privilege escalation from ordinary user。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **事实待核（2）**：Empty affected version, no patch/source API or textual rule。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# FastAdmin 后台 auth\_rule 权限认证getshell

一、漏洞简介
------------

fastadmin对超管开放修改auth\_rule表的权限，造成权限认证时，能触发代码执行

二、漏洞影响
------------

三、复现过程
------------

### 首先，需要超管权限进入后台，选择权限管理，进入菜单规则

![aa6bd8929245b99c0d343a4b9e6f412b](./.resource/FastAdmin后台auth_rule权限认证getshell/media/52ce9ed0f54e04c04c11c94eed144dd5fca6b82d.png)

### 这里选择菜单规则，修改他的规则条件

![5613da758b07a846cf444d957b52ae00](./.resource/FastAdmin后台auth_rule权限认证getshell/media/f7581db7f04c7bc806809e04bd48f6827145ddc6.png)

### 保存，然后退出登录，选择一个低权限的用户登录

![8390434205fd2042136a492ba8e69c66](./.resource/FastAdmin后台auth_rule权限认证getshell/media/e7a0066009fd9581ac81f7a68c084af703effc3d.png)

### TP3的代码移植到了TP5，: )

![cf04194df00e909f44c5a2dff4b074f0](./.resource/FastAdmin后台auth_rule权限认证getshell/media/132ddebdf4a175c509364eafa497a4b04051a71e.png)

参考链接
--------

> https://www.zhihuifly.com/t/topic/672
