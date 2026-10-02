---
source: "hatch 补库批 20260928"
product: "XDCMS1.0 member profile"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "XDCMS 1.0 csrf漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：memberprofileaccess;client-controlledmember_useridcookie; sessionrelationshipunshown"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-2fc43b3d11c73ea0f3f94c86"
entity_id: "ve-2fc43b3d11c73ea0f3f94c86"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：memberprofileaccess;client-controlledmember_useridcookie; sessionrelationshipunshown

- **凭据与会话边界（1）**：正文修改自己Cookie中的member_userid改他人资料，是IDOR/授权缺失证据，不是CSRF证据。抓包中的会话不能视为未认证访问证明；可识别的真实会话值按中段星号遮罩处理，默认演示值和攻击语法保留。需重新取得授权测试会话，不能复用文中值。

- **凭据与会话边界（2）**：未构造跨站请求/受害者会话，缺token/referer不能直接确认CSRF。抓包中的会话不能视为未认证访问证明；可识别的真实会话值按中段星号遮罩处理，默认演示值和攻击语法保留。需重新取得授权测试会话，不能复用文中值。

- **事实待核（3）**：无完整请求/响应/原始出处/修复，只有截图说明。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **结论使用边界（4）**：同603接口但不同原语，应该关联不要强判同文。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# XDCMS 1.0 csrf漏洞

一、漏洞简介
------------

二、漏洞影响
------------

XDCMS 1.0

三、复现过程
------------

> CSRF漏洞常存在于涉及权限控制的地方，像管理后台、会员中心、论坛帖子、资料修改、交易管理等。
>
> 通常可检查相应代码处是否存在检测token或referer，如果没有token/referer直接请求该页面进行判断

漏洞存在于用户资料修改页面，URL：`index.php?m=member&f=edit`，同SQL注入2漏洞点相同

直接修改Cookie中`member_userid`字段，成功将其他用户信息修改

![](./.resource/XDCMS1.0csrf漏洞/media/rId24.jpg)
