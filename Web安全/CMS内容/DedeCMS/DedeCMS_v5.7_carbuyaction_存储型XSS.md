---
source: "白阁文库 BaizeSec/bylibrary"
product: "DedeCMS"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "DedeCMS_v5.7_carbuyaction_存储型XSS"
prerequisites: "来源所述条件，未列明部分仍待核：5.7UTF8SP2/2017-03-15; shop enabled; buyer submits address fields; user/admin views order"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-b67bc6c5aaabad49d80eb466"
entity_id: "ve-b67bc6c5aaabad49d80eb466"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：5.7UTF8SP2/2017-03-15; shop enabled; buyer submits address fields; user/admin views order

- **结论使用边界（1）**：Scope/fields and Seebug provenance clear。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **凭据与会话边界（2）**：Payload and request text only images; 'steal admin cookie' additionally depends on cookie/browser protections。抓包中的会话不能视为未认证访问证明；可识别的真实会话值按中段星号遮罩处理，默认演示值和攻击语法保留。需重新取得授权测试会话，不能复用文中值。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# DedeCMS_v5.7_carbuyaction_存储型XSS

## Affected Version

DedeCMS-V5.7-UTF8-SP2  （ 发布日期  2017-03-15 ）

需要站点启用商城功能。

下载地址： 链接: https://pan.baidu.com/s/1bprjPx1 密码: mwdq


## PoC

该漏洞 通过用户在编写订单收货地址的相关参数 注入 XSS Payload，导致 前台查看订单的页面和后台管理员查看订单详情的页面都会被 XSS。

所以说，可以用来打管理员 Cookie 。

测试：

1. 首先管理员添加一项商城的商品

![](./.resource/DedeCMS_v5.7_carbuyaction_存储型XSS/media/add_good.png)

2. 前台用户选定商品添加购物车

![](./.resource/DedeCMS_v5.7_carbuyaction_存储型XSS/media/add_shopcar.png)

3. 前台用户编辑订单的收货地址，在这里 address,des,email,postname 都是存在 XSS 的，插入 XSS Payload

![](./.resource/DedeCMS_v5.7_carbuyaction_存储型XSS/media/edit_address.png)

4. 查看订单详情发现前台已经被 XSS

![](./.resource/DedeCMS_v5.7_carbuyaction_存储型XSS/media/xssed.png)

5. 管理员进入后台查看商城订单同样也会被 XSS  :p

![](./.resource/DedeCMS_v5.7_carbuyaction_存储型XSS/media/back_xssed.png)

## References

1. https://www.seebug.org/vuldb/ssvid-92855


---

> 来源：白阁文库 BaizeSec/bylibrary
